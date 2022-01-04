button_section_layers = null
button_section_textures = null
button_section_collection = null
rarity_map = {}
uploaded_data = {
    "Layers" : {},
    "Textures" : {}
}

function main() {
    all_layer_names = []
    layer_update_mode = false
    rarity_map = {}
    initialize_dynamic_form_validation()
    
    document.getElementById("add_layer_input").addEventListener("keyup", ({key}) =>  {
        if (key === "Enter") 
            add_layer()
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

function initialize_dynamic_form_validation() {
    var form = document.getElementById("upload_form")
    var fields = form.querySelectorAll(".upload_properties input:not(input[type='color']), .upload_properties textarea")

    form.addEventListener("submit", function(event) {
        if (onsubmit_final_form_validationn(event, form, fields)) {
            form.submit()
        }
    })

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

function onsubmit_final_form_validationn(event, form_reference, fields) {
    event.preventDefault()
    all_passed = true

    if (all_layer_names.length == 0) {
        create_notification("No Layers", "You did not add any layers. Submission prevented.", duration = 10000, "error")
        return false
    }

    if (form_reference.querySelectorAll("input[type=file]").isEmpty()) {
        create_notification("Empty Assets", "No files have been attached. Submission prevented.", duration = 10000, "error")
        return false
    }

    if (rarity_map.isEmpty()) {
        create_notification("No Rarity", "You did not add any rarities. Submission prevented.", duration = 10000, "error")
        return false
    }

    for (var i = 0; i < fields.length; i++) {
        if (fields[i].checkValidity() && !fields[i].classList.contains("field_error")) {
            continue
        } else {
            all_passed = false
            fields[i].reportValidity()
        }
    }

    if(!all_passed) {
        return false
    }

    console.log("Validation successful");
    create_and_render_loading_popup("Generating collection")
    return true;
}

function add_uploaded_layers(layer_name) {
    uploaded_data['Layers'][layer_name] = {}
    uploaded_data['Textures'][layer_name] = {}
    console.log(uploaded_data)
}

async function add_uploaded_files(filelist, context, section){
    var new_items = {}
    for (const file of filelist) {
        await image_URLs(file).then(function (response) {
            if (response) {
                compressed_url = response
                uploaded_data[section][context.previousElementSibling.innerHTML][file.name] = { "file": file, "compressed_url": compressed_url }
                new_items[file.name] = { "file": file, "compressed_url": compressed_url}
            }
        })
    }
    // checking if preview is active
    if (upload_preview.children[0].innerHTML == 'Preview') {
        new_items = uploaded_data[section][context.previousElementSibling.innerHTML]
    }
    open_images(section, context.previousElementSibling.innerHTML, new_items)
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
            var section_name = ((self.parentNode).parentNode).previousElementSibling.innerHTML
            var layer_name = self.previousElementSibling.innerHTML
            var file_name = context.innerHTML
            var title = section_name + " - " + layer_name
            if (title == upload_preview.children[0].innerHTML) {
                const BLOB_URL = URL.createObjectURL(uploaded_data[section_name][layer_name][file_name]['file'])
                upload_preview.children[0].innerHTML = title
                upload_preview.children[1].src = BLOB_URL
                upload_preview.children[3].innerHTML = file_name  
            }
            else{
                open_images(section_name, layer_name, uploaded_data[section_name][layer_name], uploaded_data[section_name][layer_name][file_name])
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

            rarity_map[generate_full_filename(this.category)] = this.slider_1.value
            // console.log(rarity_map)

            document.getElementById("rarity_map").value = JSON.stringify(rarity_map)
            update_sliders()
        }.bind({slider_1: slider_1, slider_value: slider_value, category: category}))

        slider_section.appendChild(slider_value)
        slider_section.appendChild(slider_1)
        // think later or on click
        slider_section.addEventListener('mousedown', function () {
            show_file(self, this.previousElementSibling)
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
            // remove_image(self, this, scoped_filename)
            delete rarity_map[scoped_filename] //delete rarity map link
            document.getElementById("rarity_map").value = JSON.stringify(rarity_map)
            create_notification("File removed", "You have succesfully removed '" + scoped_filename.split(".").slice(2,4).join(".") + "' from the component." , duration = 3500, "success") //20 years duration for sins
            update_sliders()
            close_empty(self.nextElementSibling.lastElementChild)
        }.bind({upload: upload_section, category: category}) )

        image_name = document.createElement('h4')
        image_name.textContent = filename
        image_name.classList = 'no_margin'
        image_name.addEventListener('click', function () {
            show_file(self, this)
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
    uploadbtn.setAttribute('accept', 'image/*')
    uploadbtn.name = ""
    uploadbtn.style.marginBottom = "5px"
    uploadbtn.style.display = "none"
    uploadbtn.click()
    
    uploadbtn.addEventListener('change', function() {
        var n_files = uploadbtn.files.length
        if (n_files > 35) {
            create_notification("SINGLE UPLOAD LIMIT", "You are trying to upload more than 35 files at once. Please do not upload more in one go - YOU MAY however continue uploading more, by pressing the plus button again. Just do not exceed 35 at a time :)", duration = 10000, "error") //20 years duration for sins
            return
        }
        var fileList = []
        for (var i = 0; i < uploadbtn.files.length; i++) {
            fileList.push(uploadbtn.files[i])
        }

        var upload_section = ((self.parentNode).parentNode).previousElementSibling
        add_uploaded_files(fileList, self, upload_section.innerHTML)
        
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i]
            var return_compoments = build_upload_section(file.name, uploadbtn)
            uploadbtn = return_compoments[1]
            // console.log(return_compoments[0])
            component_wrapper.appendChild(return_compoments[0])
            update_sliders()
        }
        // console.log(uploadbtn)
        create_notification("Upload success", "You have succesfully uploaded " + n_files + " file(s) into the selected component" , duration = 5000, "success")
        expand_button(self.nextElementSibling.lastElementChild)
    })
    component_wrapper.appendChild(uploadbtn)
    // expand_collapse_button(self.nextElementSibling.lastElementChild)
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
            for (var j = 0; j < local_sliders.length; j++) {
                var slider = local_sliders[j].children[1]
                var slider_count = local_sliders[j].children[0]

                if (collection_size > 0) {
                    if (slider.value > 0) //if not empty
                        slider.max = Number(slider.value) + (collection_size - cum_sum)
                    else //if empty
                        slider.max = (collection_size - cum_sum)
                    slider_count.innerHTML =  slider.value
                    slider.disabled = false
                }
                else {
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
            // console.log(document.getElementById("rarity_map").value)
            document.getElementsByClassName("update_layer_parameters_menu")[0].style.display = "block"
            clicked_layer_name = this.layers_row.querySelector(":scope > h5")
            linked_texture_name = this.textures_row.querySelector(":scope > h5")
            layer_name_update_field.value = clicked_layer_name.innerHTML
            
            let layers_input_fields = this.layers_row.querySelectorAll(":scope input[type='file']")
            let textures_input_fields = this.textures_row.querySelectorAll(":scope input[type='file']")


            document.getElementById("confirm_layer_properties_update").onclick = function() {
                // console.log(this)
                // update_sliders()
                let replace_from = "." + clicked_layer_name.innerHTML.toLowerCase() + "."
                let replace_to = "." + layer_name_update_field.value.toLowerCase() + "."
                if (clicked_layer_name.innerHTML != layer_name_update_field.value) {
                    console.log("replacing")
                    console.log(layers_input_fields.length)
                    for (let i = 0; i < layers_input_fields.length; i++) {
                        // console.log(layers_input_fields[i].name)
                        all_layer_names.splice(all_layer_names.indexOf(clicked_layer_name.innerHTML), 1) //replace layer names in global list
                        all_layer_names.push(layer_name_update_field.value)

                        document.getElementById("rarity_map").value = document.getElementById("rarity_map").value.replaceAll(replace_from, replace_to) //update rarity map directly
                        if (document.getElementById("rarity_map").value.length > 1)
                            rarity_map = JSON.parse(document.getElementById("rarity_map").value)
                        // console.log(rarity_map)
                        layers_input_fields[i].name = layers_input_fields[i].name.replaceAll(replace_from, replace_to) //update input field name
                        // console.log(layers_input_fields[i].name)
                        // console.log(all_layer_names)
                        // console.log(document.getElementById("rarity_map").value)
                        create_notification("Layer Update", "Layer name changed succesfully!", duration = 5000, "success") //20 years duration for sins
                    }

                    for (let i = 0; i < textures_input_fields.length; i++) {
                        textures_input_fields[i].name = textures_input_fields[i].name.replaceAll(replace_from, replace_to)
                    }

                    linked_texture_name.innerHTML = layer_name_update_field.value
                    clicked_layer_name.innerHTML = layer_name_update_field.value
                }
                else
                    create_notification("Layer Update", "You've attempted to rename into the same thing!", duration = 5000, "warning") //20 years duration for sins

                // console.log(layers_input_fields)
            }
            //layers_row   
        }.bind({layers_row: layers_row, textures_row: textures_row})

        //update dict when layername change.... jesus!
        layer_name.addEventListener('click', function () { open_images(((this.parentNode).parentNode).previousElementSibling.innerHTML, this.previousElementSibling.innerHTML, uploaded_data[((this.parentNode).parentNode).previousElementSibling.innerHTML][this.previousElementSibling.innerHTML], null, true); handle_layer_properties_update();}.bind(add_layer_img))
        texture_name.addEventListener('click', function () { open_images(((this.parentNode).parentNode).previousElementSibling.innerHTML, this.previousElementSibling.innerHTML, uploaded_data[((this.parentNode).parentNode).previousElementSibling.innerHTML][this.previousElementSibling.innerHTML],null, true);}.bind(add_layer_img_2))

        
        layers_row.appendChild(layer_name)
        layers_row.appendChild(add_layer_img)
        layers_row.appendChild(expand_button_container)
        layers_row.appendChild(expand_collapse_parent)

        // textures_row.appendChild(Object.assign(document.createElement('h5'), { textContent: add_layer_input.value, classList: 'no_margin' }))
        textures_row.appendChild(texture_name)
        textures_row.appendChild(add_layer_img_2)
        textures_row.appendChild(expand_button_container_2)
        textures_row.appendChild(expand_collapse_parent_2)

        layers_row.querySelector('.close_button').addEventListener('click', function () {
            let layer_name = this.layer.querySelector(":scope > h5")
            this.layer.remove()
            this.texture.remove()

            for (const key in rarity_map) {
                console.log(key)
                if (key.includes("." + layer_name.innerHTML.toLowerCase() + ".")) {
                    console.log("deleting")
                    delete rarity_map[key]
                }
            }
           document.getElementById("rarity_map").value = JSON.stringify(rarity_map)

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
            const [newWidth, newHeight] = calculateSize(img);

            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            url = canvas.toDataURL("image/png", 0.2)
            resolve(url)
        }
        // handle error
    })
}

function open_images(section, layer, new_items, optional_image = null, double_click = false){
    console.log(double_click)
    if (Object.keys(new_items).length != 0) {
        var section_layer = section + " - " + layer
        var first_file = ""

        //TODO works but smelly
        if (!double_click && !optional_image || upload_preview.children[0].innerHTML != section_layer) {
            
            
            if (optional_image) {
                first_file = optional_image
            }
            else{
                let [key] = Object.keys(uploaded_data[section][layer])
                first_file = uploaded_data[section][layer][key]
            }
            

            if (upload_preview.children[0].innerHTML != section_layer)
            {
                upload_preview.children[4].innerHTML = ""
                replace_image(URL.createObjectURL(first_file['file']), first_file['file'].name, section_layer);
            }


            for (const [key, value] of Object.entries(new_items)) {
                var list_element = document.createElement('li')
                var list_element_img = document.createElement('img')
                var list_element_text = document.createElement('h5')

                list_element.style = "cursor: pointer;"
                list_element_img.src = value['compressed_url']
                list_element_text.innerHTML = key
                    
                list_element.addEventListener('click', async function () { replace_image(URL.createObjectURL(value['file']), key, section_layer) })

                list_element.appendChild(list_element_img)
                list_element.appendChild(list_element_text)
                document.getElementById("scroller").appendChild(list_element)
                    
            }
        }

    }
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
        var replace_element = navObj(uploaded_data[section][layer], image, 1)
        if (!replace_element) {
            replace_element = navObj(uploaded_data[section][layer], image, -1)
            if (!replace_element) {
                remove_image_preview()
            }
            else{
                replace_image(URL.createObjectURL(replace_element['file']), replace_element['file'].name)
            }
        }
        else{
            replace_image(URL.createObjectURL(replace_element['file']), replace_element['file'].name)
        }  
    }
    remove_image_carousel(image)
    delete uploaded_data[section][layer][image]

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
    delete uploaded_data['Layers'][layer]
    delete uploaded_data['Textures'][layer]
}

function switch_tabs(target_tab, self) {
    var upload_layers = document.getElementsByClassName("upload_layers")[0]
    var upload_textures = document.getElementsByClassName("upload_layers")[1]

    if (target_tab == "layers") {
        upload_layers.style.display = "block"
        upload_textures.style.display = "none"
        self.style.background = "#2C2F36" // change color later to match css custom properties
        self.nextElementSibling.style.background = null
    }
    if (target_tab == "textures") {
        upload_textures.style.display = "block"
        upload_layers.style.display = "none"
        self.style.background = "#2C2F36"
        self.previousElementSibling.style.background = null
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
        layers_row2.appendChild(Object.assign(document.createElement('div'), { textContent: "View Metadata", classList: "view_metadata orange_background rounded_container_no_padding" }))

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

// needs to work with submit
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

function preview_button(self){
    create_and_render_loading_popup("Generating Preview")
    var upload_layers = document.getElementsByClassName('upload_layers')[0]
    var texture_layers = document.getElementsByClassName('upload_layers')[1]
    var collection_properties_container = document.getElementsByClassName('upload_properties')[0]
    collection_properties = collection_properties_container.children[0].children[1].querySelectorAll(':scope input, :scope textarea, :scope div input')
    properties_list = [] // collection properites (metadata)
    properties_list.push(collection_properties[0].value)
    properties_list.push(collection_properties[1].value)
    properties_list.push(collection_properties[3].value)
    console.log(properties_list)
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
    if (!collection_properties[3].value) {
        alert("Please enter Description")
        close_loading_popup()
        return
    }
    if (!collection_properties[5].value || !collection_properties[6].value) {
        alert("Please enter your resolution")
        close_loading_popup() 
        return
    } else if (collection_properties[5].value > 4000 || collection_properties[6].value > 4000) {
        alert("Please make sure your resolution is lower than 4000")
        close_loading_popup() 
        return
    }
    
    properties_list.push(collection_properties[5].value)
    properties_list.push(collection_properties[6].value)
    properties_list.push(collection_properties[7].value)
    
    // console.log(properties_list)

    layername_list = [] // layer names (metadata)
    layer_buttons = upload_layers.children[1].querySelectorAll(".general_button")
    layer_buttons.forEach(element => {
        layername_list.push(element.querySelectorAll("h5")[0].innerHTML)
    });
    // console.log(layername_list)
    
    //undefined shit, fixe
    console.log(preview_layer_search(upload_layers))
    var layer_list = preview_layer_rarity(preview_layer_search(upload_layers)) // assets chosen per layer
    var texture_list = preview_layer_rarity(preview_layer_search(texture_layers)) // textures chosen per layer
    console.log(layer_list.length)
    // console.log(texture_list)
    //check if undefined also
    if (layer_list.length == 0) {
        alert("Upload images to use preview")
        close_loading_popup() 
        return
    }
    console.log(self.disabled)
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
    console.log(texture_list)
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

function preview_layer_search(layer){
    // see queryselector documentaion to see if there is an easier way of doing this with retarded syntax
    var files_list = []
    var files_list_parsed = []
    var files_final = []
    var input_list = []

    layer_buttons = layer.children[1].querySelectorAll(".general_button")

    layer_buttons.forEach(element => {
        files_list.push(element.querySelectorAll("#wrapper"))
    });

    files_list.forEach(files => {
        input_list.push(files[0].querySelectorAll(":scope input[type=file]"))
    });
    input_list.forEach(layer => {
        var temp_list = []
        layer.forEach(element => {
            temp_list.push(element.files)
        });
        files_list_parsed.push(temp_list)
    });

    files_list_parsed.forEach(element => {
        var temp_list = []
        element.forEach(subelement => {
            for (let index = 0; index < subelement.length; index++) {
                temp_list.push(subelement[index])
            }
        });
        files_final.push(temp_list)
    });
    return files_final
}

function send_form_ajax() {
    var data = new FormData();
    request = new XMLHttpRequest();
    
    data.append('XD', 'XD');
    request.open('POST', ajax_url);
    request.setRequestHeader('X-CSRFToken', get_cookie('csrftoken'));

    request.send(data);

    request.onreadystatechange = function () {
        // Process the server response here (Sent from Django view inside JsonResponse)
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) { //ifstatus is 200 - assume PROPER RESPONSE
                // close_loading_popup()
                console.log("ass")
            }
            else { //unhandled error
                alert("Unkown server error")
                return
            }   
        }
    };

}

function preview_layer_rarity(layer_list){
    var final_list = []
    layer_list.forEach(element => {
        const random = Math.floor(Math.random() * element.length);
        final_list.push(element[random])
    });
    return final_list
}

window.addEventListener("load", main);