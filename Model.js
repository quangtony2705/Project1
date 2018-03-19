module.exports = function () {
    var self = {};
    var userSchema = Library.dbb.Schema({
        username: String,
        password: String,
        email: String,
        phone: String,
    });
    self.users = Library.dbb.model("users", userSchema, "users");

    var productSchema = Library.dbb.Schema({
        ten: String,
        trangthai: String,
        gia: String,
        loai: String,
        productImage: String,
    })
    self.products = Library.dbb.model("products", productSchema, "products")

    var productDetailSchema = Library.dbb.Schema({
        idProduct: String,
        ten: String,
        xuatxu: String,
        trongluong: String,
        namsx: String,
    })
    self.productDetails = Library.dbb.model("productDetails", productDetailSchema, "productDetails")
    return self;
};
