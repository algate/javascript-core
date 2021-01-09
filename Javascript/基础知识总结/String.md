## charAt(m)
获取执行索引位置的字符

## slice(m, n)
索引m取到索引n处，**$\color{#f80}{不包含n}$**

## substring(m, n)
索引m取到索引n处，**$\color{#f80}{不包含n}$**

## substr(m, n)]
从索引n开始取m个字符,

## split()
分隔成数组

## replace(n,m)
>将n替换成m
	普通写法:每一个.replace只能替换一次
	正则写法:.replace(/[n]/g,"");

```javascript
// replace 高级用法详解
str.replace(reg,function(ar0,ar1,ar2){
    // 第一个参数是总正则表达式匹配到的结果
    // 第二个参数是第一个子正则()匹配到的结果
    // 第三个参数为第二个子正则()匹配到的结果
    // ……
    // 倒数第二个参数是总正则表达式在原字符串种匹配到的索引位置
    // 原来的字符串str
    return ar1+ar2.replace(/\d{3}/g,function(rs){
        return ","+rs;
    });
})
```
## toLowerCase()
转换小写
## toUpperCase()
转换大写

支持正则表达式的String对象的方法: **search()、replace()、split()、match()**