from PIL import Image, ImageColor
import numpy as np
import random
import os
import json
from main.models import *
import hashlib
import string
import time
import cv2
from genera.tools import Timer
t = Timer()
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

def textureMapping(asset, texture, texture_color):

    # converting to an RGBA format
    asset_rgba = asset.convert("RGBA")
    texture_rgba = texture.convert("RGBA")

    # # converting into an array of RGBA, height x width x 4 numpy array (4000x4000x4)
    asset_data = np.array(asset_rgba)
    texture_data = np.array(texture_rgba)

    # print(type(asset_data))
    # print(type(texture_data))

    # # unpack the color bands of the asset for readability
    red, green, blue, alpha = asset_data.T

    # extracting the area that is white (255,255,255) from asset
    # it creates an array of boolean, True = white point, False = not a white point (leaving alpha values cuz they are just opacity)
    asset_white_area = (red == texture_color[0]) & (green == texture_color[1]) & (blue == texture_color[2]) & (alpha != 0)
    # print(texture_color[0])
    # print(texture_color[1])
    # print(texture_color[2])
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
        # asset_rgba = asset["PIL"].convert("RGBA")
        # converting into an array of RGBA, height x width x 4 numpy array (4000x4000x4)
        # asset_data = np.array(asset_rgba)

        asset_dict.update({asset["Name"]: asset["PIL"]})
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
    print(tempDict['TextureColor'])
    print(texture_map_color)
    for key, value in tempDict["Layers"].items():
        texturedAsset = 0
        print(f"Generating {key} layer")

        if value["Assets"] and value["Textures"]:

            # adding assets/textures to individual arrays
            rarityAppend(value, "Assets", rarityArrayAsset, rarityDictAsset)
            rarityAppend(value, "Textures", rarityArrayTexture, rarityDictTexture)

            while rarityArrayAsset:
                # randomly choosing assets/textures
                tempAsset = random.choice(rarityArrayAsset)
                texturedAsset = rarityDictAsset[tempAsset]
                tempMetadata = tempAsset
                if rarityArrayTexture:
                    
                    tempTexture = random.choice(rarityArrayTexture)
                        
                    # mapping texture to asset
                    texturedAsset = textureMapping(
                        rarityDictAsset[tempAsset], rarityDictTexture[tempTexture], texture_map_color
                    )

                    # metadata variable
                    tempMetadata = f"{tempAsset} ({tempTexture})"
                    
                    # removing used texture
                    rarityArrayTexture.remove(tempTexture)

                # adding final asset
                texturedAssetArray.append(texturedAsset)

                # adding metadata
                metadataArray.append(tempMetadata)

                # removing used asset
                rarityArrayAsset.remove(tempAsset)

        else:

            if value["Assets"]:

                rarityAppend2(value, "Assets", rarityArrayAsset, rarityDictAsset)
                arrayRange = len(rarityArrayAsset)
                # adding just assets to an individual array
                for _ in range(arrayRange):

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
    print(texturedAssetDict)
    # getting longest layer
    longest_layer = 0
    for value in texturedAssetDict:
        if len(texturedAssetDict[value]) > longest_layer:
            longest_layer = len(texturedAssetDict[value])
    db_collection.collection_size = longest_layer
    db_collection.save()
    # iterating over textured assets dictionary, and combining them
    for i in range(longest_layer):

        timeit_start = time.time()
        img_name = f"{tempDict['ImageName']} {i+1}"
        image_to_collection_db = CollectionImage.objects.create(linked_collection=db_collection)
        image_to_collection_db.name = img_name

        im = Image.new(
            "RGBA", (tempDict["Resolution_x"], tempDict["Resolution_y"]), (0, 0, 0, 0)
        )
        # creating json template
        temp_json = {
            "name": f"{tempDict['ImageName']}#{i}",
            "description": tempDict["Description"],
            "image": "",
        }
        temp_list = []
        
        for value in texturedAssetDict:
            # print(texturedAssetDict[value])
            if len(texturedAssetDict[value]) > i: # we already iterate over texturedAssetDict, save len values in array and use them # also, lots of double checks happening, find a way using len values for this not to happen
                temp_asset = texturedAssetDict[value][i]
                # creating attributes in metadata
                im.paste(temp_asset, (0, 0), temp_asset)
                temp_list.append(
                    {"trait_type": value, "value": metadataDict[value][i]}
                )
        temp_json.update({"attributes": temp_list})
        image_to_collection_db.metadata = json.dumps(temp_json)

        current_image_path = f"{db_collection.path}/{alphanum_random(6)}.png"

        t.start()
        cv2img = cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR)
        cv2.imwrite(current_image_path[1:], cv2img)
        t.stop()

        # t.start()
        # im.save(current_image_path[1:], "PNG")
        # t.stop()

        compressed_image_path = current_image_path.replace(".png", "_tbl.png")

        cv2img = cv2.resize(cv2img, dsize=[200, 200], interpolation=cv2.INTER_AREA)
        cv2.imwrite(compressed_image_path[1:], cv2img)

        # im.thumbnail((200,200)) #comress to thumbnail size
        # im.save(f"{compressed_image_path[1:]}", "PNG") #save thumbnail

        image_to_collection_db.path = current_image_path
        image_to_collection_db.path_compressed = compressed_image_path #save thumbnail path
        image_to_collection_db.save()
        timeit_end = time.time()
        print(f"Image {img_name} has been saved onto server (normal+compressed). Time taken: {timeit_end-timeit_start:.2f}s")

        # with open(
        #     f"{collection_path}/{tempDict['CollectionName']}#{i}.json", "w"
        # ) as json_file:
        #     json.dump(temp_json, json_file)
    print("Finished generation")

    
def preview_collection(tempDict, db_collection, user = None):
    return