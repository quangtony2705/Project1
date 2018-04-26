var express = require('express');
var router = express();
var session = require('express-session');
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, './client/public/uploads/');
      },
      filename: function (req, file, cb) {
            cb(null,path.extname(file.originalname));
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
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      next();
});

router.get('/loadproduct', function (req, res) {
      Model.products.find(function (err, response) {
            res.json(response)
      })
});


router.post("/insertProduct", upload.single('productImage'), (req, res, next) => {
      //res.send(req.body)
      var productInfo = req.body;
      
      if (!productInfo.pName || !productInfo.pStatus || !productInfo.pPrice || !productInfo.pType) {
            res.send('not be emtried');
      } else {
            var newProduct = new Model.products({
                  pName: productInfo.pName,
                  pStatus: productInfo.pStatus,
                  pPrice: productInfo.pPrice,
                  pType: productInfo.pType,
                  productImage: req.file.originalname,
                  pOwner: productInfo.pOwner,
            });
            newProduct.save(function (err, products) {
                  if (err)
                        res.send('Error');
                  else
                        res.send(req.file);
            });
      }
});
router.delete('/delproduct', function (req, res) {
      Model.products.findByIdAndRemove({ _id: req.query.id }, function (err, response) {
            if (err) res.json("Error in deleting record id " + req.query.id);
            else res.send("Id " + req.query.id + " removed.");
      });
});
router.get('/productExist', function (req, res) {
      Model.products.find({ pName: req.query.pName }, function (err, response) {
            if (response.length > 0) {
                  res.send('1')
            }
            else {
                  res.send('0')
            }

      })
});
router.get('/loadProductsByMenu', function (req, res) {
      Model.products.find({ pType: req.query.pType }, function (err, response) {
            res.json(response)
      })
})
router.get('/loadProductById', function (req, res) {
      Model.products.find({ _id: req.query.id }, function (err, response) {
            res.json(response)
      })
})
router.get('/loadProductsByOwner', function (req, res) {
      Model.products.find({ pOwner: req.query.pOwner }, function (err, response) {
            res.json(response)
      })
})
router.put('/updateProduct', function (req, res) {
      Model.products.findByIdAndUpdate({ _id: req.body.id }, req.body, function (err, response) {
            if (err) res.json({ message: "Error in updating person with id " + req.body.id });
            res.json(response);
      });
});
router.get('/countProduct', function (req, res) {
      Model.products.count(function (err, response) {
            res.json(response)
      });
});

module.exports = router;