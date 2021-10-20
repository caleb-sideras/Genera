from PIL import Image
import numpy as np
import asset_index
from random_number import generateRandomNumber

# Notes
# - the current textures Samoshin sent me are buggy, they only use A (Alpha) values in the RGBA format. He will fix
# - good luck :) Caleb in yr13 would have no idea how this works!!!


# TODO
#
# ---ACTIVE---
#
# 1) full website integration
#
#   Method 1 (best?) - could import all asset names into a global 3D array, then input the length of individual 2D arrays into the random number generator to choose an asset
#   pros: no duplicate/excessive imports, no need to use modulus(%), renaming assets not needed
#   cons: none perfect system :)
#
#   Method 2 - ughhhhh idk
#
# ---DONE---
#
#   - the texture mapping process can be put into a function so any asset can have a texture put on it (maybe you can do this: DD)
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


def main():
    # returns a 6 length array of random numbers ranging from 1 - 5
    rnd = generateRandomNumber(1, 5, 6)

    # opening assets based on their random number e.g. /Assets/Body/1.png
    # (randomNumber % 4) + 1 = number has a range from 1–4
    # each random number range should be limited based on how many assets there are
    body = Image.open("./Assets/" + "Body/" + str((rnd[0] % 1) + 1) + ".png")
    shirt = Image.open("./Assets/" + "Shirt/" + str((rnd[1] % 2) + 1) + ".png")
    hair = Image.open("./Assets/" + "Hair/" + str((rnd[2] % 2) + 1) + ".png")
    accessories = Image.open("./Assets/" + "Accessories/" +
                             str((rnd[3] % 1) + 1) + ".png")
    texture = Image.open("./Assets/" + "Texture/" +
                         str((rnd[4] % 4) + 1) + ".png")

    # maps texture onto an asset
    shirt = textureMapping(shirt, texture)
    hair = textureMapping(hair, texture)

    # combining all assets to body
    body.paste(shirt, (0, 0), shirt)
    body.paste(hair, (0, 0), hair)
    body.paste(accessories, (0, 0), accessories)

    # shirt.show()
    # hair.show()
    # body.show()

    # saving
    body.save("new.png", "PNG")


main()
