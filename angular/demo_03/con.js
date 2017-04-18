
app.controller("con",function($http,$scope){
    $http.get("data.json").success(function(data){
        $scope.list= data.list.data.datas;
    })
    //$on用于接受data和event
    $scope.$on("controller.addData", function(event, e) {
        var formData = e.formData;
        $scope.list.push(formData);
    });
    $scope.$on("controller.editData", function(event, e) {
        var formData = e.formData;
        $scope.list[e.index] = formData;
    });
    $scope.remove = function(index) {
        if(window.confirm("确定要删除该条信息?")) {
            $scope.list.splice(index, 1);
        }
    }
    $scope.add = function() {
        //$broadcast将事件向下传播到所有子作用域，包括自己。
        $scope.$broadcast("controller.add");
    }
    $scope.edit = function(index) {
        alert(index);
        $scope.$broadcast("controller.edit", {
            formData: $scope.list[index],
            index: index
        });
    }
    // })
    // app.controller("editAdd",function($scope){
    var edit_mode = 1;
    var add_mode = -1;
    $scope.$on("controller.add", function(event, data) {
        $scope.mode = add_mode;
    });
    $scope.$on("controller.edit", function(event, e) {
        $scope.formData.name = e.formData.name;
        $scope.formData.age = e.formData.age;
        $scope.formData.sex = e.formData.sex;
        $scope.formData.address = e.formData.address;
        $scope.mode = e.index;
    });
    $scope.formData = {
        name:"",
        age: "",
        sex: "",
        address: ""
    };
    $scope.submit = function() {
        var data = {
            formData: {
                name: $scope.formData.name,
                age: $scope.formData.age,
                sex: $scope.formData.sex,
                address: $scope.formData.address
            }
        };
        if($scope.mode != add_mode) {
            data.index = $scope.mode;
            //$emit将事件向上传播到所有子作用域，包括自己。只能向parent controller传递event与data
            $scope.$emit("controller.editData", data);
        } else {
            $scope.$emit("controller.addData", data);
        }
    }
})