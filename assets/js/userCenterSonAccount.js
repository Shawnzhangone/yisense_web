var dataList = []
localStorage.setItem('company_suffix', '')
var company_suffix = ''
var recordList = []
var checkboxList = ['statistics','customer','product','marketing_tool',
    'comment','order','slider','applet_message','article','goods_video','video_demo','layout','map','form','distributor', 'floating', 'image_list', 'meal']
$('.son_account').click(function () {
    // $('.mps_permission_list input[value="statistics"]').prop('checked', true)
    // $('.mps_permission_list input[value=1]').prop('checked', true)
    // $('#statistics').show()
    $('.sonAccount').children().map(function (index,el) {
        index > 0 && $(el).hide()
        index === 0 && $(el).show()
        $('.more_store').children().remove()
    })
    getAccountList()
})
function getAccountList(){
    dataList = []
    var $o = $('#order_son_account')
    $o.children().remove()

    $.ajax({
        url:'/home/sub_account/index',
        method: 'post',
        success:function (res) {
            if(res.status === 200){
                $('.sonAccountNum').html(res.data.account_count)
                dataList = res.data.list
                window.localStorage.setItem('company_suffix','@'+dataList[0].account.split('@')[1])
                company_suffix = localStorage.getItem('company_suffix')
                for (var i = 0; i < dataList.length; i++) {
                    $o.append(`<tr><td>`+
                        dataList[i].account+`</td><td>`+
                        dataList[i].name+`</td><td>`+
                        dataList[i].program_name+`</td><td>`+
                        dataList[i].program_name+`</td><td>`+
                        `<span class="handel_span" onclick="wxBind.call(this)" data-id="`+dataList[i].id+
                        `" data-index="`+i+`">${dataList[i].is_bind?'解绑':'绑定'}</span>`+
                        `<span class="handel_span" onclick="editClick.call(this)" data-id="`+dataList[i].id+`">编辑</span>`+
                        `<span class="handel_span" onclick="authorizeClick.call(this)" data-id="`+dataList[i].id+`">授权</span>`+
                        `<span class="handel_span" onclick="useClick.call(this)" data-id="`+dataList[i].id+
                        `" data-status="`+dataList[i].is_use+`" data-index="`+i+`">${dataList[i].is_use?'停用':'启用'}</span>`+
                        `<span class="handel_span" onclick="resetClick.call(this)" data-id="`+dataList[i].id+`">重置密码</span>`+
                        `</td></tr>`)
                }
            }
        }
    })
}
function editClick(){ //编辑
    var id = $(this).data('id')
    $('.i_suffix').html(company_suffix)
    $.ajax({
        url:'/home/sub_account/read',
        method: 'post',
        data:{sub_account_id: id},
        success:function (res) {
            if(res.status === 200) {
                $('#son_edit_account').val(res.data.account.split('@')[0])
                $('#son_edit_name').val(res.data.name)
                $('#account_id').html(res.data.id)
            }
        }
    })
    $('.son_account_index').hide()
    $('.edit_info').show()
}
var mpsList = [] //小程序列表
var sub_account_id //小程序账号id
var program_code //小程序id
var shop_id //多商家店铺id

