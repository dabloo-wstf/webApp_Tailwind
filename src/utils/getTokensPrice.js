import axios from "axios";
import { GOCKETERMINAL_URL_TOKENS } from "../config/config";
export const getTokensPrice = async () => {
  try {
    const tokenData = await axios.get(GOCKETERMINAL_URL_TOKENS);
    return tokenData?.data.data.attributes.token_prices;
  } catch (error) {
    console.log("error in getting price..", error);
    return {};
  }
};
