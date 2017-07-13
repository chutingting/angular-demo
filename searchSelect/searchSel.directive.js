var app = angular.module("app",[]);
app.directive("searchSelect",function(){
    return{
        restrict : "E",
        template : '<div style="margin: 0 auto;width: 200px;">' +
        '<div style="position: relative;width: 200px;">' +
        '<input type="text" class="inputSel" ng-model="name" ng-keyup="inputData()"> ' +
        '<div id="triangle-down" class="{{clsName}}"></div></div>' +
        '<div class="search" ng-show="searchModalShow">' +
        '<table style="width:200px;"> <tr ng-repeat="item in list" style="line-height: 24px;" ng-click="ckOne(item)" title="{{item.searchNameShow}}"> <td><input type="checkbox"  ng-model="item.ck"></td> <td class="tdText">{{item.searchNameShow}}</td> </tr> </table>' +
        '<div style="padding:10px;text-align: right;">' +
        '<button ng-click="close()" class="saveBtn closeBtn">关闭</button><button ng-click="save()" class="saveBtn">确定</button></div> ' +
        '</div></div>',
        scope:{
            "getUrl":"=",
            "analysis":"=",
            "getSelData":"=",
            "parameter" : "=",
            "searchData" : "="
        },
        controller:function($scope,$http){
            $scope.list = [];
            var  _url = $scope.getUrl();

            $scope.name = "";
            $scope.searchModalShow = false;


            $scope.parameterData = $scope.parameter;

            var searchName = $scope.parameterData.name;
            var dataStructure = $scope.parameterData.dataStructure;

            //转换数据 (显示)
            function convert(data){
                for(var i=0;i<data.length;i++){
                    data[i].searchNameShow = data[i][searchName];
                }
                return data;
            }

            var dataList = "";
            function getData(){
                $http.get(_url + $scope.name ).success(function(d){
                    dataList = $scope.analysis(d);
                    $scope.list = convert(dataList);

                });
            }
            getData();


            $scope.inputData = function(){

                for(var i=0;i<$scope.list.length;i++){
                    $scope.list[i].ck = false
                }

                if($scope.name != ""){
                    var datas = [],obj={};

                    $scope.list = dataList;

                    for(var i=0;i< $scope.list.length;i++){
                        if($scope.list[i][searchName].indexOf($scope.name)>=0){
                            datas.push($scope.list[i]);
                        }
                    }
                    obj[dataStructure] = datas;
                    //     $scope.list =  $scope.searchData(obj);
                     $scope.list =  $scope.searchData(datas);

                    if(datas.length != 0){
                        $scope.searchModalShow = true;
                        $scope.clsName = "rotateUp";
                    }else{
                        $scope.searchModalShow = false;
                        $scope.clsName = "rotateDown";
                    }
                }else{
                    $scope.list = dataList;
                    $scope.searchModalShow = false;
                    $scope.clsName = "rotateDown";
                }
            };


            $scope.ckOne = function(item){
              //  item.ck = !item.ck;
            };
            $scope.save = function(){
                var res = [],inputName = [];
                for(var i=0;i<$scope.list.length;i++){
                    if($scope.list[i].ck){
                        res.push($scope.list[i]);
                        inputName.push($scope.list[i].searchNameShow)
                    }
                }
                if(res.length == 0){
                    alert("请选择一条数据!");
                    return;
                }
                $scope.getSelData(res);

                $scope.name = inputName.join(',');
                $scope.searchModalShow = false;
            };
            $scope.close = function(){
                $scope.searchModalShow = false;
                $scope.name = "";
                $scope.clsName = "rotateDown";
                for(var i=0;i<$scope.list.length;i++){
                    $scope.list[i].ck = false
                }
            }
        }
    }
});