/**
 * Created by Administrator on 2017/9/21.
 */
define(['jquery'],function($){
    return {
        getId:  function(key){
            var url=location.search;
            url=url.substr(1);
            var urlarr=url.split('&');
            var teacherId=null;
            if(urlarr){
                $.each(urlarr,function(i,item){
                    var kv=item.split('=');
                    if(kv[0]==key){
                        teacherId=kv[1];
                        return false;
                    }
                });
            }
            return teacherId;
        }
    }
});