//using ecma script
import express from 'express'
const app = express();

//json parsing
app.use(express.json())

//importing routes
import authRoute from '../routes/global/auth.route'
app.use("/api",authRoute);

export default app