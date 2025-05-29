import {Sequelize} from 'sequelize'
const sequelize = new Sequelize({
    database : process.env.DB_NAME,
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    dialect : 'mysql',
    port : Number(process.env.DB_PORT)
})

sequelize.authenticate()
.then(()=>{
    console.log("Connected to MySQL.");
    
})
.catch((error)=>{
    console.log(error);
})