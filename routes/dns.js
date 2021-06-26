var express = require('express');
var router = express.Router();

const dns = require('dns');
var isValidDomain = require('is-valid-domain');
var ipRegex = require('ip-regex');

require('dotenv').config()

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: process.env.LOW_WINDOWMS,
  max: process.env.LOW_MAX,
});

router.get('/dns/:ip/:type', limiter, (req, res) => {

  var rrip = req.params.ip
  var rrtype = req.params.type

  if (
    !ipRegex({ exact: true }).test(rrip) &&
    !isValidDomain(rrip)
  ) {
    var api = true
    res.status(400).render('error', {
      api: api
    });
  } else {
    try {
      dns.resolve(rrip, rrtype, (err, response) => {
        if (!response) {
          res.json(['Aucune information trouvées']);
        } else {
          res.json(response);
        }

      });
    } catch (err) {
      var api = true
      res.status(400).render('error', {
        api: api
      });
    }
  }
});

module.exports = router;
