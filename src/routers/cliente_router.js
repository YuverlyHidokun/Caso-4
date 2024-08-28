import{
    CrearCliente,
    VerCliente,
    detalleCliente,
    ActualizarCliente,
    EliminarCliente
} from "../controllers/cliente_controller.js"

import {Router} from "express"

const route = Router()

route.post("/cliente/crear", CrearCliente)
route.get("/cliente/ver", VerCliente)
route.get("/cliente/ver/:id", detalleCliente)
route.put("/cliente/actualizar/:id", ActualizarCliente)
route.delete("/cliente/eliminar/:id", EliminarCliente)

export default route