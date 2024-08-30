import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        maxlength: 20
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 50
    },
    id_cliente: {
        type: Schema.Types.ObjectId,  // Usar Schema en lugar de mongoose.Schema
        ref: "Cliente"
    },
    id_tecnico: [{
        type: Schema.Types.ObjectId,  // Usar Schema en lugar de mongoose.Schema
        ref: "Tecnico"
    }]
}, {
    timestamps: true
});

export default model('Ticket', ticketSchema);
