import { CreateTicketForm } from '@components';


export const CreateTicket = () => {

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create New Ticket</h1>
          <p className="text-slate-400">Describe your issue and let AI automate the workflow</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
          <CreateTicketForm />
        </div>
      </div>
    </div>
  )
}
