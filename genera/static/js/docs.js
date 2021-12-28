function main(){
    active_element_id = null
    docs_content = document.getElementsByClassName('docs_content')[0]
    docs_column = document.getElementsByClassName('docs_column')[0]
}

function docs_new_content(self){
    visible_element = docs_content.querySelector("#" + active_element_id)
    visible_element_button = docs_column.querySelector("#" + active_element_id)
    if (visible_element) {
        visible_element.style.display = 'none'
        visible_element_button.children[0].style.color = "grey"
    }
    active_element_id = self.id
    docs_content.querySelector("#"+self.id).style = 'display:block;'
    active_element = docs_column.querySelector("#" + active_element_id) 
    active_element.children[0].style.color = 'var(--medium-grey-color)'
}

function create_subtitle(){

}

function create_body(){

}

window.addEventListener("load", main);