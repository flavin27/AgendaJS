const express = require('express');
const app = express();
const routes = require('./routes')
const path = require('path')

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.urlencoded(
    {
        extended: true
    }
))

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')



app.get('/', (req, res) => {
    res.send('Olá hahahahaa')
})
app.get('/contato', (req, res) => {
    res.send('Obrigado por entrar')
})
app.get('/teste/:idUsuarios?/', (req, res) => {
    console.log(req.params)
    console.log(res.query)
    res.send(req.params.idUsuarios)
})
app.listen(3000, () => {
    console.log('Acessar http://localhost:3000')
})