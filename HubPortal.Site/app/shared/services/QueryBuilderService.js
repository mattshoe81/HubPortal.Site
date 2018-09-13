(function () {
    "use strict";

    angular.module("shared.services")
        .factory("QueryBuilderService", [QueryBuilderService]);

    function QueryBuilderService() {
        "use strict";

        function getQuery(query, queryType) {
            return query + " " + queryType + " WHERE";
        }

        function refine(property, value) {
            return " { " + property + " : '" + value + "' }";
        }

        return {
            getQuery: getQuery,
            refine: refine,
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
