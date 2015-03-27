'use strict';

var _ = require('lodash');
var UploadImage = require('./uploadImage.model');

// Get list of uploadImages
exports.index = function(req, res) {
  UploadImage.find(function (err, uploadImages) {
    if(err) { return handleError(res, err); }
    return res.json(200, uploadImages);
  });
};




//Express route to handle uploaded files
exports.postUpload = function(req, res) {
    var file = req.files.file;
    console.log(file.name);
    console.log(file.type);
    return file.name
}








// Get a single uploadImage
exports.show = function(req, res) {
  UploadImage.findById(req.params.id, function (err, uploadImage) {
    if(err) { return handleError(res, err); }
    if(!uploadImage) { return res.send(404); }
    return res.json(uploadImage);
  });
};

// Creates a new uploadImage in the DB.
exports.create = function(req, res) {
  UploadImage.create(req.body, function(err, uploadImage) {
    if(err) { return handleError(res, err); }
    return res.json(201, uploadImage);
  });
};

// Updates an existing uploadImage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  UploadImage.findById(req.params.id, function (err, uploadImage) {
    if (err) { return handleError(res, err); }
    if(!uploadImage) { return res.send(404); }
    var updated = _.merge(uploadImage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, uploadImage);
    });
  });
};

// Deletes a uploadImage from the DB.
exports.destroy = function(req, res) {
  UploadImage.findById(req.params.id, function (err, uploadImage) {
    if(err) { return handleError(res, err); }
    if(!uploadImage) { return res.send(404); }
    uploadImage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}