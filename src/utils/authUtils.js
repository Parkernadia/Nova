const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

exports.validatePassword = async function (password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};

exports.createAccessToken = async function (payload) {
    return await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    });
};

exports.decodeAccessToken = async function (token) {
    return await jwt.verify(token, process.env.JWT_SECRET);
};
