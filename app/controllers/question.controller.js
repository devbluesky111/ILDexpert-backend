const questionModule = require("../models/question.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'question Module'`
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

// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   questionModule.create(new questionModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'question'."));
// };

// exports.edit = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   questionModule.update(new questionModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while editing the 'question'."));
// };

// exports.delete = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   questionModule.delete(req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'question'."));
// };

exports.getAll = (req, res) => {
  questionModule.getAll((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'question data'."));
};


exports.getAllTwo = (req, res) => {
  questionModule.getAllTwo((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'question data'."));
};



// exports.createSubMenu = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   menuModule.createSubMenu(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'menu'."));
// };

// exports.editSubMenu = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   menuModule.updateSubMenu(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while editing the 'menu'."));
// };

// exports.deleteSubMenu = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   menuModule.deleteSubMenu(req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while deleting the 'menu'."));
// };

// exports.getAllSubMenu = (req, res) => {
//   menuModule.getAllSubMenu((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
// };


// exports.getAllSubMenu_o = (req, res) => {
//   menuModule.getAllSubMenu_o((err, data) => resCallback(res, err, data, "Some error occurred while getting the 'menu data'."));
// };
