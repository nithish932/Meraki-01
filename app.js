const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const _ = require("lodash")
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended:true}));
app.set("view-engine",'ejs');
app.use(express.static("public"));

function sendMail(message){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'amitdiot@gmail.com',
          pass: 'abcdefghijklmnop'
        }
      });  

      var mailOptions = {
        from: 'amitdiot@gmail.com',
        to: 'shubhammgupta8@gmail.com',
        subject: 'new coustmer',
        text: message,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

app.get("/", function(req, res) {
    res.render('index.ejs');
});

app.post("/message", function(req, res) {
    var message_tosend=`name:- ${req.body.Name}\nmail:- ${req.body.Email}\nphone number:- ${req.body.Phone} \nmessage:- ${req.body.Message}`;
    sendMail(message_tosend);
    res.render('success.ejs');
});

var port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app listening on port ${3000}!`))