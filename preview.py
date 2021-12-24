from PIL import Image
import numpy as np
import os
import json

def textureMapping(asset, texture):

    # converting to an RGBA format
    asset_rgba = asset.convert("RGBA")
    texture_rgba = texture.convert("RGBA")

    # # converting into an array of RGBA, height x width x 4 numpy array (4000x4000x4)
    asset_data = np.array(asset_rgba)
    texture_data = np.array(texture_rgba)

    # print(type(asset_data))
    # print(type(texture_data))

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

body1 = Image.open("./Assets/" + "Body/" + "1" + ".png")
hair1 = Image.open("./Assets/" + "Hair/" + "1" + ".png")
shirt1 = Image.open("./Assets/" + "Shirt/" + "1" + ".png")
accessories1 = Image.open("./Assets/" + "Accessories/" + "1" + ".png")
texture1 = Image.open("./Assets/" + "Texture/" + "1" + ".png")

tempDictPreview = {
    "CollectionName": "Void Chain",
    "Resolution": 4000,
    "Description": "Void NFTs for void chans",
    "Layers": {
        "Body": {
            "Assets": [
                {"Name": "Pink Sky", "PIL": body1},
            ],
            "Textures": [],
        },
        "Hair": {
            "Assets": [
                {"Name": "Anime", "PIL": hair1},
            ],
            "Textures": [
                {"Name": "Texture 1", "PIL": texture1},
            ],
        },
        "Shirt": {
            "Assets": [
                {"Name": "T-Shirt", "PIL": shirt1},
            ],
            "Textures": [
                {"Name": "Texture 1", "PIL": texture1},
            ],
        },
        "Accessories": {
            "Assets": [
                {"Name": "Choker", "PIL": accessories1},
            ],
            "Textures": [],
        },
    },
}

# metadataArray = [] # Example [t-shirt (texture1), t-shirt (texture2), crop-top (texture2), t-shirt, crop-top (texture1)] (RR)
metadataDict = {} # Example {Body: metadataArray, Hair: metadataArray, Clothes: metadataArray} (NR)

texturedAssetArray = [] # Example [texturedAsset1, texturedAsset2, texturedAsset3, texturedAsset4, texturedAsset5] (RR)
texturedAssetDict = {} # Example {Body: texturedAssetArray1, Hair: texturedAssetArray2, Clothes: texturedAssetArray3] (NR)

im = Image.new(
        "RGBA", (tempDictPreview["Resolution"], tempDictPreview["Resolution"]), (0, 0, 0, 0)
    )

for key, value in tempDictPreview["Layers"].items():
    texturedAsset = 0
    # trait_type = key
    print(key)

    for asset in value["Assets"]:
        tempAsset = asset["PIL"]
        # print(tempAsset)

        if value["Textures"]:
            for texture in value["Textures"]:
                tempTexture = texture["PIL"]
                # print(tempTexture)

            texturedAsset = textureMapping(
                tempAsset, tempTexture
            )

            im.paste(texturedAsset, (0, 0), texturedAsset)

            texturedAssetValue = asset["Name"] + " (" + texture["Name"] + ")"
            texturedAssetDict.update({"trait_type": key, "value": texturedAssetValue})
            texturedAssetArray.append(texturedAssetDict.copy())
            
            
        else:
            im.paste(tempAsset, (0, 0), tempAsset)

            texturedAssetDict.update({"trait_type": key, "value": asset["Name"]})
            texturedAssetArray.append(texturedAssetDict.copy())

print(texturedAssetArray)

temp_json = {
        "name": f"{tempDictPreview['CollectionName']} Preview",
        "description": tempDictPreview["Description"],
        "image": "",
        "attributes": texturedAssetArray
    }

im.save("preview.png", "PNG")
with open(f"{tempDictPreview['CollectionName']} Preview.json", "w") as json_file:
    json.dump(temp_json, json_file)