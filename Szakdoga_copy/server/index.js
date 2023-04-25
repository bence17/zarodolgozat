/* eslint-disable no-undef */
import express, { json } from "express";
import cors from "cors";
import oraAllasokRoute from "./routes/oraAllasok.js";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

app.use(json());
app.use(cors({ credentials: true, origin: true })); // Required for cookie
app.use(cookieParser());

app.use("/oraAllasok", oraAllasokRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(port, () => console.log(`server is listening on port ${port}`));
