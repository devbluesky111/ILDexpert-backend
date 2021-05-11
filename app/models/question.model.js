const sql = require("./db.js");

// constructor
const questionModule = function(questionGroup) {
  this.id = questionGroup.id;
  this.question_one = questionGroup.question_one;
};

questionModule.create = async (body, result) => {
  console.log(body);
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO question_one SET question_one = ?, created = NOW()", 
      [body.question_one]
    );

    result(null, { id: res.insertId });
  } catch (err) {
    result(err, null);
  };
};

questionModule.update = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE question_one SET question_one=? WHERE id = ?", 
      [body.question_one, body.id]
    );

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

questionModule.delete = async (ids, result) => {
  try {    
    let query = [];
    ids.map((id)=>{
      query.push('id = ' + id);
    });
    let query_str = query.join(' OR ');
    
    await sql.promise().query(
      "DELETE FROM question_one WHERE " + query_str
    );

    result(null, { ids: ids });
  } catch (err) {
    result(err, null);
  };
};

questionModule.getAll = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM question_one ORDER BY question_one ASC"
    );

    result(null, res);
  } catch (err) {
    result(err, null);
  };
};


questionModule.getAllTwo = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM question_two ORDER BY id"
    );

    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

questionModule.get_question_by_id = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM question_one WHERE id = ? ",
      [body.id]
    );
    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

module.exports = questionModule;
