# Crawler-for-douban
50 lines, minimalist node crawler for [douban movie](https://movie.douban.com/chart) and [douban music](https://music.douban.com/chart).  
一个73行的 node 爬虫，一个简单的 [axios](https://github.com/axios/axios), [express](https://github.com/expressjs/express), [cheerio](https://github.com/cheeriojs/cheerio) 体验项目。  

# Usage

首先保证电脑已存在 node10.0+ 环境，然后  

1.拉取本项目  
```
git clone https://github.com/zwf193071/Crawler-for-douban.git
cd Crawler-for-douban
npm i
node index.js
```
2.或者下载本项目压缩包，解压
```
cd Crawler-for-douban  // 进入项目文件夹
npm i
node index.js
```

# Examples  
当启动项目后，可以看到控制台输出
```
Listening on port 3000!
```
此时打开浏览器，进入本地服务 http://localhost:3000
```
http://localhost:3000/type // type表示类型  例如：movie,music

```

稍微等待即可看到爬取完毕的返回数据：
```
[
    {
        "avatar": "https://img3.doubanio.com/view/site/small/public/5e1ad3dd9b197c1.jpg",
        "title": "隧道口虫鸣夜",
        "link": "https://site.douban.com/ZOOGAZER/",
        "information": "动物园钉子户 / 743次播放",
        "days": "(上榜6天)",
        "trend": "⬆ 2"
    },
    {
        "avatar": "https://img1.doubanio.com/view/site/small/public/57122ee1028fc8a.jpg",
        "title": "(d:re)",
        "link": "https://site.douban.com/wanderlust/",
        "information": "Wanderlust / 2775次播放",
        "days": "(上榜6天)",
        "trend": "- 0"
    },
 ...
]
```

## Thanks to
* [Crawler-for-Github-Trending](https://github.com/ZY2071/Crawler-for-Github-Trending)