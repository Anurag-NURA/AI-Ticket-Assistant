import { useState } from "react"

export const CreateTicketForm = () => {

  const [form, setForm] = useState({ title: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log("Submitting form:", form);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log(data);
      if (res.ok) {
        setForm({ title: "", description: "" });
      } else {
        alert(data.message || "Ticket creation failed");
      }
    } catch (err) {
      alert("Error creating ticket");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label className="block text-sm font-semibold text-slate-100 mb-3">Ticket Title</label>
        <input
          name="title"
          type="text"
          placeholder="Ticket Title"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-semibold text-slate-100 mb-3">Description</label>
        <textarea
          name="description"
          placeholder="Ticket Description"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors resize-none h-36"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* <div>
        <label className="block text-sm font-semibold text-slate-100 mb-3">Priority Level</label>
        <select
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low - Can wait</option>
          <option value="medium">Medium - Standard priority</option>
          <option value="high">High - Needs attention</option>
          <option value="critical">Critical - Urgent</option>
        </select>
      </div> */}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting || !form.title || !form.description}
        className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Creating...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Ticket
          </>
        )}
      </button>
    </form>
  )
}