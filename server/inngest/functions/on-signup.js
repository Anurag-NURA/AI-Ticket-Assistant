import { NonRetriableError } from "inngest";

import { inngest } from "../client.js";
import User from "../../models/user.model.js";
import { sendMail } from "../../utils/mailer.util.js";

export const onUserSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;

      //pipeline 1 - get user details from DB
      const user = await step.run("get-user-email", async () => {
        const userObject = await User.findOne({ email });
        if (!userObject) {
          throw new NonRetriableError("User does not exist in our database.");
        }
        return userObject;
      })

      //pipeline 2 - send welcome email
      await step.run("send-welcome-email", async () => {
        const subject = `Welcome to the Ticketing System, ${user.email}!`;
        const message = `Hi ${user.email},\n\nThank you for signing up for the Ticketing System. We're excited to have you on board!\n\nBest regards,\nThe Ticketing System Team`;

        await sendMail(user.email, subject, message);
      });

      return { success: true };
    } catch (error) {
      console.error("❌ Error running step:", error.message);
      return { success: false, error: error.message };
    }
  }
)