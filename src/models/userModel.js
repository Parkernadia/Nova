const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: [true, "Email should be unique"],
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
        companyId: {
            type: mongoose.Types.ObjectId,
            ref: "Company",
        },
    },
    { timestamps: true }
);

userSchema.index({ email: 1 });
module.exports = User = mongoose.model("User", userSchema);
