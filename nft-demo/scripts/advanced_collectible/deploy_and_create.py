from scripts.helpful_scripts import (
    get_accounts,
    OPENSEA_URL,
    get_contract,
    config,
    network,
    fund_with_link,
)
from brownie import AdvancedCollectible


def deploy_and_create():
    account = get_accounts()
    advanced_collectible = AdvancedCollectible.deploy(
        get_contract("vrf_coordinator"),
        get_contract("link_token"),
        config["networks"][network.show_active()]["keyhash"],
        config["networks"][network.show_active()]["fee"],
        {"from": account},
    )
    fund_with_link(advanced_collectible.address)
    creating_tx = advanced_collectible.createCollectible({"from": account})
    creating_tx.wait(1)
    print("New token has been created!")
    return advanced_collectible, creating_tx


def main():
    deploy_and_create()
