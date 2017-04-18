angular.module("App").filter("T", ['$translate', function($translate) {
    return function(key) {
        if(key){
            return $translate.instant(key);
        }
    };
}]);