angular.module("app").directive("showDialog",function(){
    return {
        templateUrl : "../demo03_ok/add.html",
        restrict:'EA',
        scope:{
            "callback" : "="
        },
        controller : function($scope,$rootScope,$state){
            $scope.model = false;
            $scope.name = "";
            $scope.age = "";
            $scope.address = "";

            $scope.cencel = function(){
                $scope.model = false;
            };
            //添加
            /*$scope.sub = function(){
             var data = {
             name : $scope.name,
             age : $scope.age,
             sex : $scope.sex,
             address : $scope.address
             };

             if ($scope.name == "" || $scope.age == "" || $scope.address == ""  ){
             alert("内容不能为空");
             return false;
             }

             $rootScope.list.push(data);

             $scope.name = "";
             $scope.age = "";
             $scope.sex = "";
             $scope.address = "";
             $rootScope.model = true;

             };*/
            /*修改*/
            $scope.$on("showDialog",function(event,data){
                $scope.model = true;
                if(data != null || data != undefined){
                    $scope.name = data.data.name;
                    $scope.age = data.data.age;
                    $scope.sex = data.data.sex;
                    $scope.address = data.data.address;
                }

                $scope.sub = function(){
                    var d = {
                        name : $scope.name,
                        sex : $scope.sex,
                        age : $scope.age,
                        address : $scope.address
                    };

                    if ($scope.name == "" || $scope.age == "" || $scope.address == "" || $scope.sex == "" ){
                        alert("内容不能为空");
                        return false;
                    }

                    if(data != null || data != undefined){
                        for(var i=0;i<$rootScope.list.length;i++){
                            if($rootScope.list[i].id == data.data.id){
                                $rootScope.list[i] = d;
                            }
                        }
                    }else{
                        $rootScope.list.push(d);
                    }

                    $scope.name = "";
                    $scope.sex = "";
                    $scope.age = "";
                    $scope.address = "";
                    $scope.model = false;
                };

            });
        }
    }
})
