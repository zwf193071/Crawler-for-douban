const cheerio = require('cheerio')
const axios = require('axios');
const express = require('express')
const app = express()

/**
 * 收集信息
 * @param {String} type 默认收集豆瓣电影排行榜信息
 */
const getData = (type='movie') => {
    let url = `https://${type}.douban.com/chart`
    return axios.get(url)
        .then(function (response) {
            let html_string = response.data.toString(); // 获取网页内容
            const $ = cheerio.load(html_string);  // 传入页面内容
            let list_array = []; 
            if (type === 'music') {
                $(".article").find("li").each(function () {
                    let obj = {};
                    let $trend = $(this).find('.trend');
                    obj.avatar = $(this).find('.face img').attr('src');
                    obj.title = $(this).find('.icon-play a').text().trimStart().trimEnd();
                    obj.link = $(this).find('.face').attr('href');
                    obj.information = $(this).find('.intro p').text().trimStart().trimEnd();
                    obj.days = $(this).find('.days').text().trimStart().trimEnd();
                    if ($trend.hasClass('arrow-stay')) {
                        obj.trend = '- ' + $trend.text().trimStart().trimEnd()
                    } else if ($trend.hasClass('arrow-up')) {
                        obj.trend = '⬆ ' + $trend.text().trimStart().trimEnd()
                    } else {
                        obj.trend = '⬇ ' + $trend.text().trimStart().trimEnd()
                    }
                    list_array.push(obj);
                });
                return Promise.resolve(list_array);
            }
            $(".article").find(".item").each(function () {
                let obj = {};
                obj.avatar = $(this).find('.nbg img').attr('src');
                obj.title = $(this).find('.pl2 a').text().trimStart().trimEnd();
                obj.link = $(this).find('.pl2 a').attr('href');
                obj.information = $(this).find('p.pl').text().trimStart().trimEnd();
                obj.rating = $(this).find('.rating_nums').text().trimStart().trimEnd();
                obj.peopleNum = $(this).find('.star .pl').text().trimStart().trimEnd();
                list_array.push(obj);
            });
            list_array = list_array.sort((x, y) => {
                return parseFloat(y.rating.replace(/,/, '')) - parseFloat(x.rating.replace(/,/, ''))
            })
            return Promise.resolve(list_array);

        })
        .catch(function (error) {
            console.log(error);
        })
}

app.get('/', (req, res) => {
    let promise = getData(); // 发起抓取
    promise.then(response => {
        res.json(response); // 数据返回
    });
})

app.get('/:type', (req, res) => {
    const { type } = req.params;
    let promise = getData(type); // 发起抓取
    promise.then(response => {
        res.json(response); // 数据返回
    });
})

app.listen(3000, () => console.log('Listening on port 3000!'))  // 监听3000端口
