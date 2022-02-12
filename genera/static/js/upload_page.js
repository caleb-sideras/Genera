button_section_layers = null
button_section_textures = null
button_section_collection = null
uploaded_data = null
active_section = null
active_layer = null
active_element = null
active_carousel = null

function main() {
    uploaded_data = {}
    all_layer_names = []
    layer_update_mode = false
    user_login = (js_vars.dataset.user_login.toLowerCase() === 'true');

    collection_names = JSON.parse(js_vars.dataset.collection_names)
    has_collections_generating = js_vars.dataset.has_collections_generating

    if (js_vars.dataset.user_credits && user_login) {
        user_credits = JSON.parse(js_vars.dataset.user_credits)
    }

    initialize_dynamic_form_validation()
    
    document.getElementById("add_layer_input").addEventListener("keyup", ({key}) =>  {
        if (key === "Enter") 
            add_layer()
    })

    document.getElementById("upload_button_submit").addEventListener("click", () => {
        if (has_collections_generating == "True") {
            if (confirm("You already have a collection being generated. Are you sure you want to start generating another one? Note that our website does support such action, and it is encouraged, but we are just giving you a heads up in case you were not aware :)")) {
                has_collections_generating = false //if user agrees, then dont show this popup again!
            } else {
                create_notification("Generation Cancelled", "You have cancelled the generation of this collection.", duration = 10000, "warning")
                return
            }
        }
        yes_no_popup('Generate Collection?', 'Yes', 'No').then((response) =>{
            if (response) {
                validate_and_post_ajax_form();
            }

        })
    })

    init_layer_color = document.getElementsByClassName("upload_section_swap")
    switch_tabs("layers", init_layer_color[0].children[0])

    document.getElementById("collection_size").addEventListener("change", function(e) {
        update_sliders()
    })
    button_section_layers = document.getElementsByClassName("upload_layers_buttons")[0]
    button_section_textures = document.getElementsByClassName("upload_layers_buttons")[1]
    button_section_collection = document.getElementsByClassName("upload_main")[0]
    upload_preview = document.getElementsByClassName('upload_preview')[0]
}

function add_uploaded_layers(layer_name) {
    uploaded_data[layer_name] = {
        "Assets":{},
        "Textures" :{}
    }
    console.log(uploaded_data)
}

async function add_uploaded_files(filelist, context, section){
    var duplicate_flag = false
    var new_items = {}
    var layer_name = context.previousElementSibling.innerHTML
    var dict_layer_obj = uploaded_data[layer_name][section]
    for (const file of filelist) {
        if (!(file.name in dict_layer_obj)){
            await image_URLs(file).then(function (response) {
                if (response) {
                    compressed_url = response
                    uploaded_data[layer_name][section][file.name] = { "file": file, "compressed_url": compressed_url }
                    new_items[file.name] = { "file": file, "compressed_url": compressed_url }
                }
            })
        }
        else{
            duplicate_flag = true
        }
    }
    console.log(uploaded_data)
    if (duplicate_flag==true) {
        create_notification("File Name Duplicate", "One or more duplicate file names were detected. These files were not uploaded. Please upload files with unique file names.", duration = 10000, "error")
    }
    // checking if preview is active
    if (upload_preview.children[0].innerHTML == 'Preview') {
        new_items = uploaded_data[layer_name][section]
    }
    return [section,layer_name, new_items]
}

