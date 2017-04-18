(function() {
  'use strict';
  angular.module('app.checktree', []).directive('checkTree',[function(){
    	return{
    		restrict:'A',
    		scope:{
    			inputModel:'=',
    			outputModel:'=',
    			selectModel:'@'
    		},
    		template:'<div></div>',
    		transclude:false,
    		controller:function($scope,$element,$compile){
    			var ul=$('<ul>');
    			var generaLi=function(ary,ul){
    				for(var i=0;i<ary.length;i++){
	    				var li=$('<li class="list-group-item">');
	    				var a=$('<a href="javascript:;" class="tree-col"><i class="glyphicon glyphicon-plus text-muted"></i></a>');
	    				li.append('<label class="ui-checkbox"><input type="checkbox" data-ng-click="selectItem()" data-ng-checked="'+ary[i].checked+'" value="'+ary[i].id+'" /><span>'+ary[i].name+'</span></label>');
	    				if(ary[i].checked) $scope.outputModel.push(ary[i].id);
	    				if(ary[i].children!=undefined&&ary[i].children.length>0){
	    					li.prepend(a);
	    					var newUl=$('<ul>');
	    					generaLi(ary[i].children,newUl);
	    					a.on('click',function(e){
								/*$(this).nextAll('ul').slideToggle('fast',function(){
									var a=$(this).prevAll('a');
									if(a.find('i').hasClass('glyphicon-plus')){
										a.find('i').removeClass('glyphicon-plus');
										a.find('i').addClass('glyphicon-minus');
									}
									else{
										a.find('i').addClass('glyphicon-plus');
										a.find('i').removeClass('glyphicon-minus');
									}
								});*/
	    						$(this).nextAll('ul').slideToggle('fast',function(){
	    							var a=$(this).prevAll('a');
	    							if(a.find('i').hasClass('glyphicon-minus')){
		    							a.find('i').removeClass('glyphicon-minus');
		    							a.find('i').addClass('glyphicon-plus');
		    						}
		    						else{
		    							a.find('i').addClass('glyphicon-minus');
		    							a.find('i').removeClass('glyphicon-plus');
		    						}
	    						});
	    					});
	    					li.append(newUl);
	    				}
	    				ul.append(li);
    				}
    			};
    			generaLi($scope.inputModel,ul);
    			$element.append(ul);
    			$compile(ul)($scope);
	            $scope.tree=ul.checktree({selectModel:$scope.selectModel});
    		},
    		link: function(scope, ele, attrs) {
    			scope.selectItem=function(){
    				var items=$(ele).find('input[type="checkbox"]:checked');
    				scope.outputModel=[];
    				for(var i=0;i<items.length;i++){
	    				scope.outputModel.push($(items[i]).val());
    				}
    			};
	        }
    	};
    }]);
}).call(this);
