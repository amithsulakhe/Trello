const ejs = require("ejs");
const transporter = require("./nodemailer");

async function sendEmail(obj) {
  // render html
  const htmlText = await ejs.renderFile(
    `${__basedir}${obj.template}/html.ejs`,
    obj.data
  );

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"FlowBoard 👻" <amithsulakhe2468@gmail.com>', // sender address
    to: obj.email, // list of receivers
    subject: obj.subject, // Subject line
    // text: "", // plain text body
    html: htmlText, // html body
  });
}

module.exports = {
  sendEmail,
};
