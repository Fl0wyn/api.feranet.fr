var express = require('express');
var router = express.Router();

const axios = require('axios').default;
require('dotenv').config()

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: process.env.WINDOWSMS * 60 * 1000,
  max: process.env.MAX,
});

router.get('/dribbble', limiter, (req, res) => {

  (async () => {
    try {
      let getRequest = await axios(
        {
          method: 'get',
          url: 'https://api.dribbble.com/v2/user/shots?access_token=' + process.env.DRIBBBLE_TOCKEN,
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
