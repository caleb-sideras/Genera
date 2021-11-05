from brownie import AdvancedCollectible
from scripts.helpful_scripts import fund_with_link, get_accounts
from web3 import Web3


def main():
    account = get_accounts()
    advanced_collectible = AdvancedCollectible[-1]
    fund_with_link(advanced_collectible.address, amount=Web3.toWei(0.1, "ether"))
    creation_transaction = advanced_collectible.createCollectible({"from": account})
    creation_transaction.wait(1)
    print("Collectible created!")