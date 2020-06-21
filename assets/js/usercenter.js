/**
 * Created by admin on 2018/11/1.
 */
var arr = [];
var arr1 = []
var image = [];
var image1 = [];
    //交易
    $(".deal_list").click(function () {
        getOrderL(1);
    })
    //获取订单详情
    function getOrderL(page) {
    $.ajax({
        type:"post",
        url:'/home/order_form/ordertransaction',
        data:{page:page},
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            if (res.status == 200) {
                var redata = res.data, data = res.data.data;
                var paymentTime = ''
                $("#deal_list").children().remove();
                $("#order_ul").children().remove();
                for(var i = 0;i < data.length;i++ ){
                    if(data[i].order_status == "待付款" || data[i].order_status == "待审核"){
                        $("#deal_list").append("<tr> <td>"+ data[i].number +"</td> <td>"+data[i].edition+"</td> <td>"+data[i].start_time+"至"+data[i].end_time+"</td> <td>"+data[i].money+"</td> <td>"+data[i].payment+"</td> <td>"+data[i].order_status+"</td> <td><button class='show_order_detail' onclick='toPay.call(this)' data-id=" + data[i].number + ">去付款</button> <button class='show_order_detail' onclick='cancelOrder.call(this)' data-number=" + data[i].number + " data-id=" + data[i].official_id + ">取消订单</button></td> </tr>")
                    }else{
                        $("#deal_list").append("<tr> <td>"+ data[i].number +"</td> <td>"+data[i].edition+"</td> <td>"+data[i].start_time+"至"+data[i].end_time+"</td> <td>"+data[i].money+"</td> <td>"+data[i].payment+"</td> <td>"+data[i].order_status+"</td> <td>"+data[i].payment_time+"</td> </tr>")
                    }
                }
                if(1< redata.current_page){
                    $("#order_ul").append(`<li id="perli"><a href="javascript:;" onclick="getOrderList.call(this)" data-page="`+(redata.current_page - 1)+`" id="per">&laquo;</a></li>`)
                }
                for(var i = 1;i <= redata.last_page; i++){
                    $("#order_ul").append(`<li class="`+(redata.current_page==i?'nowactive':'')+`" onclick="getOrderList.call(this)" data-page="`+i+`"><a href="#">`+ i +`</a></li>`)
                }
                if(redata.current_page < redata.last_page){
                    $("#order_ul").append(`<li id="nextli"><a href="javascript:;" onclick="getOrderList.call(this)" data-page="`+(redata.current_page + 1)+`" id="next">&raquo;</a></li>`)
                }
            }
        }
    });
    }
