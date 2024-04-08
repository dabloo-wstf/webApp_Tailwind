import axios from "axios";

export const getTransaferTransactionDetails = async (
  transactionHash,
  sAddress,
  amount,
  receiverAddress,
  maticPrice,
  gibPrice,
  tokenName
) => {
  const dummyTxHash =
    "0xf3acabf09d29ae19b17775d3ef8c9b793be00c0d33b1df83e0016e9352cf62da"; // dummy for matic transfer
  // const dummyTxHash =
  // "0x0864b958cdab0c658a91ca3d814a442df8f96bdb440dde064ffab18158a630c9"; // dummy for gib transafer

  console.log("inside getTransaferTransactionDetails....", sAddress);
  const MORALIS_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImYwZGM2M2I1LWQxMjMtNDkwYy1iYWExLTNmNjM2MjVmM2MzOCIsIm9yZ0lkIjoiMTY1ODYyIiwidXNlcklkIjoiMTY1NTMwIiwidHlwZUlkIjoiNWFhNzU3NzEtMjIwOC00MzhkLThlMjEtMDM0ZjQ2ZDhmOGE4IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDUzMTIzNTEsImV4cCI6NDg2MTA3MjM1MX0.49frVA8etA5UuHvJ2bKVxLy54FVJwhvlUONJRKDuX1Q";
  try {
    const receiptObject = {};
    const options = {
      headers: {
        accept: "application/json",
        "X-API-Key": MORALIS_API_KEY,
      },
      params: {
        chain: "polygon",
      },
    };
    // https://deep-index.moralis.io/api/v2.2/transaction/:transaction_hash
    const moralisApi = "https://deep-index.moralis.io/api/v2.2/";
    const url = moralisApi + `transaction/${dummyTxHash}/verbose`;
    let data = (await axios.get(url, options)).data;
    console.log("data........", data);
    receiptObject["hash"] = data.hash;
    receiptObject["tokenName"] = tokenName;
    receiptObject["amount"] = amount;
    receiptObject["amountInUsd"] = (
      receiptObject["amount"] * (tokenName === "MATIC" ? maticPrice : gibPrice)
    )?.toFixed(4);
    receiptObject["to_address"] = receiverAddress;
    receiptObject["gas"] = (
      (data.receipt_gas_used * data.gas_price) /
      10 ** 18
    ).toFixed(4);
    receiptObject["gasInUsd"] = (receiptObject["gas"] * maticPrice).toFixed(4);
    receiptObject["timestamp"] = data.block_timestamp;
    return receiptObject;
  } catch (error) {
    console.error(error.message);
  }
};
// txhash,gas,from,to,amount,token,timestamp,send amount, receive amount
