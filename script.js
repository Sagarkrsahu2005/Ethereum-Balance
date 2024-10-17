const connectButton = document.getElementById('connectButton');
const balanceDisplay = document.getElementById('balanceDisplay');

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log("Connected account:", account);
            connectButton.innerText = "Connected" + account;
            getBalance(account);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this feature.');
    }
}

async function getBalance(account) {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balanceInWei = await provider.getBalance(account);
        const balanceInEther = ethers.utils.formatEther(balanceInWei);
        balanceDisplay.innerText = `Your ETH balance: ${balanceInEther} ETH`;
    } catch (error) {
        console.error('Error fetching balance:', error);
        balanceDisplay.innerText = 'Error fetching balance.';
    }
}

connectButton.onclick = connectWallet;
