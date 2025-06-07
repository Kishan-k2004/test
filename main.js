import pkg from 'node-appwrite';
const { Client } = pkg;

export default async ({ req, res }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  let bodyData = {};

  try {
    bodyData = req.payload ? JSON.parse(req.payload) : {};
  } catch (err) {
    return res.json({ success: false, error: 'Invalid payload format' });
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
