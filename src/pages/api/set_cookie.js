import cookie from 'cookie';

export default (req, res) => {
  const NAME_COOKIES = Object.freeze({
    userEmail: 'userEmail',
    cookieConsent: 'TOYOTA_COOKIE_CONSENT',
  }); 

  res.setHeader('Set-Cookie', cookie.serialize(
    req.body.email ? NAME_COOKIES.userEmail : NAME_COOKIES.cookieConsent, // name
    req.body.email ? req.body.email : JSON.stringify(req.body.consent), // value
    {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'strict',
      path: '/',
    }));
  res.statusCode = 200;
  res.json({ success: true });
};
