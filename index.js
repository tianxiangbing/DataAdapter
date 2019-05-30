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
 * npm install json-array-adapter --save
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
        function DataAdapter() {
            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

            _classCallCheck(this, DataAdapter);

            if (!obj) obj = {};
            this.isArr = obj.constructor === Array;
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
                    return this._getArrayValue(this.data, expression);
                }
            }
        }, {
            key: "_getArrayValue",
            value: function _getArrayValue(data, expression) {
                var results = [];
                var and = expression.split('&&');
                var or = expression.split('||');
                data.forEach(function (item) {
                    if (and.length) {
                        var isAllEq = true;
                        and.forEach(function (a) {
                            var e = a.split('=');
                            if (item[e[0]] != e[1]) {
                                isAllEq = false;
                            }
                        });
                        if (isAllEq) {
                            results.push(item);
                        }
                    }
                    if (or.length && or.length > 1) {
                        var isOneEq = false;
                        or.forEach(function (a) {
                            var e = a.split('=');
                            if (item[e[0]] == e[1]) {
                                isOneEq = true;
                            }
                        });
                        if (isOneEq) {
                            results.push(item);
                        }
                    }
                });
                return results;
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
            //合并树状上的属性值，树与扁平结构的合并。

        }, {
            key: "assign",
            value: function assign() {
                var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var expression = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

                var arr = expression.split('.');
                for (var k in this.data) {
                    if (target.hasOwnProperty(k)) {
                        this.data[k] = target[k];
                    }
                }
                this._assign(this.data, target, arr);
                return this.data;
            }
        }, {
            key: "_assign",
            value: function _assign(json, target, arr) {
                var key = arr.shift();
                if ((typeof json === "undefined" ? "undefined" : _typeof(json)) !== 'object' || !json.hasOwnProperty(key)) return false;
                var obj = json[key];
                for (var k in obj) {
                    if (target.hasOwnProperty(k)) {
                        obj[k] = target[k];
                    }
                }
                if (arr.length == 0) {
                    return false;
                } else {
                    return this._assign(json[key], target, arr);
                }
            }
        }]);

        return DataAdapter;
    }();

    DataAdapter.source = function () {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        if (!obj) obj = {};
        return new DataAdapter(obj, defaultValue);
    };
    return DataAdapter;
});