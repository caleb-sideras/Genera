from solcx import compile_standard, install_solc
import json
from web3.main import Web3

# import os
# from dotenv import load_dotenv

# load_dotenv()

# install_solc("0.6.0")

with open("./SimpleStorage.sol", "r") as file:
    simple_storage_file = file.read()

    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"SimpleStorage.sol": {"content": simple_storage_file}},
            "settings": {
                "outputSelection": {
                    "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                }
            },
        },
        solc_version="0.6.0",
    )
    with open("compiled_code.json", "w") as file:
        json.dump(compiled_sol, file)

    # get bytecode
    bytecode = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["evm"][
        "bytecode"
    ]["object"]

    # get abi
    abi = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"]

    # connecting to Rinkeby/Ganache testing environment
    w3 = Web3(
        Web3.HTTPProvider(
            "https://rinkeby.infura.io/v3/d6c7a2d0b9bd40afa49d2eb06cc5baba"
        )
    )
    chain_id = 4  # 1337 ganache
    my_address = "0x36aCd77CA5bF2c84C0a60786581b322546d68193"
    # private_key = os.getenv("PRIVATE_KEY")
    private_key = "0xce28813bca7605f221e0b6df63be9b5f8a28e90e1b12f71627978e030a324ee2"

    # creating the contract
    SimpleStorage = w3.eth.contract(abi=abi, bytecode=bytecode)

    # getting lastest transaction - nonce the amount on contracts deloyed on address
    nonce = w3.eth.getTransactionCount(my_address)
    # print(nonce)

    # creating transaction
    transaction = SimpleStorage.constructor().buildTransaction(
        {"chainId": chain_id, "from": my_address, "nonce": nonce}
    )

    # signing transaction
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)

    # sending transaction
    print("deloying contract")
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)

    # will wait for our transaction to go through
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print("deployed")

    # working with the contract
    # contract address and abi
    simple_storage = w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)

    # call -> don't make a state change to the block chain (calling data)
    # transact -> make a state change to the block chain
    print(simple_storage.functions.retrieve().call())
    # print(simple_storage.functions.store(15).call()) # .call() on a state change is a virtual interaction

    store_transaction = simple_storage.functions.store(15).buildTransaction(
        {"chainId": chain_id, "from": my_address, "nonce": nonce + 1}
    )

    signed_store_tx = w3.eth.account.sign_transaction(
        store_transaction, private_key=private_key
    )
    print("updating contract")
    send_store_tx = w3.eth.send_raw_transaction(signed_store_tx.rawTransaction)

    tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)
    print("updated")
    print(simple_storage.functions.retrieve().call())
