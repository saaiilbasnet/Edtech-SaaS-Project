//using ecma script
import express from 'express'
const app = express();

//json parsing
app.use(express.json())

import authRoute from './routes/global/auth.route'
import instituteRoute from './routes/institute/institute.route'
import courseRoute from './routes/institute/course/course.route'
import studentRoute from './routes/student/student.route'
import categoryRoute from './routes/institute/category/category.route'

//importing routes
app.use("/api",authRoute);
app.use("/api/institute",instituteRoute);
app.use("/api/institute/course",courseRoute);
app.use("/api/student",studentRoute);
app.use("/api/institute/category", categoryRoute);

export default app