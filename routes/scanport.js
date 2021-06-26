var express = require('express');
var router = express.Router();

var isValidDomain = require('is-valid-domain');
var ipRegex = require('ip-regex');
var isopen = require("isopen");

require('dotenv').config()

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: process.env.HIGHT_WINDOWMS,
  max: process.env.HIGHT_MAX,
});

router.get('/scanPort/:ip/:port', limiter, (req, res) => {
  var rrip = req.params.ip
  var rrport = req.params.port

  if (
    !ipRegex({ exact: true }).test(rrip) &&
    !isValidDomain(rrip) ||
    /^\d+$/.test(rrport) === false ||
    rrport <= 1 ||
    rrport >= 65536
  ) {
    var api = true
    res.status(400).render('error', {
      api: api
    });

  } else {
    isopen(rrip, rrport, function (response) {
      res.json(response);
    });
  }
});

module.exports = router;
