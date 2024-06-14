const authUtils = require("../utils/authUtils");
const userService = require("../services/userService");

exports.login = async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await userService.getOneUserByEmail(email);

        //  || !user.isVerified
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }
        // check for password validity
        const validPassword = await authUtils.validatePassword(
            password,
            user.password
        );
        if (!validPassword) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        // proceed to login user and assign appropriate tokens
        const accessToken = await authUtils.createAccessToken({
            role: user.role,
            id: user.id,
            companyId: user.companyId,
        });
        user.password = undefined;
        return res.status(200).json({
            message: "Successfully logged in user",
            data: { user, accessToken },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to login user" });
    }
};

exports.registerAgent = async function (req, res, next) {
    try {
        const user = await userService.addOneUser({
            ...req.body,
            role: "Agent",
        });

        // proceed to assign appropriate tokens
        const accessToken = await authUtils.createAccessToken({
            role: user.role,
            id: user.id,
        });
        user.password = undefined;
        return res.status(200).json({
            message: "Agent registered successfully",
            data: { user, accessToken },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
