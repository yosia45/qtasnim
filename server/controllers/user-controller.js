const { User } = require("../models/index");
const { verifyHash } = require("../helpers/bcrypt");
const { generateTokenFromPayload } = require("../helpers/jwt");
const {
  generateResetToken,
  resetPassword,
  sendResetPasswordEmail,
} = require("../helpers/resetPassword");

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
          role: foundUser.role,
          resetToken: foundUser.resetToken
        },
      });
    } catch (err) {
      next(err);
    }
  }
  static async forgotPassword(req, res, next) {
    const { email } = req.body;

    try {
      const resetToken = await generateResetToken(email);
      if (resetToken) {
        const resetLink = `http://localhost:3001/reset-password/${resetToken}`;
        await sendResetPasswordEmail(email, resetLink);
        res.status(200).json({ message: "Password reset email sent" });
      } else {
        throw { name: "NotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async resetPassword(req, res, next) {
    const { token, newPassword } = req.body;
    try {
      const findUser = await User.findOne({ where: { resetToken: token } });
      if (!findUser) {
        throw { name: "InvalidExpiredToken" };
      }
      const resetResult = await resetPassword(findUser, newPassword, token);
      if (resetResult) {
        return res
          .status(200)
          .json({
            message: "Password reset successful, you can login after this",
          });
      } else {
        throw { name: "InvalidExpiredToken" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
