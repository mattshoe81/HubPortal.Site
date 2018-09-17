(function () {
    "use strict";

    angular.module("shared.services")
        .factory("PingService", ["PingResource", PingService]);

    function PingService(PingResource) {
        "use strict";

        function testPing(processName) {
            return PingResource.test({ processName: processName }).$promise;
        };

        return {
            test: testPing
        }
    }
}());
