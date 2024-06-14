const express = require("express");

const router = express.Router();

router.route("/health-check").get(async (req, res) => {
    return res
        .status(200)
        .json({ message: "Great! NOVA Ticketing Application is online" });
});

module.exports = router;
