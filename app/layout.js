import './globals.css'
import { profile } from '../data/portfolio'

export const metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.summary,
}
export const viewport = { themeColor: '#0e1630', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
