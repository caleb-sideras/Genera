button_section_layers = null
button_section_textures = null
button_section_collection = null

function main() {
    console.log("LMAO")
    button_section_layers = document.getElementsByClassName("upload_layers_buttons")[0]
    button_section_textures = document.getElementsByClassName("upload_layers_buttons")[1]
    button_section_collection = document.getElementsByClassName("upload_main")[0]
}

function add_smart_input(self, category) {

    //1 == asset, 2 == texture
    //create an upload button:
    console.log(self)
    if (self.innerHTML == undefined) { return }
    console.log(category)

    if (self.innerHTML == undefined) { return }

    var upload_section = document.createElement('div')
    upload_section.style.display = "flex";

    var uploadbtn = document.createElement('input');
    uploadbtn.setAttribute('type', 'file');
    if (category == 1) {
        uploadbtn.name = "asset." + self.dataset.layer.toLowerCase()
    }
    else if (category == 2)
        uploadbtn.name = "texture." + self.dataset.layer.toLowerCase()

    uploadbtn.style.marginBottom = "5px"

    console.log(uploadbtn.name)
    //append it to your document:
    upload_section.appendChild(uploadbtn)
    //add an event listener that appends the file name to the input name field for submission (8000 iq)
    uploadbtn.addEventListener('change', function () { uploadbtn.name = uploadbtn.name + "." + uploadbtn.files[0].name; console.log(uploadbtn.name) });
    //make delete element: 
    let deletetext = document.createElement('h5');
    deletetext.textContent = 'Remove';
    upload_section.appendChild(deletetext);
    self.parentElement.appendChild(upload_section);
    //Add an event listener to remove the original button and the delete link on click:
    deletetext.addEventListener('click', function () {
        uploadbtn.remove();
        deletetext.remove();
    });
}

function add_layer() {
    add_layer_input = document.getElementById("add_layer_input")

    if (add_layer_input.value == "") {
        create_notification("FAMILY IS CRYING", "FORGOT GIVE LAYER NAME !!!!! !! !!", duration = 20000, "error") //20 years duration for sins
    } else {
        layers_row = document.createElement('div')
        layers_row.classList = "general_button white_background"
        textures_row = layers_row.cloneNode(true)

        add_layer_img = document.createElement('img')
        add_layer_img.src = "static/icons/plus.svg"
        add_layer_img.classList = "color_image_orange grow"
        add_layer_img.addEventListener('click', function () { add_smart_input(this, 1) })

        add_layer_img.dataset.layer = add_layer_input.value
        add_layer_img_2 = add_layer_img.cloneNode(true)
        add_layer_img_2.addEventListener('click', function () { add_smart_input(this, 2) })

        close_button_img = document.createElement('img')
        close_button_img.src = "static/icons/close.svg"
        close_button_img.classList = "close_button color_image_orange"

        layers_row.appendChild(close_button_img)
        layers_row.appendChild(Object.assign(document.createElement('h5'), { textContent: add_layer_input.value, classList: 'no_margin' }))
        layers_row.appendChild(add_layer_img)
        textures_row.appendChild(Object.assign(document.createElement('h5'), { textContent: add_layer_input.value, classList: 'no_margin' }))
        textures_row.appendChild(add_layer_img_2)

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


window.addEventListener("load", main);