collection_main = null
card_element = null

function main() {
    preview_wrapper = document.getElementsByClassName("image_preview")[0]
    // backdrop = document.getElementsByClassName("filter")[0]

    // ajax_button = document.getElementById("hello_king")
    // ajax_script = ajax_button.dataset.metadata
    // console.log(JSON.parse(ajax_script))
    // parsed_json = JSON.parse(ajax_script)
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

        if (elements_count = 0) {
            sub_element_wrapper.appendChild(Object.assign(document.createElement('p'), { textContent: elements }))
            button = add_button()
            button[1] = document.createElement('div')
            button[1].classList = 'expand_button_container'
            button[1].style = 'justify-content: center; width: 25px;'

            button[0].style = 'width: auto;'
            button[1].appendChild(button[0])
            element_container.appendChild(button[1])
        }
        else if (elements_count = 1){
            // counter = add_properties(elements, sub_element_wrapper)
            // button = add_button()
            // button[1].appendChild(Object.assign(document.createElement('h5'), { textContent: counter }))
            // // find a way to minimize
            
            // button[1].appendChild(button[0])
            // element_container.appendChild(button[1])
        }
        else {
            sub_element_wrapper.appendChild(Object.assign(document.createElement('p'), { textContent: elements }))
            button = add_button()
            button[1] = document.createElement('div')
            button[1].classList = 'expand_button_container'
            button[1].style = 'justify-content: center; width: 25px;'

            button[0].style = 'width: auto;'
            button[1].appendChild(button[0])
            element_container.appendChild(button[1])
        }

        element_container.appendChild(sub_element_wrapper)
        return element_container
        
    }

    function add_properties(_elements, _sub_element_wrapper){
        counter = 0
        _elements.forEach(element => {
            counter++ 
            row = document.createElement('p') //pre
            row.innerHTML = element['trait_type'].toUpperCase() + ": " + element['value']
            _sub_element_wrapper.appendChild(row)
        });
        return counter
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
    temp = (self.parentNode).children[0].src
    temp2 = ((self.parentNode).children[1]).children[1].innerHTML // metadata
    temp3 = ((self.parentNode).children[1]).children[0].innerHTML // title
    temp4 = ((self.parentNode).children[1]).children[2].innerHTML // ifps_bool
    temp5 = ((self.parentNode).children[1]).children[3].innerHTML //deployed_bool

    console.log(temp4)
    console.log(temp5)

    preview_container = document.createElement('div')
    preview_container.classList = "rounded_container"

    top_row = document.createElement('div')
    top_row.classList= 'top_row'

    close_button = document.createElement('img')
    close_button.src = '/static/icons/remove.svg'
    close_button.addEventListener('click', function () { close_pop_up(this) })
    top_row.appendChild(close_button)
    preview_wrapper.appendChild(top_row)

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
    title = document.createElement('h2')
    title.innerHTML = temp3
    metadata = document.createElement('div')
    metadata.classList = 'info_wrapper'

    parsed = JSON.parse(temp2)
    sub_section_element1 = create_image_element('Description', parsed['description'], 0)
    sub_section_element2 = create_image_element('Properties', parsed['attributes'], 1)
    sub_section_element2 = create_image_element('Properties', [temp4, temp5], 2)
    metadata.appendChild(sub_section_element1)
    metadata.appendChild(sub_section_element2)

    mutipurpose_button_section = document.createElement('div')
    mutipurpose_button_section.classList = 'mutipurpose_button_section'
    mutipurpose_button = document.createElement('div')
    mutipurpose_button.classList = 'general_button_no_border mutipurpose_button'

    // your ifs
    if (temp4 == 'True') {
        temp_button = mutipurpose_button.cloneNode(true)
        temp_button.appendChild(Object.assign(document.createElement('h4'), { textContent: 'Delete', style: 'color: red'}))
        mutipurpose_button_section.appendChild(temp_button)
    }

    if (temp5 == 'False') {
        temp_button = mutipurpose_button.cloneNode(true)
        temp_button.appendChild(Object.assign(document.createElement('h4'), { textContent: 'OpenSea', style: 'color: dodgerblue' }))
        mutipurpose_button_section.appendChild(temp_button)
    }
    

    
    

    info.appendChild(title)
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
    preview_wrapper.style.display = 'block'
    preview_wrapper.appendChild(preview_container)

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
        image = card_element.children[0].src
        metadata = (card_element.children[1]).children[1].innerHTML
        title = (card_element.children[1]).children[0].innerHTML

        parent = self.parentNode
        parent.children[1].src = image
        parent2 = parent.children[2]
        parent2.children[0].innerHTML = title
        parent2.children[1].innerHTML = metadata
    }
}

function close_pop_up(self){
    preview_wrapper.style.display = 'none'
    preview_wrapper.children[1].remove()
    preview_wrapper.children[0].remove()
    // backdrop.style.backdropFilter  = 'blur(0px)'
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

window.addEventListener("load", main);