import express from "express";
import bodyParser from "body-parser";
import uuid from "uuid";
import logger from "morgan";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";


import adminRouter from "./router/admin/adminRouter";

import consolidate from "consolidate";


const app=express();
app.listen(8080,function () {
    console.log('server start...');
});
//中间件
app.use(logger('combined',{stream:require('fs').createWriteStream(__dirname+'/logs/logs.log',{flags:'a'})}))//日志配置
app.use(express.static('./public'))//配置静态资源
app.use(bodyParser.urlencoded({extended:true,limit:'500mb'}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cookieParser('vigorzhang'));
app.use(cookieSession({
    genid:function () {
        return uuid.v1();
    },
    maxAge:1000*60*20,
    secret:'vigorzhang'
}))

//模板引擎
app.set('view engine','html');
app.set('views','./views');
app.engine('html',consolidate.ejs);

//admin路由
app.use('/admin',adminRouter);
