app.controller("listCon",function($http,$scope){
        $scope.$on("controller.addData", function(event, e) {
            var formData = e.formData;
            $scope.list.push(formData);
        });

        $scope.$on("controller.editData", function(event, e) {
            var formData = e.formData;
            $scope.list[e.index] = formData;
        });

        $http.get("data.json").success(function(data){
            // console.log(data) //渲染列表
            $scope.list = data.list.data.datas;
        })
        //删除
        $scope.del = function(item) {
            if(window.confirm("确定要删除该条信息?")) {
                $scope.list.splice($scope.list.indexOf(item),1);
            }
        }

        $scope.add = function(){
            //$broadcast将事件向下传播到所有子作用域，包括自己。 只能向child controller传递event与data
            $scope.$broadcast("controller.add");
        }
        $scope.edit = function(index) {
            $scope.$broadcast("controller.edit", {
                formData: $scope.list[index],
                index: index
            });
        }



})