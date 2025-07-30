import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import propertyRouter from "./routes/property.routes.js";
import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";



dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log('Mongodb connected'))
.catch((err)=>console.log('Mongodb connection error:',err))

// Routes
app.use('/api/properties', propertyRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Property API is running!' });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;