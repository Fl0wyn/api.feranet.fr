var express = require('express');
var router = express.Router();

var isValidDomain = require('is-valid-domain');
var ipRegex = require('ip-regex');
const whois = require('whois')

require('dotenv').config()

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: process.env.LOW_WINDOWMS,
  max: process.env.LOW_MAX,
});

router.get('/whois/:ip', limiter, (req, res) => {
  var rrip = req.params.ip

  if (
    !ipRegex({ exact: true }).test(rrip) &&
    !isValidDomain(rrip)
  ) {
    var api = true
    res.status(400).render('error', {
      api: api
    });
    return
  } else {
    try {
      whois.lookup(rrip, function (err, response) {
        if (err) throw err;
        res.send(response);
      })
    } catch (err) {
      var api = true
      res.status(400).render('error', {
        api: api
      });
    }
  }
});

module.exports = router;
