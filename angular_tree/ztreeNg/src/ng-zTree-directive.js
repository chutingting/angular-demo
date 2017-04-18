angular.module('ngzTree', []).directive('zTree', ['$timeout', function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				$timeout(function(){
				  $.fn.zTree.init(element, scope[attrs.setting], scope[attrs.zNodes]);
				})
			}
		}
	}
]);

/*angular.module('ngzTree', []).directive('zTree', function() {
	return {
		restrict: 'A',
		link: function($scope, element, attrs) {
			$.fn.zTree.init(element, $scope[attrs.setting], $scope[attrs.zNodes]);
		}
	}
});*/
