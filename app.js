const express = require('express')
const ejs = require("ejs")
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const linkChecker = require('./index.js')

const port = 3000
let emitCount = 0

//定义模板引擎
app.engine("html", ejs.__express)
app.set("engin", "html")
app.get("/html", function (req, res) {
  res.render("index.html", { title: "hello" })
})
function emit(res) {
  console.log('emit res', res)
  io.emit("msg", res)
}
io.on('connection', function (socket) { // socket相关监听都要放在这个回调里
  console.log('a user connected')

  socket.on("disconnect", function () {
    console.log("a user go out")
  })

  socket.on("msg", function (obj) {
    //延迟3s返回信息给客户端
    // setTimeout(function () {
    //   console.log('the websokcet message is' + obj)
    //   io.emit("msg", obj)
    // }, 3000)
  })
  // setInterval(function () {
  //   console.log('emit')
  //   io.emit("msg", emitCount ++)
  // }, 3000)
  linkChecker(emit)
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))