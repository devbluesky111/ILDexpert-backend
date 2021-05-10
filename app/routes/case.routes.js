module.exports = app => {
    const caseModule = require("../controllers/case.controller.js");

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
    
    app.post("/add_case", caseModule.create);
    app.post("/edit_case", caseModule.edit);
    app.post("/get_cases", caseModule.getAll);
    app.post("/get_case_id", caseModule.get_case_by_id);
    app.post("/delete_case", caseModule.delete);
    app.post("/upload_case", upload.single('file'), caseModule.upload);

}