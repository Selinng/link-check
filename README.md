# link-check
Detect site links by rule and send mail to you when done
## 项目说明
一个用于检测站点死链接的工具，在index.js的options中可以通过自由配置参数检测站点并通过指定规则发送到你的邮箱中，
生成一个任务列表，可以通过调用cancel方法取消某个任务

## 项目说明
主要用到的库
* [node-schedule](https://github.com/node-schedule/node-schedule) - 定时任务
* [broken-link-checker](https://github.com/stevenvachon/broken-link-checker) - 死链工具
* [nodemailer](https://github.com/nodemailer/nodemailer) - 发送邮件
