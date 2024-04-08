import "./App.css";
import Home from "./components/home/Home";
import TransferReceipt from "./components/receipt/TransferReceipt";
import SwapReceipt from "./components/receipt/SwapReceipt";
import TokenPnl from "./components/pnl/TokenPnl";
import TokenList from "./components/tokenList/TokenList";
import Swap from "./components/swap/Swap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import ActivityIndicator from "./components/activityIndicator/ActivityIndicator";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transferReceipt" element={<TransferReceipt />} />
          <Route path="/swapReceipt" element={<SwapReceipt />} />
          <Route path="/pnl" element={<TokenPnl />} />
          <Route path="/tokenList" element={<TokenList />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/loading" element={<Loading/>}/>
          <Route path="/activityindicator" element={<ActivityIndicator/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
