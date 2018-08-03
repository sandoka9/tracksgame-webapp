/*
LOG_LEVEL = {
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  CRITIAL: 4
}
*/
/*
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
}
*/
var tgLogger = {
  logMessage: 'start',
  logDate: new Date(),
  stackMessage: '',
  isDebbugActive: function () {
    if (process.env.NODE_ENV === '"production"') {
      return false
    }
    if (process.env.DEBUG === 'false') {
      return false
    }
    return true
  },
  info: function (message) {
    if (!this.isDebbugActive() || process.env.LOG_LEVEL > 1) {
      return '' // Do nothing
    }
    this.log(message)
  },
  warn: function (message) {
    this.log(message)
  },
  error: function (message) {
    if (!this.isDebbugActive() || process.env.LOG_LEVEL > 3) {
      return '' // Do nothing
    }
    this.log(message)
  },
  critical: function (message) {
    this.log(message)
  },
  errorHandler: function () {
    console.log('this.config.errorHandler', this.config.errorHandler)
    console.log('!this.isDebbugActive()', !this.isDebbugActive())
    console.log('process.env.LOG_LEVEL < 2')
    if (!this.isDebbugActive() || process.env.LOG_LEVEL > 2) {
      return '' // Do nothing
    }
    console.log('this.config.errorHandler', this.config.errorHandler)
    this.log(this.config.errorHandler) // warnHandler
  },
  show: function () {
    if (this.logMessage !== '') {
      console.log('logMessage not empty', this.logMessage)
      this.stackMessage = this.stackMessage + '\r\n' + this.logDate.getHours() + ':' + this.logDate.getMinutes() + ' > ' + this.logMessage
      this.logMessage = ''
    }
    return this.stackMessage
  },
  log: function (msg) {
    this.logMessage = msg
  },
  send: function (msg) {
  }
}
module.exports = tgLogger
