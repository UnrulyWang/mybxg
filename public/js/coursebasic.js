/**
 * Created by Administrator on 2017/9/24.
 */
define(['jquery','template','util'],function($,template,util){
    util.getLightHigh('/course/add');
    //获取课程id
    var csId=util.getId('cs_id');
    console.log(csId);
    //获取标志flag 判断是添加还是编辑
    var flag=util.getId('flag');
    //根据id查询信息
    $.ajax({
        url:'/api//course/basic',
        type:'get',
        data:{
            cs_id:csId
        },
        dataType:'json',
        success:function(data){
            if(flag){
                data.result.operate='编辑课程';
            }else{
                data.result.operate='添加课程';
            }
            console.log(data);
            var html=template('basicTpl',data.result);
            $('#basicInfo').html(html);
        }
    })
});