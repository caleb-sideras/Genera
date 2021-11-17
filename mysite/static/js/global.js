//recolor the notification colors - already done the warning one
function create_notification(title, message, duration = 5000, theme) { // success, info, warning, error, and none
    window.createNotification({ theme: theme, showDuration: duration })({ title: title, message: message })
}

// const Web3 = require("web3");
// const ethEnabled = async () => {
//   if (window.ethereum) {
//     await window.ethereum.send('eth_requestAccounts');
//     window.web3 = new Web3(window.ethereum);
//     return true;
//   }
//   return false;
// }


