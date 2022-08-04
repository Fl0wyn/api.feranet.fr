var express = require('express');
var router = express.Router();

const axios = require('axios').default;
require('dotenv').config()

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: process.env.WINDOWSMS * 60 * 1000,
  max: process.env.MAX,
});

router.get('/github', limiter, (req, res) => {

  let token = process.env.GITHUB_TOKEN;
  (async () => {
    try {
      let getRequest = await axios(
        {
          method: 'post',
          url: 'https://api.github.com/graphql',
          headers: { Authorization: `bearer ${token}` },
          data: {
            query: `{
              user(login: "Fl0wyn") {
                pinnedItems(first: 6, types: REPOSITORY) {
                  nodes {
                    ... on RepositoryInfo {
                      name
                      description
                      url
                      createdAt
                      updatedAt
                    }
                  }
                }
              }
            }`
          }
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
