import { ethers } from "./ethers-5.6.esm.min.js";
import { contractAddress, abi } from "./constants";




const connectButton = document.getElementById("connect-wallet-button");
const sendEthButton = document.getElementById("eth-amount-button")

connectButton.addEventListener("click", () => connectWallet());
sendEthButton.addEventListener('click',()=>fund())

const connectWallet = async () => {
  console.log("Clicked");
  if (typeof window.ethereum !== undefined) {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      connectButton.innerText = "Connected";
      const account = await ethereum.request({ method: "eth_accounts" });
      console.log(account);
    } catch (error) {
      console.log(error);
    }
  } else {
    connectButton.innerText = "Please Install Metamask";
  }
};

const fund = async () => {
  if (typeof window.ethereum !== undefined) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      console.log(contract);
    } catch (error) {
      console.log(error);
    }
  } else {
  }
};
