import { Link } from 'react-router';

export const Header = () => {

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-backdrop-filter:bg-slate-950/80">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold group">
          <span className="text-2xl">⚡</span>
          <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">TicketAI</span>
        </Link>
        <div className="flex gap-4 md:gap-6 items-center">
          <Link to="/tickets" className="text-sm text-slate-300 hover:text-white transition-colors">
            Tickets
          </Link>
          <Link to="/tickets/create" className="btn btn-sm btn-primary text-white">
            + New Ticket
          </Link>
        </div>
      </div>
    </nav>
  )
}