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

uri_list = [
    "https://ipfs.io/ipfs/QmcRgNVvZQYCQCBtmUmX2VcxNdCwChPCsZx85Yd4aWapQN",
    "https://ipfs.io/ipfs/QmNco8G5hrJfLdJpYwsxrygWXS1zcmW9AuY9Q8PstJFX9c",
    "https://ipfs.io/ipfs/QmbL5ibiP5sBuRP8JYrujhTgRCvNkGsueC3zfWiruz64Av",
    "https://ipfs.io/ipfs/QmdNzkFuacTifwutpYHgMouf41MCEBHmPzRoaTET1d4z6L",
    "https://ipfs.io/ipfs/QmX16XGKxbJKX6rgVuNssZe1sJuMitCLPtnZd2AgYwPB9H",
    "https://ipfs.io/ipfs/QmeLEWYXhwMVAA9idKiaKxz2WPinED9ZAh1gTe7GrAbPz9",
    "https://ipfs.io/ipfs/QmaBC6a16PyjzZGTqwNV49z59wSKZgPk3ffGhToZ3NzGjS",
    "https://ipfs.io/ipfs/QmWm4VWSYhhrQkgfbbceXQZSYQWhH5BcZvAddp9kMzETE5",
    "https://ipfs.io/ipfs/QmZcBRb1PtwJuD2ucqHjq5tFo9bRjFGSgg5x7WwXxeCobn",
    "https://ipfs.io/ipfs/QmXrxub4TPgLy4ur5kUGL3ayi1q6uqh88RBdrTxjcur7Ee",
]


def deploy(collection_name, collection_symbol, account):
    collectible = NFTGenerator.deploy(
        collection_name, collection_symbol, {"from": account}
    )
    return collectible


def create(contract, token_uri, account):
    creating_tx = contract.createNewCollectible(token_uri, {"from": account})
    creating_tx.wait(1)
    print("New token has been created!")
    return creating_tx


def get_OPENSEA_URL(nft_contract):
    print(
        f"Awesome! You can view your NFT at {OPENSEA_URL.format(nft_contract.address, 0)}"
    )
    print("Please wait up to 20 minutes, and hit the refresh metadata button")


def deploy_and_create(uri_list):
    account = get_accounts()
    contract = deploy("VoidChan", "vde", account)
    for i in range(len(uri_list)):
        tx = create(contract, uri_list[i], account)

    get_OPENSEA_URL(contract)


def main():
    deploy_and_create(uri_list)
