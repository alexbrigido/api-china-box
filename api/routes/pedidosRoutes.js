const express = require('express')
const routes = express.Router()
const Pedido = require("../models/pedido")

routes.get('/', async (req, res) => {
    try {
        const docs = await Pedido.find()
            .populate("lista.idProduto")
        res.status(200).send(docs)
    } catch (err) {
        res.status(400).send( {mensagem: err.message, erro: err })
    }
})

routes.post('/', async (req, res, next) => {
    try {
        const pedido = new Pedido({
            nomeUsuario: req.body['nomeUsuario'],
            lista: req.body['lista']
        })
        const doc = await pedido.save()
        res.status(201).send(doc)
    } catch (err) {
        next(err)
    }
})


routes.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const doc = await Pedido.find({
            _id: id
        }).populate("lista.idProduto")
        res.status(200).send(doc)
    } catch(err) {
        res.status(404).send( {mensagem: "Item não encontrado." })
    }
})


routes.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const doc = await Pedido.deleteOne({ 
            _id: id
        })
        res.status(200).send({mensagem : "Item removido com sucesso."})
    } catch(err) {
        res.statusCode = 400
        res.send({
          mensagem: `erro ${err}`
        })
    }
})

module.exports = routes