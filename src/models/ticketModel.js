const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        customerName: {
            type: String,
            required: true,
        },
        customerEmail: {
            type: String,
            required: true,
        },
        assigned: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            required: true,
        },
        agentId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = User = mongoose.model("Ticket", ticketSchema);
