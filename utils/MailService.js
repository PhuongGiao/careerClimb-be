const nodemailer = require("nodemailer");

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
  static async sendMail(to, subject, text, html) {
    await this.transporter.sendMail({ to, subject, text, html });
  }
}

module.exports = MailSevice;
