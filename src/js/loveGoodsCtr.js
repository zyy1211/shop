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