const mongoose = require('mongoose')

const tarefaSchema = new mongoose.Schema({
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
    },
    status: {
        type: String,
        default: 'pendente'
    }
})

const Tarefa = mongoose.model('Tarefa', tarefaSchema)
module.exports = Tarefa
