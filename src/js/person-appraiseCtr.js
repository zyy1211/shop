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