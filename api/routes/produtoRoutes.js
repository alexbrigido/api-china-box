const express = require('express')
const routes = express.Router()
const Produto = require('../models/produto')

const tamanhoPagina = 2

routes.get('/', async (req, res) => {
    const {pagina} = req.query
    const elementos = (pagina - 1) * tamanhoPagina
    try {
        const doc = await Produto.find({ 
            nome: /Yakissoba.*/ ,
            preco: { $gt: 25, $lt: 160 }
        }).sort({
            nome: 1, // crescente
            preco: -1 // maior para o menor
        })
        .skip(elementos)
        .limit(tamanhoPagina)

        res.status(200).send(doc)
    } catch(err) {
        res.statusCode = 400
        res.send({
          mensagem: `erro ${err}`
        })
    }
})

routes.post('/', (req, res) => {
    const produto = new Produto({
        nome: req.body['nome'],
        descricao: req.body['descricao'],
        preco: req.body['preco'],
        imagem: req.body['imagem'],
        permiteAlteracao: req.body['permiteAlteracao']
    })

    produto.save()
    .then((doc)=>{
        res.status(201).send({
          mensagem: "Item criado com suscesso."
        })
    }).catch(err=>{
        if( err.code == 11000) {
            res.status(400).send({mensagem: "Produto já existe."})
            return
        }
        res.statusCode = 400
        res.send({
          mensagem: `erro ${err}`
        })
    })
})


routes.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const doc = await Produto.find({ 
            _id: id
        }).select("-__v")

        res.statusCode = 200
        res.send(doc)
    } catch(err) {
        res.statusCode = 400
        res.send({
          mensagem: `erro ${err}`
        })
    }
})

routes.patch('/:id', async (req, res) => {
    const { id } = req.params
    const parametros = {}
    for (const chave of Object.keys(req.body)) {
        parametros[chave] = req.body[chave]
    }
    try {
        const doc = await Produto.updateOne({
            _id: id
        }, 
            parametros
        )
        res.status(200).send(doc)
    } catch(err) {
        res.status(400).send({
            mensagem: `erro ${err}`
        })
    }
})


routes.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const doc = await Produto.deleteOne({ 
            _id: id
        })
        res.statusCode = 200
        res.send({mensagem : "Item removido com sucesso."})
    } catch(err) {
        res.statusCode = 400
        res.send({
          mensagem: `erro ${err}`
        })
    }
})

module.exports = routes