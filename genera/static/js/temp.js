async function main(){
    all_inputs = document.querySelectorAll("input")
    all_inputs.forEach(async input => {
        await fetch(input.value)
            .then(res => res.json()) // how to fix? new event listener?
            .then((out) => {
                let img = input.nextElementSibling.children[0]
                let downloadingImage = new Image(); 
                downloadingImage.src = out['image']
                downloadingImage.onload = () => { // whole image load on load, not partial
                    img.src = downloadingImage.src
                    img.nextElementSibling.style.display = 'none'
                }
            })
            .catch((err) => {
                
                // img.alt = "Connection Error"
                // img.nextElementSibling.style.display = 'none'
            });
    });
}
window.addEventListener('DOMContentLoaded', main)