import React, { useState } from "react";
import { transferPolygonToken } from "../../apicalls/apiCalls";
import "./tokenModal.css";
import { useTelegram } from "../../hooks/useTelegram";

const TokenListModal = ({ isOpen, onClose, performAction, tokenData }) => {
  const { tid } = useTelegram();
  const [selectedToken, setSelectedToken] = useState({});
  const [isTokenSelected, setIsTokenSelected] = useState(false);
  const [amount, setAmount] = useState(0);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSelection = (address) => {
    setSelectedToken(tokenData.find((token) => token.address === address));
    setIsTokenSelected(true);
  };

  const handleTransfer = async () => {
    const result = await transferPolygonToken(
      selectedToken,
      amount,
      receiverAddress,
      tid
    );
    console.log("transferAmount.....", result);
  };

  const filteredData = tokenData.filter((token) =>
    token.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      {isOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="closeButton" onClick={onClose}>
              X
            </button>
            <div className="mainContainer">
              <div className="inner-main">
                <input
                  className="inputField"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search Token"
                />

                {filteredData.slice().sort((a, b) => (a.isRecommended === b.isRecommended ? 0 : a.isRecommended ? -1 : 1)).map((token, index) => (
                  <div
                    className="tokenList"
                    style={
                      token.address === selectedToken.address
                        ? { backgroundColor: "blue", color: "white" }
                        : {}
                    }
                    key={index}
                    onClick={() => performAction(token)}
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
                    <p>
                      {token.balance} {token.symbol}
                    </p>
                   </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenListModal;
