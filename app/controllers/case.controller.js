const caseModule = require("../models/case.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'Case Module'`
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

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  caseModule.create(new caseModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'case'."));
};

exports.edit = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  caseModule.update(new caseModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while editing the 'case'."));
};

exports.delete = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  caseModule.delete(req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'cases'."));
};

exports.getAll = (req, res) => {
  caseModule.getAll((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'case data'."));
};


exports.get_case_by_id = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  caseModule.get_case_by_id(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'case data'."));
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

  mkdirp(req.file.destination + 'cases/' + today).then(made =>
    move(req.file.destination + req.file.filename, req.file.destination + 'cases/' + today + '/' + req.file.filename).catch((err)=>{throw(err)})
  );

  caseModule.upload(req.body, today, req.file.filename, (err, data) => resCallback(res, err, data, "Some error occurred while getting the 'case data'."));
};
