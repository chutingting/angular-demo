var app = angular.module("myApp",['pascalprecht.translate']);

app.config(["$translateProvider",function($translateProvider){
  
  var en_translations = {
    "language" : "Selected Language English",
    "greeting" : "Welcome To Beijing" 
  };
  
  var zh_translations = {
    "language" : "选择了中文",
    "greeting" : "北京欢迎你"  
  };

  $translateProvider.translations('en',en_translations);
  
  $translateProvider.translations('zh',zh_translations);
  
  $translateProvider.preferredLanguage('zh');


}]);

app.controller("translateController" ,["$scope","$translate","$http",function($scope,$translate,$http){

  $scope.changeLanguage = function(lang){
      $translate.use(lang);
  }
}]);