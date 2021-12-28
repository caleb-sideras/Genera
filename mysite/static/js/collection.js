collection_main = null
card_element = null

function main() {
    preview_wrapper = document.getElementsByClassName("image_preview")[0]
    document_body = document.body
}

function open_images(self){

    function create_image_element(title, elements, elements_count){
        element_container = document.createElement('div')
        element_container.classList = 'general_button dropdown_button white_background'
        element_container.style = 'margin: 0px 10px 10px 10px;'
        element_container.appendChild(Object.assign(document.createElement('h5'), { textContent: title, style: 'font-weight: bold; margin:5px; font-size: 17px'}))

        sub_element_wrapper = document.createElement('div')
        sub_element_wrapper.classList = 'open'
        sub_element_wrapper.id = 'wrapper'
        sub_element_wrapper.style = 'padding: 15px 20px; margin-right: -20px; margin-left: -20px; width: 100%; text-align: start;'

        if (elements_count == 1) {
            sub_element_wrapper.appendChild(Object.assign(document.createElement('p'), { textContent: elements }))
            button = add_button()
            button[1] = document.createElement('div')
            button[1].classList = 'expand_button_container'
            button[1].style = 'justify-content: center; width: 25px;'

            button[0].style = 'width: auto;'
            button[1].appendChild(button[0])
            element_container.appendChild(button[1])
        }
        else if (elements_count == 2){
            counter = add_properties(elements, sub_element_wrapper)
            button = add_button()
            button[1].appendChild(Object.assign(document.createElement('h5'), { textContent: counter }))
            // find a way to minimize
            
            button[1].appendChild(button[0])
            element_container.appendChild(button[1])
        }
        else{
            console.log("Hello")
        }

        element_container.appendChild(sub_element_wrapper)
        return element_container
        
    }
    

    function add_button(){
        expand_collapse_button = document.createElement('div')
        expand_collapse_button.classList = 'expand_button_container'

        button = document.createElement('img')
        button.src = "/static/icons/expand.svg"
        button.style = 'transform: rotate(0deg)'
        button.classList = 'expand_collapse'
        button.addEventListener('click', function () { expand_collapse(this)})
        return [button, expand_collapse_button]
    }

    card_element = (self.parentNode)
    temp = (self.parentNode).children[0].dataset.fullrez
    temp2 = ((self.parentNode).children[1]).children[1].innerHTML // metadata
    temp3 = ((self.parentNode).children[1]).children[0].innerHTML // title
    temp4 = ((self.parentNode).children[1]).children[2].innerHTML // ifps_bool
    temp5 = ((self.parentNode).children[1]).children[3].innerHTML //deployed_bool
    if (card_element.children[0].dataset.ipfs) {
        token_uri = card_element.children[0].dataset.ipfs
    }
    parsed = JSON.parse(temp2)

    // console.log(temp4)
    // console.log(temp5)

    preview_container = document.createElement('div')
    preview_container.classList = "rounded_container"

    top_row = document.createElement('div')
    top_row.classList= 'top_row'

    close_button = document.createElement('img')
    close_button.src = '/static/icons/remove.svg'
    close_button.addEventListener('click', function () {close_image_carousell()})
    top_row.appendChild(close_button)

    wrapper = document.createElement('div')
    wrapper.classList = 'content_wrapper'

    lbuttonwrapper = document.createElement('div')
    lbuttonwrapper.classList = 'lbutton_wrapper'
    left_button = document.createElement('img')
    left_button.src = '/static/icons/expand.svg'
    left_button.classList = 'button left'
    lbuttonwrapper.addEventListener('click', function () { next_element(this, false) })
    lbuttonwrapper.appendChild(left_button)
    wrapper.appendChild(lbuttonwrapper)

    image = document.createElement('img')
    image.src = temp
    image.classList = 'image'
    wrapper.appendChild(image)

    info = document.createElement('div')
    info.classList = 'info'
    upper_info_wrapper = document.createElement('div')
    upper_info_wrapper.classList = 'upper_info_wrapper'
    title = document.createElement('h2')
    title.innerHTML = temp3
    upper_info_wrapper.appendChild(title)

    if (temp4!='True') {
        edit_wrapper = document.createElement('div')
        edit_wrapper.classList = "general_button_no_border light_purple_background"
        edit_button = document.createElement('img')
        edit_button.src = '/static/icons/edit.svg'
        edit_text = document.createElement('h4')
        edit_text.innerHTML = "Edit"
        edit_wrapper.appendChild(edit_button)
        edit_wrapper.appendChild(edit_text)
        edit_wrapper.addEventListener('click', () => {
            edit_image(temp3, parsed['description'])
        })
        upper_info_wrapper.appendChild(edit_wrapper)
    }
    
    metadata = document.createElement('div')
    metadata.classList = 'info_wrapper'

    sub_section_element1 = create_image_element('Description', parsed['description'], 1)
    sub_section_element2 = create_image_element('Properties', parsed['attributes'], 2)
    metadata.appendChild(sub_section_element1)
    metadata.appendChild(sub_section_element2)

    mutipurpose_button_section = document.createElement('div')
    mutipurpose_button_section.classList = 'mutipurpose_button_section'
    mutipurpose_button = document.createElement('div')
    mutipurpose_button.classList = 'general_button_no_border mutipurpose_button'

    // ipfs, make ifps deletable
    if (temp4 == 'False') {
        temp_button = mutipurpose_button.cloneNode(true)
        temp_button.appendChild(Object.assign(document.createElement('h4'), { textContent: 'Delete', style: 'color: red'}))
        temp_button.addEventListener("click", async function () {
            await yes_no_popup("Permanently delete image?", "Delete", "Cancel")
            .then(function (reponse) {
                if (reponse) {
                    ajax_post({ 'delete_entry': temp3 })
                    .then(function (response) { //Action that occurs after a response from the server was obtained - here (STATUS 200)
                        console.log(response["server_message"])
                        card_element.remove()
                    })
                    close_yes_no_popup()
                }
                (document.body).children[0].remove() // TODO fix

            })
        })
        mutipurpose_button_section.appendChild(temp_button)
    }
    if (temp4 == 'True') {
        temp_button = mutipurpose_button.cloneNode(true)
        temp_button.appendChild(Object.assign(document.createElement('h4'), { textContent: 'TokenURI', style: 'color: red' }))
        button_link = document.createElement('a')
        button_link.href = token_uri
        button_link.target = "_blank"
        button_link.appendChild(temp_button)
        mutipurpose_button_section.appendChild(button_link)
    }
    if (temp5 == 'True') {
        temp_button = mutipurpose_button.cloneNode(true)
        temp_button.appendChild(Object.assign(document.createElement('h4'), { textContent: 'OpenSea', style: 'color: dodgerblue' }))
        mutipurpose_button_section.appendChild(temp_button)
    }
    //MINTING OPTION ALSO
    
    info.appendChild(upper_info_wrapper)
    info.appendChild(metadata)
    info.appendChild(mutipurpose_button_section)
    wrapper.appendChild(info)

    rbuttonwrapper = document.createElement('div')
    rbuttonwrapper.classList = 'rbutton_wrapper'
    right_button = document.createElement('img')
    right_button.src = '/static/icons/expand.svg'
    right_button.classList = 'button right'
    rbuttonwrapper.addEventListener('click', function () { next_element(this, true) })
    rbuttonwrapper.appendChild(right_button)
    wrapper.appendChild(rbuttonwrapper)

    preview_container.appendChild(wrapper)
    popup_container = document.createElement('div')
    popup_container.classList = "image_preview"
    popup_container.appendChild(top_row)
    popup_container.appendChild(preview_container)
    document_body.prepend(popup_container)

}

