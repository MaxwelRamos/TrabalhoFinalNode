const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    login: {
        type: String
    },
    senha: {
        type: String
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports = Usuario
