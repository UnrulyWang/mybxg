define(['jquery','cookie'],function($){
	//NProgress.start();
    //
	//NProgress.done();
    //
	//$('.navs ul').prev('a').on('click', function () {
	//	$(this).next().slideToggle();
	//});
//�˳���ť
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
//��֤�û��Ƿ�dengl½
	var flag=$.cookie('PHPSESSID');
	console.log(flag);
	if(!flag){
		location.href='/main/login';
	}
	var loginInfo=$.cookie('loginInfo');
	loginInfo=loginInfo&&JSON.parse(loginInfo);
	$('.aside .profile img').attr('src',loginInfo.tc_avatar);
	$('.aside .profile h4').html(loginInfo.tc_name);
});

