const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



setInterval(() => {
  ctx.clearRect(0,0, 500,500)  // 清空画板
  ctx.save()  // 保存最初始状态，即中心点都没变的时候

  // 设置中心点，此时(300,300)变成了(0,0)坐标
  ctx.translate(250,250)
  // 把状态保存起来
  ctx.save()

  /* 表心、表框 */

  // 画两个圆，使用arc(中心点x,中心点y,半径,起始角度，结束角度)
  ctx.beginPath()  // 使用beginPath/closePath分开画两个圆防止两圆有连接线
  ctx.arc(0, 0, 100, 0, 2*Math.PI)
  ctx.stroke()
  ctx.closePath()

  ctx.beginPath()
  ctx.arc(0, 0, 5, 0, 2*Math.PI)
  ctx.stroke()
  ctx.closePath()

  /* 时针、分针、秒针 */

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

  // 分针
  ctx.rotate(2*Math.PI / 60 * min + 2*Math.PI / 60 * (sec/60) - Math.PI / 2)
  ctx.beginPath()
  ctx.moveTo(-10, 0)
  ctx.lineTo(60, 0)
  ctx.lineWidth = 5
  ctx.strokeStyle = 'blue'  // 分针设置为蓝色
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()

  // 秒针
  ctx.rotate(2*Math.PI * sec / 60 - Math.PI / 2)
  ctx.beginPath()
  ctx.moveTo(-10, 0)
  ctx.lineTo(80, 0)
  // ctx.lineWidth 秒针直接用默认宽度
  ctx.strokeStyle = 'red'
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()

  // 绘制刻度，刻度是死的

  ctx.lineWidth = 1
  // 60个小刻度
  for(let i=0; i<60; i++){
    ctx.rotate(2*Math.PI / 60)
    ctx.beginPath()
    ctx.moveTo(90, 0)
    ctx.lineTo(100, 0)
    ctx.stroke()
    ctx.closePath()
  }
  ctx.restore()
  ctx.save()
  // 12个大刻度
  ctx.lineWidth = 5
  for(let i=0; i<12; i++){
    ctx.rotate(2*Math.PI / 12)
    ctx.beginPath()
    ctx.moveTo(85, 0)
    ctx.lineTo(100, 0)
    ctx.stroke()
    ctx.closePath()
  }
  ctx.restore()

  ctx.restore()  // 还原到最初始状态

}, 1000);
