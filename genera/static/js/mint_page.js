async function main() {
    var abi_json = {
        "abi": [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_uri",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "uint32",
                        "name": "_totalSupply",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_cost",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "_open",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "ApprovalForAll",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256[]",
                        "name": "ids",
                        "type": "uint256[]"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256[]",
                        "name": "values",
                        "type": "uint256[]"
                    }
                ],
                "name": "TransferBatch",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "TransferSingle",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "value",
                        "type": "string"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "URI",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address[]",
                        "name": "to",
                        "type": "address[]"
                    }
                ],
                "name": "airdrop",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address[]",
                        "name": "accounts",
                        "type": "address[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "ids",
                        "type": "uint256[]"
                    }
                ],
                "name": "balanceOfBatch",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "baseUri",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "cost",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "maxPerMint",
                "outputs": [
                    {
                        "internalType": "uint32",
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "maxPerWallet",
                "outputs": [
                    {
                        "internalType": "uint32",
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "count",
                        "type": "uint32"
                    }
                ],
                "name": "mint",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "open",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "ids",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "amounts",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "name": "safeBatchTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_cost",
                        "type": "uint256"
                    }
                ],
                "name": "setCost",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "_max",
                        "type": "uint32"
                    }
                ],
                "name": "setMaxPerMint",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bool",
                        "name": "_open",
                        "type": "bool"
                    }
                ],
                "name": "setOpen",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_uri",
                        "type": "string"
                    }
                ],
                "name": "setURI",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "_max",
                        "type": "uint32"
                    }
                ],
                "name": "setmaxPerWallet",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "supply",
                "outputs": [
                    {
                        "internalType": "uint32",
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes4",
                        "name": "interfaceId",
                        "type": "bytes4"
                    }
                ],
                "name": "supportsInterface",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint32",
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "uri",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            }
        ]}

    contract_address = js_vars.dataset.contract_address
    chain_id = js_vars.dataset.chain_id
    if (chain_id == "0x1") {
        var provider = "https://mainnet.infura.io/v3/d6c7a2d0b9bd40afa49d2eb06cc5baba"
        token_name = 'Ether'
    }
    else if (chain_id == "0x4") {
        var provider = "https://rinkeby.infura.io/v3/d6c7a2d0b9bd40afa49d2eb06cc5baba"
        token_name = 'Ether'
    }
    else if (chain_id == "0x89"){
        var provider = "https://polygon-mainnet.infura.io/v3/d6c7a2d0b9bd40afa49d2eb06cc5baba"
        token_name = 'MATIC'
    }
    else if (chain_id == "0x13881"){
        var provider = "https://polygon-mumbai.infura.io/v3/d6c7a2d0b9bd40afa49d2eb06cc5baba"
        token_name = 'MATIC'
    }

    active_account = null
    web3 = new Web3(Web3.givenProvider)
    web3_infura = new Web3(new Web3.providers.HttpProvider(provider));

    await get_all_contract_info(contract_address, abi_json)
    
    mint_cards = document.querySelectorAll(".nft_image")

    let list_bool = await init_images()
    if (list_bool) {
        replace_images()
    }

    total_mint()
    mint_cost()
    ethereum.on('chainChanged', (_chainId) => window.location.reload());
    ethereum.on('disconnect', (ProviderRpcError) => window.location.reload());
    ethereum.on('accountsChanged', (ProviderRpcError) => window.location.reload());
}
async function get_all_contract_info(contract_address, abi_json){
    contract = new web3_infura.eth.Contract(abi_json['abi'], contract_address)
    let _supply = await contract.methods.supply().call()
    supply = parseInt(_supply)
    let _totalSupply = await contract.methods.totalSupply().call()
    totalSupply = parseInt(_totalSupply)
    mintCostWei = await contract.methods.cost().call()
    base_uri = await contract.methods.baseUri().call()
}
async function init_images() {
    let uri_list = []
    let list_bool = true
    if (totalSupply >= 5) {
        for (let i = 0; i < 5; i++) {
            let rand = getRandomInt(0, totalSupply)
            await fetch(`${base_uri}${rand}.json`)
                .then(res => res.json()) // how to fix? new event listener?
                .then((out) => {
                    uri_list.push(out['image'])
                    console.log(out['image'])
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }
    else {
        await fetch(`${base_uri}0.json`)
            .then(res => res.json()) // how to fix? new event listener?
            .then((out) => {
                uri_list.push(out['image'])
                list = false
                console.log(out['image'])
            })
            .catch((err) => {
                console.log(err)
            });  
    }
    console.log(uri_list)
    if(list_bool){
        for (let i = 0; i < uri_list.length; i++) {
            mint_cards[i].src = uri_list[i]
        }
    }
    else{
        mint_cards[0].src = uri_list[0]
    }
    
    return list_bool
}
function replace_images(){
    var i = 1;
    mint_cards[0].onload = function () {
        document.querySelector(".loading_circle").style.display = 'none'
    }
    var active_img = mint_cards[0]
    active_img.style.display='flex'
    var timer = setInterval(function () {
        // If we've reached the end of the array...
        if (i >= 5) {
            i = 0;
        }
        active_img.style.display = 'none'
        mint_cards[i].style.display = 'flex'
        active_img = mint_cards[i]
        i++
    }, 2000);
}
function abi_token_uri(amount) {
    let token_uri = web3.eth.abi.encodeFunctionCall({
        "inputs": [
            {
                "internalType": "uint32",
                "name": "count",
                "type": "uint32"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, [amount]
    );
    return token_uri;
}
function total_mint(){
    document.querySelector(".mint_supply").innerHTML = `${supply} of ${totalSupply} minted`
}
function mint_cost(){
    mintCostEther = parseFloat(web3.utils.fromWei(mintCostWei, 'ether'))
    mint_cost_element = document.querySelector("#mint_cost")
    mint_amount_selector = document.querySelector("#mint_select")
    mint_cost_element.innerHTML = `${parseInt(mint_amount_selector.value) * mintCostEther} ${token_name}`
    mint_amount_selector.onchange = () => {
        console.log(parseInt(mint_amount_selector.value))
        mint_cost_element.innerHTML = `${parseInt(mint_amount_selector.value) * mintCostEther} ${token_name}`
    }
}
async function mint(amount){
    console.log(amount)
    await metamask_check().then(async () =>{
        await get_chainid().then(async ()=>{
            await ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: active_account,
                            to: contract_address,
                            // gas: '0x210000',//180-200k usually
                            gasLimit: '0x21000000',
                            data: abi_token_uri(parseInt(amount)),
                            chainId: chain_id,
                            value: (parseFloat(mintCostWei) * parseInt(amount)).toString(16)
                        },
                    ],
                })
                .then(function (txHash) {
                    console.log('Transaction sent')
                })
                .catch((error) => {
                    throw (error)
                });
        })
    })
}
async function get_chainid() {
    active_chain_id = await ethereum.request({ method: 'eth_chainId' });
    if (active_chain_id != chain_id) {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chain_id }],
            });
        } catch (error) {
            alert("You do not have this network installed on your Metamask account")
            throw(error)
        }
        
    }
}
async function metamask_check() {
    const provider = await detectEthereumProvider();

    if (provider) {
        await startApp(provider)
    } else {
        alert('Please install MetaMask!');
    }
}
async function startApp(provider) {
    if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
        alert('Could not connect to Metamask, do you have multiple wallets installed?')
    } else {
        await ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((response) => {
                active_account = response[0]
            })
            .catch((err) => {
                if (err.code === 4001) {
                    console.log('Please connect to MetaMask.')
                    alert('Please connect to MetaMask.');
                    throw (err)
                } else {
                    throw (err)
                }
            });

    }
}
window.addEventListener('DOMContentLoaded', main)