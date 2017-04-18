var app, deps;

deps = ['ntt.TreeDnD', 'ngRoute'];

app = angular.module('TreeDnDTest', deps).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when(
                '/basic', {
                    templateUrl: 'basic/basic-frame.html',
                    controller:  'BasicController'
                }
            )

                .when(
                '/custom-options', {
                    templateUrl: 'custom/custom-frame.html',
                    controller:  'CustomController'
                }
            )
                .otherwise({redirectTo: '/basic'});
        }]
).directive('navigation', function ($rootScope, $location) {
        return {
            template: '<li ng-repeat="option in options" ng-class="{active: isActive(option)}">' +
                      '    <a ng-href="{{option.href}}">{{option.label}}</a>' +
                      '</li>',
            link:     function (scope, element, attr) {
                scope.options = [
                    {
                        label: 'Basic',
                        href:  '#/basic'
                    }
                ];

                scope.isActive = function (option) {
                    return option.href.indexOf(scope.location) === 1;
                };

                $rootScope.$on(
                    '$locationChangeSuccess', function (event, next, current) {
                        scope.location = $location.path();
                    }
                );
            }
        };
    }).directive('panel', function () {
        return {
            restrict: 'E',
            scope:    true,
            replace:  true,
            template: '<div class="panel" ng-class="\'panel-\' + type">' +
                        '   <div ng-if="title && title.length > 0" class="panel-heading">' +
                        '       <h3 class="panel-title">{{ title }}</h3>' +
                        '   </div>' +
                        '   <div class="panel-body" ng-transclude></div>' +
                        '</div>',
            transclude: true,
            link:       function fnPost(scope, element, attrs) {
                scope.title = attrs.title || '';
                scope.type = attrs.type || 'info';
            }
        };
    }
).directive(
    'showCode', [
        '$compile', '$timeout', function ($compile, $timeout) {
            return {
                restrict: 'E',
                replace:  true,
                link:     function (scope, element, attr) {
                    var _temp =
                            [
                                '<pre class="line-numbers">',
                                '<code class="language-' + (attr.type || 'markup') + '">',
                                '{{ data }}',
                                '</code>',
                                '</pre>'].join('')
                        ;
                    scope.data = '';

                    scope.$watch(
                        attr.source, function (val) {
                            if (val) {
                                scope.data = val;
                                element.html('');
                                element.append($compile(_temp)(scope));
                                $timeout(Prism.highlightAll, 0);
                            }
                        }, true
                    );
                }
            };
        }]
).factory('DataDemo', function () {
        return {
            getDatas: function () {
                return [
                    {
                        'DemographicId': 1,
                        'ParentId':      null,
                        'Name':          '权限管理',
                        'URL':   'United States of America',
                        'Area':          9826675,
                        'Population':    318212000,
                        'TimeZone':      'UTC -5 to -10'
                    }, {
                        'DemographicId': 2,
                        'ParentId':      1,
                        'Name':          '用户管理',
                        'URL':   'The Tech State',
                        'Area':          423970,
                        'Population':    38340000,
                        'TimeZone':      'Pacific Time'
                    }, {
                        'DemographicId': 3,
                        'ParentId':      2,
                        'Name':          '用户管理A',
                        'URL':   'The happening city',
                        'Area':          231,
                        'Population':    837442,
                        'TimeZone':      'PST'
                    }, {
                        'DemographicId': 4,
                        'ParentId':      2,
                        'Name':          '用户管理B',
                        'URL':   'Disco city',
                        'Area':          503,
                        'Population':    3904657,
                        'TimeZone':      'PST'
                    }, {
                        'DemographicId': 5,
                        'ParentId':      1,
                        'Name':          '会员管理',
                        'URL':   'Not so cool',
                        'Area':          57914,
                        'Population':    12882135,
                        'TimeZone':      'Central Time Zone'
                    }, {
                        'DemographicId': 6,
                        'ParentId':      5,
                        'Name':          '会员管理A',
                        'URL':   'Financial City',
                        'Area':          234,
                        'Population':    2695598,
                        'TimeZone':      'CST'
                    }, {
                        'DemographicId': 7,
                        'ParentId':      1,
                        'Name':          '自我管理',
                        'URL':   'Rances, Oil & Gas',
                        'Area':          268581,
                        'Population':    26448193,
                        'TimeZone':      'Mountain'
                    }];
            },
            getBigData: function (sample, number, deptMax, fn, keyId, keyParent) {

                function forDept(obj, fn, opt, deptParent) {
                    'use strict';
                    var childs = [], data, width;

                    if (angular.isFunction(fn)) {
                        width = getRandomInt(2, 6);
                        for (var i = 1; i < width && opt.amount <= opt.limit; i++) {
                            opt.amount++;
                            data = fn(obj, angular.copy(obj), opt);

                            // random children
                            if (deptParent < opt.deptMax && getRandomInt(-2, 2) > 0) {
                                forDept(data, fn, opt, ++deptParent);
                            }

                            childs.push(data);
                        }
                    }

                    obj.__children__ = childs;
                    return obj;
                }

                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                }

                console.time('Generate_BigData');
                var data       = [], opt = {
                        amount:  0,
                        deptMax: deptMax,
                        limit:   number
                    }, patern,
                    fnGenerate = fn || function (parent, cloned, _opt) {
                            'use strict';
                            var keyO = Object.keys(cloned),
                                lenO = keyO.length;
                            if (keyParent) {
                                cloned[keyParent] = parent && parent[keyId] || null;
                            }

                            cloned[keyId] = _opt.amount;

                            for (var i = 0; i < lenO; i++) {
                                if (keyO[i] !== keyParent && keyO[i] !== keyId) {
                                    cloned[keyO[i]] += '#' + _opt.amount;
                                }
                            }

                            return cloned;
                        };


                while (opt.amount < number) {
                    opt.amount++;
                    patern = fnGenerate(null, angular.copy(sample), opt);
                    data.push(forDept(patern, fnGenerate, opt, 1));
                }

                console.timeEnd('Generate_BigData');
                return data;
            }
        }
    }
);