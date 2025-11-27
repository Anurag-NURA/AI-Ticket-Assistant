import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { serve } from "inngest/express"


import { connectDB } from "./configs/db.configs.js";
import userRoutes from "./routers/user.routes.js";
import ticketRoutes from "./routers/ticket.routes.js";
import { inngest } from "./inngest/client.js";
import { onUserSignup } from "./inngest/functions/on-signup.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-created.js";


dotenv.config();
connectDB(process.env.MONGO_URI);
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.use("/api/inngest",
    serve({
        client: inngest,
        functions: [onUserSignup, onTicketCreated],
    })
)
app.use("/api", (req, res) => {
    res.json({
        success: true,
        heading: "Welcome to the Ticketing System API",
        message: "Explore the various endpoints to manage tickets and users.",
    });
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
