let web3 = new Web3(Web3.givenProvider);//Web3.givenProvider || "ws://localhost:8545"
let web3_infura = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/d6c7a2d0b9bd40afa49d2eb06cc5baba"));


contract_address = null
ipfs_links = null
uri_list = null
entries = null
entry_ids = null
token_name = null
collection_name = null
active_account = null
active_chain_id = null
contract_chainid = null
token_counter = 0
contract_type = null
base_uri = null
minting_cost = null

deploy_collection_data ={
    'IPFS' : [
        {
            'title' : 'Deploying to IPFS',
            'subtitle' : 'This process is irreversible, are you sure?',
            'buttons': [
                {
                'name' : 'Deploy',
                'metadata' : '',
                'status' : 'active'
                }
            ],
            'width' : 0,
            'section' : 0
        },
        {
            'title': 'Deploying to IPFS',
            'subtitle': 'Your collection is currently being deployed to IPFS, this may take a while...'
        }
    ],
    'Network': [
        {
            'title': 'Choose a Network',
            'subtitle': 'Please switch your Metamask active network to your intended network',
            'buttons': [
                {
                    'name': 'Ethereum Mainnet',
                    'metadata': '0x1',
                    'status': 'active'
                },
                {
                    'name': 'Rinkeby Testnet',
                    'metadata': '0x4',
                    'status': 'active'
                },
                // {
                //     'name': 'Polygon',
                //     'metadata': 'chainid',
                //     'status': 'disabled'
                // }
            ],
            'width': 37,
            'section': 1
        },
        {
            'title': 'Metamask Wallet',
            'subtitle': 'Please connect your Metamask Wallet'
        }

    ],
    'Contract': [
        {
            'title': 'Deploy Contract',
            'subtitle': 'Private Mint Contract',
            'buttons': [
                {
                    'name': 'Deploy',
                    'metadata': 'private',
                    'status': 'active'
                },
            ],
            'width': 65,
            'section': 2
        },
        {
            'title': 'Deploying your Contract!',
            'subtitle': 'Please confirm with your Metamask Wallet',
        }
    ],
    'Mint': [
        {
            'title': 'Minting',
            'subtitle': 'Mint your NFT(s)!',
            'buttons': [
                {
                    'name': 'Mint',
                    'metadata': 'private',
                    'status': 'active'
                },
            ],
            'width': 100,
            'section': 3
        },
        {
            'title': 'Minting your NFT(s)!',
            'subtitle': 'Please confirm with your Metamask Wallet',
        }
    ]
}
deploy_collection_data_public = {
    'IPFS': [
        {
            'title': 'Deploying to IPFS',
            'subtitle': 'This process is irreversible, are you sure?',
            'buttons': [
                {
                    'name': 'Deploy',
                    'metadata': '',
                    'status': 'active'
                }
            ],
            'width': 0,
            'section': 0,
            'onpress': deploy_ipfs_request
        },
        {
            'title': 'Deploying to IPFS',
            'subtitle': 'Your collection is currently being deployed to IPFS, this may take a while...'
        }
    ],
    'Network': [
        {
            'title': 'Choose a Network',
            'subtitle': 'Please switch your Metamask active network to your intended network',
            'buttons': [
                {
                    'name': 'Ethereum Mainnet',
                    'metadata': '0x1',
                    'status': 'active'
                },
                {
                    'name': 'Rinkeby Testnet',
                    'metadata': '0x4',
                    'status': 'active'
                },
                {
                    'name': 'Polygon',
                    'metadata': '0x89', // 137
                    'status': 'active'
                },
                {
                    'name': 'Mumbai Testnet',
                    'metadata': '0x13881', // 80001
                    'status': 'active'
                }
            ],
            'width': 37,
            'section': 1,
            'onpress': choose_network
        },
        {
            'title': 'Metamask Wallet',
            'subtitle': 'Please connect your Metamask Wallet'
        }

    ],
    'Contract': [
        {
            'title': 'Customize Contract',
            'subtitle': 'Public Mint Contract',
            'body': [
                {
                    'button': 'button',
                    'name': 'Royalties',
                    'type': 'number',
                    'step' : 0.01,
                    'text' : '5%',
                    'info' : '% of resale price sent to your address',
                    'status': 'active'
                },
                {
                    'button': 'button',
                    'name': 'Royalties Address',
                    'type': 'text',
                    'text': '0x36aCd7...',
                    'info': '',
                    'status': 'active'
                },
                {
                    'button': 'button',
                    'name': 'Minting Cost',
                    'type': 'number',
                    'step': '0.000000001',
                    'text': 'E.g. 2 MATIC',
                    'info': 'Cost of minting an NFT',
                    'status': 'active'
                },
                {
                    'select': 'select',
                    'options' : [
                        'Public',
                        'Private'
                    ],
                    'name': 'Mint Type',
                    'type': 'dropdown',
                    'text': '',
                    'info': 'Public: Anyone can mint\nPrivate: Only you can mint',
                    'status': 'active'
                },
            ],
            'buttons': [
                {
                    'name': 'Deploy',
                    'metadata': 'public',
                    'status': 'active'
                },
            ],
            'width': 65,
            'section': 2,
            'onpress': deploy_contract_request_public
        },
        {
            'title': 'Deploying your Contract!',
            'subtitle': 'Please confirm with your Metamask Wallet',
        }
    ],
    'Mint': [
        {
            'title': 'Minting',
            'subtitle': 'Public Mine Page Available!',
            'buttons': [
                {
                    'name': 'Go to Mint Page!',
                    'metadata': 'public',
                    'status': 'active'
                },
            ],
            'width': 100,
            'section': 3,
            'onpress': "add_tokens_request_public"
        },
        {
            'title': 'Minting your NFT(s)!',
            'subtitle': 'Please confirm with your Metamask Wallet',
        }
    ]
}
function main() {

    ipfs_links = []
    entries = []
    uri_list = []

    parsed_json = JSON.parse(js_vars.dataset.json)

    contract_address = js_vars.dataset.contract_address
    contract_bool = (js_vars.dataset.contract_bool.toLowerCase() === 'true')
    // if (contract_bool) {
    //     var temp = async function () {
    //         await check_mint_status()
    //     }
    //     temp()
    // }
    contract_chainid = js_vars.dataset.chain_id
    token_name = js_vars.dataset.token_name
    image_name = js_vars.dataset.image_name
    entries = JSON.parse(js_vars.dataset.entry_ids)
    collection_name = js_vars.dataset.collection_name
    contract_type = js_vars.dataset.contract_type
    if (js_vars.dataset.ipfs_links){
        ipfs_links = JSON.parse(js_vars.dataset.ipfs_links)
    }
    ipfs_bool = (js_vars.dataset.ipfs_bool.toLowerCase() === 'true');
    tokens_minted_bool = (js_vars.dataset.tokens_minted_bool.toLowerCase() === 'true');
    collection_size = parseInt(js_vars.dataset.collection_size)
    deploy_collection_container = document.querySelector(".deploy_collection_container")

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

async function deploy_ipfs_request_private() {
    console.log("Deploying to IPFS")
    loading_deploy_collection(deploy_collection_data['IPFS'][1])
    await ipfs_deploy()
        .then(()=>{
            create_ipfs_links()
            ipfs_bool = true
            populate_deploy_collection(deploy_collection_data['Network'][0], choose_network)
        })
}

async function deploy_contract_request_private() {
    loading_deploy_collection(deploy_collection_data['Contract'][1])
    deploy_contract_private().then((reponse)=>{
        populate_deploy_collection(deploy_collection_data['Mint'][0], add_tokens_request_private)
    })
    .catch((error) => {
        throw (error)
    })
   
}

async function deploy_contract_private(){
    console.log("deploying contract")
    constructor_paramter = constructor_string(collection_name, token_name);
    try {
        deployed_contract = await ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: active_account,
                        gas: '0x210000', //180-200k usually
                        gasLimit: '0x21000000',
                        data: parsed_json['bytecode'] + constructor_paramter,
                        chainId: active_chain_id,
                    },
                ],
            })
            .catch(function (error) {
                throw (error)
            })
            .then(async function (txHash) {
                contract_address = await waitForTxToBeMined(txHash)
                contract_chainid = active_chain_id
                contract_bool = true
                console.log("Contract mined, address:" + contract_address)
                save_contract_address()
            })
    } catch (error) {
        close_deploy_collection()
        throw (error)
    }
    
}

