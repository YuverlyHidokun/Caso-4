// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerusuario from "./routers/usuario_router.js"
import routertecnico from "./routers/tecnico_router.js"


// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Variables globales


// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})

app.use("/caso4", routerusuario)
app.use("/caso4", routertecnico)

// Exportar la instancia de express por medio de app
export default  app