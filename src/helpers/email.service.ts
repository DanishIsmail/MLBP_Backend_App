import sgMail from "@sendgrid/mail";
import { forgetPasswordTemplate } from "../utilities/email_templates";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendEmail = async (to: string, subject: string, html: string) => {
  const msg = {
    to,
    from: process.env.SENDGRID_Sender_EMAIL,
    subject,
    html,
  };

  try {
    ///@ts-ignore
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

const forgetPasswordEmail = async (to: string, resetToken: string) => {
  let recoverLink = `${process.env.FRONT_APP}/change-password/${resetToken}`;
  let email_templates = await forgetPasswordTemplate(to, recoverLink);
  await sendEmail(to, "RESET PASSWORD", email_templates);
};

export { forgetPasswordEmail };
