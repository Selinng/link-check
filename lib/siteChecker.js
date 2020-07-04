const brokenLinkChecker = require('./broken-link-checker')

const siteChecker = function (siteCheckOptions, callback) {
  return new Promise((resolve, reject) => {
    let linkCheckList = []
    let pagecount = 0
    let siteCheck = new brokenLinkChecker.SiteChecker(siteCheckOptions, {
      //在下载了网站的robots.txt并提供了[robots-txt-guard]（https://npmjs.com/robots-txt-guard）的实例后
      robots: function(robots, customData){
        
      },
      //在完全解析页面的HTML文档后触发
      html: function(tree, robots, response, pageUrl, customData){
  
      },
      //使用选项中配置的每个跳过的链接上的数据触发
      junk: function(result, customData){
  
      },
      //使用当前页面中每个发现的链接（已损坏或未损坏）的结果触发
      link: function(result, customData){
        const res = {
          link: result.url.resolved, 
          isBroken: result.broken, 
          brokenReason: result.broken ? result.brokenReason : null
        }
        linkCheckList.push(res)
        callback(res)
      },
      //在页面的最后结果之后触发
      page: function(error, pageUrl, customData){
        if(error) {
          resolve(null, error)
        }
        pagecount ++
        console.log(pagecount)
        // if(pagecount === 3) {
        //   siteCheck.pause()
          
        //   resolve(linkCheckList)
        // }
    
      },
      //在站点的最后结果之后触发
      site: function(error, siteUrl, customData){
        if(error) {
          resolve(null, error)
        }
      },
      //到达队列末尾时会触发
      end: function(){
        console.log('end')
        resolve(linkCheckList)
      }
    });
    siteCheck.enqueue(siteCheckOptions.firstPageUrl);
  })

}

module.exports = siteChecker
