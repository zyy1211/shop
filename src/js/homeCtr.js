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