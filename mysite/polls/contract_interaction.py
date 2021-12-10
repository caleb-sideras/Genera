# from solcx import compile_standard, install_solc
import json
from web3.main import Web3

with open("static/Contracts/erc721_contract.json", "r") as myfile:
        data = myfile.read()
json_string = json.loads(data)

w3 = Web3(
        Web3.HTTPProvider(
            "https://rinkeby.infura.io/v3/d6c7a2d0b9bd40afa49d2eb06cc5baba"
        )
    )
tokenURIs = []
def read_contract(contract_address):
    print("READ CONTRACT CALLED")
    print(contract_address)
    print(json_string['abi'])
    contract = w3.eth.contract(address=contract_address, abi=json_string['abi'])
    print(contract)
    listURI = call_contract(contract)
    return listURI

def call_contract(contract):
    tokenURIs =[]
    counter = 0
    length = contract.functions.totalSupply().call() # check if no tokens
    print(length)
    while counter < length:
        tokenURIs.append(contract.functions.tokenURI(counter).call())
        counter = counter + 1
    return tokenURIs
