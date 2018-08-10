(function () {
    angular.module("shared.directives")
        .directive("hpSubmitButton", hpSubmitButton);

    /*
     * This directive REQUIRES a resource to be bound to it in order to
     * submit, and that resource MUST have a custom function called 'submit'
     * that takes a single parameter called 'data'
     */
    function hpSubmitButton() {
        return {
            restrict: "E",
            templateUrl: "app/shared/directives/submitButtonDirective.html",
            controller: submitButtonCtrl,
            controllerAs: "submitButton",
            bindToController: {
                model: "<",
                resource: "<",
                onSubmit: "&",
                onResponse: "&"
            }
        }
    }

    function submitButtonCtrl($http) {
        var submitButton = this;

        submitButton.submit = function () {
            var button = document.getElementById("submit-button");
            button.disabled = true;
            button.textContent = "Loading...";
            if (submitButton.onSubmit) submitButton.onSubmit();
            submitButton.resource.submit(submitButton.model).$promise.then(
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