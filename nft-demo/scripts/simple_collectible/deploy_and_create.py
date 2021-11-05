from scripts.helpful_scripts import get_accounts, OPENSEA_URL
from brownie import SimpleCollectible

sample_tokenURI = "https://ipfs.io/ipfs/QmWEwhPyRRV7aGQpY45hY6B6wZLNrK7KAjDGLFAhrPwQws?filename=new.png"

OPENSEA_URL = "https://testnets.opensea.io/assets/{}/{}"
sample_tokenURI2 = (
    "ipfs://bafybeidlkqhddsjrdue7y3dy27pu5d7ydyemcls4z24szlyik3we7vqvam/nft-image.png"
)


def deploy_and_create():
    account = get_accounts(id="caleb-metamask-1")
    simple_collectible = SimpleCollectible.deploy({"from": account})
    tx = simple_collectible.createCollectible(sample_tokenURI2, {"from": account})
    tx.wait(1)
    print(
        f"Finished, check on opensea.io {OPENSEA_URL.format(simple_collectible.address, simple_collectible.tokenCounter() - 1)}"
    )
    print("wait 20 mins then hit refresh metadata")

    return simple_collectible


def main():
    deploy_and_create()
