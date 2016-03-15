'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);


// Get list of files
exports.index = function(req, res) {
  gfs.files.find(function (err, files) {
    if(err) {
      return handleError(res, err);
    }
    return res.status(200).json(files);
  });
};

// Get a single file
exports.show = function(req, res) {
  gfs.findOne({ _id: req.params.id}, function (err, file) {
    if(file === null || file.length===0){
      return res.status(400).send({
        message: 'File not found'
      });
    }
    res.writeHead(200, {'Content-Type': file.contentType});

    var readstream = gfs.createReadStream({
        filename: file.filename
    });
    readstream.on('data', function(data) {
        res.write(data);
    });
    readstream.on('end', function() {
        res.end();
    });
    readstream.on('error', function (err) {
      throw err;
    });
  });
};

// Creates a new file in the DB.
exports.create = function(req, res) {
  var part = req.files.file;

  var writestream = gfs.createWriteStream({
      filename: part.name,
      mode: 'w',
      content_type:part.mimetype
  });

  writestream.on('close', function(file) {
      return res.status(201).send({
        file: file
      });
  });
  writestream.write(part.data);

  writestream.end();
};

// Updates an existing file in the DB.
exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  gfs.findById(req.params.id, function (err, file) {
    if (err) {
      return handleError(res, err);
    }
    if(!file) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(file, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(file);
    });
  });
};

// Deletes a file from the DB.
exports.destroy = function(req, res) {
  gfs.findById(req.params.id, function (err, file) {
    if(err) {
      return handleError(res, err);
     }
    if(!file) {
      return res.status(404).send('Not Found');
    }
    file.remove(function(err) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
