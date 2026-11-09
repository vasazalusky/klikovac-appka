import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "PITLANE CLICKER — Race your way to pole",
  description: "Závodní klikací hra inspirovaná světem formule 1.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="cs"><body>{children}</body></html>
}
