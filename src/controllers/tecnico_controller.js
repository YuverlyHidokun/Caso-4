import { mongoose } from "mongoose";
import Tecnico from "../models/tecnico.js"

const crearTecnico = async(req, res) =>{
    const {nombre, apellido, cedula, fecha_nacimiento, genero, direccion, telefono, email} = req.body
    
    //Validaciones
    if (Object.values(req.body).includes("")){
        return res.status(400).json({msg:"Debe llenar todos los campos"})
    }
    const verificarCedula = await Tecnico.findOne({cedula})
    if(verificarCedula){
        return res.status(400).json({msg:"Ya existe un Tecnico con esa cedula"})
    } 
    const Verificartelefono = await Tecnico.findOne({telefono})
    if(Verificartelefono){
        return res.status(400).json({msg:"Lo sentimos, el telefono ya se encuentra registrado"})
    }
    const verificarEmail = await Tecnico.findOne({email})
    if(verificarEmail){
        return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    }

    //Base de Datos
    const nuevoTecnico= new Tecnico({nombre, apellido, cedula, fecha_nacimiento, genero, direccion, telefono, email})
    await nuevoTecnico.save()

    res.status(200).json({msg:"El tecnico fue Registrado con exito"})

}
const VerTecnico = async (req,res) => {
    try{
        const tecnicos = await Tecnico.find().select("-createdAt -updatedAt -__v");
        res.json(tecnicos)
    } catch (error) {
        res.status(500).json({msg:"Hubo un error al mostrar los tecnicos", error})
    }
}

const detalleTecnico = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, no se encuentra registrado el tecnico`});
    const tecnico = await Tecnico.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(tecnico)
}

const ActualizarTecnico = async (req, res) => {
    const { id } = req.params;

    // Validaciones
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debe llenar todos los datos" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "No se ha encontrado a un técnico con ese ID" });
    }

    try {
        // Actualizar el técnico
        const tecnicoActualizado = await Tecnico.findByIdAndUpdate(id, req.body, { new: true });

        // Si el técnico no se encuentra
        if (!tecnicoActualizado) {
            return res.status(404).json({ msg: "Técnico no encontrado" });
        }

        // Responder con el técnico actualizado
        res.status(200).json(tecnicoActualizado);
    } catch (error) {
        console.error("Error al actualizar el técnico:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const EliminarTecnico = async (req,res) => {
    // Solicitud
    const {id} = req.params
    // Validaciones
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:"Lo sentimos, no se ha encontrado al tecnico"})
    // BDD
    await Tecnico.findByIdAndDelete(id)
    // Respuesta
    res.status(200).json({msg:"El registro del tecnico ha sido eliminado exitosamente"})
}


export{
    crearTecnico,
    VerTecnico,
    detalleTecnico,
    ActualizarTecnico,
    EliminarTecnico
}