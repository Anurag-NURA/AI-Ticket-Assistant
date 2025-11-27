import { inngest } from '../inngest/client.js';
import Ticket from '../models/ticket.model.js';

//@route POST /tickets/create
//@desc Create a new ticket and trigger processing
//@access Private
export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    console.log("Creating ticket with title:", title, "and description:", description);

    const newTicket = await Ticket.create({
      title,
      description,
      createdBy: req.user._id.toString()
    });

    await inngest.send({
      name: "ticket/created",
      data: {
        ticketId: newTicket._id.toString(),
        title: newTicket.title,
        description: newTicket.description,
        createdBy: req.user._id.toString()
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Ticket created successfully and processing started',
      ticket: newTicket
    });
  } catch (error) {
    console.error('Error creating ticket:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

//@route GET /tickets
//@desc Get all tickets for the logged-in user
//@access Private
export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    let tickets = [];
    if (user.role !== "user") {
      //it means admin and moderator get all tickets
      tickets = await Ticket
        .find({})
        .populate("assignedTo", ["email", "_id"])
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket
        .find({ createdBy: user._id })
        .select("title description status createdAt").sort({ createdAt: -1 });
    }
    return res.status(200).json({
      success: true,
      message: 'Tickets fetched successfully',
      tickets
    })
  } catch (error) {
    console.error('Error fetching tickets:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

//@route GET /tickets/:id
//@desc Get ticket details by provided ticket ID
//@access Private
export const getTicketById = async (req, res) => {
  try {
    const user = req.user;
    let ticket;

    if (user.role !== "user") {
      ticket = await Ticket
        .findById(req.params.id)
        .populate("assignedTo", ["email", "_id"]);
    } else {
      ticket = await Ticket
        .findOne({ _id: req.params.id, createdBy: user._id })
        .select("title description status createdAt");
    }

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket fetched successfully",
      ticket
    });
  } catch (error) {
    console.error('Error fetching ticket:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}