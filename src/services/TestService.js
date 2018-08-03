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
    console.log('messInfo', message)
    this.log('info', message)
  },
  warn: function (message) {
    if (!this.isDebbugActive() || process.env.LOG_LEVEL > 2) {
      return '' // Do nothing
    }
    console.log('messWarn', message)
    this.log('warn', message)
  },
  error: function (message) {
    if (!this.isDebbugActive() || process.env.LOG_LEVEL > 3) {
      return '' // Do nothing
    }
    console.log('messError', message)
    this.log('error', message)
  },
  critical: function (message) {
    if (!this.isDebbugActive() || process.env.LOG_LEVEL > 4) {
      return '' // Do nothing
    }
    console.log('messCritic', message)
    this.log('critical', message)
  },
  show: function () {
    return this.stackMessage
  },
  log: function (type, msg) {
    this.logMessage = msg
    this.stackMessage = this.stackMessage + '\r\n' + '<p class=content-log-"' + type + '" >' + this.logDate.getHours() + ':' + this.logDate.getMinutes() + ' > ' + this.logMessage + '</p>'
    this.logMessage = ''
  },
  send: function (msg) {
  }
}
module.exports = tgLogger
