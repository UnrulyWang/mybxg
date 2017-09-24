/**
 * Created by Administrator on 2017/9/24.
 */
define(['jquery','template','util','form'],function($,temolate,util){
    util.getLightHigh(location.pathname);
    //绑定事件
    $("#courseBtn").click(function(){
        console.log(1);
        $('#courseForm').ajaxSubmit({
            type:'post',
            url:'/api/course/create',
            dataType:'json',
            success:function(data){
                console.log(data);
                if(data.code==200){
                    location.href='/course/basic?cs_id='+data.result.cs_id;
                }
            }
        });
    })
})