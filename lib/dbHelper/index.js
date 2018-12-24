import mysql from "mysql";
import config from "../dbconfig";

const pool = mysql.createPool(config);

function exec(sql, params,cb) {
    pool.getConnection(function (err, conn) {
        // conn链接对象
        if (!err) {
            conn.query(sql, params, cb);
            conn.release();
        } else {
            callback(err, null, null);
        }
    })
}
module.exports={query:exec}