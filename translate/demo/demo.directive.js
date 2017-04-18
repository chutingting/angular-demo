angular.module("app").directive("demoModel",function(){
    return{
        templateUrl:"model.html",
        restrict:"EA",
        controller:function($scope){
            $scope.model = false;
            $scope.$on("showModel",function(event,data){
                var d = data.data.name;
                $scope.model = true;
                $scope.content = d;
            });
            $scope.close = function(){
                $scope.model = false;
            };
        }
    }

});