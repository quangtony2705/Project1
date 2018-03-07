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
      next();
});
router.post('/insertUser', function (req, res) {
      var userInfo = req.body;
      if (!userInfo.username || !userInfo.password) {
            res.send('Khong duoc bo trong');
      } else {
            var newUser = new Model.users({
                  username: userInfo.username,
                  password: userInfo.password
            });
            newUser.save(function (err, users) {
                  if (err)
                        res.send('Loi');
                  else
                        res.send(users);
            });
      }
});
router.get('/login', function (req, res) {
      Model.users.find({ username: req.query.username, password: req.query.password }, function (err, response) {
            if (response.length > 0) {
                req.session.user =req.query.username;
                 // req.session.save();
                  res.json({ username: req.session.user})
            }
            else {
                  res.json({ username: '' })
            }
      });
});

// router.get('/index', function (req, res) {
//       Model.SwifiTest.aggregate([{
//             $group: {
//                   _id: '$group',
//             }
//       }
//       ], function (err, result) {
//             if (err) {
//                   console.log(err);
//                   return;
//             }
//             res.json(result)
//       });
// });

// router.get('/loadData', function (req, res) {
//       Model.SwifiTest.find(function (err, response) {
//             res.json(response);
//       });
// });

// router.get('/index/group', function (req, res) {
//       Model.SwifiTest.find({ group: req.query.group }, function (err, response) {
//             res.json(response)
//       })
// })

// router.get('/index/date', function (req, res) {
      // Model.SwifiTest.aggregate([
      //       {
      //             $project: {
      //                   user_name: 1,
      //                   mac_device: 1,
      //                   input_octets: 1,
      //                   output_octets: 1,
      //                   created_at:1,
      //                   date: { $substr: ["$created_at", 0, 10] },
      //                   sameDay: {
      //                         $cond: [
      //                               {
      //                                     $eq: [
      //                                           { $substr: ["$created_at", 0, 10] },
      //                                           { $substr: [req.query.created_at, 0, 10] }
      //                                     ]
      //                               }, true, false
      //                         ]
      //                   }
      //             }
      //       },
      //       {
      //             $match: {
      //                   sameDay: true
      //             }
      //       }
      // ], function (err, result) {
      //       if (err) {
      //             console.log(err);
      //             return;
      //       }
      //       res.json(result)
      // });

//       // Model.DateTest.find({ 
//       //       $where: function() { 
//       //           return this.created.getDate() === this.last_active.getDate() 
//       //       } 
//       //    },function(err,response){
//       //       res.json(response)
//       // })
// })

// router.get('/index/tong', function (req, res) {
//       console.log(req.query.group)
//       var thang
//       if (req.query.month.length == 1) {
//             thang = 0 + req.query.month;
//       }
//       else {
//             thang = req.query.month
//       }
//       Model.SwifiTest.aggregate([
//             {
//                   $project: {
//                         input_octets: 1,
//                         output_octets: 1,
//                         sameMonth: {
//                               $cond: [
//                                     {
//                                           $eq: [
//                                                 { $substr: ["$created_at", 5, 2] },
//                                                 thang
//                                           ]
//                                     }, true, false
//                               ]
//                         },
//                         sameGroup: {
//                               $cond: [
//                                     {
//                                           $eq: [
//                                                 '$group',
//                                                 req.query.group
//                                           ]
//                                     }, true, false
//                               ]
//                         }
//                   }
//             },
//             {
//                   $match: {
//                         $and: [
//                               { sameMonth: true },
//                               { sameGroup: true }
//                         ]
//                   }
//             },
//             {
//                   $group: {
//                         //gom nhom
//                         _id: req.query.group,
//                         //tinh tong cua group do
//                         tong: { $sum: { $add: ['$output_octets', '$input_octets'] } }
//                   }
//             }
//       ], function (err, result) {
//             if (err) {
//                   console.log(err);
//                   return;
//             }
//             res.json(result)
//       });
// })
module.exports = router;