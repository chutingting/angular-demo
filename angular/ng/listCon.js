app.controller("ListCon",function($scope,$http,$window){

    $scope.$on("controller.addData", function(event, e) {
        $scope.li = false;
        var formData = e.formData;
        $scope.list.push(formData);
    });
    $scope.$on("controller.editData", function(event, e) {
        $scope.li = false;
        var formData = e.formData;
        $scope.list[e.index] = formData;
    });
    $http.get("data.json").success(function(data){
        $scope.list = data.list.data.datas;
    })
    //删除
    $scope.del = function(index) {
        if($window.confirm("确定要删除该条信息?")) {
            $scope.list.splice(index, 1);
        }
    }
    //添加
    $scope.add = function() {
        $scope.li = true;
        $scope.$broadcast("controller.add");
    }
    //修改
    //获取到修改数据的索引
    $scope.edit = function(index) {
        $scope.li = true;
        //$broadcast将事件向下传播到所有子作用域，包括自己。
        $scope.$broadcast("controller.edit", {
            formData: $scope.list[index],
            index: index
        });
    }
})