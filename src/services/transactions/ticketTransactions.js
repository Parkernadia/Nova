const mongoose = require("mongoose");
const ticketService = require("../ticketService");
const userService = require("../userService");

exports.assignTicketAgent = async function (ticketId, agentId) {
    const session = await mongoose.startSession();
    try {
        const ticket = await session.withTransaction(async () => {
            const ticket = await ticketService.addOneTicketAgent(
                ticketId,
                agentId,
                {
                    session,
                }
            );
            // update agent status
            await userService.updateOneUserStatus(agentId, { session });

            return ticket;
        });
        return ticket;
    } catch (error) {
        throw error;
    } finally {
        (await session).endSession();
    }
};