function add_smart_input(self, category) {
    //1 == asset, 2 == texture

    function expand_button(self) {
        // console.log(self)
        parent = self.parentElement.firstChild.innerHTML
        if (parseInt(parent) != 0) {
            children = (self.parentNode).nextElementSibling
            if (children.classList.contains('open')) {
                children.style.padding = '15px 20px';
                children.style.marginRight = '-20px'
                children.style.marginLeft = '-20px'

            }else{
                children.classList.add("open");
                children.style.height = null;
                children.style.padding = '15px 20px';
                self.style.transform = 'rotate(0deg)';
            }
        }
    }
    function close_empty(self){
        console.log(self)
        parent = self.parentElement.firstChild.innerHTML
        console.log(parseInt(parent))
        if (parseInt(parent) == 0) {
            children = (self.parentNode).nextElementSibling
            if (children.classList.contains('open')) {
                clientHeight = children.clientHeight;
                children.classList.remove("open");
                children.style.height = '0px';
                children.style.padding = '0px 20px';
                self.style.transform = 'rotate(180deg)';

            } 
        }
    }
    var component_wrapper = self.parentNode.children[self.parentNode.children.length - 1]

    var build_upload_section = function(filename, upload_button) {
        var full_file_name = ""
        
        function show_file(self, context) {
            if (category == 1) {
                var section_name = 'Assets'
            } else if (category == 2) {
                var section_name = 'Textures'
            }
            var layer_name = self.previousElementSibling.innerHTML
            var file_name = context.innerHTML
            var title = section_name + " - " + layer_name
            if (title == upload_preview.children[0].innerHTML) {
                const BLOB_URL = URL.createObjectURL(uploaded_data[layer_name][section_name][file_name]['file'])
                upload_preview.children[0].innerHTML = title
                upload_preview.children[1].src = BLOB_URL
                upload_preview.children[3].innerHTML = file_name  
            }
            else{
                open_images(section_name, layer_name, uploaded_data[layer_name][section_name], uploaded_data[layer_name][section_name][file_name])
            }
        }
        
        var remove_file = function(full_file_name){
            var attachments = upload_button.files; // <-- reference your file input here
            var fileBuffer = new DataTransfer();
        
            // append the file list to an array iteratively
            for (let i = 0; i < attachments.length; i++) {
                // Exclude specified filename
                if (attachments[i].name != filename) {
                    fileBuffer.items.add(attachments[i]);
                    // console.log("ADDED FILE: " + attachments[i].name)
                }
                else {
                    //remove the file name from the input fields file names
                    if (upload_button.name.includes("$" + full_file_name)) {
                        upload_button.name = upload_button.name.replace("$" + full_file_name, '')
                    }
                    else {
                        upload_button.name = upload_button.name.replace(full_file_name, '')
                    }
                    if (upload_button.name[0] == "$") //cleanse first  $ meme
                        upload_button.name = upload_button.name.substring(1)

                    // console.log(full_file_name)
                    // console.log("REMOVED FILE: " + attachments[i].name)
                    // console.log(upload_button.name)
                }
            }
            // Assign buffer to file input
            upload_button.files = fileBuffer.files; // <-- according to your file input reference
        }

        var generate_full_filename = function(category) {
            if (category == 1) 
                return "asset." + this.previousElementSibling.innerHTML.toLowerCase() + "." + filename
            else if (category == 2)
                return "texture." + this.previousElementSibling.innerHTML.toLowerCase() + "." + filename
        }.bind(self)

        var dict_rarity_add = function (value) {
            if (category == 1) {
                var section_name = 'Assets'
            } else if (category == 2) {
                var section_name = 'Textures'
            }
            uploaded_data[this.previousElementSibling.innerHTML][section_name][filename]['Rarity'] = value
        }.bind(self)

        
        full_file_name = generate_full_filename(category)

        if (upload_button.name == "") {
            upload_button.name = full_file_name
        }
        else {
            if (category == 1) 
                upload_button.name += "$asset." + self.previousElementSibling.innerHTML.toLowerCase() + "." + filename
            else if (category == 2)
                upload_button.name += "$texture." + self.previousElementSibling.innerHTML.toLowerCase() + "." + filename
        }

        var upload_section = document.createElement('div')
        upload_section.style.display = "flex";

        slider_section = document.createElement('div')
        slider_section.classList = "upload_slider_section"

        slider_1 = document.createElement('input')
        slider_1.value = 0
        slider_1.type = 'range'
        slider_1.min = 0
        slider_1.title = slider_1.value
        slider_1.step = 1

        slider_value = document.createElement('p')
        slider_value.classList = "no_margin"
        if (document.getElementById("collection_size").value == "") {
            slider_1.disabled = true
            slider_value.innerHTML = "no collection size"
        }
        else {
            slider_value.innerHTML = slider_1.value
            slider_1.max = Number(document.getElementById("collection_size").value)
        }

        slider_1.addEventListener('input', function() {
            this.slider_value.innerHTML = this.slider_1.value
        }.bind({slider_1: slider_1, slider_value: slider_value}))

        slider_1.addEventListener('change', function() {
            this.slider_1.title = this.slider_1.value
            this.slider_value.innerHTML = this.slider_1.value

            dict_rarity_add(this.slider_1.value)
            update_sliders()
        }.bind({slider_1: slider_1, slider_value: slider_value, category: category}))

        slider_section.appendChild(slider_value)
        slider_section.appendChild(slider_1)
        // think later or on click
        slider_section.addEventListener('mousedown', function () {
            show_file(self, this.previousElementSibling)
            highlight_file(this.previousElementSibling)
            find_carousel(this.previousElementSibling.innerHTML)
        })

        // var deletetext = Object.assign(document.createElement('h5'), { textContent: 'Remove', classList: 'no_margin'})
        var deletetext = document.createElement('img')
        deletetext.src = "static/icons/remove.svg"
        deletetext.classList = "close_button_color"
        deletetext.addEventListener('click', function () {
            let scoped_filename = generate_full_filename(this.category)
            remove_image(self, this, scoped_filename)
            this.upload.remove()
            remove_file(scoped_filename)

            create_notification("File removed", "You have succesfully removed '" + scoped_filename.split(".").slice(2,4).join(".") + "' from the component." , duration = 3500, "success") //20 years duration for sins
            update_sliders()
            close_empty(self.nextElementSibling.lastElementChild)
        }.bind({upload: upload_section, category: category}) )

        image_name = document.createElement('h4')
        image_name.textContent = filename
        image_name.classList = 'no_margin'
        image_name.addEventListener('click', function () {
            show_file(self, this)
            highlight_file(this)
            find_carousel(this.innerHTML)
        })

        upload_section.appendChild(image_name)
        upload_section.appendChild(slider_section)
        upload_section.appendChild(deletetext)
        return [upload_section, upload_button];
    }

    if (self.innerHTML == undefined) { return }

    var uploadbtn = document.createElement('input')
    uploadbtn.setAttribute('type', 'file')
    uploadbtn.setAttribute('multiple','')
    uploadbtn.setAttribute('accept', 'image/png')
    uploadbtn.name = ""
    uploadbtn.style.marginBottom = "5px"
    uploadbtn.style.display = "none"
    uploadbtn.click()
    
    uploadbtn.addEventListener('change', async function() {
        var n_files = uploadbtn.files.length
        if (n_files > 35) {
            create_notification("SINGLE UPLOAD LIMIT", "You are trying to upload more than 35 files at once. Please do not upload more in one go - YOU MAY however continue uploading more, by pressing the plus button again. Just do not exceed 35 at a time :)", duration = 10000, "error") //20 years duration for sins
            return
        }
        var fileList = []
        var non_png_file_count = 0

        for (var i = 0; i < uploadbtn.files.length; i++) { //verify file types here also
            //check the that file is PNG
            if (uploadbtn.files[i].type == "image/png") { //add file ONLY if it is PNG..
                fileList.push(uploadbtn.files[i])
            } else {
                non_png_file_count += 1
            }
        }

        if (non_png_file_count == uploadbtn.files.length) {
            create_notification("No files added", "None of the uploaded files were of PNG format. We only process PNG files for the generation. Thank you for understadning.", duration = 10000, "error") //20 years duration for sins
            return
        }

        var upload_section = ((self.parentNode).parentNode).previousElementSibling
        
        if (category == 1) {
            var section_name = 'Assets'
        } else if (category == 2) {
            var section_name = 'Textures'
        }

        [section, layer_name, fileList] = await add_uploaded_files(fileList, self, section_name)
        for (const [key, value] of Object.entries(fileList)) {
            var return_compoments = build_upload_section(key, uploadbtn)
            uploadbtn = return_compoments[1]
            component_wrapper.appendChild(return_compoments[0])
            update_sliders()
        }
        open_images(section, layer_name, fileList)
        if (Object.keys(fileList).length > 0) {
            if (non_png_file_count != 0)
                create_notification("Upload partial success", `You have succesfully uploaded ${Object.keys(fileList).length} file(s) into the selected component! Note that ${non_png_file_count} file(s) were not added to the layer, as they are not .PNG files. Currently we only support PNG file format for generation. Thank you for understanding.`, duration = 10000, "warning") //20 years duration for sins
            else 
                create_notification("Upload success", "You have succesfully uploaded " + Object.keys(fileList).length + " file(s) into the selected component", duration = 5000, "success")
        }      
        expand_button(self.nextElementSibling.lastElementChild)
        uploadbtn.remove()
        // highlight_file((((self.nextElementSibling).nextElementSibling).children[0]).children[0])
        
    })
    // using dict using post, dont need this element post upload
    component_wrapper.appendChild(uploadbtn)
}

