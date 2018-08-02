/**
 * callService
 * Call API Web Service and return promise.
 *
 * @params service: API service name, 'review' or 'rating'
 * @params params: json list of parameters :
 *    mandatory 	: { listRid: ['4242','4243',...] }
 *  	facultativ 	: { lang:'fr', rootApiUrl:'https://rec-api.accorhotels.com', ApiVersion:'v1.0'
 * 	     , url:'https://rec-api.accorhotels.com/v1.0/reviews/8232,0557,5242,0449,1114,0417?lang=en' }
 */

var apiMgmtHandler = {
  callService: function(service, params) {

    var apiKey = this._getKey(service);
    var urlService = this._getUrlService(service, params);

    if (!urlService)
      return Promise.reject('[apiMgmtHandler.js] _getUrlService fail : need listRid to build urlService');
    else
      return jQuery.ajax({
        method: 'GET',
        url: urlService,
        crossOrigin: true,
        dataType: 'json',
        contentType: 'application/json',
        headers: {
          'apikey': apiKey + ''
        }
      });
  },

  _getUrlService: function(service, params) {
    if (!params.listRid)
      return false;

    if (!params.rootApiUrl)
      params.rootApiUrl = this._getDefaultRootApiUrl();

    if (!params.ApiVersion)
      params.ApiVersion = 'v1.0';

    if (!params.lang)
      params.lang = 'fr';

    if (!params.url) {

      if (service == 'ratings')
        params.rootApiUrl += '/ta';

      params.url = params.rootApiUrl + '/' + params.ApiVersion + '/' + service + '/' + params.listRid + '?lang=' + params.lang;
    }

    return params.url;
  },

  _getDefaultRootApiUrl: function() {
    return 'https://api.accorhotels.com';
  },

  _getKey: function(service) {
    if (service == 'ratings')
      return 'l7xx7801d7dc4e9245b38ba8da89e0b0ed54';

    return 'l7xx7ab373a758484ac48853ea1e7e2ccfc1';
  }
};

module.exports = apiMgmtHandler;

/* Component */
/*
var $ = global.jQuery3;
window.apiMgmtHandler = require('../../../all.site.com/services/apigmgmt/index');

window.apiMgmtHandler.callService('ratings', params).done(function(data) {
     _this.displayTripAdvisorRating(data, listRidID);
   });
*/


