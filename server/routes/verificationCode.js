var nodemailer = require("nodemailer");//Nodemailer modülünü kurduktan sonra projeye dahil etme
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const mail = req.body
    var randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000)
    var transfer = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MY_EMAIL_ADRESS,
            pass:process.env.MY_EMAIL_PASS_KEY
        }
    });
    var mailbilgi = {
        from:"murattilhann08@gmail.com",//Gönderecek kişinin mail adresi
        to:mail.form.email,//Gönderilecek kişinin mail adresi
        subject:"E-mail Doğrulama",//Gönderecek mailin konusu
        html:`<h1>Doğrulama Kodunuz: ${randomNumber} </h1>` //Ayrıca HTML göndermek istenilirse kullanımı
    };

    transfer.sendMail(mailbilgi, function(error){//Mail gönderme işlemi
    if(error){
        console.log(" hatalı gönderim ");
    }
    else {
        console.log("Mailiniz gönderildi!");
    }
});
    res.status(200).json(randomNumber)
})

module.exports = router