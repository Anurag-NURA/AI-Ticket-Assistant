import { createAgent, gemini } from "@inngest/agent-kit"

const analyzeTicket = async (ticket) => {
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-2.0-flash",
      apiKey: process.env.GEMINI_API_KEY,
      apiVersion: "v1beta"
    }),
    schema: {
      type: "object",
      properties: {
        summary: { type: "string" },
        priority: { type: "string" },
        helpfulNotes: { type: "string" },
        relatedSkills: {
          type: "array",
          items: { type: "string" }
        },
      },
      required: ["summary", "priority", "helpfulNotes", "relatedSkills"],
    },
    name: "AI Ticket Triage Assistant",
    system: `You are an expert AI assistant that processes technical support tickets.
    
    Your job is to:
    1. Summarize the issue.
    2. Estimate the priority.
    3. Provide helpful notes and resource links for human moderators.
    4. List relevant technical skills required.
    
    IMPORTANt:
    - Respond with *only* valid raw JSON.
    - Don NOT include markdown, code fences, comments, or any extra formatting.
    - The format must be a raw JSON object
    
    REPEAT: Do not wrap your output in markdown or code fences. Output raw JSON only.`
  })

  const response = await supportAgent.run(`You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
    
    Analyze the following support ticket and provide a JSON object with:

    -summary: a short 1-2 sentence summary of the issue.
    -priority: one of ["low", "medium", "high"]
    -helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include userful external links or resources if possible.
    -relatedSkills: An array of relevant skills required to solve the issue (e.g. ["JavaScript", "Node.js", "React", "MongoDB"])

    Respond ONLY in this JSON format and do not include any othe text or markdown in the answer, example:

    {
      summary: "The user is experiencing issues with...",
      priority: "high",
      helfulNotes: "Here are userful tips...",
      relatedSkills: ["JavaScript", "Node.js"]
    }

    ---
    
    Ticket information:
    -Title: ${ticket.title}
    - Description: ${ticket.description}
    `)


  const raw = response.output?.[0]?.content ?? response.output?.[0]?.context;
  try {
    const match = raw.match(/```json\s*([\s\S]*?)\s*```/i)
    const jsonString = match ? match[1] : raw.trim()
    return JSON.parse(jsonString)
  } catch (error) {
    console.log("Error parsing AI response:", error.message)
    return null; // WATCH OUT FOR THIS!!!
  }
}

export default analyzeTicket;