# hash 路由和 history 路由
1. hash 路由：监听 url 中 hash 的变化，然后渲染不同的内容，这种路由不向服务器发送请求，不需要服务端的支持；
2. history 路由：监听 url 中的路径变化，需要客户端和服务端共同的支持；

## 1. hash 路由
当页面中的 hash 发生变化时，会触发hashchange事件，因此我们可以监听这个事件，来判断路由是否发生了变化。

事件hashchange只会在 hash 发生变化时才能触发，而第一次进入到页面时并不会触发这个事件，因此我们还需要监听load事件。这里要注意的是，两个事件的 event 是不一样的：hashchange 事件中的 event 对象有 oldURL 和 newURL 两个属性，但 load 事件中的 event 没有这两个属性，不过我们可以通过 location.hash 来获取到当前的 hash 路由：
```javascript
class HashRouter {
    currentUrl = ''; // 当前的URL
    handlers = {};

    constructor() {
        this.refresh = this.refresh.bind(this);
        // DOMContentLoaded 或者 load
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }

    getHashPath(url) {
        const index = url.indexOf('#');
        if (index >= 0) {
            return url.slice(index + 1);
        }
        return '/';
    }
    refresh(event) {
        let curURL = '',
            oldURL = null;
        if (event.newURL) {
            oldURL = this.getHashPath(event.oldURL || '');
            curURL = this.getHashPath(event.newURL || '');
        } else {
            curURL = this.getHashPath(window.location.hash);
        }
        this.currentUrl = curURL;
        // 当hash路由发生变化时，则触发change事件
        this.emit('change', curURL, oldURL);
    }
    on(evName, listener) {
        this.handlers[evName] = listener;
    }
    emit(evName, ...args) {
        const handler = this.handlers[evName];
        if (handler) {
            handler(...args);
        }
    }
}
const router = new HashRouter();
router.on('change', (curUrl, lastUrl) => {
    console.log('当前的hash:', curUrl);
    console.log('上一个hash:', lastUrl);
});
```

## 2. history 路由
在 history 路由中，我们一定会使用window.history中的方法，常见的操作有：
back()：后退到上一个路由；
forward()：前进到下一个路由，如果有的话；
go(number)：进入到任意一个路由，正数为前进，负数为后退；
pushState(obj, title, url)：前进到指定的 URL，不刷新页面；
replaceState(obj, title, url)：用 url 替换当前的路由，不刷新页面;

可以直接history.操作调用上面的五个方法；

需要注意的是：当我们用 history 的路由时，必然要能监听到路由的变化才行。全局有个popstate事件，别看这个事件名称中有个 state 关键词，但pushState和replaceState被调用时，是不会触发 popstate 事件的，只有上面列举的前 3 个方法会触发。

针对这种情况，我们可以使用window.dispatchEvent添加事件：
```javascript
const listener = function (type) {
    var orig = history[type];
    return function () {
        var rv = orig.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};
window.history.pushState = listener('pushState');
window.history.replaceState = listener('replaceState');
// 然后就可以添加对这两个方法的监听了：
window.addEventListener('pushState', this.refresh, false);
window.addEventListener('replaceState', this.refresh, false);
```
调用这几种方式时，都会只是修改了当前页面的 URL，页面的内容没有任何的变化。但前 3 个方法只是路由历史记录的前进或者后退，无法跳转到指定的 URL；而pushState和replaceState可以跳转到指定的 URL。如果有面试官问起这个问题“如何仅修改页面的 URL，而不发送请求”，那么答案就是这 5 种方法。

如果服务端没有新更新的 url 时，一刷新浏览器（会调用history.replaceState）就会报错，因为刷新浏览器后，是真实地向服务器发送了一个 http 的网页请求。因此若要使用 history 路由，需要服务端的支持。

### 应用场景

pushState 和 replaceState 两个方法跟 location.href 和 location.replace 两个方法有什么区别呢？应用的场景有哪些呢？

1. location.href 和 location.replace 切换时要向服务器发送请求，而 pushState 和 replaceState 仅修改 url，除非主动发起请求;
  **（比如刷新页面调用的是history的replaceState）**
  **（点击页面的路径跳转非hash调用的是pushState）**
2. 仅切换 url 而不发送请求的特性，可以在前端渲染中使用，例如首页是服务端渲染，二级页面采用前端渲染；
3. 可以添加路由切换的动画；
4. 在浏览器中使用类似抖音的这种场景时，用户滑动切换视频时，可以静默修改对应的 URL，当用户刷新页面时，还能停留在当前视频。

```javascript
class HistoryRouter {
    currentUrl = '';
    handlers = {};

    constructor() {
        this.refresh = this.refresh.bind(this);
        this.addStateListener();
        // DOMContentLoaded 或者 load
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('popstate', this.refresh, false);
        window.addEventListener('pushState', this.refresh, false);
        window.addEventListener('replaceState', this.refresh, false);
    }
    addStateListener() {
        const listener = function (type) {
            var orig = history[type];
            return function () {
                var rv = orig.apply(this, arguments);
                var e = new Event(type);
                e.arguments = arguments;
                window.dispatchEvent(e);
                return rv;
            };
        };
        window.history.pushState = listener('pushState');
        window.history.replaceState = listener('replaceState');
    }
    refresh(event) {
        this.currentUrl = location.pathname;
        this.emit('change', location.pathname);
        document.querySelector('#app span').innerHTML = location.pathname;
    }
    on(evName, listener) {
        this.handlers[evName] = listener;
    }
    emit(evName, ...args) {
        const handler = this.handlers[evName];
        if (handler) {
            handler(...args);
        }
    }
}
const router = new HistoryRouter();
router.on('change', function (curUrl) {
    console.log(curUrl);
});
```