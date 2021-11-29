from PIL import Image, ImageColor
import numpy as np
import random
import os
import json
from polls.models import *
import hashlib
import string
# Notes
# - the current textures Samoshin sent me are buggy, they only use A (Alpha) values in the RGBA format

# TODO
#
# ---ACTIVE---
# 1) Create metadata per image generated - adjusted names for asset + texture
#   https://github.com/ProjectOpenSea/metadata-api-python
#   https://docs.opensea.io/docs/metadata-standards
#   https://docs.opensea.io/docs/2-adding-metadata
#
# 2) Full website integration
#   Update json format / iteration to fit artems json
#
# 3) These are some optimizing ideas
#   -Using metadata, we can see if an asset/texture combo has already been created within the individual asset arrays. Then use that PIL object, and assign it.
#
# 4) Metadata:
# {
#   "name": "Void#1",
#   "description": "Void NFT girl for void chans",
#   "image": "https://ipfs.io/ipfs/QmZb77bDc39me3HMcK7zQC5z6yzqm88fdxDe82NRNz2qUZ?filename=Void1.png",
#   "attributes": [
#     {
#       "trait_type": "Body",
#       "value": "Girl"
#     },
#     {
#       "trait_type": "Shirt",
#       "value": "Crop Top (Dotted)"
#     },
#     {
#       "trait_type": "Hair",
#       "value": "Anime (Striped)"
#     },
#     {
#       "trait_type": "Accessories",
#       "value": "Choker"
#     }
#   ]
# }
# ---DONE---
#
#   - the texture mapping process can be put into a function so any asset can have a texture put on it (maybe you can do this: DD)
#   - an example dictionary that would store all the collection data, that would be passed from the website
#   - assembling image and textures based on this example dictionary
#   - tat added deterministic probability
#   - optimized texture mapping so there is no duplicate procedures
#   - optimized how rarity data is stored, this method is MUCH more scalable now
def alphanum_random(size = 8):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=size))

def textureMapping(asset_data, texture_data, texture_color):

    # converting to an RGBA format
    # asset_rgba = asset.convert("RGBA")
    # texture_rgba = texture.convert("RGBA")

    # # converting into an array of RGBA, height x width x 4 numpy array (4000x4000x4)
    # asset_data = np.array(asset_rgba)
    # texture_data = np.array(texture_rgba)

    # print(type(asset_data))
    # print(type(texture_data))

    # # unpack the color bands of the asset for readability
    red, green, blue, alpha = asset_data.T

    # extracting the area that is white (255,255,255) from asset
    # it creates an array of boolean, True = white point, False = not a white point (leaving alpha values cuz they are just opacity)
    asset_white_area = (red == texture_color[0]) & (blue == texture_color[1]) & (green == texture_color[2])

    # using the white area boolean array, points that are True are taken out of the texture array
    # aka forming the exact shape needed, but with the texture
    texture_white_area = texture_data[...][asset_white_area.T].shape

    # resizes the texture to the same shape of the asset, so they can be assigned to each other
    texture_white_area_resized = np.resize(
        texture_data[...][asset_white_area.T], texture_white_area
    )

    # replacing all the white areas in the asset with the texture
    asset_data[...][asset_white_area.T] = texture_white_area_resized

    # converting them back into an image
    shirt = Image.fromarray(asset_data)

    return shirt


def rarityAppend(json_object, json_name, rarity_list, asset_dict):
    for asset in json_object[json_name]:
        rarity = asset["Rarity"]
        # converting to an RGBA format
        asset_rgba = asset["PIL"].convert("RGBA")
        # converting into an array of RGBA, height x width x 4 numpy array (4000x4000x4)
        asset_data = np.array(asset_rgba)

        asset_dict.update({asset["Name"]: asset_data})
        for x in range(rarity):
            rarity_list.append(asset["Name"])


