var logMessage = '';
var stackMessage = '';
function log(msg) {
  this.logMessage = msg
}
function show() {
  console.log('this.stackMessage', this.stackMessage)
  this.stackMessage = this.stackMessage + '\r\n' + this.logDate.getHours() + ':' + this.logDate.getHours() + ' > ' + this.logMessage
  return this.stackMessage
}
var tgLogger = {
  log: function (msg) {
    this.logMessage = msg
  },
  show: function () {
    return this.logMessage
  },
  send: function (msg) {
  },
  catchResquest: function (fct) {
  },
  catchOtherError: function () {
  }

}
module.exports = (function (Mess) {
  var tgLogger = {
    log: log(),
    show: show()
  }
  return tgLogger
})();