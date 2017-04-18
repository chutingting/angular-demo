app.controller("addCon",function($scope,$window){
    var editMode = 1;
    var addMode = -1;
    //$on用于接收event与data
    $scope.$on("controller.add", function(event, data) {
        $scope.mode = addMode;
        $scope.formData.name = "";
        $scope.formData.age = "";
        $scope.formData.sex = "";
        $scope.formData.address = "";
    });
    $scope.$on("controller.edit", function(event, e) {
        $scope.formData.name = e.formData.name;
        $scope.formData.age = e.formData.age;
        $scope.formData.sex = e.formData.sex;
        $scope.formData.address = e.formData.address;
        $scope.mode = e.index;
    });
    //提交信息
    $scope.sub = function(){
        var data= {
            formData: {
                id: $scope.formData.id,
                name: $scope.formData.name,
                age: $scope.formData.age,
                sex: $scope.formData.sex,
                address: $scope.formData.address
            }
        }
        if($scope.mode != addMode) {
            data.index = $scope.mode;
            //$emit将事件向上传播到所有子作用域，包括自己。只能向parent controller传递event与data
            $scope.$emit("controller.editData", data);
        } else {
            $scope.$emit("controller.addData", data);
        }

    }
})