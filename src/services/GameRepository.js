// Firebase App is always required and must be first
var firebase = require('firebase/app')
require('firebase/storage')

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

firebase.initializeApp(config)

// TODO : externalise firebase access

function GameRepository (storage) {
  this.storage = storage
  this.env = process.env.FIREBASE_ENV || 'dev'
  console.debug('Using ' + this.env + ' firebase environment')
  this.storage_env = process.env.STORAGE_ENV || 'loc'
  console.debug('Using ' + this.storage_env + 'storage environment')
}

GameRepository.prototype.getRootLocalUrl = function getRootLocalUrl () {
  var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
  return host
}

GameRepository.prototype.getResourceUrl = function getResourceUrl (tgId, url) {
  if (this.storage_env === 'loc') {
    var relativPath = url
    return new Promise((resolve) => {
      // TODO use context
      var context = ''
      var host = this.getRootLocalUrl()
      var base = host + '/' + context + tgId + '/public/'
      var resourceUrl = base + relativPath
      resolve(resourceUrl)
    })
  } else {
    var tgPublicRef = this.getGamePublicRef(tgId)
    var downloadUrl = tgPublicRef.child(url).getDownloadURL()
    return downloadUrl
  }
}

GameRepository.prototype.rewriteUrls = function rewriteUrls (tgId, data) {
  console.debug(data.questions[5])
  var mp3Src = data.questions[5].src
  return this.getResourceUrl(tgId, mp3Src).then(function (url) {
    return new Promise(function (resolve) {
      data.questions[5].src = url
      console.debug('Rewriting url in : ' + url)
      resolve(data)
    })
  })
}

GameRepository.prototype.getJSON = function getJSON (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'application/json'
    xhr.onload = function (event) {
      var json = xhr.response
      var data = JSON.parse(json)
      resolve(data)
    }
    xhr.onerror = () => reject(xhr.statusText)
    xhr.open('GET', url)
    xhr.send()
  })
}

GameRepository.prototype.getGamePublicRef = function getGamePublicRef (tgId) {
  var envPath = this.env === 'prd' ? this.env : this.env + '/'
  var tgPath = envPath + 'tg' + '/' + tgId
  // get a reference to the desired tracksgame
  var storageRef = this.storage.ref()
  var tgRef = storageRef.child(tgPath)
  var tgPublicRef = tgRef.child('public')
  return tgPublicRef
}

GameRepository.prototype.getTgDefUrl = function getTgDefUrl (tgId) {
  return this.getResourceUrl(tgId, 'tgame.json')
}

// TODO : create Promise
GameRepository.prototype.getGame = function getGame (tgId) {
  return new Promise((resolve, reject) => {
    console.debug('fetching data for game ' + tgId)
    var that = this
    return this.getTgDefUrl(tgId)
      .then(function (url) {
        console.debug('Using ' + url + ' url')
        return that.getJSON(url)
      })
      .then(data => this.rewriteUrls(tgId, data))
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export default new GameRepository(firebase.app().storage())
