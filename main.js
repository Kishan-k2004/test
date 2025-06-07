import pkg from 'node-appwrite';
const { Client } = pkg;

export default async ({ req, res }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  // Safe body parsing
  let bodyData = {};
  try {
    bodyData = req.body ? JSON.parse(req.body) : {};
  } catch (err) {
    return res.json({ success: false, error: 'Invalid JSON input' });
  }

  const { email } = bodyData;

  if (!email) {
    return res.json({ success: false, error: 'Email is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const response = await client.call('post', '/messaging/emails', {
      headers: {
        'content-type': 'application/json'
      },
      json: {
        subject: "Your OTP Code",
        content: `Your OTP is: ${otp}`,
        recipients: [email]
      }
    });

    return res.json({ success: true, otp, response });
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
};
