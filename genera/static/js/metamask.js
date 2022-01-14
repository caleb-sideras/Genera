let web3 = new Web3(Web3.givenProvider);//Web3.givenProvider || "ws://localhost:8545"
let web3_infura = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/d6c7a2d0b9bd40afa49d2eb06cc5baba"));

contract_address = null
ipfs_links = null
uri_list = null
entries = null
entry_ids = null
token_name = null
collection_name = null
token_counter = 0
function main() {

    ipfs_links = []
    entries = []
    uri_list = []

    parsed_json = JSON.parse(js_vars.dataset.json)

    contract_address = js_vars.dataset.contract_address
    contract_bool = (js_vars.dataset.contract_bool.toLowerCase() === 'true')
    if (contract_bool) {
        var temp = async function () {
            await check_mint_status()
        }
        temp()
    }
    token_name = js_vars.dataset.token_name
    image_name = js_vars.dataset.image_name
    entries = JSON.parse(js_vars.dataset.entry_ids)
    collection_name = js_vars.dataset.collection_name
    if (js_vars.dataset.ipfs_links){
        ipfs_links = JSON.parse(js_vars.dataset.ipfs_links)
    }
    ipfs_bool = (js_vars.dataset.ipfs_bool.toLowerCase() === 'true');
    tokens_minted_bool = (js_vars.dataset.tokens_minted_bool.toLowerCase() === 'true');
    collection_size = parseInt(js_vars.dataset.collection_size)

    console.log(contract_bool)
    console.log(ipfs_bool)
    console.log(token_name)
    console.log(image_name)
    console.log(ipfs_links)
    console.log(entries) // string
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

async function deploy_ipfs_request() {
    
    await yes_no_popup("Mint Collection?", "Yes", "No")
        .then(function (reponse) {
            if (reponse) {
                close_yes_no_popup()
            }
            else {
                close_yes_no_popup()
                throw ("no deployment")
            }

        })

    if (!ipfs_bool) {
        create_and_render_loading_popup("Deploying to IPFS")
        ajax_post_json({ 'ifps_deployment': "" })
            .then(function (response) {
                ipfs_links = response["ipfs_links"]
                entries = response["entries"]
                console.log("Received ipfs & entries from db")
                ipfs_bool = true
                close_loading_popup()
                deploy_contract_request()
            })
    }
    else{
        deploy_contract_request()
    }
    
    
}

async function deploy_contract_request() {
    if (!contract_bool) {
        create_and_render_loading_popup("Deploying Smart Contract")
        await deploy_contract().then((reponse)=>{
            // double checking user account
            close_loading_popup()
            add_tokens_request(reponse, ajax_url);
        })
        .catch((error) => {
            close_loading_popup()
            throw (error)
        })
    }else{
        var active_account = await metamask_check()
        close_loading_popup()
        add_tokens_request(active_account, ajax_url);
    }
   
}

async function deploy_contract(){
    console.log("deploying contract")
    var active_account = await metamask_check()
    constructor_paramter = constructor_string(collection_name, token_name);
    deployed_contract = await ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: active_account[0],
                    gas: '0x210000', //180-200k usually
                    gasLimit: '0x21000000',
                    data: parsed_json['bytecode'] + constructor_paramter,
                    chainId: '0x4',
                },
            ],
        })
        .catch(function(error){
            throw(error)
        })
        .then(async function (txHash) {
            contract_address = await waitForTxToBeMined(txHash)
            contract_bool = true
            console.log("Contract mined, address:" + contract_address)
            save_contract_address()
        })
    return active_account;
}

function add_tokens_request(active_account, ajax_url){
    if (!tokens_minted_bool){
        create_and_render_loading_popup("Minting NFTs")
        if (uri_list.length == collection_size) {
            ajax_post_json({'collection_minted': contract_address}).then((reponse) => {
                window.location.reload()
                return
            })  
        }else if(uri_list.length >= 0) {
            for (let i = 0; i < uri_list.length; i++) {
                for (let j = 0; j < ipfs_links.length; j++) {
                    if (uri_list[i] == ipfs_links[j]) {
                        ipfs_links.splice(j, 1)
                        break;
                    }
                }
            }
            // console.log(uri_list)
            // console.log(ipfs_links)
            add_tokens(active_account, ajax_url)  
        }    
    }
}

async function add_tokens(active_account, url=null) {
    console.log("Adding tokens to " + contract_address)
    // console.log(ipfs_links)
    // console.log(entries)
    for (let index = 0; index < ipfs_links.length; index++) {
        token_counter++
        console.log(token_counter)
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
                waitForTxToBeMined(txHash, true, index)
            })
            .catch((error) =>{
                token_counter--
                token_count_check()
                throw (error) 
            });
    }
}

async function waitForTxToBeMined(txHash, ajax = false, index = 0) {
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
        token_counter--
        console.log(token_counter)
        token_count_check()
    }
    console.log("Transaction sent " + txReceipt)
    return txReceipt['contractAddress']
}

function save_contract_address() {
    ajax_post_json({'address_set': contract_address})
    .then(function(response) {
        console.log("Contract adress stored in db " + response["server_message"])
    })
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
    token_uri = web3.eth.abi.encodeFunctionCall({
        "inputs": [
            {
                "internalType": "string",
                "name": "_tokenURI",
                "type": "string"
            }
        ],
        "name": "createNewNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, [ipfs_link]
    );
    return token_uri;
}

function token_count_check(){
    if (token_counter == 0) {
        console.log('closing token_counter')
        setTimeout(async function () {
            await check_mint_status()
            if (uri_list.length == collection_size) {
                ajax_post_json({ 'collection_minted': contract_address }).then((reponse)=>{
                    window.location.reload()
                })
            }else{
                window.location.reload()
            }
        }, 20000);
        console.log('waiting 20 seconds')
    }
}

async function get_contract_tokenURIs(contract_address){
    var contract = new web3_infura.eth.Contract(parsed_json['abi'], contract_address)
    let name = await contract.methods.name().call() // contract name
    let supply = await contract.methods.totalSupply().call()
    uri_list = []
    for (let i = 0; i < supply; i++) {
        try {
            let data = await contract.methods.tokenURI(i).call()
            uri_list.push(data)
        } catch (error) {
            console.log(error)
            alert("Cannot connect to Ethereum, please refresh your page and make sure you have a stable internet connection.")
        }
    }
    console.log("finished get_contract_tokenURIs")
    return
}

async function check_mint_status(){
    await get_contract_tokenURIs(contract_address)
    if (uri_list) {
        var temp_uri_list = uri_list.slice()
        image_data_elements = document.querySelectorAll('.all_collections_layout > div > div')
        image_data_elements.forEach(element => {
            if ((element.children[0].dataset.ipfs_bool.toLowerCase() === 'true') == true && element.children[2].children[0].style.display == 'none'){
                for (let i = 0; i < temp_uri_list.length; i++) {
                    if (temp_uri_list[i] == element.children[0].dataset.token_uri) {
                        element.children[2].children[0].style.display = 'flex'
                        temp_uri_list.splice(i, 1)
                        break;
                    }
                }
            }
        });
    }
    console.log("finished check_mint_status")
}

window.addEventListener("load", main);