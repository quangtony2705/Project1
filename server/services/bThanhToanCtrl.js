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
router.post('/insertUser', function (req, res) {
      var userInfo = req.body;
      if (!userInfo.username || !userInfo.password || !userInfo.email || !userInfo.phone) {
            res.send('Khong duoc bo trong');
      } else {
            var newUser = new Model.users({
                  username: userInfo.username,
                  password: userInfo.password,
                  email: userInfo.email,
                  phone: userInfo.phone,
                  enable:userInfo.enable,
            });
            newUser.save(function (err, users) {
                  if (err)
                        res.send('Loi');
                  else
                        res.send(users);
            });
      }
});
router.get('/userExist', function (req, res) {
      Model.users.find({ username: req.query.username }, function (err, response) {
            if (response.length > 0) {
                  res.send('1')
            }
            else {
                  res.send('0')
            }

      })
})
router.put('/updateUser', function (req, res) {
      Model.users.findByIdAndUpdate({ _id: req.body.id }, req.body, function (err, response) {
            if (err) res.json({ message: "Error in updating person with id " + req.body.id });
            res.json(response);
      });
});
router.get('/login', function (req, res) {
      Model.users.find({ username: req.query.username, password: req.query.password }, function (err, response) {
            if (response.length > 0) {
                req.session.user =req.query.username;
                 // req.session.save();
                  res.json(response)
            }
            else {
                  res.json({ username: '' })
            }
      });
});
router.get('/loaduser', function (req, res) {
      Model.users.find(function (err, response) {
            res.json(response)
      })
});
router.get('/loaduserbyid', function (req, res) {
      Model.users.find({ _id: req.query.id },function (err, response) {
            res.json(response)
      })
});
router.get('/loaduserbyName', function (req, res) {
      Model.users.find({username: req.query.name },function (err, response) {
            res.json(response)
      })
});


module.exports = router;