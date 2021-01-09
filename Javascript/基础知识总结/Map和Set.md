# Set-是一组key的集合
由于key不能重复，所以，在Set中，没有重复的key
要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set：
```javascript
var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
```
>重复元素在Set中自动被过滤：

1. Set 结构的实例有以下属性:
Set.prototype.constructor：构造函数，默认就是Set函数。
Set.prototype.size：返回Set实例的成员总数。
2. Set四个操作方法:
add(value)：添加某个值，返回 Set 结构本身。
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
has(value)：返回一个布尔值，表示该值是否为Set的成员。
clear()：清除所有成员，没有返回值。

# Map-是一组键值对的结构，具有极快的查找速度。
```javascript
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.get('Michael'); // 95
```
初始化Map需要一个二维数组，或者直接初始化一个空Map,Map具有以下方法：
```javascript
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
```
>一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：