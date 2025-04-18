// Dependencies
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

// Config
import {connectDB} from "./config/connectDB";

// Routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import pageRoutes from "./routes/page.routes";
import roleRoutes from "./routes/role.routes";
import elementRoutes from "./routes/element.routes";


const app = express();
const port:string|number = process.env.PORT || 3000;

// Connecting to databse
connectDB()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/page', pageRoutes);
app.use('/api/v1/role', roleRoutes);
app.use('/api/v1/element',elementRoutes);

app.listen(port, ():void => {
    console.log(`Server running on port http://localhost:${port}`);
})