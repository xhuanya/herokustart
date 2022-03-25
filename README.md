# ʕ •́؈•̀) heroku 定时监控
部署后在对应的kv中创建建为all值为
[{"start":几号开始,"end":几号结束,"url":"heroku域名"},{"start":开始,"end":结束,"url":"heroku域名"},......]
然后自己在cf配置定时任务即可

不会使用cli发布的自行复制dist的js文件粘贴到cf worker代码里面然后手动绑定kv 创建值