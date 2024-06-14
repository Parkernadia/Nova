const userService = require("../services/userService");

exports.getAllAgents = async function (req, res, next) {
    try {
        const agents = await userService.getAllUsers({ role: "Agent" });
        return res.status(200).json({
            message: "Agents fetched successfully",
            data: agents,
        });
    } catch (error) {
        next(error);
    }
};

exports.getOneAgent = async function (req, res, next) {
    try {
        const agent = await userService.getOneUserByID(req.params.id);

        if (!agent || !agent.role === "Agent") {
            return res.status(404).json({ message: "Agent not found" });
        }
        return res.status(200).json({
            message: "Agent fetched successfully",
            data: agent,
        });
    } catch (error) {
        next(error);
    }
};
