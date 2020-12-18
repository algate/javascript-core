# box-reflect：包括3个值。
1. direction 定义方向，取值包括 above 、 below 、 left 、 right。
  **above：**
  指定倒影在对象的上边
  **below：**
  指定倒影在对象的下边
  **left：**
  指定倒影在对象的左边
  **right：**
  指定倒影在对象的右边

2. offset定义反射偏移的距离，取值包括数值或百分比，其中百分比根据对象的尺寸进行确定。默认为0。

3. mask-box-image定义遮罩图像，该图像将覆盖投影区域。如果省略该参数值，则默认为无遮罩图像。
取值：
none：无遮罩图像：
使用绝对或相对地址指定遮罩图像。
使用线性渐变创建遮罩图像。
使用径向(放射性)渐变创建遮罩图像。
使用重复的线性渐变创建背遮罩像。
使用重复的径向(放射性)渐变创建遮罩图像。
说明：
设置或检索对象倒影。
对应的脚本特性为boxReflect。
```css
-webkit-box-reflect:below 10px -webkit-linear-gradient(transparent,transparent 50%,rgba(0,0,0,.8));
/* img */
img {
    -webkit-box-reflect:below 10px -webkit-linear-gradient(transparent 20%,rgba(0,0,0,.8));
}
```