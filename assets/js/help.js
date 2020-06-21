/**
 * Created by admin on 2019/1/11.
 */
$(function () {
    const id = GetPar('id')
    const tid = id ? id : 1;
    typeID == tid
    getHelpType(tid);
    getPieceHelp(tid);
});
$('#searchHelpBtn').click(function () {
    let title =  $('#searchHelp').val();
    getSerchHelp(title);
});
$('#searchHelp').on('keypress',function (e) {
    if(e.keyCode === 13){
        let title =  $('#searchHelp').val();
        getSerchHelp(title);
        return false
    }
})
//获取帮助中心分类
let typeID = '';
function getHelpType(tid) {
$.ajax({
        type:'post',
        url:'/home/help_type/choicequery',
        data:null,
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success(res){
            if(res.status == 200){
                let data = res.data;
                if(data){
                    for(let i in data){
                        $('#helpTypeUl').append('<li onclick="nowItem.call(this);"><a href="javascript:;" data-id="'+ data[i].type_id +'" onclick="getPieceHelp.call(this);" >'+data[i].type_name+'</a></li>')
                    }
                    if(tid == 4){
                        $('#helpTypeUl > li:nth-child(3)').addClass('am-active');
                    }else{
                        $('#helpTypeUl > li:first-child').addClass('am-active');
                    }
                }
                else alert(res.message)
            }else{
                alert(res.message)
            }
        }
    })
}
//获取帮助中心分类文章
function getPieceHelp(id) {
    let aid = id ? id : $(this).data("id");
    if(typeID == aid){return;}else{
        $.ajax({
            type:'post',
            url:'/home/help_type/titlequery',
            data:{type_id:aid},
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            success(res){
                if(res.status == 200){
                    let data = res.data;
                    $('.help-piece').empty();
                    typeID = aid;
                    for(let i in data){
                        $('.help-piece').append('' +
                            '<li class="am-g am-list-item-dated">'+
                            '<a href="./doc.html?id='+ data[i].help_id +'" class="am-list-item-hd ">'+ data[i].title +'</a>'+
                            '<span class="am-list-date"><i class="ticon"></i>'+ data[i].create_date +'<i class="seeicon"></i>'+ data[i].times +'</span>'+
                            '</li>')
                    }
                }else{
                    alert(res.message)
                }
            }
        })
    }

}
function getSerchHelp(title) {
    let sdata =  title ? {'title':title}:{}
    $.ajax({
        type:'post',
        url:'/home/help_center/vague',
        data:sdata,
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success(res){
            if(res.status == 200){
                let data = res.data;
                $('.help-piece').empty();
                for(let i in data){
                    $('.help-piece').prepend('' +
                        '<li class="am-g am-list-item-dated">'+
                            '<a href="./doc.html?id='+ data[i].help_id +'" class="am-list-item-hd ">'+ data[i].title +'</a>'+
                            '<span class="am-list-date"><i class="ticon"></i>'+ data[i].create_date +'<i class="seeicon"></i>'+ data[i].times +'</span>'+
                        '</li>')
                }
            }else{
                alert(res.message)
            }
        }
    })
}
function nowItem() {
    $('#helpTypeUl > li').removeClass('am-active');
    $(this).addClass('am-active');
}
function GetPar(name) { //获取链接参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return decodeURIComponent(r[2]);
    return null;
}