function getOrderList() {
    getOrderL($(this).data("page"))
}
    //工单
    $("#sub_new_order").click(function(){
        $("#order_list").hide();
        $("#sub_work_order").show();
    });
    $(".show_order_detail").click(function () {
        $("#order_list").hide();
        $("#order_detail").show();
    });
    $("#cancel_new_order").click(function () {
        $("#sub_work_order").hide();
        $("#order_list").show();
    });
    $(".am-tabs-nav:first li:last").click(function () {
        $("#sub_work_order").hide();
        $("#order_list").show();
        $("#order_detail").hide();
    })
    $("#return_order").click(function () {
        $("#order_detail").hide();
        $("#order_list").show();
    });
    $(".order_all").click(function () { //获取全部工单
        getOrder(null,'order_all');
    });
    $(".on_handle").click(function () { //处理中工单
        var data = {'status':1}
        getOrder(data,'on_handle');
    });
    $(".wait_reply").click(function () { //待处理工单
        var data = {'status':0}
        getOrder(data,'wait_reply');
    });
    $(".order_done").click(function () { //已完成工单
        var data = {'status':2}
        getOrder(data,'order_done');
    });
    $(".search_wo_btn").click(function () { //搜索
        var kw_type =  $('#doc-select-1').val()==1?'':$('#doc-select-1').val();
        var date = $("#picker_date")[0].value;
        $("#picker_date").val('')
        var keyword = $("#work_order_kw").val();
        var qs_ty  = $('#doc-select-2').val()==5?'':$('#doc-select-2').val();
        var data = {'keyword_type':kw_type,'keyword':keyword,'date':date, 'question_type':qs_ty};
        getOrder(data,'order_all');
    });
    var $doc = $('.selectContainer1');
    var $val = $('#doc-select-1');
    var $close = $('.closeImg1');
    $doc.hover(function () {
        if( $val.val() != 1)  $('.closeImg1').show()
    },function () {
        $close.hide()
    });
    $close.click(function () {
        $val.val(1);
        $(this).hide()
    });
    $('.selectContainer2').hover(function(){
        if( $('#doc-select-2').val() != 5){ $('.closeImg2').show() }
    },function () {
            $('.closeImg2').hide()
    });
    $('.closeImg2').click(function () {
        $('#doc-select-2').val(5);
        $(this).hide()
    })
    $('.newPhone').blur(function () {
        var tel = $('.savemobile').html()
        var _tel = tel.split('：')
        // console.log(_tel[1]);
        if ($('.newPhone').val() == _tel[1]) {
            alert('手机号不能相同，请重新输入')
            $('.newPhone').val('')
        }
    })
    $('.closeImg2').click(function () {
        $('#doc-select-2').val(5)
    })
    $('.newPhone').blur(function () {
        console.log( $('.newPhone').val());
        var tel = $('.savemobile').html()
        var _tel =tel.split('：')
        console.log(_tel[1]);
        if($('.newPhone').val() == _tel[1]){
            alert('手机号不能相同，请重新输入')
            $('.newPhone').val('')
        }
    })
    $(function() {
        function changeDate(date){
            var num
            switch (date) {
                case 'Jan':
                    num = '01'
                    break
                case 'Feb':
                    num = '02'
                    break
                case 'Mar':
                    num = '03'
                    break
                case 'Apr':
                    num = '04'
                    break
                case 'May' :
                    num = '05'
                    break
                case 'Jun':
                    num = '06'
                    break
                case 'Jul':
                    num = '07'
                    break
                case 'Aug':
                    num = '08'
                    break
                case 'Sep':
                    num = '09'
                    break
                case 'Oct':
                    num = '10'
                    break
                case 'Nov':
                    num = '11'
                    break
                case 'Dec':
                    num = '12'
                    break
            }
            return num
        }
        $('#picker_date').datepicker().
        on('changeDate.datepicker.amui', function(event) {
            var dateArr = event.date.toString().split(' ');
            var dateStr = dateArr[3] + '-' + changeDate(dateArr[1]) + '-' + dateArr[2];
            $("#picker_date").val(dateStr);
        });
    });
    $('.am-datepicker-date1').hover(function () {
        if($('#picker_date').val())  $('.cancelDate1').show()
    },function () {
        $('.cancelDate1').hide()
    })
    $('.cancelDate1').click(function () {
        $("#picker_date").val('');
        setTimeout(function () {
            $('.cancelDate1').hide()
        },100)
    })
    $("#work_order_kw").keydown(function (e) {
        if (e.which == 13) {//.which属性判断按下的是哪个键，回车键的键位序号为13
            $('.search_wo_btn').trigger("click");//触发搜索按钮的点击事件
        }
    });


    $('.choose_type_of_q').on('click', function() {  //新建工单选择类型
        $('.choose_type_of_q').removeClass("selected")
        $('.choose_type2_of_q').removeClass("selected")
        $(this).addClass("selected");
        var choose_type1 = $(this).data('type');
        $("#now_type1").html(choose_type1);
    });
    $('.choose_type2_of_q').on('click', function() {

    });
