const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please add a username'],
        unique: { value: true, message: 'Username already exists.', caseInsensitive: true },
        minlength:4
    },
    birthdate: {
        type: Date,
        required: [true, 'Please add a birthdate'],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: 'Birthdate cannot be in the future'
        }
    },
})





module.exports = mongoose.model('User',userSchema)