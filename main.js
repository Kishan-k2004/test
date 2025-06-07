import pkg from 'node-appwrite';
const { Client, Messaging } = pkg;

export default async ({ req, res }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const messaging = new Messaging(client);

  const { email } = JSON.parse(req.body);

  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    await messaging.createEmail({
      subject: "Your OTP Code",
      content: `Your OTP is: ${otp}`,
      recipients: [email]
    });

    return res.json({ success: true, otp });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};
