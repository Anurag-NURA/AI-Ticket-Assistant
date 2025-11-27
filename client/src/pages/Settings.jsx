import { useEffect, useState } from "react"
import { Link } from "react-router"

export const Settings = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setFormData({
        name: userData.name,
        email: userData.email,
      })
    }
    setLoading(false)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const updatedUser = { ...user, ...formData }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

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
          <p className="text-slate-400 mb-4">Please log in to access settings</p>
          <Link to="/auth/login" className="btn btn-primary">
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
          <Link to="/profile" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
            ← Back to Profile
          </Link>
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account preferences</p>
        </div>

        {/* Settings Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
          {saved && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
              Settings saved successfully!
            </div>
          )}

          {/* Account Section */}
          <div className="mb-8 pb-8 border-b border-slate-800">
            <h2 className="text-xl font-bold mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="mb-8 pb-8 border-b border-slate-800">
            <h2 className="text-xl font-bold mb-4">Preferences</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/30 p-3 rounded-lg transition-colors">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-slate-300">Email notifications for new tickets</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/30 p-3 rounded-lg transition-colors">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-slate-300">Receive weekly report digest</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/30 p-3 rounded-lg transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-slate-300">Allow marketing emails</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button onClick={handleSave} className="btn btn-primary flex-1">
              Save Changes
            </button>
            <Link to="/profile" className="btn btn-ghost flex-1">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
