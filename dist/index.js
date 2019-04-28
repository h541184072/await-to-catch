"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var AwaitToJs = /** @class */ (function () {
    function AwaitToJs(options) {
        this.defaultOptions = options;
        this.to = this.to.bind(this);
    }
    AwaitToJs.prototype.to = function (promise, options) {
        var _this = this;
        return promise.catch(function (err) {
            var _a = _this.defaultOptions, catchServiceError = _a.catchServiceError, messageUi = _a.messageUi;
            var params = __assign({}, options, { err: JSON.stringify(err), url: location.href });
            err && messageUi.error(err.message || err);
            catchServiceError(params);
            return undefined;
        });
    };
    return AwaitToJs;
}());
exports.default = AwaitToJs;