function add_tokens_request_private(){
    if (uri_list.length == collection_size) {
        console.log('Collection Minted')
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
        add_tokens()  
    }    
}

async function add_tokens_private() {
    console.log("Adding tokens to " + contract_address)
    console.log(ipfs_links)
    loading_deploy_collection(deploy_collection_data['Mint'][1])
    await metamask_check().then(async ()=>{
        await get_chainid().then(async () => {
            if (contract_chainid !== active_chain_id) {
                alert('Please change your Metamask wallet to your intended network')
                populate_deploy_collection(deploy_collection_data['Mint'][0], add_tokens_request_private)
                throw ("wrong chainID")
            }else{
                for (let index = 0; index < ipfs_links.length; index++) {
                    token_counter++
                    console.log(token_counter)
                    console.log(ipfs_links[index])
                    await ethereum //deployed_token = 
                        .request({
                            method: 'eth_sendTransaction',
                            params: [
                                {
                                    from: active_account,
                                    to: contract_address,
                                    gas: '0x210000',//180-200k usually
                                    gasLimit: '0x21000000',
                                    data: abi_token_uri(ipfs_links[index]),
                                    chainId: active_chain_id,
                                },
                            ],
                        })
                        .then(function (txHash) {
                            console.log('Transaction sent')
                            waitForTxToBeMined(txHash, true, index)
                        })
                        .catch((error) => {
                            token_counter--
                            token_count_check()
                            throw (error)
                        });
                }
            }
        })
    })
    .catch((error) => {
        throw (error)
    });
    
}



