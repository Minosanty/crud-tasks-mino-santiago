import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const task = sequelize.define(
    "task",{
             id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
         },
            title:{
            type: DataTypes.STRING,
            allowNull: false,
        
         },
            
          description:{
            type: DataTypes.STRING,
            allowNull: false,

         }, isComplete:{
            type: DataTypes.BOOLEAN,
            allowNull: false,   
        }
        }
)   
export default task