ajax_script = {}
let web3 = new Web3();//Web3.givenProvider || "ws://localhost:8545"

function main() {

    ajax_button = document.getElementById("ajax_test")

    ajax_script = ajax_button.dataset.json
    console.log(JSON.parse(ajax_script))
    parsed_json = JSON.parse(ajax_script)

    mint_collection = document.querySelector('.sendEthButton');
    add_token = document.querySelector('.addToken');
    login_metamask = document.querySelector('.ethereumButton');

    mint_collection.addEventListener('click', async () => {
        constructor_paramter = constructor_string('Void', 'vde'); // User parameters
        deployed_contract = await ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: '0x36acd77ca5bf2c84c0a60786581b322546d68193',
                        gas: '0x210000',//180-200k usually
                        gasLimit: '0x21000000',
                        data: parsed_json['bytecode'] + constructor_paramter,
                        chainId: '0x4',
                    },
                ],
            })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        console.log(deployed_contract)
    });

    add_token.addEventListener('click', async () => {
        console.log("addToken clicked");
        token_uri = abi_token_uri('https://ipfs.io/ipfs/QmNco8G5hrJfLdJpYwsxrygWXS1zcmW9AuY9Q8PstJFX9c'); // ipfs metadata (token uri)
        deployed_token = await ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: '0x36acd77ca5bf2c84c0a60786581b322546d68193',
                        to: '0x178d22f33bE656101C0cCB864f33094F6C7A0d41',
                        gas: '0x210000',//180-200k usually
                        gasLimit: '0x21000000',
                        data: token_uri,
                        chainId: '0x4',
                    },
                ],
            })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        console.log(deployed_token)
    });

    login_metamask.addEventListener('click', async () => {
        console.log("Login clicked");
        console.log("Eth clicked");
        const provider = await detectEthereumProvider();

        if (provider) {
            console.log('Installed!');
            startApp(provider);
        } else {
            console.log('Please install MetaMask!');
        }
    });

    // ethereum.on('chainChanged', (_chainId) => window.location.reload());
    // ethereum.on('disconnect', (ProviderRpcError) => window.location.reload());
}

function ajax_server_post(url) {

    //HTTPREQUEST INIT CODE
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        http_request = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
        http_request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //HTTPREQUEST INIT CODE

    http_request.onreadystatechange = function () {
        // Process the server response here (Sent from Django view inside JsonResponse)
        if (http_request.readyState === XMLHttpRequest.DONE) {

            if (http_request.status === 200) { //Status can also be different and defined within the JSONResponse
                var response = JSON.parse(http_request.responseText)

                alert(response["server_message"]) //access specific key from the reponse object - we only pass server message in this example

            } else { //if status is not 200 - assume fail, unless different status handled explicitly
                alert('There was a problem with the request.');
            }
        }
    };

    // Send the POST request to the url/DJANGO VIEW
    //setup for request header - not important
    http_request.open('POST', url, true);
    http_request.setRequestHeader('X-CSRFToken', get_cookie('csrftoken'));
    http_request.setRequestHeader('contentType', 'application/json');
    //end of setup

    // Send the request as a JSON MAKE SURE TO ALWAYS HAVE THE CSRFTOKEN COOKIE !!! !! ! ! ! !! 
    http_request.send(
        JSON.stringify(
            {
                'csrfmiddlewaretoken': get_cookie('csrftoken'), //compulsory
                'ajax_test': "This is a test message, from the clientside JS" //can add as many other entries to dict as necessary
            })
    )
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

function constructor_string(name, symbol) {
    console.log("Contructor");
    temp_constructor_params = web3.eth.abi.encodeParameters(['string', 'string'], [name, symbol]);
    constructor_params = temp_constructor_params.replace('0x', '');
    console.log(constructor_params);

    return constructor_params;
}

function abi_token_uri(ifps_link) {
    console.log("Setting Token URI");
    temp_token_uri = web3.eth.abi.encodeFunctionCall({
        "inputs": [
            {
                "internalType": "string",
                "name": "_tokenURI",
                "type": "string"
            }
        ],
        "name": "createNewCollectible",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, [ifps_link]
    );
    token_uri = temp_token_uri.replace('0x', '');
    console.log(token_uri);

    return token_uri;
}

window.addEventListener("load", main);