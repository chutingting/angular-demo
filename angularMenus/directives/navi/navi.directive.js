/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module('app').directive("navi",function(){
    return {
        templateUrl: "/angularMenus/directives/navi/navi.html",
        restrict:"EA",
        scope:{
            "callbackFn":"=",
            "url":"@"
        },
        link:function(){},
        controller:function($scope,$http,$state,core,$rootScope){
            $scope.items = [];

            core.getData("/angularMenus/data.json",function(d){
                $scope.items = d.navi;
            });

            $scope.goNavi = function(item){
                $state.go(item.val);

                //不重复添加
                var bl = false;
                for(var i=0;i<$rootScope.menus.length;i++){
                    if(item.name == $rootScope.menus[i].name){
                        bl = true;
                        break;
                    }
                }
                if(!bl){
                    for(var i=0;i<$rootScope.menus.length;i++){
                        $rootScope.menus[i].bgc = "white";
                    }

                    item.bgc = "active";
                    $rootScope.menus.push(item);
                }

            }
        }
    }
})