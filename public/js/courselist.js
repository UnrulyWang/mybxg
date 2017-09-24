/**
 * Created by Administrator on 2017/9/24.
 */
define(['jquery','template','util'],function($,template,util){
//设置下方选中
    util.getLightHigh(location.pathname);
    //获取课程所有数据
    $.ajax({
        type:'get',
        url:'/api/course',
        dataType:'json',
        success:function(data){
            var html=template('courseTpl',{list:data.result});
            $('#courseInfo').html(html);
        }

    })
});