function update_sliders() {
    var get_layer_total = function(sliders) {
        var total = 0
        for (var i = 0; i < sliders.length; i++) {
            total += Number(sliders[i].children[1].value)
        }
        return total
    }
    var collection_size = 0
    if (document.getElementById("collection_size") != "") {
        collection_size = document.getElementById("collection_size").value
    }
    for (var k = 0; k < document.getElementsByClassName("upload_layers_buttons").length; k++) {
        var button_section_layers = document.getElementsByClassName("upload_layers_buttons")[k]
        for (var i = 0; i < button_section_layers.children.length; i++) { //all layers within component 
            //button_section_layers.children[i] is specific layer access

            var local_sliders = button_section_layers.children[i].querySelectorAll(":scope .upload_slider_section")
            button_section_layers.children[i].querySelector(":scope .expand_button_container h5").innerHTML = local_sliders.length

            var cum_sum = get_layer_total(local_sliders)
            var remaining_space = collection_size
            
            for (var j = 0; j < local_sliders.length; j++) {
                var slider = local_sliders[j].children[1]
                var slider_count = local_sliders[j].children[0]

                if (collection_size > 0) { //If collection size isnt 0
                    if(cum_sum > collection_size) { //Edge case where collection size is less than the sum of all current slider layers
                        if (remaining_space == 0) { //IF NO MORE SPACE - automatically set value to 0 and max to zero
                            slider.value = 0
                            slider.max = 0
                        } else { //If there is space - deal with 2 cases.
                            if (Number(slider.value) >= remaining_space) { //case of last element having more value than existing space - cut it down
                                slider.value = remaining_space
                                slider.max = remaining_space
                                remaining_space = 0
                            } else { //all other elements should have their max equal to their value.
                                remaining_space -= Number(slider.value)
                                slider.max = slider.value
                            }
                        }
                    } else { //Normal case where collection size is greater than the sum of all current slider layers
                        if (slider.value > 0) //if not empty
                            slider.max = Number(slider.value) + (collection_size - cum_sum)
                        else //if empty
                            slider.max = (collection_size - cum_sum)
                    }

                    slider_count.innerHTML =  slider.value
                    slider.disabled = false
                }
                else { //if collection size is 0 - disable all sliders
                    slider.disabled = true
                    slider_count.innerHTML =  "empty collection"
                }
            }
        }
    }
}