//授权
function authorizeClick() {
    sub_account_id = $(this).data('id')
    $('.son_account_index').hide()
    $('.authorize').show()
    $('.more_store').children().remove()
    $.ajax({
        url: '/home/sub_permission/index',
        method: 'post',
        success:function (res) {
            if(res.status === 200){
                $('.mps_list').children().remove()
                mpsList = res.data
                program_code = mpsList[0].program_code
                for (let i = 0; i < mpsList.length; i++) {
                    if(i===0){
                        $('.mps_list').append(`<p class="mps_item_active" onclick="choiceMps.call(this)" data-id="`
                            +mpsList[0].program_code+`" data-index="`+i+`">`+mpsList[0].name+`</p>`)
                        if(mpsList[0].shops.length){
                            shop_id = mpsList[0].shops[0].shop_id
                            console.log(shop_id,'设置')
                            $m_s = $('.more_store')
                            $m_s.show()
                            $m_s.children().remove()
                            $m_s.append(`<span>连锁多商家:</span>`)
                            for (var j = 0; j < mpsList[0].shops.length; j++) {
                                $m_s.append(`<label><input type="radio" data-id="`+mpsList[0].shops[j].shop_id+`" name="more_store" value="`+
                                    mpsList[0].shops[j].shop_id+`" onclick="choiceMoreStore.call(this)" ${j===0?'checked':''}>`+mpsList[0].shops[j].shop_name+`</label>`)
                            }
                            getPermission(program_code, sub_account_id, mpsList[0].shops[0].shop_id)
                        }else {
                            shop_id = null
                            getPermission(program_code, sub_account_id, '')
                        }
                    }else {
                        $('.mps_list').append(`<p onclick="choiceMps.call(this)" data-id="`
                            +mpsList[i].program_code+`" data-index="`+i+`">`+mpsList[i].name+`</p>`)
                    }
                }
            }
        }
    })
}
//获取权限列表
var permissionList = []
function getPermission(program_code, sub_account_id, shop_id) {
    permissionList = []
    $('.mps_permission_list .display_none').hide()
    $('.mps_permission_list  input').checked = false
    $.ajax({
        url: '/home/sub_permission/indexAuth',
        method: 'post',
        data:{program_code, sub_account_id, multi_merchant_shop_id:shop_id},
        success:function (res) {
            if(res.status === 200){
                permissionList = res.data
                if(res.data.length === 0){
                    $('.hideall').hide()
                }else{
                    $('.hideall').show()
                    for(var i in res.data){
                        if(res.data.hasOwnProperty(i)){
                            $(`#${i}`).show()
                            for(var j in res.data[i]){
                                if(res.data[i].hasOwnProperty(j)){
                                    if(i === 'marketing_tool'){
                                        $(".mps_permission_list input:checkbox[value='"+j+"']").parent().show()
                                    }
                                    if(res.data[i][j]){
                                        $(".mps_permission_list input:checkbox[value='"+j+"']").prop('checked', true)
                                    }else{
                                        $(".mps_permission_list input:checkbox[value='"+j+"']").prop('checked', false)
                                    }
                                }
                            }
                        }
                    }
                }
                // return res.data
                console.log(permissionList)
            }
        }
    })
}
//权限保存
$('#mps_permission_save').click(function () {
    $('.more_store').children().remove()
    for (var i in permissionList){
        for(var j in permissionList[i]){
            if($(".mps_permission_list input:checkbox[value='" + j + "']").prop('checked')){
                permissionList[i][j] = 1
            }else{
                permissionList[i][j] = 0
            }
        }
        // $(".mps_permission_list input:checkbox[name='"+i+"']").each(function () {
        //         //     console.log(permissionList[i].hasOwnProperty($(this).val()))
        //         //     if(permissionList[i].hasOwnProperty($(this).val())){
        //         //         if($(this).prop('checked')){
        //         //             permissionList[i][$(this).val()] = 1
        //         //         }else {
        //         //             permissionList[i][$(this).val()] = 0
        //         //         }
        //         //     }
        //         // })
    }
    // console.log(permissionList)
    console.log(shop_id,'保存')
    $.ajax({
        url: '/home/sub_permission/edit',
        method: 'post',
        data:{
            program_code,sub_account_id,permission_list:permissionList,multi_merchant_shop_id:shop_id
        },
        success:function (res) {
            if(res.status === 200){
                alert('权限修改成功')
                $('.son_account').click()
            }
        }
    })
})
// function changeStatus(list) {
//     for (var i in list){
//         $(".mps_permission_list input:checkbox[value='"+i+"']").each(function () {
//             console.log($(this).checked())
//         })
//     }
// }
//选择小程序
function choiceMps(){
    var id = $(this).data('id')
    var index = $(this).data('index')
    // console.log(id, 'id\n', index, 'index')
    $m = $('.mps_list p')
    $m_s = $('.more_store')

    $m_s.children().remove()
    program_code = id
    $m.eq(index).addClass('mps_item_active')
    $m.eq(index).siblings().removeClass('mps_item_active')
    for (var i = 0; i <checkboxList.length ; i++) {
        checkedAll(checkboxList[i], false)
    }
    if(mpsList[index].shops.length){
        shop_id = mpsList[index].shops[0].shop_id
        $m_s.show()
        $m_s.append(`<span>连锁多商家:</span>`)
        for (var j = 0; j < mpsList[index].shops.length; j++) {
            $m_s.append(`<label><input type="radio" data-id="`+mpsList[index].shops[j].shop_id+`" name="more_store" value="`+
                mpsList[index].shops[j].shop_id+`" onclick="choiceMoreStore.call(this)">`+mpsList[index].shops[j].shop_name+`</label>`)
        }
    }else{
        $m_s.hide()
        shop_id = null
        $m_s.children().remove()
    }
    getPermission(program_code,sub_account_id,shop_id)
}
//多商家选择
function choiceMoreStore() {
    shop_id = $(this).data('id')
    getPermission(program_code,sub_account_id,shop_id)
}
var itemId, itemStatus, itemIndex
function useClick() { // 启用/停用
    itemStatus = $(this)[0].dataset.status
    itemId = $(this)[0].dataset.id
    itemIndex = $(this)[0].dataset.index
    if(itemStatus == 1) {
        $('.use_unUse_text').html('确定停用此员工？')
    }else {
        $('.use_unUse_text').html('确定启用此员工？')
    }
    $('#use_unUse').modal({
        relatedTarget: this,
        closeOnConfirm: false,
        onConfirm:function () {
            var that = this
            $.ajax({
                url: '/home/sub_account/isUse',
                method: 'post',
                data:{id: itemId,isUse:dataList[itemIndex].is_use>0?0:1},
                success:function (res) {
                    if(res.status === 200){
                        getAccountList()
                        alert(res.message)
                        that.close()
                    }
                }
            })
        }
    })
}
//重置密码
var regPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
function resetClick() {
    var id = $(this).data('id')
    $('#son_reset_pwd').modal({
        relatedTarget: this,
        closeOnConfirm: false,
        onConfirm:function (e) {
            var that = this
            var $son_tip = $('.son_pwdTip')
            var $son_tip1 = $('.son_pwdTip1')
            // console.log(e.data[0])
            if(!regPwd.test(e.data[0])){
                $son_tip.show()
                $son_tip.html('*请输入长度8-16位且必须包含大小写字母和数字的密码')
                return 0
            }else {
                $son_tip.hide()
                $son_tip.html('')
            }
            if(e.data[0] !== e.data[1]) {
                $son_tip1.show()
                $son_tip1.html('*两次输入不一致')
                return 0
            }else {
                $son_tip1.hide()
                $son_tip1.html('')
            }
            $.ajax({
                url: '/home/sub_account/resetPassword',
                method:'post',
                data:{
                    id,
                    password: e.data[0]
                },
                success:function (res) {
                    if(res.status === 200){
                        $('#son_reset_pwd1').val('')
                        $('#son_reset_pwd2').val('')
                        alert('修改成功')
                        that.close()
                    }else{
                        alert(res.message)
                    }
                }
            })
        },
        onCancel:function () {
            this.close()
        }
    })
}

