import sdk from "node-appwrite";

export default async ({ req, res }) => {
  const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const emails = new sdk.Emails(client);

  // Get email from request body
  const { email } = JSON.parse(req.body);

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    // Send the email
    await emails.create(
      "your_email_template_id", // Get this from Appwrite → Messaging → Templates
      [email], // Recipient list
      {
        OTP: otp // This is your dynamic variable in the template
      }
    );

    return res.json({ success: true, otp }); // Include OTP if needed
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
};
