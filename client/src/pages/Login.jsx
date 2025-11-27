import { useState } from 'react'
import { useNavigate, Link } from 'react-router'

export const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Logging in with', form);
    try {
      fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      }).then(async (res) => {
        setLoading(false);
        const data = await res.json();
        if (res.ok) {
          console.log('Login successful:', data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/');
        } else {
          alert("Signup failed: " + data.message);
        }
      }).catch((err) => {
        console.error('Signup error:', err);
        setLoading(false);
      });
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold group mb-2">
            <span className="text-3xl">⚡</span>
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">TicketAI</span>
          </Link>
          <p className="text-slate-400 text-sm">Welcome back</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors duration-200 mt-6"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-center text-slate-400 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-500 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-slate-400">
              <p>Admin: anuragrawatz3k@gmail.com / anurag</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
