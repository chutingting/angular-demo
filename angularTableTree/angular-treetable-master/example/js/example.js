var app = angular.module('example', ['ngTreetable']);

app.controller('ExampleCtrl', function($scope, $q, ngTreetableParams) {

    var data = [
        {
            name: 'Some Folder',
            type: 'folder',
            size: '',
            children: [{
                name: 'AA',
                type: 'file',
                size: '500KB'
            }, {
                children: [{
                    name: 'b',
                    type: 'file',
                    size: '344KB'
                }],
                name: 'BB',
                type: 'file',
                size: '344KB'
            }, {
                name: 'CC',
                type: 'file',
                size: '344KB'
            }]
        }
    ];

    $scope.dynamic_params = new ngTreetableParams({
        getNodes: function(parent) {
            return parent ? parent.children : data;
        },
        getTemplate: function(node) {
            return 'tree_node';
        },
        options: {
            onNodeExpand: function() { //展开表格触发
                console.log('A node was expanded!');
            }
        }
    });

    $scope.expanded_params = new ngTreetableParams({
        getNodes: function(parent) {
            return parent ? parent.children : data;
        },
        getTemplate: function(node) {
            return 'tree_node';
        },
        options: {
            initialState: 'expanded'
        }
    });

});