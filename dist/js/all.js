/**
 * Created by XH on 2016/12/26.
 */
angular.module('shopApp',['ionic','RongWebIMWidget','app.tabs','app.home','app.integral','app.stores','app.person','App.httpFactory','cftApp.slideBox','app.homeDetail','app.loveGoods','app.shopCart','app.order','app.appraise','app.myIntegral','app.address','app.shopCart1']).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

    $stateProvider.state('tabs',{
        url:'/tabs',
        views:{
            'index':{
                templateUrl:'tabs.html',
                controller:'tabsCtr',
                abstract:true
            }
        }
    });

    $urlRouterProvider.otherwise('tabs/home');
}]);
/**
 * Created by XH on 2016/12/26.
 */
angular.module('app.home',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.home',{
        url:'/home',
        views:{
            'home':{
                templateUrl:'home.html',
                controller:'homeCtr'
            }
        }
    })
}])
    .controller('homeCtr',['$scope','HttpFactory','$ionicModal','$state','$ionicTabsDelegate','$ionicSideMenuDelegate',function ($scope,HttpFactory,$ionicModal,$state,$ionicTabsDelegate,$ionicSideMenuDelegate) {
    $scope.home = {
        autoImg:'',//轮播图
        goodsNum:1,
        addComm:addComm,//加入购物车方法
        goods:'',//商品列表数据
        empty:false,//是否已售完
        serMove:serMove,//客服窗口移动方法
        openDetail:openDetail,//打开详情页
        toggleRight:toggleRight,//打开侧边栏菜单方法
        changeNum:changeNum,//购物数量的变化
    };
        //显示tabs
    $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(true);
    });

    // //轮播图
    // var url = 'http://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=LMA1&open=&openpath=&fn=1&passport=&devId=%2BnrKMbpU9ZDPUOhb9gvookO3HKJkIOzrIg%2BI9FhrLRStCu%2B7ZneFbZ30i61TL9kY&offset=0&size=10&version=17.1&spever=false&net=wifi&lat=&lon=&ts=1480666192&sign=yseE2FNVWcJVjhvP48U1nPHyzZCKpBKh%2BaOhOE2d6GR48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';
    //
    // HttpFactory.getData(url).then(function (result) {
    //     result = result.tid;
    //     $scope.home.autoImg = result[0].ads;
    //     // console.log($scope.home.autoImg);
    // });
    //商品列表
        var autoImg = [];
    var goodsUrl = 'http://114.112.94.166/sunny/wap/api/getGoods';
    HttpFactory.getData(goodsUrl).then(function (result) {
        console.log(result);
        for (var i=0;i<result.bannerData.length;i++){
            var obj = {
                imgsrc:result.bannerData[i].image_url
            };
            autoImg.push(obj);
        }
        $scope.home.autoImg = autoImg;
        $scope.home.goods = result.goodsData;
        console.log($scope.home.goods);
    });

        // //tabs
        // $scope.$on('$ionicView.beforeEnter',function () {
        //     $ionicTabsDelegate.showBar(true);
        // });

    // 加入购物车
    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    function addComm(e) {
        e.stopPropagation();
        $scope.modal.show();
    }
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    //    打开详情页
    function openDetail() {
        console.log('ssss');
        $state.go('tabs.homeDetail');
    }

    //打开侧边栏
        function toggleRight() {
            $ionicSideMenuDelegate.toggleRight();

        }

    //    购买数量的变化
        function changeNum(str) {
            if(str=='add'){
                $scope.home.goodsNum++;
            }
            if(str=='reduce'&$scope.home.goodsNum>1){
                $scope.home.goodsNum--;
            }
        }

    //  客服窗口移动
    function serMove(e) {
        e.stopPropagation();
        var service = angular.element(document.querySelector('.service'));
        service.css({'positive':'absolute','top':e.gesture.center.pageY-36+'px','left':e.gesture.center.pageX-36+'px'});
        if(e.gesture.center.pageX+36>window.screen.width){
            service.css({'positive':'absolute','left':window.screen.width-72+'px'});
        }
        if(e.gesture.center.pageX-36<0){
            service.css({'positive':'absolute','left':0});
        }

        if(e.gesture.center.pageY+86>window.screen.height){
            service.css({'positive':'absolute','top':window.screen.height-130+'px'});
        }
        if(e.gesture.center.pageY-76<0){
            service.css({'positive':'absolute','top':'44px'});
        }
    }

}]);
/**
 * Created by XH on 2016/12/26.
 */
