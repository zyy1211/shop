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