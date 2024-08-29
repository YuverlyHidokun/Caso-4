import { Router } from "express";
import {
    login,
    registro,
	recuperarPassword,
} from "../controllers/usuario_controller.js";

const router = Router()

router.post('/usuario/login',login)//OK
router.post('/usuario/registro',registro) //OK
router.post('/usuario/recuperar-password',recuperarPassword)//OK

export default router