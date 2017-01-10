/**
 * Created by qingyun on 16/12/2.
 */
angular.module('App.httpFactory',[]).factory('HttpFactory',['$http','$q',function ($http,$q) {
    return {
        getData:function (url,params,type) {
            if (url){
                var promise = $q.defer();
                // url = "http://59.110.139.104:3000/wy?myUrl=" + encodeURIComponent(url);
                type = type ? type:"GET";
                params = params ? params:{};
                $http({
                    url:url,
                    params:params,
                    method:type,
                    timeout:20000,
                    cache:true
                }).then(function (reslut) {
                    reslut =reslut.data;
                    // reslut = reslut[Object.keys(reslut)[0]];
                    promise.resolve(reslut);

                },function (err) {
                    promise.reject(err);
                });
                return promise.promise;
            }
        }
    }
}]);