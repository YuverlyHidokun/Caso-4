import{
    CrearCliente,
    VerCliente,
    detalleCliente,
    ActualizarCliente,
    EliminarCliente
} from "../controllers/cliente_controller.js"
import verificarJWT from "../middlewares/verificarJWT.js";

import {Router} from "express"

const route = Router()

// Protege las rutas con verificarJWT
route.post("/cliente/crear", verificarJWT, CrearCliente)//Ok
route.get("/cliente/ver", verificarJWT, VerCliente)//OK
route.get("/cliente/ver/:id", verificarJWT, detalleCliente)//OK
route.put("/cliente/actualizar/:id", verificarJWT, ActualizarCliente)
route.delete("/cliente/eliminar/:id", verificarJWT, EliminarCliente)

export default route