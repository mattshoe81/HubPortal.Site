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
            if (form.startTime) queryDetails += QueryBuilderService.refinement(symbols.START_TIME, dateToLocalString(form.startTime));
            if (form.endTime) queryDetails += QueryBuilderService.refinement(symbols.END_TIME, dateToLocalString(form.endTime));
            if (form.minTime) queryDetails += QueryBuilderService.refinement(symbols.MIN_TIME, form.minTime * 1000);
            if (form.maxTime) queryDetails += QueryBuilderService.refinement(symbols.MAX_TIME, form.maxTime * 1000);
            if (form.pingOptions !== symbols.ALL) queryDetails += QueryBuilderService.refinement(symbols.PING_OPTION, form.pingOptions);
            if (form.failed !== symbols.ALL) queryDetails += QueryBuilderService.refinement(symbols.SUCCESS, form.failed);
            if (form.serverName) queryDetails += QueryBuilderService.refinement(symbols.SERVER_NAME, form.serverName);
            if (form.sessionID) queryDetails += QueryBuilderService.refinement(symbols.SESSION_ID, form.sessionID);
            return queryDetails;
        }

        function parseProcessSearch(form) {
            // No refinementment is necessary if you want to include all processes
            var processQuery = "";
            if (form.process !== symbols.ALL) processQuery = QueryBuilderService.refinement(symbols.PROCESS_NAME, form.process);
            return processQuery;
        }

        function parseClientSearch(form) {
            // No refinementment is necessary if you want to include all clients
            var clientQuery = "";
            if (form.client !== symbols.ALL) clientQuery = QueryBuilderService.refinement(symbols.CLIENT_NAME, form.client);
            return clientQuery;
        }

        function parseSourceSearch(form) {
            var sourceQuery = "";
            if (form.source !== symbols.ALL) sourceQuery += QueryBuilderService.refinement(symbols.SOURCE, form.source);
            if (form.destination !== symbols.ALL) sourceQuery += QueryBuilderService.refinement(symbols.DESTINATION, form.destination);
            if (form.transactionType !== symbols.ALL) sourceQuery += QueryBuilderService.refinement(symbols.TRANSACTION_TYPE, form.transactionType);
            return sourceQuery;
        }

        function parseCoverageLookup(form) {
            var coverageQuery = "";
            if (form.policyNumber) coverageQuery += QueryBuilderService.refinement(symbols.POLICY_NUMBER, form.policyNumber);
            if (form.claimNumber) coverageQuery += QueryBuilderService.refinement(symbols.CLAIM_NUMBER, form.claimNumber);
            if (form.referralNumber) coverageQuery += QueryBuilderService.refinement(symbols.REFERRAL_NUMBER, form.referralNumber);
            if (form.fnolNumber) coverageQuery += QueryBuilderService.refinement(symbols.FNOL_NUMBER, form.fnolNumber);
            if (form.csr) coverageQuery += QueryBuilderService.refinement(symbols.CSR, form.csr);
            if (form.subCompany) coverageQuery += QueryBuilderService.refinement(symbols.SUB_COMPANY, form.subCompany);
            if (form.referralDate) coverageQuery += QueryBuilderService.refinement(symbols.REFERRAL_DATE, dateToLocalString(form.referralDate));
            if (form.partNumber) coverageQuery += QueryBuilderService.refinement(symbols.PART_NUMBER, form.partNumber);
            if (form.zipCode) coverageQuery += QueryBuilderService.refinement(symbols.ZIP_CODE, form.zipCode);
            if (form.carID) coverageQuery += QueryBuilderService.refinement(symbols.CAR_ID, form.carID);
            if (form.promoCode) coverageQuery += QueryBuilderService.refinement(symbols.PROMO_CODE, form.promoCode);
            return coverageQuery;
        }

        function parseCreditCardLookup(form) {
            var cardQuery = "";
            if (form.creditCardNumber) cardQuery += QueryBuilderService.refinement(symbols.CREDIT_CARD_NUMBER, form.creditCardNumber);
            if (form.amount) cardQuery += QueryBuilderService.refinement(symbols.AMOUNT, form.amount);
            if (form.ctu) cardQuery += QueryBuilderService.refinement(symbols.CTU, form.ctu);
            if (form.workOrderNumber) cardQuery += QueryBuilderService.refinement(symbols.WORK_ORDER_NUMBER, form.workOrderNumber);
            if (form.authorizationCode) cardQuery += QueryBuilderService.refinement(symbols.AUTHORIZATION_CODE, form.authorizationCode);
            if (form.workOrderID) cardQuery += QueryBuilderService.refinement(symbols.WORK_ORDER_ID, form.workOrderID);
            return cardQuery;
        }

        function parseWholesaleLookup(form) {
            var wholesaleQuery = "";
            if (form.accountNumber) wholesaleQuery += QueryBuilderService.refinement(symbols.ACCOUNT_NUMBER, form.accountNumber);
            if (form.warehouseNumber) wholesaleQuery += QueryBuilderService.refinement(symbols.WAREHOUSE_NUMBER, form.warehouseNumber);
            if (form.orderID) wholesaleQuery += QueryBuilderService.refinement(symbols.ORDER_ID, form.orderID);
            return wholesaleQuery;
        }

        function parseShopLookup(form) {
            var shopQuery = "";
            if (form.invoiceNumber) shopQuery += QueryBuilderService.refinement(symbols.INVOICE_NUMBER, form.invoiceNumber);
            if (form.shopNumber) shopQuery += QueryBuilderService.refinement(symbols.SHOP_NUMBER, form.shopNumber);
            return shopQuery;
        }

        function parseGenericLookup(form) {
            var genericQuery = "";
            if (form.genericSearchString) {
                if (form.excludeGenericString) {
                    genericQuery += QueryBuilderService.refinement(symbols.EXCLUDE_GENERIC_STRING, form.genericSearchString);
                } else {
                    genericQuery += QueryBuilderService.refinement(symbols.INCLUDE_GENERIC_STRING, form.genericSearchString);
                }
            }
            if (form.checkpoint !== symbols.ALL) genericQuery += QueryBuilderService.refinement(symbols.CHECKPOINT, form.checkpoint);
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
