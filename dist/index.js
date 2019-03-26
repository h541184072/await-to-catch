"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AwaitToJs = /** @class */ (function () {
    function AwaitToJs(options) {
        this.defaultOptions = options;
        this.to = this.to.bind(this);
    }
    AwaitToJs.prototype.to = function (promise, options) {
        var _this = this;
        return promise
            .catch(function (err) {
            var apiUrl = options.apiUrl;
            var _a = _this.defaultOptions, catchServiceError = _a.catchServiceError, messageUi = _a.messageUi;
            var params = {
                apiUrl: apiUrl,
                err: JSON.stringify(err),
                url: location.href,
            };
            err && messageUi.error(err.message || err);
            catchServiceError(params);
            return null;
        });
    };
    return AwaitToJs;
}());
exports.default = AwaitToJs;
