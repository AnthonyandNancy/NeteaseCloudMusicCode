# NeteaseCloudMusic更新日志

# 2020-10-17   12:05

①  基本界面待见完成

②  Top.vue文件

其中搜索框的热门歌曲部分,完成了显示和点击具体的热门歌曲,差点击热门歌曲后显示所有该歌曲名的列表的Vue路由

登录完成了注册且发短信,差倒计时,验证验证码等 ,具体看Api文档

# 2020-10-17 14:27

①  整个登录注册功能完成,但是获取用户的具体数据尚未完成

# 2020-10-17 18:56

①  点击热门里的列表,跳到seach页面,展示单曲,专辑,歌手,歌单,用户,视频,歌词,电台的tabs,且更共展示了单曲tab里面的数据,差点击歌手和专辑跳到具体界面

bug:  当你在 home页面时,点击热门列表是无效的,错误在于location.reload()这个方法,用vuex最佳