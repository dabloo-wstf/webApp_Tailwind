import { ethers } from "ethers";
import { RPC_URL } from "../config/config";
export const getMaticBalance = async (walletAddress) => {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const maticBalance = await provider.getBalance(walletAddress);
    const maticBalanceIn5Place = parseFloat(
      ethers.formatEther(maticBalance)
    ).toFixed(5);
    return maticBalanceIn5Place;
  } catch (error) {
    console.log("error in getting matice balance...",error);
    return 0;
  }
};
