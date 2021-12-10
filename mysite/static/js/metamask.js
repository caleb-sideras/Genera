ajax_script = null
let web3 = new Web3(Web3.givenProvider);//Web3.givenProvider || "ws://localhost:8545"
contract_address = null
ipfs_links = null
entries = null
function main() {
    ipfs_links = []
    entries = []
    ajax_button = document.getElementById("ajax_test")
    ajax_script = ajax_button.dataset.json
    
    // ajax_script2 = ajax_button.dataset.metadata
    // console.log(ajax_script2)
    // console.log(typeof(ajax_script2))
    // console.log(JSON.parse(ajax_script2))
    // console.log(JSON.parse(ajax_script))
    parsed_json = JSON.parse(ajax_script)
    console.log(parsed_json)

    // gas_estimate = document.querySelector('.testButton');

    // gas_estimate.addEventListener('click', async () =>{
    //     // mainnet
    //     // gas estimate when deploying contract
    //     constructor_paramter = constructor_string('Void', 'vde');
    //     var result = await web3.eth.estimateGas({
    //         data: parsed_json['bytecode'] + constructor_paramter
    //     }).then(console.log);

    //     // gas estimate when deploying token (doesnt work on Rinkeby testnet)
    //     // token_uri = abi_token_uri('https://ipfs.io/ipfs/QmNco8G5hrJfLdJpYwsxrygWXS1zcmW9AuY9Q8PstJFX9c');
    //     // var result = await web3.eth.estimateGas({
    //     //     to: "0x240D3014Cdc300A9939AeDCcb508DD34cDcd815e", // ERC721: mint to the zero address error
    //     //     data: token_uri
    //     // }).then(console.log);
            
    // });
    // ethereum.on('chainChanged', (_chainId) => window.location.reload());
    // ethereum.on('disconnect', (ProviderRpcError) => window.location.reload());
}

async function metamask_check(){
    // console.log("Login clicked");
    const provider = await detectEthereumProvider();

    if (provider) {
        // console.log('Installed!');
        var active_account = startApp(provider);
    } else {
        alert('Please install MetaMask!');
    }
    return active_account;
}

async function deploy_contract(){
    console.log("deploying contract")
    var active_account = await metamask_check()
    constructor_paramter = constructor_string('Void', 'vde'); // User parameters
    deployed_contract = await ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: active_account[0],
                    gas: '0x210000',//180-200k usually
                    gasLimit: '0x21000000',
                    data: parsed_json['bytecode'] + constructor_paramter,
                    chainId: '0x4',
                },
            ],
        })
        .then(async function (txHash) {
            console.log('Transaction sent')
            console.dir(txHash)
            contract_address = await waitForTxToBeMined(txHash)
            console.log("Contract mined, address:" + contract_address)
        })
            // .catch(console.error)
            // .then((txHash) => console.log(txHash)).catch((error) => console.error);
    return active_account;
}

async function add_tokens(active_account, url=null) {
 // ipfs metadata (token uri)
    console.log("Adding tokens to " + contract_address)
    console.log(ipfs_links)
    console.log(entries)
    for (let index = 0; index < ipfs_links.length; index++) {
        deployed_token = await ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: active_account[0],
                        to: contract_address,
                        gas: '0x210000',//180-200k usually
                        gasLimit: '0x21000000',
                        data: abi_token_uri(ipfs_links[index]),
                        chainId: '0x4',
                    },
                ],
            })
            .then(function (txHash) {
                console.log('Transaction sent')
                // console.dir(txHash)
                store_txhash(txHash, url, entries[index])
                waitForTxToBeMined(txHash, true, index, url)
            })
            // .then((txHash) => console.log(txHash))
            // .catch((error) => console.error);
    } }

async function waitForTxToBeMined(txHash, ajax = false, index = 0, url = null) {
    let txReceipt
    while (!txReceipt) {
        try {
            txReceipt = await web3.eth.getTransactionReceipt(txHash)
        } catch (err) {
            return console.log("failure")
        }
    }
    if (ajax) {
        console.log(txReceipt)
        console.log("Entry name bool swap " + entries[index])
        if (txReceipt['status']==true) {
            token_deployed(url, entries[index])
        }
        
    }
    console.log("Transaction sent " + txReceipt)
    return txReceipt['contractAddress']
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
                ipfs_links = response["ipfs_links"]
                entries = response["entries"]
                response['entry_objects'].forEach(element => {
                    console.log(element)
                });
                console.log(ipfs_links)
                console.log(entries)
                console.log("Received ipfs & entries from db")
                ajax_server_post2(url)

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
                'notneeded': "balls :)" //can add as many other entries to dict as necessary
            })
    )
}

async function ajax_server_post2(url) {

    //HTTPREQUEST INIT CODE
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        http_request = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
        http_request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //HTTPREQUEST INIT CODE

    http_request.onreadystatechange = async function () {
        // Process the server response here (Sent from Django view inside JsonResponse)
        if (http_request.readyState === XMLHttpRequest.DONE) {

            if (http_request.status === 200) { //Status can also be different and defined within the JSONResponse
                var response = JSON.parse(http_request.responseText)
                address_check = response['address_bool']

                // if the contract has already been deployed/in db
                if (address_check){
                    console.log("received contract from db")
                    contract_address = response["collection_address"]
                    console.log("already deployed contract" + contract_address)
                }
                else {
                    active_account = await deploy_contract();
                    // ajax_server_post3(url) //should not double set if here, test later
                }

                // double checking user account
                active_account = await metamask_check()

                ajax_server_post3(url) // if contract adress not saved could have issues later.

                await add_tokens(active_account, url);


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
                'address_check': contract_address //can add as many other entries to dict as necessary
            })
    )
}

function ajax_server_post3(url) {

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
                console.log("Contract adress stored in db " + response["server_message"])
                ipfs_links = response["ipfs_links"]
                entries = response["entries"]
                console.log(ipfs_links)
                console.log(entries)

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
                'address_set': contract_address //can add as many other entries to dict as necessary
            })
    )
}

function store_txhash(txHash, url, entry) {

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
                console.log(response["server_message"])


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
                'store_txhash': txHash,
                'entry': entry
            })
    )
}

function token_deployed(url, entry) {

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
                console.log(response["server_message"])


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
                'token_deployed': entry //can add as many other entries to dict as necessary
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
            .then(console.log("handleAccountsChanged")) //define handleAccountsChanged
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    alert('Please connect to MetaMask.');
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });

    }
    return account;
}

function constructor_string(name, symbol) {
    console.log("Contructor");
    temp_constructor_params = web3.eth.abi.encodeParameters(['string', 'string'], [name, symbol]);
    constructor_params = temp_constructor_params.replace('0x', '');
    // console.log(constructor_params);

    return constructor_params;
}

function abi_token_uri(ipfs_link) {
    console.log("Setting Token URI");
    token_uri = web3.eth.abi.encodeFunctionCall({
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
    }, [ipfs_link]
    );
    console.log(token_uri);

    return token_uri;
}

window.addEventListener("load", main);