//工单--选择问题类型，改变问题
var allquestion = [
    [{name:'分割线组件',answers:[{q:'如何使用分割线组件?',id:3},{q:'分割线类型在哪里选择?',id:3},{q:'如何设置分割线的颜色、高度等？',id:3}]},
        {name:'分类列表组件',answers:[{q:'如何使用分类列表组件？',id:6},{q:'怎么添加商品分类？',id:6},{q:'如何更改商品分类名称？',id:6}]},
        {name:'分销系统组件',answers:[{q:'如何使用分销系统中心组件?',id:8},{q:'分销系统个人中心可以添加哪些组件？',id:8}]},
        {name:'购物车组件',answers:[{q:'如何使用购物车组件?',id:7}]}
    ],
    [{name:'小程序注册',answers:[{q:'小程序注册流程',id:15},{q:'小程序注册数量限制',id:15}]},
        {name:'小程序微信认证',answers:[{q:'小程序微信认证有哪些特权',id:12},{q:'小程序微信认证流程？',id:12},{q:'小程序微信认证所需材料',id:12}]},
        {name:'小程序设置',answers:[{q:'公众号关联小程序',id:20},{q:'解除关联公众号',id:20}]}
    ],
    [{name:'发票申请',answers:[{q:'如何申请发票',id:28}]},
        {name:'发票退换/修改发票信息',answers:[{q:'如何退换发票?',id:29},{q:'如何修改发票抬头?',id:31}]},
        {name:'如何申请退款',answers:[{q:'如何申请退款及退款说明?',id:61}]},
        {name:'资金流水及消费记录',answers:[{q:'如何查询消费记录?',id:27},{q:'支付超时怎么办?',id:32}]},
    ],
    [{name:'小程序侵权投诉',answers:[{q:'小程序侵权举报',id:'62'},{q:'举报小程序违规',id:'62'},{q:'小程序侵权申诉',id:'62'}]},
        {name:'版本升级',answers:[{q:'如何升级翼升小程序版本',id:33}]},
    ]

]
var typenu = '';
$('.choose_type_of_q').click(function () {
    var type = $(this).data('type');
    $('.type2_choose_box').children('.item').remove();
    switch (type) {
        case '技术类':
            typenu = 2;
            for(var i=0;i<allquestion[0].length;i++){
                $('.type2_choose_box').append(' <li class="item choose_type2_of_q" onclick="chooseType2(0,'+i+',this)">'+allquestion[0][i].name +' </li>')
            }
            chooseType2(0,0);
            break;
        case '运营类':
            typenu = 3;
            for(var i=0;i<allquestion[1].length;i++){
                $('.type2_choose_box').append(' <li class="item choose_type2_of_q" onclick="chooseType2(1,'+i+',this)">'+allquestion[1][i].name +' </li>')
            }
            chooseType2(1,0);
            break;
        case '财务类':
            typenu = 1;
            for(var i=0;i<allquestion[2].length;i++){
                $('.type2_choose_box').append(' <li class="item choose_type2_of_q" onclick="chooseType2(2,'+i+',this)">'+allquestion[2][i].name +' </li>')
            }
            chooseType2(2,0);
            break;
        case '其他问题':
            typenu = 0;
            for(var i=0;i<allquestion[3].length;i++){
                $('.type2_choose_box').append(' <li class="item choose_type2_of_q" onclick="chooseType2(3,'+i+',this)">'+allquestion[3][i].name +' </li>')
            }
            chooseType2(3,0);
            break;
    }
});

function chooseType2(t,ind,e){//选择问题，切换热门答案
    console.log("type2")
    $('.choose_type2_of_q').removeClass("selected")
    $(e).addClass("selected");
    var choose_type2 = $(e).text();
    $("#now_type2").html(choose_type2);
    $("#hotanswer").children(".item").remove();
    var answer = allquestion[t][ind].answers;
    for (var i = 0;i < answer.length; i ++){
        $("#hotanswer").append('<li class="item hot_answer_of_q"><a href="/home/help/doc.html?id='+answer[i].id+'">'+answer[i].q+'</a></li>')
    }
}

