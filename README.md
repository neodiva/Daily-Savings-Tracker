# 💰 Daily Savings Tracker

A browser-based personal finance app that helps you build a daily savings habit, track your streak, and claim NFT rewards on the Ethereum blockchain when you hit your goals.

---

## What This Project Does

Daily Savings Tracker lets you:

- Set a daily savings goal (default: ₹50)
- Log how much you saved each day
- Track a running streak of consecutive days you met your goal
- View your full savings history
- Connect a MetaMask wallet and claim an NFT reward on-chain when you've earned it

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Blockchain | Ethereum (Sepolia testnet) |
| Wallet | MetaMask (via `window.ethereum`) |
| Smart contract library | ethers.js v5.7.2 |
| Storage | `localStorage` (browser) |
| Backend | **None** — fully frontend + blockchain |

There is **no backend server**. All data is stored in the user's browser via `localStorage`. The only "server-side" interaction is with the Ethereum blockchain through the user's MetaMask wallet.

---

## Project Structure

```
daily-savings-tracker/
├── index.html       # App markup and structure
├── style.css        # All styling
└── script.js        # App logic, wallet connection, blockchain interaction
```

---

## Getting Started

### Prerequisites

- A modern browser (Chrome, Firefox, Brave)
- [MetaMask](https://metamask.io/) browser extension installed
- Some Sepolia testnet ETH (for claiming the NFT)

### Running the App

No build step or server needed. Just open `index.html` in your browser:

```bash
# Option 1: Open directly
open index.html

# Option 2: Serve locally (avoids any browser restrictions)
npx serve .
# or
python -m http.server 8000
```

---

## How It Works

### Savings Logic

1. Enter the amount you saved today in the input field and click **Log**.
2. If the amount meets or exceeds the daily goal (₹50), your streak increments by 1.
3. Your streak count and full history are saved in `localStorage` so they persist across sessions.

### Wallet Connection

Click **Connect Wallet** to connect your MetaMask account. The app uses `window.ethereum` (injected by MetaMask) — no external wallet SDK needed beyond ethers.js.

### NFT Claim

Once you've connected your wallet, click **Claim NFT** to call the `claimNFT()` function on the deployed smart contract. This sends a transaction on the Sepolia testnet. MetaMask will prompt you to approve it.

The contract address is:
```
0x1c91347f2A44538ce62453BEBd9Aa907C662b4bD
```

> Make sure your MetaMask is switched to the **Sepolia** test network before claiming.

---

## Configuration

To change the daily savings goal, update this line at the top of `script.js`:

```js
const dailyGoal = 50; // change to any amount in ₹
```

To point to a different smart contract, update:

```js
const contractAddress = "0x1c91347f2A44538ce62453BEBd9Aa907C662b4bD";
```

---

## Limitations & Future Ideas

- **No backend** — data only lives in the browser. Clearing browser storage resets everything.
- **No authentication** — anyone on the same device can see the history.
- **Single goal** — the daily target is hardcoded; could be made user-configurable via a settings screen.
- **Testnet only** — the contract is deployed on Sepolia. Mainnet deployment would require additional auditing.

Possible future improvements:

- Sync data to a backend (Firebase, Supabase) for cross-device access
- Add a chart showing savings over time
- Support multiple savings goals or categories
- Email or push notification reminders
- On-chain streak verification instead of client-side `localStorage`

---

## Dependencies

All loaded via CDN — no npm install required.

| Library | Version | Purpose |
|---|---|---|
| ethers.js | 5.7.2 | Ethereum wallet and contract interaction |

---

## License

MIT — free to use, modify, and distribute.
