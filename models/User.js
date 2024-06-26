const mongoose = require('mongoose')
const userMongoose = mongoose.Schema(
    {
        name : {type : String, required : true, min: 6, max: 255},
        email : {type: String , required : true, min: 6, max: 255},
        password: {type: String, required: true, min: 6, max: 255}
    }
)

module.exports = mongoose.model('User', userMongoose)