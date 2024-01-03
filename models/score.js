const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
    score:{
        type:String,
    },
    earnedBy:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
    }

    
},{timestamps:true})





module.exports = mongoose.model('Score',scoreSchema)