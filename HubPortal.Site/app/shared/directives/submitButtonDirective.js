(function () {
    angular.module("shared.directives")
        .directive("hpSubmitButton", hpSubmitButton);

    function hpSubmitButton() {
        return {
            restrict: "E",
            templateUrl: "app/shared/directives/submitButtonDirective.html",
            controller: submitButtonCtrl,
            controllerAs: "submitButton",
            bindToController: {
                url: "@",
                model: "=",
                onPost: "&",
                onResponse: "&"
            },
            scope: {}
        }
    }

    function submitButtonCtrl($http) {
        var submitButton = this;

        submitButton.submit = function () {
            var button = document.getElementById("submit-button");
            button.disabled = true;
            button.textContent = "Loading...";
            if (submitButton.onPost) submitButton.onPost();
            $http({
                method: 'POST',
                url: submitButton.url,
                data: submitButton.model,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function (response) {
                    submitButton.onResponse({ response: response });
                    button.disabled = false;
                    button.textContent = "Submit";
                },
                function (error) {
                    console.log("Post Error", error);
                    button.disabled = false;
                    button.textContent = "Submit";
                }
            );
        }
    }
}());