//修改头像
$('.userHeader').click(function () {
    $('.changeHeaderImg').trigger('click')
})
$('.changeHeaderImg').change(function () {
    var files = []
    for (let k=0;k<this.files.length;k++){
        files.push(this.files[k])
    }
    // console.log(files)
    $.each(files, function () {
        var fd = new FormData()
        if(!(this.type == 'image/png'||this.type == 'image/jpeg'||this.type == 'image/gif')){
            alert('头像只支持png，jpg，gif格式图片')
            return
        }
        if(this.size < 1024 * 1024) {
            fd.append('image', files[0])
            $.ajax({
                url:'/home/upload/index',
                type:'post',
                data:fd,
                dataType:'file',
                processData : false,
                contentType : false,
                async:false,
                complete:function (res) {
                    var resArr = JSON.parse(res.responseText)
                    if(resArr.status == 200) {
                        $.ajax({
                            url: '/home/user/updateAvatar',
                            data: {avatar: resArr.data.image_url},
                            type: 'post',
                            success:function () {
                                $('.userHeader').attr('src',resArr.data.image_url)
                                $('.userimg').attr('src',resArr.data.image_url)
                            },
                            fail:function () {
                                alert('头像修改失败，请重试')
                            }
                        })
                    }
                }
            })
        }else {
            alert('请选择大小不超过 2M 的图片！')
        }
    })

})
   //提交工单
    $("#order_sub").submit(function () {
        var type1 = $("#now_type1").html();
        var type2 = $("#now_type2").html();
        var title = $("#new_worder_title").val();
        var describe = $("#new_worder_des").val();
        if(type1 == ''){
            alert('问题类型不能为空')
            return;
        }else if(title == ''){
            alert('工单标题不能为空')
            return;
        }else if(describe == ''){
            alert('问题描述不能为空')
            return;
        }else{
            if(image){
                console.log(image)
                var data = {"question_type":typenu,"title":title,"describe":describe,"file_arr":image};
                subNewOrder(data);
            }else{
                var data = {"question_type":typenu,"title":title,"describe":describe,"file_arr":""};
                subNewOrder(data);
            }
        }

    });

    $('#doc-form-file').click(function () {
        let Dfile = document.getElementsByClassName('upload-files')
        if (Dfile.length >= 5) {
            $('#doc-form-file').attr("disabled","disabled")
            $('#doc-form-file').css("z-index","-1")
        }
    })
    $('#btn111').click(function () {
        let Dfile = document.getElementsByClassName('upload-files')
        if (Dfile.length >= 5){
            alert('最多上传五个附件')
        }else{
            $('#doc-form-file').css("z-index","20")
            $('#doc-form-file').removeAttr("disabled")
        }
    })
    $('#doc-form-file1').click(function () {
        let Dfile = document.getElementsByClassName('upload-files1')
        if (Dfile.length >= 5) {
            $('#doc-form-file1').attr("disabled","disabled")
            $('#doc-form-file1').css("z-index","-1")
        }
    })
    $('#btn222').click(function () {
        let Dfile = document.getElementsByClassName('upload-files1')
        if (Dfile.length >= 5){
            alert('最多上传五个附件')
        }else{
            $('#doc-form-file1').css("z-index","20")
            $('#doc-form-file1').removeAttr("disabled")
        }
    })

    $('#doc-form-file').change(function (e){
        // console.log(this.files, 'files')
        let files = [];
        for (let k=0;k<this.files.length;k++){
            files.push(this.files[k])
        }
        for(let i=0;i<=arr.length;i++){
            for(let j=0;j<files.length;j++){
                if(arr[i]==files[j].name){
                    files.splice(j,1)
                }
            }
        }
        if(!files.length){
            alert('已上传此文件，请重选');
            $('#doc-form-file').val('');
            return false
        }
        let dMessage = document.getElementById('file-list');
        let fd = new FormData(), nameArr = []
        $.each(files, function () {
            if(this.size < 1024*2024){
                arr.push(this.name);
                nameArr.push(this.name)
                fd.append('image[]',this);
            }else{
                alert('文件大小过大，请重选')
                $('#doc-form-file').val('');
            }
        });
        $.ajax({
            url:'/home/upload/much',
            type:'post',
            data:fd,
            dataType:'file',
            processData : false,
            contentType : false,
            async:false,
            complete: function (res) {
                let resArr = JSON.parse(res.responseText)
                if(resArr.status==200){
                    let img = resArr.data.image_url;
                    img.forEach(function (item, index) {
                        image.push(img)
                        let fileNames = '<div class="am-badge-div">' +
                            '<img class="deleFile" style="height: 50px;" src=" ' + item +' ">' +
                            '<p><span>'+nameArr[index]+'</span><span style="margin-left: 10px" class="upload-files" onclick="deleFile(this)">删除</span></p></div>';
                        $('#file-list').html(dMessage.innerHTML + fileNames);
                    })
                }else{
                    alert(resArr.message)
                }
                $('#doc-form-file').val('');
            },
        })
    });
    $('#doc-form-file1').change(function (e){
        let files = [];
        for (let k=0;k<this.files.length;k++){
            files.push(this.files[k])
        }
        for(let i=0;i<=arr1.length;i++){
            for(let j=0;j<files.length;j++){
                if(arr1[i]==files[j].name){
                    files.splice(j,1)
                }
            }
        }
        if(!files.length){
            alert('已上传此文件，请重选');
            $('#doc-form-file').val('');
            return false
        }
        let dMessage = document.getElementById('file-list1');
        // let fileNames = '';
        $.each(files, function (index) {
            let fd = new FormData();
            if(this.size < 1024*2024){
                var that = this
                arr1.push(this.name)
                fd.append('image', files[index]);
                $.ajax({
                    url:'/home/upload/index',
                    type:'post',
                    data:fd,
                    dataType:'file',
                    processData : false,
                    contentType : false,
                    async:false,
                    complete: function (res) {
                        let resArr = JSON.parse(res.responseText)
                        if(resArr.status==200){
                            let img = resArr.data.image_url;
                            image1.push(img)
                            var fileNames = '<div class="am-badge-div">' +
                                '<img class="deleFile" style="height: 50px;" src=" ' + img +' ">' +
                                '<p><span>'+that.name+'</span><span style="margin-left: 10px" class="upload-files1" onclick="deleFile1(this)">删除</span></p></div>';
                            $('#file-list1').html(dMessage.innerHTML + fileNames);
                        }else{
                            alert(resArr.message)
                        }
                        $('#doc-form-file1').val('');
                    },
                })
            }else{
                alert('文件大小过大，请重选')
                $('#doc-form-file1').val('');
            }
        });
    });

    $("#wodetail_sub").submit(function(){
        var des = $("#fade_back_t").val();
        var num =  $("#worder_num").html();
        if(des == ''){
            alert('留言不能为空')
            return;
        }else{
            if(image1){
                var data = {"dialogue_details": des,"number": num,"file_arr": image1 };
                subOrder(data,des);
            }else{
                var data = {"dialogue_details": des,"number": num,"file_arr": "" };
                subOrder(data,des);
            }
        }
    });
    function getOrder(sdata,id) { //获取工单
        $.ajax({
            type:"post",
            url:'/home/work_order/index',
            data:sdata,
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                if (res.status == 200) {
                    var data = res.data.data
                    $("#"+id+"").children().remove();

                        for(var i = 0;i < data.length;i++ ){
                            if(data[i].status == "已结单"){
                                $("#"+id+"").append("<tr> <td>"+ data[i].number +"</td> <td>"+data[i].create_time+"</td> <td>"+data[i].title+"</td> <td>"+data[i].question_type+"</td> <td>"+data[i].describe+"</td> <td>"+data[i].status+"</td> <td> <button class='show_order_detail' onclick='toOrderDetail.call(this)' data-id=" + data[i].number + ">详情</button> </td> </tr>")
                            }else{
                                $("#"+id+"").append("<tr> <td>"+ data[i].number +"</td> <td>"+data[i].create_time+"</td> <td>"+data[i].title+"</td> <td>"+data[i].question_type+"</td> <td>"+data[i].describe+"</td> <td>"+data[i].status+"</td> <td> <button class='show_order_detail' onclick='toOrderDetail.call(this)' data-id=" + data[i].number + ">详情</button> <button onclick='orderdone.call(this)' data-id=" + data[i].number + "  data_div=" + id + ">结单</button> </td> </tr>")
                        }
                    }
                }
            }
        });
    };
    function subOrder(sdata,des) {
        file_arr = JSON.stringify(sdata.file_arr);
        $.ajax({
            type:"post",
            url:'/home/work_order/update',
            traditional:true,
            data:{
                dialogue_details:sdata.dialogue_details,
                number:sdata.number,
                file_arr:file_arr
            },
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                alert(res.message)
                if(res.status == 200){
                    $("#wodetail_con").append('<div class="usertalk clearfloat"> <div class="user_box"> <img src="/home/assets/i/header.png" alt="" class="user_header"> <p class="user_box_title">我的提问</p> </div> <div class="contentbox"> <div class="talk">'+des +' <div class="arrow"> </div> </div> <div class="date">刚刚</div> </div> </div>')
                    $("#fade_back_t").val("");
                    $("#file-list1").children().remove();
                    arr1=[];
                    image1=[];
                }
            }
        });
    };
    function subNewOrder(sdata) {

        file_arr = JSON.stringify(sdata.file_arr);
        $.ajax({
            type:"post",
            url:'/home/work_order/save',
            traditional:true,
            data:{
                question_type:sdata.question_type,
                title:sdata.title,
                describe:sdata.describe,
                file_arr:file_arr
            },
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                alert(res.message)
                $(".order_all").trigger("click");
                $("#sub_work_order").hide();
                $("#order_list").show();
                $("#new_worder_title").val("");
                $("#new_worder_des").val("");
                $("#file-list").children().remove();
                arr=[];
                image=[]
            }
        });
    };
