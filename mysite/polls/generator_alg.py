from PIL import Image
import numpy as np
import time
import io
import random

# Seed for our random number generator, based on time

# returns a sizeIn length array of random numbers ranging from lowIn - highIn


def generateRandomNumber(lowIn, highIn, sizeIn):
    SEED = time.localtime()
    rng = np.random.default_rng(SEED)
    ranNumberArray = rng.integers(low=lowIn, high=highIn, size=sizeIn)
    # return int(ranNumberArray[0]) - if you wanted to return an integer
    return ranNumberArray

# NOTES
# - the current textures Samoshin sent me are buggy, they only use A (Alpha) values in the RGBA format. He will fix
# - the whole texture mapping process can be put into a function so any asset can have a texture put on it (maybe you can do this :DD)
# - good luck :) Caleb in yr13 would have no idea how this works!!!

# Example dictionary
# tempDict = {
#     'CollectionName': 'Void Chan',
#     'Description': 'Void NFTs for void chans',
#     'Resolution' : 4000,
#     'Layers': [
#         {
#             'LayerName': 'Body',
#             'Assets': [
#                 {
#                     'Name': 'Pink Sky',
#                     'PIL': body1,
#                     'Rarity': 10
#                 },
#             ],
#             'Textures': []
#         },
#         {
#             'LayerName': 'Hair',
#             'Assets': [
#                 {
#                     'Name': 'Anime',
#                     'PIL': hair1,
#                     'Rarity': 5
#                 }, 
#                 {
#                     'Name': 'Long',
#                     'PIL': hair2,
#                     'Rarity': 5
#                 },
#             ],
#             'Textures': [
#                 {
#                     'Name': 'Texture 1',
#                     'PIL': texture1,
#                     'Rarity': 2.5
#                 },
#                 {
#                     'Name': 'Texture 2',
#                     'PIL': texture2,
#                     'Rarity': 0.25
#                 },
#                 {
#                     'Name': 'Texture 3',
#                     'PIL': texture3,
#                     'Rarity': 0.25
#                 },
#                 {
#                     'Name': 'Texture 4',
#                     'PIL': texture4,
#                     'Rarity': 0.25
#                 },
#             ]
#         },
#         {
#             'LayerName': 'Shirt',
#             'Assets': [
#                 {
#                     'Name': 'T-Shirt',
#                     'PIL': shirt1,
#                     'Rarity': 0.5
#                 },
#                 {
#                     'Name': 'Crop Tee',
#                     'PIL': shirt2,
#                     'Rarity': 0.5
#                 },
#             ],
#             'Textures': [
#                 {
#                     'Name': 'Texture 1',
#                     'PIL': texture1,
#                     'Rarity': 0.25
#                 },
#                 {
#                     'Name': 'Texture 2',
#                     'PIL': texture2,
#                     'Rarity': 0.25
#                 },
#                 {
#                     'Name': 'Texture 3',
#                     'PIL': texture3,
#                     'Rarity': 0.25
#                 },
#                 {
#                     'Name': 'Texture 4',
#                     'PIL': texture4,
#                     'Rarity': 0.25
#                 },
#             ]
#         },
#         {
#             'LayerName': 'Accessories',
#             'Assets': [
#                 {
#                     'Name': 'Choker',
#                     'PIL': accessories1,
#                     'Rarity': 1
#                 },
#             ],
#             'Textures': []
#         },
#     ],
# }


    
def createImage(files=[], n_textures=1):
    rnd = generateRandomNumber(1, 5, 6)
    body = Image.open("static/Assets/" + "Body/" +
                        str((rnd[0] % 1) + 1) + ".png")
    if files:
        textures_array = files[:n_textures]
        assets_array = files[n_textures:]
        print(len(textures_array))
        print(len(assets_array))

        for img in assets_array:

            texture_rgba = random.choice(textures_array).convert('RGBA')
            texture_data = np.array(texture_rgba)

            temp_rgba = img.convert('RGBA')
            temp_data = np.array(temp_rgba)

            red, green, blue, alpha = temp_data.T
            temp_white_areas = (red == 255) & (blue == 255) & (green == 255)

            texture_asset_white_area = texture_data[...][temp_white_areas.T].shape

            texture_asset_white_areas_resized = np.resize(
            texture_data[...][temp_white_areas.T], texture_asset_white_area)

            temp_data[...][temp_white_areas.T] = texture_asset_white_areas_resized

            temp = Image.fromarray(temp_data)
            body.paste(temp, (0, 0), temp)
            # body.save("media/user_assets/BOSSMAN.png", "PNG")

        return body
    else:
        print("NO FILES LMAO")