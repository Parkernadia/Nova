const Ticket = require("../models/ticketModel");

exports.addOneTicket = async function (data) {
    const ticket = new Ticket({ ...data, status: "open" });
    return await ticket.save();
};

exports.getOneTicketByID = async function (id) {
    return await Ticket.findById(id);
};

exports.getAllTickets = async function (query) {
    const tickets = await Ticket.find(query).populate("agentId");
    const transformedTickets = tickets.map((ticket) => {
        const ticketObj = ticket.toObject();
        ticketObj.agent = ticket.agentId;
        delete ticketObj.agentId;
        return ticketObj;
    });
    return transformedTickets;
};

exports.updateOneTicket = async function (id, data) {
    return await Ticket.findByIdAndUpdate(id, data, { new: true });
};

exports.addOneTicketAgent = async function (id, agentId, session = {}) {
    return await Ticket.findByIdAndUpdate(
        id,
        { agentId, assigned: true },
        {
            ...session,
            new: true,
        }
    );
};

exports.deleteOneTicket = async function (id) {
    return await Ticket.findByIdAndDelete(id);
};
