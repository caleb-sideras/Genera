var temp = ""


function main() {
    console.log("LMAO")
}


function add_smart_input(self) {
    //create an upload button:

    console.log(self)
    if (self.innerHTML == undefined) {return}
    else
        category = self.innerHTML.toLowerCase()
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
    let deletetext = document.createElement('p');
    deletetext.textContent = 'Delete';
    deletetext.className = "no_margin"
    upload_section.appendChild(deletetext);
    self.parentElement.appendChild(upload_section);
    //Add an event listener to remove the original button and the delete link on click:
    deletetext.addEventListener('click', function() {
        console.log("DELET")
      uploadbtn.remove();
      deletetext.remove();
    });

  }





















window.addEventListener("load", main)


