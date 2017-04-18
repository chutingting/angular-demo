
angular.module("app").directive("pageList",function(){
    return {
        templateUrl:"./directive/paging/paging.html",
        restrict:"EA",
        scope:{
            "callbackFn":"=",
            "getUrl":"="
        },
        link:function(){},
        controller:function($scope,$http,enums){
            var index = 1;
            var size = 10;

            $scope.totalProCount = 0;
            $scope.allPages = 0;
            $scope.currentIndex = 0;
            $scope.enterIndex = "1";

            function dealUrl(){
                var url = $scope.getUrl();
                if(!url){
                    return "";
                }
                if(url.indexOf('?')== -1){
                    url = url + "?curPage="+index+"&pageSize="+size+"&ran="+Math.random();
                }else{
                    url = url + "&curPage="+index+"&pageSize="+size+"&ran="+Math.random();
                }

                return url;
            }

            function getData(){
                var url = dealUrl();
                if(url == ""){
                    return;
                }
                enums.getData(url,function(d){
                    var tmp = d.datas;
                    if(!tmp || tmp.length == 0){
                        $scope.callbackFn([]);
                    }else{
                        for(var i=0;i<tmp.length;i++){
                            tmp[i].ck = false;
                        }

                        $scope.callbackFn(tmp);
                    }
                    $scope.allPages = d.totalIndex;
                    $scope.totalProCount = d.totalCount;
                    $scope.currentIndex = index;
                })
            }

            $scope.$on("searchByFilter",function(event,data){
                index = 1;
                getData();
            })

            $scope.enterValueSearch = function(){
                var val  = parseInt($scope.enterIndex);
                if(isNaN(val) || val > parseInt($scope.allPages) || val <1 ){
                    alert("请输入小于总页数的正整数!");
                    return;
                }
                index = val;

                getData();

            }

            $scope.prev = function(){
                if(index == 1){
                    return;
                }
                index--;
                getData();
            }

            $scope.next = function(){
                if(index == parseInt($scope.allPages)){
                    return;
                }
                index++;
                getData();
            }
            getData();
        }
    }
})