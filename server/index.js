import express from "express"
import mongoose from "mongoose"
import {router} from "./routes/routes.js"
import cors from "cors"
import dotenv from "dotenv";




const app =  express();
app.use(cors()); 
app.use(express.json());//enable the use of json in the app
dotenv.config();
app.use('/',router);//use routes.js to handle endpoints
const PORT = process.env.PORT || 8000;

// MongoDB username and password
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

// Connect to your MongoDB database
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttwbtag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(PORT, (error)=>{
    if(error) throw error;
    console.log(`Server is running at http://localhost:${PORT}`);
 });