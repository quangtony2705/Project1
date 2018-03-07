//================= CONFIG =====================//
Config = require('./Config.js')()

//================= LIBRARY =====================//
Library = require('./Library.js')()

//================= MODEL =====================//
Model = require('./Model.js')()

Library.app.use(require('body-parser').json({ limit: '50mb' }))
Library.app.use(require('body-parser').urlencoded({ limit: '50mb', extended: true }))
Library.app.use(require('cookie-parser')())

//================= CONTROLLER =====================//
Library.app.use(require('./server/services/bUserCtrl.js'))

Library.app.listen(Config.PORT_SERVER, () => {
  console.log(`App listening on port ${Config.PORT_SERVER}!`);
});