angular.module('app.integral',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.integral',{
        url:'/integral',
        views:{
            'integral':{
                templateUrl:'integral.html',
                controller:'integralCtr'
            }
        }
    })
}])
    .controller('integralCtr',['$scope','HttpFactory','$ionicSideMenuDelegate',function ($scope,HttpFactory,$ionicSideMenuDelegate) {
        $scope.integral={
            autoImg:'',//轮播图
            goods:'',//商品列表数据
            toggleRight:toggleRight,//打开侧边栏菜单方法
        };

        //打开侧边栏
        function toggleRight() {
            $ionicSideMenuDelegate.toggleRight();

        }


        // var url = 'http://data.live.126.net/livechannel/previewlist.json';
        //轮播图
        var resultArr = [];
        // HttpFactory.getData(url).then(function (result) {
        //     console.log(result);
        //     result = result.top;
        //     for (var i=0;i<result.length;i++){
        //         var obj ={
        //             imgsrc:result[i].image
        //         };
        //         resultArr.push(obj);
        //     }
        //     $scope.integral.autoImg = resultArr;
        //     console.log($scope.integral.autoImg);
        // });

        //商品列表
        var goodsUrl = 'http://114.112.94.166/sunny/wap/api/getGoods';
        HttpFactory.getData(goodsUrl).then(function (result) {
            $scope.integral.goods = result.goodsData;

            for (var i=0;i<result.bannerData.length;i++){
                var obj = {
                    imgsrc:result.bannerData[i].image_url
                };
                resultArr.push(obj);
            }
            $scope.integral.autoImg = resultArr;
        });

}]);
/**
 * Created by XH on 2016/12/26.
 */
angular.module('app.stores',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.stores',{
        url:'/stores',
        views:{
            'stores':{
                templateUrl:'stores.html',
                controller:'storesCtr'
            }
        }
    })
}])
    .controller('storesCtr',['$scope',function ($scope) {

}]);
/**
 * Created by XH on 2016/12/26.
 */
angular.module('app.person',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.person',{
        url:'/person',
        views:{
            'person':{
                templateUrl:'person.html',
                controller:'personCtr'
            }
        }
    });
}])
    .controller('personCtr',['$scope','$state','$ionicTabsDelegate','$ionicViewSwitcher',function ($scope,$state,$ionicTabsDelegate,$ionicViewSwitcher) {
        $scope.person = {
            loveGoods:loveGoods,//打开收藏页的方法
            myOrder:myOrder,//跳转到我的订单页面
            openCar:openCar,//跳转到我的购物车页面
            openIntegral:openIntegral,//跳转到积分页面
            openAddress:openAddress//跳转到收货地址页面
        };


        //打开收藏页
        function loveGoods() {
            $state.go('tabs.loveGoods');
        }

        //跳转到我的订单页面
        function myOrder() {
            $state.go('tabs.person-order');
        }

        //跳转到我的购物车页面
        function openCar() {
            $state.go('tabs.shopCart1');
            $ionicViewSwitcher.nextDirection("forward");
        }

        function openIntegral() {
            $state.go('tabs.ps-integral');
        }

        //跳转到收货地址页面
        function openAddress() {
            $state.go('tabs.address');
        }

        // 显示tabs
        $scope.$on('$ionicView.beforeEnter',function () {
            $ionicTabsDelegate.showBar(true);
        })

}]);
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
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('cftApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        scope:{sourceArray:'='},
        templateUrl:'slideBox.html',
        controller:['$scope','$state','$ionicSlideBoxDelegate','$element',function ($scope,$state,$ionicSlideBoxDelegate,$element) {
            $scope.goToDetailView = function (index) {
                // console.log('进入详情页' + index);
            };
            var lastSpan = $element[0].lastChild;
            // console.log(lastSpan,'/////');
            $scope.$watch('sourceArray',function (newVal,oldVal) {
                if (newVal && newVal.length){
                    $scope.isShowSlide = false;
                    setTimeout(function () {
                        $scope.isShowSlide = true;
                    });
                    //     //轮播标题
                    // lastSpan.innerText = ($scope.sourceArray[0]).title;
                    // $scope.slideHasChanged = function (index) {
                    //     // console.log(index);

                    //     lastSpan.innerText = $scope.sourceArray[index].title;
                    //     // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').update();
                    // };
                }
            });
            $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
            $scope.drag = function (event) {
                $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
                //阻止事件冒泡
                event.stopPropagation();
            };

        }],
        replace:true,
        link:function (scope,tElement,tAtts) {
        }
    };
}]);

