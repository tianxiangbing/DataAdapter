"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Created with Visual Studio Code.
 * github: https://github.com/tianxiangbing/DataAdapter
 * User: 田想兵
 * Date: 2018-01-18
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 * desc: 对json数据的数据驱动
 * 请使用https://github.com/tianxiangbing/DataAdapter 上的代码
 * npm install jsdata-adapter --save
 */
(function (definition) {
    // 
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
        module.exports = definition();
        // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);
    } else {
        DataAdapter = definition();
    }
})(function () {
    "use strict";

    var DataAdapter = function () {
        function DataAdapter(obj) {
            var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

            _classCallCheck(this, DataAdapter);

            this.isArr = typeof obj === 'Array';
            this.defaultValue = defaultValue;
            this.data = obj;
        }

        _createClass(DataAdapter, [{
            key: "get",
            value: function get(expression) {
                if (!this.isArr) {
                    var arr = expression.split('.');
                    return this._getJsonValue(this.data, arr);
                } else {
                    //数组查询
                }
            }
        }, {
            key: "_getJsonValue",
            value: function _getJsonValue(json, arr) {
                var key = arr.shift();
                if ((typeof json === "undefined" ? "undefined" : _typeof(json)) !== 'object' || !json.hasOwnProperty(key)) {
                    return this.defaultValue;
                }
                var val = json[key];
                if (arr.length == 0) {
                    return val;
                } else {
                    return this._getJsonValue(val, arr);
                }
            }
        }]);

        return DataAdapter;
    }();

    DataAdapter.source = function (obj) {
        var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        return new DataAdapter(obj, defaultValue);
    };
    return DataAdapter;
});