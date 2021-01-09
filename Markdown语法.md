## 段落
末尾两个空格加换行

## 标题
> 不用#表示的标题：
```markdown
我展示的是一级标题
=================

我展示的是二级标题
-----------------
```
我展示的是一级标题
=================

我展示的是二级标题
-----------------

## 给文字添加颜色
$\color{#FF0000}{红}$ $\color{#FF7D00}{橙}$ $\color{#fff03d}{黄}$ $\color{#00FF00}{绿}$  $\color{#0000FF}{蓝}$ $\color{#00FFFF}{靛}$ $\color{#FF00FF}{紫}$

$\color{#FF0000}{红-f00}$ 
$\color{#ff8038}{橙-ff8038}$ 
$\color{#fff03d}{黄-ff0}$ 
$\color{#2dab00}{绿-2dab00}$  
$\color{#0000FF}{蓝-00f}$ 
$\color{#2dabff}{靛-2dabff}$ 
$\color{#FF00FF}{紫=f0f}$
>如果语句里有_，需要\来进行转义

## 标签
使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑
Markdown<sup>注释</sup><sub>下标</sub>
Markdown

## 表格
|  表头   | 表头  |  表头  |
|  ----  | ----  | ----  |
| 单元格  | 单元格 |  单元格 |
| 单元格  | 单元格 |  单元格 |

## 分割线
---
***

## 删除线
~~删除~~

## 下划线
<u>下划线</u>

## 脚注
Markdown[^FOOTER]
[^FOOTER]:不常用的展示

## 流程图
1. 横向流程图源码格式：
```mermaid
graph LR
A[方形] -->B(圆角)
    B --> C{条件a}
    C -->|a=1| D[结果1]
    C -->|a=2| E[结果2]
    F[横向流程图]
```
2. 竖向流程图源码格式：
```mermaid
graph TD
A[方形] --> B(圆角)
    B --> C{条件a}
    C --> |a=1| D[结果1]
    C --> |a=2| E[结果2]
    F[竖向流程图]
```
3. 标准流程图源码格式：

```flow
st=>start: 开始框
op=>operation: 处理框
cond=>condition: 判断框(是或否?)
sub1=>subroutine: 子流程
io=>inputoutput: 输入输出框
e=>end: 结束框
st->op->cond
cond(yes)->io->e
cond(no)->sub1(right)->op
```
4. 标准流程图源码格式（横向）：

```flow
st=>start: 开始框
op=>operation: 处理框
cond=>condition: 判断框(是或否?)
sub1=>subroutine: 子流程
io=>inputoutput: 输入输出框
e=>end: 结束框
st(right)->op(right)->cond
cond(yes)->io(bottom)->e
cond(no)->sub1(right)->op
```
5. UML时序图源码样例：

```sequence
对象A->对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B-->对象A: 我很好(响应)
对象A->对象B: 你真的好吗？
```
6. UML时序图源码复杂样例：

```sequence
Title: 标题：复杂使用
对象A->对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B-->对象A: 我很好(响应)
对象B->小三: 你好吗
小三-->>对象A: 对象B找我了
对象A->对象B: 你真的好吗？
Note over 小三,对象B: 我们是朋友
participant C
Note right of C: 没人陪我玩
```
7. UML标准时序图样例：

```mermaid
%% 时序图例子,-> 直线，-->虚线，->>实线箭头
  sequenceDiagram
    participant 张三
    participant 李四
    张三->王五: 王五你好吗？
    loop 健康检查
        王五->王五: 与疾病战斗
    end
    Note right of 王五: 合理 食物 <br/>看医生...
    李四-->>张三: 很好!
    王五->李四: 你怎么样?
    李四-->王五: 很好!
```
8. 甘特图样例：
```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title 软件开发甘特图
    section 设计
    需求                      :done,    des1, 2014-01-06,2014-01-08
    原型                      :active,  des2, 2014-01-09, 3d
    UI设计                     :         des3, after des2, 5d
    未来任务                     :         des4, after des3, 5d
    section 开发
    学习准备理解需求                      :crit, done, 2014-01-06,24h
    设计框架                             :crit, done, after des2, 2d
    开发                                 :crit, active, 3d
    未来任务                              :crit, 5d
    耍                                   :2d
    section 测试
    功能测试                              :active, a1, after des3, 3d
    压力测试                               :after a1  , 20h
    测试报告                               : 48h
```