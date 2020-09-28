// Object to hold all FarmCart payments operations.
const FarmCartPayments = {};

const FarmCartAPIKeyForAT = process.env.FarmCart_AT_APIKey;
const FarmCart = "FarmCart"; // Product name.

// Set up app credentials
const credentials = {
  apiKey: FarmCartAPIKeyForAT,
  // username: 'MyAppUsername'
  username: FarmCart,
};

// https://github.com/AfricasTalkingLtd/africastalking-node.js
// Initialize the SDK
const AfricasTalking = require("africastalking")(credentials);
const ATapp = AfricasTalking.APPLICATION;
const ATpayments = AfricasTalking.PAYMENTS;

// All interactions with Africa's Talking endpoints are POST requests.

FarmCartPayments.getAppBalance = (req, res) => {
  // ref: https://build.at-labs.io/docs/application%2Fapplication_data

  // Endpoints:
  // Sandbox: https://api.sandbox.africastalking.com/version1/user?username=MyAppUsername
  // Production: https://api.africastalking.com/version1/user?username=MyAppUsername

  // const sandboxBalanceURL = "https://api.sandbox.africastalking.com/version1/user?username=sandbox";
  // const liveBalanceURL = "https://api.africastalking.com/version1/user?username=FarmCart";

  function fetchBalance() {
    ATapp.fetchApplicationData()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  return fetchBalance();

  /** Sample response on success.
    {
      "userData": {
          "balance": "KES 1785.50"
      }
    } 
  */
}; //getAppBalance

FarmCartPayments.mobileCheckout = (req, res) => {
  // ref https://build.at-labs.io/docs/payments%2Fmobile%2Fcheckout

  async function initiateMobileCheckout() {
    const options = {
      productName: FarmCart,
      // Set the phone number you want to send to in international format
      phoneNumber: "+254711XXXYYY",
      // Set the 3-Letter ISO currency code and the checkout amount
      currencyCode: "KES",
      amount: "Amount to be sent by customer",
      // Set any metadata that you would like to send along with this request.
      // This metadata will be included when we send back the final payment notification
      metadata: {
        foo: "bar",
        key: "value",
      },
    };

    try {
      const result = await ATpayments.mobileCheckout(options);
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  return initiateMobileCheckout();

  /** Sample response on success.
   {
    "status": "PendingConfirmation",
    "description": "Waiting for user input",
    "transactionId": "ATPid_SampleTxnId123",
    "providerChannel": "345678",
   }
  */
}; // mobileCheckout

FarmCartPayments.mobileB2C = (req, res) => {
  // Endpoints
  // Live: https://payments.africastalking.com/mobile/b2c/request
  // Sandbox: https://payments.sandbox.africastalking.com/mobile/b2c/request

  async function initiateMobileB2C() {
    const productName = FarmCart;

    // Set your mobile b2c recipients
    const recipients = [
      {
        phoneNumber: "+254711XXXYYY",
        currencyCode: "KES",
        amount: "Amount to be sent to customer",
        metadata: {
          foor: "bar",
          key: "value",
        },
        reason: "paymentsReason",
      },
    ];

    try {
      const result = await ATpayments.mobileB2C({ productName, recipients });
      console.log(result);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json(error);
    }
  }

  return initiateMobileB2C();

  /** Sample response on success.
   {
      "numQueued": 1,
      "totalValue": "KES 100000",
      "totalTransactionFee": "KES 2.00",
      "entries": [{
          "phoneNumber": "+254711XXXYYY",
          "status": "Queued",
          "provider": "Mpesa",
          "providerChannel": "525900",
          "value": "KES 100000",
          "transactionId": "ATPid_SampleTxnId123",
          "transactionFee": "KES 1.00"
      }, {
          "phoneNumber": "+254722XXXYYY",
          "provider": "Mpesa",
          "status": "Failed",
          "errorMessage": "Insufficient Credit",
          "value": "KES 100000"
      }]
    }
   * 
   */
}; // mobileB2C

FarmCartPayments.mobileB2B = (req, res) => {
  // ref
  // https://build.at-labs.io/docs/payments%2Fmobile%2Fb2b

  // Endpoints
  // Live: https://payments.africastalking.com/mobile/b2b/request
  // Sandbox: https://payments.sandbox.africastalking.com/mobile/b2b/request

  async function initiateMobileB2B() {
    const options = {
      productName: FarmCart,
      // Set the payment provider
      provider: "myPaymentProvider",
      // Set the destination channel and destination account
      destinationChannel: "partnerBusinessChannel",
      destinationAccount: "partnerAccountName",
      // Set the transfer type
      transferType: "BusinessToBusinessTransfer",
      // Set The 3-Letter ISO currency code and the checkout amount
      currencyCode: "KES",
      amount: "Amount to be sent by customer",
      // Set any metadata that you would like to send along with this request.
      // This metadata will be included when we send back the final payment notification
      metadata: {
        foor: "bar",
        key: "value",
      },
    };

    try {
      const result = await ATpayments.mobileB2B(options);
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } // initiateMobileB2B

  return initiateMobileB2B();

  /** Sample response on success.
  {
    "status": "Queued",
    "transactionId": "ATPid_SampleTxnId123",
    "transactionFee": "KES 1.00",
    "providerChannel": "12345"
  } 
*/
}; // mobileB2B

FarmCartPayments.walletTransfer = (req, res) => {
  // Endpoints
  // Live: https://payments.africastalking.com/transfer/wallet
  // Sandbox: https://payments.sandbox.fricastalking.com/transfer/wallet

  async function initiateWalletTransfer() {
    const options = {
      // Set the name of your Africa's Talking payment product
      productName: FarmCart,
      // Set the target payment product code
      targetProductCode: "theTargetProductCode",
      // Set The 3-Letter ISO currency code and the transfer amount
      currencyCode: "KES",
      amount: "Amount to be transfered",
      // Set any metadata that you would like to send along with this request.
      // This metadata will be included when we send back the final payment notification
      metadata: {
        foo: "bar",
        key: "value",
      },
    };

    try {
      const result = await ATpayments.walletTransfer(options);
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } // initiateWalletTransfer

  return initiateWalletTransfer();

  /** Sample response on success.
  {
    "status": "Success",
    "description": "Transfered funds to sandbox [TestProduct]",
    "transactionId": "ATPid_SampleTxnId123",
  } 
  */
}; // walletTransfer

// An application stash is the wallet that funds your service usage expenses.
FarmCartPayments.topupStash = (req, res) => {
  // Endpoints
  // Live: https://payments.africastalking.com/topup/stash
  // Sandbox: https://payments.sandbox.africastalking.com/topup/stash

  async function initiateStash() {
    const options = {
      // Set the name of your Africa's Talking payment product
      productName: "myPaymentProductName",
      // Set The 3-Letter ISO currency code and the topup amount
      currencyCode: "KES",
      amount: "Amount to be stashed",
      // Set any metadata that you would like to send along with this request.
      // This metadata will be included when we send back the final payment notification
      metadata: {
        foor: "bar",
      },
    };

    try {
      const result = await ATpayments.topupStash(options);
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } // initiateStash

  return initiateStash();

  /** Sample response on success.
    {
      "status": "Success",
      "description": "Topped up user stash. New Stash Balance: KES 1500.00",
      "transactionId": "ATPid_SampleTxnId123",
    }
   * 
   */
}; // topupStash

FarmCartPayments.findTransactionInfo = (req, res) => {
  // Endpoints
  // Live: https://payments.africastalking.com/query/transaction/find
  // Sandbox: https://payments.sandbox.africastalking.com/query/transaction/find

  // Example endpoint..
  // 'https://payments.sandbox.africastalking.com/query/transaction/find?username=MyAppUserName&transactionId=394828XXXV'

  async function findTransaction() {
    const options = {
      // Set the id of the transaction you want to find
      transactionId: "ATPid_c7a49b14ae024c3c1af2cfc8645542d4",
    };

    // Find the transaction
    try {
      const result = await ATpayments.findTransaction(options);
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } // findTransaction

  return findTransaction();

  /** Sample response on success.
    {
      "status": "Success",
      "data": {
        "requestMetadata": {
            "reason": "Testing things..."
        },
        "sourceType": "Wallet",
        "source": "PaymentWallet",
        "provider": "Mpesa",
        "destinationType": "PhoneNumber",
        "description": "The service request is processed successfully.",
        "providerChannel": "824879",
        "transactionFee": "KES 1.0000",
        "providerRefId": "SAMPLE_MPESA_CODE",
        "providerMetadata": {
            "recipientIsRegistered": "true",
            "recipientName": "254724XXXYYY - John Doe"
        },
        "status": "Success",
        "productName": "testing",
        "category": "MobileB2C",
        "transactionDate": "12.05.2018 21:46:13",
        "destination": "+254708663158",
        "value": "KES 2900.0000",
        "transactionId": "ATPid_b9379b671fee8ccf24b2c74f94da0ceb",
        "creationTime": "2018-05-12 18:46:12"
      }
    }
   */
}; // findTransactionInfo

FarmCartPayments.fetchTransactions = (req, res) => {
  // https://build.at-labs.io/docs/payments%2Fquery%2Ffetch_product_transactions

  // Endpoints
  // Live: https://payments.africastalking.com/query/transaction/fetch
  // Sandbox: https://payments.sandbox.africastalking.com/query/transaction/fetch

  // Example endpoint
  // 'https://payments.sandbox.africastalking.com/query/transaction/fetch?username=MyAppUserName&productName=MyProductName&phoneNumber=+254711XXXYYY&pageNumber=1&count=1&startDate=2019-06-05&endDate=2019-07-05&category=MobileB2B&provider=Athena&status=Success&source=Card&destination=Card'

  async function fetchTransactions() {
    const options = {
      // Set the name of your Africa's Talking payment product
      productName: "TestProduct",
      filters: {
        // Set the pageNumber and count you'll be fetching from
        pageNumber: "1",
        count: "100",
        // Set any other fetch product transaction filters
      },
    };

    // Fetch the product transactions
    try {
      const results = await ATpayments.fetchProductTransactions(options);
      console.log(results);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  return fetchTransactions();

  /** Sample response on success.
  {
    "status": "Success",
    "responses": [{
      "requestMetadata": {
        "reason": "Testing things..."
      },
      "sourceType": "Wallet",
      "source": "PaymentWallet",
      "provider": "Mpesa",
      "destinationType": "PhoneNumber",
      "description": "The service request is processed successfully.",
      "providerChannel": "824879",
      "transactionFee": "KES 1.0000",
      "providerRefId": "SAMPLE_MPESA_CODE",
      "providerMetadata": {
        "recipientIsRegistered": "true",
        "recipientName": "254724XXXYYY - John Doe"
      },
      "status": "Success",
      "productName": "testing",
      "category": "MobileB2C",
      "transactionDate": "12.05.2018 21:46:13",
      "destination": "+254724XXXYYY",
      "value": "KES 2900.0000",
      "transactionId": "ATPid_b9379b671fee8ccf24b2c74f94da0ceb",
      "creationTime": "2018-05-12 18:46:12"
    }]
  }
  */
}; // fetchTransactions

FarmCartPayments.walletTransactions = (req, res) => {
  // https://build.at-labs.io/docs/payments%2Fquery%2Ffetch_wallet_transactions

  // Endpoints
  // Live: https://payments.africastalking.com/query/wallet/fetch
  // Sandbox: https://payments.sandbox.africastalking.com/query/wallet/fetch

  // Example endpoint
  // 'https://payments.sandbox.africastalking.com/query/wallet/fetch?username=MyAppUserName&pageNumber=1&count=1&startDate=2019-06-05&endDate=2019-07-05&categories=MobileB2B,MobileB2C'

  async function fetchTransactions() {
    const options = {
      // Set the name of your Africa's Talking payment product
      productName: "TestProduct",
      filters: {
        // Set the pageNumber and count you'll be fetching from
        pageNumber: "1",
        count: "25",
        // A comma delimited list of transaction categories you would like to consider
        category: "Debit,Credit",
        // Any other fetch wallet transactions filters
      },
    };

    // Fetch the wallet transactions
    try {
      const results = await ATpayments.fetchWalletTransactions(options);
      console.log(results);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  return fetchTransactions();

  /** Sample response on success.
  {
    "status": "Success",
    "responses": [{
      "description": "MobileB2C Payment Request to +254708663158",
      "balance": "KES 47.7191",
      "date": "2018-05-12 18:46:12",
      "category": "Debit",
      "transactionData": {
        "requestMetadata": {
          "reason": "Testing things..."
        },
        "sourceType": "Wallet",
        "source": "PaymentWallet",
        "provider": "Mpesa",
        "destinationType": "PhoneNumber",
        "description": "The service request is processed successfully.",
        "providerChannel": "824879",
        "transactionFee": "KES 1.0000",
        "providerRefId": "SAMPLE_MPESA_CODE",
        "providerMetadata": {
          "recipientIsRegistered": "true",
          "recipientName": "254724XXXYYY - John Doe"
        },
        "status": "Success",
        "productName": "testing",
        "category": "MobileB2C",
        "transactionDate": "12.05.2018 21:46:13",
        "destination": "+254724XXXYYY",
        "value": "KES 2900.0000",
        "transactionId": "ATPid_b9379b671fee8ccf24b2c74f94da0ceb",
        "creationTime": "2018-05-12 18:46:12"
      },
      "value": "KES 2900.0000",
      "transactionId": "ATPid_b9379b671fee8ccf24b2c74f94da0ceb"
    }]
  }
  */
}; // walletTransactions

FarmCartPayments.walletBalance = (req, res) => {
  // Endpoints
  // Live: https://payments.africastalking.com/query/wallet/balance
  // Sandbox: https://payments.sandbox.africastalking.com/query/wallet/balance

  // Example endpoint
  // 'https://payments.sandbox.africastalking.com/query/wallet/balance?username=MyAppUserName'

  async function fetchBalance() {
    // Fetch the wallet balance
    try {
      const balance = await ATpayments.fetchWalletBalance();
      console.log(balance);
    } catch (err) {
      console.log(err);
    }
  }

  return fetchBalance();
  /** Sample response on success
  {
    "status": "Success",
    "balance": "KES 47.7191"
  }
  */
}; // walletBalance

module.exports = FarmCartPayments;

// FarmCartPayments methods:
// getAppBalance, mobileCheckout, mobileB2C, mobileB2B,
// walletTransfer, topupStash, findTransactionInfo,
// fetchTransactions, walletTransactions, walletBalance
