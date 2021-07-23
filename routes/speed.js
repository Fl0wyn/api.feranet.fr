var express = require('express');
var router = express.Router();

require('dotenv').config()
const { exec } = require("child_process")

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: process.env.MODERATE_WINDOWMS,
  max: process.env.MODERATE_MAX,
});

router.get('/speed', limiter, (req, res) => {

  exec('speed-test -j', (error, stdout) => {
    if (error) {
      var api = true
      res.status(400).render('error', {
        api: api
      })
      return;
    }
    var data = JSON.parse(stdout)
    res.json(data)
  });
});

module.exports = router;
