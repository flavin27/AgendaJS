const HomeModel = require('../models/HomeModels')

HomeModel.create({
    titulos: 'um titlo legal',
    descricao: 'uma descricao'
})
    .then(dados => console.log(dados))
    .catch(e => console.log(e))
exports.paginainicial = (req, res) => {
    res.send('index')
}

exports.trataPost = (req, res) => {
    res.send(req.body)
    return
}