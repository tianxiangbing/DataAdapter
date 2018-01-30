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
    if (typeof exports === "object") {
        module.exports = definition();
        // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);
    } else {
        DataAdapter = definition();
    }
})(function () {
    "use strict";
    class DataAdapter {
        constructor(obj, defaultValue = "") {
            this.isArr = obj.constructor === Array;
            this.defaultValue = defaultValue;
            this.data = obj;
        }

        get(expression) {
            if (!this.isArr) {
                let arr = expression.split('.');
                return this._getJsonValue(this.data, arr);
            } else {
                //数组查询
                return this._getArrayValue(this.data, expression);
            }
        }
        _getArrayValue(data, expression) {
            let results = [];
            let and = expression.split('&&');
            let or = expression.split('||');
            data.forEach(item => {
                if (and.length) {
                    let isAllEq = true;
                    and.forEach(a => {
                        let e = a.split('=');
                        if (item[e[0]] != e[1]) {
                            isAllEq = false;
                        }
                    });
                    if (isAllEq) {
                        results.push(item)
                    }
                } 
                if (or.length&&or.length>1) {
                    let isOneEq = false;
                    or.forEach(a => {
                        let e = a.split('=');
                        if (item[e[0]] == e[1]) {
                            isOneEq = true;
                        }
                    })
                    if (isOneEq) {
                        results.push(item);
                    }
                }
            })
            return results;
        }
        _getJsonValue(json, arr) {
            let key = arr.shift();
            if (typeof json !== 'object' || !json.hasOwnProperty(key)) {
                return this.defaultValue;
            }
            let val = json[key];
            if (arr.length == 0) {
                return val;
            } else {
                return this._getJsonValue(val, arr);
            }
        }
    }
    DataAdapter.source = (obj, defaultValue = "") => {
        return new DataAdapter(obj, defaultValue);
    }
    return DataAdapter;
});