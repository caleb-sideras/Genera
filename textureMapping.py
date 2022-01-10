from PIL import Image
import numpy as np
import random
import os
import json

def textureMappingAsset(asset):

    # converting to an RGBA format
    asset_rgba = asset.convert("RGBA")

    # # converting into an array of RGBA, height x width x 4 numpy array (4000x4000x4)
    asset_data = np.array(asset_rgba)

    # print(type(asset_data))
    # print(type(texture_data))

    # unpack the color bands of the asset for readability
    red, green, blue, alpha = asset_data.T

    # extracting the area that is white (255,255,255) from asset
    # it creates an array of boolean, True = white point, False = not a white point (leaving alpha values cuz they are just opacity)
    asset_white_area = (red == 255) & (blue == 255) & (green == 255)

    return (asset_white_area, asset_data)


def textureMappingTexture(texture, white_area, asset_value):

    # converting to an RGBA format
    texture_rgba = texture.convert("RGBA")

     # # converting into an array of RGBA, height x width x 4 numpy array (4000x4000x4)
    texture_data = np.array(texture_rgba)

    # using the white area boolean array, points that are True are taken out of the texture array
    # aka forming the exact shape needed, but with the texture
    texture_white_area = texture_data[...][white_area.T].shape

    # resizes the texture to the same shape of the asset, so they can be assigned to each other
    texture_white_area_resized = np.resize(
        texture_data[...][white_area.T], texture_white_area
    )

    # replacing all the white areas in the asset with the texture
    asset_value[...][white_area.T] = texture_white_area_resized

    # converting them back into an image
    shirt = Image.fromarray(asset_value)

    return shirt


sky1 = Image.open("./Assets/" + "Body/" + "1" + ".png")
sky2 = Image.open("./Assets/" + "Hair/" + "1" + ".png")
sky3 = Image.open("./Assets/" + "Hair/" + "2" + ".png")

dots1 = Image.open("./Assets/" + "Texture/" + "1" + ".png")
dots2 = Image.open("./Assets/" + "Texture/" + "2" + ".png")
dots3 = Image.open("./Assets/" + "Texture/" + "3" + ".png")


tempDictMapping = {
    "Assets": [
            {"Name": "Cloudy sky", "PIL": sky1},
            {"Name": "Clear Sky", "PIL": sky2},
            {"Name": "Dark Sky", "PIL": sky3},
        ],
    "Textures": [
            {"Name": "Yellow dots", "PIL": dots1},
            {"Name": "Pink dots", "PIL": dots2},
            {"Name": "Green dots", "PIL": dots3},
        ]
}


metaDict = {}
metaArray = []

for asset in tempDictMapping["Assets"]:
    name = asset["Name"]
    assetWhiteArea, assetValue = textureMappingAsset(asset["PIL"])

    for texture in tempDictMapping["Textures"]:
        texturedAsset = textureMappingTexture(texture["PIL"], assetWhiteArea, assetValue)
        # print(type(texturedAsset))

        metaName = asset["Name"] + " (" + texture["Name"] + ")"
        metaDict.update({"Name": metaName, "PIL": texturedAsset})
        metaArray.append(metaDict.copy())

#  Metadata example -- {"Name": "Cloudy sky (Pink dots)", "PIL": sky1}

print(metaArray)