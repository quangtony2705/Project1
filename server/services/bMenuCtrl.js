var express = require('express');
var router = express();
var session = require('express-session');

router.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true
}))
router.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      next();
});

router.get('/loadMenu', function (req, res) {
      Model.Menu.find(function (err, response) {
            res.json(response)
      })
});


router.post("/insertMenu", (req, res, next) => {
      var MenuInfo = req.body;
      
      if (!MenuInfo.Name || !MenuInfo.link ) {
            res.send('not be emtried');
      } else {
            var newMenu = new Model.Menu({
                  Name: MenuInfo.Name,
                  link: MenuInfo.link,                  
            });
            newMenu.save(function (err, Menu) {
                  if (err)
                        res.send('Error');
                  else
                        res.send("success");
            });
      }
});
router.delete('/delMenu', function (req, res) {
      Model.Menu.findByIdAndRemove({ _id: req.query.id }, function (err, response) {
            if (err) res.json("Error in deleting record id " + req.query.id);
            else res.send("Id " + req.query.id + " removed.");
      });
});
router.get('/MenuExist', function (req, res) {
      Model.Menu.find({ Name: req.query.Name }, function (err, response) {
            if (response.length > 0) {
                  res.send('1')
            }
            else {
                  res.send('0')
            }

      })
});

module.exports = router;