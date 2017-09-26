/**
 * Created by Administrator on 2017/9/25.
 */
define(['jquery','template','util'],function($,template,util){
    //设置导航菜单选中
    util.getLightHigh('/course/add');
    //获取id
    var csId=util.getId('cs_id');
    //获取所有的课时
    $.ajax({
        url:'/api/course/lesson',
        type:'get',
        data:{cs_id:csId},
        dataType:'json',
        success:function(data){
            console.log(data);
            if(data.code==200){
                var html=template('lessonTpl',data.result);
                $('#lessonInfo').html(html);
            }
        }
    })
});