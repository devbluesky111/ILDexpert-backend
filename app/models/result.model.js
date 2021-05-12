const sql = require("./db.js");

// constructor
const resultModule = function(resultGroup) {
    this.id = resultGroup.id;
    this.case_id = resultGroup.selectedCaseId;
    this.user_email = resultGroup.email;
    this.image_show_time = resultGroup.imageInterval;
    this.question_show_time = resultGroup.questionInterval;
    this.selected_questions = resultGroup.selectedQuestions;
};

resultModule.createImageInterval = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO results SET case_id = ?, user_email = ?, image_show_time = ?, question_show_time = ?, selected_questions = ?, created = NOW()", 
      [body.case_id, body.user_email, body.image_show_time, body.question_show_time, body.selected_questions]
    );
    result(null, { id: res.insertId });
  } catch (err) {
    result(err, null);
  };
};

resultModule.addQuestionInterval = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE results SET question_show_time = ? WHERE id = ?", 
      [body.question_show_time, body.id]
    );

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

resultModule.addSelectedQuestions = async (body, result) => {
  let question_arr = body.selected_questions.question_one + '|' + body.selected_questions.question_two;
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE results SET selected_questions = ? WHERE id = ?", 
      [question_arr, body.id]
    );

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

resultModule.getAll = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT results.id, `user`.`name`, `user`.identity, cases.`subject` ,results.image_show_time, results.question_show_time,	results.selected_questions FROM results LEFT JOIN cases on cases.`id` = results.case_id LEFT JOIN `user` on results.user_email = `user`.email"
    );
    
    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

module.exports = resultModule;
