import * as AWS from "aws-sdk";
import { SendRawEmailRequest } from "aws-sdk/clients/ses";
import config from "src/config";
import { ses } from "./aws.scripts";

export const AWSSendMail = async (email: {
  to: [string];
  html: string;
  subject: string;
}) => {
  const params = {
    Destinations: email.to, // Use Destinations instead of ToAddresses
    RawMessage: {
      Data:
        `From:"${config.TWILIO_FAMILY_NAME}" <${config.AWS_SENDERS_EMAIL}>\n` +
        `To: ${email.to.join(",")}\n` +
        `Subject: ${email.subject}\n` +
        "MIME-Version: 1.0\n" +
        'Content-type: multipart/mixed; boundary="NextPart"\n\n' +
        "--NextPart\n" +
        "Content-Type: text/html; charset=UTF-8\n\n" +
        `${email.html}\n\n` +
        "--NextPart",
    },
  };

  try {
    await ses.sendRawEmail(params as SendRawEmailRequest).promise();
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default {
  AWSSendMail,
};
