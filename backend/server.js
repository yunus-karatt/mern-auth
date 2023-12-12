import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
// import bodyParser from "body-parser";
// import cors from 'cors'
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static('backend/public/images'));

app.use("/api/users", userRoutes);
app.use("/api/admin",adminRoutes)

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
