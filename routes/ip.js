var express = require('express');
var router = express.Router();

const axios = require('axios').default;
require('dotenv').config()

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: process.env.WINDOWSMS * 60 * 1000,
  max: process.env.MAX,
});

router.get('/ip', limiter, (req, res) => {

  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  (async () => {
    try {
      let getRequest = await axios(
        {
          method: 'get',
          url: 'https://ipinfo.io/' + ip + '?token=' + process.env.IPINFO_KEY,
        }
      );
      let resp = await getRequest.data;

      res.json(resp);

    } catch (err) {
      console.log(err)
      res.status(400);
    }
  })();

});

module.exports = router;