function toOrderDetail() {
    $.ajax({
        type:"GET",
        url:'/home/work_order/read',
        data:{number:$(this).data("id")},
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            if(res.status == 200) {
                $("#order_list").hide();
                $("#order_detail").show();
                var data = res.data
                $("#worder_num").html(data.number);
                $("#wodetail_time").html(data.create_time);
                $("#wodetail_title").html(data.title);
                $("#wodetail_type").html(data.question_type);
                $("#wodetail_status").html(data.status);
                $("#wodetail_des").html(data.describe);
                $("#wodetail_con").children().remove();

                $(".statesbox").removeClass('nowStates');
                if(data.status == '待处理'){  //状态判断
                    $(".statesbox:first").addClass('nowStates')
                }else if(data.status == '处理中'){
                    $(".statesbox:nth-child(2)").addClass('nowStates')
                }else if(data.status == '已结单'){
                    $(".statesbox:last").addClass('nowStates')
                }else{
                    $(".statesbox:nth-child(3)").addClass('nowStates')
                }
                for(var i = 0; i < data.dialogue.data.length; i++){
                    if(data.dialogue.data[i].identity != '系统'){
                        $("#wodetail_con").prepend('<div class="usertalk clearfloat"> <div class="user_box"> <img src="/home/assets/i/header.png" alt="" class="user_header"> <p class="user_box_title">我的提问</p> </div> <div class="contentbox"> <div class="talk">'+data.dialogue.data[i].details +' <div class="arrow"> </div> </div> <div class="date">'+data.dialogue.data[i].create_time +'</div> </div> </div>')
                    }else{
                        $("#wodetail_con").prepend('<div class="usertalk clearfloat"> <div class="user_box my_box"> <img src="/home/assets/i/header.png" alt="" class="user_header"> <p class="user_box_title">翼升客服</p> </div> <div class="contentbox my_content_box"> <div class="talk">'+data.dialogue.data[i].details +' <div class="arrow"> </div> </div> <div class="date">'+data.dialogue.data[i].create_time +'</div> </div> </div>')
                    }
                }
            }
        }
    });
};
function  orderdone() {
    var divID = $(this).attr('data_div')
    $.ajax({
        type:"Post",
        url:'/home/work_order/updateStatusFinish',
        data:{number:$(this).data("id")},
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            alert(res.message);
            $("."+divID+" ").trigger("click");
        }
    })
};
function deleFile1(e) { //删除详情留言附件
    let text=$(e).prev().html();
    $(e).parent().parent().remove();
    $('#doc-form-file1').val('');
    let Dfile = document.getElementsByClassName('upload-files1');
    if (Dfile.length <= 5){
        $('#doc-form-file1').css("z-index","20")
        $('#doc-form-file1').removeAttr("disabled")
    }
    for(let i=0;i<arr1.length;i++){
        if(text==arr1[i]){
            arr1.splice(i,1)
            image1.splice(i,1)
        }
    }
};
function deleFile(e) { //删除详情留言附件
    let text=$(e).prev().html();
    $('#doc-form-file').val('');
    $(e).parent().parent().remove();
    let Dfile = document.getElementsByClassName('upload-files');
    if (Dfile.length <= 5){
        $('#doc-form-file').css("z-index","20");
        $('#doc-form-file').removeAttr("disabled")
    }
    for(let i=0;i<arr.length;i++){
        if(text==arr[i]){
            arr.splice(i,1)
            image.splice(i,1)
        }
    }
}
function toPay() {
    var id = $(this).data("id");
    window.location.href = '/home/paypage.html?num='+ id
}
function cancelOrder() {
    var id = $(this).data("id");
    var num = $(this).data("number");
    $.ajax({
        type:'POST',
        url:'/home/order_form/editOrder',
        data:{official_id:id,number:num,},
        dataType:'json',
        success:function (data) {
            alert(data.message)
            if(data.status == 200){
                getOrderL(1)
            }

        }
    });
}
// //修改
// $(".getOldCode").click(function () {
//     var val = $(".oldPhone").val(),url='/home/reset/sendResetCode';
//     getCode(this,val,url)
// });
$(".getNewCode").click(function () {
    // console.log(111);
    var val = $(".newPhone").val(),url='/home/user/sendCodeModifyMobile';
    getCode(this,val,url)
});
function getCode(that,val,url) {
    if(timeflag == true){
        var myreg=/^[1][3-9][0-9]{9}$/;
        if (!myreg.test(val)) {
            alert('手机号格式不正确');
        } else {
            $.ajax({
                type:'POST',
                url:url,
                data:{mobile:val},
                dataType:'json',
                success:function (data) {
                    if(data.status == 200){
                        timeflag = false
                        settime(that);
                    }else {
                        alert(data.message)
                    }
                }
            });
        }
    }
}
var countdown=60;
var timeflag = true;
function settime(obj,inpobj) {
    // console.log(obj,"倒计时")
    var inpobj = document.getElementById(inpobj);
//
    if (countdown == 0) {
        timeflag = true;
        obj.innerHTML="重新发送";
        countdown = 60;
        return;
    } else {
        obj.innerHTML="重新发送(" + countdown + "s)";
        countdown--;
    }
    setTimeout(function() {
            settime(obj) }
        ,1000)

}

