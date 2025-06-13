//using ecma script
import express from 'express'
const app = express();

//json parsing
app.use(express.json())

import authRoute from './routes/global/auth.route'
import instituteRoute from './routes/institute/institute.route'



//importing routes
app.use("/api",authRoute);
app.use("/api/institute",instituteRoute);

export default app