from scripts.helpful_scripts import get_accounts, OPENSEA_URL

from brownie import NFTGenerator

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
    account = get_accounts()
    collectible = NFTGenerator.deploy("VoidChan", "vde", {"from": account})
    creating_tx = collectible.createNewCollectible(sample_uri, {"from": account})
    creating_tx.wait(1)
    print("New token has been created!")
    return collectible, creating_tx


def get_OPENSEA_URL(nft_contract):
    print(
        f"Awesome! You can view your NFT at {OPENSEA_URL.format(nft_contract.address, 0)}"
    )
    print("Please wait up to 20 minutes, and hit the refresh metadata button")


def main():
    contract, tx = deploy_and_create()
    get_OPENSEA_URL(contract)
