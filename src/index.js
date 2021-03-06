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
        constructor(obj = {}, defaultValue = "") {
            if (!obj) obj = {};
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
                if (or.length && or.length > 1) {
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
            if (json === null || typeof json === 'undefeined' || typeof json !== 'object' || !json.hasOwnProperty(key)) {
                return this.defaultValue;
            }else{
                let val = json[key];
                if (arr.length == 0) {
                    return val;
                } else {
                    return this._getJsonValue(val, arr);
                }
            }
        }
        //合并树状上的属性值，树与扁平结构的合并。
        assign(target = {}, expression = '') {
            let arr = expression.split('.');
            for (var k in this.data) {
                if (target.hasOwnProperty(k)) {
                    this.data[k] = target[k];
                }
            }
            this._assign(this.data, target, arr);
            return this.data;
        }
        /**
         * 树与树的合并
         * isDeep,是否深层合并，以左侧数据结构为基础。
         * changeOriginal是否对原数据直接修改
         *  */
        merge(target, changeOriginal = true, isDeep = true) {
            if (isDeep) {
                return this._merge(this.data, target, changeOriginal);
            } else {
                if (changeOriginal) {
                    return Object.assign(this.data, target);
                } else {
                    return Object.assign({}, this.data, target);
                }
            }
        }
        _merge(source, target, changeOriginal) {
            let newData = {};
            if (changeOriginal) {
                newData = source;
            }
            for (var k in source) {
                if (target.hasOwnProperty(k)) {
                    if (typeof source[k] === 'object') {
                        newData[k] = this._merge(source[k], target[k], changeOriginal)
                    } else {
                        newData[k] = target[k];
                    }
                } else {
                    newData[k] = source[k];
                }
            }
            return newData;
        }
        _assign(json, target, arr) {
            let key = arr.shift();
            if (json === null || typeof json === 'undefeined' || typeof json !== 'object' || !json.hasOwnProperty(key)) {
                return false;
            } else {
                let obj = json[key];
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
        }
    }
    DataAdapter.source = (obj = {}, defaultValue = "") => {
        if (!obj) obj = {};
        return new DataAdapter(obj, defaultValue);
    }
    return DataAdapter;
});