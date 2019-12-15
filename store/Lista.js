const mongoose = require('mongoose')

const listaSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    usuarioId: {
        type: Number
    },
    descricao: {
        type: String
    }
})

const Lista = mongoose.model('Lista', listaSchema)
module.exports = Lista
