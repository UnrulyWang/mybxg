/**
 * Created by Administrator on 2017/9/21.
 */
define(['jquery','util','template','bootstrap','datepicker','language'],function($,util,template){
    var teacherId=(util.getId('tc_id'));
    //编辑操作
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
    //添加操作
    else{
        var html=template('teacherTpl',{});
        $('#teacherInfo').html(html);

            submitForm('/api/teacher/add');

    }
    //提交表单
    function submitForm(url){
        $('#addForm').on('click',function(){
            console.log($('#teacherForm').serialize());
            $.ajax({
                type:'post',
                url:url,
                data:$('#teacherForm').serialize(),
                dataType:'json',
                success:function(data){
                    console.log(data);
                    if(data.code==200){
                        location.href='/teacher/list';
                    }
                }
            })
        });
    }

});