from brownie import TestContract


def main():
    contract2 = TestContract.bytecode
    print(contract2)
    contract2 = TestContract.abi
    print(contract2)
