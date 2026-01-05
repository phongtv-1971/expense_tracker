import '../styles/globals.css'

export const metadata = {
  title: 'Expense Tracker',
  description: 'Personal expense tracker - static SPA'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-900 bg-white">
        <style dangerouslySetInnerHTML={{ __html: `
          /* Minimal fallback styles when Tailwind isn't loaded */
          html,body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; margin:0; padding:0}
          a{color:#2563eb}
          .container{padding:16px;max-width:1024px;margin:0 auto}
        ` }} />
        <header className="border-b border-gray-200">
          <div className="container flex items-center justify-between py-3">
            <div className="text-lg font-semibold">Expense Tracker</div>
            <nav className="space-x-4 text-sm">
              <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="/transactions" className="text-gray-700 hover:text-gray-900">Transactions</a>
              <a href="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
