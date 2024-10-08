const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors');
const loginRoutes = require('./Routes/loginRoute');
const signupRoutes = require('./Routes/signupRoute');
const expressSession = require("express-session");
const passport = require("passport");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
    origin: 'https://skailama-rust.vercel.app', // Frontend URL without the trailing slash
    credentials: true, // Allows cookies and HTTP authentication
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((err) => {
        console.log("Connection failed!");
        console.log(err);
    });

// Routes
app.use("/api/user/login", loginRoutes);
app.use("/api/user/signup", signupRoutes);
app.use("/projects", require("./Routes/projectsRoute"));
app.use("/users", require("./Routes/usersRoute"));
app.use("/videos", require("./Routes/videosRoute"));
app.use("/transcript", require("./Routes/transcriptRoutes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;