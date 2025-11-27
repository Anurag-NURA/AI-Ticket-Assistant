import { useState, useRef, useEffect } from "react"
import { Link } from "react-router"

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [user, setUser] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])


  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setUser(null)
    setIsDropdownOpen(false)
    window.location.to = "/login"
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const capitalizeName = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0)
        .toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-backdrop-filter:bg-slate-950/80">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold group hover:opacity-80 transition-opacity">
          <span className="text-2xl">⚡</span>
          <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">TicketAI</span>
        </Link>

        {/* Navigation Items */}
        <div className="flex gap-4 md:gap-8 items-center">
          {/* User is logged in */}
          {isLoggedIn && (
            <>
              <Link to="/tickets" className="text-sm text-slate-300 hover:text-white transition-colors">
                Tickets
              </Link>
              {user?.role === "admin" && (
                <Link to="/admin" className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium">
                  Admin
                </Link>
              )}
              <Link to="/create" className="btn btn-sm btn-primary text-white">
                + New Ticket
              </Link>
            </>
          )}

          {/* User Profile Dropdown */}
          {isLoggedIn && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-sm font-bold text-slate-950">
                  {getInitials(user.name)}
                </div>
                <span className="hidden sm:inline text-sm text-slate-300">{capitalizeName(user.name)}</span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-700 bg-slate-900 shadow-lg">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      👤 Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      ⚙️ Settings
                    </Link>
                    <Link
                      to="/help"
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      ❓ Help
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="px-4 py-2 border-t border-slate-700">
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 text-sm text-slate-300 hover:text-red-400 hover:bg-slate-800 rounded transition-colors font-medium"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Not Logged In - Show Sign In and Sign Up */
            <>
              <Link to="/login" className="text-sm text-slate-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-sm btn-primary text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
