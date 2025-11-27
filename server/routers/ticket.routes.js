import express from "express"

import { authenticate } from "../middlewares/auth.middleware.js";
import { createTicket, getTickets, getTicketById } from "../controllers/ticket.controller.js";

const router = express.Router();

router.route("/").get(authenticate, getTickets);
router.route("/create").post(authenticate, createTicket);
router.route("/:id").get(authenticate, getTicketById);


export default router;