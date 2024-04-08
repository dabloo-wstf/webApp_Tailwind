import axios from "axios";
import { MORALIS_API_KEY } from "../config/config";
import { tokensInfo } from "../constant/tokensInfo";

export const getTransactionDetails = async (
  transactionHash,
  sAddress,
  maticPrice,
  gibPrice
) => {
  try {
    console.log("inside getTransactionDetails....", sAddress);
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
    const moralisApi = "https://deep-index.moralis.io/api/v2.2/";
    const url = moralisApi + `transaction/${transactionHash}/verbose`;
    let data = (await axios.get(url, options)).data;
    receiptObject["hash"] = data.hash;
    receiptObject["from_address"] = data.from_address;
    receiptObject["receiverAddress"] = data.to_address;
    receiptObject["gas_price"] = data.gas_price;
    receiptObject["timestamp"] = data.block_timestamp;
    receiptObject["gas"] = (
      (data.receipt_gas_used * data.gas_price) /
      10 ** 18
    ).toFixed(4);
    receiptObject["gasInUsd"] = (receiptObject["gas"] * maticPrice).toFixed(4);
    for (let i = 0; i < data.logs.length; i++) {
      const log = data.logs[i];
      if (log.decoded_event === null) continue;
      if (log.decoded_event.label === "Swap") {
        const params = log.decoded_event.params;
        // params is array iterate over it and check if amount0In is greater than 0 then it is selling gib and purchanging matic
        if (parseFloat(params[1].value) > 0) {
          receiptObject["from_token"] = "MATIC";
          receiptObject["from_token_url"] = tokensInfo["MATIC"].imageUrl;
          receiptObject["from_token_value"] = (
            parseFloat(params[1].value) /
            10 ** 18
          ).toFixed(4);
          receiptObject["from_token_in_usd"] = (
            receiptObject["from_token_value"] * maticPrice
          ).toFixed(4);
          receiptObject["to_token"] = "GIB";
          receiptObject["to_token_url"] = tokensInfo["GIB"].imageUrl;
          receiptObject["to_token_value"] = (
            parseFloat(params[4].value) /
            10 ** 18
          ).toFixed(4);
          receiptObject["to_token_in_usd"] = (
            receiptObject["to_token_value"] * gibPrice
          ).toFixed(4);
        } else if (parseFloat(params[2].value) > 0) {
          receiptObject["from_token"] = "GIB";
          receiptObject["from_token_url"] = tokensInfo["GIB"].imageUrl;
          receiptObject["from_token_value"] = (
            parseFloat(params[2].value) /
            10 ** 18
          ).toFixed(4);
          receiptObject["from_token_in_usd"] = (
            receiptObject["from_token_value"] * gibPrice
          ).toFixed(4);
          receiptObject["to_token"] = "MATIC";
          receiptObject["to_token_url"] = tokensInfo["MATIC"].imageUrl;
          receiptObject["to_token_value"] = (
            parseFloat(params[3].value) /
            10 ** 18
          ).toFixed(4);
          receiptObject["to_token_in_usd"] = (
            receiptObject["to_token_value"] * maticPrice
          ).toFixed(4);
        }
        break;
      }
    }
    return receiptObject;
  } catch (error) {
    console.error(error.message);
  }
};
