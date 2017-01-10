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