function add_layer() {
    layer_name_update_field = document.getElementById("layer_name_update_field")
    add_layer_input = document.getElementById("add_layer_input")

    if (add_layer_input.value == "") {
        create_notification("Layer", "No layer name provided!", duration = 8000, "error") //20 years duration for sins
    }
    else if (all_layer_names.includes(add_layer_input.value)) {
        create_notification("Layer", "A Layer named '" + add_layer_input.value + "' already exists!", duration = 5000, "error") //20 years duration for sins
    }
    else {
        layers_row = document.createElement('div')
        layers_row.classList = "general_button white_background dropdown_button"  
        textures_row = layers_row.cloneNode(true)

        expand_collapse_parent = document.createElement('div')
        expand_collapse_parent.id = "wrapper"
        expand_collapse_parent.classList = "open"

        expand_collapse_parent_2 = expand_collapse_parent.cloneNode(true)

        add_layer_img = document.createElement('img')
        add_layer_img.src = "static/icons/plus.svg"
        add_layer_img.classList = "color_image_orange"

        add_layer_img.addEventListener('click', function () { add_smart_input(this, 1)})


        expand_button_container = document.createElement('div')
        expand_button_container.classList = "expand_button_container"

        expand_button_container_2 = document.createElement('div')
        expand_button_container_2.classList = "expand_button_container"

        expand_button = document.createElement('img');
        expand_button.src = 'static/icons/expand.svg'
        expand_button.classList = 'expand_collapse'

        expand_button_container.appendChild(Object.assign(document.createElement('h5'), { textContent: "0", classList: 'no_margin' }))
        expand_button_container_2.appendChild(Object.assign(document.createElement('h5'), { textContent: "0", classList: 'no_margin' }))

        expand_button_2 = expand_button.cloneNode(true)

        expand_button.addEventListener('click', function () { expand_collapse_button(this) })
        expand_button_2.addEventListener('click', function () { expand_collapse_button(this) })

        expand_button_container.appendChild(expand_button)
        expand_button_container_2.appendChild(expand_button_2)
   
        // add_layer_img.dataset.layer = add_layer_input.value

        add_layer_img_2 = add_layer_img.cloneNode(true)
        add_layer_img_2.addEventListener('click', function () { add_smart_input(this, 2)})

        close_button_img = document.createElement('img')
        close_button_img.src = "static/icons/close.svg"
        close_button_img.classList = "close_button color_image_orange"
        close_button_img.addEventListener('click', function () {
            remove_layer(((this.parentNode).parentNode).previousElementSibling.innerHTML, this.previousElementSibling.innerHTML)
        }.bind(add_layer_img))
        
        useless_div = document.createElement('div') // don't remove the earth will shatter

        layers_row.appendChild(close_button_img)
        textures_row.appendChild(useless_div)

        layer_name = document.createElement('h5')
        layer_name.textContent = add_layer_input.value
        layer_name.classList = 'no_margin'
        layer_name.style = "cursor: pointer;"
        texture_name = layer_name.cloneNode(true)
        add_uploaded_layers(add_layer_input.value)

        let handle_layer_properties_update = function() {
            document.getElementsByClassName("update_layer_parameters_menu")[0].style.display = "block"
            clicked_layer_name = this.layers_row.querySelector(":scope > h5")
            linked_texture_name = this.textures_row.querySelector(":scope > h5")
            layer_name_update_field.value = clicked_layer_name.innerHTML
            
            document.getElementById("confirm_layer_properties_update").onclick = function() {

                console.log(uploaded_data)
                if (clicked_layer_name.innerHTML != layer_name_update_field.value) {

                    let layers = uploaded_data[clicked_layer_name.innerHTML]
                    console.log(uploaded_data[clicked_layer_name.innerHTML])
                    uploaded_data[layer_name_update_field.value] = layers
                    delete uploaded_data[clicked_layer_name.innerHTML]
                    temp = [uploaded_data]
                    create_notification("Layer Update", "Layer name changed succesfully!", duration = 5000, "success")

                    linked_texture_name.innerHTML = layer_name_update_field.value
                    clicked_layer_name.innerHTML = layer_name_update_field.value
                }
                else
                    create_notification("Layer Update", "You've attempted to rename into the same thing!", duration = 5000, "warning") //20 years duration for sins
            }
            //layers_row   
        }.bind({layers_row: layers_row, textures_row: textures_row})
    
        //update dict when layername change.... jesus!
        layer_name.addEventListener('click', function () { open_images('Assets', this.previousElementSibling.innerHTML, uploaded_data[this.previousElementSibling.innerHTML]['Assets'], null, true); handle_layer_properties_update(); highlight_file((((this.nextElementSibling).nextElementSibling).children[0]).children[0])}.bind(add_layer_img))
        texture_name.addEventListener('click', function () { open_images('Textures', this.previousElementSibling.innerHTML, uploaded_data[this.previousElementSibling.innerHTML]['Textures'], null, true); highlight_file((((this.nextElementSibling).nextElementSibling).children[0]).children[0])}.bind(add_layer_img_2))

        layers_row.appendChild(layer_name)
        layers_row.appendChild(add_layer_img)
        layers_row.appendChild(expand_button_container)
        layers_row.appendChild(expand_collapse_parent)

        textures_row.appendChild(texture_name)
        textures_row.appendChild(add_layer_img_2)
        textures_row.appendChild(expand_button_container_2)
        textures_row.appendChild(expand_collapse_parent_2)

        layers_row.querySelector('.close_button').addEventListener('click', function () {
            let layer_name = this.layer.querySelector(":scope > h5")
            this.layer.remove()
            this.texture.remove()

            all_layer_names.splice(all_layer_names.indexOf(layer_name.innerHTML), 1)
            create_notification("Layer update", layer_name.innerHTML + " has been deleted!", duration = 5000, "success")
        }.bind({ layer: layers_row, texture: textures_row }))
        button_section_layers.appendChild(layers_row)
        button_section_textures.appendChild(textures_row)
        all_layer_names.push(add_layer_input.value)
        add_layer_input.value = ""
    }
}

function replace_image(imge_url = null, image_name, image_layer = null) {
    upload_preview.children[2].style.display = 'none'
    upload_preview.children[3].innerHTML = image_name
    if (image_layer) {
        upload_preview.children[0].innerHTML = image_layer
    }
    upload_preview.children[1].src = imge_url
    upload_preview.children[1].style.display = 'block'

}

function remove_image_preview(){
    upload_preview.children[2].style.display = 'none'
    upload_preview.children[3].innerHTML = ''
    upload_preview.children[0].innerHTML = ''
    upload_preview.children[1].removeAttribute('src')
    upload_preview.children[1].style.display = 'block'
}

function replace_metadata(imge_url, image_name, image_layer) {
    upload_preview.children[2].style.display = 'block'
    upload_preview.children[2].innerHTML = imge_url
    upload_preview.children[3].innerHTML = image_name
    upload_preview.children[0].innerHTML = image_layer
    upload_preview.children[1].style.display = 'none'

}

async function image_URLs(file) {
    function calculateSize(img) {
        var width = img.width;
        var height = img.height;
        MAX_WIDTH = 100
        height = Math.round((height * MAX_WIDTH) / width);
        return [MAX_WIDTH, height]
    }

    const blobURL = URL.createObjectURL(file);
    
    const img = new Image();
    img.src = blobURL;
    img.onerror = function () {
        URL.revokeObjectURL(this.src);
        // Handle the failure properly
        console.log("Cannot load image");
    };
    return new Promise((resolve) => {
        img.onload = function () {
            URL.revokeObjectURL(this.src);
            const [newWidth, newHeight] = calculateSize(img)

            const canvas = document.createElement("canvas")
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight)

            url = canvas.toDataURL("image/png", 0.2)
            resolve(url)
        }
        // handle error
    })
}

