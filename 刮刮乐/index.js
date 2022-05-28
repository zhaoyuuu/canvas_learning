const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

// 填充的颜色
ctx.fillStyle = 'darkgray'
ctx.fillRect(0,0, 400,100)

// 绘制填充文字
ctx.fillStyle = '#fff'
ctx.font = '20px Aril'  // 设置字体
ctx.fillText('刮刮乐', 180, 50)

let isDraw = false
canvas.onmousedown = function(){
  isDraw = true
}
canvas.onmouseup = function(){
  isDraw = false
}
canvas.onmousemove = function(e){
  if(!isDraw) return;

  // 计算光标在canvas里的坐标
  const x = e.pageX - canvas.offsetLeft
  const y = e.pageY - canvas.offsetTop

  // 设置globalCompositeOperation，使鼠标经过的路径都变成透明
  ctx.globalCompositeOperation = 'destination-out'

  ctx.beginPath()
  // 画圆
  ctx.arc(x, y, 10, 0, 2*Math.PI)

  // 填充圆形
  ctx.fill()

  ctx.closePath()

}