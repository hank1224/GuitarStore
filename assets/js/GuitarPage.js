function show(ele) {
    ele.style.display = "block";
}

function hide(ele) {
    ele.style.display = "none";
}

function scroll() {
    if (window.pageYOffset != null) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else if (document.compatMode === "CSS1Compat") {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}
//以上是productview部分

const express = require('express');
const app = express();
const fs = require('fs');
const sd = require('silly-datetime');
const readline = require('readline');

app.use(express.static('./public'));

let oldHtmlContent = fs.readFileSync('./GuitarPage').toString(); //读取index.html文档

app.get('/', function (req, res) {
    res.send(oldHtmlContent);
    fs.writeFileSync('./assets/records.txt', ''); //初始化txt为空白
});

app.get('/comment', function (req, res) {

    writeRecord(req.query.comment, sd.format(new Date(), 'YYYY-MM-DD HH:mm')); //记录评论与时间

    //加载评论
    let newHtmlContent = '';
    let r = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/ //匹配日期
    let floorNumber = 2;
    let comment = '';
    //使用readline逐行读取文件
    const r1 = readline.createInterface({
        input: fs.createReadStream('./assets/records.txt')
    })
    r1.on('line', (line) => {
        if (r.test(line)) {
            //新评论的HTML代码
            newHtmlContent =
                `<div class="comment">
                     <span class="comment-avatar">
                     <img src="avatar1.jpg" alt="avatar">
                     </span>
                     <div class="comment-content">
                         <p class="comment-content-name">EdmundDZhang</p>
                         <p class="comment-content-article">${comment}</p>
                         <p class="comment-content-footer">
                             <span class="comment-content-footer-id">#${++floorNumber}</span>
                             <span class="comment-content-footer-device">来自安卓客户端</span>
                             <span class="comment-content-footer-timestamp">${line}</span>
                         </p>
                    </div>
                     <div class="cls"></div>
                     </div>` + newHtmlContent;
            comment = '';
        } else {
            comment += line;
        }
    }).on('close', () => {
        res.send(oldHtmlContent.replace('<div class="comment-list" id="commentList">', '<div class="comment-list" id="commentList">\n' + newHtmlContent));
    })
})

function writeRecord(comment, datetime) {
    fs.writeFileSync('assets/records.txt', `
                $ {
                    comment
                }\
                n$ {
                    datetime
                }\
                n `, {
        flag: 'a'
    });
}

app.listen(8888, '127.0.0.1');

//以上為留言區部分
