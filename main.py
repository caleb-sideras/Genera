from PIL import Image
import numpy as np
import random
import os
import json

# Notes
# - the current textures Samoshin sent me are buggy, they only use A (Alpha) values in the RGBA format

# TODO
#
# ---ACTIVE---
#
# 1) These are some optimizing ideas
#   -Using metadata, we can see if an asset/texture combo has already been created within the individual asset arrays. Then use that PIL object, and assign it.
#

# ---DONE---
#
#   - the texture mapping process can be put into a function so any asset can have a texture put on it (maybe you can do this: DD)
#   - an example dictionary that would store all the collection data, that would be passed from the website
#   - assembling image and textures based on this example dictionary
#   - tat added deterministic probability
#   - optimized texture mapping so there is no duplicate procedures
#   - optimized how rarity data is stored, this method is MUCH more scalable now
#   - update json format / iteration to fit artems json
#   - create metadata per image generated - adjusted names for asset + texture\


def textureMapping(asset_data, texture_data):

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
    asset_white_area = (red == 255) & (blue == 255) & (green == 255)

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
# temp_asset = temp_asset.resize((2000,2000))
# for textures
def rarityAppend(json_object, json_name, rarity_list, asset_dict):
    for asset in json_object[json_name]:
        rarity = asset["Rarity"]
        # horo, verti = asset["PIL"].size
        # print(horo, verti)
        # converting to an RGBA format
        asset_rgba = asset["PIL"].convert("RGBA")
        
        # converting into an array of RGBA, height x width x 4 numpy array (4000x4000x4)
        asset_data = np.array(asset_rgba)
        # print(asset_data.shape)
        # print(asset_data.size)
        asset_dict.update({asset["Name"]: asset_data})
        for x in range(rarity):
            rarity_list.append(asset["Name"])

# for no textures
def rarityAppend2(json_object, json_name, rarity_list, asset_dict):
    for asset in json_object[json_name]:
        rarity = asset["Rarity"]
        asset_dict.update({asset["Name"]: asset["PIL"]})
        for x in range(rarity):
            rarity_list.append(asset["Name"])

# Example assets
body1 = Image.open("./Assets/" + "Body/" + "1" + ".png")

hair1 = Image.open("./Assets/" + "Hair/" + "1" + ".png")
hair2 = Image.open("./Assets/" + "Hair/" + "2" + ".png")

shirt1 = Image.open("./Assets/" + "Shirt/" + "1" + ".png")
shirt2 = Image.open("./Assets/" + "Shirt/" + "2" + ".png")

accessories1 = Image.open("./Assets/" + "Accessories/" + "1" + ".png")

texture1 = Image.open("./Assets/" + "Texture/" + "1" + ".png")
texture2 = Image.open("./Assets/" + "Texture/" + "2" + ".png")
texture3 = Image.open("./Assets/" + "Texture/" + "3" + ".png")
texture4 = Image.open("./Assets/" + "Texture/" + "4" + ".png")

# Example dictionary (OLD)
# tempDict = {
#     "CollectionName": "Void Chan",
#     "Description": "Void NFTs for void chans",
#     "Resolution": 4000,
#     "CollectionSize": 10,
#     "Layers": [
#         {
#             "LayerName": "Body",
#             "Assets": [
#                 {"Name": "Pink Sky", "PIL": body1, "Rarity": 10},
#             ],
#             "Textures": [],
#         },
#         {
#             "LayerName": "Hair",
#             "Assets": [
#                 {"Name": "Anime", "PIL": hair1, "Rarity": 5},
#                 {"Name": "Long", "PIL": hair2, "Rarity": 5},
#             ],
#             "Textures": [
#                 {"Name": "Texture 1", "PIL": texture1, "Rarity": 2},
#                 {"Name": "Texture 2", "PIL": texture2, "Rarity": 2},
#                 {"Name": "Texture 3", "PIL": texture3, "Rarity": 2},
#                 {"Name": "Texture 4", "PIL": texture4, "Rarity": 4},
#             ],
#         },
#         {
#             "LayerName": "Shirt",
#             "Assets": [
#                 {"Name": "T-Shirt", "PIL": shirt1, "Rarity": 5},
#                 {"Name": "Crop Tee", "PIL": shirt2, "Rarity": 5},
#             ],
#             "Textures": [
#                 {"Name": "Texture 1", "PIL": texture1, "Rarity": 2},
#                 {"Name": "Texture 2", "PIL": texture2, "Rarity": 2},
#                 {"Name": "Texture 3", "PIL": texture3, "Rarity": 2},
#                 {"Name": "Texture 4", "PIL": texture4, "Rarity": 4},
#             ],
#         },
#         {
#             "LayerName": "Accessories",
#             "Assets": [
#                 {"Name": "Choker", "PIL": accessories1, "Rarity": 10},
#             ],
#             "Textures": [],
#         },
#     ],
# }
# 
# Example Metadata (current)
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

