import { Link } from 'react-router';

export const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
            <span className="text-sm text-blue-400">AI-Powered Support</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Automate Your Ticket Workflow
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Create support tickets and let AI automatically handle the workflow. No manual effort required.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/tickets/create" className="btn btn-lg btn-primary">
              Create First Ticket
            </Link>
            <Link to="/tickets" className="btn btn-lg btn-outline">
              View Tickets
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Instant Automation</h3>
            <p className="text-slate-400">AI processes tickets automatically using Inngest workflows</p>
          </div>
          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Real-time Progress</h3>
            <p className="text-slate-400">Track AI automation progress on every ticket</p>
          </div>
          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors">
            <div className="text-3xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">Smart Organization</h3>
            <p className="text-slate-400">Tickets are categorized and prioritized automatically</p>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-10">
          <h2 className="text-3xl font-bold mb-10 text-center">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">Create Ticket</h4>
              <p className="text-sm text-slate-400">Describe your problem</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">AI Analysis</h4>
              <p className="text-sm text-slate-400">Inngest workflow kicks off</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">Automation</h4>
              <p className="text-sm text-slate-400">Tasks executed automatically</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h4 className="font-semibold mb-2">Done</h4>
              <p className="text-sm text-slate-400">Ticket resolved instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
