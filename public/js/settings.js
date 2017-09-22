/**
 * Created by Administrator on 2017/9/22.
 */
define(['jquery','template'],function($,template){
    $.ajax({
        url:'/api/teacher/profile',
        dataType:'json',
        type:'get',
        success:function(data){
                if(data.code==200){
                    var html=template('personTpl',data.result);
                    $('#personInfo').html(html);
                }
        }
    })
});