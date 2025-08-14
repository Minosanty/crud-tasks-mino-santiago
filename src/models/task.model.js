import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const TaskModel = sequelize.define(
    "Task",{
             id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
         },
            title:{
            type: DataTypes.STRING(100),
             unique: true,
            allowNull: false,
        
         },
            
          description:{
            type: DataTypes.STRING(100),
            allowNull: false,

         }, isComplete:{
            type: DataTypes.BOOLEAN,
            allowNull: false,   
        },
        }
)   
//relacion tareas y usuarios 
TaskModel.belongsTo(UserModel, {foreignKey: "user_id", as: "author"})

UserModel.hasMany(TaskModel, { foreignKey: "user_id", as: "tasks"
})
export default task