### currentColor

>使其保持和当前元素color属性的值一致;

### filter

>这个强大的东西有很多样式可以设置(还可以添加SVG文件，强大到你无法想象)

### sticky

>定位relative和固定定位fixed的结合
它主要用在对scroll事件的监听上；简单来说，在滑动过程中，某个元素距离其父元素的距离达到sticky粘性定位的要求时(比如top：100px)；position:sticky这时的效果相当于fixed定位，固定到适当位置。

### -- （为啥是两个横线呢）
>CSS的自定义属性：（带有前缀--的属性名，比如--example--name，表示的是带有值的自定义属性，其可以通过 var 函数在全文档范围内复用的）

($value中的$是sass使用，@value中的@是less使用)
```css
:root{
  --theme-color:#f45fef;
}
a{
  /* var函数可以有第二个参数，表示变量的默认值，如果变量不存在，就会使用默认值 */
  color: var(--theme-color, #7F583F);
}
/* 或者 */
a {
  color: #7F583F;
  color: var(--theme-color);
}
```