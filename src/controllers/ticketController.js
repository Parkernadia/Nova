const ticketService = require("../services/ticketService");
const ticketTransactions = require("../services/transactions/ticketTransactions");

exports.addOneTicket = async function (req, res, next) {
    try {
        const ticket = await ticketService.addOneTicket(req.body);

        return res
            .status(201)
            .json({ message: "Ticket created successfully", data: ticket });
    } catch (error) {
        next(error);
    }
};

exports.updateOneTicketStatus = async function (req, res, next) {
    try {
        const ticket = await ticketService.updateOneTicket(
            req.params.id,
            req.body
        );

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        return res
            .status(200)
            .json({ message: "Ticket status successfully", data: ticket });
    } catch (error) {
        next(error);
    }
};

exports.deleteOneTicket = async function (req, res, next) {
    try {
        const ticket = await ticketService.deleteOneTicket(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        return res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.getAllTickets = async function (req, res, next) {
    try {
        const tickets = await ticketService.getAllTickets(req.query);
        return res
            .status(200)
            .json({ message: "Tickets fetched successfully", data: tickets });
    } catch (error) {
        next(error);
    }
};

exports.getOneTicketById = async function (req, res, next) {
    try {
        const ticket = await ticketService.getOneTicketByID(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        return res
            .status(200)
            .json({ message: "Ticket fetched successfully", data: ticket });
    } catch (error) {
        next(error);
    }
};

exports.addOneTicketAgent = async function (req, res, next) {
    try {
        // assign agent to ticket and change agent status
        const ticket = await ticketTransactions.assignTicketAgent(
            req.params.id,
            req.body.agentId
        );
        return res.status(200).json({
            message: "Agent assigned to ticket successfully",
            data: ticket,
        });
    } catch (error) {
        next(error);
    }
};