# Artem's implmentation of the dict (current)
tempDict2 = {
    "CollectionName": "Void Chain",
    "CollectionSize": 10,
    "Resolution": 4000,
    "Description": "Void NFTs for void chans",
    "Layers": {
        "Body": {
            "Assets": [
                {"Name": "Pink Sky", "PIL": body1, "Rarity": 9},
            ],
            "Textures": [],
        },
        "Hair": {
            "Assets": [
                {"Name": "Anime", "PIL": hair1, "Rarity": 5},
                {"Name": "Long", "PIL": hair2, "Rarity": 5},
            ],
            "Textures": [
                {"Name": "Texture 1", "PIL": texture1, "Rarity": 2},
                {"Name": "Texture 2", "PIL": texture2, "Rarity": 2},
                {"Name": "Texture 3", "PIL": texture3, "Rarity": 2},
                {"Name": "Texture 4", "PIL": texture4, "Rarity": 4},
            ],
        },
        "Shirt": {
            "Assets": [
                {"Name": "T-Shirt", "PIL": shirt1, "Rarity": 5},
                {"Name": "Crop Tee", "PIL": shirt2, "Rarity": 5},
            ],
            "Textures": [
                {"Name": "Texture 1", "PIL": texture1, "Rarity": 2},
                {"Name": "Texture 2", "PIL": texture2, "Rarity": 2},
                {"Name": "Texture 3", "PIL": texture3, "Rarity": 2},
                {"Name": "Texture 4", "PIL": texture4, "Rarity": 4},
            ],
        },
        "Accessories": {
            "Assets": [
                {"Name": "Choker", "PIL": accessories1, "Rarity": 10},
            ],
            "Textures": [],
        },
    },
}

print(tempDict2["CollectionName"])
print(tempDict2["Description"])

# RR - Reset after every iteration
# NR - Not reset after every iteration

rarityArrayAsset = [] # Example [t-shirt, crop-top, t-shirt, crop-top, t-shirt] (RR)
rarityDictAsset = {} # Example {t-shirt: npArray, crop-top : npArray] (RR)

rarityArrayTexture = [] # Example [texture1, texture2, texture1, texture2, texture1] (RR)
rarityDictTexture = {} # Example {texture1: npArray, texture2 : npArray] (RR)

metadataArray = [] # Example [t-shirt (texture1), t-shirt (texture2), crop-top (texture2), t-shirt, crop-top (texture1)] (RR)
metadataDict = {} # Example {Body: metadataArray, Hair: metadataArray, Clothes: metadataArray} (NR)

texturedAssetArray = [] # Example [texturedAsset1, texturedAsset2, texturedAsset3, texturedAsset4, texturedAsset5] (RR)
texturedAssetDict = {} # Example {Body: texturedAssetArray1, Hair: texturedAssetArray2, Clothes: texturedAssetArray3] (NR)



for key, value in tempDict2["Layers"].items():
    chosenAsset = 0
    texturedAsset = 0
    temps = 0
    print(key)

    if value["Assets"] and value["Textures"]:

        # adding assets/textures to individual arrays
        rarityAppend(value, "Assets", rarityArrayAsset, rarityDictAsset)
        rarityAppend(value, "Textures", rarityArrayTexture, rarityDictTexture)
        while rarityArrayAsset:
            # randomly choosing assets/textures
            tempAsset = random.choice(rarityArrayAsset)
            texturedAsset = tempAsset
            tempMetadata = tempAsset
            if rarityArrayTexture:
                
                tempTexture = random.choice(rarityArrayTexture)
                      
                # mapping texture to asset
                texturedAsset = textureMapping(
                    rarityDictAsset[tempAsset], rarityDictTexture[tempTexture]
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
    # setting data structures to empty
    texturedAssetArray = []
    metadataArray = []
    rarityDictAsset = {}
    rarityDictTexture = {}


image_path = f"collections/{tempDict2['CollectionName']}"
os.makedirs(image_path)

# getting longest layer
longest_layer = 0
for value in texturedAssetDict:
    if len(texturedAssetDict[value]) > longest_layer:
        longest_layer = len(texturedAssetDict[value])

# iterating over textured assets dictionary, and combining them
for i in range(longest_layer):
    im = Image.new(
        "RGBA", (tempDict2["Resolution"], tempDict2["Resolution"]), (0, 0, 0, 0)
    )
    # creating json template
    temp_json = {
        "name": f"{tempDict2['CollectionName']}#{i}",
        "description": tempDict2["Description"],
        "image": "",
    }
    temp_list = []

    for value in texturedAssetDict:
        if len(texturedAssetDict[value]) > i: # we already iterate over texturedAssetDict, save len values in array and use them # also, lots of double checks happening, find a way using len values for this not to happen
            temp_asset = texturedAssetDict[value][i]
            # creating attributes in metadata
            im.paste(temp_asset, (0, 0), temp_asset)
            temp_list.append(
                {"trait_type": value, "value": metadataDict[value][i]}
            )
    temp_json.update({"attributes": temp_list})

    # saving images and jsons
    im.save(f"{image_path}/{tempDict2['CollectionName']}{i}.png", "PNG")
    with open(f"{image_path}/{tempDict2['CollectionName']}{i}.json", "w") as json_file:
        json.dump(temp_json, json_file)
