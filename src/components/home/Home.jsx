import { useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { buyApiCall, homeApiCall, infoApiCall } from "../../apicalls/apiCalls";
import "./Home.css";

import Loading from "../Loading/Loading";
import { useProgressiveImage } from "../Lazy/LazyBackground";
import ActivityIndicator from "../activityIndicator/ActivityIndicator";
// import chimp from './assets/images/chimp'

const Home = () => {
  const { tg, tid, onClose } = useTelegram();
  const [isLoadng, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  useEffect(() => {
    setIsExpanded(window.Telegram.WebApp.isExpanded);
    // Add event listener to detect slide-up event
    Telegram.WebApp.onEvent("viewportChanged", testhandler);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      setInfoText("Expanded Information");
    } else {
      setInfoText("Non-expanded Information");
    }
  }, [isExpanded]);

  function testhandler(object) {
    if (!this.isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }

  useEffect(() => {
    tg.ready();
    // tg.expand();
  }, [tg]);

  const callBuyApi = async () => {

    setIsLoading(true);
    setButtonsDisabled(true);

    await buyApiCall(tid, {
      username: tg.initDataUnsafe?.user?.username,
      userfirst_name: tg.initDataUnsafe?.user?.first_name,
      userlast_name: tg.initDataUnsafe?.user?.last_name,
      telegramId: tid,
    });
    setIsLoading(false);
    setTimeout(() => {
      setButtonsDisabled(false);
    }, 3000);
  };

  const callHomeApi = async () => {
    setIsLoading(true);
    setButtonsDisabled(true);
    // console.log("line 52 home js",loading)
    await homeApiCall(tid);
    setIsLoading(false);

    setTimeout(() => {
      setButtonsDisabled(false);
    }, 3000);
    // console.log("line 56 home js",loading)
  };

  const callInfoApi = async () => {

    setIsLoading(true);
    setButtonsDisabled(true);

    await infoApiCall(tid);

    setIsLoading(false);
    setTimeout(() => {
      setButtonsDisabled(false);
    }, 3000);

  };
  const backgroundImageUrl = useProgressiveImage("chimp.png");
  const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    // You can add more styling properties here
  };
  return (
    <>
      <div className="home-container" style={divStyle}>
        {isLoadng == true ? <ActivityIndicator /> : " "}
        <div className="info-container">{/* <span>{infoText}</span> */}</div>

        <div className="button-container-buy">
        <button onClick={callBuyApi} className={`btn-buy ${buttonsDisabled ? 'disabled' : ''}`} disabled={buttonsDisabled}></button>        
        </div>
        <div
          className="button-container"
          style={{
            marginBottom: isExpanded ? "4vh" : "40vh",
          }}
        >
         <button onClick={callHomeApi} className={`btn-home ${buttonsDisabled ? 'disabled' : ''}`} disabled={buttonsDisabled}></button>
      <button onClick={callInfoApi} className={`btn-info ${buttonsDisabled ? 'disabled' : ''}`} disabled={buttonsDisabled}></button>
      <button onClick={onClose} className={`btn-cross ${buttonsDisabled ? 'disabled' : ''}`} disabled={buttonsDisabled}></button>
        </div>
      </div>
    </>
  );
};

export default Home;