async function image_resize(file, res_x, res_y) { 
    const blobURL = URL.createObjectURL(file);

    const img = new Image();
    img.src = blobURL;
    img.onerror = function () {
        URL.revokeObjectURL(this.src);
        // Handle the failure properly
        console.log("Cannot load image");
    };
    return new Promise((resolve) => {
        img.onload = function () {
            URL.revokeObjectURL(this.src);
            if (this.width!=res_x || this.height!=res_y) {
                const canvas = document.createElement("canvas")
                canvas.width = res_x;
                canvas.height = res_y;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, res_x, res_y)

                canvas.toBlob(function (blob) {

                    var resized_file = new File([blob], file.name, {
                        type: "image/png",
                        lastModified: Date.now()
                    });
                    console.log("resized")
                    resolve(resized_file)
                })//,'image/png', 1
            }else{
                console.log("not-resized")
                resolve(file)
            }
            
            
        }
        // handle error
    })
}

function preview_image_size(res_x, res_y){
    if (res_y > 500 || res_x > 500){
        if (res_x > res_y){
            res_y = parseInt((res_y * 500) / res_x)
            res_x = 500
        }
        else {
            res_x = parseInt((res_x * 500) / res_y)
            res_y = 500
        }
    }
    return [res_x, res_y]
}

function open_images(section, layer, new_items, optional_image = null, double_click = false){
    if (Object.keys(new_items).length != 0) {
        var section_layer = section + " - " + layer
        var first_file = ""

        //TODO works but smelly -- it isn't kinge!
        if (!double_click && !optional_image || upload_preview.children[0].innerHTML != section_layer) {
            
            let condition_check = false
            if (optional_image) {
                first_file = optional_image
            }
            else{
                // console.log(section)
                // console.log(layer)
                // console.log(uploaded_data[layer][section])
                // console.log(Object.keys(uploaded_data[layer][section]))
                let [key] = Object.keys(uploaded_data[layer][section])
                first_file = uploaded_data[layer][section][key]
            }


            if (upload_preview.children[0].innerHTML != section_layer) {
                condition_check = true
                console.log(condition_check)
                upload_preview.children[4].innerHTML = ""
                replace_image(URL.createObjectURL(first_file['file']), first_file['file'].name, section_layer);
                new_items = uploaded_data[layer][section]
            }


            for (const [key, value] of Object.entries(new_items)) {
                var list_element = document.createElement('li')
                var list_element_img = document.createElement('img')
                var list_element_text = document.createElement('h5')

                list_element_img.src = value['compressed_url']
                list_element_text.innerHTML = key
                    
                list_element.addEventListener('click', async function () { replace_image(URL.createObjectURL(value['file']), key, section_layer); highlight_carousel(this); find_file(this.children[1].innerHTML, section) })

                list_element.appendChild(list_element_img)
                list_element.appendChild(list_element_text)
                document.getElementById("scroller").appendChild(list_element)
            }

            if (condition_check) {
                console.log(first_file['file'].name)
                find_carousel(first_file['file'].name, true, section,)
                condition_check = false
            }
           
        }

    }
}

function highlight_file(context){
    if (active_element == null) {
        active_element = context
    }
    active_element.style = "color: var(--image-text-color);"
    active_element.nextElementSibling.children[1].style.background = "var(--white-color)"

    context.style = "color: var(--main-color);"
    context.nextElementSibling.children[1].style.background = "var(--main-color)"
    active_element = context
}

function find_file(name, section) {
    console.log(name)
    console.log(section)
    if (section=='Assets') {
        var upload_section = document.getElementsByClassName("upload_layers")[0]
    }else {
        var upload_section = document.getElementsByClassName("upload_layers")[1]
    }
    const file_elements = upload_section.querySelectorAll("#wrapper > div")
    for (const element of file_elements) {
        if (element.children[0].innerHTML==name) {
            highlight_file(element.children[0])
            break
        }
    }
    
}

function highlight_carousel(context){
    active_carousel.children[1].style = "color: var(--text-color-2);"
    context.children[1].style = "color: var(--main-color);"
    active_carousel = context
}

function find_carousel(name, active = null, file = null){
    const carousel = document.querySelectorAll("#scroller > li")
    for (const element of carousel) {
        if (element.children[1].innerHTML == name) {
            console.log(element.children[1].innerHTML)
            if(active){
                active_carousel = element
            }
            highlight_carousel(element)
            if (file) {
                find_file(element.children[1].innerHTML, file)
            }  
            break
        }
    }
}

function update_active_elements(context){
    if (active_element == null) {
        active_element = context
    }
    active_element = context
    active_layer = (((context.parentElement).parentElement).parentElement.children[1])
}

