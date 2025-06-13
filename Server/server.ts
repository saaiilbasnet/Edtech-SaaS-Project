import {config} from 'dotenv'
config()
import app from "./src/app"

//importing connection.ts
import './src/database/connection'

function startServer(){
    const port = process.env.PORT;

    app.listen(port,()=>{
        console.log(`Server started at port ${port}`);
    })
}

startServer()