button_section_layers = null
button_section_textures = null
button_section_collection = null
rarity_map = {}

function main() {
    layer_update_mode = false
    rarity_map = {}
    all_layer_names = []

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
    // console.log(self.parentElement)
    // console.log((self.parentElement).parentElement)

    var build_upload_section = function(filename, upload_button) {
        var full_file_name = ""
        
        var show_file = function () {
            //full_file_name
            // var fileBuffer = new DataTransfer();
            var attachments = upload_button.files;
            // console.log(upload_button)
            // console.log(attachments)
            // append the file list to an array iteratively
            for (let i = 0; i < attachments.length; i++) {
                // Exclude specified filename
                if (attachments[i].name == filename) {
                    temp_image = attachments[i]
                }
                
            }
            var output = document.getElementsByClassName('upload_preview');
            // console.log(temp_image)
            output[0].children[0].src = URL.createObjectURL(temp_image)
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

        // var deletetext = Object.assign(document.createElement('h5'), { textContent: 'Remove', classList: 'no_margin'})
        var deletetext = document.createElement('img')
        deletetext.src = "static/icons/remove.svg"
        deletetext.classList = "close_button_color"
        deletetext.addEventListener('click', function () {
            let scoped_filename = generate_full_filename(this.category)
            this.upload.remove()

            remove_file(scoped_filename)
            open_images(self)
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
            show_file()
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
        open_images(self)
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
        
        useless_div = document.createElement('div') // don't remove the earth will shatter

        layers_row.appendChild(close_button_img)
        textures_row.appendChild(useless_div)

        layer_name = document.createElement('h5')
        layer_name.textContent = add_layer_input.value
        layer_name.classList = 'no_margin'
        layer_name.style = "cursor: pointer;"
        texture_name = layer_name.cloneNode(true)

        let handle_layer_properties_update = function() {
            // console.log(document.getElementById("rarity_map").value)
            document.getElementsByClassName("update_layer_parameters_menu")[0].style.display = "block"
            clicked_layer_name = this.layers_row.querySelector(":scope > h5")
            linked_texture_name = this.textures_row.querySelector(":scope > h5")
            layer_name_update_field.value = clicked_layer_name.innerHTML
            
            console.log(this.layers_row)
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

        

        layer_name.addEventListener('click', function() { open_images(this); handle_layer_properties_update()}.bind(add_layer_img))
        texture_name.addEventListener('click', function () { open_images(this)}.bind(add_layer_img_2))

        
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

function open_images(self){
    var upload_preview = document.getElementsByClassName('upload_preview')[0]

    function replace_image(imge_url){
        upload_preview.children[0].src = imge_url
    }
    // console.log("open images")
    // console.log(self)
    // console.log(self.parentElement.children[4])
    var local_sliders = self.parentElement.children[4].querySelectorAll(":scope input[type=file]")
    // console.log(local_sliders)
    
    var isfirst = false;

    upload_preview.children[1].innerHTML = self.previousElementSibling.innerHTML
    upload_preview.children[2].innerHTML = ""
    var filelist = []
    for (let index = 0; index < local_sliders.length; index++) {
        var tempfilelist = local_sliders[index].files;
        for (var i = 0, l = tempfilelist.length; i < l; i++) {
            filelist.push(tempfilelist[i]);
        }
        
        console.log(typeof(filelist))
    }
    if (filelist.length > 0) {
        if (!isfirst) {
            replace_image(URL.createObjectURL(filelist[0]));
            isfirst = true
        }

        for (let i = 0; i < filelist.length; i++) {
            var new_element = document.createElement('li')
            var new_element_img = document.createElement('img')
            new_element_img.src = URL.createObjectURL(filelist[i])
            new_element.style = "cursor: pointer;"
            new_element.addEventListener('click', function () { replace_image(URL.createObjectURL(filelist[i])) })
            new_element.appendChild(new_element_img)
            // console.log(new_element)
            document.getElementById("scroller").appendChild(new_element)
        }
    }
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


//EXTRA TEST STUFF
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

//EXTRA TEST STUFF
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

function preview_button(){
    var upload_layers = document.getElementsByClassName('upload_layers')[0]
    var texture_layers = document.getElementsByClassName('upload_layers')[1]
    var collection_properties_container = document.getElementsByClassName('upload_properties')[0]
    collection_properties = collection_properties_container.children[0].children[1].querySelectorAll(':scope input')
    properties_list = [] // collection properites (metadata)
    properties_list.push(collection_properties[0].value)
    properties_list.push(collection_properties[1].value)
    properties_list.push(collection_properties[3].value)
    properties_list.push(collection_properties[5].value)
    properties_list.push(collection_properties[6].value)
    // console.log(properties_list)

    layername_list = [] // layer names (metadata)
    layer_buttons = upload_layers.children[1].querySelectorAll(".general_button")
    layer_buttons.forEach(element => {
        layername_list.push(element.querySelectorAll("h5")[0].innerHTML)
    });
    // console.log(layername_list)

    var layer_list = preview_layer_rarity(preview_layer_search(upload_layers)) // assets chosen per layer
    var texture_list = preview_layer_rarity(preview_layer_search(texture_layers)) // textures chosen per layer
    // console.log(layer_list)
    // console.log(texture_list)

    var data = new FormData();
    request = new XMLHttpRequest();
    
    data.append('properties', properties_list);
    data.append('layernames', layername_list);

    if (layer_list.length > 0 ) {
        for (var i = 0; i < layer_list.length; i++) {
            data.append(layer_list[i].name, layer_list[i]);
        }
    }
    //iterate over every file in texture list and append to formdata
    console.log(texture_list)
    if (texture_list.length > 5) {
        for (var i = 0; i < texture_list.length; i++) {
            data.append(texture_list[i].name, texture_list[i]);
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
                var img_object = request.response
                var img_src = `data:image/png;base64,${img_object}`
                document.getElementsByClassName('upload_preview')[0].children[0].src = img_src
            }
            else { //unhandled error
                alert("Unkown server error")
                return
            }   
        }
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