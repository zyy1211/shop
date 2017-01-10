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