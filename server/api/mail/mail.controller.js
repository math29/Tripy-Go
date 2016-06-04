'use strict';

var _ = require('lodash');
var logger = require('../../config/logger.js');
var nodemailer = require('nodemailer');
var transport = {host:'smtp.free.fr'};
var transporter = nodemailer.createTransport(transport);

var TAG = "MailController";


// Creates a new country in the DB.
exports.create = function(req, res) {
  var statusCode = 201;
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Tripy go 👥" <info@tripy-go.fr>', // sender address
      to: req.body.to, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.text, // plaintext body
      html: req.body.html // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          return res.status(400).json({status: 400, data: 'Can\'t send mail'});
      }
      console.log('Message sent: ' + info.response);
      return res.status(200).json({status: 200, data: 'Mail sended'});
  });

};

/**
 * Vérifie si un paramétre est défini ou non vide
 *
 * @param parameter variable a vérifier
 * @return true si la variable est définie et non nulle, false sinon
 */
function isDefined(parameter){
  return (undefined !== parameter && parameter !== "");
}

function handleError(res, err) {
  return res.status(500).send(err);
}
