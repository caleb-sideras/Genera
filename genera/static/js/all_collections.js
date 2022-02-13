

const check_collection_status = (url) => {
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        if (data["complete"]){
            create_notification("Generation Complete!", `A collection has been generated! Thank you for your patience - page will be refreshed automatically :)`, duration=5000, theme="success")
            setTimeout(function () {
                location.reload()
            }, 5000);
        }
        else
            console.log("Collection is not complete")
    })
}
if (typeof collection_names !== 'undefined') {
    
    if (collection_names.length > 0) {
        if (typeof username !== 'undefined') {
            collection_names = collection_names.toString().replace(",","&")
            url = `user/${username}/collections/${collection_names}/request_status`
            console.log(url)
            setInterval(() => check_collection_status(url), 2000);
        }
    }
} 

console.log(collection_names)