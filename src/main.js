import sdk from "node-appwrite";

export default async ({ req, res }) => {
  const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const messaging = new sdk.Messaging(client);

  // Get email from request body
  const { email } = JSON.parse(req.body);

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Send email
  try {
    await messaging.createEmail({
      subject: "Your OTP Code",
      content: `Your OTP is: ${otp}`,
      recipients: [email]
    });

    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
};
