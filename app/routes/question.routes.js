module.exports = app => {
  const questionModule = require("../controllers/question.controller.js");
  
  app.post("/get_question_one", questionModule.getAll);
  app.post("/get_question_two", questionModule.getAllTwo);
  app.post("/get_question_id", questionModule.get_question_by_id);
  app.post("/add_question", questionModule.create);
  app.post("/edit_question", questionModule.edit);
  app.post("/delete_question", questionModule.delete);
}