/**
 * Created by qingyun on 16/12/2.
 */
angular.module('App.httpFactory',[]).factory('HttpFactory',['$http','$q',function ($http,$q) {
    return {
        getData:function (url,params,type) {
            if (url){
                var promise = $q.defer();
                // url = "http://59.110.139.104:3000/wy?myUrl=" + encodeURIComponent(url);
                type = type ? type:"GET";
                params = params ? params:{};
                $http({
                    url:url,
                    params:params,
                    method:type,
                    timeout:20000,
                    cache:true
                }).then(function (reslut) {
                    reslut =reslut.data;
                    // reslut = reslut[Object.keys(reslut)[0]];
                    promise.resolve(reslut);

                },function (err) {
                    promise.reject(err);
                });
                return promise.promise;
            }
        }
    }
}]);
/**
 * Created by XH on 2016/12/27.
 */
angular.module('app.homeDetail',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.homeDetail',{
        url:'/homeDetail',
        views:{
            'home':{
                templateUrl:'homeDetail.html',
                controller:'homeDetailCtr'
            }
        }
    })
}])
    .controller('homeDetailCtr',['$scope','$ionicTabsDelegate','$ionicModal','$state','$timeout',function ($scope,$ionicTabsDelegate,$ionicModal,$state,$timeout) {

        $scope.homeDetail = {
            goodsDetail:'homeDetail-1.html',//商品信息
            gSellOut:false,//商品是否售完
            collect:false,//是否收藏
            changeDetail:changeDetail, //商品详情.评论的跳转
            shopNum:shopNum,//购物车数量
            goodsNum:1,//购物车初始值
            changeNum:changeNum,//点击按钮改变购物车值
            backHome:backHome,//返回首页
            openShopCart:openShopCart,//打开购物车
            change:change,//改变收藏状态
            // starFull:starFull//评论星级
        };

        //商品详情和评论切换
        function changeDetail(e) {
           var infos = angular.element(document.querySelector('.goodsInfo')).children();
           infos.removeClass('active');
            angular.element(e.target).addClass('active');
            if(e.target.innerHTML=='商品详情'){
                $scope.homeDetail.goodsDetail='homeDetail-1.html'
            }
            if(e.target.innerHTML=='商品参数'){
                $scope.homeDetail.goodsDetail='homeDetail-2.html'
            }
            if(e.target.innerHTML.indexOf('评价') !=-1){
                $scope.homeDetail.goodsDetail='homeDetail-3.html'
            }

        }

    // //调用购物购物车模态
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        function shopNum(e) {
            e.stopPropagation();
            $scope.modal.show();
        }
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        //    购买数量的变化
        function changeNum(str) {
            if(str=='add'){
                $scope.homeDetail.goodsNum++;
            }
            if(str=='reduce'&$scope.homeDetail.goodsNum>1){
                $scope.homeDetail.goodsNum--;
            }
        }

    //    返回首页
        function backHome() {
            $state.go('tabs.home');
        }

    //    打开购物车
        function openShopCart() {
            $state.go('tabs.shopCart');
        }


        // 收藏的模态
        $ionicModal.fromTemplateUrl('heart.html', {
            scope: $scope,
            animation: 'slide-in-down'
        }).then(function(modalHeart) {
            $scope.modalHeart = modalHeart;
        });
        function change() {
           $scope.modalHeart.show();
            $scope.homeDetail.collect = !$scope.homeDetail.collect;
            $timeout(function () {
                $scope.modalHeart.hide();
            },80);
        }

    //    评论星级
    //     function starFull(e) {
    //         if(e.target !=e.currentTarget){
    //             var list = angular.element(e.currentTarget).children();
    //             list.removeClass('active');
    //             for (var i=0;i<list.length;i++){
    //                 angular.element(list[i]).addClass('active');
    //                 if(list[i]==e.target){
    //                     break;
    //                 }
    //
    //             }
    //         }
    //
    //     }
    //隐藏tabs
    $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
    });
}]);
/**
 * Created by XH on 2016/12/29.
 */
