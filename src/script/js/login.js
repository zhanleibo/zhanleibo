(function(){
    $('.rightnowsubmit').on('click',function(){
        var $name=$('.name').val();
        var $pass=$('.pass').val();
        $.ajax({
                type:'post',
                url:'http://10.31.163.88/zhanleibo/php/login.php',
                data:{
                    name:$name,
                    pass:$pass,
                },
                success:function(data){
                    if(!data){
                        alert('用户名或者密码错误');
                        $('.pass').val('');
                    }else{
                        location.href="index.html";
                       // $.cookie('name',$name,{expires:100})
                    }
                }
            });
        });
    
})();