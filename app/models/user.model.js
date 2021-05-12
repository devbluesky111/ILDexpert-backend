const sql = require("./db.js");
// constructor
const userModule = function(userGroup) {
  this.id = userGroup.id;
  this.name = userGroup.userName;
  this.email = userGroup.email;
  this.password = userGroup.password;
  this.identity = userGroup.identity;
};

userModule.create = async (body, result) => {
  try {
    const resp = await sql.promise().query(
      "SELECT * FROM user WHERE email = ? ",
      [body.email]
    );

    if (resp[0].length > 0) {
      result(null, {status: 'fail'});
    } else {
      const res = await sql.promise().query(
        "INSERT INTO user SET name = ?, email = ?, password = ?, identity = ?, role = 'user', created = NOW(), last_login = NOW()", 
        [body.name, body.email, body.password, body.identity]
      );
  
      result(null, { status: 'success', id: res.insertId });
    }

  } catch (err) {
    result(err, null);
  };
};

// userModule.update = async (body, result) => {
//   try {
//     const [res, fields] = await sql.promise().query(
//       "UPDATE user SET name = ?, lastName = ?, nickname = ?, phone = ?, email = ?, company = ?, jobTitle = ?, birthday = ?, address = ?, notes = ?, password = ?, membership = ?, pending = ?, status = ? WHERE id = ?", 
//       [body.name, body.lastName, body.nickname, body.phone, body.email, body.company, body.jobTitle, body.birthday, body.address, body.notes, body.password, body.membership, body.pending, body.status, body.id]
//     );

//     if (res.affectedRows === 0) {
//       throw { kind: "not_found" };
//     }

//     result(null, { id: body.id });
//   } catch (err) {
//     result(err, null);
//   };
// };

// userModule.delete = async (ids, result) => {
//   try {    
//     let query = [];
//     ids.map((id)=>{
//       query.push('id = ' + id);
//     });
//     let query_str = query.join(' OR ');
    
//     await sql.promise().query(
//       "DELETE FROM user WHERE " + query_str
//     );

//     result(null, { ids: ids });
//   } catch (err) {
//     result(err, null);
//   };
// };

// userModule.getAll = async (body, result) => {
//   try {
//     let res;
//     if(body.params === 'all')
//       res = await sql.promise().query(
//         "SELECT * FROM user"
//       );
//     else if (body.params === 'pending')
//       res = await sql.promise().query(
//         "SELECT * FROM user WHERE pending = 'pro' OR pending = 'platinum' "
//       );
//     else if (body.params === 'restrict')
//       res = await sql.promise().query(
//         "SELECT * FROM user WHERE status = 'off' "
//       );
//     else 
//       res = [[]];

//     result(null, res);
//   } catch (err) {
//     result(err, null);
//   };
// };

// userModule.get_user_by_id = async (body, result) => {
//   try {
//     const  res = await sql.promise().query(
//       "SELECT * FROM user WHERE id = ? ",
//       [body.id]
//     );

//     result(null, res);
//   } catch (err) {
//     result(err, null);
//   };
// };

userModule.login = async (req, res) => {
  // console.log('ss--->', req.session.email);
  // console.log('cc--->', req.cookies.rememberMeEmail);
  try {
    const [resp, field] = await sql.promise().query(
      "SELECT * FROM user WHERE email = ? AND password = ? ",
      [req.body.email, req.body.password]
    );

    const [respo, fields] = await sql.promise().query(
      "SELECT * FROM user WHERE name = ? AND password = ? ",
      [req.body.email, req.body.password]
    );

    if(resp.length === 0 && respo.length === 0) {
      res.send({status: 'fail'});
    } else {
      let res_data;
      if(resp.length !== 0) {
        req.session.email = req.body.email;
        res_data = resp;
      }
      if(respo.length !== 0) {
        req.session.email = respo[0].email;
        res_data = respo;
      }
      res.send({status: 'success', data : res_data});
    }
  } catch (err) {
    throw(err);
  };
};

userModule.check_login = async (req, res) => {
  // console.log('---ss--->', req.session.email);
  // console.log('---cc--->', req.cookies.rememberMeEmail);
  try { 
    if (req.session.email) {
      const resp = await sql.promise().query(
        "SELECT * FROM user WHERE email = ? ",
        [req.session.email]
      );
      console.log('check_login', resp);
      res.send({status: 'success', data: resp});
    } else {
      res.send({status: 'fail'});
    }

  } catch (err) {
    throw(err);
  };
};

module.exports = userModule;
