import notificationapi from "notificationapi-node-server-sdk";

type Parameters = { [key: string]: string };

export async function sendSmsTemplate(
  number: string,
  userId: string,
  templateId: string,
  parameters: Parameters,
) {
  return await notificationapi.send({
    type: "login_otp",
    to: {
      id: userId,
      number,
    },
    parameters,
    templateId,
  });
}

export async function sendSms(number: string, userId: string, message: string) {
  return await notificationapi.send({
    type: "login_otp",
    to: {
      id: userId,
      number,
    },
    sms: {
      message,
    },
  });
}