function remove_image(self, context, name){
    const navObj = (obj, currentKey, direction) => {
        return Object.values(obj)[Object.keys(obj).indexOf(currentKey) + direction];
    };
    var section = (((context.upload.parentNode).parentNode).parentNode).parentNode.children[0].innerHTML
    var layer = (context.upload.parentNode).parentNode.children[1].innerHTML
    var image = context.upload.children[0].innerHTML
    var active_image = upload_preview.children[3].innerHTML

    if (active_image == image) {
        var replace_element = navObj(uploaded_data[layer][section], image, 1)
        if (!replace_element) {
            replace_element = navObj(uploaded_data[layer][section], image, -1)
            if (!replace_element) {
                remove_image_preview()
            }
            else{
                replace_image(URL.createObjectURL(replace_element['file']), replace_element['file'].name)
                // console.log(context.upload.previousElementSibling.children[0])
                highlight_file(context.upload.previousElementSibling.children[0])
                find_carousel(context.upload.previousElementSibling.children[0].innerHTML)
            }
        }
        else{
            replace_image(URL.createObjectURL(replace_element['file']), replace_element['file'].name)
            // console.log(context.upload.nextElementSibling.children[0])
            highlight_file(context.upload.nextElementSibling.children[0])
            find_carousel(context.upload.nextElementSibling.children[0].innerHTML)
        }  
    }
    remove_image_carousel(image)
    delete uploaded_data[layer][section][image]

}

function remove_image_carousel(name){
    console.log(name)
    scroller = upload_preview.children[4]
    name_elements = scroller.querySelectorAll("h5")
    name_elements.forEach(element => {
        if (element.innerHTML == name) {
            element.parentNode.remove()
        }
    });
}

function remove_layer(section, layer){
    var section_layer = section + " - " + layer
    if (section_layer == upload_preview.children[0].innerHTML) {
        remove_image_preview()
        upload_preview.children[4].innerHTML = ""
    }
    delete uploaded_data[layer]
}

function switch_tabs(target_tab, self) {
    var upload_layers = document.getElementsByClassName("upload_layers")[0]
    var upload_textures = document.getElementsByClassName("upload_layers")[1]

    if (target_tab == "layers") {
        upload_layers.style.display = "block"
        upload_textures.style.display = "none"
        self.style.background = "#2C2F36" // change color later to match css custom properties
        self.nextElementSibling.style.background = null
        active_section = "Assets"
    }
    if (target_tab == "textures") {
        upload_textures.style.display = "block"
        upload_layers.style.display = "none"
        self.style.background = "#2C2F36"
        self.previousElementSibling.style.background = null
        active_section = "Textures"
    }
}

function delete_button() {
    button_section_layers.remove()
    button_section_textures.remove()
    create_notification("Layer Update", "Layer removed succesfully", duration = 5000, "success") //20 years duration for sins9
}

function add_collection() {
    add_layer_input = document.getElementById("add_layer_input")

    for (let step = 1; step < 7; step++) {
        layers_row = document.createElement('div')
        layers_row.classList = "nft_main rounded_container_no_padding"

        layers_row2 = document.createElement('div')
        layers_row2.classList = "nft_bottom bottom_round_container"

        add_layer_img = document.createElement('img')
        add_layer_img.src = "media/collections/Void/Void" + step + ".png"
        add_layer_img.classList = "nft_preview"
        console.log(add_layer_img.src)
        add_layer_img.dataset.layer = add_layer_input.value

        layers_row2.appendChild(Object.assign(document.createElement('h4'), { textContent: "#" + step, classList: "nft_text center" }))
        layers_row2.appendChild(Object.assign(document.createElement('div'), { textContent: "View Metadata", classList: "view_metadata sub_color_background rounded_container_no_padding" }))

        layers_row.appendChild(add_layer_img)
        layers_row.appendChild(layers_row2)
        button_section_collection.appendChild(layers_row)
    }

    add_layer_input.value = ""
}

function expand_collapse_button(self) {
    // console.log(self)
    parent = self.parentElement.firstChild.innerHTML
    if (parseInt(parent) != 0) {
        children = (self.parentNode).nextElementSibling

        children.style.marginRight = '-20px'
        children.style.marginLeft = '-20px'
        if (children.classList.contains('open')) {

            clientHeight = children.clientHeight;
            children.classList.remove("open");
            children.style.height = '0px';
            children.style.padding = '0px 20px';
            self.style.transform = 'rotate(180deg)';

        } else {
            children.classList.add("open");
            children.style.height = null;
            children.style.padding = '15px 20px';
            self.style.transform = 'rotate(0deg)';

        }
    }
    
}

async function confirmation_button(){
    await yes_no_popup("Generate Collection?", "Yes", "No")
        .then(function (reponse) {
            if (reponse) {
                close_pop_up()
                (document.body).children[0].remove()
                create_and_render_loading_popup('Generating Collection')
            }
            else {
                (document.body).children[0].remove()
                throw ("no deployment")
            }
        })
    
}

