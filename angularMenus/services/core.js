/**
 * Created by wupeng5 on 2016/5/9.
 */

angular.module('app').service("core",function($http){

    var core = function(){
        this.getData = function(url,cb){
            $http.get(url).success(function(d){
                cb(d);
            })
        }
        this.postData = function(url,data,cb,errorcb){
            $http({
                method:"POST",
                url:url,
                data:data
            }).success(function(d){
                cb(d.data);
            }).error(function(d){
                if(errorcb){
                    errorcb(d);
                }
            })
        };
    }
    return new core();
})