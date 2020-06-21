var myreg=/^[1][3-9][0-9]{9}$/;
var count = 60
$('.tel').blur(function () {
    if (!myreg.test($(this).val())) {
        $('.tel-tip-tel').html('*手机号格式不正确')
    }else {
        $('.tel-tip-tel').html('')
    }
})
