(function() {
  'use strict';
  angular.module('app', ['app.checktree']).controller('myCtrl',['$scope',function($scope){
  	$scope.mydata=[{
        id:1,
        name:'文件A',
        checked:false,
        children:[
            {
                id:2,
                name:'文件a',
                checked:false,
                children:[{
                    id:7,
                    name:'文件aa',
                    checked:false
                }]
            },
            {
                id:3,
                name:'文件b',
                checked:false
            }
        ]
    },{
        id:4,
        name:'文件B',
        checked:true,
        children:[
            {
                id:5,
                name:'文件b',
                checked:true
            }
        ]
    },{
        id:6,
        name:'文件C',
        checked:true
    }];
    $scope.selectedData=[];
  }]);
}).call(this);