async function preview_button(self){
    create_and_render_loading_popup("Generating Preview")
    var upload_layers = document.getElementsByClassName('upload_layers')[0]
    var texture_layers = document.getElementsByClassName('upload_layers')[1]
    var collection_properties_container = document.getElementsByClassName('upload_properties')[0]
    collection_properties = collection_properties_container.children[0].children[1].querySelectorAll(':scope input, :scope textarea, :scope div input')
    properties_list = [] // collection properites (metadata)
    properties_list.push(collection_properties[0].value)
    properties_list.push(collection_properties[1].value)
    properties_list.push(collection_properties[2].value)

    // make modular kings!!!
    if (!collection_properties[0].value) {
        alert("Please enter Collection Name")
        close_loading_popup()
        return
    }
    if (!collection_properties[1].value) {
        alert("Please enter Image Name")
        close_loading_popup()
        return
    }
    if (!collection_properties[2].value) {
        alert("Please enter Description")
        close_loading_popup()
        return
    }
    if (!collection_properties[4].value || !collection_properties[4].value) {
        alert("Please enter your resolution")
        close_loading_popup() 
        return
    } else if (collection_properties[4].value > 4000 || collection_properties[5].value > 4000) {
        alert("Please make sure your resolution is lower than 4000")
        close_loading_popup() 
        return
    }

    [res_x, res_y] = preview_image_size(collection_properties[4].value, collection_properties[5].value)
    properties_list.push(res_x)
    properties_list.push(res_y)
    properties_list.push(collection_properties[6].value)
    
    // console.log(properties_list)

    layername_list = [] // layer names (metadata)
    layer_buttons = upload_layers.children[2].querySelectorAll(".general_button")
    layer_buttons.forEach(element => {
        layername_list.push(element.querySelectorAll("h5")[0].innerHTML)
    });
    
    [layer_list, texture_list] = await preview_layer_search(res_x, res_y, layername_list)
    if (layer_list.length == 0) {
        alert("Upload images to use preview")
        close_loading_popup()
        return
    }

    if (self.disabled == true) {
        close_loading_popup()
        return
    }
    else{
        self.disabled = true
        setTimeout(function () { self.disabled = false; }, 30000);
    }

    var data = new FormData();
    request = new XMLHttpRequest();
    
    data.append('properties', JSON.stringify(properties_list));
    data.append('layernames', JSON.stringify(layername_list));
    
    if (layer_list.length > 0 ) {
        for (var i = 0; i < layer_list.length; i++) {
            if (typeof layer_list[i] != 'undefined') {
                data.append("asset." + [i] + "." + layer_list[i].name, layer_list[i]);
            }
        }
    }
    //iterate over every file in texture list and append to formdata
    if (texture_list.length > 0) {
        for (var i = 0; i < texture_list.length; i++) {
            if (typeof texture_list[i] != 'undefined') {
                data.append("texture." + [i] + "." + texture_list[i].name, texture_list[i]);
            }
        }
    }   
    request.open('POST', ajax_url);
    request.setRequestHeader('X-CSRFToken', get_cookie('csrftoken'));
    
    request.send(data);

    request.onreadystatechange = function () {
        // Process the server response here (Sent from Django view inside JsonResponse)
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) { //ifstatus is 200 - assume PROPER RESPONSE
                //print httpresponse
                json_response = JSON.parse(request.response)
                var img_object = json_response['preview']
                var metadata = JSON.stringify(json_response['metadata'])
                var img_src = `data:image/png;base64,${img_object}`
                upload_preview.children[4].innerHTML = ""
                replace_image(img_src, (json_response['metadata'])['name'], 'Preview')

                function add_scroll_element(element, data, bool, funct, name){
                    var new_element = document.createElement('li')
                    var new_element_img = document.createElement(element)
                    var new_element_text = document.createElement('h5')
                    new_element_text.innerHTML = name
                    if (bool) {
                        new_element_img.src = data
                        new_element.addEventListener('click', function () { funct(data, (json_response['metadata'])['name'], 'Preview') })
                    }
                    else{
                        new_element_img.innerHTML = data
                        new_element.addEventListener('click', function () { funct(data, 'Metadata', 'Preview') })
                    }
                    new_element.style = "cursor: pointer;"
                    new_element.appendChild(new_element_img)
                    new_element.appendChild(new_element_text)
                    document.getElementById("scroller").appendChild(new_element)
                }
                add_scroll_element('img', img_src, true, replace_image, (json_response['metadata'])['name'])
                add_scroll_element('pre', metadata, false, replace_metadata, 'Metadata')
            }
            else { //unhandled error
                alert("Unkown server error")
                return
            }
        }
        close_loading_popup()   
    };
    
}
// get better understanding of async/await/promises and make somehow async
// aka global promise list that is resolved so multiple images can be converting without await?
async function preview_layer_search(res_x, res_y, layer_keys){
    var asset_list = []
    var texture_list = []
    for (const key of layer_keys) {
        var assets = Object.keys(uploaded_data[key]["Assets"]);
        if (assets.length > 0) {
            let asset = uploaded_data[key]["Assets"][assets[Math.floor(Math.random() * assets.length)]]
            var resized_asset = await image_resize(asset['file'], res_x, res_y)
            asset_list.push(resized_asset)

            var textures = Object.keys(uploaded_data[key]["Textures"]);
            if (textures.length > 0) {
                let texture = uploaded_data[key]["Textures"][textures[Math.floor(Math.random() * textures.length)]]
                var resized_texture = await image_resize(texture['file'], res_x, res_y)
                texture_list.push(resized_texture)
            }
            else {
                let undefined = {}
                texture_list.push(undefined)
            }
        }
        else {
            let undefined = {}
            asset_list.push(undefined)
            texture_list.push(undefined)
        }
    }
    console.log(asset_list)
    console.log(texture_list)
    return [asset_list, texture_list]
}

function initialize_dynamic_form_validation() {
    var form = document.getElementById("upload_form")
    var fields = form.querySelectorAll(".upload_properties input:not(input[type='color']), .upload_properties textarea")

    //loop through all fields, checkValidity() and if false, show error img color tick
    for (var i = 0; i < fields.length; i++) {
        fields[i].addEventListener("change", function(event) { //discuss if input or change
            if (event.target.checkValidity()) {
                event.target.classList.add("field_success")
                event.target.classList.remove("field_error")
            } else {
                event.target.classList.remove("field_success")
                event.target.classList.add("field_error")
            }
        })
    }
}

