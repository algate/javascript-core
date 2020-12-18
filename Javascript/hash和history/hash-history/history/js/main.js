class HistoryRoutes {
    constructor() {
        // 保存对应键和函数
        this.routes = {};

        // 监听popstate事件
        window.addEventListener('popstate', (e) => {
            const path = this.getState();
            this.routes[path] && this.routes[path]();
        });
    }
    // 获取路由路径
    getState() {
        const path = window.location.pathname;
        return path ? path : '/';
    }
    route(path, callback) {
        this.routes[path] = callback || function () { };
    }
    init(path) {
        history.replaceState(null, null, path);
        this.routes[path] && this.routes[path]();
    }
    go(path) {
        history.pushState(null, null, path);
        this.routes[path] && this.routes[path]();
    }
}

window.Router = new HistoryRoutes();
console.log(location.pathname);

/* 
    此处执行的时候，页面的颜色未初始化route为"/"时的颜色值，是因为页面还未加载完毕
    知道原因，大家可以自行解决这个问题
*/
Router.init(location.pathname);

const body = document.querySelector('body');

const changeColor = function (color) {
    body.style.backgroundColor = color;
};
// 注册函数
Router.route('/', () => {
    changeColor('red');
});
Router.route('/a', () => {
    changeColor('green');
});
Router.route('/b', () => {
    changeColor('#CDDC39');
});

const ul = document.querySelector('ul');
ul.addEventListener('click', e => {
    console.log(e.target);
    if (e.target.tagName === 'A') {
        e.preventDefault();
        Router.go(e.target.getAttribute('href'));
    }
});
