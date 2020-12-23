const {Schema, model, Types} = require('mongoose')
const schema = new Schema({
    _id: {type: Types.ObjectId, required: true, unique: true},
    name: {type: String, required: true, unique: false},
    text: {type: String, required: true, unique: false}

})

module.exports = model('Post', schema)