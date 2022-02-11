async function initMetamask() {
    const provider = await detectEthereumProvider();

    if (provider) {
        await startMetmask(provider)
    } else {
        alert('Please install MetaMask!');
    }
}
async function personalSign(nonce, address) {
    ethereum.request({ method: 'personal_sign', 'params': [nonce, address] }).then((response) => {
        console.log('personalSign ' + response.toString(16))
        ajax_post_json({ 'metamask_auth_user': '', 'public_address': address, 'signature': response}).then((server_response) => {
        })  
    })
}

async function startMetmask(provider) {
    if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?')
        alert('Could not connect to Metamask, do you have multiple wallets installed?')
    } else {
        await ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((response) => {
                console.log('startMetmask '+ response)
                ajax_post_json({ 'metamask_request_nonce': '', 'public_address': response[0] }).then((server_response) => {
                    personalSign(server_response['nonce'], response[0])
                })  
            }
            )
            .catch((err) => {
                if (err.code === 4001) {
                    alert('Please connect to MetaMask.')
                    throw (err)
                } else {
                    throw (err)
                }
            });

    }
}