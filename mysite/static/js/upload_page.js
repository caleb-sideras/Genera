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
    var component_wrapper = self.parentNode.children[self.parentNode.children.length - 1]

    var build_upload_section = function(filename, upload_button) {
        if (upload_button.name == "") {
            if (category == 1) 
                upload_button.name = "asset." + self.dataset.layer.toLowerCase() + "." + filename
            else if (category == 2)
                upload_button.name = "texture." + self.dataset.layer.toLowerCase() + "." + filename
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
            rarity_map[filename] = this.slider_1.value
            document.getElementById("rarity_map").value = JSON.stringify(rarity_map)
            update_sliders()
        }.bind({slider_1: slider_1, slider_value: slider_value}))

        slider_section.appendChild(slider_value)
        slider_section.appendChild(slider_1)

        var deletetext = Object.assign(document.createElement('h5'), { textContent: 'Remove', classList: 'no_margin'})
        deletetext.addEventListener('click', function () {
            this.upload.remove()
        }.bind({upload: upload_section}))

        upload_section.appendChild(Object.assign(document.createElement('h5'), { textContent: filename, classList: 'no_margin' }))
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
    
    var fileList = []
    uploadbtn.addEventListener('change', function() {
        fileList = []
        for (var i = 0; i < uploadbtn.files.length; i++) {
            fileList.push(uploadbtn.files[i])
        }
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i]
            var return_compoments = build_upload_section(file.name, uploadbtn)
            uploadbtn = return_compoments[1]
            component_wrapper.appendChild(return_compoments[0])
            update_sliders()
        }
    })
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
    console.log(collection_size)
    for (var k = 0; k < document.getElementsByClassName("upload_layers_buttons").length; k++) {
        var button_section_layers = document.getElementsByClassName("upload_layers_buttons")[k]
        for (var i = 0; i < button_section_layers.children.length; i++) { //all layers within component 
            //button_section_layers.children[i] is specific layer access
            var local_sliders = button_section_layers.children[i].querySelectorAll(":scope .upload_slider_section")
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
                    slider_count.innerHTML =  "zero count memes"
                }
            }
        }
    }
}

function add_layer() {
    add_layer_input = document.getElementById("add_layer_input")

    if (add_layer_input.value == "") {
        create_notification("FAMILY IS CRYING", "FORGOT GIVE LAYER NAME !!!!! !! !!", duration = 20000, "error") //20 years duration for sins
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
        add_layer_img.classList = "color_image_orange grow"

        add_layer_img.addEventListener('click', function () { add_smart_input(this, 1)})

        expand_button = document.createElement('button');
        expand_button.type = 'button'
        expand_button.appendChild(Object.assign(document.createElement('h5'), { textContent: "v", classList: 'no_margin' }))

        expand_button_2 = expand_button.cloneNode(true)

        expand_button.addEventListener('click', function () { expand_collapse_button(this) })

        expand_button_2.addEventListener('click', function () { expand_collapse_button(this) })

        add_layer_img.dataset.layer = add_layer_input.value

        add_layer_img_2 = add_layer_img.cloneNode(true)
        add_layer_img_2.addEventListener('click', function () { add_smart_input(this, 2)})

        close_button_img = document.createElement('img')
        close_button_img.src = "static/icons/close.svg"
        close_button_img.classList = "close_button color_image_orange"

        layers_row.appendChild(close_button_img)

        layers_row.appendChild(Object.assign(document.createElement('h5'), { textContent: add_layer_input.value, classList: 'no_margin' }))

        layers_row.appendChild(add_layer_img)
        layers_row.appendChild(expand_button)
        layers_row.appendChild(expand_collapse_parent)

        textures_row.appendChild(Object.assign(document.createElement('h5'), { textContent: add_layer_input.value, classList: 'no_margin' }))

        textures_row.appendChild(add_layer_img_2)
        textures_row.appendChild(expand_button_2)
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

function switch_tabs(target_tab) {
    var upload_layers = document.getElementsByClassName("upload_layers")[0]
    var upload_textures = document.getElementsByClassName("upload_layers")[1]

    if (target_tab == "layers") {
        upload_layers.style.display = "block"
        upload_textures.style.display = "none"
    }
    if (target_tab == "textures") {
        upload_textures.style.display = "block"
        upload_layers.style.display = "none"
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
        button_section_collection.appendChild(layers_row);
    }

    add_layer_input.value = ""
}
//EXTRA TEST STUFF
function expand_collapse_button(self) {
    var element = document.getElementById("wrapper");
    // var list = document.getElementById("list");
    children = self.nextElementSibling
    console.log(children)

    if (children.classList.contains('open')) {

        clientHeight = children.clientHeight;
        console.log(clientHeight)
        children.classList.remove("open");
        children.style.height = '0px';

    } else {
        children.classList.add("open");
        children.style.height = null;

    }
}

window.addEventListener("load", main);