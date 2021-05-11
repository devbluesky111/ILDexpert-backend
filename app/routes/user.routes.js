module.exports = app => {
  const userModule = require("../controllers/user.controller.js");
  
  app.post("/add_user", userModule.create);
  app.post("/edit_user", userModule.edit);
  app.post("/get_all_users", userModule.getAll);
  app.post("/get_user_id", userModule.get_user_by_id);
  app.post("/login", userModule.login);
  app.post("/check_login", userModule.check_login);
  app.post("/logout", userModule.logout);
  app.post("/delete_user", userModule.delete);
  
}
