angular.module("app", [])
    .controller("DemoController", ['$http','$scope',function($http,$scope){
        var vm = this;
        vm.tree = [
            {
                "id":"1",
                "pid":"0",
                "name":"家用电器",
                "children":[
                    {
                        "id":"4",
                        "pid":"1",
                        "name":"大家电",
                        "children":[
                            {
                                "id":"7",
                                "pid":"4",
                                "name":"空调",
                                "children":[
                                    {
                                        "id":"15",
                                        "pid":"7",
                                        "name":"海尔空调"
                                    },
                                    {
                                        "id":"16",
                                        "pid":"7",
                                        "name":"美的空调"
                                    }
                                ]
                            },
                            {
                                "id":"8",
                                "pid":"4",
                                "name":"冰箱"
                            },
                            {
                                "id":"9",
                                "pid":"4",
                                "name":"洗衣机"
                            },
                            {
                                "id":"10",
                                "pid":"4",
                                "name":"热水器"
                            }
                        ]
                    },
                    {
                        "id":"5",
                        "pid":"1",
                        "name":"生活电器",
                        "children":[
                            {
                                "id":"19",
                                "pid":"5",
                                "name":"加湿器"
                            },
                            {
                                "id":"20",
                                "pid":"5",
                                "name":"电熨斗"
                            }
                        ]
                    }
                ]
            },
            {
                "id":"2",
                "pid":"0",
                "name":"服饰",
                "children":[
                    {
                        "id":"13",
                        "pid":"2",
                        "name":"男装"
                    },
                    {
                        "id":"14",
                        "pid":"2",
                        "name":"女装"
                    }
                ]
            },
            {
                "id":"3",
                "pid":"0",
                "name":"化妆",
                "children":[
                    {
                        "id":"11",
                        "pid":"3",
                        "name":"面部护理"
                    },
                    {
                        "id":"12",
                        "pid":"3",
                        "name":"口腔护理"
                    }
                ]
            }
        ];

        vm.itemClicked = function ($item) {
            vm.selectedItem = $item;
            console.log($item, 'item 点击');
        };
        vm.itemCheckedChanged = function($item){
            console.log($item,'item 选中');
        };

        return vm;
    }])
    .directive('treeView',[function(){

        return {
            restrict: 'E',
            templateUrl: '/treeView.html',
            scope: {
                treeData: '=',
                canChecked: '=',
                textField: '@',
                itemClicked: '&',
                itemCheckedChanged: '&',
                itemTemplateUrl: '@'
            },
            controller:['$scope', function($scope){
                $scope.itemExpended = function(item, $event){
                    item.isExpend = ! item.isExpend;
                    $event.stopPropagation();
                };

                $scope.getItemIcon = function(item){
                    var isLeaf = $scope.isLeaf(item);

                    if(isLeaf){
                        return 'fa fa-leaf';
                    }

                    return item.isExpend ? 'fa fa-minus': 'fa fa-plus';
                };

                $scope.isLeaf = function(item){
                    return !item.children || !item.children.length;
                };

                $scope.warpCallback = function(callback, item, $event){
                  /* $scope.isChecked = true;*/
                    ($scope[callback] || angular.noop)({
                        $item:item,  //选中的那一项
                        $event:$event
                    });
                };
            }]
        };
    }]);