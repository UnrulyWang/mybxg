define(['jquery','template','cookie'],function($,template){
	//NProgress.start();
    //
	//NProgress.done();
    //
	//$('.navs ul').prev('a').on('click', function () {
	//	$(this).next().slideToggle();
	//});
//点击推出

	$('.aside .navs li a[href="javascript:;"]').on('click',function(){
		console.log(1);
		$('.aside .navs li a + ul').slideToggle();
	})

	$('#logoutBtn').on('click',function(){
		console.log(1);
		$.ajax({
			type:'post',
			url:'/api/logout',
			dataType:'json',
			success: function (data) {
				if(data.code == 200){
					location.href='/main/login'
				}
			}
		})
	});
//根据sessionid传来的值来配置头像
	var flag=$.cookie('PHPSESSID');
	console.log(flag);
	if(!flag && location.pathname!='/main/login'){
		location.href='/main/login';
	}
	var loginInfo=$.cookie('loginInfo');
	loginInfo=loginInfo&&JSON.parse(loginInfo);
	var tpl='<div class="avatar img-circle"><img src="{{tc_avatar}}"></div> <h4>{{tc_name}}</h4>';
	var html=template.render(tpl,loginInfo);
	$('.aside .profile').html(html);
	//$('.aside .profile img').attr('src',loginInfo.tc_avatar);
	//$('.aside .profile h4').html(loginInfo.tc_name);
});


