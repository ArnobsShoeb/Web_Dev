const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    firstname:{
        type: String,
        required : true,
    },
    lastname:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required : true,
    },
    usertype:{
        type: String,
        required : true,
    },
    date:{
        type: Date,
        default : Date.now
    },
    usertype:{
        type: String 
        
    }
    
})

module.exports = mongoose.model('user',UserSchema);