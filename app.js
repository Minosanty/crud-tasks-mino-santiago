import express from "express";
import taskRouter from "./src/routes/task.routes.js";
import userRouter from "./src/routes/user.routes.js";
import {start_DB} from "./src/config/database.js"


const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api", taskRouter);
app.use("/api", userRouter);

app.use((req, res)=>{
    res.status(404).json({errorMessage: "Direction not found."});
});

start_DB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Servidor corriendo en http://localhost:"+PORT);
    });
});