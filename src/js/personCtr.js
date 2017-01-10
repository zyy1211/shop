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