/**
 * Created by Administrator on 2017/9/24.
 */
define(['jquery','template','util','validate','form'],function($,template,util){
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
            //处理二级分类的下拉联动
            $('#firstType').change(function(){
                //获取一级分类id
              var pid=$(this).val();
                console.log(pid);
                //根据一级分类id 查询所欲的二级分类数据
                $.ajax({
                    type:'get',
                    url:'/api/category/child',
                    data:{
                        cg_id:pid
                    },
                    dataType:'json',
                    success:function(data){
                        var tpl='<option value="">请选择二级分类</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}{{/if}}';
                        var html=template.render(tpl,{list:data.result});
                        $('#secondType').html(html);
                    }
                });
            });
            //处理表单提交
            $('#basicForm').validate({
                sendForm:false,
                valid :function(){
                    //提交表单
                    $(this).ajaxSubmit({
                        url:'/api/course/update/basic',
                        type:'post',
                        data:{
                            cs_id:csId
                        },
                        dataType:'json',
                        success:function(data){
                            if(data.code==200){
                                //下一步跳转到封面裁切页面
                                location.href='/course/picture?cs_id='+data.result.cs_id;
                            }
                        }
                    })
                }
            })
        }
    })
});