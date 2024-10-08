const express = require("express");
const app = express();
const http = require('http')
const path = require('path');
var nodejsmailer  = require('nodemailer');
require('dotenv').config();

const API_KEY = process.env.API_KEY
const ORG_EMAIL = process.env.ORG_EMAIL
const port = 3000;

app.set("port",port)
app.use(express.json())
app.use(express.urlencoded( { extended:true } ))
app.use(express.static(path.join(__dirname,"page/email.html")))

// Definição de Rotas
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'page/index.html'));
}); 

// Geração aleatória de código
function generateRandomCode(length){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let result = "";
    for(let i=0; i<length; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Verificação em duas etapas
app.post("/send2fa", (req,res) => {
    msg = generateRandomCode(6);
    let email = req.body.email;

    var transporter = nodejsmailer.createTransport({
        service:'gmail',
        auth:{
            user: ORG_EMAIL,
            pass: API_KEY
        }
    });

    var mailOptions = {
        from: email,
        to: ORG_EMAIL, // E-mail de Recebimento
        subject: "Your 2FA Code",
        text: `your 2fa code: ${msg}`
    }

    transporter.sendMail(mailOptions, function(erro,info){
        if (erro) {
            console.log(erro)
        } else {
            console.log("Email Send: " + info.response)
        }
        res.redirect("/")
    })
})

// Rota para verificação do codigo enviado por email com o digitado pelo usuario
app.post("/verify2fa", (req, res) => {
    let inputUsuario = req.body.secret; 

    if (inputUsuario === msg) {
        res.sendFile(path.join(__dirname, 'page/email.html'));
    } else {
        res.status(401).send("Invalid 2FA code. Please try again.");
    }
});

app.post("/submit", (req,res) => {

    
    let name = req.body.name;
    let email = req.body.email;
    let msg = req.body.message;

    var transporter = nodejsmailer.createTransport({
        service:'gmail',
        auth:{
            user: ORG_EMAIL,
            pass: API_KEY
        }
    });

    var mailOptions = {
        from: email,
        to: ORG_EMAIL,
        subject: `${name}`,
        text: `${name} sent a message for you: ${msg}`
    }

    transporter.sendMail(mailOptions, function(erro,info){
        if (erro) {
            console.log(erro)
        } else {
            console.log("Email Send: " + info.response)
        }
        res.redirect("/")
    })
})


// Servidor
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});