async function validate_and_post_ajax_form() {
    var form = document.getElementById("upload_form")
    var fields = form.querySelectorAll(".upload_properties input:not(input[type='color']), .upload_properties textarea")

    if (uploaded_data.isEmpty()) {
        create_notification("Asset/Texture missing", "You did not add any layers for Assets or Textures. Submission prevented.", duration = 10000, "error")
        return
    }

    //clientside check all fields validity.
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].checkValidity() && !fields[i].classList.contains("field_error")) {
            continue
        } else {
            fields[i].reportValidity()
            return
        }
    }
    // <input required="" name="resolution_y" type="number" min="100" max="4000" placeholder="Y" title="Y Resolution" class="field_success"></input>

    //iterate over uploaded_data and do all checks here prior to sending
    for (const [key, value] of Object.entries(uploaded_data)) {
        var assets = Object.keys(value["Assets"]);
        var textures = Object.keys(value["Textures"]);
        console.log(key)
        console.log(value)
        if (assets.length == 0) {
            create_notification("Missing assets", `'${key}' Layer has no file assets attached! Please add some files or remove this layer.`, duration = 10000, "error")
            return
        }

        //iterate over assets and check if they have a Rarity key
        for (const asset of assets) {
            if (value["Assets"][asset]['Rarity'] == undefined || value["Assets"][asset]['Rarity'] == "0") {
                create_notification("Missing Rarity", `'${value["Assets"][asset]['file']['name']}' asset from the '${key}' Layer, has no Rarity specified!`, duration = 10000, "error")
                return
            }
        }

        //do the same for textures
        for (const texture of textures) {
            if (value["Textures"][texture]['Rarity'] == undefined || value["Textures"][texture]['Rarity'] == "0") {
                create_notification("Missing Rarity", `'${value["Textures"][texture]['file']['name']}' texture from the '${key}' layer has no rarity specified!`, duration = 10000, "error")
                return
            }
        }
        //maybe check for file presence inside the file object? - idk if neccessary since we checking rarities anyways.
    }

    // if passed all checks, post the ajax form.
    console.log("Validation successful");
    create_and_render_loading_popup("Generating collection")
    var form_data = await generate_form_data_for_ajax_post_generate().then(data => data)

    ajax_post_form(form_data)
        .then(response => {
            if (typeof response["url"] != 'undefined') { //PROPER ISSUE WHERE REDIRECT IS NECCESARY            
                window.location.replace(response["url"]) //redirect to the new collection
            }
            else if (typeof response["url_cancel"] != 'undefined') { //IF WE WANT TO CANCEL GENERATION WITHOUT RESET - close loading popup and show error (from server)
                close_loading_popup()
                create_notification("Generation cancelled", response["message"], duration = 1000, "warning")
            }
            else if(response['images']){
                let zip = new JSZip();

                function zipFiles(img_data, json, i){
                    return new Promise((res, rej) => {
                        JSZipUtils.getBinaryContent(img_data, function (err, data) {
                            if (err) {
                                rej(err) // or handle the error
                            }
                            zip.file(i + ".json", json)
                            console.log("resolved" + i)
                            // probs just res true
                            res(zip.file(i + ".png", data, { binary: true }))
                        });
                    })
                }

                let promise_list = []
                for (let i = 0; i < response['images'].length; i++) {
                    console.log("pushing"+i)
                    promise_list.push(
                        zipFiles(
                            `data:image/png;base64,${response['images'][i]}`, 
                            JSON.stringify(response['metadata'][i]),
                            i
                        )
                    )
                }
                
                Promise.all(promise_list).then((value)=>{
                    console.log("THE BIG ZIP")
                    zip.generateAsync({ type: 'blob' }).then(function (content) {
                        saveAs(content, "GeneraCollection.zip");
                        close_loading_popup()
                    });
                })
            }   
        })
}

async function generate_form_data_for_ajax_post_generate() {
    var upload_layers = document.getElementsByClassName('upload_layers')[0]
    var collection_properties_container = document.getElementsByClassName('upload_properties')[0]
    collection_properties = collection_properties_container.children[0].children[1].querySelectorAll(':scope input, :scope textarea, :scope div input')
    layername_list = [] // layer names (metadata)
    layer_buttons = upload_layers.children[2].querySelectorAll(".general_button")
    layer_buttons.forEach(element => {
        layername_list.push(element.querySelectorAll("h5")[0].innerHTML)
    });

    if (user_login) {
        res_x = collection_properties[4].value
        res_y = collection_properties[5].value
    }
    else{
        [res_x, res_y] = preview_image_size(collection_properties[4].value, collection_properties[5].value)
        collection_properties[4].value = res_y
        collection_properties[5].value = res_x
    }

    var upload_form = document.getElementById('upload_form');
    var file_data = new FormData(upload_form);
    file_data.append('image_dict', JSON.stringify(uploaded_data));

    sections = ["Assets", "Textures"]
    for (const key of layername_list) {
        console.log(key)
        for (const section of sections) {
            console.log(section)
            var section_list = Object.keys(uploaded_data[key][section]);
            console.log(section_list)
            for (let i = 0; i < section_list.length; i++) {
                var resized_asset = await image_resize(uploaded_data[key][section][section_list[i]]['file'], res_x, res_y)
                file_data.append(section + "." + key + "." + section_list[i], resized_asset);
                console.log(section + "." + key + "." + section_list[i])
            }
        }
    }
    return file_data
}

function validate_collection(field_object){
    if (field_object.value == "") {
        field_object.classList = "field_error"
        field_object.title = "Field is empty"
        return
    }
    if (user_login) {
        if(collection_names.includes(field_object.value)){
            custom_validation_false(field_object, "A collection with that name already exists!")
        } else {
            custom_validation_true(field_object)
        }
    }
    else {
        custom_validation_true(field_object)
    }
}

function validate_size(field_object) {
    if (field_object.value == "") {
        field_object.classList = "field_error"
        field_object.title = "Field is empty"
        return
    }
    if (user_login) {
        if (field_object.value > user_credits) {
            custom_validation_false(field_object, "You don't have enough credits to generate this collection size!")
        } else {
            custom_validation_true(field_object)
        }
    }
    else{
        if (field_object.value > 100) {
            custom_validation_false(field_object, "Maximum of 100 free generations allowed!")
        } else {
            custom_validation_true(field_object)
        }
    }
}

window.addEventListener("load", main);