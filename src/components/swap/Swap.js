import { MdOutlineSwapVerticalCircle } from "react-icons/md";
import "./Swap.css";
import { useState, useEffect } from "react";
import TokenListModal from "../tokenModal/tokenModal";
import { tokensInfo } from "../../constant/tokensInfo";
import { useTelegram } from "../../hooks/useTelegram";
import { getTokens, swapApiCall } from "../../apicalls/apiCalls";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { getERCTokenBalance } from "../../utils/getERCTokenBalance";
import { getMaticBalance } from "../../utils/getMaticBalance";
import { getTokensPrice } from "../../utils/getTokensPrice";
export const Swap = () => {
  const [fromTokenAmount, setFromTokenAmount] = useState(0);
  const [toTokenAmount, setToTokenAmount] = useState(0);
  const [fromTokenInfo, setFromTokenInfo] = useState({});
  const [toTokenInfo, setToTokenInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [tokenSelection, setTokenSelection] = useState("fromToken");
  const [isDisabled, setIsDisabled] = useState(false);
  const [walletAssets, setWalletAssets] = useState([]);
  const [tokensUsdprices, setTokenUsdPrices] = useState({});
  const [fromTokenBalance, setFromTokenBalance] = useState(0);
  const [fromTokenUsdPrice, setFromTokenUsdPrice] = useState(0);
  const [toTokenBalance, setToTokenBalance] = useState(0);
  const [toTokenUsdPrice, setToTokenUsdPrice] = useState(0);
  const [maticBalance, setMaticBalance] = useState(0);
  const [selectedPercentage, setSelectedPercentage] = useState(0);
  const [tokensData, setTokensData] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);
  const fromTokenAddress = urlParams.get("from");
  const toTokenAddress = urlParams.get("to");
  const walletAddress = urlParams.get("walletAddress");
  // const fromTokenAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  // const toTokenAddress = "0x3efcd659b7a45d14dda8a102836ce4b765c42324";
  // const walletAddress = "0xE1F35CB341eD58EaC9dF59A6B0A4F081eb47E3e8";
  const { tg, tid, onClose } = useTelegram();

  useEffect(() => {
    const handleDataCollection = async () => {
      try {
        // const data = await getERCTokenBalance(walletAddress);
        // setWalletAssets(data);
        // const maticBalanceData = await getMaticBalance(walletAddress);
        // setMaticBalance(maticBalanceData);

        const tokenPrices = await getTokensPrice();
        setTokenUsdPrices(tokenPrices);
        const tokens = await getTokens(1086651866);
        console.log("tokens.....", tokens);
        setTokensData(tokens);
        // extract token info from tokenInfo and assigned respective state
        const fromToken = tokensData?.find(
          (token) => token.address === fromTokenAddress
        );
        const toToken = tokensData.find(
          (token) => token.address === toTokenAddress
        );

        setFromTokenInfo(fromToken);
        setToTokenInfo(toToken);
      } catch (error) {
        console.log("error in data collection....", error);
      }
    };
    handleDataCollection();

    tg.ready();
  }, []);

  useEffect(() => {
    setFromTokenAmount(0);
    setSelectedPercentage(0);
    // from token balance
    // if (
    //   fromTokenInfo?.address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
    // ) {
    //   setFromTokenBalance(maticBalance);
    // } else {
    //   const fromTokenBalanceData = walletAssets?.find(
    //     (token) => token.token_address === fromTokenInfo?.address?.toLowerCase()
    //   );
    //   setFromTokenBalance(
    //     fromTokenBalanceData
    //       ? (
    //           fromTokenBalanceData?.balance /
    //           10 ** fromTokenBalanceData?.decimals
    //         )?.toFixed(4)
    //       : 0
    //   );
    // }
    // setFromTokenUsdPrice(
    //   parseFloat(tokensUsdprices[fromTokenInfo?.address?.toLowerCase()])
    // );
    // to token balance
    if (toTokenInfo?.address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
      setToTokenBalance(maticBalance);
    } else {
      const toTokenBalanceData = walletAssets?.find(
        (token) => token.token_address === toTokenInfo?.address?.toLowerCase()
      );

      setToTokenBalance(
        toTokenBalanceData
          ? (
              toTokenBalanceData?.balance /
              10 ** toTokenBalanceData?.decimals
            )?.toFixed(4)
          : 0
      );
      setToTokenUsdPrice(parseFloat(tokensUsdprices[toTokenInfo?.address]));
    }
  }, [walletAssets, maticBalance, fromTokenInfo, toTokenInfo, tokensUsdprices]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleSwitch = () => {
    const temp = toTokenInfo;
    setToTokenInfo(fromTokenInfo);
    setFromTokenInfo(temp);
  };
  const handleOpen = (tokenSelectionType) => {
    if (tokenSelectionType === "fromToken") {
      setTokenSelection("fromToken");
    } else if (tokenSelectionType === "toToken") {
      setTokenSelection("toToken");
    }
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTokenSelection = (tokenInfo) => {
    if (tokenSelection === "fromToken") {
      handleSelectFromToken(tokenInfo);
    } else if (tokenSelection === "toToken") {
      handleSelectToToken(tokenInfo);
    }
  };

  const handleSelectFromToken = (tokenInfo) => {
    setFromTokenInfo(tokenInfo);
    handleClose();
  };
  const handleSelectToToken = (tokenInfo) => {
    setToTokenInfo(tokenInfo);
    handleClose();
  };

  const handleSwap = async () => {
    setIsDisabled(true);
    const result = await swapApiCall(1086651866, {
      fromTokenInfo,
      toTokenInfo,
      amount: fromTokenAmount,
    });
    console.log("swapAmount.....", result);
  };

  const handleBalanceSelection = (percentage) => {
    setFromTokenAmount((fromTokenBalance * (percentage / 100))?.toFixed(2));
    setSelectedPercentage(percentage);
  };

  const handleChange = (event, percentage) => {
    setSelectedPercentage(event.target.value);
    handleBalanceSelection(selectedPercentage);
  };

  const handleEnterInput = (event) => {
    setFromTokenAmount(event.target.value);
    setSelectedPercentage(
      ((event.target.value / fromTokenBalance) * 100)?.toFixed(2)
    );
  };
  return (
    <div className="swapContainer">
      {/* <h1>Swap</h1> */}
      {/* <div className="hr"></div> */}
      {/* <div style={{display:"flex"}}>
      <span>{fromTokenInfo?.name}</span>

{fromTokenInfo?.name && toTokenInfo?.name != "undefined" ? (
  <p style={{marginLeft:"10px",marginRight:"10px"}}>&#8644;</p>
) : (
  ""
)}
<span>{toTokenInfo?.name}</span>
      </div> */}
      <div className="tokensContainer">
        <div className="fromTokenContainer">
          <span>From:</span>
          <div className="fromToken">
            <div
              className="fromTokenInfo"
              onClick={() => handleOpen("fromToken")}
            >
              <img
                className="tokenLogo"
                src={fromTokenInfo?.logoURI}
                alt={fromTokenInfo?.name}
              />
              <p>{fromTokenInfo?.name}</p>
            </div>
            <input
              className="input"
              type="number"
              value={fromTokenAmount}
              onChange={(e) => handleEnterInput(e)}
            />
          </div>
          <div className="fromToken">
            <span>
              Balance: {fromTokenBalance} {fromTokenInfo?.name}
            </span>
            <span className="balance">
              ${(fromTokenBalance * fromTokenUsdPrice)?.toFixed(4)}
            </span>
          </div>

          {/* balance selector */}
          <div className="balanceSelection">
            <div style={{}}>
              <input
                type="range"
                min="0"
                max="100"
                step="2"
                value={selectedPercentage}
                onChange={handleChange}
                className="balanceSelectionSlider"
              />
              <div className="balanceSelection1">
                <span
                  onClick={() => handleBalanceSelection(1)}
                  className="balanceSelectionButton"
                >
                  1%
                </span>
                <span
                  onClick={() => handleBalanceSelection(25)}
                  className="balanceSelectionButton"
                >
                  25%
                </span>
                <span
                  onClick={() => handleBalanceSelection(50)}
                  className="balanceSelectionButton"
                >
                  50%
                </span>
                <span
                  onClick={() => handleBalanceSelection(75)}
                  className="balanceSelectionButton"
                >
                  75%
                </span>
                <span
                  onClick={() => handleBalanceSelection(100)}
                  className="balanceSelectionButton"
                >
                  100%
                </span>
              </div>
            </div>
            <div></div>
            <div className="balanceSelectionLine">
              <div
                className="balanceSelectionPoint"
                style={{ left: `${selectedPercentage}%` }}
              ></div>
            </div>
            <div>{selectedPercentage}%</div>
            {/* <div>Available Balance: {totalBalance}</div> */}
            {/* <div>Calculated Value: {calculatedValue}</div> */}
          </div>
        </div>
        <MdOutlineSwapVerticalCircle
          style={{
            width: "50px",
            height: "50px",
            marginTop: "-25px",
            marginBottom: "-25px",
            position: "relative",
            color: "black",
            // zIndex: 1,
          }}
          onClick={handleSwitch}
        />
        <div className="toTokenContainer">
          <span>To:</span>
          <div className="fromToken">
            <div
              className="fromTokenInfo"
              onClick={() => handleOpen("toToken")}
            >
              <img
                className="tokenLogo"
                src={toTokenInfo?.logoURI}
                alt={toTokenInfo?.name}
              />
              <p>{toTokenInfo?.name}</p>
            </div>
            <input
              className="input"
              type="number"
              value={toTokenAmount}
              readOnly
              onChange={(e) => setToTokenAmount(e.target.value)}
            />
          </div>
          <div className="fromToken">
            <span>
              Balance: {toTokenBalance} {toTokenInfo?.name}
            </span>
            {/* <span className="balance">$0.0</span> */}
          </div>
        </div>
      </div>
      <button className="swapButton" onClick={handleSwap} disabled={isDisabled}>
        Swap &nbsp; &#8651;
      </button>
      <TokenListModal
        optionsList={tokensInfo}
        isOpen={isOpen}
        handleOptionClick={handleOptionClick}
        onClose={handleClose}
        performAction={handleTokenSelection}
        tokenData={tokensData}
      />
    </div>
  );
};
export default Swap;
