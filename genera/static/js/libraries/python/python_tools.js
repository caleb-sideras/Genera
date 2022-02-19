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

  if (notify) create_and_render_loading_popup("Initializing preview system. Please be patient - subsequent previews will be much faster.")

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
      from io import StringIO, BytesIO
      import base64

      def pil_to_bytes(pil_img):
        imageBytes = BytesIO()
        pil_img.save(imageBytes, format='PNG')
        return base64.b64encode(imageBytes.getvalue()).decode('utf-8')

      def file_to_pil(file_string):
        #print(file_string)
        bytes = BytesIO(base64.b64decode(file_string))
        #print(bytes)
        #print(base64.b64encode(bytes.getvalue()))
        return Image.open(bytes, formats=['PNG'])
      
      def textureMapping(asset, texture, texture_color):
        asset_rgba = asset.convert("RGBA")
        texture_rgba = texture.convert("RGBA")
        asset_data = np.array(asset_rgba)
        texture_data = np.array(texture_rgba)
        red, green, blue, alpha = asset_data.T
        asset_white_area = (red == texture_color[0]) & (green == texture_color[1]) & (blue == texture_color[2]) & (alpha != 0)
        texture_white_area = texture_data[...][asset_white_area.T].shape
        texture_white_area_resized = np.resize(
            texture_data[...][asset_white_area.T], texture_white_area
        )
        asset_data[...][asset_white_area.T] = texture_white_area_resized
        shirt = Image.fromarray(asset_data)
        return shirt
        
    `);

  js_watermark = await loadWatermarkAsync()
  if (notify) close_loading_popup()
}   

//   IMPORT THIS SCRIPT ON PAGE WHERE U WANT TO USE PYTHON!!!!
//   <script src="https://cdn.jsdelivr.net/pyodide/dev/full/pyodide.js"></script>