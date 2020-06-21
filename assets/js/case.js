/**
 * Created by admin on 2019/1/11.
 */
$(function () {
    getAllTypesCase();
    getTypeCase();
});
//获取所有案列分类
function getAllTypesCase() {
    $.ajax({
        type:'post',
        url:'/home/industry_type/choicequery',
        data:null,
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success(res){
            if(res.status == 200){
                let data = res.data;
                for(let i in data){
                    $('#caseType').append('<li onclick="nowItem.call(this);"><a href="javascript:;" data-id="'+ data[i].type_id +'" onclick="getTypeCase.call(this);" >'+data[i].type_name+'</a></li>')
                }
                $('#caseType > li:first-child').addClass('addck');
            }else{
                alert(res.message)
            }
        }
    })
}
let TYPEID = '';
function getTypeCase(id) {
    let type_id = id ? id : $(this).data("id");
    if(type_id == TYPEID){
        return
    }else{
        TYPEID = type_id;
        $('#a1').empty();
        $.ajax({
            type:'post',
            url:'/home/industry_case/casequery',
            data:{'type_id':type_id},
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            success(res){
                if(res.status == 200){
                    let data = res.data;
                    for(let i in data){
                        if(data[i].status == 1){
                        $('#a1').append('' +
                            '<div class="am-u-sm-3 am-u-md-4 am-u-lg-3">' +
                                '<div class="am-thumbnail" onclick="showMask.call(this)">' +
                                    '<div class="am-thumbnail-img">' +
                                        '<img src="'+data[i].picture +'" alt="">' +
                                    '</div>' +
                                    '<h3 class="am-thumbnail-caption">'+data[i].name +'</h3>' +
                                    '<div class="am-thumbnail-mask">' +
                                        '<div class="mask-img">' +
                                            '<div class="mask-img-box">' +
                                                '<img src="'+data[i].qrcode +'">' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="mask-btn " data-pid="'+data[i].case_id+'" data-status="'+data[i].status+'" onclick="useProgram.call(this)">' +
                                            '<div class="mask-shiyong">' +
                                                '<img src="/home/assets/i/cos.png" alt=""><span>&nbsp;&nbsp;使用</span>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>')
                        }else if(data[i].status == 0){
                            $('#a1').append('' +
                                '<div class="am-u-sm-3 am-u-md-4 am-u-lg-3">' +
                                '<div class="am-thumbnail" onclick="showMask.call(this)">' +
                                '<div class="am-thumbnail-img">' +
                                '<img src="'+data[i].picture +'" alt="">' +
                                '</div>' +
                                '<h3 class="am-thumbnail-caption">'+data[i].name +'</h3>' +
                                '<div class="am-thumbnail-mask">' +
                                '<div class="mask-img">' +
                                '<div class="mask-img-box">' +
                                '<img src="'+data[i].qrcode +'">' +
                                '</div>' +
                                '</div>' +
                                '<div class="mask-btn " data-pid="'+data[i].case_id+'" data-status="'+data[i].status+'" ' +
                                '<div class="mask-shiyong">' +
                                '<span>特殊定制版</span>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>')
                        }
                    }

                    //新手引导

                    if(!type_id && localStorage.getItem('nickName')){
                        $.ajax({
                            url: '/home/User/queryStatus',
                            type: 'post',
                            success:function (_res) {
                                if(_res.status === 200){
                                    if(_res.data.case_status === 0 && window.location.href.split(/home\//)[1] == 'case.html'){
                                        $('.guides').show()
                                        $('.img1').attr('src', data[1].picture)
                                        $('body').css('position', 'fixed')
                                        $('.step1').show()
                                        var offTop = $('#a1>div:nth-child(2)').offset().top
                                        var offLeft = $('#a1>div:nth-child(2)').offset().left
                                        var height = $('#a1>div:nth-child(2)').outerHeight()
                                        var width = $('#a1>div:nth-child(2)').outerWidth()
                                        $('.step1').css('top',offTop - 10)
                                        $('.step1').css('left',offLeft)
                                        $('.step1 .img1').css('height',height)
                                        $('.step1 .img1').css('width',width)
                                        $('.step1 .img2').css('top', -height)
                                        $('.step1 .img2').css('left', width)
                                        $('.step1 .step-close').css('top', -height)
                                        $('.step1 .step-close').css('left', width)
                                    }
                                }
                            }
                        })
                    }
                }else{
                    alert(res.message)
                }
            }
        })
    }
}
//关闭新手引导
function changeStatus() {
    $.ajax({
        url: '/home/User/updateStatus',
        type: 'post',
        data: {case_status: 1}
    })
}
$('.step-close').click(function () {
    $('.guides').hide()
    $('body').css('position', 'static')
    changeStatus()
})
$('.step1 .img2').click(function () {
    $('.step1').hide()
    $('.step2').show()
    var $a = $('#collapse-head>div:nth-child(2)')
    console.log($a, $a.offset().top, 'asdadad')
    $('.step2').css('top', $a.offset().top)
    $('.step2').css('left', $a.offset().left)
    $('.step2 p').css('width', $a.outerWidth)
    $('.step2 p').css('left', $a.outerHeight)
    $('.step2 p span').html(localStorage.getItem('nickName'))
    $('.step2 p img').attr('src', localStorage.getItem('avatar'))
})

// 分类点击
$('.am-breadcrumb li').click(function () {
    var _index = $(this).index();
    $(".contentDiv .am-box-list").eq(_index).show().siblings().hide();
    $(this).find('a').addClass('addck');
    $(this).siblings().find('a').removeClass('addck');
    if(_index==0){
        $('.am-box-pag').show()
    }else{
        $('.am-box-pag').hide()
    }
});
function showMask(){
    $(this).children(':last').toggle()
};
//使用案列
function useProgram() {
    var id = $(this).data("pid");
    var sta = $(this).data("status");
    $.ajax({
        type: 'POST',
        url: '/home/tokencase/catch',
        data: {case_id: id},
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            console.log(data)
            if (data.status == 200) {
                if(sta == 0){
                    // useFixed(id);  //不可编辑
                }else{
                    window.location.href = "/design/";
                }
            } else if (data.status == 400) {
                alert(data.message)
                if(data.message == '请登录'){
                    window.location.href = '/home/login';
                }
            }
        }
    });
};
//名片 原不可编辑
let pname = '',pid = '';
function useFixed() {
    //判断是否生成小程序名片，做提示
    $.ajax({
        type: 'post',
        url: '/home/program/readProgramCardWithcode',
        success(res){
            if (res.status === 200) {
                if (res.data.withcode === 1) {
                    //已生成
                    $('#myIsExport').modal({
                        relatedTarget: this,
                        closeOnConfirm:false,
                        onConfirm: function (e) {
                            creatName()
                            this.close()
                        },
                        onCancel: function (e) {
                            this.close()
                            return
                        }
                    })
                }else{
                    creatName()
                }
            }else if(res.status === 400){
                creatName()
            }
        }
    })
}
//输入小程序名称
function creatName() {
    $('#my-cprogram1').modal({
        relatedTarget: this,
        closeOnConfirm:false,
        onConfirm: function (e) {
            let dol = /[.]/g;
            if(!e.data){
                alert('请输入小程序名称')
            }else if(dol.test(e.data)){
                alert("小程序名称不能出现'.'!")
                return;
            }else {
                var that = this
                pname = e.data;
                //更新名片小程序
                $.ajax({
                    type: 'POST',
                    url: '/home/program/updateProgramCard',
                    data: {name:pname},
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (res) {
                        if(res.status == 200){
                            $('.mask-protocol-xx:eq(0)').show();
                            that.close()
                        }else{
                            alert(res.message)
                        }
                    },
                    fail:function (res) {
                        console.log(res);
                    }
                });
            }
        },
        onCancel: function (e) {
        }
    });
}

