const nodeSchedule = require("node-schedule")


const schedule = function ({scheduleOptions, siteCheckOptions, sendMailOptions}, task) {

  console.log('schedule running in ' + new Date())
  return nodeSchedule.scheduleJob(scheduleOptions, function() {
    console.log("执行任务" + new Date())
    task({siteCheckOptions, sendMailOptions})
  })
}
module.exports = schedule