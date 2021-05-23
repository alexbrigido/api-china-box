const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var produtoSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
        unique:true,
        index: true
    },
    descricao:{
        type:String
    },
    preco:{
        type:Number,
        required:true,
    },
    imagem:{
        type:String
    },
    permiteAlteracao:{
        type:Boolean,
        required:true,
        default: true
    }
});

//Export the model
module.exports = mongoose.model('produtos', produtoSchema);
