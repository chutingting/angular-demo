(function () {
    'use strict';
    app.controller('BasicController', ['$scope', '$TreeDnDConvert', 'DataDemo', function ($scope, $TreeDnDConvert, DataDemo) {
                var tree;
                $scope.tree_data = {};
                $scope.my_tree = tree = {};

                $scope.my_tree.addFunction = function (node) {
                    console.log(node);
                    //alert('Function added in Controller "App.js"');
                };

                $scope.expanding_property = {
                    /*template: "<td>OK All</td>",*/
                    field: 'Name',
                    titleClass:  'text-center',
                    cellClass:   'v-middle',
                    displayName: '菜单名称'
                };
                $scope.col_defs = [
                    {
                        field: 'URL'
                    }/* {
                        field:        'URL',
                        titleStyle:   {
                            'width': '80pt'
                        },
                        titleClass:   'text-center',
                        cellClass:    'v-middle text-center',
                        displayName:  'URL',
                        cellTemplate: '<i class="fa {{ !node.Description ? \'fa-times text-danger-lter\' : \'fa-check text-success\' }} text"></i>'
                    }*/, {
                        displayName:  '是否操作页面',
                        cellTemplate: '<button ng-click="tree.addFunction(node)" class="btn btn-default btn-sm">Added Controller!</button>'
                    }, {
                        displayName:  '操作',
                        cellTemplate: '<button ng-click="tree.remove_node(node)" class="btn btn-default btn-sm">Remove</button>'
                    }];
                // DataDemo.getDatas() can see in 'Custom Option' -> Tab 'Data Demo'
                /*$scope.tree_data = DataDemo.getBigData({
                        'DemographicId': 1,
                        'ParentId':      null,
                        'Name':          'United States of America',
                        'Description':   'United States of America',
                        'Area':          9826675,
                        'Population':    318212000,
                        'TimeZone':      'UTC -5 to -10'
                    }, 10, 7, null, 'DemographicId', 'ParentId');*/
                 $scope.tree_data = $TreeDnDConvert.line2tree(DataDemo.getDatas(), 'DemographicId', 'ParentId');
            }]
    );
})();
