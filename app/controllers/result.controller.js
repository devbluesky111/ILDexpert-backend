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

exports.getAll = (req, res) => {
  resultModule.getAll((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'result data'."));
};
