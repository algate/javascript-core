## 1.------ 求幂运算
```
var n = 2\*\*3; // Math.pow(2, n); 或者 2<<(n-1)
```

## 2.------ float -> integer
```
var int = 23.9 | 0;
```

## 3.------ 格式化 JSON 格式
我们可能在处理一些 JSON 相关的处理时很多时候都会使用到 JSON.stringify，但是你是否意识到它可以帮助缩进 JSON 呢？

-   stringify()方法接受两个可选参数:一个 replacer 函数和一个 space 值，
-   1. replacer 函数可以用来过滤显示的 JSON:
-   1.1 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
-   1.2 如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；(嵌套的对象型数据要展示要把属性名放到数组中)
-   1.3 如果该参数为 null 或者未提供，则对象所有的属性都会被序列化;
-   2. space 值接受一个整数，表示需要的空格数或一个字符串替换空格(1-10||' '|| null)

```javascript
let json = {
    alpha: "A",
    name: { code: "json", id: 1 },
    beta: "B",
    nodes: [{ id: 1 }, { id: 2 }],
};
// 对象数据类型 要展示的属性 - 一并挨着罗列到数组中才会显示，否是显示为[{}]/{};
let json2 = JSON.stringify(json, ["code", "nodes", "id"], 4);
console.log(JSON.stringify(json, null, 4));
console.info(json2);
```

## 4.------ 数字格式化为数组

```javascript
a1 = new Array(5); // new Array(5) 生成的数组是从来没有被赋过值的 - item不存在
// a2 - item
// a2 = a1.map(item => ({name: 'a2'}));
// console.info(a1);
// console.table(a2);
b1 = new Array(5).fill();
// b2 - object数组；b3 - string数组
b2 = b1.map((item) => ({ name: "b2" })); // ==> new Array(5).fill({]})
b3 = b1.map((item) => ""); // ==> new Array(5).fill('')
// console.info(b1);
console.info(b2);
console.info(b3);
```

## 5.------ URLSearchParams
假设浏览器的url参数是 “?name=蜘蛛侠&age=16”：
```javascript
new URLSearchParams(location.search).get("name"); // 蜘蛛侠
```
new URLSearchParams() 的用法与 new URL().searchParams相同
> 需要注意的一点是: ?如果放在url数据hash#的后边,例如
> #href?name=蜘蛛侠&age=16
> location.search获取的结果为" "空字符串;用URLSearchParams也就得不到想要的结果了;


## 6.------ 禁用a
```html
<a href="javascript:;" id="a" style="pointer-events:none;">禁用(是否alert)</a>
```