function add_properties(_elements, _sub_element_wrapper) {
    counter = 0
    _elements.forEach(element => {
        counter++
        row = document.createElement('p') //pre
        row.innerHTML = element['trait_type'].toUpperCase() + ": " + element['value']
        _sub_element_wrapper.appendChild(row)
    });
    return counter
}

function next_element(self, bool){
    if (bool) {
        temp = card_element.nextElementSibling
    }
    else{
        temp = card_element.previousElementSibling
    }

    if (temp!=null) { // maybe have it looped, first -> last VV
        card_element = temp
        
        image = card_element.children[0].dataset.fullrez
        metadata = (card_element.children[1]).children[1].innerHTML
        temp3 = (card_element.children[1]).children[0].innerHTML
        ifps_bool = (card_element.children[1]).children[2].innerHTML
        deploy_bool = (card_element.children[1]).children[3].innerHTML

        parsed = JSON.parse(metadata)

        parent = self.parentNode
        parent.children[1].src = image
        parent2 = parent.children[2]
        parent2.children[0].children[0].innerHTML = temp3
        parent2.children[1].children[0].children[2].children[0].innerHTML = parsed['description']
        if (card_element.children[0].dataset.ipfs) {
            token_uri = card_element.children[0].dataset.ipfs
            parent2.children[2].children[0].href = token_uri
        }
        properties = parent2.children[1].children[1].children[2]
        button_number = parent2.children[1].children[1].children[1].children[0]
        properties.innerHTML = ''
        button_number.innerHTML = add_properties(parsed['attributes'], properties)
    }
}

