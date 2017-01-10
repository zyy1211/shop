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