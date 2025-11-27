import { useEffect, useState } from "react"
import { Link } from "react-router"

export const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Please log in to view your profile</p>
          <Link to="/login" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-slate-400">View and manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar and Name */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-8">
              <img
                src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=John"}
                alt={user.name}
                className="w-32 h-32 rounded-lg border-4 border-slate-900 bg-slate-800"
              />
              <div>
                <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
                <p className="text-slate-400">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-full text-sm font-medium">
                  {user.role || "Support Agent"}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pb-8 border-b border-slate-800">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Tickets Resolved</p>
                <p className="text-3xl font-bold text-blue-400">{user.ticketsResolved || 0}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Tickets Assigned</p>
                <p className="text-3xl font-bold text-cyan-400">{user.ticketsAssigned || 0}</p>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <p className="text-slate-400 bg-slate-800/30 rounded-lg p-3">{user.email}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <Link to="/settings" className="btn btn-outline flex-1">
                Edit Settings
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("user")
                  window.location.to = "/auth/login"
                }}
                className="btn btn-ghost flex-1 text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
