require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDb } = require("./models/database");
const healthCheckRoute = require("./routes/healthCheck");
const notFoundRoute = require("./routes/notFound");
const companyRoutes = require("./routes/companyRoutes");

// create instance of express application
const app = express();

// define middlewares for application
app.use(cors());
app.use(express.json());

// define routes
app.use(healthCheckRoute);
app.use(companyRoutes);

app.use(notFoundRoute);

app.listen(8000, async () => {
    console.log("Server is listening on port 8000");
    await connectDb();
});
