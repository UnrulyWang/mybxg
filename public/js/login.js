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
                    //�洢�û���½֮�����Ϣ
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                    // ��¼�ɹ�����ת����ҳ��
                    location.href = '/main/index';
                }
            }
        });
        return false;// ��ֹĬ����Ϊ
    });
});