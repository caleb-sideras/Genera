from brownie import SimpleStorage, accounts, config


def read_contract():
    #  -1 most recent deployed contract / calling with: brownie run scripts/read_value.py --network rinkeby
    simple_storage = SimpleStorage[-1]
    print(simple_storage.retrieve())


def main():
    read_contract()
