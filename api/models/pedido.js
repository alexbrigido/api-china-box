const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var produtoSubSchema = new mongoose.Schema({
    idProduto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "produtos",
        require: true
    },
    quantidade: {
        type: Number,
        default: 1
    },
    comentario: String
}, {_id: false})

var pedidoSchema = new mongoose.Schema({
    nomeUsuario:{
        type:String,
        required:true
    },
    data:{
        type: Date,
        required: true,
        default: Date.now()
    },
    lista: [ produtoSubSchema ]
})

//Export the model
module.exports = mongoose.model('pedidos', pedidoSchema);
