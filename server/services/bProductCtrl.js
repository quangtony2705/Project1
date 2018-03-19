var express = require('express');
var router = express();
var session = require('express-session');
var multer = require('multer');
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, './client/public/uploads/');
      },
      filename: function (req, file, cb) {
            cb(null,file.originalname);
      }
});

var fileFilter = (req, file, cb) => {
      // reject a file
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
      } else {
            cb(null, false);
      }
};
var upload = multer({
      storage: storage
});

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
// router.post('/insertProduct', function (req, res) {
//       var productInfo = req.body;
//       if (!productInfo.ten || !productInfo.trangthai || !productInfo.gia || !productInfo.loai) {
//             res.send('Khong duoc bo trong');
//       } else {
//             var newProduct = new Model.products({
//                   ten: productInfo.ten,
//                   trangthai: productInfo.trangthai,
//                   gia: productInfo.gia,
//                   loai: productInfo.loai
//             });
//             newProduct.save(function (err, products) {
//                   if (err)
//                         res.send('Loi');
//                   else
//                         res.send(products);
//             });
//       }
// });

router.get('/loadproduct', function (req, res) {
      Model.products.find(function (err, response) {
            res.json(response)
      })
});

// var uploa = upload.single('hinh');

// router.post("/insert", function (req, res) {
//       uploa(req, res, function (err) {
//             if (err) {
//                   res.json({
//                         message:'fail'
//                   })
//             } else {
//                   res.json({
//                         success: true,
//                         message: 'image uploaded'+req.file.path
//                   })
//             }
//       })
// });

router.post("/insertProduct", upload.single('productImage'), (req, res, next) => {
      var productInfo = req.body;
      if (!productInfo.ten || !productInfo.trangthai || !productInfo.gia || !productInfo.loai) {
            res.send('Khong duoc bo trong');
      } else {
            var newProduct = new Model.products({
                  ten: productInfo.ten,
                  trangthai: productInfo.trangthai,
                  gia: productInfo.gia,
                  loai: productInfo.loai,
                  productImage: req.file.originalname,
            });
            newProduct.save(function (err, products) {
                  if (err)
                        res.send('Loi');
                  else
                        res.send(products);
            });
      }
});

router.get('/productExist', function (req, res) {
      Model.products.find({ ten: req.query.ten }, function (err, response) {
            if (response.length > 0) {
                  res.send('1')
            }
            else {
                  res.send('0')
            }

      })
});


module.exports = router;