import { useEffect, useState } from "react";
import { getTransactionDetails } from "../../apicalls/getTransactionDetails";
import "./SwapReceipt.css";
import { getDateAndTime } from "../../utils/getDateAndTime";

const SwapReceipt = () => {
  // URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const txHash = urlParams.get("txHash");
  const sAddress = urlParams.get("sAddress");
  const maticPrice = urlParams.get("maticPrice");
  const gibPrice = urlParams.get("gibPrice");
  const [receiptObject, setReceiptObject] = useState({});
  const polygonScanLink = `https://polygonscan.com/tx/${txHash}`;
  useEffect(() => {
    const getReceipt = async () => {
      // API call to get receipt
      const data = await getTransactionDetails(
        txHash,
        sAddress,
        maticPrice,
        gibPrice
      );
      setReceiptObject(data);
      console.log(data?.to_token_url);
      console.log(data?.from_token_url)
      console.log("inside swap receipt");
      console.log("inside swap receipt");
    };
    getReceipt();
  }, [txHash, sAddress, maticPrice, gibPrice]);

  return (
    <div className="receipt-container">
      <div className="header-swap min-heigh">
        <div className="sold-container">
          <div className="soldToken">
            <div className="img-container">
              <img
                className="img"
                src={receiptObject?.from_token_url===undefined?"https://polygonscan.com/assets/poly/images/svg/empty-token.svg?v=24.3.1.0":receiptObject?.from_token_url}
                alt="from_token"
              />
            </div>
            <span className="soldTokenName">{receiptObject?.from_token}
            </span>
          </div>
          <div className="soldToken-info">
            <span className="title-sold">You Sold</span>
           <div className="small_cart_container">
           <span className="amount-sold">
              {receiptObject?.from_token_value}
            </span>
            <span className="usdAmount-sold">
              ${receiptObject?.from_token_in_usd}
            </span>
           </div>
          </div>
        </div>
        <div className="swap-logo"></div>
        <div className="got-container">
          <div className="gotToken">
            <div className="img-container">
              <img
                className="img"
                src={receiptObject?.to_token_url===undefined?"https://polygonscan.com/assets/poly/images/svg/empty-token.svg?v=24.3.1.0":receiptObject?.to_token_url}
                alt="to_token"
              />
            </div>
            <span className="gotTokenName">{receiptObject?.to_token}</span>
          </div>
          <div className="gotToken-info">
            <p className="title-got">You Got</p>
            <div className="small_cart_container1">
            <span className="amount-got">{receiptObject?.to_token_value}</span>
            <span className="usdAmount-got">
              ${receiptObject?.to_token_in_usd}
            </span>
            </div>
          </div>
        </div>
      </div>
      <div className="dotted_div min-height">
      <div className="basic-swap-details min-height">
        <div className="swap-info">
          <span>Date</span>
          <span>{getDateAndTime(receiptObject?.timestamp)}</span>
        </div>
        <div className="swap-info">
          <span>Status</span>
          <span className="completed">Completed</span>
        </div>
        {/* <div className="swap-info">
          <span>Recipient</span>
          <span>
            {receiptObject?.to_address?.substring(0, 8)}.....
            {receiptObject?.to_address?.substring(
              receiptObject?.to_address?.length - 8
            )}
          </span>
        </div> */}
      </div>
      <div className="network-swap-details min-height">
        <div className="swap-info">
          <span>Network fee</span>
          <span>
            {receiptObject?.gas} <img src="https://polygonscan.com/assets/poly/images/svg/logos/token-light.svg?v=24.3.1.0" className="matic_logo" style={{verticalAlign:'middle'}} alt="matic_logo"></img> (${receiptObject?.gasInUsd})
          </span>
        </div>
        <div className="swap-info">
          <span>Nonce</span>
          <span>5</span>
        </div>
      </div>
      </div>
      <div className="more-swap-details min-height">
        <div className="swap-info">
          {/* <span style={{}}>View on Polygon</span> */}
          <a href={`${polygonScanLink}`} className="polyscan" style={{margin:'auto',textDecoration:'none', color:'#52AAFF', borderColor:'#52AAFF'}}>View on polygonscan &#8599;</a>
          
        </div>
      </div>
    </div>
  );
};

export default SwapReceipt;
