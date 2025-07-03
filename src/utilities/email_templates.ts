import dotenv from "dotenv";
dotenv.config();

let forgetPasswordTemplate = async (name: string, resetUrl: string) => {
  // <h1>Hi,${name}</h1>
  const message = `
    <h1>Hi,</h1>
    <p>you are recieving this email because  (you or someone else) has reuqested the reset of the password.</p>
    <p>Please click this link to reset your password</p><a href=${resetUrl}>${resetUrl}</a><br><br> 
    <p>if you did'nt request reset password,please ignore this email or reply us to let us know.This password reset
    is only valid for next 5 minutes.</p> <br>
    <p>Thanks</p>
    <h2>MLBP Team </h2>
    <p>Contact us through email: ${process.env.SENDGRID_EMAIL}</p>
`;
  return message;
};

export { forgetPasswordTemplate };
