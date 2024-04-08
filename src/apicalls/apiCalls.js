import axios from "axios";
import { handleClose } from "../utils/handleClose";
import { BACKEND_URL } from "../config/config";
// import { useState } from "react";

export const buyApiCall = async (tid, bodyData) => {
  const url = `${BACKEND_URL}/buy`;
  axios
    .post(`${url}?tid=${tid}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
      params: {
        tid: 123,
      },
      body: JSON.stringify(bodyData),
    })
    .then((response) => {
      handleClose();
    })
    .catch((error) => {
      console.log("error in buyApiCall: ", error);
    });
};

export const sellApiCall = async (tid, bodyData) => {
  const url = `${BACKEND_URL}/sell`;
  axios
    .post(`${url}?tid=${tid}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
      params: {
        tid: 123,
      },
      body: JSON.stringify(bodyData),
    })
    .then((response) => {
      handleClose();
    })
    .catch((error) => {
      console.log("error in buyApiCall: ", error);
    });
};

export const homeApiCall = async (tid) => {
  const url = `${BACKEND_URL}`;
  await axios
    .get(`${url}?tid=${tid}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
    })
    .then((response) => {
      handleClose();
    })
    .catch((error) => {
      console.log("error in homeApiCall: ", error);
    })
    .finally(() => {
      handleClose();
    });
};

export const infoApiCall = async (tid) => {
  console.log("inside infoApiCall...", tid);
  const url = `${BACKEND_URL}/info`;
  await axios
    .get(`${url}?tid=${tid}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
    })
    .then((response) => {
      handleClose();
    })
    .catch((error) => {
      console.log("error in infoApiCall: ", error);
    })
    .finally(() => {
      handleClose();
    });
};

export const pnlApiCall = async (tid) => {
  try {
    const url = `${BACKEND_URL}/pnl`;
    const response = await axios.get(`${url}?tid=${tid}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("error in pnlApiCall: ", error);
  }
};

export const walletApiCall = async (tid) => {
  try {
    const url = `${BACKEND_URL}/wallet`;
    const response = await axios.get(`${url}?tid=${tid}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("error in walletApiCall: ", error);
  }
};

export const transferPolygonToken = async (
  tokenInfo,
  amount,
  receiverAddress,
  tid
) => {
  const url = `${BACKEND_URL}/buyToken`;
  axios
    .post(`${url}?tid=${tid}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
      body: JSON.stringify({
        tokenInfo,
        amount,
        receiverAddress,
      }),
    })
    .then((response) => {
      handleClose();
    })
    .catch((error) => {
      console.log("error in transferPolygonToken: ", error);
    });
};

export const swapApiCall = async (tid, bodyData) => {
  const url = `${BACKEND_URL}/swap`;
  axios
    .post(`${url}?tid=${tid}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
      body: JSON.stringify(bodyData),
    })
    .then((response) => {
      handleClose();
    })
    .catch((error) => {
      console.log("error in swapApiCall: ", error);
    });
};

// getting token

export const getTokens = async (tid) => {
  try {
    const url = `${BACKEND_URL}`;
    const response = await axios.get(`${url}/tokenInfo?tid=${tid}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": 69420,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("error in getTokens: ", error);
  }
};
