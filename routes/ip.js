var express = require('express');
var router = express.Router();

const axios = require('axios').default;
require('dotenv').config()

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: process.env.MODERATE_WINDOWMS,
  max: process.env.MODERATE_MAX,
});

router.get('/ip', limiter, (req, res) => {

  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  axios({
    method: 'get',
    url: 'https://ipinfo.io/' + ip + '?token=' + process.env.KEY,

    responseType: 'json'
  })
    .then(function (response) {
      res.json(response.data)
    })
    .catch(function (error) {
      var api = true
      res.status(400).render('error', {
        api: api
      })
    });
});

module.exports = router;
