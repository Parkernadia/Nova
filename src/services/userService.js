const User = require("../models/userModel");
const authUtils = require("../utils/authUtils");

exports.addOneUser = async function (data, session = {}) {
    const hashedPassword = await authUtils.hashPassword(data.password);
    const user = new User({ ...data, password: hashedPassword });
    return await user.save(session);
};

exports.getOneUserByEmail = async function (email) {
    return await User.findOne({ email }).select("+password");
};

exports.getOneUserByID = async function (id) {
    return await User.findById(id);
};

exports.getOneUserByRole = async function (role) {
    return await User.findOne({ role });
};

exports.getAllUsers = async function (query) {
    return await User.find(query);
};

exports.updateOneUser = async function (id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

exports.updateOneUserStatus = async function (id, session = {}) {
    return await User.findByIdAndUpdate(
        id,
        { active: false },
        { ...session, new: true }
    );
};

exports.deleteOneUser = async function (id) {
    return await User.findByIdAndDelete(id);
};
