const express = require('express');
const app = express();

const userRoutes = require("./routes/user");
const ProfileRoutes = require("./routes/Profile");
const PaymentRoutes = require("./routes/Payment");
const CourseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const { cloudinaryConnect } = require('./config/cloudinary');
const fileupload = require("express-fileupload");
const os = require('os');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: os.tmpdir(),
    })
);

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001","https://studynotion3-one.vercel.app"];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
)

//cloudinary connect
cloudinaryConnect();

// mount app
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", ProfileRoutes);
app.use("/api/v1/payment", PaymentRoutes);
app.use("/api/v1/course", CourseRoutes);

//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "your server is up and running",
    })
})

app.listen(PORT, (err) => {
    if (err) {
        console.error(`error in the ${err.message}`);
    }
    else {
        console.log(`app is running at ${PORT}`);
    }
})