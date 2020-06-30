const siteChecker = require('./lib/siteChecker')
const schedule = require('./lib/schedule')
const sendMail = require('./lib/sendMail')
const renderChart = require('./lib/renderChart')


  let options = {
    scheduleOptions: '0 24 * * * *', //cron风格 
    siteCheckOptions: {
      filterLevel: 3, // 检测级别
      excludeExternalLinks: true, // 只检测内链
      firstPageUrl: 'http://zving.com/', // 检测的站点路径
      excludedKeywords: null, // 不包含的关键字（字符串或者数组）
      includedKeywords: null // 包含的关键字（字符串或者数组）
    },
    sendMailOptions: {
      service: '', //发送者邮箱厂家
      user: '', //发送者邮箱账户
      pass: '', //发送者邮箱SMTP授权码
      nick: 'link-checker', //发送者昵称
      to: '1260325287@qq.com', //接收者邮箱地
      subject: 'link-check' //邮件主题
    }
  }

  let scheduleList = []
  scheduleList.push(schedule(options, function({siteCheckOptions, sendMailOptions}) {
    siteChecker(siteCheckOptions)
    .then((res, error) => {
      sendMailOptions.html = renderChart(res, error) //邮件内容
      sendMail(sendMailOptions)
    })
  }))
  console.log('scheduleListLength: ' + scheduleList.length)
  


  // scheduleList[].cancel() //取消某个检测任务
