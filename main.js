import pkg from 'node-appwrite';
const { Client, Users, ID } = pkg;

export default async ({ req, res }) => {
  let payloadData = {};

  // Safely parse payload
  try {
    payloadData = req.payload ? JSON.parse(req.payload) : {};
  } catch (err) {
    return res.json({ success: false, error: 'Invalid JSON in payload' });
  }

  const { email } = payloadData;

  if (!email) {
    return res.json({ success: false, error: 'Email is required' });
  }

  // ✅ Replace with your email sending logic here (this is just a dummy example)
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Respond back
  return res.json({
    success: true,
    email,
    otp,
    message: `OTP sent to ${email} (not really, just mocked)`
  });
};
