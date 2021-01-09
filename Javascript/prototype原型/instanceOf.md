## 先看点东西
`Object instanceOf Function`;
`Fucntion instanceOf Function`;
`Fucntion instanceOf Object`;
**instanceOf:** 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```javascript
// 实现一个 instanceOf
// instanceOf 的内部机制是通过判断对象的原型链中是不是能找到该类型的 prototype
function instanceOf(left, right) {
    let proto = left.__proto__; // 实例的__proto__指向 构造函数原型prototype
    let prototype = right.prototype; 
    while (true) {
        if (proto === null) return false;
        if (proto === prototype) return true;
        proto = proto.__proto__;
    }
}
```

理解几个概念
1. 对象的原型链是沿着__proto__这条线走的，所有的对象的原型链都会找到Object.prototype，所以instanceOf本质找的就是对象的__proto__属性，直到找不到__proto__属性结束为止；

2. arr = new Array();
Array就是一个构造该函数，Array的prototype上有constructor属性指向Array，Array也是一个对象，对象有__proto__, 指向构造函数的原型，Array.__proto__指向Function.prototype; Array.prototype是个对象，有__proto__属性指向构造函数Object.prototype;根据特例Object.prototype.__proto__指向null。所以所有对象的原型链最终能指向的都是Object.prototype; 再往下找__proto__找到的就是null.prototype; null啥都没有，没有prototype属性，放弃吧！
