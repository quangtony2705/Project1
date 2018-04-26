module.exports = function () {
    var self = {};
    var userSchema = Library.dbb.Schema({
        username: String,
        password: String,
        email: String,
        phone: String,
        enable: String,
    });
    self.users = Library.dbb.model("users", userSchema, "users");

    var productSchema = Library.dbb.Schema({
        pName: String,
        pStatus: String,
        pPrice: Number,
        pType: String,
        productImage: String,
        pOwner: String,
    })
    self.products = Library.dbb.model("products", productSchema, "products")

    var productDetailSchema = Library.dbb.Schema({
        idProduct: String,
        Name: String,
        madeIn: String,
        weight: String,
        year: String,
    })
    self.productDetails = Library.dbb.model("productDetails", productDetailSchema, "productDetails")

    var MenuSchema = Library.dbb.Schema({
        Name: String,
        link: String,
    })
    self.Menu = Library.dbb.model("Menu", MenuSchema, "Menu")

    var HoadonSchema = Library.dbb.Schema({
        name: String,
        email: String,
        phone: String,
        address: String,
        product: Array,
        pName:String,
        pPrice: String,
        qty: String,
        total: String,
    })
    self.Menu = Library.dbb.model("Menu", MenuSchema, "Menu")

    return self;
};
