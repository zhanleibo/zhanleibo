;(function(){
    $(function(){
        // 在键盘按下并释放及提交后验证提交表单

        $("#form").validate({

            rules : {

                name : {

                    required : true,

                    minlength : 11,
                    
                isMobile: true
                ,
                remote:{
                    url:"http://10.31.163.88/zhanleibo/php/registor.php",
                    type:"post",
                    }
                },

                password : {

                    required : true,

                    minlength : 6,
                    maxlength: 20,

                },

                repass: {
                    required: true,
                    equalTo: '#password'
                },
                submit:{
                    required:true,
                }  ,

            },

            messages : {
                name : {

                    required : "请输入手机号码",

                    minlength : "手机号长度不能小于11位",

                    remote:'用户名已存在',
                    isMobile: '请填写正确的手机号码,方便接收订单通知、找回密码等',

                },

                password : {

                    required : "请输入密码",

                    minlength : "建议使用大小写字母、数字和符号两种以上的组合，6-20个字符",
                    maxlength: '长度不能大于20位',

                },

                repass: {

                    required : "请输入密码",

                    equalTo : "两次密码输入不一致"

                },
                submit:{
                    required:'错误'
                }

            }

        });
    
    
    })
        $.validator.setDefaults({
            /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
            success: function(label){
                label.text('√').css('color','green').addClass('valid');
            }
        });
     //手机号码验证

     $.validator.addMethod("isMobile", function (value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写手机号码");

        
})();