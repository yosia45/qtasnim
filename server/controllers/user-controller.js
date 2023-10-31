const { User } = require("../models/index");
const { verifyHash } = require("../helpers/bcrypt");
const { generateTokenFromPayload } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        role,
      });
      res.status(201).json({
        message: `${role} account with username "${username}" sucessfully created`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!foundUser) {
        throw { name: "Unauthorized" };
      }
      const isMatchPassword = verifyHash(password, foundUser.password);
      if (!isMatchPassword) {
        throw { name: "Unauthorized" };
      }
      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };
      const token = generateTokenFromPayload(payload);
      res.status(200).json({
        access_token: token,
        user: {
          id: foundUser.id,
          email: foundUser.email,
          username: foundUser.username,
          role: foundUser.role
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
