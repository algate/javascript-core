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
console.log(driver.next());
console.log(driver.next());
console.log(driver.next());
console.log(driver.next());
```