//新建子账号
$('.buildSon').click(function () {
    let company_suffix = localStorage.getItem('company_suffix')
    if(!company_suffix){
        alert('请先设置账号后缀')
    }else{
        $('.son_account_index').hide()
        $('.fill_info').show()
        $('#i_suffix').html(company_suffix)
    }
})
//  微信绑定/解绑
function wxBind() {
    let id = $(this).data('id')
    let index = $(this).data('index')
    // console.log(index, 'index')
    window.localStorage.setItem('wx_bind_sub_account_id', id)
    if(dataList[index].is_bind){
        //解绑
        $('.use_unUse_text').html('确定解绑此员工？')
        $('#use_unUse').modal({
            relatedTarget: this,
            closeOnConfirm: false,
            onConfirm:function () {
                $.ajax({
                    url:'/home/Sub_wechat/unbind',
                    method:'post',
                    data:{sub_account_id: id},
                    success:function (res) {
                        if(res.status === 200){
                            alert('解绑成功')
                            getAccountList()
                        }else {
                            alert(res.message)
                        }
                    }
                })
            }
        })

    }else{
        //绑定
        var hostname = window.location.hostname, appid
        if(hostname === 'mps.essocial.win'){
            appid = 'wx8bfcb15e98b0a22c'
        }else if(hostname === 'mps.essocial.com.cn'){
            appid = 'wx755ee3c39112a6b1'
        }
        var obj = new WxLogin({
            id: 'wechat_code',
            appid: appid,
            scope: 'snsapi_login',
            redirect_uri: BASE_URL + '/home/user/usercenter.html',
            state: '',
            style: 'black',
            href: ''
        })
        $('#bind_wx').modal({
            relatedTarget: this,
            closeOnConfirm: false,
            onConfirm:function (e) {
                var that = this
                that.close()
            },
            onCancel:function () {
            }
        })
    }
}
//绑定微信
$(function () {
    let code
    let url = window.location.href.split('?')
    localStorage.setItem('company_suffix', '')
    // console.log(url)
    if(url.length > 1){
        url.forEach(val => {
            val.split('&').forEach(va => {
                if (va.split('=')[0] === 'code') {
                    code = va.split('=')[1]
                }
            })
        })
    }
    // console.log(code)
    if(code){
        window.history.pushState({}, 0, url[0])
        $('.first-nav').removeClass('am-active')
        $('.my_upro').removeClass('am-active')
        $('.son_account').addClass('am-active')
        $('.sonAccount').addClass('am-active')
        let sub_account_id = window.localStorage.getItem('wx_bind_sub_account_id')
        $.ajax({
            url: '/home/Sub_wechat/bind',
            method: 'get',
            data:{code, sub_account_id},
            success:function (res) {
                if(res.status === 200){
                    alert('绑定成功')
                    getAccountList()
                }else{
                    alert(res.message)
                }
            }
        })
    }


})
//关闭微信绑定弹窗
$('.close_wx_bind').click(function () {
    $('#bind_wx').modal('close')
})
//设置后缀
$('.settingSuffix').click(function(){
    var $f = $('#suffix')
    $.ajax({
        url: '/home/sub_company/read',
        method: 'post',
        success:function (res) {
            if(res.data.company_suffix){
                localStorage.setItem('company_suffix', res.data.company_suffix)
                $f.val(res.data.company_suffix)
            }
        }
    })

    $('#my_set_suffix').modal({
        relatedTarget: this,
        closeOnConfirm: false,
        onConfirm:function(){
            var that = this
            let suffixReg = /^@([a-zA-Z0-9_-]){3,9}/
            if(suffixReg.test($f.val())){
                $.ajax({
                    url: '/home/sub_company/save',
                    method: 'post',
                    data: {company_suffix: $f.val()},
                    success:function (res) {
                        if(res.status ===200){
                            alert('成功')
                            localStorage.setItem('company_suffix', $f.val())
                            that.close()
                        }else{
                            alert(res.message)
                        }
                    }
                })
            }else{
                alert('后缀格式错误')
            }
        },
    })
})
//操作记录
$('.handelRecord').click(function () {
    $('.son_account_index').hide()
    $('.handel_record').show()
    $("#pager2").zPager({
        url:'/home/sub_account/getOperationalRecords',
        btnShow: false,
        dataRender: function(re){
            var $w = $('#wraper')
            $w.empty()
            if(re.length){
                for (var i = 0; i < re.length; i++) {
                    $w.append(`<tr><td>`+re[i].sub_account_name+`</td><td>`+re[i].program_name+`</td><td>`+re[i].create_time+`</td><td class="td_left">`+re[i].name+`</td></tr>`)
                }
            }
            // console.log(JSON.stringify(data)+'---data-2');
        }
    });
    // getRecordList()
})
//操作记录搜索
$('#search_record').click(function () {
    var keyword = $('#search_name').val()
    var start = $('#picker_date2').val()
    var end = $('#picker_date3').val()
    if(start && !end){
        alert('请选择结束日期')
        return
    }
    if(!start && end){
        alert('请选择开始日期')
        return
    }
    if(new Date(start).getTime() > new Date(end).getTime()){
        alert('开始日期不能在结束日期之后')
        return
    }
    var obj = {
        keyword_type: 'sub_account_name',
        keyword,
        date: [start, end]
    }
    $("#pager2").zPager({
        url:'/home/sub_account/getOperationalRecords',
        btnShow: false,
        postData: obj,
        dataRender: function(re){
            console.log(re,'搜索')
            var $w = $('#wraper')
            $w.empty()
            if(re.length){
                for (var i = 0; i < re.length; i++) {
                    $w.append(`<tr><td>`+re[i].sub_account_name+`</td><td>`+re[i].program_name+`</td><td>`+re[i].create_time+`</td><td class="td_left">`+re[i].name+`</td></tr>`)
                }
            }
            // console.log(JSON.stringify(data)+'---data-2');
        }
    });
    // getRecordList(obj)
})
function getRecordList(obj){
    var $r = $('#wraper')
    $r.empty()
    $.ajax({
        url: '/home/sub_account/getOperationalRecords',
        method: 'post',
        data: obj,
        success: function (res) {
            if(res.status === 200){
                var re = res.data.data
                if(!re.length) return
                for (var i = 0; i < re.length; i++) {
                    $r.append(`<tr><td>`+re[i].sub_account_name+`</td><td>`+re[i].program_name+`</td><td>`+re[i].create_time+`</td><td class="td_left">`+re[i].name+`</td></tr>`)
                }
            }
        }
    })
}
$('.son-btn-cancel').click(function () {
    // $($('.sonAccount').children()[0]).show()
    $('.sonAccount').children().map(function (index,el) {
        index > 0 && $(el).hide()
        index===0 && $(el).show()
    })
    getAccountList()
})

