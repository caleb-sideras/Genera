function main() {
    console.log("METAMASK")
    login_button = document.getElementsByClassName("metamask_login_button")[0]
    ethereumButton = document.querySelector('.enableEthereumButton');
    sendEthButton = document.querySelector('.sendEthButton');
    let accounts = [];
    // const showAccount = document.querySelector('.showAccount');
    // Moralis.initialize("5rreQED2xNHYym6yIRdpRdG21XXiwUV7en5biB3y"); // Application id from moralis.io
    // Moralis.serverURL = "https://6hrohfqr0ddj.usemoralis.com:2053/server"; //Server url from moralis.io
    login_button.addEventListener("click", function () {
        login().then().catch(error => create_notification("Connection error", error.message, duration = 10000, "error"))
    })
    ethereumButton.addEventListener('click', () => {
        getAccount();
    });

    sendEthButton.addEventListener('click', async () => {
        account1 = await ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    // "VoidChan", "vde",
                    {
                        from: '0x36acd77ca5bf2c84c0a60786581b322546d68193',
                        // to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
                        // value: '0x29a2241af62c0000',
                        // gasPrice: '0x09184e72a000',
                        gas: '0x210000',//180-200k usually
                        // gasLimit: '0x21000000',
                        data: '608060405234801561001057600080fd5b506040516102553803806102558339818101604052604081101561003357600080fd5b810190808051604051939291908464010000000082111561005357600080fd5b90830190602082018581111561006857600080fd5b825164010000000081118282018810171561008257600080fd5b82525081516020918201929091019080838360005b838110156100af578181015183820152602001610097565b50505050905090810190601f1680156100dc5780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156100ff57600080fd5b90830190602082018581111561011457600080fd5b825164010000000081118282018810171561012e57600080fd5b82525081516020918201929091019080838360005b8381101561015b578181015183820152602001610143565b50505050905090810190601f1680156101885780820380516001836020036101000a031916815260200191505b5060405250506000805550505060b2806101a36000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80637feb5078146037578063d082e381146053575b600080fd5b605160048036036020811015604b57600080fd5b5035606b565b005b60596076565b60408051918252519081900360200190f35b600080549091019055565b6000548156fea2646970667358221220382579b8a00d817231ba48b8362dea47ae0461f4fcf263093d72e828d66f265f64736f6c63430006060033000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000004566f69640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035664650000000000000000000000000000000000000000000000000000000000',
                        chainId: '0x4',
                        // piss: ["VoidChan", "vde"],

                    },
                ],
            })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        console.log(account1)
    });
    // ethereum.on('chainChanged', (_chainId) => window.location.reload());
    // ethereum.on('disconnect', (ProviderRpcError) => window.location.reload());
}

async function login() {

    // temp = web3.eth.abi.encodeParameter('string[]', ['Voide', 'vdf']);
    // console.log(temp)
    // // var user = await Moralis.Web3.authenticate();
    // // if (user) {
    // //     create_notification("Connection status", "Wallet connected succesfully!", duration = 10000, "success")
    // //     console.log(user);
    // //     // user.set("nickname", "Caleb");
    // //     // user.set("fav_color", "blue");
    // //     // user.save();
    // //     // console.log(user.get("nickname"));
    // // }
    // // Compile the source code
    // // const input = fs.readFileSync('Token.sol');
    // // const output = solc.compile(input.toString(), 1);
    // // const bytecode = output.contracts['Token'].bytecode;
    // // const abi = JSON.parse(output.contracts['Token'].interface);
    // var mydata = JSON.parse(temp);
    // // Contract object
    // const contract = web3.eth.contract(temydatamp);
    // console.log("mother")
    // console.log(DATA["abi"][0])



}
async function getAccount() {
    console.log("Eth clicked");
    const provider = await detectEthereumProvider();
    if (provider) {
        console.log('Installed!');
        // if (ethereum.isConnected()) {
        // console.log("account already connected!")
        // } else {
        startApp(provider); // Initialize your app
        // }

    } else {
        console.log('Please install MetaMask!');
    }

}

async function startApp(provider) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
    } else {
        account = await ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(handleAccountsChanged)
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });

    }
    console.log(account)
}


window.addEventListener("load", main);