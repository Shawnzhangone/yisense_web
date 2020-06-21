/**
 * Created by admin on 2019/1/16.
 */

var BASE_URL = '';
//推送百度
(function(){
    var bp = document.createElement('script');
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
$(document).ready(function() {
    $('#myHeader').load('/home/header.html', function () {
        // console.log('header加载完成',$('.guide-userCenter'))
    })
    $('#myFooter').load('/home/footer.html')
    $('body').addClass('am-with-topbar-fixed-top');
    BASE_URL = 'https://' + window.location.host
    $(".lazy_load").lazyload({
        effect: "fadeIn", //渐现，show(直接显示),fadeIn(淡入),slideDown(下拉)
        threshold: 180, //预加载，在图片距离屏幕180px时提前载入
        failure_limita: 2
    });
})
