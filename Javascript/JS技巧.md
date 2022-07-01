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
b2 = b1.map((item) => ({ name: "b2" })); // ==> new Array(5).fill({})
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

## 7.------ 取值
```javascript
/*
 * || 取值 0, '', null, undefined
 * ?? 取值 null，undefined
 */
console.log(0 || 'not value');
console.log(0 ?? 'not null or undefined');
console.log('' || 'not value');
console.log('' ?? 'not null or undefined');
```

## 8.------ 可选链
```javascript
    obj = {
        name: "core",
        content: {
            title: "JSJQ",
            data: [
                {
                    id: Math.ceil(Math.random() * 10000),
                    name: "darwin",
                },
            ],
        },
    };
    console.log(obj?.name || "not value");
    console.log(obj?.content?.data[0]?.name || "not value");
    console.log(obj?.content?.data?.[0]?.name || "not value");
    console.log(obj.constructor());
```
## 9.------ 类型检查小工具
```javascript
    const isOfType = (() => {
        // create a plain object with no prototype
        const type = Object.create(null);

        // check for null type
        type.null = (x) => x === null;
        // check for undefined type
        type.undefined = (x) => x === undefined;
        // check for nil type. Either null or undefined
        type.nil = (x) => type.null(x) || type.undefined(x);
        // check for strings and string literal type. e.g: 's', "s", `str`, new String()
        type.string = (x) =>
            !type.nil(x) && (typeof x === "string" || x instanceof String);
        // check for number or number literal type. e.g: 12, 30.5, new Number()
        type.number = (x) =>
            !type.nil(x) && // NaN & Infinity have typeof "number" and this excludes that
            ((!isNaN(x) && isFinite(x) && typeof x === "number") ||
                x instanceof Number);
        // check for boolean or boolean literal type. e.g: true, false, new Boolean()
        type.boolean = (x) =>
            !type.nil(x) && (typeof x === "boolean" || x instanceof Boolean);
        // check for array type
        type.array = (x) => !type.nil(x) && Array.isArray(x);
        // check for object or object literal type. e.g: {}, new Object(), Object.create(null)
        type.object = (x) => ({}.toString.call(x) === "[object Object]");
        // check for provided type instance
        type.type = (x, X) => !type.nil(x) && x instanceof X;
        // check for set type
        type.set = (x) => type.type(x, Set);
        // check for map type
        type.map = (x) => type.type(x, Map);
        // check for date type
        type.date = (x) => type.type(x, Date);
        return type;
    })();
    console.log(isOfType.nil(null));
```

## 10.------ 顺序执行 promise
```javascript
    const asyncSequentializer = (() => {
        const toPromise = (x) => {
            if (x instanceof Promise) {
                // if promise just return it
                return x;
            }
            if (typeof x === "function") {
                // if function is not async this will turn its result into a promise
                // if it is async this will await for the result
                return (async () => await x())();
            }
            return Promise.resolve(x);
        };
        return (list) => {
            const results = [];
            return (
                list
                    .reduce((lastPromise, currentPromise) => {
                        return lastPromise.then((res) => {
                            results.push(res); // collect the results
                            return toPromise(currentPromise);
                        });
                    }, toPromise(list.shift()))
                    // collect the final result and return the array of results as resolved promise
                    .then((res) => Promise.resolve([...results, res]))
            );
        };
    })();
```

## 11.------ 条件对象键
```javascript
    let condition = true;
    man = {
        name: "manoeasy",
        ...(condition === true ? { title: "manoeasy" } : {}),
    };
    console.log(man);
```

## 12.------ 深度克隆对象
```javascript
    const deepClone = (obj) => {
        let clone = obj;
        if (obj && typeof obj === "object") {
            clone = new obj.constructor();
            Object.getOwnPropertyNames(obj).forEach(
                (prop) => (clone[prop] = deepClone(obj[prop]))
            );
        }
        return clone;
    };
```

## 13.------ input的浏览器自动填充行为
```javascript
<input type="text" autocomplete="off"/>

// 这样就好使了，别逗了，兄嘚！elementUI表单组件会教你好好做人，到浏览器里自己试试！！！
// autocomplete 除了 `on、off` 属性值外，
// 还有 `name、email、username、new-password、current-password、street-address` 等值
```
简单说明下：
+ name和username会自动填充浏览器存储的用户名信息
+ email会自动填充浏览器存储的邮箱后缀的信息
+ street-address会自动填充浏览器存储的地址类信息
- **current-password和new-password倒是不会自动填充浏览器保存的信息**

so，方法就是设置autocomplete属性值为current-password和new-password即可解决

既然这样，那我给它设置个“text”不是更方便。so，大家可以去试试，完美。

## 14.------- 获取数组的最后一项的值
```js
Array.prototype.at(-1)
```
at() 方法接收一个整数值并返回该索引的项目，允许正数和负数。负整数从数组中的最后一个项目开始倒数。

>方括号符号没有问题。例如，array[0]将返回第一个项目。然而，对于后面的项目，不要使用array.length，例如，对于最后一个项目，可以调用array.at(-1)。