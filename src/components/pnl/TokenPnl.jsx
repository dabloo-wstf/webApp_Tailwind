import React, { useState, useEffect } from "react";
import "./TokenPnl.css";
import {
  buyApiCall,
  pnlApiCall,
  sellApiCall,
  walletApiCall,
} from "../../apicalls/apiCalls";
import { useTelegram } from "../../hooks/useTelegram";
import { emptyTokenPnl } from "../../constant/constant";
import { tokensInfo } from "../../constant/tokensInfo";
export const TokenPnl = () => {
  const { tg, tid } = useTelegram();
  const [pnlArray, setPnlArray] = useState([]);
  const [indexPosition, setIndexPosition] = useState(0);
  const [selectedTokenPnl, setSelectedTokenPnl] = useState(emptyTokenPnl);
  const [isExpanded,setIsExpanded]=useState(false);
  const [walletInfo, setWalletInfo] = useState({
    walletAddress: "",
    maticBalance: "",
    gibBalance: "",
  });
  const [isShowWallet, setIsShowWallet] = useState(false);
  useEffect(() => {
    getPnlData(tid);
  }, [tid]);
  
  useEffect(()=>{
    setIsExpanded(window.Telegram.WebApp.isExpanded);
  },[window.Telegram.WebApp.isExpanded])

  // next previous button updation
  const handleNext = () => {
    if (indexPosition < pnlArray.length - 1) {
      setIndexPosition(indexPosition + 1);
      setSelectedTokenPnl(pnlArray[indexPosition + 1]);
    }
  };
  const handlePrevious = () => {
    if (indexPosition > 0) {
      setIndexPosition(indexPosition - 1);
      setSelectedTokenPnl(pnlArray[indexPosition - 1]);
    }
  };

  // getting pnl data
  const getPnlData = async (tid) => {
    const data = await pnlApiCall(tid);
    console.log("pnl data....",data);
    if (data?.length > 0) {
      setPnlArray(data);
      setSelectedTokenPnl(data[0]);
      setIsShowWallet(false);
    }
  };

  const callBuyApi = async () => {
    await buyApiCall(tid, {
      username: tg.initDataUnsafe?.user?.username,
      userfirst_name: tg.initDataUnsafe?.user?.first_name,
      userlast_name: tg.initDataUnsafe?.user?.last_name,
      telegramId: tid,
    });
  };

  const callSellApi = async () => {
    await sellApiCall(tid, {
      username: tg.initDataUnsafe?.user?.username,
      userfirst_name: tg.initDataUnsafe?.user?.first_name,
      userlast_name: tg.initDataUnsafe?.user?.last_name,
      telegramId: tid,
    });
  };

  const callWalletApi = async () => {
    const data = await walletApiCall(tid);
    setWalletInfo(data);
    setIsShowWallet(true);

  };
  const defaultImageUrl = 'https://polygonscan.com/assets/poly/images/svg/empty-token.svg?v=24.3.1.0';
const imageUrl = selectedTokenPnl?.imageUrl || defaultImageUrl;

  return (
    <div className="tokenpnl-container">
      {!isShowWallet ? (
        <div style={{
          minWidth : '340px',
          maxWidth : '400px'
        }}>
          <div className="header">
            <img
              src={imageUrl}
              alt="log  "
            />
            <span>{selectedTokenPnl.name}</span>
          </div>
          <hr></hr>
          <div className="information">
            <div className="info">
              <span className="title">PROFIT & LOSS</span>
              <span
                style={{
                  color: `${
                    selectedTokenPnl.profitLossInUsd > 0 ? "green" : "red"
                  }`,
                }}
              >
                {selectedTokenPnl.profitLossInUsd ?.toFixed(5)} USD
              </span>
            </div>
            <div className="info">
              <span className="title">RETURN PERCENT</span>
              <span
                style={{
                  color: `${
                    selectedTokenPnl.profitLossPercentage > 0 ? "green" : "red"
                  }`,
                }}
              >
                {selectedTokenPnl.profitLossPercentage}%
              </span>
            </div>
            <div className="info">
              <span className="title">CURRENT VALUE</span>
              <span className="value">
                {selectedTokenPnl.currentValueInUsd} USD
              </span>
            </div>
            <div className="inner-container">
              <div className="info">
                <span className="title">Initial Investment</span>
                <span className="value">
                  {selectedTokenPnl.investedAmountInUsd} USD
                </span>
              </div>
              <div className="info">
                <span className="title">Avg. Price</span>
                <span className="value">{selectedTokenPnl.avgPrice ?.toFixed(5)} USD</span>
              </div>
              <div className="info">
                <span className="title">Total Bought</span>
                <span className="value">
                  {selectedTokenPnl.value ?.toFixed(5)} {selectedTokenPnl.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="inner-container">
          <div className="info">
            <span className="title">Wallet Address:</span>
            <span className="value" style={{wordWrap:'break-word',display:'block', maxWidth:"160px"}}>{walletInfo.walletAddress}</span>
          </div>
          <div className="info">
            <span className="title">Balance:</span>
            <span className="value">{walletInfo.nativeBalane} {walletInfo.nativeToken}</span>
          </div>
          {/* <div className="info">
            <span className="title">GIB Balance</span>
            <span className="value">{walletInfo.gibBalance} GIB</span>
          </div> */}
        </div>
      )}
      {/* {isExpanded ? (
        <></>
      ) : (
        <div>
          <div className="footer">
            <button className="footer-btn" onClick={handlePrevious}>
              ⇠ Previous
            </button>
            <button className="footer-btn" onClick={() => getPnlData(tid)}>
              Refresh ↺
            </button>
            <button className="footer-btn" onClick={handleNext}>
              Next ⇢
            </button>
          </div>
        </div>
      )} */}
      <div className="buttons" style={{
        minWidth : '340px',
        maxWidth : '400px'
      }}>
        <button
          onClick={callBuyApi}
          className="btn"
          style={{ backgroundColor: "black" }}
        >
          Buy
        </button>
        {!isShowWallet ? (
          <button
            onClick={callWalletApi}
            className="btn"
            style={{
              color: "black",
              backgroundColor: "#52AAFF",
            }}
          >
            <img src="https://i.ibb.co/qYVctSs/wallet-icon.png" alt="logo" />
            <span>Wallet</span>
          </button>
        ) : (
          <button
            onClick={() => getPnlData(tid)}
            className="btn"
            style={{ backgroundColor: "white", color: "black" }}
          >
            <span>See Pnl</span>
          </button>
        )}
        <button
          onClick={callSellApi}
          className="btn"
          style={{ backgroundColor: "black" }}
        >
          Sell
        </button>
      </div>
      <div className="footer"  style={{
        minWidth : '340px',
        // maxWidth : '400px'
      }}>
        <button className="footer-btn" onClick={handlePrevious}>
          ⇠ Previous
        </button>
        <button className="footer-btn" onClick={() => getPnlData(tid)}>
          Refresh ↺
        </button>
        <button className="footer-btn" onClick={handleNext}>
          Next ⇢
        </button>
      </div>
      <span className="poweredby">Powered by SIDEBot</span>
    </div>
  );
};
export default TokenPnl;
