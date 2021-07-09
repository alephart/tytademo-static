import cookie from 'cookie';

export default (req, res) => {
  res.setHeader('Set-Cookie', cookie.serialize("userEmail", req.body.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'strict',
    path: '/',
  }));
  res.statusCode = 200;
  res.json({ success: true });
};
