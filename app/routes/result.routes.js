module.exports = app => {
    const resultModule = require("../controllers/result.controller.js");

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'upload/');
        },
        filename: function (req, file, cb) {
        cb(null, `${file.originalname.split(' ').join('_')}`);
        }
    });

    var upload = multer({ storage: storage });
    
    app.post("/add_image_interval", resultModule.createImageInterval);
    app.post("/add_question_interval", resultModule.addQuestionInterval);
    app.post("/add_selected_questions", resultModule.addSelectedQuestions);
    app.post("/get_result_id", resultModule.get_result_by_id);
    app.post("/delete_result", resultModule.delete);
    app.post("/upload_result", upload.single('file'), resultModule.upload);

}