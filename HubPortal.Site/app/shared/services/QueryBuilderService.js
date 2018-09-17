(function () {
    "use strict";

    angular.module("shared.services")
        .factory("QueryBuilderService", [QueryBuilderService]);

    /*
     * To use the query builder service:
     *      To begin, you must create a query with the getQuery function, which,
     *      given a searchType and a queryType, will return a syntactically valid query string.
     *      You may then append refinements to the query by calling the refinment function.
     *      This query string is then submitted to the API and it will return the relevant results
     *      based on the query string.
     *
     *      There are 2 type of selectionAction:
     *          1. FINDALL - used to find a list of items
     *          2. GET - used to find a single item
     *
     *      The parameter criteriaType in the getQuery method must be either a 'SearchType' or an 'Item',
     *      whose values are specified in detail in the context free grammar definition at the filepath:
     *      HubPortal.Site/ContextFreeGrammar.txt
     *
     *      For information on all other parameters, please see HubPortal.Site/ContextFreeGrammar.txt
     *
     */

    function QueryBuilderService() {
        "use strict";

        function getQuery(selectionAction, criteriaType) {
            return selectionAction + " " + criteriaType + " WHERE";
        }

        function refinement(property, value) {
            return " { " + property + " : '" + value + "' }";
        }

        return {
            getQuery: getQuery,
            refinement: refinement,
            symbols: {
                ALL: "All",
                ACCOUNT_NUMBER: "accountNumber",
                AMOUNT: "amount",
                AUTHORIZATION_CODE: "authorizationCode",
                CAR_ID: "carID",
                CHECKPOINT: "checkpoint",
                CLAIM_NUMBER: "claimNumber",
                CLIENT: "client",
                CLIENT_LIST: "clientList",
                CLIENT_NAME: "clientName",
                COVERAGE: "coverage",
                CREDIT_CARD: "creditCard",
                CREDIT_CARD_NUMBER: "creditCardNumber",
                CSR: "csr",
                CTU: "ctu",
                DESTINATION: "destination",
                DETAIL: "detail",
                END_TIME: "endTime",
                FAILED: "failed",
                FINDALL: "FINDALL",
                FNOL_NUMBER: "fnolNumber",
                GENERIC: "generic",
                GENERIC_SEARCH_STRING: "genericSearchString",
                GET: "GET",
                IGNORE: "ignore",
                INCLUDE_GENERIC_STRING: "includeString",
                EXCLUDE_GENERIC_STRING: "excludeString",
                INVOICE_NUMBER: "invoiceNumber",
                ITEM: "item",
                LOOKUP_TYPE: "lookupType",
                MAX_TIME: "maxTime",
                MIN_TIME: "minTime",
                ORDER_ID: "orderID",
                OUTAGE: "outage",
                PART_NUMBER: "partNumber",
                PING_OPTION: "pingOptions",
                POLICY_NUMBER: "policyNumber",
                PROCESS: "process",
                PROCESS_LIST: "processList",
                PROCESS_NAME: "processName",
                PROMO_CODE: "promoCode",
                REFERRAL_DATE: "referralDate",
                REFERRAL_NUMBER: "referralNumber",
                SERVER_NAME: "serverName",
                SESSION_ID: "sessionID",
                SHOP: "shop",
                SHOP_NUMBER: "shopNumber",
                SOURCE: "source",
                SOURCE_NAME: "source",
                START_TIME: "startTime",
                SUB_COMPANY: "subCompany",
                SUCCESS: "success",
                TRANSACTION: "transaction",
                TRANSACTION_DETAIL: "transactionDetail",
                TRANSACTION_ID: "transactionid",
                TRANSACTION_TYPE: "transactionType",
                TRANSACTION_TYPE_LIST: "transactionTypeList",
                WAREHOUSE_NUMBER: "warehouseNumber",
                WHOLESALE: "wholesale",
                WORK_ORDER_ID: "workOrderID",
                WORK_ORDER_NUMBER: "workOrderNumber",
                XREF_DATA: "xRefData",
                ZIP_CODE: "zipCode"
            }
        }
    }
}());
