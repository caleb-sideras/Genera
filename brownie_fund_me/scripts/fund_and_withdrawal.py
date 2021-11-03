from brownie import FundMe
from scripts.helpful_scripts import get_account


def fund():
    fund_me = FundMe[-1]
    account = get_account()
    entranace_fee = fund_me.getEntranceFee()
    print(f"The current entry fee is {entranace_fee}")
    fund_me.fund({"from": account, "value": entranace_fee})


def withdrawal():
    fund_me = FundMe[-1]
    account = get_account()
    fund_me.withdraw({"from": account})


def main():
    fund()
    withdrawal()
