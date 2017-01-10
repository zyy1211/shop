/**
 * Created by qingyun on 16/12/2.
 */
angular.module('cftApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        scope:{sourceArray:'='},
        templateUrl:'slideBox.html',
        controller:['$scope','$state','$ionicSlideBoxDelegate','$element',function ($scope,$state,$ionicSlideBoxDelegate,$element) {
            $scope.goToDetailView = function (index) {
                // console.log('进入详情页' + index);
            };
            var lastSpan = $element[0].lastChild;
            // console.log(lastSpan,'/////');
            $scope.$watch('sourceArray',function (newVal,oldVal) {
                if (newVal && newVal.length){
                    $scope.isShowSlide = false;
                    setTimeout(function () {
                        $scope.isShowSlide = true;
                    });
                    //     //轮播标题
                    // lastSpan.innerText = ($scope.sourceArray[0]).title;
                    // $scope.slideHasChanged = function (index) {
                    //     // console.log(index);

                    //     lastSpan.innerText = $scope.sourceArray[index].title;
                    //     // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').update();
                    // };
                }
            });
            $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
            $scope.drag = function (event) {
                $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
                //阻止事件冒泡
                event.stopPropagation();
            };

        }],
        replace:true,
        link:function (scope,tElement,tAtts) {
        }
    };
}]);
