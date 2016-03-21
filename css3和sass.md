
### sass
---
2016-3-21
1. @at-root用法
```sass

.box {
    @at-root #{&}-a {
        // 样式
    }
}
```
编译后
```css
.box-a {
    // 样式
}
```
>和&的不同之处是在，&编译后在嵌套在父级里面的
```sass
.box {
    $-a {
        // 样式
    }
}
```
```css
.box .box-a {
    // 样式
}
```

### css3
---
2016-3-21
1. []属性选择器
```css
[attr ^= value]     // 匹配attr属性开头带value的元素
[attr $= value]     // 结尾
[attr *= value]     // 任意地方
```

```html
<div class="box container btn-sm">1</div>
<div class="container btn-sm box">2</div>
<div class="box container btn-sm">3</div>
```
```css
[class ^= 'box'] {
    color: red      // 1
}
[class $= 'box'] {
    color: blue     // 2
}
[class *= 'btn-sm'] {
    color: white    // 1 2 3
}

```