function close_edit(){
    edit_wrapper = document.getElementsByClassName("image_edit_wrapper")[0]
    edit_wrapper.style = "display: none;"
}

function close_image_carousell(){
    document.getElementsByClassName("image_preview")[0].remove() 
}

function expand_collapse(self) {
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

async function delete_duplicates(self){
    await yes_no_popup("Delete ALL Duplicates?", "Delete", "Cancel")
        .then(function (reponse) {
            if (reponse) {
                create_and_render_loading_popup("Deleting Duplicates")
                ajax_post({ 'delete_duplicates': 'hello' })
                    .then(function (response) { //Action that occurs after a response from the server was obtained - here (STATUS 200)
                        console.log(response["server_message"])
                        location.reload();
                    })
            }
            close_yes_no_popup()
            // (document.body).children[0].remove()

        })
}

function download_zip() {
    create_and_render_loading_popup("Downloading Collection")
    console.log('Generating zipfile');
    let images = document.querySelectorAll(".collection_card > img");
    let metadata = document.querySelectorAll(".collection_card > div > pre");

    let zip = new JSZip();
    let folder_name = js_vars.dataset.collection_name + ".zip";

    for (let i = 0; i < images.length; i++) {
        let filename = images[i].dataset.name + ".png";
        let url = images[i].src
        let metadata_name = images[i].dataset.name + ".json";
        let json = metadata[i].innerHTML
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if (err) {
                throw err // or handle the error
            }

            zip.file(filename, data, { binary: true })
            zip.file(metadata_name, json)

            if (i+1 == images.length) {
                zip.generateAsync({ type: 'blob' }).then(function (content) {
                    saveAs(content, folder_name);
                });
            }
        });
    }
    close_loading_popup()
}

function edit_image(title, description){
    edit_wrapper = document.getElementsByClassName("image_edit_wrapper")[0]
    edit_wrapper.style = "display: flex;"
    console.log(edit_wrapper)
    // console.log(edit_wrapper.children[0])
    edit_wrapper.children[1].children[1].value = title
    edit_wrapper.children[1].children[3].value = description
    edit_wrapper.children[2].value = title
    submit_button = document.getElementById("update_collection_submit_button")
    submit_button.removeAttribute("disabled")
    console.log("edit clicked")
}

window.addEventListener("load", main);