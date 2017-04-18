(function(angular){
    'use strict';
    angular.module("pagingModule",[]).directive("paging",function(){
        return {
            template:"<div class='pull-right bot'>共<span class='red' ng-bind='totalProCount'></span>条" +
            "<input type='button' value='上一页' ng-click='prev();' class='btn btn-info btn-sm'/>" +
            "<input type='button' value='下一页' ng-click='next()' class='btn btn-info btn-sm'/>" +
            "当前第<span class='red' ng-bind='currentIndex'></span>/<span class='red' ng-bind='allPages'></span>页" +
            "到<input type='text'  class='input' ng-model='enterIndex'/>页" +
            "<input type='button' value='确定' ng-click='doEnterSearch();' class='btn btn-success btn-sm'/></div>",
            restrict:"EA",
            scope:{
                "callbackFn":"=",
                "getUrl":"=",
                "analysis":"=",
                "pagingOption":"="
            },
            link:function(){},
            controller:function($scope,$http){
                if(!$scope.callbackFn || !$scope.getUrl || typeof $scope.callbackFn != "function" || typeof $scope.getUrl != "function"){
                    alert("回调函数和获取URL地址必须配置为函数!");
                    return;
                }

                $scope.pagingOptonData = $scope.pagingOption

                var index = $scope.pagingOptonData.index;
                var size = $scope.pagingOptonData.size;

                $scope.totalProCount = 0;
                $scope.allPages = 0;
                $scope.currentIndex = 0;
                $scope.enterIndex = "1";

                function dealUrl(){

                    var tmp = $scope.getUrl();

                    if(tmp.indexOf('?') == -1){
                        return tmp + "?"+$scope.pagingOptonData.IndexKey+"="+index+"&"+$scope.pagingOptonData.SizeKey+"="+size+"&ran="+Math.random();
                    }else{
                        return tmp + "&"+$scope.pagingOptonData.IndexKey+"="+index+"&"+$scope.pagingOptonData.SizeKey+"="+size+"&ran="+Math.random();
                    }
                }

                function getData(){
                    $http.get(dealUrl()).success(function(d){
                        if($scope.analysis){
                            d = $scope.analysis(d);
                        }

                        for(var i=0;i< d.data.length;i++){
                            d.data[i].ck = false;
                        }

                        if(d.totalPage == "-1"){
                            if(parseInt(d.totalCount)%size == 0){
                                $scope.allPages = parseInt(d.totalCount)/size;
                            }else{
                                $scope.allPages = parseInt(parseInt(d.totalCount)/size) + 1;
                            }
                        }else{
                            $scope.allPages = d.totalPage;
                        }



                        $scope.totalProCount = d.totalCount;
                        $scope.currentIndex = index;

                        $scope.callbackFn(d.data);
                    })
                }

                $scope.$on("doSearch",function(event,data){
                    index = 1;
                    getData();
                })

                $scope.doEnterSearch = function(){
                    var val  = parseInt($scope.enterIndex);
                    if(isNaN(val) || val > parseInt($scope.allPages) || val <1 ){
                        alert("请输入小于总页数的正整数!");
                        return;
                    }
                    index = val;
                    getData();
                }

                $scope.prev = function(){
                    if(index == $scope.pagingOptonData.index){
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
})(angular);

(function(angular){
    'use strict';
    angular.module("repeatFinish",[]).directive('repeatFinishCb',function(){
        return {
            restrict:"A",
            link: function(scope,element,attr){
                //console.log(scope.$index);
                if(scope.$last == true){
                    scope.$emit('renderCompleted');
                }
            }
        }
    })
})(angular);

(function(angular){
    'use strict';

    var tool = {
        mapCols:[],
        allCols:[],
        cols:[],
        isReady:false,
        readyInit:function(data,map){
            if(!data || !map || data instanceof Array == false || map instanceof Array == false ){
                this.isReady = false;
            }else{
                var _tmp = this.checkMap(data,map);
                if(_tmp){
                    this.isReady = true;
                }else{
                    this.isReady = false;
                }
            }
        },
        dealData:function(data){
            for(var i=0;i<data.length;i++){
                if(!data[i].show){
                    data[i].show = false;
                }
                if(!data[i].action){
                    data[i].action = null;
                }
            }
        },
        getCols:function(data,map){
            this.readyInit(data,map);
            if(this.isReady == false){
                alert("数据源和map映射不匹配!");
                return null;
            }
            for(var i=0;i<map.length;i++){
                if(map[i].show){
                    this.cols.push(map[i]);
                }
            }
            return this.cols;
        },
        checkMap:function(data,map){
            var count = 0;
            this.getMapCols(map);
            this.getAllCols(data);
            for(var i =0;i<this.mapCols.length;i++){
                var bl = false;
                for(var k=0;k<this.allCols.length;k++){
                    if(this.mapCols[i] == this.allCols[k]){
                        bl = true;
                        break;
                    }
                }
                if(bl){
                    count++;
                }
            }
            if(count == this.mapCols.length){
                return true;
            }
            return false;
        },
        getMapCols:function(map){
            if(!map || map instanceof Array == false ){
                return null;
            }
            for(var i=0;i<map.length;i++){
                this.mapCols.push(map[i].key);
            }
        },
        getAllCols:function(data){
            if(!data || data instanceof Array == false ){
                return null;
            }
            var tmp = data[0];
            for(var i in tmp){
                this.allCols.push(i);
            }
        }
    };

    angular.module("tableKillModule",['pagingModule','repeatFinish']).directive("tableKill",function($timeout){
        return {
            templateUrl:"temp.html",
            restrict:"EA",
            scope:{
                "getUrl":"=",
                "map":"=",
                "actions":"=",
                "renderCompletedCb":"=",
                "analysis":"=",
                "pagingOption":"="
            },
            controller:function($scope,$http){
                $scope.$on("renderCompleted",function(){
                    if($scope.renderCompletedCb){
                        $scope.renderCompletedCb();
                    }
                });

                $scope.showActionButton = false;
                $scope.items = [];
                $scope.cols = [];

                $scope.items = [];

                $scope.getUrlForPaging = $scope.getUrl;

                var existGetCols = false;
                $scope.cbForPaging = function(d){
                    $scope.cols.length = 0;
                    $scope.items.length = 0;

                    $scope.items = d;
                    $scope.cols = tool.getCols($scope.items,$scope.map);
                };

                $scope.actionsForList = $scope.actions;

                $scope.analysisData = $scope.analysis;
                $scope.pagingOptionData = $scope.pagingOption;

                if($scope.actions && $scope.actions.length != 0){
                    $scope.showActionButton = true;
                }
            }
        }
    })
})(angular);