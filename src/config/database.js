import { Sequelize } from "sequelize";
import  dotenv  from "dotenv";
dotenv.config()

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {  
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    } 
    
)
export const start_DB = async() =>{
    try{ 
    await sequelize.authenticate()
     console.log("se puedo conectar con la base de datos ")
    await sequelize.sync()

}catch (err) {
        console.log("Error al conectarse con la base de datos:");
    }      
}