// Firebase App is always required and must be first
var firebase = require('firebase/app')
require('firebase/storage')

// var _ = require('lodash')

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

firebase.initializeApp(config)

// TODO : externalise firebase access

const GAME_DEF_FILE = 'tgame.json'

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

GameRepository.prototype.getLocalResourceUrl = function getLocalResourceUrl (tgId, url) {
  return new Promise((resolve) => {
    var base = tgId + '/public/'
    var resourceUrl = base + url
    resolve(resourceUrl)
  })
}

GameRepository.prototype.getLocalTgDef = function getLocalTgDef (tgId) {
  return new Promise((resolve) => {
    var host = this.getRootLocalUrl()
    var tgDefUrl = host + '/' + tgId + '/public/' + GAME_DEF_FILE
    resolve(tgDefUrl)
  })
}

GameRepository.prototype.getResourceUrl = function getResourceUrl (tgId, url) {
  if (this.storage_env === 'loc') {
    return this.getLocalResourceUrl(tgId, url)
  } else {
    var tgPublicRef = this.getGamePublicRef(tgId)
    var downloadUrl = tgPublicRef.child(url).getDownloadURL()
    return downloadUrl
  }
}

GameRepository.prototype.getResourcesToRewrite = function getResourcesToRewrite (json) {
  let pattern = /"([^"]+(?:jpg|gif|png|mp3))"/g
  let resources = []
  let match = {}
  // eslint-disable-next-line no-cond-assign
  while (match = pattern.exec(json)) {
    resources.push(match[1])
  }
  return resources
}

GameRepository.prototype.resolveUrl = function resolveUrl (tgId, url) {
  return this.getResourceUrl(tgId, url)
    .then(function (newUrl) {
      return new Promise(function (resolve) {
        let replacement = { oldValue: url, newValue: newUrl }
        resolve(replacement)
      })
    })
}

GameRepository.prototype.rewriteUrls = function rewriteUrls (tgId, json) {
  let resources = this.getResourcesToRewrite(json)
  let urls = resources.map(r => this.resolveUrl(tgId, r))
  console.debug(urls)
  return new Promise(function (resolve) {
    return Promise.all(urls).then(function (replacements) {
      replacements.forEach(function (r) {
        console.debug(r.oldValue + ' : ' + r.newValue)
        json = json.replace(r.oldValue, r.newValue)
      })
      console.debug('json after replacements')
      // console.debug(json)
      let data = JSON.parse(json)
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
      resolve(json)
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
  if (this.storage_env === 'loc') {
    return this.getLocalTgDef(tgId)
  } else {
    var tgPublicRef = this.getGamePublicRef(tgId)
    var downloadUrl = tgPublicRef.child(GAME_DEF_FILE).getDownloadURL()
    return downloadUrl
  }
}

GameRepository.prototype.getGame = function getGame (tgId) {
  return new Promise((resolve, reject) => {
    console.debug('fetching data for game ' + tgId)
    var that = this
    return this.getTgDefUrl(tgId)
      .then(url => that.getJSON(url))
      .then(json => this.rewriteUrls(tgId, json))
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export default new GameRepository(firebase.app().storage())
