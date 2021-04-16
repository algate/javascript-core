# Generator函数
Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

```javascript
function* helloDriver() {
    yield 'hello';
    yield 'Driver';
    return 'good!';
}
let driver = helloDriver();

console.log(typeof helloDriver);
// console.log(JSON.stringify(driver.next(), null, 4));
console.log(driver.next());     // {value: "hello", done: false}
console.log(driver.next());     // {value: "Driver", done: false}
console.log(driver.next());     // {value: "good!", done: true}
console.log(driver.next());     // {value: undefined, done: true}
```

>加上 * 的函数执行后拥有了 next 函数，也就是说函数执行后返回了一个对象。每次调用 next 函数可以继续执行被暂停的代码。

以下是 Generator 函数的简单实现

```javascript
// cb 也就是编译过的 test 函数
function generator(cb) {
    return (function() {
        var object = {
            next: 0,
            stop: function() {}
        };

        return {
            next: function() {
                var ret = cb(object);
                if (ret === undefined) return { value: undefined, done: true };
                return {
                    value: ret,
                    done: false
                };
            }
        };
    })();
}
// 如果你使用 babel 编译后可以发现 test 函数变成了这样
function test() {
    var a;
    return generator(function(_context) {
        while (1) {
            switch ((_context.prev = _context.next)) {
                // 可以发现通过 yield 将代码分割成几块
                // 每次执行 next 函数就执行一块代码
                // 并且表明下次需要执行哪块代码
                case 0:
                    a = 1 + 2;
                    _context.next = 4;
                    return 2;
                case 4:
                    _context.next = 6;
                    return 3;
                // 执行完毕
                case 6:
                    case "end":
                    return _context.stop();
            }
        }
    });
}
```