angular.module('app.loveGoods',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.loveGoods',{
        url:'/loveGoods',
        views:{
            'person':{
                templateUrl:'loveGoods.html',
                controller:'loveGoodsCtr'
            }
        }
    })
}]).controller('loveGoodsCtr',['$scope','$ionicTabsDelegate',function ($scope,$ionicTabsDelegate) {

    //隐藏tabs
    $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
    });


    $scope.favorite = {

        data: [{imgsrc:'images/myOrder.png',title:'阳澄湖大闸蟹',content:'健脑 降低胆固醇 益寿美容 健脑 降低胆固醇 益寿美容',price:'258元',some:false,src:'images/wastebin.png'},{imgsrc:'images/myOrder.png',title:'阳澄湖大闸蟹',content:'健脑 降低胆固醇 益寿美容 健脑 降低胆固醇 益寿美容',price:'3000积分',some:true,src:'images/wastebin.png'},{imgsrc:'images/myOrder.png',title:'阳澄湖大闸蟹',content:'健脑 降低胆固醇 益寿美容 健脑 降低胆固醇 益寿美容',price:'258元',some:false,src:'images/wastebin.png'}],


    }





}]);
/**
 * Created by XH on 2016/12/29.
 */
angular.module('app.shopCart',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.shopCart',{
        url:'/shopCart',
        views:{
            'home':{
                templateUrl:'shopCart.html',
                controller:'shopCartCtr'
            }
        }
    });

}]).controller('shopCartCtr',['$scope','$ionicPopup','$ionicTabsDelegate',function ($scope,$ionicPopup,$ionicTabsDelegate) {
    $scope.shopCart = {
       data: [{imgsrc:'images/myOrder.png',content:'买一份送一份阳澄湖大闸蟹母螃蟹3.2-3.0两6只鲜活现货礼盒装',num:2,price:258,some:false,src:'images/wastebin.png'},{imgsrc:'images/myOrder.png',content:'买一份送一份阳澄湖大闸蟹母螃蟹3.2-3.0两6只鲜活现货礼盒装',num:1,price:258,some:false,src:'images/wastebin.png'},{imgsrc:'images/myOrder.png',content:'买一份送一份阳澄湖大闸蟹母螃蟹3.2-3.0两6只鲜活现货礼盒装',num:3,price:258,some:true,src:'images/wastebin.png'}],
        remove:remove,//删除
        chose:chose,//选择
        choseAll:choseAll//选择所要
    };

    //删除
    function remove(e,index) {

        var confirmPopup = $ionicPopup.confirm({
            cssClass:'Order',
            title:'确定要删除该商品吗?',
            scope:$scope,
            buttons:[{
                text:'取消',
                onTap:function (e) {
                    console.log('取消');
                }
            },{
                text:'确定',
                onTap:function (e) {
                    console.log('确定');
                    $scope.shopCart.data.splice(index,1);
                }
            }]
        });

    }

    function chose(e) {
        console.log(e.target);
        angular.element(e.target).toggleClass('active');
    }
    function choseAll(e) {
        angular.element(e.target).toggleClass('active');
        if(e.target.className.indexOf('active') !=-1){
            angular.element(document.querySelectorAll('.point')).addClass('active');
        }else {
            angular.element(document.querySelectorAll('.point')).removeClass('active');
        }
    }


    // 隐藏tabs
    $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
    });



}]);
/**
 * Created by XH on 2016/12/31.
 */
