export async function handleRequest(request: Request): Promise<Response> {
  return new Response(`request method: ${request.method}`)
}

export async function handleScheduled(event: any) {
  var flag = false;
  var Runtask: Promise<Response>[] = [];

  //任务队列
  var taskList: any = await MykvDB.get('task', 'json') || []
  if (taskList.length == 0) {
    var allSite: any = await MykvDB.get('all', 'json') || []
    console.log('空数据写入', '全部任务', allSite)
    taskList = allSite
  }
  console.log(taskList)
  for (var i = 0; i < 49; i++) {
    let data = taskList[i]
    if (!data) {
      continue;
    }
    let now = new Date().getDate();
    if (data.start < now && data.end > now) {
      Runtask.push(new Promise(function(suc,fail){
        fetch(data.url,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.46'},method:'GET'}).then(rs=>{
          console.log('请求完成',data.url,rs)
          suc(rs)
        }).catch(err=>fail(err));
      }))
    }

  }
  if(taskList.length>50){
    await MykvDB.put('task', JSON.stringify(taskList.splice(50)))
  }

  event.waitUntil( Promise.all(Runtask))
}