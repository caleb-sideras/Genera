from pathlib import Path
import requests
import json
import os
from brownie import network

metadata_file_name = f"./metadata/{network.show_active()}/sample_metadata.json"


def upload_to_ipfs(filepath):
    with Path(filepath).open("rb") as fp:
        image_binary = fp.read()
        ipfs_url = "http://127.0.0.1:5001"
        endpoint = "/api/v0/add"
        response = requests.post(ipfs_url + endpoint, files={"file": image_binary})
        ipfs_hash = response.json()["Hash"]
        # "./img/0-PUG.png" -> "0-PUG.png"
        filename = filepath.split("/")[-1:][0]
        image_uri = f"https://ipfs.io/ipfs/{ipfs_hash}?filename={filename}"
        print(image_uri)
        return image_uri


def main():
    # for x in range(1, 2):
    #     upload_to_ipfs(f"./img/Void{x}.png")
    #     upload_to_ipfs(f"./metadata/{network.show_active()}/Void{x}.json")
    upload_to_ipfs(f"./metadata/{network.show_active()}/Void01.json")
