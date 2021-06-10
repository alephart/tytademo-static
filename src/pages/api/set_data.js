export default (req, res) => {
  console.log('set data::::', req.body);

  res.status(200).send({ success: true, dataBody: req.body });
}