// MSC //
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
async function get_contract_tokenURIs(contract_address) {
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
//refactor
async function check_mint_status() {
    await get_contract_tokenURIs(contract_address)
    if (uri_list) {
        var temp_uri_list = uri_list.slice()
        image_data_elements = document.querySelectorAll('.all_collections_layout > div > div')
        image_data_elements.forEach(element => {
            if ((element.children[0].dataset.ipfs_bool.toLowerCase() === 'true') == true && element.children[2].children[0].style.display == 'none') {
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
function create_ipfs_links() {
    ipfs_links = []
    for (let i = 0; i < collection_size; i++) {
        ipfs_links.push(`https://${base_uri}.ipfs.dweb.link/${i}.json`)
    }

}
// MSC //




// METAMASK FUNCTIONS //
async function metamask_check(){
    const provider = await detectEthereumProvider();

    if (provider) {
        await startApp(provider) 
    } else {
        alert('Please install MetaMask!');
        close_deploy_collection()
    }
}
async function personal_sign() {
    ethereum.request({ method: 'eth_personalSign' }).then((response) => {
        console.log(response)
    })
}
async function startApp(provider) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
        alert('Could not connect to Metamask, do you have multiple wallets installed?')
    } else {
        await ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((response) =>{
                active_account = response[0],
                ethereum.on('accountsChanged', handleAccountsChanged),
                ethereum.on('chainChanged', handleChainChanged)
            }   
            )
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask.')
                    alert('Please connect to MetaMask.');
                    close_deploy_collection()
                    throw(err)
                } else {
                    throw (err)
                }
            });

    }
}
async function get_chainid(){
    active_chain_id = await ethereum.request({ method: 'eth_chainId' });
}
function handleChainChanged(_chainId) {
    window.location.reload();
}
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        console.log("logged out")
        alert('Logged out of metamask');
        close_deploy_collection()
    } else if (accounts[0] !== active_account) {
        active_account = accounts[0];
        console.log("New Account!!!")
    }
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
// METAMASK FUNCTIONS //




// INITIALIZE DEPLOY COLLECTION
async function init_deploy_collection_private(){
    contract_type = 1
    if (!ipfs_bool){
        populate_deploy_collection(deploy_collection_data['IPFS'][0], deploy_ipfs_request_private)
    } else if (!contract_bool){
        populate_deploy_collection(deploy_collection_data['Network'][0], choose_network)
    } else if (!tokens_minted_bool){
        populate_deploy_collection(deploy_collection_data['Mint'][0], add_tokens_request_private)
    }
}
async function init_deploy_collection_public() {
    contract_type = 2
    if (!ipfs_bool) {
        populate_deploy_collection(deploy_collection_data_public['IPFS'][0])
        console.log("lmao")
    } else if (!contract_bool) {
        populate_deploy_collection(deploy_collection_data_public['Network'][0])
    } else if (!tokens_minted_bool) {
        populate_deploy_collection(deploy_collection_data_public['Mint'][0])
    }
}
// INITIALIZE DEPLOY COLLECTION




