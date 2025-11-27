import { useEffect, useState } from "react";
import { Link } from "react-router";

export const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">All Tickets</h2>
      <div className="space-y-3">
        {tickets.map((ticket) => (
          <Link
            key={ticket._id}
            className="card shadow-md p-4 bg-gray-800"
            to={`/tickets/${ticket._id}`}
          >
            <h3 className="font-bold text-lg">{ticket.title}</h3>
            <p className="text-sm">{ticket.description}</p>
            <p className="text-sm text-gray-500">
              Created At: {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </Link>
        ))}
        {tickets.length === 0 && <p>No tickets submitted yet.</p>}
      </div>
    </div>
  );
}