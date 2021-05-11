module.exports = app => {
  const questionModule = require("../controllers/question.controller.js");
  
  app.post("/get_question_one", questionModule.getAll);
  app.post("/get_question_two", questionModule.getAllTwo);
  // app.post("/add_question", questionModule.create);
  // app.post("/edit_question", questionModule.edit);
  // app.post("/delete_question", questionModule.delete);
  
  // app.post("/get_subquestion_o", questionModule.getAllSubquestion_o);
  // app.post("/get_subquestion", questionModule.getAllSubquestion);
  // app.post("/add_subquestion", questionModule.createSubquestion);
  // app.post("/edit_subquestion", questionModule.editSubquestion);
  // app.post("/delete_subquestion", questionModule.deleteSubquestion);
}