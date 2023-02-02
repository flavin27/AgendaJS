const mongoose = require('mongoose');
const { isEmail } = require('validator');
const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})
const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    valida() {
        this.cleanUp()
        if (!isEmail(this.body.email)) this.errors.push('Email inválido!')
        if (this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('A senha ta errada')
    }
    async register() {
        this.valida()
        if (this.errors.length > 0) {
            return
        }
        try {
            this.user = await LoginModel.create(this.body)
        } catch(e) {
            console.log(e)
        }
        
    }
    cleanUp() {
        for (const key in this.body) {
            if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
            }
        }
    
        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login