async function main2() {
    globalThis.pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/dev/full/",
  
    });
    let namespace = pyodide.globals.get("dict")();
    await pyodide.loadPackage("numpy");
    await pyodide.loadPackage("pillow");
    //initialize python imports
    pyodide.runPython(
      `
        import sys
        import os
        import numpy as np
        import PIL

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
    `,
      namespace
    );
        
    //run python here - it keeps track of previous variables due to namespace
    document.getElementById("add_layer_button").addEventListener("click", function() {
        pyodide.runPython(
            ` 
              xd = np.zeros((100,100,3), dtype=np.uint8)
              print(f"Printing a 100x100 numpy array in js LMAO: {xd}")
              
          `,
            namespace
          );      
    })
  }
  window.console_ready = main2();

//   IMPORT THIS SCRIPT ON PAGE WHERE U WANT TO USE PYTHON!!!!
//   <script src="https://cdn.jsdelivr.net/pyodide/dev/full/pyodide.js"></script>