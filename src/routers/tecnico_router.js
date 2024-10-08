import {
    crearTecnico,
    VerTecnico,
    detalleTecnico,
    ActualizarTecnico,
    EliminarTecnico
} from "../controllers/tecnico_controller.js";
import { Router } from "express";
import verificarJWT from "../middlewares/verificarJWT.js";

const router = Router();

// Protege las rutas con verificarJWT
router.post("/tecnico/crear", verificarJWT, crearTecnico);//OK
router.get("/tecnico/ver", verificarJWT, VerTecnico);//OK
router.get("/tecnico/ver/:id", verificarJWT, detalleTecnico);//OK
router.put("/tecnico/actualizar/:id", verificarJWT, ActualizarTecnico);//OK
router.delete("/tecnico/eliminar/:id", verificarJWT, EliminarTecnico);//OK

export default router;
