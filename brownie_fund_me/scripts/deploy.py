from brownie import FundMe, network, config, MockV3Aggregator
from scripts.helpful_scripts import (
    get_account,
    deploy_mocks,
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
)
import os
from web3 import Web3


def deploy_fund_me():
    account = get_account()
    # publish source with etherscan api key
    # rinkeby ETH-USD feed 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        price_feed_address = config["networks"][network.show_active()][
            "eth_usd_price_feed"
        ]
    else:
        deploy_mocks()
        price_feed_address = MockV3Aggregator[-1].address
    fund_me = FundMe.deploy(
        price_feed_address,
        {"from": account},
        publish_source=config["networks"][network.show_active()].get(
            "verify"
        ),  # can put ["verify"] but .get() prevents index errors if there is not verify
    )
    print(f"Contract reployed to {fund_me.address}")
    return fund_me


def main():
    deploy_fund_me()
