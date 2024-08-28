import Usuario from '../models/usuario.js'
import mongoose from "mongoose"

const registro = async(req,res)=>{
    const {nombre, apellido, email, password} = req.body
    //validaciones del backend
    if (Object.values(req.body).includes("")){
        return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    } 
    const caracteres = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!caracteres.test(nombre)) {
        return res.status(400).json({ msg: "El nombre solo puede contener letras y espacios" });
    }
    if (!caracteres.test(apellido)) {
        return res.status(400).json({ msg: "El apellido solo puede contener letras y espacios" });
    }

    //Bases de Datos
    const verificarEmailBDD = await Usuario.findOne({email})
    if(verificarEmailBDD){
        return res.status(400).json({msg:"El email ya se encuentra registrado, intente con uno diferente"})
    } 
    const nuevoUsuario = new Usuario(req.body)
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password)
    nuevoUsuario.crearToken()
    await nuevoUsuario.save()

    // Respuesta
    res.status(200).json({msg:"Usuario registrado correctamente"})
}

const login = async(req,res) =>{
    const {email,password} = req.body

    //Validaciones
    if (Object.values(req.body).includes("")){
        return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    }
    
    //BDD
    const usuarioBDD = await Usuario.findOne({email})
    if(usuarioBDD?.confirmEmail===false){
        return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    } 
    if(!usuarioBDD){
        return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    } 
    const verificarPassword = await usuarioBDD.matchPassword(password)
    if(!verificarPassword){
        return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    }
	const {nombre,apellido,_id} = usuarioBDD
    res.status(200).json({
        nombre,
        apellido,
        _id,
        email:usuarioBDD.email,
    })
}

const recuperarPassword = async (req, res) => {
    const { email, nuevopassword } = req.body;

    try {
        // Validar que ambos campos estén presentes
        if (!email || !nuevopassword) {
            return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
        }

        // Buscar el usuario por email
        const usuarioBDD = await Usuario.findOne({ email: email.trim() });

        // Si el usuario no existe
        if (!usuarioBDD) {
            return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });
        }

        // Encriptar la nueva contraseña
        usuarioBDD.password = await usuarioBDD.encrypPassword(nuevopassword);

        // Guardar el usuario actualizado
        await usuarioBDD.save();

        // Respuesta exitosa
        return res.status(200).json({ msg: "La contraseña fue cambiada exitosamente" });
    } catch (error) {
        console.error("Error al intentar recuperar la contraseña:", error);
        return res.status(500).json({ msg: "Hubo un error en el servidor" });
    }
}

export {
    registro,
    login,
    recuperarPassword
}