from PIL import Image
import numpy as np
import time

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


def createImage():

    # returns a 6 length array of random numbers ranging from 1 - 5
    rnd = generateRandomNumber(1, 5, 6)

    # opening assets based on their random number e.g. /Assets/Body/1.png
    # (randomNumber % 4) + 1 = number of range from 1–4. each assets random number range is limited
    body = Image.open("static/Assets/" + "Body/" +
                      str((rnd[0] % 1) + 1) + ".png")
    shirt = Image.open("static/Assets/" + "Shirt/" +
                       str((rnd[1] % 2) + 1) + ".png")
    hair = Image.open("static/Assets/" + "Hair/" +
                      str((rnd[2] % 2) + 1) + ".png")
    accessories = Image.open("static/Assets/" + "Accessories/" +
                             str((rnd[3] % 1) + 1) + ".png")
    texture = Image.open("static/Assets/" + "Texture/" +
                         str((rnd[4] % 4) + 1) + ".png")

    # only applying texture to hair and shirt (for now)
    shirt_rgba = shirt.convert('RGBA')
    hair_rgba = hair.convert('RGBA')
    texture_rgba = texture.convert('RGBA')

    # converting objects into a numpy array, height x width x 4 numpy array (4000x4000x4)
    shirt_data = np.array(shirt_rgba)
    hair_data = np.array(hair_rgba)
    texture_data = np.array(texture_rgba)

    # temporarily unpack the color bands for readability
    red, green, blue, alpha = shirt_data.T
    red2, green2, blue2, alpha2 = hair_data.T

    # extracting the area that is white from assets. creates an array of boolean, True = white point, False = not a white point (leaving alpha values alone for now)
    shirt_white_areas = (red == 255) & (blue == 255) & (green == 255)
    hair_white_areas = (red2 == 255) & (blue2 == 255) & (green2 == 255)

    # using the white area arrays from above, points that are True are taken out of the texture array
    texture_shirt_white_area = texture_data[...][shirt_white_areas.T].shape
    texture_hair_white_area = texture_data[...][hair_white_areas.T].shape

    # resizes the texture to the same shape of the asset, so they can be assigned to each other
    texture_shirt_white_areas_resized = np.resize(
        texture_data[...][shirt_white_areas.T], texture_shirt_white_area)
    texture_hair_white_areas_resized = np.resize(
        texture_data[...][hair_white_areas.T], texture_hair_white_area)

    # replacing all the white areas in the asset with the texture
    shirt_data[...][shirt_white_areas.T] = texture_shirt_white_areas_resized
    hair_data[...][hair_white_areas.T] = texture_hair_white_areas_resized

    # converting them back into an image
    shirt = Image.fromarray(shirt_data)
    hair = Image.fromarray(hair_data)

    # combining all assets to body
    body.paste(shirt, (0, 0), shirt)
    body.paste(hair, (0, 0), hair)
    body.paste(accessories, (0, 0), accessories)

    # shirt.show()
    # hair.show()
    # body.show()

    # if you wanted to save
    body.save("media/user_assets/1.png", "PNG")

    return "success"
