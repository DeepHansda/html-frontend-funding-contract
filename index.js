import { ethers } from "./ethers-5.6.esm.min.js";
import { contractAddress, abi } from "./constants.js";

const connectButton = document.getElementById("connect-wallet-button");
const sendEthButton = document.getElementById("eth-amount-button");
const checkBalanceButton = document.getElementById("check-balance")
const balanceText = document.getElementById("balance")

connectButton.addEventListener("click", () => connectWallet());
sendEthButton.addEventListener("click", () => fund());
checkBalanceButton.addEventListener("click",()=>getBalance())

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
  console.log("clicked");
  const eth = document.getElementById("eth-amount").value;
  if (typeof window.ethereum !== undefined) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(eth),
      });
      await listenForTransactionMine(transactionResponse,provider);
      console.log(contract);
    } catch (error) {
      console.log(error);
    }
  } else {
  }
};

const getBalance = async() =>{
  if (typeof window.ethereum !== undefined) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const balance = await provider.getBalance(contractAddress)
    balanceText.innerText = ethers.utils.formatEther(balance)
  } catch (error) {
    console.log(error)
  }}
  else{
    console.log("Please Install Metamask")
    
  }

}

const listenForTransactionMine = async (transactionResponse, provider) => {
  console.log(`Mining ${transactionResponse.hash}...`);
  try {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      Promise.resolve(
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations. `
        )
      );
    });
  } catch (error) {
    Promise.reject(error);
  }
};
