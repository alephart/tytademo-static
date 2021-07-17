export default (req, res) => {
  try {
    const props = {
      TOYOTA_COOKIE_CONSENT: req.cookies.TOYOTA_COOKIE_CONSENT || null,
    }
    res.status(200).json(props);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
}
