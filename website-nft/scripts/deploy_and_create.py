from scripts.helpful_scripts import (
    get_accounts,
    OPENSEA_URL,
    get_contract,
    config,
    network,
    fund_with_link,
)
from brownie import NFTGenerator

sample_metadata = (
    {
        "name": "PUG",
        "description": "An adorable PUG pup!",
        "image": "https://ipfs.io/ipfs/QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8?filename=pug.png",
        "attributes": [{"trait_type": "cuteness", "value": 100}],
    },
)


def deploy_and_create():
    account = get_accounts()
    collectible = NFTGenerator.deploy(
        "VoidChan",
        "vde",
        {"from": account},
    )
    creating_tx = collectible.createNewCollectible({"from": account})
    creating_tx.wait(1)
    print("New token has been created!")
    return NFTGenerator, creating_tx


def main():
    deploy_and_create()


metadata_file_name = f"./metadata/{network.show_active()}/{token_id}-{breed}.json"
