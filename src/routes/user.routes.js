 import express from "express";
import { actulizarUser, crearUser , eliminacion, obtenerPorId, obtenerTodosLosUser } from "../controllers/user.controllers.js";
const router = express.Router();

router.get("/user", obtenerTodosLosUser);
router.get("/user/:id", obtenerPorId);
router.post("/user", crearUser );
router.put("/user/:id", actulizarUser);
router.delete("/user/:id", eliminacion);

export default router;