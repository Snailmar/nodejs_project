layui.use(['form', 'layedit', 'laydate'], function(){
	var form = layui.form
		,layer = layui.layer
		,layedit = layui.layedit
		,laydate = layui.laydate
		,$=layui.$;




	//创建一个编辑器
	var editIndex = layedit.build('LAY_demo_editor');

	//自定义验证规则
	form.verify({
		m_name: function(value){
			if(value.length <=0){
				return '标题不能为空';
			}
		}
		,m_orderby: [
			/^\d+$/
			,'orderby必须为数字'
		]

	});



	//监听提交
	form.on('submit(demo1)', function(data){
		let rData=data.field;
		rData.m_status=rData.m_status==undefined?0:1;
		console.log(rData);
		// layer.alert(JSON.stringify(data.field), {
		// 	title: '最终的提交信息'
		// })
		$.ajax({
			url:"./editmenu",
			data:rData,
			type:'post',
			dataType:'json'
		}).then(function ( res ) {
			console.log ( res );
			if (res.status==1){
				console.log ( 2222 );
				var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
				parent.layer.close(index);
			}
		})
		return false;
	});




});