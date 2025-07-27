const dailyGoal = 50;
document.getElementById("goal").textContent = dailyGoal;
let streak = parseInt(localStorage.getItem("streak")) || 0;
let history = JSON.parse(localStorage.getItem("history")) || [];

document.getElementById("streak").textContent = streak;
const historyList = document.getElementById("historyList");
history.forEach(entry => {
  const li = document.createElement("li");
  li.textContent = `${entry.date}: ₹${entry.amount}`;
  historyList.appendChild(li);
});

// Connect wallet
const connectBtn = document.getElementById("connectBtn");
const walletAddressDisplay = document.getElementById("walletAddress");
let userAccount;

connectBtn.addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userAccount = accounts[0];
      walletAddressDisplay.textContent = `🦊 Connected: ${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`;
    } catch (err) {
      console.error("Connection error:", err);
    }
  } else {
    alert("Please install MetaMask to use this feature.");
  }
});

// Log Savings
document.getElementById("logForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById("amount").value);
  const msg = document.getElementById("message");

  if (amount >= dailyGoal) {
    streak += 1;
    document.getElementById("streak").textContent = streak;
    localStorage.setItem("streak", streak);

    const entry = {
      date: new Date().toDateString(),
      amount
    };
    history.push(entry);
    localStorage.setItem("history", JSON.stringify(history));

    const li = document.createElement("li");
    li.textContent = `${entry.date}: ₹${entry.amount}`;
    historyList.appendChild(li);

    msg.textContent = "✅ Goal Achieved! Streak +1 🔥";
    msg.style.color = "green";
  } else {
    msg.textContent = "❌ You didn’t meet today’s goal.";
    msg.style.color = "red";
  }

  document.getElementById("amount").value = "";
});

// Blockchain interaction
const contractABI = [
  {
    "inputs": [],
    "name": "claimNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractAddress = "0x1c91347f2A44538ce62453BEBd9Aa907C662b4bD"; // Replace this!

document.getElementById("claimBtn").addEventListener("click", async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const tx = await contract.claimNFT();
    alert("⏳ Claiming... Check MetaMask to approve.");
    await tx.wait();
    alert("✅ NFT Claimed successfully!");
  } catch (err) {
    console.error(err);
    alert("❌ Transaction failed. Make sure you're on Sepolia network.");
  }
});