$('.mask-protocol-close-xx').click(function () {
    $('.download').empty();
    $('.mask-protocol-xx').each(function () {
        $(this).hide()
    })
});
$('#mask1cancel').click(function () {
    $('.mask-protocol-xx').hide()
});
$('#mask1sure').click(function () {
    let appIdReg = /^[0-9a-zA-Z]{18}$/,appSecretReg = /^[0-9a-zA-Z]{32}$/
    if(!appIdReg.test($('.greyi:eq(0)').val())){
        alert("请输入正确的APP ID!");
    }else if(!appSecretReg.test($('.greyi:eq(1)').val())){
        alert("请输入正确的APP密钥!");
    }else if($('#toAPP').val() != '' && !appIdReg.test($('#toAPP').val())){
        alert("请输入正确的跳转小程序APPID!");
    }else{
        $('.mask-protocol-xx:eq(0)').hide();
        $('.mask-protocol-xx:eq(1)').show();
        exportPro()
    }
});
//生成接口
function exportPro() {
    $.ajax({
        type: 'POST',
        url: '/home/program/exportCard',
        data: {appid:$('.greyi:eq(0)').val(),appsecret:$('.greyi:eq(1)').val(),toAppid:$('#toAPP').val()},
        dataType: 'json',
        success: function (data) {
            if(data.status == 200){
                $('.mask-protocol-xx:eq(1)').hide();
                $('.mask-protocol-xx:eq(2)').show();
                $("#downBox").after('<p>'+pname+'.zip</p><a class="downloadBtn" href="'+data.data.path+'" download="'+pname+'.zip">下载('+data.data.size+')</a>')
            }else{
                alert(data.message)
            }
        },
        fail:function (res) {
            console.log(res);
        }
    })
};
$('#mask2return').click(function () {
    $('.mask-protocol-xx:eq(0)').show();
    $('.mask-protocol-xx:eq(1)').hide();
})
function nowItem() {
    $('#caseType > li').removeClass('addck');
    $(this).addClass('addck');
}
