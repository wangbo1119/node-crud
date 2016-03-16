/**
 * Created by wangbo on 2016/3/14.
 */
const connect = require('connect');
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const _ = require('underscore');

const  tmpl_root = path.join(__dirname,'views');
http.ServerResponse.prototype.render = function render(tmplName,locals) {
    fs.readFile(path.join(tmpl_root,tmplName + '.html'),'utf8',(err,tmpl)=>{
        if(err){
            this.writeHead(500,'Internal Server Error',{'Content-Type':'text/html'})
            this.end(`${path.join(tmpl_root,tmplName + '.html')}没找到`);
            return false;
        }
        var html = tmpl;
        if(locals){
            var compiled = _.template(tmpl);
            html = compiled(locals);
        }
        this.writeHead(200,'OK',{'Content-Type':'text/html'});
        this.end(html);
    });
}
http.ServerResponse.prototype.notFound = function notFound() {
    this.writeHead(404,'NOT Found',{'Content-Type':'text/html'});
    this.end('<h1>NOt Found</h1>');
}
http.ServerResponse.prototype.redirect = function (url) {
    this.writeHead(302,'Moved Temproarily',{'location':url});
    this.end();
}
const app = connect();
app.use(bodyParser.urlencoded());

//公共的中间件
app.use((req,res,next)=>{
    req.urlObj = url.parse(req.url,true);
    next();
})
//list
app.use('/list',require('./handlers/list'))
//detail
app.use('/detail', require('./handlers/detail'));
//add
app.use('/add',require('./handlers/add'))
//delete
app.use('/delete',require('./handlers/delete'))
//updata
app.use('/update',require('./handlers/update'))
//默认访问
app.use('/',require('./handlers/list'))
app.listen(3000);

