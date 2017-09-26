/**
 * Created by Administrator on 2017/9/25.
 */
define(['jquery','template','util','uploadFile','jcrop','form'],function($,template,util){
    util.getLightHigh('/course/add');
    //获取课程ID
    var csId=util.getId('cs_id');
    console.log(csId);
    //渲染页面
    $.ajax({
        url:'/api/course/picture',
        type:'get',
        dataType:'json',
        data:{
            cs_id:csId
        },
        success:function(data){
            if(data.code==200){
                var html=template('picTpl',data.result);
                $('#picInfo').html(html);
                //选中图片
                var img= $('.preview img');
                var  nowCrop=null;//保证裁切实例的唯一性
                //处理图片上传操作
                $('#myfile').uploadify({
                    width:80,
                    height:'auto',
                    buttonText:'选择图片',
                    itemTemplate:'<span></span>',
                    buttonClass:'btn btn-success btn-sm',
                    swf:'/public/assets/uploadFile/uploadify.swf',
                    uploader:'/api/uploader/cover',
                    formData:{cs_id : csId},//这是传递的额外的参数
                    fileObjName:'cs_cover_original',
                    onUploadSuccess:function(a,b){
                        console.log(b);
                        var obj = JSON.parse(b);
                        $(".preview img").attr('src',obj.result.path);
                        cropImage();
                        $('#cropBtn').text('保存图片').attr('data-flag',true)

                    }
                });
                //处理裁切功能
                 $('#cropBtn').click(function(){
                    var flag=$(this).attr('data-flag');
                    //装备是保存图片
                    if(flag){
                        console.log('dubmit');
                        $('#cropForm').ajaxSubmit({
                            type:'post',
                            url:'/api/course/update/picture',
                            data:{cs_id:csId},
                            dataType:'json',
                            success:function(data){
                                console.log(data);
                                if(data.code==200){
                                    location.href='/course/lesson?cs_id='+data.result.cs_id;
                                }
                            }
                        })
                    }else{
                        //第一次点击按钮
                        $(this).text('保存图片').attr('data-flag',true);
                        cropImage();
                    }
                });
                //封装一个裁切的方法
                function cropImage(){
                    img.Jcrop({
                        aspectRatio: 2,
                        boxWidth:400
                        //setSelect:[100,100,200,100]
                    },function(){
                        //第一次调用没有nowCrop
                       nowCrop && nowCrop.destroy();
                        nowCrop=this;
                        //显示缩略图 控制缩略图的宽高以及显示位置
                        this.initComponent('Thumbnailer',{width : 240,height : 120,mythumb:'.thumb'});
                        $('.jcrop-thumb').css({
                            left:0,
                            top:0
                        });
                        //获取图片的宽高
                        var width=this.ui.stage.width;
                        var height=this.ui.stage.height;
                        console.log(width);
                        console.log(height);
                        ////计算坐标
                        var x=0;
                        var y=(height-width/2)/2;
                        var w=width;
                        var h=width/2;
                        console.log(x, y, w, h);
                        ////创建一个选取区
                        this.newSelection();
                        this.setSelect([x,y,w,h]);
                        //监控选取的变化
                        img.parent().on('cropstart cropmove cropend',function(a,b,c){
                            console.log(1);
                            console.log(c);
                            //选取完成之后把对应得坐标数据填充到表单里
                            var ainput=$('#cropForm input');
                            ainput.eq(0).val(c.x);
                            ainput.eq(1).val(c.y);
                            ainput.eq(2).val(c.w);
                            ainput.eq(3).val(c.h);
                        });
                    });

                }

            }
        }
    })
});