import { error } from 'console';
import {Sequelize} from 'sequelize-typescript'
const sequelize = new Sequelize({
    database : process.env.DB_NAME,
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    dialect : 'mysql',
    port : Number(process.env.DB_PORT),
    models : [__dirname + '/models']
})

sequelize.authenticate()
.then(()=>{
    console.log("Connected to MySQL.");
    
})
.catch((error)=>{
    console.log(error);
})

//migration code

sequelize.sync({alter: true}).then(()=>{
    console.log("Successfully Migrated to Database");
}).catch((error)=>{
    console.log(error);
    
})

export default sequelize