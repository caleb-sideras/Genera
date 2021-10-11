import numpy as np
import time
SEED = time.localtime()  # Seed for our random number generator, based on time

# returns a sizeIn length array of random numbers ranging from lowIn - highIn


def generateRandomNumber(lowIn, highIn, sizeIn):
    rng = np.random.default_rng(SEED)
    ranNumberArray = rng.integers(low=lowIn, high=highIn, size=sizeIn)
    # return int(ranNumberArray[0]) - if you wanted to return an integer
    return ranNumberArray
