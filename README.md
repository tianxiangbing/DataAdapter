# DataAdapter
javascript DataAdapter
# Npm
    npm install json-array-adapter --save

# Use
```js
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
console.log(data.get("a"))//{ b: { c: 1, f: 6 }, e: 5 }
console.log(data.get("a.b"))//{ c: 1, f: 6 }
console.log(data.get('b.a'))//kong
console.log(data.get('a.b.f'))//6
console.log(data.get('a.b.f.g'))//kong
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
console.log(v2);//[ { a: 1, b: 2, c: 2 } ]

let v3 = DataAdapter.source({
    a: {
        b: {
            c: 1,
            f: 6,
            g:[{
                h:7
            }]
        },
        e: 5
    },
    d: 4
});
v3.assign({c:2,e:3,d:5,h:8},'a.b.g.0')
console.log(JSON.stringify( v3.data))//{"a":{"b":{"c":2,"f":6,"g":[{"h":8}]},"e":3},"d":5}
//深合并
console.log('******************************************')
let res = v3.merge({
    a: {
        b: {
            c: 4
        },
        e: 4
    },
    d:11
})
console.log(JSON.stringify(res))//{"a":{"b":{"c":4,"f":6,"g":[{"h":8,"i":[{"j":2}]}]},"e":4},"d":11}
let res2 = v3.merge({
    a: {
        b: {
            c: 4
        },
        e: 4
    },
    d:11
},false)
console.log(JSON.stringify(res2))//{"a":{"b":{"c":4},"e":4},"d":11}
```