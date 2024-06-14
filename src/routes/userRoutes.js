const express = require("express");
const {
    validateResource,
    validateWithParams,
    validateWithQuery,
} = require("../middlewares/validateResource");
const userController = require("../controllers/userController");
const { requireAuth, hasPermission } = require("../middlewares/authMiddleware");

const router = express.Router();

// restrict endpoint to only authorized users
router.use(requireAuth, hasPermission("CompanyAdmin"));

router.route("/agents").get(userController.getAllAgents);

router.route("/agents/:id").get(userController.getOneAgent);

module.exports = router;
