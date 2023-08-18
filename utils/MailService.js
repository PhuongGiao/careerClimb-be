const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

class MailSevice {
  transporter;
  static init() {
    this.transporter = nodemailer.createTransport({
      host: process.env.GHOST,
      service: process.env.SERVICE,
      port: 465,
      secure: true,
      service: "Gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GPASS,
      },
    });
  }
  static sendHTMLmail = (option, Email, EmailData) => {
    const optionList = {
      1: {
        filename: "/applyConfirm.html",
        subject: "Apply Confirmation",
        content: "Apply Confirmation",
      },
    };
    const newpath = path.join(__dirname, "../email");

    fs.readFile(
      newpath + optionList[option].filename,
      "utf8",
      async (err, html) => {
        if (err) {
          throw new ApiError(400, "Something went wrong");
        } else {
          const newHTMLs = EmailData.reduce((acc, val) => {
            return acc.replaceAll(val.key, val.value);
          }, html);
          await this.sendMail(Email, optionList[option].subject, "", newHTMLs);
        }
      }
    );
  };

  static async sendMail(to, subject, text, html) {
    await this.transporter.sendMail({ to, subject, text, html });
  }
}

module.exports = MailSevice;
