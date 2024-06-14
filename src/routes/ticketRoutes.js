const express = require("express");
const {
    validateResource,
    validateWithParams,
    validateWithQuery,
} = require("../middlewares/validateResource");
const { requireAuth, hasPermission } = require("../middlewares/authMiddleware");
const ticketController = require("../controllers/ticketController");
const {
    createTicketSchema,
    updateTicketSchema,
    addTicketAgentSchema,
} = require("../schemas/ticketSchema");

const router = express.Router();

// make POST endpoint accessible to all users

router
    .route("/tickets")
    .post(validateResource(createTicketSchema), ticketController.addOneTicket)
    .get(requireAuth, ticketController.getAllTickets);

router.use(requireAuth);
router
    .route("/tickets/:id")
    .get(ticketController.getOneTicketById)
    .patch(
        validateResource(updateTicketSchema),
        ticketController.updateOneTicketStatus
    )
    .delete(ticketController.deleteOneTicket);

router.use(hasPermission("CompanyAdmin"));
router
    .route("/tickets/:id/agents")
    .post(
        validateResource(addTicketAgentSchema),
        ticketController.addOneTicketAgent
    );

module.exports = router;
