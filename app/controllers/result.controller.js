const resultModule = require("../models/result.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'Result Module'`
      });
    } else {
      res.status(500).send({
        message:
          defaultErrMessage || err.message || "Internal server error"
      });
    }
  } else {
    res.send(data);
  }
};

exports.createImageInterval = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  resultModule.createImageInterval(new resultModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'result'."));
};

exports.addQuestionInterval = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  resultModule.addQuestionInterval(new resultModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while editing the 'result'."));
};

exports.addSelectedQuestions = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  resultModule.addSelectedQuestions(new resultModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while editing the 'result'."));
};

exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  resultModule.delete(req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'results'."));
};

exports.getAll = (req, res) => {
  resultModule.getAll((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'result data'."));
};


exports.get_result_by_id = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  resultModule.get_result_by_id(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'result data'."));
};

exports.upload = (req, res) => {
  
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var move = require('fs-move');
  var mkdirp = require('mkdirp');
  var today = Date.now();

  mkdirp(req.file.destination + 'resultimages/' + today).then(made =>
    move(req.file.destination + req.file.filename, req.file.destination + 'resultimages/' + today + '/' + req.file.filename).catch((err)=>{throw(err)})
  );

  resultModule.upload(req.body, today, req.file.filename, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
};