// IPFS DELPOY //
async function deploy_ipfs_request() {
    console.log("Deploying to IPFS")
    loading_deploy_collection(deploy_collection_data['IPFS'][1])
    await ipfs_deploy()
        .then(() => {
            ipfs_bool = true
            populate_deploy_collection(deploy_collection_data_public['Network'][0])
        })
}
async function ipfs_deploy() {
    let metadata_list = await create_image_car()
    // console.log(metadata_list)
    base_uri = await create_base_car(metadata_list)
    // console.log(base_uri)
}
async function create_image_car() {
    var input_field = document.getElementsByClassName("dn")
    const event = new Event('change');
    input_field[0].dispatchEvent(event)

    return new Promise((res) => {
        input_field[0].onchange = function () {
            var file_data = new FormData();
            file_data.append("image_car", "")
            file_data.append('car_blob', input_field.value);
            ajax_post_form(file_data)
                .then(response => {
                    res(JSON.parse(response["image_uri"]))
                })
        }
    })
}
async function create_base_car(json_list) {
    var input_field = document.getElementsByClassName("dn2")
    input_field.value = json_list
    const event = new Event('change');
    input_field[0].dispatchEvent(event)

    return new Promise((res) => {
        input_field[0].onchange = function () {
            var file_data = new FormData();
            file_data.append("base_car", "")
            file_data.append('car_blob', input_field.value);
            ajax_post_form(file_data)
                .then(response => {
                    res(response["base_uri"])
                })
        }
    })
}
// IPFS DELPOY //




// CHOOSE NETWORK//
async function choose_network(self) {
    console.log('Connecting to Wallet')
    loading_deploy_collection(deploy_collection_data_public['Network'][1])
    await metamask_check().then(async () => {
        await get_chainid().then(() => {
            if (self !== active_chain_id) {
                alert('Please change your Metamask wallet to your intended network')
                populate_deploy_collection(deploy_collection_data_public['Network'][0], choose_network)
                throw ("wrong chainID")
            }
        })
    })
        .catch((error) => {
            throw (error)
        });

    populate_deploy_collection(deploy_collection_data_public['Contract'][0])
}
// CHOOSE NETWORK //




// CONTRACT DEPLOY //
//get contract
async function deploy_contract_request_public(){
    let contract_inputs = deploy_collection_container.querySelectorAll(':scope input, :scope select')
    //make open sea metadata!!
    let royality = contract_inputs[0].value * 100
    let royality_address = contract_inputs[1].value
    minting_cost = web3.utils.toWei(String(contract_inputs[2].value), 'ether')
    contract_type = contract_inputs[3].value
    let constructor_parameters = constructor_string(`https://${base_uri}.ipfs.dweb.link/`, collection_name, token_name, collection_size, minting_cost, true)
    let gas_estimate = await web3.eth.estimateGas({
        data: parsed_json['bytecode'] + constructor_parameters
    });
    console.log(gas_estimate)
    console.log(`0x${String(parseInt(gas_estimate / 5))}`)
    deploy_contract_public(constructor_parameters, `0x${String(parseInt(gas_estimate/5))}`)
}
async function deploy_contract_public(constructor_parameters, gas_estimate){
    await ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: active_account,
                    gas: gas_estimate,
                    gasLimit: '0x10000000',
                    data: parsed_json['bytecode'] + constructor_parameters,
                    chainId: active_chain_id,
                },
            ],
        })
        .catch(function (error) {
            console.log(error)
            close_deploy_collection()
            throw (error)
        })
        .then(async function (txHash) {
            contract_address = await waitForTxToBeMined(txHash)
            contract_chainid = active_chain_id
            contract_bool = true
            console.log("Contract mined, address:" + contract_address)
            save_contract_address()
        })
}
function save_contract_address() {
    ajax_post_json({ 'address_set': contract_address, 'chain_id': active_chain_id, 'minting_cost': minting_cost, 'contract_type': contract_type })
        .then(function (response) {
            console.log("Contract adress stored in db " + response["server_message"])
        })
}
// CONTRACT DEPLOY //




