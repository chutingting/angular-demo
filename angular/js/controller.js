angular.module('app')
   .controller("con",function($http,$scope,$state,$rootScope){


    $http.get("data.json").success(function(data){
        // console.log(data) //渲染列表
        $scope.list = data.list.data.datas;

        //删除
        $scope.del = function(item) {
            if(window.confirm("确定要删除该条信息?")) {
                $scope.list.splice($scope.list.indexOf(item),1);
            }
        }


        //编辑
        $scope.edit = function(item){
            $scope.formData.name = item.name;
            $scope.formData.age = item.age;
            $scope.formData.sex = item.sex;
            $scope.formData.address = item.address;
        }
        //添加
        /*$scope.add = function(add){
         $scope.formData.name = "";
         $scope.formData.age = "";
         $scope.formData.sex = "";
         $scope.formData.address = "";
         }*/
        //提交信息
        $scope.formData = {
            name: "",
            age: "",
            sex: "",
            address: ""
        };
        $scope.sub = function(){
            var data={
                name : $scope.formData.name,
                age : $scope.formData.age,
                sex : $scope.formData.sex,
                address :$scope.formData.address
            }
            //$scope.list.push(data);
            $scope.list[item] = data;
        }
    })
})