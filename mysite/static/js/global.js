var temp = ""


function main() {
    console.log("LMAO")
}


function add_smart_input(self) {
    //create an upload button:

    console.log(self)
    if (self.innerHTML == undefined) {return}
    else
        category = self.dataset.layer.toLowerCase()
    console.log(category)

    var upload_section = document.createElement('div')
    upload_section.style.display = "flex";

    var uploadbtn = document.createElement('input');
    uploadbtn.setAttribute('type', 'file');
    if (category != "textures") {
        uploadbtn.name = "asset." + category
    }
    else
        uploadbtn.name = "texture." + category
    uploadbtn.style.marginBottom = "5px"
    
    console.log(uploadbtn.name)
    //append it to your document:
    upload_section.appendChild(uploadbtn)
    //add an event listener that appends the file name to the input name field for submission (8000 iq)
    uploadbtn.addEventListener('change', function() {uploadbtn.name = uploadbtn.name + "." + uploadbtn.files[0].name; console.log(uploadbtn.name)});
    //make delete element: 
    let deletetext = document.createElement('h5');
    deletetext.textContent = 'Remove';
    upload_section.appendChild(deletetext);
    self.parentElement.appendChild(upload_section);
    //Add an event listener to remove the original button and the delete link on click:
    deletetext.addEventListener('click', function() {
        console.log("DELET")
      uploadbtn.remove();
      deletetext.remove();
    });
}

function add_layer() {
    add_layer_input = document.getElementById("add_layer_input")
    button_section = document.getElementsByClassName("upload_layers_buttons")[0]
    if (add_layer_input.value == "") {
        create_notification("FAMILY IS CRYING", "FORGOT GIVE LAYER NAME !!!!! !! !!", duration=20000, "error") //20 years duration for sins
    } else {
        var img_src = '"' + "static/icons/plus.svg" + '"'
        smart_row = '<div class="general_button white_background"><h5 class="no_margin"">' + add_layer_input.value + "</h5><img data-layer='" + add_layer_input.value + "' onclick='add_smart_input(this)' class='color_image grow' src=" + img_src + " onclick='add_layer()'></div>"
        button_section.insertAdjacentHTML("beforeend", smart_row);
        add_layer_input.value = ""
    }
}

//recolor the notification colors - already done the warning one
function create_notification(title, message, duration=5000, theme) { // success, info, warning, error, and none
    window.createNotification({theme: theme, showDuration: duration})({title: title, message: message})
}




















window.addEventListener("load", main)


