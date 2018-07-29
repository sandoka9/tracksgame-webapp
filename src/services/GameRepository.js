// Firebase App is always required and must be first
var firebase = require('firebase/app')
require('firebase/storage')

var config = {
  apiKey: 'AIzaSyDo7xfcRgmf05fOijcTn51TJt31j8e7VjM',
  projectId: 'tracksgame-211220',
  storageBucket: 'tracksgame-211220.appspot.com'
}

firebase.initializeApp(config)

// TODO : externalise firebase access
var gameRepository = {

  // TODO : process.env.FIREBASE_ENV at build
  env: process.env.FIREBASE_ENV || 'dev',
  storage: firebase.app().storage(),

  /*
  rewriteUrl: function (tgId, url) {
    var tgPublicRef = this.getGamePublicRef(tgId)
    var downloadUrl = tgPublicRef.child(url).getDownloadURL()
    return downloadUrl
  },

  rewriteUrls: function (tgId, data) {
    console.debug(data.questions[5])
    var mp3Src = data.questions[5].src
    return this.rewriteUrl(tgId, mp3Src).then(function (url) {
      return new Promise(function (resolve, reject) {
        data.questions[5].src = url
        resolve(data)
      })
    })
  },
  */

  getGamePublicRef: function (tgId) {
    var envPath = this.env === 'prd' ? this.env : this.env + '/'
    var tgPath = envPath + 'tg' + '/' + tgId
    // get a reference to the desired tracksgame
    var storageRef = this.storage.ref()
    var tgRef = storageRef.child(tgPath)
    var tgPublicRef = tgRef.child('public')
    return tgPublicRef
  },

  getTgDefUrl: function (tgId) {
    var tgPublicRef = this.getGamePublicRef(tgId)
    return tgPublicRef.child('tgame.json').getDownloadURL()
  },

  // TODO : create Promise
  getGame: function (tgId, callback) {
    console.debug('fetching data for game ' + tgId)
    // var that = this
    return this.getTgDefUrl(tgId).then(function (url) {
      console.debug('using url ' + url)
      var xhr = new XMLHttpRequest()
      xhr.responseType = 'application/json'
      xhr.onload = function (event) {
        var json = xhr.response
        var data = JSON.parse(json)
        callback(data)
        // TODO : rewrite urls
      }
      xhr.open('GET', url)
      xhr.send()
    })
  }

}

module.exports = gameRepository
