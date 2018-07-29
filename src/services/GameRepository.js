// Firebase App is always required and must be first
var firebase = require('firebase/app')
require('firebase/storage')

var config = {
  apiKey: 'AIzaSyDo7xfcRgmf05fOijcTn51TJt31j8e7VjM',
  projectId: 'tracksgame-211220',
  storageBucket: 'tracksgame-211220.appspot.com'
}

firebase.initializeApp(config)

var gameRepository = {

  // TODO : process.env.FIREBASE_ENV at build
  env: process.env.FIREBASE_ENV || 'dev',
  storage: firebase.app().storage(),

  getTgDefUrl: function (tgId) {
    var envPath = this.env ? this.env : this.env + '/'
    var tgPath = envPath + 'tg' + '/' + tgId
    // get a reference to the desired tracksgame
    var storageRef = this.storage.ref()
    var tgRef = storageRef.child(tgPath)
    var tgPublicRef = tgRef.child('public')
    return tgPublicRef.child('tgame.json').getDownloadURL()
  }
}

module.exports = gameRepository
