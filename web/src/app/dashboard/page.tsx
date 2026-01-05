"use client"
import Dashboard from '../../components/Dashboard'

export default function DashboardPage() {
  return (
    <main className="p-4 max-w-screen-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">View your expense analytics and insights</p>
      </div>
      <Dashboard />
    </main>
  )
}
