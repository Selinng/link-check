const renderChart = function (data, error) {
  if(error) {
    return 'ERROR:' + error.toString()
  }
  if(!data) {
    return '没有检测到链接，请确认是否网络可用环境下'
  }
  let trs = ''
  data.forEach(item => {
  trs += `<tr>
    <td>${item.link}</td>
    <td>${item.isBroken ? '是' : '否'}</td>
    <td>${item.brokenReason}</td>
  </tr>`
  });
  let table = `<table>
    <thead>
      <th>link</th>
      <th>broken</th>
      <th>brokenReason</th>
    </thead>
    <tbody>
      ${trs}
    </tbody>
  </table>`
  return table
}
module.exports = renderChart