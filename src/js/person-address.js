/**
 * Created by XH on 2017/1/3.
 */
angular.module('app.address',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.address',{
        url:'/address',
        views:{
            'person':{
                templateUrl:'person-address.html',
                controller:'addressCtr'
            }
        }
    })

}]).controller('addressCtr',['$scope','$ionicTabsDelegate','HttpFactory','$ionicPopup','$ionicModal',function ($scope,$ionicTabsDelegate,HttpFactory,$ionicPopup,$ionicModal) {
    $scope.address = {
        data:[],//收货地址信息
        obj:{},
        defaultAds:defaultAds,//默认地址
        removeAds:removeAds,//删除收货地址
        edit:edit,//编辑收货地址
        removeModal:removeModal,//移除模态
        saveAds:saveAds,//添加收货地址
        some:'',//判断新增和修改
        area:area,//省市的模态
        area1:area1,//市的模态
        change:change,//省圆点被激活时
        zyy:'',
        provinces:{
            pro:'选择省份',
            divide:['黑龙江','吉林','辽宁','江苏','山东','安徽','河北','河南','湖北','湖南','江西','陕西','山西','四川','青海','海南','广东','贵州','浙江','福建','台湾','甘肃','云南','北京 ','上海','天津','重庆']
        },//省
        cities:{
            pro:'选择城市',//市
            divide:[　'郑州','开封','洛阳','南阳','漯河','许昌','三门峡','平顶山','周口','驻马店','新乡','鹤壁','焦作','濮阳','安阳','商丘','信阳','济源']
        }

    };


    //省
    function area() {
        $scope.address.zyy = $scope.address.provinces;
        $scope.modal1.show();

    }
    function area1() {
        console.log('sssssssssss');
        $scope.address.zyy = $scope.address.cities;
        $scope.modal1.show();


    }

    $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
    });
    var url = 'http://114.112.94.166/sunny/wap/api/uAddress?sessid=106';
    function sss() {

        // params = {
        //     sessid:'106'
        // };

        HttpFactory.getData(url,{},'GET').then(function (result) {
            console.log(result);
            $scope.address.data = result.addressData;
            console.log('ddddddddddddddddddddddddd');
            console.log($scope.address.data);
        });
    }
    sss();

    // 是否为默认地址
    function defaultAds(e) {
        var list = angular.element(document.querySelectorAll('.imgA'));
        list.removeClass('active');
        angular.element(e.target).addClass('active');
    }
    
    // 删除收货地址
    function removeAds(e,index) {

        var OkPopup = $ionicPopup.confirm({
            cssClass:'Order',
            title:'确认要删除该地址吗?',
            scope:$scope,
            buttons:[{
                text:'取消',
                onTap:function () {
                    console.log('取消')
                }
            },{
                text:'确定',
                onTap:function () {
                    console.log('确定');
                    $scope.address.data.splice(index,1);

                }
            }]
        });
    }
    // 编辑和新增收货地址的模态
    $ionicModal.fromTemplateUrl('modal-address.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    function edit(item) {
        console.log(item);
        $scope.modal.show();
        //修改收货地址
        var name = document.querySelector('.name');
        var tel = document.querySelector('.tel');
        var adsDetail = document.querySelector('.adsDetail');
        var code = document.querySelector('.code');
        //编辑地址
        if(item){
            name.value = item.vname;
            tel.value = item.tel;
            adsDetail.value = item.address;
            code.value = item.code;
            $scope.address.some = item;
            // 新增地址
        }else {
            name.value = '';
            tel.value = '';
            adsDetail.value = '';
            code.value = '';
            $scope.address.some = '';
        }
    }
    function removeModal() {
        $scope.modal.hide();
    }

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    //省市的模态
    $ionicModal.fromTemplateUrl('modal-address-1.html', {
        scope: $scope,
        animation: 'slide-in-down'
    }).then(function(modal1) {
        $scope.modal1 = modal1;
    });

    //省的圆点被激活时
    function change(index) {
        var list = angular.element(document.querySelectorAll('.point'));
        //所有省数组
        var provid = document.querySelectorAll('.provid');
        list.removeClass('active');
        angular.element(list[index]).addClass('active');
        document.querySelector('.pro-selet').value =document.querySelector('.pro-selet').value = provid[index].innerHTML;
        // [index].innerHTML;
        // console.log(provid[index]);
    }

    //保存
    function saveAds() {
        var name = document.querySelector('.name').value;
        var tel = document.querySelector('.tel').value;
        var adsDetail = document.querySelector('.adsDetail').value;
        var code = document.querySelector('.code').value;
        //编辑的保存
        if($scope.address.some){
            $scope.address.some.vname = name;
            $scope.address.some.tel = tel;
            $scope.address.some.address = adsDetail;
            $scope.address.some.code = code;
        //    新增的保存
        }else {
            $scope.address.obj = {
                vname:name,
                tel:tel,
                address:adsDetail,
                code:code,
                city:'郑州',
                province:'河南'
            };
            // $scope.params = obj;
            // console.log(obj);
            // console.log($scope.address.data);
            // $scope.address.data.push(obj);
            console.log($scope.address.obj);
            // var url2 = 'http://114.112.94.166/sunny/wap/api/uAddress?sessid=106';
            HttpFactory.getData(url,$scope.address.obj,'post').then(function (result) {
        console.log(result);
                sss();
            })
        }
        $scope.modal.hide();
        name.value = '';
        tel.value = '';
        adsDetail.value = '';
        code.value = '';

    }
}]);