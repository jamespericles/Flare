const express = require("express");
const router = express.Router();

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/", (req, res) => {
  res.header("Content-Type", "application/json");
  /* NEEDED WITHIN THE CRON JOB - then not needed, .catch to log errors */
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body,
    })
    .then(() => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
  /* NEEDED END */
});

module.exports = router;
