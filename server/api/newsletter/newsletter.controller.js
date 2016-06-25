'use strict';

var _ = require('lodash');
var Subscriber = require('./newsletter.model');
var logger = require('../../config/logger.js');

var TAG = "NewsletterController";


// Creates a new country in the DB.
exports.create = function(req, res) {
  var userMail = req.body.mail;
  var subscriber = new Subscriber({email: userMail});

  subscriber.save(function(err, doc) {
    if(err) {
      if(err.code == 11000) {
        return res.status(401).json({status: 401, data: 'User already exist'});
      } else {
        return res.status(400).json({status: 400, data: 'Unable to save subscriber'});
      }
    }
    return res.status(201).json({status: 201, data: 'Successfully subscribe'});
  });
};

exports.getAll = function(req, res) {
  Subscriber.find({}, function(err, subscribers) {
    if(err) {
      return res.status(400).json({status: 400, data:'An error occured while retrieving subscribers'});
    }
    if(req.query.excel) {
      res.setHeader('Content-disposition', 'attachment; filename=subscribers.csv');
      res.writeHead(200, {
        'Content-Type': 'text/csv'
    });
      res.write(docToCSV(subscribers));
      return res.status(200).end();
    }else {
      return res.status(200).json({ status: 200, data: subscribers});
    }
  });
}

function CSVEscape(field) {
  return '"' + String(field || "").replace(/\"/g, '""') + '"';
}

function docToCSV(doc) {
  var csvFile = "email;utilisateur;date d'ajout\n";
  for(var i = 0; i < doc.length; i++) {
    csvFile += [
      doc[i].email,
      doc[i].isUser,
      doc[i].addedAt
    ].map(CSVEscape).join(';') + "\n";
  }
  return csvFile;
}

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
