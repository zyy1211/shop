/**
 * Created by XH on 2016/12/26.
 */
angular.module('shopApp',['ionic','app.tabs','app.home','app.integral','app.stores','app.person']).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

    $stateProvider.state('tabs',{
        url:'/tabs',
        views:{
            'index':{
                templateUrl:'tabs.html',
                controller:'tabsCtr'
            }
        }
    })
        .state('tabs.home',{
        url:'/home',
        views:{
            'home':{
                templateUrl:'home.html',
                controller:'homeCtr'
            }
        }
    });
    //     .state('tabs.integral',{
    //     url:'/integral',
    //     views:{
    //         'integral':{
    //             templateUrl:'integral.html',
    //             controller:'integralCtr'
    //         }
    //     }
    // }).state('tabs.stores',{
    //     url:'/stores',
    //     views:{
    //         'stores':{
    //             templateUrl:'stores.html',
    //             controller:'storesCtr'
    //         }
    //     }
    // }).state('tabs.person',{
    //     url:'/person',
    //     views:{
    //         'person':{
    //             templateUrl:'person.html',
    //             controller:'personCtr'
    //         }
    //     }
    // });
    $urlRouterProvider.otherwise('tabs/home');
}]);