module.exports = function() {
    var self = {}
    self.express = require('express')
    self.app = self.express()
    self.path = require('path')
    self.morgan = require('morgan')
    self.bodyParser = require('body-parser')
	self.multer = require('multer')
	self.upload = self.multer() 
	self.session = require('express-session')
	self.cookieParser = require('cookie-parser')
    self.dbb = require('mongoose').connect(Config.MONGO_PROJECT)
    return self
}