const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        uniqe: true,
        
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
    },
    withdraws: [{by: Number, date: Date }],
    transactions: [{by: Number, taken: Boolean, from: String}],
    deposit: [{by: Number, date: Date}]
})

module.exports = mongoose.model('User',userSchema);