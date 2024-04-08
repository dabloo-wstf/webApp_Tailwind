import { useEffect, useState } from "react";
import "./TransferReceipt.css";
import { getTransaferTransactionDetails } from "../../apicalls/getTransaferTransactionDetails";
import { getDateAndTime } from "../../utils/getDateAndTime";

const TransferReceipt = () => {
  //URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const txHash = urlParams.get("txHash");
  const sAddress = urlParams.get("sAddress");
  const amount = urlParams.get("amount");
  const receiverAddress = urlParams.get("receiverAddress");
  const maticPrice = urlParams.get("maticPrice");
  const gibPrice = urlParams.get("gibPrice");
  const tokenName = urlParams.get("tokenName");
  const [receiptObject, setReceiptObject] = useState({});
  const polygonScanLink = `https://polygonscan.com/tx/${txHash}`;
  useEffect(() => {
    const getReceipt = async () => {
      // API call to get receipt
      const data = await getTransaferTransactionDetails(
        txHash,
        sAddress,
        amount,
        receiverAddress,
        maticPrice,
        gibPrice,
        tokenName
      );
      setReceiptObject(data);
    };
    getReceipt();
  }, [txHash, sAddress, maticPrice, gibPrice, amount, receiverAddress,tokenName]);

  // console.log(receiptObject) // just deplohying
  return (
    <div className="receipt-container1">
      <div className="header-transfer min-height">
        <span className="transfer">Transfer</span>
        <span className="amount">
          {receiptObject?.amount} {receiptObject?.tokenName}
        </span>
        <span className="amountInUsd">${receiptObject?.amount} USD</span>
      </div>
      <div className="basic-transfer-details min-height">
        <div className="transfer-info">
          <span>Date</span>
          <span>{getDateAndTime(receiptObject?.timestamp)}</span>
        </div>
        <div className="transfer-info">
          <span>Status</span>
          <span>Completed </span>
        </div>
        <div className="transfer-info">
          <span>Recipient</span>
          <span>
            {receiptObject?.to_address?.substring(0, 8)}.....
            {receiptObject?.to_address?.substring(
              receiptObject?.to_address?.length - 8
            )}
          </span>
        </div>
      </div>
      <div className="network-transfer-details min-height">
        <div className="transfer-info">
          <span>Network fee</span>
          <span>{receiptObject?.gas} <img src="https://polygonscan.com/assets/poly/images/svg/logos/token-light.svg?v=24.3.1.0" className="matic_logo" style={{verticalAlign:'middle'}} alt="matic_logo"></img> (${receiptObject?.gasInUsd})</span>
        </div>
        <div className="transfer-info">
          <span>Nonce</span>
          <span>5</span>
        </div>
      </div>
      <div className="more-transfer-details min-height">
        <div className="transfer-info">
        <a href={`${polygonScanLink}`} className="polyscan" style={{color:'#52AAFF', margin:'auto',textDecoration:'none',cursor:'pointer',borderColor:'#52AAFF'}}>View on polygonscan &#8599;</a>
        </div>
      </div>
    </div>
  );
};

export default TransferReceipt;
