'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    login: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);