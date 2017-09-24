/**
 * Created by Administrator on 2017/9/21.
 */
define(['jquery','util','template','bootstrap','datepicker','language','validate','form'],function($,util,template){
    util.getLightHigh('/teacher/list');
    var teacherId=(util.getId('tc_id'));
    //编辑
    if(teacherId){
        $.ajax({
            type:'get',
            url:'/api/teacher/edit',
            data:{
                tc_id:teacherId
            },
            dataType:'json',
            success:function(data){
                if(data.code==200){
                    var html=template('teacherTpl',data.result);
                    $('#teacherInfo').html(html);
                        submitForm('/api/teacher/update');
                }
            }
        })
    }
    //添加
    else{
        var html=template('teacherTpl',{});
        $('#teacherInfo').html(html);

            submitForm('/api/teacher/add');

    }
    //提交表单
    //function submitForm(url){
    //    $('#addForm').on('click',function(){
    //        console.log($('#teacherForm').serialize());
    //        $.ajax({
    //            type:'post',
    //            url:url,
    //            data:$('#teacherForm').serialize(),
    //            dataType:'json',
    //            success:function(data){
    //                console.log(data);
    //                if(data.code==200){
    //                    location.href='/teacher/list';
    //                }
    //            }
    //        })
    //    });
    //}
    function submitForm(url){
        $('#teacherForm').validate({
            sendForm:false,
            valid:function(){
                console.log(1);
                //console.log($('#teacherForm').serialize());
                console.log($(this).get(0));
                $(this).ajaxSubmit({
                    url:url,
                    dataType:'json',
                    type:'post',
                    success:function(data){
                        console.log(data);
                        if(data.code==200){
                            location.href='/teacher/list';
                        }
                    }
                });
            },
            description:{
                tcName:{
                    required: '用户名不能为空'
                },
                tcPass:{
                    required: '密码不能为空',
                    pattern: '必须是6位数字'
                },
                tcJoinDate:{
                    required: '日期不能为空'
                }
            }
        })
    }
});