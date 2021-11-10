from brownie import accounts
from brownie.network import accounts
from brownie import SimpleStorage, network

import os
from dotenv import load_dotenv

load_dotenv()


def deploy_simple_storage():
    account = get_account()
    simple_storage = SimpleStorage.deploy({"from": account})
    stored_value = simple_storage.retrieve()
    print(stored_value)

    transaction = simple_storage.store(14, {"from": account})
    transaction.wait(1)

    updated_stored_value = simple_storage.retrieve()
    print(updated_stored_value)


def get_account():
    if network.show_active() == "development":
        return accounts[0]
    else:
        # private_key = os.getenv("PRIVATE_KEY")
        # return private_key
        print(os.getenv("WEB3_INFURA_PROJECT_ID"))
        return accounts.load("caleb-metamask-1")


def main():
    deploy_simple_storage()
