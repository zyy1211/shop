/**
 * Created by XH on 2016/12/26.
 */
angular.module('app.integral',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.integral',{
        url:'/integral',
        views:{
            'integral':{
                templateUrl:'integral.html',
                controller:'integralCtr'
            }
        }
    })
}])
    .controller('integralCtr',['$scope','HttpFactory','$ionicSideMenuDelegate',function ($scope,HttpFactory,$ionicSideMenuDelegate) {
        $scope.integral={
            autoImg:'',//轮播图
            goods:'',//商品列表数据
            toggleRight:toggleRight,//打开侧边栏菜单方法
        };

        //打开侧边栏
        function toggleRight() {
            $ionicSideMenuDelegate.toggleRight();

        }


        // var url = 'http://data.live.126.net/livechannel/previewlist.json';
        //轮播图
        var resultArr = [];
        // HttpFactory.getData(url).then(function (result) {
        //     console.log(result);
        //     result = result.top;
        //     for (var i=0;i<result.length;i++){
        //         var obj ={
        //             imgsrc:result[i].image
        //         };
        //         resultArr.push(obj);
        //     }
        //     $scope.integral.autoImg = resultArr;
        //     console.log($scope.integral.autoImg);
        // });

        //商品列表
        var goodsUrl = 'http://114.112.94.166/sunny/wap/api/getGoods';
        HttpFactory.getData(goodsUrl).then(function (result) {
            $scope.integral.goods = result.goodsData;

            for (var i=0;i<result.bannerData.length;i++){
                var obj = {
                    imgsrc:result.bannerData[i].image_url
                };
                resultArr.push(obj);
            }
            $scope.integral.autoImg = resultArr;
        });

}]);