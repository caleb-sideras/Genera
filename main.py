from PIL import Image
import numpy as np

# import asset_index
# from random_number import generateRandomNumber
import random

# Notes
# - the current textures Samoshin sent me are buggy, they only use A (Alpha) values in the RGBA format. He will fix
# - good luck 🙂 Caleb in yr13 would have no idea how this works!!!


# TODO
#
# ---ACTIVE---
# 1) Create metadata per image generated - adjusted names for asset + texture
#   https://github.com/ProjectOpenSea/metadata-api-python
#   https://docs.opensea.io/docs/metadata-standards
#   https://docs.opensea.io/docs/2-adding-metadata
#
# 2) full website integration
#
#   - Using rarity attribute do determine which assets/textures are selected
#       1) Convert each layer/texture rarity section into an array of numbers corresponding to it rarity
#           E.g. RarityA: 3 |
#                RarityB: 2 |=> Array[10] = {A,A,A,B,B,C,C,C,C,C}, then random.choice()
#                RarityC: 5 |
#
#       2) Collection Size Method: (collection size * (asset rarity *asset))
#           E.g. Layer 1 Assets = (100/10 *(3A, 2B, 5C)) = (30A, 20B, 50C) = 100 total assets.
#           Then you would random.choice(), subtract an element, and do this until its empty

#       3) Collection Size Method with texture rarity: (collection size * (texture rarity *asset))
#           E.g. Layer 1 Assets = (100/10 * (3A, 2B, 5C)) = (30A, 20B, 50C) = 100 total assets.
#           E.g. Layer 1 Textures = (100/10 * (3A, 2B, 5C)) = (30A, 20B, 50C) = 100 total textures.
#           random.choice both arrays, and subtract both elements.
#           => (29A, 20B, 50C) = 99 total assets
#           => (30A, 20B, 49C) = 99 total assets
#
# head
# 1 20 -> 2
# 2 20 -> 2
# 3 60 -> 6

# body			collection size 10
# 1 50 -> 5
# 2 50 -> 5

# face
# 1 5 ? // if we pick one, will show asset rarity 10 % on opensea
# 2 5 ?
# 3 90 -> 9

# ---DONE---
#
#   - the texture mapping process can be put into a function so any asset can have a texture put on it (maybe you can do this: DD)
#   - an example dictionary that would store all the collection data, that would be passed from the website
#   - assembling image and textures based on this example dictionary
#


def textureMapping(asset, texture):

    # converting to an RGBA format
    asset_rgba = asset.convert("RGBA")
    texture_rgba = texture.convert("RGBA")

    # converting into an array of RGBA, height x width x 4 numpy array (4000x4000x4)
    asset_data = np.array(asset_rgba)
    texture_data = np.array(texture_rgba)

    # unpack the color bands of the asset for readability
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


def metadatacreation():
    print(temp)


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

# Example dictionary
tempDict = {
    "CollectionName": "Void Chan",
    "Description": "Void NFTs for void chans",
    "Resolution": 4000,
    "Collection Size": 10,
    "Layers": [
        {
            "LayerName": "Body",
            "Assets": [
                {"Name": "Pink Sky", "PIL": body1, "Rarity": 10},
            ],
            "Textures": [],
        },
        {
            "LayerName": "Hair",
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
        {
            "LayerName": "Shirt",
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
        {
            "LayerName": "Accessories",
            "Assets": [
                {"Name": "Choker", "PIL": accessories1, "Rarity": 10},
            ],
            "Textures": [],
        },
    ],
}

print(tempDict["CollectionName"])
print(tempDict["Description"])


rarityArrayAsset = []
rarityArrayTexture = []
texturedAssetArray = []
texturedAssetDict = {}


def rarityAppend(json_object, json_name, rarity_list):
    for asset in json_object[json_name]:
        rarity = asset["Rarity"]
        for x in range(rarity):
            rarity_list.append(asset["PIL"])


for var in tempDict["Layers"]:
    chosenAsset = 0
    texturedAsset = 0
    temps = 0
    print(var["LayerName"])

    if var["Assets"] and var["Textures"]:

        # adding assets/textures to individual arrays
        rarityAppend(var, "Assets", rarityArrayAsset)
        rarityAppend(var, "Textures", rarityArrayTexture)

        for temps in range(tempDict["Collection Size"]):

            # randomly choosing assets/textures
            tempAsset = random.choice(rarityArrayAsset)
            tempTexture = random.choice(rarityArrayTexture)

            # mapping texture to asset
            texturedAsset = textureMapping(tempAsset, tempTexture)

            # adding final asset
            texturedAssetArray.append(texturedAsset)

            # removing used assets/textures
            rarityArrayAsset.remove(tempAsset)
            rarityArrayTexture.remove(tempTexture)

    else:

        if var["Assets"]:

            rarityAppend(var, "Assets", rarityArrayAsset)

            # adding just assets to an individual array
            for temps in range(tempDict["Collection Size"]):

                # randomly choosing assets
                tempAsset = random.choice(rarityArrayAsset)

                # adding final asset
                texturedAssetArray.append(tempAsset)

                # removing used asset
                rarityArrayAsset.remove(tempAsset)

    name = var["LayerName"]
    texturedAssetDict.update({name: texturedAssetArray})
    texturedAssetArray = []

# creating a base image to paste on. Type, Size, Color paramters
im = Image.new("RGBA", (tempDict["Resolution"], tempDict["Resolution"]), (0, 0, 0, 0))
image = 0

# iterating over textured assets dictionary, and combining them
for i in range(tempDict["Collection Size"]):

    for value in texturedAssetDict:

        temp_asset = texturedAssetDict[value][i]

        im.paste(temp_asset, (0, 0), temp_asset)

    im.save(f"new{i}.png", "PNG")


# then can save this image like: im.save("new.png", "PNG") or save to an array


# print(texturedAssetArray)

#     print(rarityArrayAsset)

# im.paste(chosenAsset['PIL'], (0, 0), chosenAsset['PIL'])

# im.paste(texturedAsset, (0, 0), texturedAsset)


# Looping through json
# creating both arrays (texture and asset) of 10
# random.choice/removing them
# texureMapping function()
# store these new assets in another array
# once iterated over all json, use these array to combine into final 10 images
# store these images in an array and/or save them an .png


# temp = random.choice(rarityArrayAsset)
# print(rarityArrayAsset)
# rarityArrayAsset.remove(temp)
# print(rarityArrayAsset)

# saving
# im.save("new.png", "PNG")
