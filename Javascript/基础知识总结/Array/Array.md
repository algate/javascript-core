## concat([])
数组拼接在一起 
参数：数组
返回值：[] - 返回拼接后数组
> $\color{#F30}{原数组不变}$

## push()
向数组末尾添加元素
参数：添加的元素
返回值：length **新数组的长度**

## unshift()
向数组开头添加元素
参数：添加的元素
返回值：length **新数组的长度**

## shift()
删除数组首位元素
参数：无
返回值：**删除的元素**

## pop()
删除数组末尾元素
返回值：**删除的元素**

## slice(m, n)
索引取到索引
参数：两个索引值（没有第二参数，取到末尾）
返回值：$\color{#2dab00}{[]}$ - 新数组
> $\color{#F30}{原数组不变}$

## splice(m, n，x)
索引m处删除n个元素，添加x内容
返回值：[] - 删除的数组

## join()
将数组元素用分隔符链接起来，变成字符串
返回值：字符串
> $\color{#F30}{原数组不变}$

## reverse()

## indexOf()
传入元素，返回索引，否则-1

## Array.prototype.lastIndexOf()

## includes()
传入元素，返回true/false

## Array.prototype.at()
at() 方法接收一个整数值并返回该索引的项目，允许正数和负数。负整数从数组中的最后一个项目开始倒数。

方括号符号没有问题。例如，array[0]将返回第一个项目。然而，对于后面的项目，不要使用array.length，例如，对于最后一个项目，可以调用array.at(-1)。
```js
// Our array with items
const cart = ['apple', 'banana', 'pear'];

// A function which returns the last item of a given array
function returnLast(arr) {
  return arr.at(-1);
}

// Get the last item of our array 'cart'
const item1 = returnLast(cart);
console.log(item1); // Logs: 'pear'

// Add an item to our 'cart' array
cart.push('orange');
const item2 = returnLast(cart);
console.log(item2); // Logs: 'orange'
```

## Array.prototype.entries()
```js
const array1 = ['a', 'b', 'c'];
const iterator1 = array1.entries();
console.log(iterator1.next().value);
// expected output: Array [0, "a"]
console.log(iterator1.next().value);
// expected output: Array [1, "b"]

var a = ['a', 'b', 'c'];
var iterator = a.entries();
for (let e of iterator) {
  console.log(e);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

## Array.prototype.keys()
```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key);
}

// expected output: 0
// expected output: 1
// expected output: 2
```

## Array.prototype.values()
```js
const arr = ['a', 'b', 'c', 'd', 'e'];
const iterator = arr.values();
iterator.next();               // Object { value: "a", done: false }
iterator.next().value;         // "b"
iterator.next()["value"];      // "c"
iterator.next();               // Object { value: "d", done: false }
iterator.next();               // Object { value: "e", done: false }
iterator.next();               // Object { value: undefined, done: true }
iterator.next().value;         // undefined 

const arr = ['a', 'b', 'c', 'd', 'e'];
const iterator = arr.values();
for (let letter of iterator) {
 console.log(letter);
} //"a" "b" "c" "d" "e"
for (let letter of iterator) {
console.log(letter);
} // undefined
```

## Array.prototype.flat()
flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```js
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// expected output: [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];

console.log(arr2.flat(2));
// expected output: [0, 1, 2, [3, 4]]

```

## Array.from()
Array.from() 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
```js
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]

```

## Array.isArray()

## Array.of()


参数为方法：
## find()： 
$\color{#F00}{参数为function}$
传入一个函数，满足条件，返回元素，否则为undefined

## findIndex()：
$\color{#F00}{参数为function}$
传入一个函数，满足条件， 返回索引，否则为-1
## Array.prototype.every(Fn)
every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

## Array.prototype.fill()
fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

## Array.prototype.filter()
filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

## Array.prototype.forEach()
forEach() 方法对数组的每个元素执行一次给定的函数。

## Array.prototype.map()

## Array.prototype.some()
```js
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```