const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    nombre: String,
    apellido: String,
    rol: String,
    activado: Boolean
});

module.exports = userSchema;