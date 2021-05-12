module.exports = app => {
    const resultModule = require("../controllers/result.controller.js");
    
    app.post("/add_image_interval", resultModule.createImageInterval);
    app.post("/add_question_interval", resultModule.addQuestionInterval);
    app.post("/add_selected_questions", resultModule.addSelectedQuestions);
    app.post("/get_results", resultModule.getAll);

}