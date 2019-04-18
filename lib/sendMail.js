const nodemailer = require('nodemailer')

const sendMail = function ({service, user, pass, nick, to, subject, html}) {
  let transporteOptions = {
    service,
    port: 465,
    secureConnection: true,
    auth: {user, pass}
  }
  let transporter = nodemailer.createTransport(transporteOptions)

  let mailOptions = {
    from: `"${nick}" <${user}>`, 
    to, subject, html
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      sendMail({service, user, pass, nick, to, subject, html}) //再次发送
      return false
    }
    console.log("邮件发送成功")
    console.log("等待下一次发送")
  })
}

module.exports = sendMail