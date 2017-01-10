/**
 * Created by XH on 2016/12/26.
 */
angular.module('app.tabs',[]).controller('tabsCtr',['$scope','RongCustomerService',function ($scope,RongCustomerService) {

    //融云客服
    var dWidth = window.screen.width;
    var dHeight = window.screen.height;

    RongCustomerService.init({
        appkey:"x4vkb1qpx4zkk",
        token:"JTEnduiiY+qrg1TFNx8jm/m3RkAeK2x5wrG+dvon/6xoPqVKM1irzYe2R/wGLSSwCjFCU5Bd3q0=",
        customerServiceId:"KEFU148300320552496",
        style:{
            width:dWidth,
            height:dHeight-60
        },
        position:RongCustomerService.Position.right,
        onSuccess:function(){
            //设置客服按钮位置
            var kf = angular.element(document.getElementById('rong-widget-minbtn'));
            kf.css('bottom','8rem');
            kf.css('right','2rem');
        }
    });
    //是否隐藏融云客服
    $scope.$on('$stateChangeSuccess',function (evt,current,previous) {
        var update_wx_title = function(title) {
            var body = document.getElementsByTagName('body')[0];
            document.title = title;
            var iframe = document.createElement("iframe");
            // iframe.setAttribute("src", "../empty.png");
            iframe.addEventListener('load', function() {
                setTimeout(function() {
                    // iframe.removeEventListener('load');
                    document.body.removeChild(iframe);
                });
            });
            document.body.appendChild(iframe);
        };
        var RWM=angular.element(document.getElementById('rong-widget-minbtn'));
        switch (current.url){
            case '/home':
                update_wx_title("首页");
                RWM.css('display','block');
                break;
            case '/integral':
                update_wx_title("积分商城");
                RWM.css('display','block');
                break;
            case '/stores':
                update_wx_title("加盟店");
                RWM.css('display','none');
                break;
            case '/person':
                update_wx_title("个人中心");
                RWM.css('display','none');
                break;
        }
    });





}]);