let { logmailer, Recipient, Chapter, StandardChapters } = require("logmailer");

  // the order in this object is the order of the chapters in the email
  let chapters = {
      summary: StandardChapters.Summary,
      ffOnly: new Chapter("Firefighter only", false, "DeepPink"),
      managerOnly: new Chapter("Manager only", false, "DarkSlateBlue"),
      errors: StandardChapters.Errors,
      logs: StandardChapters.Logs
  }

  const config = {
    host: process.env.AWS_SES_HOST,
    port: process.env.AWS_SES_PORT,
    user: process.env.AWS_SES_USERNAME,
    pass: process.env.AWS_SES_PASSWORD,
    from: process.env.NEXT_PUBLIC_FROM_EMAIL,
  };

  logmailer.create({
      appName: "Toyota Experience",
      mailAlias: config.from,
      client: {
          host: config.host,
          user: config.user,
          password: config.pass,
          ssl: true
      },
      recipients: [
          "jpulido@mdsdigital.com", // receives everything
          "dlara@mdsdigital.com",
          //"lcardona@mdsdigital.com",
          //"ftorres@mdsdigital.com",

          // receives email if the "managerOnly" chapter is not empty
          // receives only the chapter "managerOnly"
          //new Recipient("lcardona@mdsdigital.com", [chapters.managerOnly], [chapters.managerOnly]),

          // receives email if the "ffOnly" chapter is not empty
          // receives only the chapters "ffOnly" and "errors"
          //new Recipient("ftorres@mdsdigital.com", [chapters.ffOnly], [chapters.summary, chapters.ffOnly, chapters.errors]),
      ],
      chapters: chapters
  })

  module.exports.logmail = chapters;
  module.exports.logmailer = logmailer;