//新建账号验证
// function telCheck(){
//     var myreg=/^[1][3-9][0-9]{9}$/
//     if(myreg.test($('#son_mobile').val())){
//         $('.fill_info_tip').eq(0).html('')
//         return true
//     }else{
//         $('.fill_info_tip').eq(0).html('请输入正确的手机号')
//         return false
//     }
// }
function pwd1Check(){
    if(regPwd.test($('#son_pwd1').val())){
        $('.fill_info_tip').eq(1).html('')
        return true
    }else{
        $('.fill_info_tip').eq(1).html('*请输入长度8-16位且必须包含大小写字母和数字的密码')
        return false
    }
}
function pwd2Check(){
    if($('#son_pwd1').val() === $('#son_pwd2').val()){
        $('.fill_info_tip').eq(2).html('')
        return true
    }else {
        $('.fill_info_tip').eq(2).html('*两次密码输入不一致')
        return false
    }
}
$('#son_save_fill_info').click(function () {
    //新建账号保存
    if(pwd1Check()&&pwd2Check()){
        $.ajax({
            url: '/home/sub_account/save',
            method: 'post',
            data:{
                name: $('#son_name').val(),
                account: $('#son_mobile').val(),
                password: $('#son_pwd1').val()
            },
            success:function (res) {
                if(res.status === 200) {
                    alert('账号新增成功')
                    $('.son_account').click()
                    $('#son_name').val('')
                    $('#son_mobile').val('')
                    $('#son_pwd1').val('')
                    $('#son_pwd2').val('')
                }else{
                    alert(res.message)
                }
            }
        })
    }

})
$('#son_save_edit_account').click(function () {
    //编辑账号保存
    $.ajax({
        url: '/home/sub_account/update',
        method: 'post',
        data:{
            id: $('#account_id').html(),
            account: $('#son_edit_account').val(),
            name: $('#son_edit_name').val()
        },
        success:function (rs) {
            if(rs.status === 200) {
                alert('修改成功')
                $('.son_account').click()
                // $('.son-btn-cancel').click()
            }
        }
    })
})
//显示子账号主界面
function showIndex(){

}
$('.am-datepicker-date2').hover(function () {
    if($('#picker_date2').val())  $('.cancelDate2').show()
},function () {
    $('.cancelDate2').hide()
})
$('.cancelDate2').click(function () {
    $('#picker_date2').val(' ')
    setTimeout(function () {
        $('.cancelDate2').hide()
    },100)
})


//全选按钮
function changeAll(){
    for (var i = 0; i < checkboxList.length ; i++) {
        if($(this)[0].checked){
            checkedAll(checkboxList[i], true)
        }else{
            checkedAll(checkboxList[i], false)
        }
    }
}
// 全选/取消全选
function checkedAll(name, status) {
    $("input:checkbox[name='"+name+"']").each(function () {
        $(this).prop('checked', status)
    })
}
