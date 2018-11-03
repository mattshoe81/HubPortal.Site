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

        function getQuery() {
            return "default_operator=AND&q=";
        }

        function refine(attribute, value) {
            return "(" + attribute + ":" + value + ")";
        }

        function negate(attribute, value) {
            return "!" + refine(attribute, value);
        }

        function exactMatch(attribute, value) {
            return "(" + attribute + ":\"" + value + "\")";
        }

        return {
            getQuery: getQuery,
            refine: refine,
            negate: negate,
            exactMatch: exactMatch,
            symbols: {
                ACCOUNT_NUMBER: "accountNumber",
                ALL: "All",
                AMOUNT: "amount",
                AUTHORIZATION_CODE: "authCode",
                CAR_ID: "carId",
                CHECKPOINT: "location",
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
                ELAPSED_TIME: "totalElapsedTime",
                END_TIME: "endTime",
                EXCLUDE_GENERIC_STRING: "excludeString",
                FAILED: "failed",
                FINDALL: "FINDALL",
                FNOL_NUMBER: "fnolNumber",
                GENERIC: "generic",
                GENERIC_SEARCH_STRING: "genericSearchString",
                GET: "GET",
                IGNORE: "ignore",
                INCLUDE_GENERIC_STRING: "includeString",
                INVOICE_NUMBER: "invoiceNumber",
                ITEM: "item",
                LOOKUP_TYPE: "lookupType",
                MAX_TIME: "maxTime",
                MESSAGE: "message",
                MIN_TIME: "minTime",
                ORDER_ID: "orderId",
                OUTAGE: "outage",
                PART_NUMBER: "partNumber",
                PING_FLAG: "pingFlag",
                PING_OPTION: "pingOptions",
                POLICY_NUMBER: "policyNumber",
                PROCESS: "process",
                PROCESS_LIST: "processList",
                PROCESS_NAME: "processName",
                PROMO_CODE: "promoCode",
                REFERRAL_DATE: "referralDate",
                REFERRAL_NUMBER: "referralNumber",
                SERVER_NAME: "serverName",
                SESSION_ID: "sessionId",
                SHOP: "shop",
                SHOP_NUMBER: "shopNumber",
                SOURCE: "source",
                SOURCE_NAME: "source",
                START_TIME: "startTime",
                SUB_COMPANY: "subCompany",
                SUCCESS: "success",
                TRANS_COMPLETED: 'transCompleted',
                TRANS_START: "transTime",
                TRANSACTION: "transaction",
                TRANSACTION_DETAIL: "transactionDetail",
                TRANSACTION_ID: "transactionId",
                TRANSACTION_TYPE: "transactionType",
                TRANSACTION_TYPE_LIST: "transactionTypeList",
                WAREHOUSE_NUMBER: "warehouseNumber",
                WHOLESALE: "wholesale",
                WORK_ORDER_ID: "workOrderId",
                WORK_ORDER_NUMBER: "workOrderNumber",
                XREF_DATA: "xRefData",
                ZIP_CODE: "zipCode"
            }
        }
    }
}());
