import os
from pathlib import Path
import requests
import json
import asyncio

# from scripts.deploy_and_create import deploy_and_create

PINATA_BASE_URL = "https://api.pinata.cloud/"
endpoint = "pinning/pinFileToIPFS"
# Change this filepath
# filepath = "./img/pug.png"
# filename = filepath.split("/")[-1:][0]
headers = {
    "pinata_api_key": "d15d7ee40273fd0f49ad",
    "pinata_secret_api_key": "ed514d486b0c4ab94dcfbff65174d98cc044a3885d40ec65d1dff4ffb2cb1c68",
}
pinata_links = []


def upload_pinata(filepath):
    with Path(filepath).open("rb") as fp:
        image_binary = fp.read()
        filename = filepath.split("/")[-1:][0]
        response = requests.post(
            PINATA_BASE_URL + endpoint,
            files={"file": (filename, image_binary)},
            headers=headers,
        )
        # print(response.json())
        return response.json()


def upload_images(collection_name, collection_size):
    for i in range(collection_size):
        pinata_link = upload_pinata(
            f"collections/{collection_name}/{collection_name}{i}.png"
        )
        with open(
            f"collections/{collection_name}/{collection_name}{i}.json", "r+"
        ) as f:
            data = json.load(f)
            data[
                "image"
            ] = f"https://ipfs.io/ipfs/{pinata_link['IpfsHash']}"  # <--- add `id` value.
            f.seek(0)  # <--- should reset file position to the beginning.
            json.dump(data, f, indent=4)
            f.truncate()


def upload_metadata(collection_name, collection_size):

    for i in range(collection_size):
        pinata_link = upload_pinata(
            f"collections/{collection_name}/{collection_name}{i}.json"
        )
        pinata_links.append(f"https://ipfs.io/ipfs/{pinata_link['IpfsHash']}")
    print(pinata_links)


def main():
    upload_images("Void Chan", 10)
    upload_metadata("Void Chan", 10)


if __name__ == "__main__":
    main()
    # deploy_and_create(pinata_links)
