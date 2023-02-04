const mongoose = require('mongoose')
const { isEmail } = require('validator');
const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    telefone: {type: String, required: false, default: ''},
    criadoEm: {type: Date, default: Date.now},
})
const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [],
        this.contato = null;
    }
    async register() {
        this.valida()
        if (this.errors.length > 0) {
            return
        }
        this.contato = await ContatoModel.create(this.body)
    }
    valida() {
        this.cleanUp()
        if (this.body.email && !isEmail(this.body.email)) this.errors.push('Email inválido!')
        if (!this.body.nome) {
            this.errors.push('Nome é um campo obrigatório!')
        }
        if(!this.body.email && !this.body.telefone) {
            this.errors.push('Pelo meno um contato precisa ser enviado')
        }
    }
    async login() {
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });
    
        if(!this.user) {
            this.errors.push('Usuário não existe.');
            return;
        }
    }
    cleanUp() {
        for (const key in this.body) {
            if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
            }
        }
    }
    async buscaContatos() {
        const contatos = await ContatoModel.find().sort({criadoEm: -1})
        return contatos
    }
    async edit(id) {
        if (typeof id !== 'string') {
            return
        }
        this.valida()
        if (this.errors.length > 0) {
            return
        }
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
    }
    async buscaPorId(id) {
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findById(id);
        return contato;
    }
    async delete(id) {
        if (typeof id !== 'string') {
            return
        }
        const contato = await ContatoModel.findOneAndDelete(id)
        return contato
    }
}

module.exports = Contato