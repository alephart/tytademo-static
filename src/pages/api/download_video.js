const request = require("request");

export default (req, res) => {
  // get path file aws
  const filePath = req.query.filename;
  // ex: https://toyota-featuring-you.s3.us-west-1.amazonaws.com/videos/video-ckql4eczc0000f6qv2qr64qqq_final.mp4

  // filename only
  const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);

  // set header
  res.setHeader("content-disposition", "attachment; filename=this-is-my-experience-toyota.mp4");

  // send request to the original file
  request
    .get(`${process.env.AWS_ARN_URL}/videos/${fileName}`) // download original video
    .on("error", function(err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>404 video not found</h1>");
      res.end();
      return;
    })
    .pipe(res); // pipe converted video to HTTP response
};