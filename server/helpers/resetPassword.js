const { generateHash } = require("../helpers/bcrypt");
const {
  generateTokenFromPayload,
  readPayloadFromToken,
} = require("../helpers/jwt");
const { User } = require("../models");
const nodemailer = require("nodemailer");

async function generateResetToken(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw { name: "UserNotFound" };
    }
    const resetToken = generateTokenFromPayload({ userId: user.id });
    console.log(user.id)
    await User.update({ resetToken:resetToken }, { where: { id: user.id } });
    return resetToken;
  } catch (err) {
    console.log(err)
  }
}

async function resetPassword(user, newPassword, resetToken) {
  try {
    const payload = readPayloadFromToken(resetToken);
    if (payload.userId === user.Id) {
      await User.update(
        { password: generateHash(newPassword), resetToken: null },
        { where: { id: user.id } }
      );
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err)
  }
}

async function sendResetPasswordEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  const msg = {
    from: ' "qtasnimshop" <admin@qtasnimshop.com>',
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${resetLink}`,
  };
  await transporter.sendMail(msg)
}

module.exports = {
  generateResetToken,
  resetPassword,
  sendResetPasswordEmail
};
