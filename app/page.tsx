"use client"

import { useMemo, useState } from "react"
import { ChevronRight, Flag, Gauge, RotateCcw, Trophy, Zap } from "lucide-react"

const drivers = [
  { name: "Max Verstappen", short: "MV", color: "#e74736", team: "RED BULL RACING", score: "12.4K" },
  { name: "Charles Leclerc", short: "CL", color: "#e53935", team: "SCUDERIA FERRARI", score: "9.8K" },
  { name: "Lando Norris", short: "LN", color: "#f4a621", team: "MCLAREN RACING", score: "8.7K" },
  { name: "Kimi Antonelli", short: "KA", color: "#55a6d9", team: "MERCEDES-AMG", score: "7.3K" },
  { name: "Lewis Hamilton", short: "LH", color: "#9b59b6", team: "SCUDERIA FERRARI", score: "6.9K" },
]

const achievementDefs = [
  { at: 100, title: "První zatáčka", detail: "Projeď první šikanu" },
  { at: 200, title: "Čistá stopa", detail: "Dvě kola bez chyby" },
  { at: 300, title: "DRS aktivní", detail: "Otevři zadní křídlo" },
  { at: 400, title: "Pole position", detail: "Startuj z prvního místa" },
  { at: 500, title: "Šampion sezóny", detail: "Vyhraj celý závod" },
]

export default function Home() {
  const [clicks, setClicks] = useState(0)
  const [lastAchievement, setLastAchievement] = useState(0)

  const bonus = 1 + Math.floor(clicks / 100) * 0.1
  const unlocked = achievementDefs.filter((achievement) => clicks >= achievement.at)
  const nextAchievement = achievementDefs.find((achievement) => clicks < achievement.at)
  const nextMilestone = nextAchievement?.at ?? Math.ceil((clicks + 1) / 100) * 100
  const progress = ((clicks % 100) / 100) * 100
  const currentDriver = useMemo(() => drivers[Math.min(unlocked.length, drivers.length - 1)], [unlocked.length])

  const click = () => {
    setClicks((current) => {
      const next = current + 1
      const reached = achievementDefs.find((achievement) => next === achievement.at)
      if (reached) setLastAchievement(reached.at)
      return next
    })
  }

  const reset = () => {
    setClicks(0)
    setLastAchievement(0)
  }

  return (
    <main className="race-page">
      <div className="noise" aria-hidden="true" />
      <header className="topbar">
        <div className="brand"><span className="brand-mark">P</span><span>PITLANE<span className="brand-accent">.CLICKER</span></span></div>
        <div className="season"><span className="live-dot" /> LIVE SEASON <strong>2025</strong></div>
        <button className="reset-button" onClick={reset} aria-label="Restartovat závod"><RotateCcw data-icon="inline-start" /> Restart</button>
      </header>

      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><Flag data-icon="inline-start" /> GRAND PRIX OF CLICKING</p>
          <h1>EVERY CLICK<br /><span>COUNTS.</span></h1>
          <p className="hero-subtitle">Zmáčkni plyn. Sbírej achievementy.<br />Staň se šampionem sezóny.</p>
          <div className="track-line"><span /><span /><span /><span /><span /></div>
        </div>

        <div className="race-card" aria-live="polite">
          <div className="race-card-top"><span>RACE CONTROL</span><span className="lap"><span className="live-dot" /> LAP {Math.floor(clicks / 100) + 1} / 100</span></div>
          <button className="click-zone" onClick={click} aria-label={`Klikni pro přidání bodu. Aktuálně ${clicks} kliknutí`}>
            <div className="speed-ring"><Gauge className="gauge-icon" /><span className="speed-label">THROTTLE</span></div>
            <span className="click-value">{clicks}</span>
            <span className="click-label">CLICKS</span>
            <span className="click-cta">CLICK TO ACCELERATE <ChevronRight data-icon="inline-end" /></span>
          </button>
          <div className="race-card-bottom"><span>BONUS <strong>x{bonus.toFixed(1)}</strong></span><span>DRS <strong>{bonus > 1 ? "ACTIVE" : "LOCKED"}</strong></span></div>
        </div>
      </section>

      <section className="stats-row" aria-label="Statistiky závodu">
        <div className="stat"><span className="stat-label">CURRENT DRIVER</span><strong><span className="driver-dot" style={{ background: currentDriver.color }} /> {currentDriver.name}</strong></div>
        <div className="stat"><span className="stat-label">BONUS ZA KLIK</span><strong className="green-text">+{((bonus - 1) * 100).toFixed(0)}%</strong></div>
        <div className="stat"><span className="stat-label">NEXT ACHIEVEMENT</span><strong>{nextAchievement ? nextAchievement.at - clicks : nextMilestone - clicks} <span className="muted">CLICKS TO GO</span></strong></div>
      </section>

      <section className="dashboard-grid">
        <div className="panel achievements-panel">
          <div className="panel-heading"><div><p className="section-kicker">MISSION CONTROL</p><h2>ACHIEVEMENTS</h2></div><span className="count-badge">{unlocked.length} / {achievementDefs.length}</span></div>
          <div className="achievement-list">
            {achievementDefs.map((achievement) => {
              const active = clicks >= achievement.at
              return <div className={`achievement ${active ? "is-active" : ""}`} key={achievement.at}><div className="achievement-icon"><Trophy /></div><div className="achievement-copy"><strong>{achievement.title}</strong><span>{achievement.detail}</span></div><div className="achievement-bonus">{active ? "+10% BONUS" : `${achievement.at} CLICKS`}</div></div>
            })}
          </div>
          <div className="progress-wrap"><div className="progress-meta"><span>NEXT MILESTONE · {(nextAchievement?.title ?? "DALŠÍ KOLO").toUpperCase()}</span><strong>{Math.round(progress)}%</strong></div><div className="progress-track"><div className="progress-value" style={{ width: `${progress}%` }} /></div></div>
          {lastAchievement > 0 && <p className="unlock-note"><Zap data-icon="inline-start" /> Achievement odemčen na {lastAchievement} kliknutí. Bonus se zvýšil.</p>}
        </div>

        <div className="panel leaderboard-panel">
          <div className="panel-heading"><div><p className="section-kicker">LIVE TIMING</p><h2>DRIVER STANDINGS</h2></div><span className="live-status"><span className="live-dot" /> LIVE</span></div>
          <div className="leaderboard-list">{drivers.map((driver, index) => <div className={`driver-row ${driver.name === currentDriver.name ? "current" : ""}`} key={driver.name}><span className="position">0{index + 1}</span><span className="avatar" style={{ background: driver.color }}>{driver.short}</span><span className="driver-name"><strong>{driver.name}</strong><small>{driver.team}</small></span><span className="driver-score">{driver.name === currentDriver.name ? `${(clicks * bonus / 1000).toFixed(1)}K` : driver.score}</span><span className="flag-mark">{index === 0 ? "▲" : index < 3 ? "—" : "▼"}</span></div>)}</div>
          <button className="full-ranking">VIEW FULL RANKING <ChevronRight data-icon="inline-end" /></button>
        </div>
      </section>
      <footer><span>© PITLANE CLICKER</span><span>POWERED BY PURE FOCUS <span className="footer-dot">●</span></span><span>NO BRAKES. NO EXCUSES.</span></footer>
    </main>
  )
}
