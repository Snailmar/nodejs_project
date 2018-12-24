import express from "express";
import db from "./../../lib/dbHelper";

const mainRouter = express.Router();
mainRouter.get('/index', (req, res, next) => {
    let menuSql = 'select * from sys_menu where m_status=1 order by m_orderby';
    let webSql = 'select * from websiteinfo';
    db.query(webSql, [], function (err, res1) {
        console.log('res1',res1);
        db.query(menuSql, [], function (err, res2) {
            res.render('./admin/index.html', {menu: res2, webinfo: res1});
            console.log('res2',res2);
        })
    });


})
module.exports = mainRouter;