def rarityAppend2(json_object, json_name, rarity_list, asset_dict):
    for asset in json_object[json_name]:
        rarity = asset["Rarity"]
        asset_dict.update({asset["Name"]: asset["PIL"]})
        for _ in range(rarity):
            rarity_list.append(asset["Name"])


def create_and_save_collection(tempDict, db_collection, user = None):
    print(tempDict["CollectionName"])
    print(tempDict["Description"])

    rarityArrayAsset = []
    rarityArrayTexture = []
    texturedAssetArray = []
    texturedAssetDict = {}
    rarityDictAsset = {}
    rarityDictTexture = {}
    metadataArray = []
    metadataDict = {}

    texture_map_color = ImageColor.getcolor(tempDict['TextureColor'], "RGB")
    for key, value in tempDict["Layers"].items():
        texturedAsset = 0
        print(f"Generating {key} layer")

        if value["Assets"] and value["Textures"]:

            # adding assets/textures to individual arrays
            rarityAppend(value, "Assets", rarityArrayAsset, rarityDictAsset)
            rarityAppend(value, "Textures", rarityArrayTexture, rarityDictTexture)

            for i in range(tempDict["CollectionSize"]):
                # randomly choosing assets/textures
                tempAsset = random.choice(rarityArrayAsset)
                tempTexture = random.choice(rarityArrayTexture)

                # mapping texture to asset
                texturedAsset = textureMapping(
                    rarityDictAsset[tempAsset], rarityDictTexture[tempTexture], texture_map_color
                )

                # adding final asset
                texturedAssetArray.append(texturedAsset)
                # adding metadata
                metadataArray.append(f"{tempAsset} ({tempTexture})")

                # removing used assets/textures
                rarityArrayAsset.remove(tempAsset)
                rarityArrayTexture.remove(tempTexture)

        else:

            if value["Assets"]:

                rarityAppend2(value, "Assets", rarityArrayAsset, rarityDictAsset)

                # adding just assets to an individual array
                for i in range(tempDict["CollectionSize"]):

                    # randomly choosing assets
                    tempAsset = random.choice(rarityArrayAsset)

                    # adding final asset
                    texturedAssetArray.append(rarityDictAsset[tempAsset])
                    # adding metadata
                    metadataArray.append(f"{tempAsset}")
                    # removing used asset
                    rarityArrayAsset.remove(tempAsset)

        name = key
        texturedAssetDict.update({name: texturedAssetArray})
        metadataDict.update({name: metadataArray})
        texturedAssetArray = []
        metadataArray = []
        rarityDictAsset = {}
        rarityDictTexture = {}
    print("Creating/saving .png & .json")
    
    os.makedirs(db_collection.path[1:])

    # iterating over textured assets dictionary, and combining them
    for i in range(tempDict["CollectionSize"]):
        img_name = f"{tempDict['CollectionName']} {i+1}"
        image_to_collection_db = CollectionImage.objects.create(linked_collection=db_collection)
        image_to_collection_db.name = img_name

        # creating a base image to paste on. Type, Size, Color paramters
        im = Image.new(
            "RGBA", (tempDict["Resolution"], tempDict["Resolution"]), (0, 0, 0, 0)
        )
        temp_json = {
            "name": img_name,
            "description": tempDict["Description"],
            "image": "",
        }
        temp_list = []
        for value in texturedAssetDict:

            temp_asset = texturedAssetDict[value][i]

            im.paste(temp_asset, (0, 0), temp_asset)
            temp_list.append(
                {"trait_type": value, "value": metadataDict[value][i]},
            )
        temp_json.update({"attributes": temp_list})
        image_to_collection_db.metadata = temp_json

        current_image_path = f"{db_collection.path}/{alphanum_random(6)}.png"
        im.save(current_image_path[1:], "PNG")
        image_to_collection_db.path = current_image_path
        image_to_collection_db.save()

        # with open(
        #     f"{collection_path}/{tempDict['CollectionName']}#{i}.json", "w"
        # ) as json_file:
        #     json.dump(temp_json, json_file)
    print("Finished generation")

    
