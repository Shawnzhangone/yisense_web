/**
 * Created by admin on 2019/5/27.
 */
var t,n,m;//定时器
$(function(){
    var p = $('#popupId');
    var navLi=$('.navLink') //此处填写你的导航html对象
    var windowUrl=window.location.href.slice(27); //获取当前url链接
    navLi.each(function(){
        var href=$(this).attr('href');
        if(href==windowUrl){
            $(this).addClass('active');  //添加当前位置样式
        }
    });
    $('#img').hover(function () {
        t = setTimeout(function () {
            mOver();
        },200)
    },function () {
        clearTimeout(t)
    });
    $('#img').mouseleave(function () {
        if(!p.is(':hidden')){
            n = setTimeout(function () {
                p.hide();
            },500);
        }
    });
    p.mouseenter(function () {
        clearTimeout(n);
        m = setTimeout(function () {
            p.show();
        },500)
    });
    p.mouseleave(function () {
        p.hide();
        clearTimeout(m);
    })
    $.ajax({  //获取用户信息
        type: "post",
        url: "/home/user/getBaseInfo",
        data: null,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            if (res.status == 200) {
                $(".phonenum").html(res.data.nickname);
                $(".nick-name").html(res.data.nickname);
                localStorage.setItem('nickName', res.data.nickname)
                if(res.data.avatar){
                    localStorage.setItem('avatar', res.data.avatar)
                    $(".userimg").attr("src",res.data.avatar);
                    $(".userHeader").attr("src",res.data.avatar);
                }else{
                    localStorage.setItem('avatar', 'https://mps.essocial.com.cn/home/assets/i/header.png')
                }
                $(".islogin").show();
                $(".unlogin").hide();
                getProgramId();
            } else {
                console.log(res.status, '400')
                $(".islogin").hide();

                $(".unlogin").show();
            }
        },
        error: function (res) {
            $(".islogin").hide();
            $(".unlogin").show();
            console.log('error', res)
        }

    })

})
/*
 获取账户拥有的小程序id
 * */
function getProgramId() {
    $.ajax({
        type: "post",
        url: "/home/applet_message/index",
        data: null,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            if(res.status == 200){
                let data = res.data;
                let array = [];
                for(let i in data){
                    array.push(data[i].program_code)
                }
                let arr = JSON.stringify(array)
                $.ajax({  //通过小程序id获取小程序未读消息
                    type: "post",
                    url: "/home/applet_message/totalquery",
                    data: {'program_id_array':arr},
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (re) {
                        console.log(arr)
                        if(re.status == 200){
                            let mdata = re.data;
                            if(mdata.number == 0){
                                $('.redCircle').hide();
                            }else if(mdata.number >= 0) {
                                $('.redCircle').show();
                                let allcount = 0;
                                for(let n in mdata.count){
                                    if (mdata.count[n]!=0){
                                        allcount += parseInt(mdata.count[n])
                                        $('#popupId').append(''+
                                            '<div class="clearBoth"></div>'+
                                            '<div class="popupMsg">'+
                                            '<a href="javascript:;" class="programNm" data-id="'+data[n].program_code +'" onclick="chooseprogramcms.call(this)"><p class="p1">'+data[n].name+'</p>'+
                                            '<p class="redCircle">'+mdata.count[n] +'</p></a>'+
                                            '</div>')
                                    }
                                }
                                if(allcount){
                                    $('.allMsg').html(allcount);
                                    $('.allMsg').show()
                                }else{
                                    $('.allMsg').hide()
                                }
                            }
                        }else{
                            console.log(re.message)
                        }
                    }
                })
            }else{
                console.log(res.message)
            }
        }
    })
}
/*
 点击未读消息去小程序后台管理
 * */
function chooseprogramcms() {
    $.ajax({
        type: 'POST',
        url: '/home/page/chooseProgram',
        data: {program_code: $(this).data("id")},
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.status == 1) {
                console.log(data.message)
                window.location.href = "/cms/";
            } else if (data.status == -1) {
                window.location.href = data.url;
            }
        }
    });
}
function mOver() {
    var imgLeft = document.getElementById('img').getBoundingClientRect().left;
    var imgTop = document.getElementById('img').getBoundingClientRect().top;
    var popup =  document.getElementById('popupId');
    popup.style.display = 'block';
    popup.style.left = imgLeft+'px';
    popup.style.top = imgTop+60+'px'
}
/*
展开产品
* */
function productNav(){
    $('.productBox').toggle()
}
