import express from "express";
import { actulizarTask, crearTask , eliminacion, obtenerPorId, obtenerTodosLosTask } from "../controllers/task.controllers.js";
const router = express.Router();

router.get("/tasks", obtenerTodosLosTask);
router.get("/tasks/:id", obtenerPorId);
router.post("/tasks", crearTask );
router.put("/tasks/:id", actulizarTask);
router.delete("/tasks/:id", eliminacion);

export default router;