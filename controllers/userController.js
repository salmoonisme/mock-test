const { Users, Lists } = require("../db/models");
const { Response, Error } = require("../helpers/response");

class UserController {
  static home(req, res, next) {
    try {
      res.render("html/home");
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(req, res, next) {
    try {
      const { username } = req.body;
      const dataUser = await Users.findOne({
        where: { username: username },
      });
      if (!dataUser) {
        const createUser = await Users.create({
          username: username,
        });
        req.session.userID = createUser.id;
        req.session.save(() => {
          return res.redirect("api/user");
        });
      }
      if (dataUser) {
        const dataList = await Lists.findAll({
          where: { userID: dataUser.id },
        });
        req.session.username = dataUser.username;
        req.session.dataList = dataList;
        req.session.userID = dataUser.id;
        console.log(req.session)
        req.session.save(() => {
          return res.redirect("api/user");
        });
      }
    } catch (error) {
      next(error);
    }
  }
  static async userPage(req, res, next) {
    try {
      const username = req.session.username;
      const dataList = req.session.dataList;

      // Render the user view with the data
      res.render("html/user", { username, dataList });
    } catch (error) {
      next(error);
    }
  }
  static async createPage(req, res, next) {
    try {
      res.render("html/create");
    } catch (error) {
      next(error);
    }
  }
  static async removePage(req, res, next) {
    try {
      res.render("html/remove");
    } catch (error) {
      next(error);
    }
  }
  static async addList(req, res, next) {
    try {
      const { list } = req.body;
      const addList = await Lists.create({
        userID: id,
        list: list,
      });
      res.redirect("html/user", { data: addList });
    } catch (error) {
      next(error);
    }
  }
  static async editList(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
