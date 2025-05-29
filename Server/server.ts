
import { envConfig } from "./config/config";
import app from "./src/app"

function startServer(){
    const port = envConfig.portNumber;

    app.listen(port,()=>{
        console.log(`Server started at port ${port}`);
    })
}

startServer()