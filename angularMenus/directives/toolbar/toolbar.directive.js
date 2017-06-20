/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module('app').directive("toolBar",function(){
    return {
        templateUrl: "/angularMenus/directives/toolbar/toolbar.html",
        restrict:"EA",
        scope:{
            "callbackFn":"=",
            "url":"@"
        },
        link:function(){},
        controller:function($scope,$http,$rootScope,$state){
            $rootScope.menus = [];

            function getOther(item){
                var _item = null;
                for(var i=0;i<$rootScope.menus.length;i++){
                    if(item.name != $rootScope.menus[i].name){
                        _item = $rootScope.menus[i];
                        break;
                    }
                }
                return _item;
            }

            function getIndex(item){
                var _index = -1;
                for(var i=0;i<$rootScope.menus.length;i++){
                    if(item.name == $rootScope.menus[i].name){
                        _index = i;
                        break;
                    }
                }
                return _index;
            }

            function getParentItem(item){
                var index = getIndex(item);

                var _item = null;
                if(index == 0){
                    _item = $rootScope.menus[1];
                }
                else if(index == $rootScope.menus.length -1){
                    _item = $rootScope.menus[index-1];
                }else{
                    _item = $rootScope.menus[index+1];
                }
                return _item;
            }

            function getPrevItem(item){
                var _item = null;
                if($rootScope.menus.length == 1){
                    _item = null;
                }
                if($rootScope.menus.length == 2){
                    _item = getOther(item);
                }
                if($rootScope.menus.length > 2){
                    _item = getParentItem(item);
                }
                return _item;
            }

            $scope.changeMenus = function(item){
                for(var i=0;i<$rootScope.menus.length;i++){
                    $rootScope.menus[i].bgc = "noActive";
                }
                item.bgc = "active";
                $state.go(item.val);
            }

            $scope.remove = function(item){
                if(item.bgc == "active"){
                    var _item = getPrevItem(item);
                    if(_item){
                        _item.bgc = "active";
                        $state.go(_item.val);
                    }else{
                        $state.go("h");
                    }
                }
                $rootScope.menus.removeItems([item]);
            }
        }
    }
})