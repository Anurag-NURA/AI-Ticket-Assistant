import { Link } from 'react-router';

export const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="text-center mb-24">
          <div className="inline-block mb-6 px-5 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <span className="text-sm font-semibold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI-Powered Ticket Automation
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight text-slate-50">
            Support Tickets,
            <br />
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Solved Instantly
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Create support tickets once, let AI automate the entire workflow. No manual intervention. No delays. Pure
            automation powered by Inngest.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/tickets/create"
              className="px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105"
            >
              Create Your First Ticket
            </Link>
            <Link
              to="/tickets"
              className="px-8 py-4 border-2 border-slate-700 text-slate-100 font-semibold rounded-lg hover:border-cyan-500/50 hover:bg-slate-900/50 transition-all duration-300"
            >
              View All Tickets
            </Link>
          </div>
        </div>

        {/* Ticket-themed Features Grid */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-100">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ticket Card 1 */}
            <div className="group relative bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="absolute top-3 right-3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 border border-cyan-500/30">
                <span className="text-2xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Create Ticket</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Submit your problem statement with title and description. Just like GitHub issues.
              </p>
            </div>

            {/* Ticket Card 2 */}
            <div className="group relative bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="absolute top-3 right-3 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center mb-4 border border-blue-500/30">
                <span className="text-2xl font-bold text-blue-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">AI Analysis</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Inngest workflows kick off automatically to analyze and process your ticket.
              </p>
            </div>

            {/* Ticket Card 3 */}
            <div className="group relative bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10">
              <div className="absolute top-3 right-3 w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mb-4 border border-violet-500/30">
                <span className="text-2xl font-bold text-violet-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Automation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tasks execute automatically without manual intervention or delays.
              </p>
            </div>

            {/* Ticket Card 4 */}
            <div className="group relative bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <div className="absolute top-3 right-3 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mb-4 border border-emerald-500/30">
                <span className="text-2xl font-bold text-emerald-400">4</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Resolved</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your ticket is resolved with all workflow steps completed instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-100">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-linear-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-xl p-8 hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Instant Processing</h3>
              <p className="text-slate-400">
                Tickets are processed immediately using AI-powered automation. No waiting, no queues.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-linear-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-xl p-8 hover:border-blue-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Smart Categorization</h3>
              <p className="text-slate-400">
                AI automatically categorizes and prioritizes tickets for optimal workflow efficiency.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-linear-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-xl p-8 hover:border-violet-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors">
                <svg className="w-7 h-7 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Real-time Tracking</h3>
              <p className="text-slate-400">
                Track ticket status and workflow progress in real-time with detailed analytics.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-cyan-500/30 rounded-2xl p-12 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Ready to Automate?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Start creating tickets and experience the power of AI-driven automation. No credit card required.
          </p>
          <Link
            to="/create"
            className="inline-block px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105"
          >
            Create Your First Ticket Now
          </Link>
        </div>
      </div>
    </div>
  )
}
