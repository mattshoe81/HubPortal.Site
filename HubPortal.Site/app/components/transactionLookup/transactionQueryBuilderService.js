(function () {
    "use strict";

    angular.module("shared.services")
        .factory("TransactionQueryBuilderService", ["QueryBuilderService", TransactionQueryBuilderService]);

    function TransactionQueryBuilderService(QueryBuilderService) {
        "use strict";

        var symbols = QueryBuilderService.symbols;

        return {
            parseToQuery: parseToQuery,
            symbols: symbols
        }

        function dateToLocalString(date) {
            // Remove the offset, then convert to iso string.
            var adjustedHour = date.getHours() - (date.getTimezoneOffset() / 60);
            var localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), adjustedHour, date.getMinutes(), 0);
            var string = localDate.toISOString();
            return string;
        }

        function parseTransactionDetails(form) {
            var queryDetails = "";
            if (form.startTime) queryDetails += QueryBuilderService.refine(symbols.START_TIME, dateToLocalString(form.startTime));
            if (form.endTime) queryDetails += QueryBuilderService.refine(symbols.END_TIME, dateToLocalString(form.endTime));
            if (form.minTime) queryDetails += QueryBuilderService.refine(symbols.MIN_TIME, form.minTime * 1000);
            if (form.maxTime) queryDetails += QueryBuilderService.refine(symbols.MAX_TIME, form.maxTime * 1000);
            if (form.pingOptions !== symbols.ALL) queryDetails += QueryBuilderService.refine(symbols.PING_OPTION, form.pingOptions);
            if (form.failed !== symbols.ALL) queryDetails += QueryBuilderService.refine(symbols.SUCCESS, form.failed);
            if (form.serverName) queryDetails += QueryBuilderService.refine(symbols.SERVER_NAME, form.serverName);
            if (form.sessionID) queryDetails += QueryBuilderService.refine(symbols.SESSION_ID, form.sessionID);
            return queryDetails;
        }

        function parseProcessSearch(form) {
            // No refinement is necessary if you want to include all processes
            var processQuery = "";
            if (form.process !== symbols.ALL) processQuery = QueryBuilderService.refine(symbols.PROCESS_NAME, form.process);
            return processQuery;
        }

        function parseClientSearch(form) {
            // No refinement is necessary if you want to include all clients
            var clientQuery = "";
            if (form.client !== symbols.ALL) clientQuery = QueryBuilderService.refine(symbols.CLIENT_NAME, form.client);
            return clientQuery;
        }

        function parseSourceSearch(form) {
            var sourceQuery = "";
            if (form.source !== symbols.ALL) sourceQuery += QueryBuilderService.refine(symbols.SOURCE, form.source);
            if (form.destination !== symbols.ALL) sourceQuery += QueryBuilderService.refine(symbols.DESTINATION, form.destination);
            if (form.transactionType !== symbols.ALL) sourceQuery += QueryBuilderService.refine(symbols.TRANSACTION_TYPE, form.transactionType);
            return sourceQuery;
        }

        function parseCoverageLookup(form) {
            var coverageQuery = "";
            if (form.policyNumber) coverageQuery += QueryBuilderService.refine(symbols.POLICY_NUMBER, form.policyNumber);
            if (form.claimNumber) coverageQuery += QueryBuilderService.refine(symbols.CLAIM_NUMBER, form.claimNumber);
            if (form.referralNumber) coverageQuery += QueryBuilderService.refine(symbols.REFERRAL_NUMBER, form.referralNumber);
            if (form.fnolNumber) coverageQuery += QueryBuilderService.refine(symbols.FNOL_NUMBER, form.fnolNumber);
            if (form.csr) coverageQuery += QueryBuilderService.refine(symbols.CSR, form.csr);
            if (form.subCompany) coverageQuery += QueryBuilderService.refine(symbols.SUB_COMPANY, form.subCompany);
            if (form.referralDate) coverageQuery += QueryBuilderService.refine(symbols.REFERRAL_DATE, dateToLocalString(form.referralDate));
            if (form.partNumber) coverageQuery += QueryBuilderService.refine(symbols.PART_NUMBER, form.partNumber);
            if (form.zipCode) coverageQuery += QueryBuilderService.refine(symbols.ZIP_CODE, form.zipCode);
            if (form.carID) coverageQuery += QueryBuilderService.refine(symbols.CAR_ID, form.carID);
            if (form.promoCode) coverageQuery += QueryBuilderService.refine(symbols.PROMO_CODE, form.promoCode);
            return coverageQuery;
        }

        function parseCreditCardLookup(form) {
            var cardQuery = "";
            if (form.creditCardNumber) cardQuery += QueryBuilderService.refine(symbols.CREDIT_CARD_NUMBER, form.creditCardNumber);
            if (form.amount) cardQuery += QueryBuilderService.refine(symbols.AMOUNT, form.amount);
            if (form.ctu) cardQuery += QueryBuilderService.refine(symbols.CTU, form.ctu);
            if (form.workOrderNumber) cardQuery += QueryBuilderService.refine(symbols.WORK_ORDER_NUMBER, form.workOrderNumber);
            if (form.authorizationCode) cardQuery += QueryBuilderService.refine(symbols.AUTHORIZATION_CODE, form.authorizationCode);
            if (form.workOrderID) cardQuery += QueryBuilderService.refine(symbols.WORK_ORDER_ID, form.workOrderID);
            return cardQuery;
        }

        function parseWholesaleLookup(form) {
            var wholesaleQuery = "";
            if (form.accountNumber) wholesaleQuery += QueryBuilderService.refine(symbols.ACCOUNT_NUMBER, form.accountNumber);
            if (form.warehouseNumber) wholesaleQuery += QueryBuilderService.refine(symbols.WAREHOUSE_NUMBER, form.warehouseNumber);
            if (form.orderID) wholesaleQuery += QueryBuilderService.refine(symbols.ORDER_ID, form.orderID);
            return wholesaleQuery;
        }

        function parseShopLookup(form) {
            var shopQuery = "";
            if (form.invoiceNumber) shopQuery += QueryBuilderService.refine(symbols.INVOICE_NUMBER, form.invoiceNumber);
            if (form.shopNumber) shopQuery += QueryBuilderService.refine(symbols.SHOP_NUMBER, form.shopNumber);
            return shopQuery;
        }

        function parseGenericLookup(form) {
            var genericQuery = "";
            if (form.genericSearchString) {
                if (form.includeGenericStringInTransaction) {
                    genericQuery += QueryBuilderService.refine(symbols.INCLUDE_GENERIC_STRING, form.genericSearchString);
                } else {
                    genericQuery += QueryBuilderService.refine(symbols.EXCLUDE_GENERIC_STRING, form.genericSearchString);
                }
            }
            if (form.checkpoint !== symbols.ALL) genericQuery += QueryBuilderService.refine(symbols.CHECKPOINT, form.checkpoint);
            return genericQuery;
        }

        function parseToQuery(form) {
            var query = QueryBuilderService.getQuery(symbols.FINDALL, symbols.TRANSACTION);
            switch (form.searchType) {
                case symbols.PROCESS:
                    query += parseProcessSearch(form);
                    break;
                case symbols.CLIENT:
                    query += parseClientSearch(form);
                    break;
                case symbols.SOURCE:
                    query += parseSourceSearch(form);
                    break;
            }
            query += parseTransactionDetails(form);
            switch (form.lookupType) {
                case symbols.COVERAGE:
                    query += parseCoverageLookup(form);
                    break;
                case symbols.CREDIT_CARD:
                    query += parseCreditCardLookup(form);
                    break;
                case symbols.WHOLESALE:
                    query += parseWholesaleLookup(form);
                    break;
                case symbols.SHOP:
                    query += parseShopLookup(form);
                    break;
                case symbols.GENERIC:
                    query += parseGenericLookup(form);
                    break;
            }

            return query;
        }
    }
}());
