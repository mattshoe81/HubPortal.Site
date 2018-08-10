(function () {
    "use strict";
    angular.module("shared.directives")
        .directive("hpTabSet", hpTabSet);

    function hpTabSet() {
        return {
            restrict: "E",
            templateUrl: "app/shared/directives/tabSetDirective.html",
            transclude: true,
            controller: tabSetCtrl,
            controllerAs: "tabset",
            bindToController: true,
            scope: {}
        };
    }

    function tabSetCtrl() {
        var ctrl = this;
        ctrl.tabs = [];
        ctrl.addTab = function (tab) {
            ctrl.tabs.push(tab);
            if (ctrl.tabs.length === 1) tab.active = true;
        };

        ctrl.activateTab = function (selectedTab) {
            angular.forEach(ctrl.tabs, function (tab) {
                console.log("Tab Param:     ", tab.clickParam);
                console.log("Tab Function:  ", tab.click);
                console.log("");
                if (tab.active && tab !== selectedTab) {
                    tab.active = false;
                }
            });

            selectedTab.active = true;
        };
    }
}());