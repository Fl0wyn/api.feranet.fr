var express = require('express');
var router = express.Router();

const fetch = require("node-fetch");

router.get('/flags/:country', (req, res) => {

  var rrcountry = req.params.country

  fetch("https://raw.githubusercontent.com/debmus/flags/master/svg/" + rrcountry + '.svg')
    .then(function (response) {
      if (response.ok) {
        return response.text()
          .then(function (svg) {
            return res.send(svg)
          })
      } else {
        var api = true
        res.status(400).render('error', {
          api: api
        })
      }
    })
    .catch(function (error) {
      var api = true
      res.status(400).render('error', {
        api: api
      })
    });
});

module.exports = router;
