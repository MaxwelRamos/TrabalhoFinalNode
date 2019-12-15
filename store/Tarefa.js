const mongoose = require('mongoose')

const listaSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    listaid: {
        type: Number
    },
    usuarioId: {
        type: Number
    },
    descricao: {
        type: String
    }
})

const Lista = mongoose.model('Tarefa', listaSchema)
module.exports = Lista
