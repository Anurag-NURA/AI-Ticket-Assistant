import { NonRetriableError } from "inngest";

import Ticket from "../../models/ticket.model.js";
import User from "../../models/user.model.js";
import { sendMail } from "../../utils/mailer.util.js";
import { inngest } from "../client.js";
import analyzeTicket from "../../utils/ai.js";

export const onTicketCreated = inngest.createFunction(
  { id: 'on-ticket-created', retries: 2 },
  { event: "ticket/created" },
  async ({ event, step }) => {
    try {
      const { ticketId } = event.data;

      console.log("🚀 Processing ticket created event for ticket ID:", ticketId);

      //1st pipeline - fetch ticket details
      const ticket = await step.run("fetch-ticket", async () => {

        const ticketObject = await Ticket.findById(ticketId);

        if (!ticketObject) {
          throw new NonRetriableError("Ticket not found");
        }

        return ticketObject;
      })

      //2nd pipeline - update ticket status to TODO
      await step.run("update-ticket-status", async () => {
        await Ticket.findByIdAndUpdate(ticket._id, {
          status: "TODO"
        })
      });

      const aiResponse = await analyzeTicket(ticket);

      //3rd pipeline - process AI response and update ticket
      const relatedSkills = await step.run("ai-processing", async () => {
        let skills = [];

        //for explanation purposes only
        //priority: if ai hallucinates, default to low
        //relatedSkills: if ai hallucinates, default to empty array 
        if (aiResponse) {
          await Ticket.findByIdAndUpdate(ticket._id, {
            priority: ["low", "medium", "high"].includes(aiResponse.priority) ?
              aiResponse.priority : "low",
            helpfulNotes: aiResponse.helpfulNotes,
            status: "IN_PROGRESS",
            relatedSkills: aiResponse.relatedSkills
          })

          skills = aiResponse.relatedSkills
        }
        return skills;
      })

      //4th pipeline - assign moderator based on skills
      const moderator = await step.run("assign-moderator", async () => {
        let user = await User.findOne({
          role: "moderator",
          skills: {
            $elemMatch: {
              $regex: relatedSkills.join("|"),
              $options: "i"
            }
          }
        })

        if (!user) {
          user = await User.findOne({
            role: "admin"
          })
        }

        await Ticket.findByIdAndUpdate(ticket._id, {
          assignedTo: user?._id || null
        })
        return user;
      })

      //5th pipeline - send email notification to assigned moderator
      await step.run("send-email-notification", async () => {
        if (moderator) {
          const finalTicket = await Ticket.findById(ticket._id);

          await sendMail(
            moderator.email,
            "🎫 Ticket Assigned ",
            `New Ticket Assigned: ${finalTicket.title}`,
          )
        }
      })

      return { success: true, message: "Ticket processed successfully." };
    } catch (error) {
      console.error("❌ Error running step:", error.message);
    }
  }
)