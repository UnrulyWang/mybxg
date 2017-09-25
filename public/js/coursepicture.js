/**
 * Created by Administrator on 2017/9/25.
 */
define(['jquery','template','util'],function($,template,util){
    util.getLightHigh('/course/add');
    //渲染页面
    $.ajax({
        url:'/api/course/picture',
        type:'get',
        dataType:'json',
        success:function(data){
            if(data.code==200){
                var html=template('picTpl',data.result);
                $('#picInfo').html(html);
            }
        }
    })
});