angular.module('app.order',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.person-order',{
        url:'/person-order',
        views:{
            'person':{
                templateUrl:'person-order.html',
                controller:'orderCtr'
            }
        }
    })
}]).controller('orderCtr',['$scope','$ionicTabsDelegate','$ionicPopup','$state','some',function ($scope,$ionicTabsDelegate,$ionicPopup,$state,some) {
    $scope.psOrder={
        changeState:changeState,//订单状态的切换
        stateFilter:'',//筛选的状态
        showConfirm:showConfirm,//取消订单的弹窗
        showPopup:showPopup,//申请退货的弹窗
        showOk:showOk,//确认收货的弹窗
        openAppraise:openAppraise,//评价

    };

    function changeState(e) {
        var list = angular.element(e.currentTarget).children();
        if(e.target !=e.currentTarget){
            list.removeClass('active');
            angular.element(e.target).addClass('active');
        }
        switch (e.target.innerHTML){
            case '待付款':
                $scope.psOrder.stateFilter='待付款';
                break;
            case '待发货':
                $scope.psOrder.stateFilter='待发货';
                break;
            case '待付款':
                $scope.psOrder.stateFilter='待付款';
                break;
            case '待收货':
                $scope.psOrder.stateFilter='待收货';
                break;
            case '待评价':
                $scope.psOrder.stateFilter='交易成功';
                break;
            case '全&nbsp;部':
                $scope.psOrder.stateFilter='';
                break;
        }
    }
    
    //取消订单的弹窗
    function showConfirm(item) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass:'Order',
            title:'确认要取消订单吗?',
            scope:$scope,
            buttons:[{
                text:'取消',
                onTap:function () {

                    console.log('取消')
                }
            },{
                text:'确定',
                onTap:function () {
                    item.state = '交易关闭';
                    item.orde = 5;
                }
            }]
        });

    }

    //确认收货的弹窗
    function showOk(item) {
        var OkPopup = $ionicPopup.confirm({
            cssClass:'Order',
            title:'确认是否已收到货?',
            scope:$scope,
            buttons:[{
                text:'取消',
                onTap:function () {
                    console.log('取消')
                }
            },{
                text:'确定',
                onTap:function () {
                    console.log('确定');
                    console.log(item);
                    item.state = '交易成功';
                    item.comments = true;

                }
            }]
        });
    }

    //申请退货的弹窗
    function showPopup(item) {
        var myPopup = $ionicPopup.show({
            cssClass:'Order-R',
            template:'<textarea placeholder="请输入申请退货的原因?"></textarea><div class="number">10/100</div>',
            title:'申请退款',
            scope:$scope,
            buttons:[{
                text:'取消',
                onTap:function () {
                    
                }
            },{
                text:'确定',
                onTap:function () {
                    item.state = '退货中';
                }
            }]
        });
    }

    //跳转到评价页面
    function openAppraise(item) {
        $state.go('tabs.appraise');
        //将是否评价过的状态传给评价页面
        some.states = item;

    }

    $scope.data = [
        {'num':'1100335566','orde':0,'state':'待付款','freight':'8','total':'2','totalP':'516',
            'goods':
                [{'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'},
                    {'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'}]},
        {'num':'2222222266','orde':1,'state':'待发货','freight':'8','total':'2','totalP':'516','goods':[{'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'}]},
        {'num':'3333336666','orde':2,'state':'待收货','freight':'8','total':'2','totalP':'516','goods':[{'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'}]},
        {'num':'4444446666','orde':3,'state':'交易成功','comments':true,'freight':'8','total':'2','totalP':'516','goods':[{'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'}]},
        {'num':'5555556666','orde':4,'state':'交易成功','comments':false,'freight':'8','total':'2','totalP':'516','goods':[{'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'}]}
    ];

    $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
    });
}]).value('some',{});
/**
 * Created by XH on 2017/1/2.
 */
angular.module('app.appraise',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.appraise',{
        url:'/appraise',
        views:{
            'person':{
                templateUrl:'person-appraise.html',
                controller:'appraiseCtr'
            }
        }
    })


}]).controller('appraiseCtr',['$scope','$ionicTabsDelegate','$state','some',function ($scope,$ionicTabsDelegate,$state,some) {
    $scope.appraise = {
        starFull:starFull,//评论星级
        backOrder:backOrder//返回订单详情页面
    };
    $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
    });


    //    评论星级
    function starFull(e) {
        if(e.target !=e.currentTarget){
            var list = angular.element(e.currentTarget).children();
            list.removeClass('active');
            for (var i=0;i<list.length;i++){
                angular.element(list[i]).addClass('active');
                if(list[i]==e.target){
                    break;
                }

            }
        }
    }

    //  返回订单详情页面
    function backOrder() {
        $state.go('tabs.person-order');
        some.states.comments = false;

    }




}]);
/**
 * Created by XH on 2017/1/2.
 */
