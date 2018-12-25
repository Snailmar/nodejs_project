import express from "express";
import db from "./../../lib/dbHelper";

const mainRouter = express.Router ();
mainRouter.get ( '/index' , ( req , res , next ) => {
	let menuSql = 'select * from sys_menu where m_status=1 order by m_orderby';
	let webSql = 'select * from websiteinfo';
	db.query ( webSql , [] , function ( err , res1 ) {
		db.query ( menuSql , [] , function ( err , res2 ) {
			res.render ( './admin/index.html' , {menu: res2 , webinfo: res1} );
		} )
	} );
} )
mainRouter.get ( '/menu' , ( req , res , next ) => {
	res.render ( './admin/menu.html' , {} )
} );
mainRouter.post ( '/getmenu' , ( req , res , next ) => {
	let menuSql = 'SELECT * FROM `sys_menu`  ORDER BY m_orderby ';
	db.query ( menuSql , [] , function ( err , result ) {

		let o = {
			"code": 0 ,
			"msg": "" ,
			"count": result.length ,
			"data": result
		}
		if (!err){

			res.json(o);
		}
	} );

} );
mainRouter.post('/deletemenubyid',(req , res , next)=>{
	let deletemenubyidSql='UPDATE sys_menu SET m_status=0 WHERE m_id=?';

	let param=[req.body.m_id];
	db.query(deletemenubyidSql,param,function ( err,result ) {
		if (!err&&result.affectedRows>=1){
			res.json({msg:"delete success",status:1})
		} else {
			res.j({msg:err,status:-1})
		}
	})

});
mainRouter.post('/editbyid',(req,res,next)=>{
	let sql='UPDATE sys_menu SET m_name=?,m_url=?,m_no=?,m_parent=?,m_icon=?,m_orderby=?, m_status=? WHERE m_id=?'
	let param=[
		req.body.m_name,
		req.body.m_url,
		req.body.m_no,
		req.body.m_parent,
		req.body.m_icon,
		req.body.m_orderby,
		req.body.m_status,
		req.body.m_id,

	];
	db.query(sql,param,function ( err,result ) {
		console.log ( result );
	})
});
mainRouter.get('/addmenu',(req,res,next)=>{
	res.render('./admin/addmenu',{});
});
mainRouter.post('/editmenu',(req,res,next)=>{
	console.log ( req.body );
	let sql='insert into sys_menu (m_name,m_url,m_no,m_parent,m_icon,m_orderby,m_status) values(?,?,?,?,?,?,?)'
	let params=[
		req.body.m_name,
		req.body.m_url,
		req.body.m_no,
		req.body.m_parent,
		req.body.m_icon,
		req.body.m_orderby,
		req.body.m_status
	];
	db.query(sql,params,function ( err,result ) {
		if(result.affectedRows>=1){
			res.json({msg:'success',status:1})
		}else {

		}
	})
})
module.exports = mainRouter;