
import express from 'express';
import './db/conn.js';
import dotEnv from 'dotenv';
import Products from './models/productSchema.js';
import DefaultData from './defaultdata.js';
import cors from 'cors';
import router from './routes/router.js';
import cookieParser from 'cookie-parser';

dotEnv.config();

// const PORT = process.env.PORT || 8005;
const PORT = process.env.PORT
const app = express();


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);


app.listen(PORT, () => {
    console.log(`Server is running at localhost://${PORT}`);
});

DefaultData();

