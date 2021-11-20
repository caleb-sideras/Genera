//recolor the notification colors - already done the warning one
function create_notification(title, message, duration = 5000, theme) { // success, info, warning, error, and none
    window.createNotification({ theme: theme, showDuration: duration })({ title: title, message: message })
}

function get_cookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
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