angular.module('app.myIntegral',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.ps-integral',{
        url:'/ps-integral',
        views:{
            'person':{
                templateUrl:'person-integral.html',
                controller:'ps-integralCtr'
            }
        }
    })
}]).controller('ps-integralCtr',['$scope','$ionicTabsDelegate',function ($scope,$ionicTabsDelegate) {

    $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
    })

}]);
/**
 * Created by XH on 2017/1/3.
 */
angular.module('app.address',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.address',{
        url:'/address',
        views:{
            'person':{
                templateUrl:'person-address.html',
                controller:'addressCtr'
            }
        }
    })

}]).controller('addressCtr',['$scope','$ionicTabsDelegate','HttpFactory','$ionicPopup','$ionicModal',function ($scope,$ionicTabsDelegate,HttpFactory,$ionicPopup,$ionicModal) {
    $scope.address = {
        data:[],//收货地址信息
        obj:{},
        defaultAds:defaultAds,//默认地址
        removeAds:removeAds,//删除收货地址
        edit:edit,//编辑收货地址
        removeModal:removeModal,//移除模态
        saveAds:saveAds,//添加收货地址
        some:'',//判断新增和修改
        area:area,//省市的模态
        area1:area1,//市的模态
        change:change,//省圆点被激活时
        zyy:'',
        provinces:{
            pro:'选择省份',
            divide:['黑龙江','吉林','辽宁','江苏','山东','安徽','河北','河南','湖北','湖南','江西','陕西','山西','四川','青海','海南','广东','贵州','浙江','福建','台湾','甘肃','云南','北京 ','上海','天津','重庆']
        },//省
        cities:{
            pro:'选择城市',//市
            divide:[　'郑州','开封','洛阳','南阳','漯河','许昌','三门峡','平顶山','周口','驻马店','新乡','鹤壁','焦作','濮阳','安阳','商丘','信阳','济源']
        }

    };


    //省
    function area() {
        $scope.address.zyy = $scope.address.provinces;
        $scope.modal1.show();

    }
    function area1() {
        console.log('sssssssssss');
        $scope.address.zyy = $scope.address.cities;
        $scope.modal1.show();


    }

    $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
    });
    var url = 'http://114.112.94.166/sunny/wap/api/uAddress?sessid=106';
    function sss() {

        // params = {
        //     sessid:'106'
        // };

        HttpFactory.getData(url,{},'GET').then(function (result) {
            console.log(result);
            $scope.address.data = result.addressData;
            console.log('ddddddddddddddddddddddddd');
            console.log($scope.address.data);
        });
    }
    sss();

    // 是否为默认地址
    function defaultAds(e) {
        var list = angular.element(document.querySelectorAll('.imgA'));
        list.removeClass('active');
        angular.element(e.target).addClass('active');
    }
    
    // 删除收货地址
    function removeAds(e,index) {

        var OkPopup = $ionicPopup.confirm({
            cssClass:'Order',
            title:'确认要删除该地址吗?',
            scope:$scope,
            buttons:[{
                text:'取消',
                onTap:function () {
                    console.log('取消')
                }
            },{
                text:'确定',
                onTap:function () {
                    console.log('确定');
                    $scope.address.data.splice(index,1);

                }
            }]
        });
    }
    // 编辑和新增收货地址的模态
    $ionicModal.fromTemplateUrl('modal-address.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    function edit(item) {
        console.log(item);
        $scope.modal.show();
        //修改收货地址
        var name = document.querySelector('.name');
        var tel = document.querySelector('.tel');
        var adsDetail = document.querySelector('.adsDetail');
        var code = document.querySelector('.code');
        //编辑地址
        if(item){
            name.value = item.vname;
            tel.value = item.tel;
            adsDetail.value = item.address;
            code.value = item.code;
            $scope.address.some = item;
            // 新增地址
        }else {
            name.value = '';
            tel.value = '';
            adsDetail.value = '';
            code.value = '';
            $scope.address.some = '';
        }
    }
    function removeModal() {
        $scope.modal.hide();
    }

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    //省市的模态
    $ionicModal.fromTemplateUrl('modal-address-1.html', {
        scope: $scope,
        animation: 'slide-in-down'
    }).then(function(modal1) {
        $scope.modal1 = modal1;
    });

    //省的圆点被激活时
    function change(index) {
        var list = angular.element(document.querySelectorAll('.point'));
        //所有省数组
        var provid = document.querySelectorAll('.provid');
        list.removeClass('active');
        angular.element(list[index]).addClass('active');
        document.querySelector('.pro-selet').value =document.querySelector('.pro-selet').value = provid[index].innerHTML;
        // [index].innerHTML;
        // console.log(provid[index]);
    }

    //保存
    function saveAds() {
        var name = document.querySelector('.name').value;
        var tel = document.querySelector('.tel').value;
        var adsDetail = document.querySelector('.adsDetail').value;
        var code = document.querySelector('.code').value;
        //编辑的保存
        if($scope.address.some){
            $scope.address.some.vname = name;
            $scope.address.some.tel = tel;
            $scope.address.some.address = adsDetail;
            $scope.address.some.code = code;
        //    新增的保存
        }else {
            $scope.address.obj = {
                vname:name,
                tel:tel,
                address:adsDetail,
                code:code,
                city:'郑州',
                province:'河南'
            };
            // $scope.params = obj;
            // console.log(obj);
            // console.log($scope.address.data);
            // $scope.address.data.push(obj);
            console.log($scope.address.obj);
            // var url2 = 'http://114.112.94.166/sunny/wap/api/uAddress?sessid=106';
            HttpFactory.getData(url,$scope.address.obj,'post').then(function (result) {
        console.log(result);
                sss();
            })
        }
        $scope.modal.hide();
        name.value = '';
        tel.value = '';
        adsDetail.value = '';
        code.value = '';

    }
}]);
/**
 * Created by XH on 2017/1/4.
 */
