 import express from "express";
import { actulizarUser, crearUser , eliminacion, obtenerPorId, obtenerTodosLosUser } from "../controllers/user.controllers.js";
const router = express.Router();

router.get("/users", obtenerTodosLosUser);
router.get("/users/:id", obtenerPorId);
router.post("/users", crearUser );
router.put("/users/:id", actulizarUser);
router.delete("/users/:id", eliminacion);

export default router;