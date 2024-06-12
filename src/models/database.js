const mongoose = require("mongoose");

exports.connectDb = async function () {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("Error connecting to database\n", error);
        process.exit(1);
    }
};
