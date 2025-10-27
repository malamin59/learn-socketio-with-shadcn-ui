import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendVerificationEmail(email, url) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
  });
}
