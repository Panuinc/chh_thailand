import nodemailer from "nodemailer";

export async function sendResetEmail(toEmail, resetLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your password",
    html: `<p>Click to reset your password:</p>
           <a href="${resetLink}">${resetLink}</a>`,
  });

  return info;
}
