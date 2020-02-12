const nodemailer = require('nodemailer');

const sendMail = async (info) => {
  const settings = {
    host: process.env.MAIL_TRANSPORT_SMTP,
    port: 2525,
    secure: process.env.NODE_ENV === 'production',
    auth: {
      user: process.env.MAIL_TRANSPORT_USER,
      pass: process.env.MAIL_TRANSPORT_PASS
    }
  }

  const transporter = nodemailer.createTransport(settings);

  let mail = {
    from: `BodyCulture <${process.env.MAIL_TRANSPORT_USER}>`,
    to: info.to,
    subject: info.subject,
    html: info.message
  }

  await transporter.sendMail(mail);
}

module.exports = sendMail;