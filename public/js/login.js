/**
 * Created by Administrator on 2017/9/19.
 */
define(['jquery','cookie'],function($){
    console.log(1);
    $('#loginBtn').click(function(){
        console.log( $('#loginForm').serialize());
        $.ajax({
            type : 'post',
            url : '/api/login',
            data : $('#loginForm').serialize(),
            dataType : 'json',
            success : function(data){
                if(data.code == 200){
                    //存储用户登陆之后的信息
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                    // 登录成功，跳转到主页面
                    location.href = '/main/index';
                }
            }
        });
        return false;// 阻止默认行为
    });
});