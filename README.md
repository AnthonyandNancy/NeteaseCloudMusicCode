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

Vuex思路,当我点击热门时,dispatch到action里面,action里将歌名commit到mutations里做更改

在tabs页面里.computed检测到这个信息,当做更改时检测到,再次调用feach方法

# 2020-10-18 13:47

修复昨天的bug

# 2020-10-18 17:02

完成专辑组件展示,和跳转到 对应专辑的内容的路由

# 2020-10-18 19:09

完成对应专辑的收藏数,评论数,歌手的显示

# 2020-10-18 21:25

改善专辑内容的布局问题

# 2020-10-19 10:31

更新了所有页面的loading

# 2020-10-19 12:11 

完成专辑里  歌曲的展示  热门评论需要的内容的展示 ,差布局

# 2020-10-19 14:48

专辑里面的评论完成

# 2020-10-19 15:03

专辑里面的专辑详细完成

# 2020-10-19 18:24

在vuex里面新增了两个专属id    singer和song,并且在专辑页面和单曲的页面使用了dispatch保存id,singerid方便的路由的展示查询

修改了request.js里面错误的拦截提示

新增singer页面和跳转到详情的singer页面的路由,修改了singer专属要用到的api.js,在详细页面中,写好了头部内容

# 2020-10-20 13:41

singer页面无改动,加快进步

# 2020-10-20  18:26 

```
第一个简单版出来了
```



# 2020-10-20 20:44

解决侧边栏激活问题

# 2020-10-21 11:24

完成tabs栏目和子组件的迁移

# 2020-10-21 15:06

```
完成MV界面和播放,差视频tabs
```

# 2020-10-21 15:21 

更新了mv的观看人数

# 2020-10-21 21:13

修复底部图片心事错误

# 2020-10-22 18:35 

```
新增歌单,未新增路由
```

# 2020-10-23 13:28

```
完成歌单跳转到详细页
```

# 2020-10-23 14:26

音量控制完成

# 2020-10-23 17:48

```
循环播放完成,剩下右下角菜单
```

# 2020-10-23 17:48

```
歌单里的播放全部按钮完成
```

# 2020-10-24 10:42 

右下角歌单按钮第一版本完成

# 2020-10-24018:39

歌词同步,同步解决,offset上下移动尚未