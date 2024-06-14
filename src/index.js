require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDb } = require("./models/database");
const { globalError } = require("./middlewares/errorHandler");
const healthCheckRoute = require("./routes/healthCheck");
const notFoundRoute = require("./routes/notFound");
const companyRoutes = require("./routes/companyRoutes");
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");

// create instance of express application
const app = express();

// define middlewares for application
app.use(cors());
app.use(express.json());

// define routes
app.use(healthCheckRoute);
app.use(companyRoutes);
app.use(authRoutes);
app.use(ticketRoutes);
app.use(userRoutes);

app.use(notFoundRoute);

app.use(globalError);

app.listen(8000, async () => {
    console.log("Server is listening on port 8000");
    await connectDb();
});
