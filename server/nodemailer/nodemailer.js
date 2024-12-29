const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "amithsulakhe2468@gmail.com",
    pass: "jdrw etbv owzf moqm", // from google app password
  },
});

module.exports = transporter;
