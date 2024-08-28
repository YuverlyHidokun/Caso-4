import {Schema, model} from 'mongoose'

const clienteSchema = new Schema({
    cedula:{
        type: Number,
        require: true,
        trim: true
    },
    nombre:{
        type: String,
        require: true,
        trim: true 
    },
    apellido:{
        type: String,
        require: true,
        trim: true,
    },
    ciudad:{
        type: String,
        trim: true,
        default: null
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    telefono:{
        type:Number,
        trim:true,
        default:null
    },
    fecha_nacimiento:{
        type:Number,
        trim:true,
        default:null
    },
    dependencia:{
        type: String,
        trim: true,
        default: null
    }
},{
    timestamps:true
})

export default model('Cliente', clienteSchema)