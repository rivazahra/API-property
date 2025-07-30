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
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://127.0.0.1:3000',
    'https://yariga-property-hub.netlify.app/'
  ],
  credentials:'true',
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Tambah ini
  allowedHeaders: [ // Tambah ini
    'Content-Type', 
    'Authorization', 
    'x-access-token',
    'Origin',
    'X-Requested-With',
    'Accept'
  ],
  optionsSuccessStatus: 200 // Tambah ini
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors())

// MongoDB Connection
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log('Mongodb connected'))
.catch((err)=>console.log('Mongodb connection error:',err))

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Property API is running!' });
});

const PORT =  8080;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;