/**
 * Created by XH on 2016/12/29.
 */
angular.module('app.shopCart1',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.shopCart1',{
        url:'/shopCart1',
        views:{
            'person':{
                templateUrl:'shopCart-1.html',
                controller:'shopCartCtr1'
            }
        }
    });

}]).controller('shopCartCtr1',['$scope','$ionicPopup','$ionicTabsDelegate',function ($scope,$ionicPopup,$ionicTabsDelegate) {
    $scope.shopCart1 = {
        data: [{imgsrc:'images/myOrder.png',content:'买一份送一份阳澄湖大闸蟹母螃蟹3.2-3.0两6只鲜活现货礼盒装',num:2,price:258,some:false,src:'images/wastebin.png'},{imgsrc:'images/myOrder.png',content:'买一份送一份阳澄湖大闸蟹母螃蟹3.2-3.0两6只鲜活现货礼盒装',num:1,price:258,some:false,src:'images/wastebin.png'},{imgsrc:'images/myOrder.png',content:'买一份送一份阳澄湖大闸蟹母螃蟹3.2-3.0两6只鲜活现货礼盒装',num:3,price:258,some:true,src:'images/wastebin.png'}],
        remove:remove,//删除
        chose:chose,//选择
        choseAll:choseAll//选择所要
    };

    //删除
    function remove(e,index) {

        var confirmPopup = $ionicPopup.confirm({
            cssClass:'Order',
            title:'确定要删除该商品吗?',
            scope:$scope,
            buttons:[{
                text:'取消',
                onTap:function (e) {
                    console.log('取消');
                }
            },{
                text:'确定',
                onTap:function (e) {
                    console.log('确定');
                    $scope.shopCart.data.splice(index,1);
                }
            }]
        });

    }

    function chose(e) {
        console.log(e.target);
        angular.element(e.target).toggleClass('active');
    }
    function choseAll(e) {
        angular.element(e.target).toggleClass('active');
        if(e.target.className.indexOf('active') !=-1){
            angular.element(document.querySelectorAll('.point')).addClass('active');
        }else {
            angular.element(document.querySelectorAll('.point')).removeClass('active');
        }
    }


    // 隐藏tabs
    $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
    });



}]);