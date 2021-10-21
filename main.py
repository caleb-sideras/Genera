from PIL import Image
import numpy as np
import asset_index
from random_number import generateRandomNumber
import random

# Notes
# - the current textures Samoshin sent me are buggy, they only use A (Alpha) values in the RGBA format. He will fix
# - good luck :) Caleb in yr13 would have no idea how this works!!!


# TODO
#
# ---ACTIVE---
#
# 1) full website integration
#
#   - Using rarity attribute do determine which assets/textures are selected
#
# ---DONE---
#
#   - the texture mapping process can be put into a function so any asset can have a texture put on it (maybe you can do this: DD)
#   - an example dictionary that would store all the collection data, that would be passed from the website
#   - assembling image and textures based on this example dictionary
#

def textureMapping(asset, texture):

    # converting to an RGBA format
    asset_rgba = asset.convert('RGBA')
    texture_rgba = texture.convert('RGBA')

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
        texture_data[...][asset_white_area.T], texture_white_area)

    # replacing all the white areas in the asset with the texture
    asset_data[...][asset_white_area.T] = texture_white_area_resized

    # converting them back into an image
    shirt = Image.fromarray(asset_data)

    return shirt

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
    'CollectionName': 'Void Chan',
    'Description': 'Void NFTs for void chans',
    'Resolution' : 4000,
    'Layers': [
        {
            'LayerName': 'Body',
            'Assets': [
                {
                    'Name': 'Pink Sky',
                    'PIL': body1,
                    'Rarity': 1
                },
            ],
            'Textures': []
        },
        {
            'LayerName': 'Hair',
            'Assets': [
                {
                    'Name': 'Anime',
                    'PIL': hair1,
                    'Rarity': 0.5
                }, 
                {
                    'Name': 'Long',
                    'PIL': hair2,
                    'Rarity': 0.5
                },
            ],
            'Textures': [
                {
                    'Name': 'Texture 1',
                    'PIL': texture1,
                    'Rarity': 0.25
                },
                {
                    'Name': 'Texture 2',
                    'PIL': texture2,
                    'Rarity': 0.25
                },
                {
                    'Name': 'Texture 3',
                    'PIL': texture3,
                    'Rarity': 0.25
                },
                {
                    'Name': 'Texture 4',
                    'PIL': texture4,
                    'Rarity': 0.25
                },
            ]
        },
        {
            'LayerName': 'Shirt',
            'Assets': [
                {
                    'Name': 'T-Shirt',
                    'PIL': shirt1,
                    'Rarity': 0.5
                },
                {
                    'Name': 'Crop Tee',
                    'PIL': shirt2,
                    'Rarity': 0.5
                },
            ],
            'Textures': [
                {
                    'Name': 'Texture 1',
                    'PIL': texture1,
                    'Rarity': 0.25
                },
                {
                    'Name': 'Texture 2',
                    'PIL': texture2,
                    'Rarity': 0.25
                },
                {
                    'Name': 'Texture 3',
                    'PIL': texture3,
                    'Rarity': 0.25
                },
                {
                    'Name': 'Texture 4',
                    'PIL': texture4,
                    'Rarity': 0.25
                },
            ]
        },
        {
            'LayerName': 'Accessories',
            'Assets': [
                {
                    'Name': 'Choker',
                    'PIL': accessories1,
                    'Rarity': 1
                },
            ],
            'Textures': []
        },
    ],
}

print(tempDict['CollectionName'])
print(tempDict['Description'])

# creating a base image to paste on
mode = 'RGBA'
size = (4000, 4000)
color = (0, 0, 0, 0)
im = Image.new(mode, size, color)

for var in tempDict['Layers']:
    chosenAsset = 0
    textexturedAsset = 0
    print(var['LayerName'])
    
    if var['Assets'] and var['Textures']:
        chosenAsset = random.choice(var['Assets'])
        chosenTexture = random.choice(var['Textures'])

        texturedAsset = textureMapping(chosenAsset['PIL'], chosenTexture['PIL'])

        im.paste(texturedAsset, (0, 0), texturedAsset)
    else: 
        if var['Assets']:
            chosenAsset = random.choice(var['Assets'])
            im.paste(chosenAsset['PIL'], (0, 0), chosenAsset['PIL'])

# saving
im.save("new.png", "PNG")

