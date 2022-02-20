function readFileAsync(js_file) {
  return new Promise((resolve,reject) => {
    var reader = new FileReader();
    reader.onload = function () {
      resolve(this.result.substr(this.result.indexOf(',') + 1))
    }
    reader.onerror = reject;
    reader.readAsDataURL(js_file);
  })
}

const loadWatermarkAsync = () => {
  return new Promise((resolve) => {
    var watermark_img = new Image()
    watermark_img.src = js_vars.dataset.watermark_url
    watermark_img.onload = function () {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var img = document.querySelector('img');
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      context.globalAlpha = 0.4;
      context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      var watermark_img_base64_string = canvas.toDataURL('image/png');
      resolve(watermark_img_base64_string.substr(watermark_img_base64_string.indexOf(',') + 1))
    }   
  })
}

const get_python_variable = (var_name) => {
  return pyodide_global_varspace.toJs().get(var_name)
}

const run_python = (python_code_string) => { //use safe keyword if you know for sure that pyodide has not been initialized yet!
  init_python() //initialize pyodide if not already done
  pyodide.runPython(python_code_string, pyodide_global_varspace)
}

async function init_python(notify=false) { //safely initializes pyodide - if already initialized, does nothing. Make sure to set notify=true for a loading popup to appear for user during initialization.
  if (typeof pyodide !== 'undefined') return

  if (notify) create_and_render_loading_popup("Generating first preview. Please be patient - Subsequent previews will be much faster!")

  js_watermark = await loadWatermarkAsync()

  if (typeof js_watermark === 'undefined') return

  globalThis.pyodide = await loadPyodide({
    //indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/", //PULLS FROM OFFICIAL CDN - in case something goes wrong serving manually
    indexURL: js_vars.dataset.pyodide_base_url,
  })

  pyodide_global_varspace = pyodide.globals.get("dict")() //this stores global variables for the python code - refernce to this required each time u run python code.

  await pyodide.loadPackage("numpy");
  await pyodide.loadPackage("pillow");

  run_python(
    `
      import sys
      import os
      import json
      import numpy as np
      from PIL import Image, ImageColor
      from io import BytesIO
      import base64
      import random

      def pil_to_bytes(pil_img):
        imageBytes = BytesIO()
        pil_img.save(imageBytes, format='PNG')
        return base64.b64encode(imageBytes.getvalue()).decode('utf-8')

      def file_to_pil(file_string):
        bytes = BytesIO(base64.b64decode(file_string))
        return Image.open(bytes, formats=['PNG'])
      
      def rarityAppend(json_object, json_name, rarity_list, asset_dict):
        for asset in json_object[json_name]:
          rarity = asset["Rarity"]
          asset_dict.update({asset["Name"]: asset["PIL"]})
          for x in range(rarity):
            rarity_list.append(asset["Name"])
    
      def rarityAppend2(json_object, json_name, rarity_list, asset_dict):
        for asset in json_object[json_name]:
          rarity = asset["Rarity"]
          asset_dict.update({asset["Name"]: asset["PIL"]})
          for _ in range(rarity):
            rarity_list.append(asset["Name"])
      
      def textureMapping(asset, texture, texture_color):
        asset_rgba = asset.convert("RGBA")
        texture_rgba = texture.convert("RGBA")
        asset_data = np.array(asset_rgba)
        texture_data = np.array(texture_rgba)
        red, green, blue, alpha = asset_data.T
        asset_white_area = (red == texture_color[0]) & (green == texture_color[1]) & (blue == texture_color[2]) & (alpha != 0)
        texture_white_area = texture_data[...][asset_white_area.T].shape
        texture_white_area_resized = np.resize(texture_data[...][asset_white_area.T], texture_white_area)
        asset_data[...][asset_white_area.T] = texture_white_area_resized
        shirt = Image.fromarray(asset_data)
        return shirt

      def create_and_save_collection_free(tempDict, js_watermark):
        rarityArrayAsset = []
        rarityArrayTexture = []
        texturedAssetArray = []
        texturedAssetDict = {}
        rarityDictAsset = {}
        rarityDictTexture = {}
        metadataArray = []
        metadataDict = {}
    
        texture_map_color = ImageColor.getcolor(tempDict['TextureColor'], "RGB")
        for key, value in tempDict["Layers"].items():
          texturedAsset = 0
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
                texturedAsset = textureMapping(rarityDictAsset[tempAsset], rarityDictTexture[tempTexture], texture_map_color)
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
        
        # getting longest layer
        longest_layer = 0
        for value in texturedAssetDict:
          if len(texturedAssetDict[value]) > longest_layer:
            longest_layer = len(texturedAssetDict[value])
    
        bytes_list = []
        metadata_list = []
    
        watermark = file_to_pil(js_watermark)
        resized_watermark =  watermark.resize((tempDict["Resolution_x"], tempDict["Resolution_y"]))   
    
        # iterating over textured assets dictionary, and combining them
        for i in range(longest_layer):
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
          im.paste(resized_watermark, (0, 0), resized_watermark)
          temp_json.update({"attributes": temp_list})
          metadata_list.append(temp_json)
  
          bytes_list.append(pil_to_bytes(im)) 
    
        return json.dumps(bytes_list), json.dumps(metadata_list)
        
    `);
  
  if (notify) close_loading_popup()
}   

//   IMPORT THIS SCRIPT ON PAGE WHERE U WANT TO USE PYTHON!!!!
//   <script src="https://cdn.jsdelivr.net/pyodide/dev/full/pyodide.js"></script>