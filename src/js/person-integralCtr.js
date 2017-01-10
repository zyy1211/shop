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