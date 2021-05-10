const sql = require("./db.js");

// constructor
const caseModule = function(caseGroup) {
    this.id = caseGroup.id;
    this.subject = caseGroup.subject;
    this.thumbnailURL = caseGroup.thumbnailURL;
    this.apiURL = caseGroup.apiURL;
};

caseModule.create = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO cases SET subject = ?, thumbnailURL = ?, apiURL = ?, created = NOW()", 
      [body.subject ,body.thumbnailURL, body.apiURL]
    );
    result(null, { id: res.insertId });
  } catch (err) {
    result(err, null);
  };
};

caseModule.update = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE cases SET subject = ?, thumbnailURL = ?, apiURL = ? WHERE id = ?", 
      [body.subject ,body.thumbnailURL, body.apiURL, body.id]
    );

    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, { id: body.id });
  } catch (err) {
    result(err, null);
  };
};

caseModule.delete = async (ids, result) => {
  try {    
    let query = [];
    ids.map((id)=>{
      query.push('id = ' + id);
    });
    let query_str = query.join(' OR ');
    
    await sql.promise().query(
      "DELETE FROM cases WHERE " + query_str
    );

    result(null, { ids: ids });
  } catch (err) {
    result(err, null);
  };
};

caseModule.getAll = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM cases ORDER BY id"
    );
    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

caseModule.get_case_by_id = async (body, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "SELECT * FROM cases WHERE id = ? ",
      [body.id]
    );
    result(null, res);
  } catch (err) {
    result(err, null);
  };
};

caseModule.upload = async (body, today, filename, result) => {
  try {
    let new_file;
    new_file = today + '/' + filename;

    const [res, fields] = await sql.promise().query(
      "UPDATE cases SET " + body.name + " = ? WHERE id = ?", 
      [new_file, body.id]
    );
    if (res.affectedRows === 0) {
      throw { kind: "not_found" };
    }

    result(null, {file: new_file});
  } catch (err) {
    result(err, null);
  };
};

module.exports = caseModule;