// MINT //
function mint_page_redirect(){
    // go to mint page
}
// MINT //




// DEPLOY COLLECTION FUNCTIONS //
function populate_deploy_collection(populate_data){
    document.getElementsByClassName('filter')[0].style['pointer-events'] = "none"
    document.body.classList.add('disable_scrolling');
    deploy_collection_container.style.display = "block"
    deploy_collection_container.querySelector(".dc_close").style.display = "block"
    deploy_collection_container.querySelector(".spinner").style.display = 'none'
    deploy_collection_container.querySelector("h2").innerText = populate_data['title']
    deploy_collection_container.querySelector("h4").innerText = populate_data['subtitle']
    deploy_collection_container.querySelector(".dc_status_bar_active ").style.width = `${populate_data['width']}%`
    deploy_collection_container.querySelector(".dc_buttons").innerHTML = ""
    function_callback = populate_data['onpress']
    status_dot_update(populate_data['section'])
    if ('body' in populate_data) {
        populate_data['body'].forEach(element =>{
            let wrapper = document.createElement('div')
            let header = document.createElement('p')
            header.innerText = element['name']
            wrapper.appendChild(header)
            let input_field = null
            if ('button' in element) {
                input_field = document.createElement('input')
                input_field.name = element['name']
                input_field.type = element['type']
                input_field.placeholder = element['text']
                if ('step' in element) {
                    input_field.step = element['step']
                }
            }
            else if('select' in element){
                input_field = document.createElement('select')
                input_field.id = element['select']
                input_field.name = element['select']
                element['options'].forEach(element => {
                    let option_field = document.createElement('option')
                    option_field.value = element
                    option_field.innerText = element
                    input_field.appendChild(option_field)
                });
            }
            wrapper.appendChild(input_field)
            let footer = document.createElement('p')
            footer.innerText = element['info']
            footer.className= 'input_footer'
            wrapper.appendChild(footer)
            deploy_collection_container.querySelector(".input_wrapper").appendChild(wrapper)
        })
        deploy_collection_container.querySelector(".input_wrapper").style.display = 'grid'
    }
    populate_data['buttons'].forEach(element => {
        let button = document.createElement('button')
        button.classList = "general_button_no_border light_purple_background rounded_container_no_padding"
        button.innerText = element['name']
        button.onclick = () => { function_callback(element['metadata'])}
        deploy_collection_container.querySelector(".dc_buttons").appendChild(button)
    });
}
function loading_deploy_collection(populate_data){
    deploy_collection_container.querySelector("h2").innerText = populate_data['title']
    deploy_collection_container.querySelector("h4").innerText = populate_data['subtitle']
    deploy_collection_container.querySelector(".spinner").style.display = 'flex'
    deploy_collection_container.querySelector(".dc_buttons").innerHTML = ""
    deploy_collection_container.querySelector(".dc_close").style.display = "none"
}
function close_deploy_collection(){
    document.getElementsByClassName('filter')[0].style['pointer-events'] = "all"
    document.body.classList.remove('disable_scrolling');
    deploy_collection_container.querySelector('.input_wrapper').innerHTML = ''
    deploy_collection_container.querySelector('.input_wrapper').style.display = 'none'
    deploy_collection_container.style.display = "none"
}
function status_dot_update(section){
    let status_dots = deploy_collection_container.querySelectorAll(".dc_status_dot")
    for (let i = 0; i < section; i++) {
        status_dots[i].style.background = "var(--medium-grey-color)"    
    }
}
// DEPLOY COLLECTION FUNCTIONS //




// CONTRACT ENCODERS //
function constructor_string(baseuri, name, symbol, totalSupply, cost, open_bool) {
    console.log("Contructor");
    temp_constructor_params = web3.eth.abi.encodeParameters(
        ['string', 'string', 'string', 'uint32', 'uint256', 'bool'], 
        [baseuri, name, symbol, totalSupply, cost, open_bool]
    );
    constructor_params = temp_constructor_params.replace('0x', '', '', '', '', '');
    console.log(constructor_params)
    return constructor_params;
}
// make modular
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
// CONTRACT ENCODERS //




window.addEventListener("load", main);