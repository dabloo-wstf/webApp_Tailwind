import { useEffect, useState } from "react";
import { transferPolygonToken } from "../../apicalls/apiCalls";
import "./TokenList.css";
import { useTelegram } from "../../hooks/useTelegram";
import { getTokens } from "../../apicalls/apiCalls";
const TokenList = () => {
  const { tid, tg } = useTelegram();
  const [selectedToken, setSelectedToken] = useState({});
  const [isTokenSelected, setIsTokenSelected] = useState(false);
  const [amount, setAmount] = useState(0);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [tokensData, setTokensData] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      const tokens = await getTokens(tid);
      console.log("tokens.....", tokens);
      setTokensData(tokens);
    };
    fetchTokens();
  }, []);
  const handleSelection = (address) => {
    setSelectedToken(tokensData.find((token) => token.address === address));
    setIsTokenSelected(true);
  };
  const handleTransfer = async () => {
    const resutl = await transferPolygonToken(
      selectedToken,
      amount,
      receiverAddress,
      tid
    );
    console.log("transferAmount.....", resutl);
  };

  const filteredData = tokensData?.filter((token) =>
    token.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
  );

  return (
    <div className="mainContainer">
      {!isTokenSelected ? (
        <div className="inner-main">
          <input
            className="inputField"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Token"
          />

{filteredData
  .slice()
  .sort((a, b) => (a.isRecommended === b.isRecommended ? 0 : a.isRecommended ? -1 : 1))
  .map((token, index) => {
    return (
      <div
        className="tokenList"
        style={
          token.address === selectedToken.address
            ? { backgroundColor: "blue", color: "white" }
            : {}
        }
        key={index}
        onClick={() => handleSelection(token.address)}
      >
        <div className="tokenList_first_child">
          <img
            className="tokenLogo"
            src={token.logoURI}
            alt={token.name}
          />
          <p>{token.name}</p>
          <p>
            {token.isRecommended ? (
              <span style={{ color: "red" }}>*</span>
            ) : (
              ""
            )}
          </p>
        </div>
        <div>
          <p style={{textAlign:'right'}}>{token.balance} {token.symbol}</p>
        </div>
      </div>
    );
  })}

        </div>
      ) : (
        <div className="selectedTokenContainer">
          <div className="selectedToken">
            <div className="tokenList">
              <img
                className="tokenLogo"
                src={selectedToken.logoURI}
                alt={selectedToken.name}
              />
              <p>{selectedToken.name}</p>
            </div>
            <input
              className="inputField"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="enter amount"
            />
            <input
              className="inputField"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
              placeholder="enter receiver Address"
            />
            <button className="button" onClick={handleTransfer}>
              Transfer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenList;
