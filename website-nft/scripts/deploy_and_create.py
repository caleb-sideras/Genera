from scripts.helpful_scripts import get_accounts, OPENSEA_URL

from brownie import NFTGenerator, Contract, accounts

sample_metadata = (
    {
        "name": "PUG",
        "description": "An adorable PUG pup!",
        "image": "https://ipfs.io/ipfs/QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8?filename=pug.png",
        "attributes": [{"trait_type": "cuteness", "value": 100}],
    },
)

sample_uri = "ipfs://bafybeiha4htobdjlk5vyusnjksxk5bxoc3oq746uxofpvnt2ua6vh7pvhe/?filename=Void01.json"


def deploy_and_create():
    # account = get_accounts()
    # collectible = NFTGenerator.deploy("VoidChan", "vde", {"from": account})
    contract = Contract("0x47CE21A2f6fd72D3e2a94277EA1b74B332E60189")
    creating_tx = contract.createNewNFT(sample_uri, {"from":  accounts.add('0dc39a3e4a7e928ac749bcbf4ce8ac827dac3df543633820ac1b05a5801a979f')})
    creating_tx.wait(1)
    print("New token has been created!")
    return contract, creating_tx


def get_OPENSEA_URL(nft_contract):
    print(
        f"Awesome! You can view your NFT at {OPENSEA_URL.format(nft_contract.address, 0)}"
    )
    print("Please wait up to 20 minutes, and hit the refresh metadata button")


def main():
    contract, tx = deploy_and_create()
    get_OPENSEA_URL(contract)
