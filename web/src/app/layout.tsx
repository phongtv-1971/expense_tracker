import '../styles/globals.css'

export const metadata = {
  title: 'Expense Tracker',
  description: 'Personal expense tracker - static SPA'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
