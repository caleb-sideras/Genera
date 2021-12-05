collection_main = null
card_element = null

function main() {
    preview_wrapper = document.getElementsByClassName("image_preview")[0]
    backdrop = document.getElementsByClassName("filter")[0]
    console.log(backdrop)
}


function open_images(self){
    // console.log(self)
    // console.log((self.parentNode).parentNode)
    card_element = (self.parentNode)
    // console.log(((self.parentNode).parentNode).nextElementSibling)
    // console.log(((self.parentNode).parentNode).previousElementSibling)
    temp = (self.parentNode).children[0].src
    temp2 = ((self.parentNode).children[1]).children[1].innerHTML
    temp3 = ((self.parentNode).children[1]).children[0].innerHTML
    
    preview_container = document.createElement('div')
    preview_container.classList = "rounded_container"

    top_row = document.createElement('div')
    top_row.classList= 'top_row'

    close_button = document.createElement('img')
    close_button.src = '/static/icons/remove.svg'
    close_button.addEventListener('click', function () { close_pop_up(this) })
    top_row.appendChild(close_button)
    preview_wrapper.appendChild(top_row)

    // preview_container.appendChild(top_row)

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

    // bob = {'name': 'XD 3', 'description': 'asd', 'image': 'https://ipfs.io/ipfs/QmSQMKejwvSW8nHHnanspsJebKief2qmzscxDzbrwJG334', 'attributes': [{'trait_type': 'background', 'value': 'Faces-With-Shadows-4'}]}

    // console.log(JSON.stringify(bob, null, 4))
    // console.log(temp2)
    // console.log(typeof (temp2))
    // const obj = JSON.parse(temp2)

    // var temp = JSON.stringify(temp2, null, 2)
    // console.log(temp)
    // console.log(JSON.parse(temp))
    // console.log(temp2)
    // console.log(JSON.stringify(bob, null, 2))
    // console.log(JSON.stringify(eval(temp2)));

    // bob = { 'name': 'Testing1 9', 'description': 'Testing Collection, 12/3/2021', 'image': 'https://ipfs.io/ipfs/QmdqgPykyU89AKCymQnjzzL9FTeXEpysA2cD7VugsrXW4X', 'attributes': [{ 'trait_type': 'background', 'value': 'Baseline' }, { 'trait_type': 'face', 'value': 'Faces-With-Shadows-8' }] }
    // console.log(temp2)
    // temperman= JSON.stringify(temp2)
    // temperman2 = JSON.parse(temperman)
    // console.log(temperman2)
    // console.log(temperman2[0])

    info = document.createElement('div')
    info.classList = 'info'
    title = document.createElement('h2')
    title.innerHTML = temp3
    metadata = document.createElement('p') //pre
    metadata.innerHTML = temp2

    info.appendChild(title)
    info.appendChild(metadata)
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

    // backdrop.style.backdropFilter  = 'blur(10px)'

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

window.addEventListener("load", main);