let DataAdapter = require('../src/index');
let data = new DataAdapter({
    a: {
        b: {
            c: 1,
            f: 6
        },
        e: 5
    },
    d: 4
}, 'kong');
console.log(data.get("a"))
console.log(data.get("a.b"))
console.log(data.get('b.a'))
console.log(data.get('a.b.f'))
console.log(data.get('a.b.f.g'))
let v1 = DataAdapter.source({
    a: {
        b: {
            c: 1,
            f: 6
        },
        e: 5
    },
    d: 4
}, 'kong').get('a');

let v2 = DataAdapter.source([{a:1,b:1,c:1},{a:1,b:2,c:2}]).get('a=1&&b=2');
console.log(v2);
// console.log(v1)
// Object {b: Object, e: 5}
// index.js:12
// Object {c: 1, f: 6}
// index.js:13
// kong
// index.js:14
// 6
// index.js:15
// kong
// index.js:16
// Object {b: Object, e: 5}