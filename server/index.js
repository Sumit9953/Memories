import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/User.js'


dotenv.config('./.env');

const app = express();

import cookieParser from "cookie-parser"

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use('/posts' , postRoutes);
app.use("/auth" , userRoutes)

// const CONNECTION_URL =
//   "mongodb+srv://SumitJs:sumit2011@cluster0.qjoy0ur.mongodb.net/social_media_JS?retryWrites=true&w=majority";

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));

// mongoose.set("useFindAndModify", false);

// app.listen(PORT,() => {
//     console.log('app is running');
// })
