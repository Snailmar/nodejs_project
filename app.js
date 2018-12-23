import express from "express";
import bodyParser from "body-parser";
import uuid from "uuid";
import logger from "morgan";

import consolidate from "consolidate";


const app=express();
app.listen(8080,function () {
    console.log('server start...');
});
//中间件


//模板引擎
app.set('view engine','html');
app.set('views','./views');
app.engine('html',consolidate.ejs);


