## 时针转动
掘金原文：https://juejin.cn/post/6986785259966857247
1. 找到canvas中心，画出表框、表心（canvas 500×500）
```js
ctx.translate(250,250)  // 设置中心点，此时(250,250)变成了(0,0)坐标
ctx.beginPath()  // 使用beginPath/closePath分开画两个圆防止两圆有连接线
ctx.arc(0, 0, 100, 0, 2*Math.PI)
ctx.stroke()
ctx.closePath()
```
2. 画刻度，获取当前时间，并根据时间画出时针，分针，秒针

遇到问题：现在我画完了时针，然后我想画分针，x轴已经在我画时针的时候偏转了，这时候肯定要让x轴恢复到原来的模样，我们才能继续画分针，否则画出来的分针是不准的。

> 这时候save和restore就派上用场了，save是把ctx当前的状态打包压入栈中，restore是取出栈顶的状态并赋值给ctx，save可多次，但是restore取状态的次数必须等于save次数
```js
// 获取当前时、分、秒
let time = new Date()
let hour = time.getHours() % 12
let min = time.getMinutes()
let sec = time.getSeconds()

// 时针
ctx.rotate(2 * Math.PI / 12 * hour + 2 * Math.PI / 12 * (min / 60) - Math.PI / 2)
ctx.beginPath()
// moveTo()设置画线起点
ctx.moveTo(-10, 0)
// lineTo()设置画线经过点
ctx.lineTo(40, 0)
// 设置线宽
ctx.lineWidth = 10
ctx.stroke()
ctx.closePath()
// 恢复成上一次save的状态
ctx.restore()
// 恢复完再保存一次
ctx.save()
```
> 分针、秒针同理。

3. 使用定时器，每过一秒获取新的时间，并重新绘图，达到时钟转动的效果
> 注意每次重新绘制的时候先清除画布ctx.clearRect(0,0, 500,500)

## 刮刮乐
1. 底下答案是一个div，顶部灰皮是一个canvas，canvas一开始盖住div
2. 鼠标事件，点击时并移动时，鼠标经过的路径都画圆形开路，并且设置`globalCompositeOperation: destination-out`，使鼠标经过的路径都变成透明，一透明，自然就显示出下方的答案信息。
```js
let isDraw = false
canvas.onmousedown = function () {
    isDraw = true
}
canvas.onmouseup = function () {
    isDraw = false
}
canvas.onmousemove = function (e) {
    if (!isDraw) return
    // 计算鼠标在canvas里的位置
    const x = e.pageX - canvas.offsetLeft
    const y = e.pageY - canvas.offsetTop
    // 设置globalCompositeOperation
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    // 画圆
    ctx.arc(x, y, 10, 0, 2 * Math.PI)
    // 填充圆形
    ctx.fill()
    ctx.closePath()
}
```
> 关于fill这个方法，其实是对标stroke的，fill是把图形填充，stroke只是画出边框线

关于globalCompositeOperation：https://blog.csdn.net/weixin_44797182/article/details/102605409
# canvas_learning
