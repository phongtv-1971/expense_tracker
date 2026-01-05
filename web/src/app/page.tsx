export default function Home() {
  return (
    <main className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <p className="mb-4">Personal, static, mobile-first expense tracker.</p>
      <div className="space-y-2">
        <a className="block p-3 bg-blue-500 text-white rounded" href="/transactions">Transactions</a>
        <a className="block p-3 bg-green-500 text-white rounded" href="/dashboard">Dashboard</a>
      </div>
    </main>
  )
}
