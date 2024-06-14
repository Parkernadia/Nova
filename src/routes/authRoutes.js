const express = require("express");
const {
    validateResource,
    validateWithParams,
    validateWithQuery,
} = require("../middlewares/validateResource");
const authController = require("../controllers/authController");
const { loginSchema, registerAgentSchema } = require("../schemas/authSchema");
const { requireAuth, hasPermission } = require("../middlewares/authMiddleware");

const router = express.Router();

router
    .route("/login")
    .post(validateResource(loginSchema), authController.login);

// restrict endpoint to only authorized users
router.use(requireAuth, hasPermission("CompanyAdmin"));
router
    .route("/register-agent")
    .post(validateResource(registerAgentSchema), authController.registerAgent);

module.exports = router;
