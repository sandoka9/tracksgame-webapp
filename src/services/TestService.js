var tgLogger = {
  logMessage: 'start',
  logDate: new Date(),
  stackMessage: '',
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
  },
  catchResquest: function (fct) {
  },
  catchOtherError: function () {
  }
}
module.exports = tgLogger
