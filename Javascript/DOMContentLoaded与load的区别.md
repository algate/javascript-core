# DOMContentLoaded与load的区别

1. 在chrome浏览器的开发过程中，我们会看到network面板中有这两个数值，分别对应网 络请求上的标志线，这两个时间数值分别代表什么？
2. 我们一再强调将css放在头部，将js文件放在尾部，这样有利于优化页面的性能，为什么这种方式能够优化性能？
3. 在用jquery的时候，我们一般都会将函数调用写在ready方法内，这是什么原理？

## DOMContentLoaded: 
从页面空白到展示出页面内容，会触发DOMContentLoaded事件。
DOMContentLoaded 的触发不需要等待图片等其他资源加载完成。
这里我们可以明确DOMContentLoaded所计算的时间，当文档中没有脚本时，浏览器解析完文档便能触发 DOMContentLoaded 事件；

## load: 
页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件，简单来说，页面的load事件会在DOMContentLoaded被触发之后才触发。

```javascript
$(document).ready(function() { // ...代码... }); 
// 其实监听的就是 DOMContentLoaded 事件；
$(document).load(function() { // ...代码... }); 
// 监听的是 load 事件。
```

### 1、onload事件
<br>
onload事件所有的浏览器都支持，所以我们不需要什么兼容，只要通过调用
```javascript
window.onload = function(){}
```

### 2、DOMContentLoaded 事件
DOMContentLoaded不同的浏览器对其支持不同，所以在实现的时候我们需要做不同浏览器的兼容。

* 支持DOMContentLoaded事件的，就使用DOMContentLoaded事件；
* IE6、IE7不支持DOMContentLoaded，但它支持onreadystatechange事件，该事件的目的是提供与文档或元素的加载状态有关的信息。
*  更低的ie还有个特有的方法doScroll， 通过间隔调用：document.documentElement.doScroll("left");

>  可以检测DOM是否加载完成。 当页面未加载完成时，该方法会报错，直到doScroll不再报错时，就代表DOM加载完成了。该方法更接近DOMContentLoaded的实现。

```javascript
function ready(fn){
    if(document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            document.removeEventListener('DOMContentLoaded',arguments.callee, false);
            fn();
        }, false);
    } 

    // 如果IE
    else if(document.attachEvent) {
        // 确保当页面是在iframe中加载时，事件依旧会被安全触发
        document.attachEvent('onreadystatechange', function() {
            if(document.readyState == 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee);
                fn();
            }
        });

        // 如果是IE且页面不在iframe中时，轮询调用doScroll 方法检测DOM是否加载完毕
        if(document.documentElement.doScroll && typeof window.frameElement === "undefined") {
            try{
                document.documentElement.doScroll('left');
            }
            catch(error){
                return setTimeout(arguments.callee, 20);
            };
            fn();
        }
    }
};
ready(function(){
    console.log(1);
});
```