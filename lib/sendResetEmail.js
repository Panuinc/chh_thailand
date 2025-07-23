import nodemailer from "nodemailer";

export async function sendResetEmail(toEmail, resetLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <img src="cid:logo" alt="Company Logo" style="width: 120px; height: auto;" />
      </div>
      <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
      <p style="font-size: 16px; color: #555;">
        We received a request to reset your password. Click the button below to set a new one.
      </p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${resetLink}" style="background-color: #6DD708; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; color: #999;">
        If you didn’t request this, you can safely ignore this email. This password reset link is valid for 15 minutes.
      </p>
      <hr style="margin-top: 32px;" />
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        &copy; ${new Date().getFullYear()} Chh Industry. All rights reserved.
      </p>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `"Chh Support Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your password",
    html: emailHTML,
    attachments: [
      {
        filename: "logo.png",
        path: `${process.cwd()}/public/logo/logo.png`,
        cid: "logo",
      },
    ],
  });

  return info;
}
