button_section_layers = null
button_section_textures = null
button_section_collection = null
rarity_map = {}

function main() {
    rarity_map = {}

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
    var component_wrapper = self.parentNode.children[self.parentNode.children.length - 1]
    console.log(self.parentElement)
    console.log((self.parentElement).parentElement)

    var build_upload_section = function(filename, upload_button) {
        var full_file_name = ""
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
        
        if (category == 1) 
            full_file_name = "asset." + self.dataset.layer.toLowerCase() + "." + filename
        else if (category == 2)
            full_file_name = "texture." + self.dataset.layer.toLowerCase() + "." + filename

        if (upload_button.name == "") {
            upload_button.name = full_file_name
        }
        else {
            if (category == 1) 
                upload_button.name += "$asset." + self.dataset.layer.toLowerCase() + "." + filename
            else if (category == 2)
                upload_button.name += "$texture." + self.dataset.layer.toLowerCase() + "." + filename
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
            rarity_map[full_file_name] = this.slider_1.value
            document.getElementById("rarity_map").value = JSON.stringify(rarity_map)
            update_sliders()
        }.bind({slider_1: slider_1, slider_value: slider_value}))

        slider_section.appendChild(slider_value)
        slider_section.appendChild(slider_1)

        // var deletetext = Object.assign(document.createElement('h5'), { textContent: 'Remove', classList: 'no_margin'})
        var deletetext = document.createElement('img')
        deletetext.src = "static/icons/remove.svg"
        deletetext.classList = "close_button_color"
        deletetext.addEventListener('click', function () {
            this.upload.remove()
            remove_file(this.full_file_name) 
            delete rarity_map[full_file_name] //delete rarity map link
            document.getElementById("rarity_map").value = JSON.stringify(rarity_map)
            create_notification("File removed", "You have succesfully removed '" + this.full_file_name.split(".").slice(2,4).join(".") + "' from the component." , duration = 3500, "success") //20 years duration for sins
            update_sliders()
        }.bind({upload: upload_section, full_file_name:full_file_name}))

        upload_section.appendChild(Object.assign(document.createElement('h4'), { textContent: filename, classList: 'no_margin' }))
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
            var return_compoments = build_upload_section(file.name, uploadbtn, i)
            uploadbtn = return_compoments[1]
            component_wrapper.appendChild(return_compoments[0])
            update_sliders()
        }
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
    add_layer_input = document.getElementById("add_layer_input")

    if (add_layer_input.value == "") {
        create_notification("FAMILY IS CRYING", "FORGOT GIVE LAYER NAME !!!!! !! !!", duration = 10000, "error") //20 years duration for sins
    } else {
        layers_row = document.createElement('div')
        layers_row.classList = "general_button white_background"
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
   
        add_layer_img.dataset.layer = add_layer_input.value

        add_layer_img_2 = add_layer_img.cloneNode(true)
        add_layer_img_2.addEventListener('click', function () { add_smart_input(this, 2)})

        close_button_img = document.createElement('img')
        close_button_img.src = "static/icons/close.svg"
        close_button_img.classList = "close_button color_image_orange"

        layers_row.appendChild(close_button_img)

        layers_row.appendChild(Object.assign(document.createElement('h5'), { textContent: add_layer_input.value, classList: 'no_margin' }))

        layers_row.appendChild(add_layer_img)
        layers_row.appendChild(expand_button_container)
        layers_row.appendChild(expand_collapse_parent)

        textures_row.appendChild(Object.assign(document.createElement('h5'), { textContent: add_layer_input.value, classList: 'no_margin' }))

        textures_row.appendChild(add_layer_img_2)
        textures_row.appendChild(expand_button_container_2)
        textures_row.appendChild(expand_collapse_parent_2)

        layers_row.querySelector('.close_button').addEventListener("click", function () {
            this.layer.remove()
            this.texture.remove()
            create_notification("Layer removed!", this.name + " Removed!!!!!! !!!!! !! !!", duration = 5000, "success")
        }.bind({ name: add_layer_input.value, layer: layers_row, texture: textures_row }))
        button_section_layers.appendChild(layers_row);
        button_section_textures.appendChild(textures_row);
        add_layer_input.value = ""
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
    create_notification("Layer Operation", "LAYER REMOVED !!!!! !! !!", duration = 5000, "success") //20 years duration for sins
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

window.addEventListener("load", main);