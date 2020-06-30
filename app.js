const express = require('express')
const ejs = require("ejs")
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = 3000

//定义模板引擎
app.engine("html", ejs.__express)
app.set("engin", "html")
app.get("/html", function (req, res) {
  res.render("index.html", { title: "hello" })
})
io.on('connection', function (socket) { // socket相关监听都要放在这个回调里
  console.log('a user connected')

  socket.on("disconnect", function () {
    console.log("a user go out")
  })

  socket.on("msg", function (obj) {
    //延迟3s返回信息给客户端
    setTimeout(function () {
      console.log('the websokcet message is' + obj)
      io.emit("msg", obj)
    }, 3000)
  })
})
// app.get('/', (req, res) => res.send('Hello World!'))

server.listen(port, () => console.log(`Example app listening on port ${port}!`))