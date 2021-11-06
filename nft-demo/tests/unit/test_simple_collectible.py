from scripts.helpful_scripts import LOCAL_BLOCKCHAIN_ENVIRONMENTS, get_accounts
from scripts.advanced_collectible.deploy_and_create import deploy_and_create
from brownie import network
import pytest


def test_can_create_simple_collectible():
    if network.show_active() is not LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip
    simple_collectible = deploy_and_create()
    assert simple_collectible.ownerof(0) == get_accounts()
