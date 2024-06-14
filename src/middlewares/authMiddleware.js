const authUtils = require("../utils/authUtils");

exports.requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const decodedToken = await authUtils.decodeAccessToken(token);

        req.user = {
            id: decodedToken.id,
            companyId: decodedToken.companyId,
            role: decodedToken.role,
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: "User not authorized" });
    }
};

//restrict routes depending on roles
exports.hasPermission = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                message: "You are not authorized to perform this action",
            });
        }
        next();
    };
};
