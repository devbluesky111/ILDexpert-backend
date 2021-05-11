const sql = require("./db.js");

// constructor
const questionModule = function(questionGroup) {
  this.id = questionGroup.id;
  this.name = questionGroup.name;
  this.order = questionGroup.order_num;
  this.status = questionGroup.status;
};

// questionModule.create = async (body, result) => {
//   try {
//     const [res, fields] = await sql.promise().query(
//       "INSERT INTO question SET name = ?, order_num = ?, status=?, created = NOW()", 
//       [body.name, body.order, body.status]
//     );

//     result(null, { id: res.insertId });
//   } catch (err) {
//     result(err, null);
//   };
// };

// questionModule.update = async (body, result) => {
//   try {
//     const [res, fields] = await sql.promise().query(
//       "UPDATE question SET name = ?, order_num = ?, status=? WHERE id = ?", 
//       [body.name, body.order, body.status, body.id]
//     );

//     if (res.affectedRows === 0) {
//       throw { kind: "not_found" };
//     }

//     result(null, { id: body.id });
//   } catch (err) {
//     result(err, null);
//   };
// };

// questionModule.delete = async (ids, result) => {
//   try {    
//     let query = [];
//     ids.map((id)=>{
//       query.push('id = ' + id);
//     });
//     let query_str = query.join(' OR ');
    
//     await sql.promise().query(
//       "DELETE FROM question WHERE " + query_str
//     );

//     result(null, { ids: ids });
//   } catch (err) {
//     result(err, null);
//   };
// };

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






// menuModule.createSubMenu = async (body, result) => {
//   try {
//     const [res, fields] = await sql.promise().query(
//       "INSERT INTO submenu SET m_id = ?, name = ?, order_num = ?, status=?, created = NOW()", 
//       [body.m_id, body.name, body.order_num, body.status]
//     );

//     result(null, { id: res.insertId });
//   } catch (err) {
//     result(err, null);
//   };
// };

// menuModule.updateSubMenu = async (body, result) => {
//   try {
//     const [res, fields] = await sql.promise().query(
//       "UPDATE submenu SET m_id = ?, name = ?, order_num = ?, status=? WHERE id = ?", 
//       [body.m_id, body.name, body.order_num, body.status, body.id]
//     );

//     if (res.affectedRows === 0) {
//       throw { kind: "not_found" };
//     }

//     result(null, { id: body.id });
//   } catch (err) {
//     result(err, null);
//   };
// };

// menuModule.deleteSubMenu = async (ids, result) => {
//   try {    
//     let query = [];
//     ids.map((id)=>{
//       query.push('id = ' + id);
//     });
//     let query_str = query.join(' OR ');
    
//     await sql.promise().query(
//       "DELETE FROM submenu WHERE " + query_str
//     );

//     result(null, { ids: ids });
//   } catch (err) {
//     result(err, null);
//   };
// };

// menuModule.getAllSubMenu = async (result) => {
//   try {
//     const [res, fields] = await sql.promise().query(
//       "SELECT * FROM submenu ORDER BY order_num"
//     );

//     result(null, res);
//   } catch (err) {
//     result(err, null);
//   };
// };

// menuModule.getAllSubMenu_o = async (result) => {
//   try {
//     const [res, fields] = await sql.promise().query(
//       "SELECT * FROM submenu WHERE status = 'on' ORDER BY order_num"
//     );

//     result(null, res);
//   } catch (err) {
//     result(err, null);
//   };
// };

module.exports = questionModule;
