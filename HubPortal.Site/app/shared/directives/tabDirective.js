(function () {
    angular.module("shared.directives")
        .directive("hpTab", hpTab);

    function hpTab() {
        return {
            restrict: "E",
            templateUrl: "app/shared/directives/tabDirective.html",
            transclude: true,
            require: "^hpTabSet",
            scope: {
                heading: "@",
                tabClick: "&",
                clickParam: "@"
            },
            link: function (scope, elem, attr, tabsetCtrl) {
                scope.active = false;
                tabsetCtrl.addTab(scope);
            }
        }
    }
}());