module.exports = function () {
    var self = {};
    var userSchema = Library.dbb.Schema({
        username: String,
        password: String,
        rights: String,
    });
    self.users = Library.dbb.model("users", userSchema, "users");
    return self;
};
