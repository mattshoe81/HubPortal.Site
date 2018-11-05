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

        function dateToUnixEpochMilliseconds(date) {
            var adjustedHour = date.getHours() - (date.getTimezoneOffset() / 60);
            var offsetHours = (date.getTimezoneOffset() / 60);
            var offsetMinutes = offsetHours * 60;
            var offsetSeconds = offsetMinutes * 60;
            var offsetMillis = offsetSeconds * 1000;
            return date.getTime() - offsetMillis;
        }

        function parseTransactionDetails(form) {
            var queryDetails = "";
            if (form.startTime) queryDetails += QueryBuilderService.refine(symbols.TRANS_START, ">=" + dateToUnixEpochMilliseconds(form.startTime));
            if (form.endTime) queryDetails += QueryBuilderService.refine(symbols.TRANS_START, "<=" + dateToUnixEpochMilliseconds(form.endTime));
            if (form.minTime) queryDetails += QueryBuilderService.refine(symbols.ELAPSED_TIME, ">=" + form.minTime * 1000);
            if (form.maxTime) queryDetails += QueryBuilderService.refine(symbols.ELAPSED_TIME, "<=" + form.maxTime * 1000);
            if (form.pingOptions !== symbols.ALL) queryDetails += QueryBuilderService.exactMatch(symbols.PING_FLAG, form.pingOptions);
            if (form.failed !== symbols.ALL) queryDetails += QueryBuilderService.exactMatch(symbols.TRANS_COMPLETED, form.failed);
            if (form.serverName) queryDetails += QueryBuilderService.exactMatch(symbols.SERVER_NAME, form.serverName);
            if (form.sessionID) queryDetails += QueryBuilderService.exactMatch(symbols.SESSION_ID, form.sessionID);
            return queryDetails;
        }

        function parseProcessSearch(form) {
            // No refinement is necessary if you want to include all processes
            var processQuery = "";
            if (form.process !== symbols.ALL) processQuery = QueryBuilderService.exactMatch(symbols.PROCESS, form.process);
            return processQuery;
        }

        function parseClientSearch(form) {
            // No refinement is necessary if you want to include all clients
            var clientQuery = "";
            if (form.client !== symbols.ALL) clientQuery = QueryBuilderService.exactMatch(symbols.DESTINATION, form.client);
            return clientQuery;
        }

        function parseSourceSearch(form) {
            var sourceQuery = "";
            if (form.source !== symbols.ALL) sourceQuery += QueryBuilderService.exactMatch(symbols.SOURCE, form.source);
            if (form.destination !== symbols.ALL) sourceQuery += QueryBuilderService.exactMatch(symbols.DESTINATION, form.destination);
            if (form.transactionType !== symbols.ALL) sourceQuery += QueryBuilderService.exactMatch(symbols.TRANSACTION_TYPE, form.transactionType);
            return sourceQuery;
        }

        function parseCoverageLookup(form) {
            var coverageQuery = "";
            if (form.policyNumber) coverageQuery += QueryBuilderService.exactMatch(symbols.POLICY_NUMBER, form.policyNumber);
            if (form.claimNumber) coverageQuery += QueryBuilderService.exactMatch(symbols.CLAIM_NUMBER, form.claimNumber);
            if (form.referralNumber) coverageQuery += QueryBuilderService.exactMatch(symbols.REFERRAL_NUMBER, form.referralNumber);
            if (form.fnolNumber) coverageQuery += QueryBuilderService.exactMatch(symbols.FNOL_NUMBER, form.fnolNumber);
            if (form.csr) coverageQuery += QueryBuilderService.exactMatch(symbols.CSR, form.csr);
            if (form.subCompany) coverageQuery += QueryBuilderService.exactMatch(symbols.SUB_COMPANY, form.subCompany);
            if (form.referralDate) coverageQuery += QueryBuilderService.exactMatch(symbols.REFERRAL_DATE, dateToUnixEpochMilliseconds(form.referralDate));
            if (form.partNumber) coverageQuery += QueryBuilderService.exactMatch(symbols.PART_NUMBER, form.partNumber);
            if (form.zipCode) coverageQuery += QueryBuilderService.exactMatch(symbols.ZIP_CODE, form.zipCode);
            if (form.carID) coverageQuery += QueryBuilderService.exactMatch(symbols.CAR_ID, form.carID);
            if (form.promoCode) coverageQuery += QueryBuilderService.exactMatch(symbols.PROMO_CODE, form.promoCode);
            return coverageQuery;
        }

        function parseCreditCardLookup(form) {
            var cardQuery = "";
            if (form.creditCardNumber) cardQuery += QueryBuilderService.exactMatch(symbols.CREDIT_CARD_NUMBER, form.creditCardNumber);
            if (form.amount) cardQuery += QueryBuilderService.exactMatch(symbols.AMOUNT, form.amount);
            if (form.ctu) cardQuery += QueryBuilderService.exactMatch(symbols.CTU, form.ctu);
            if (form.workOrderNumber) cardQuery += QueryBuilderService.exactMatch(symbols.WORK_ORDER_NUMBER, form.workOrderNumber);
            if (form.authorizationCode) cardQuery += QueryBuilderService.exactMatch(symbols.AUTHORIZATION_CODE, form.authorizationCode);
            if (form.workOrderID) cardQuery += QueryBuilderService.exactMatch(symbols.WORK_ORDER_ID, form.workOrderID);
            return cardQuery;
        }

        function parseWholesaleLookup(form) {
            var wholesaleQuery = "";
            if (form.accountNumber) wholesaleQuery += QueryBuilderService.exactMatch(symbols.ACCOUNT_NUMBER, form.accountNumber);
            if (form.warehouseNumber) wholesaleQuery += QueryBuilderService.exactMatch(symbols.WAREHOUSE_NUMBER, form.warehouseNumber);
            if (form.orderID) wholesaleQuery += QueryBuilderService.exactMatch(symbols.ORDER_ID, form.orderID);
            return wholesaleQuery;
        }

        function parseShopLookup(form) {
            var shopQuery = "";
            if (form.invoiceNumber) shopQuery += QueryBuilderService.exactMatch(symbols.INVOICE_NUMBER, form.invoiceNumber);
            if (form.shopNumber) shopQuery += QueryBuilderService.exactMatch(symbols.SHOP_NUMBER, form.shopNumber);
            return shopQuery;
        }

        function parseGenericLookup(form) {
            var genericQuery = "";
            if (form.genericSearchString) {
                if (form.excludeGenericString) {
                    genericQuery += QueryBuilderService.negate(symbols.MESSAGE, form.genericSearchString);
                    //genericQuery += "&q=!(" + form.genericSearchString + ")";
                } else {
                    genericQuery += QueryBuilderService.refine(symbols.MESSAGE, form.genericSearchString);
                }
            }
            if (form.checkpoint !== symbols.ALL) genericQuery += QueryBuilderService.exactMatch(symbols.CHECKPOINT, form.checkpoint);
            return genericQuery;
        }

        function parseToQuery(form) {
            //var query = QueryBuilderService.getQuery();
            var query = "";
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
