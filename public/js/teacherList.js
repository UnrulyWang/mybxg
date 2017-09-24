/**
 * Created by Administrator on 2017/9/21.
 */
/**
 * Created by Administrator on 2017/9/19.
 */
define(['jquery','template','util','bootstrap'],function($,template,util){
    //调用后台接口来获取老师数据
    util.getLightHigh(location.pathname);
    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success:function(data){
            var html=template('teacherTpl',{list:data.result});
            $('#teacherInfo').html(html);
            //点击注销按钮切换状态
            $('.change').on('click',function(){
                var  that =this;
                var teacherId=$(this).parent().parent().attr('data-id');
                var teacherStatus=$(this).parent().parent().attr('data-Status');
                $.ajax({
                    type:'post',
                    url:'/api/teacher/handle',
                    data:{
                        tc_id:teacherId,
                        tc_status:teacherStatus
                    },
                    dataType:'json',
                    success:function(data){
                        console.log(data);
                        $(that).parent().parent().attr('data-Status',data.result.tc_status);
                        if(data.result.tc_status==1){
                            $(that).text("李楠");
                        }else{
                            $(that).text("呵呵");
                        }

                    }
                })

            })
            //点击查看
            $('.look').on('click',function(){
                var teacherId=$(this).parent().parent().attr('data-id');
                $.ajax({
                    type:'get',
                    url:'/api/teacher/view',
                    data:{
                        tc_id:teacherId
                    },
                    dataType:'json',
                    success:function(data){
                        console.log(data);
                        var html=template('modalTpl',data.result);
                        $('#modalInfo').html(html);
                        $('#teacherModal').modal();

                    }
                })
            })
            //点击编辑
            $('.edit').on('click',function(){

            })
        }
    })
});