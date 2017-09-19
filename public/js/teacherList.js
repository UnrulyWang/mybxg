/**
 * Created by Administrator on 2017/9/19.
 */
define(['jquery','template'],function($,template){
    //调用后台接口来获取老师数据
    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success:function(data){
            var html=template('teacherTpl',{list:data.result});
            $('#teacherInfo').html(html);
        }
    })
});