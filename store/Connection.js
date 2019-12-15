const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://dbUser:senha@cluster0-5eiq0.mongodb.net/test?retryWrites=true&w=majority'

const openConnection = () => mongoose.connect(connectionString, { useNewUrlParser: true })

module.exports = {
    openConnection,
}