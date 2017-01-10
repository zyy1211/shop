/**
 * Created by XH on 2016/12/31.
 */
angular.module('app.order',['ionic']).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.person-order',{
        url:'/person-order',
        views:{
            'person':{
                templateUrl:'person-order.html',
                controller:'orderCtr'
            }
        }
    })
}]).controller('orderCtr',['$scope','$ionicTabsDelegate','$ionicPopup','$state','some',function ($scope,$ionicTabsDelegate,$ionicPopup,$state,some) {
    $scope.psOrder={
        changeState:changeState,//订单状态的切换
        stateFilter:'',//筛选的状态
        showConfirm:showConfirm,//取消订单的弹窗
        showPopup:showPopup,//申请退货的弹窗
        showOk:showOk,//确认收货的弹窗
        openAppraise:openAppraise,//评价

    };

    function changeState(e) {
        var list = angular.element(e.currentTarget).children();
        if(e.target !=e.currentTarget){
            list.removeClass('active');
            angular.element(e.target).addClass('active');
        }
        switch (e.target.innerHTML){
            case '待付款':
                $scope.psOrder.stateFilter='待付款';
                break;
            case '待发货':
                $scope.psOrder.stateFilter='待发货';
                break;
            case '待付款':
                $scope.psOrder.stateFilter='待付款';
                break;
            case '待收货':
                $scope.psOrder.stateFilter='待收货';
                break;
            case '待评价':
                $scope.psOrder.stateFilter='交易成功';
                break;
            case '全&nbsp;部':
                $scope.psOrder.stateFilter='';
                break;
        }
    }
    
    //取消订单的弹窗
    function showConfirm(item) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass:'Order',
            title:'确认要取消订单吗?',
            scope:$scope,
            buttons:[{
                text:'取消',
                onTap:function () {

                    console.log('取消')
                }
            },{
                text:'确定',
                onTap:function () {
                    item.state = '交易关闭';
                    item.orde = 5;
                }
            }]
        });

    }

    //确认收货的弹窗
    function showOk(item) {
        var OkPopup = $ionicPopup.confirm({
            cssClass:'Order',
            title:'确认是否已收到货?',
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
                    console.log(item);
                    item.state = '交易成功';
                    item.comments = true;

                }
            }]
        });
    }

    //申请退货的弹窗
    function showPopup(item) {
        var myPopup = $ionicPopup.show({
            cssClass:'Order-R',
            template:'<textarea placeholder="请输入申请退货的原因?"></textarea><div class="number">10/100</div>',
            title:'申请退款',
            scope:$scope,
            buttons:[{
                text:'取消',
                onTap:function () {
                    
                }
            },{
                text:'确定',
                onTap:function () {
                    item.state = '退货中';
                }
            }]
        });
    }

    //跳转到评价页面
    function openAppraise(item) {
        $state.go('tabs.appraise');
        //将是否评价过的状态传给评价页面
        some.states = item;

    }

    $scope.data = [
        {'num':'1100335566','orde':0,'state':'待付款','freight':'8','total':'2','totalP':'516',
            'goods':
                [{'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'},
                    {'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'}]},
        {'num':'2222222266','orde':1,'state':'待发货','freight':'8','total':'2','totalP':'516','goods':[{'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'}]},
        {'num':'3333336666','orde':2,'state':'待收货','freight':'8','total':'2','totalP':'516','goods':[{'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'}]},
        {'num':'4444446666','orde':3,'state':'交易成功','comments':true,'freight':'8','total':'2','totalP':'516','goods':[{'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'}]},
        {'num':'5555556666','orde':4,'state':'交易成功','comments':false,'freight':'8','total':'2','totalP':'516','goods':[{'amount':10,'imgsrc':'images/myOrder.png','detail':'买一份送一份日王阳澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装','price':'258'}]}
    ];

    $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
    });
}]).value('some',{});