const { Users, Lists } = require("../db/models");
const { Response, Error } = require("../helpers/response");

class UserController {
  static home(req, res, next) {
    try {
      // render home page ejs
      res.status(200).render("html/home");
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(req, res, next) {
    try {
      // extract username from req.body in page
      const { username } = req.body;
      const dataUser = await Users.findOne({
        where: { username: username },
      });

      // if not exists create a new username
      if (!dataUser) {
        const createUser = await Users.create({
          username: username,
        });
        return res.status(201).redirect(`/api/user/${createUser.id}`);
      }

      // if exists go to api/user 
      if (dataUser) {
        const dataList = await Lists.findAll({
          where: { userID: dataUser.id },
        });
        return res.status(200).redirect(`/api/user/${dataUser.id}`);
      }
    } catch (error) {
      next(error);
    }
  }
  static async userPage(req, res, next) {
    try {
      // search for user data
      const userData = await Users.findOne({
        where: { id: req.params.id }
      })

      // search for list's user data and view it in ejs
      const listData = await Lists.findAll({
        where: { userID: req.params.id }
      })
      res.status(200).render("html/user", {data: listData, username: userData.username, id: userData.id});
    } catch (error) {
      next(error);
    }
  }
  static async addList(req, res, next) {
    try {
      // extract list from req.body
      const { list } = req.body;
      const userData = await Users.findOne({
        where: { id: req.params.id }
      })

      // create list
      const addList = await Lists.create({
        userID: req.params.id,
        list: list,
      });

      // find all list to view in ejs
      const listData = await Lists.findAll({
        where: { userID: req.params.id }
      })
      res.status(200).render("html/user", {data: listData, username: userData.username, id: userData.id});
    } catch (error) {
      next(error);
    }
  }
  static async deleteList(req, res, next) {
    try {
      // extract num input from req.body & convert the value to a number
      const { num } = req.body;
      // find all the list and delete the data if the num is valid
      const dataDelete = await Lists.findAll({
        where: {userID: req.params.id}
      })
      if (dataDelete.length >= num) {
      const listToDelete = dataDelete[num - 1];
      await listToDelete.destroy();
      const userData = await Users.findOne({
        where: { id: req.params.id }
      });

      // find all list again to view in ejs
      const listData = await Lists.findAll({
        where: { userID: req.params.id }
      });
      res.status(200).render("html/user", {data: listData, username: userData.username, id: userData.id});
      
      } else {
        res.status(400).send("Invalid num")
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
