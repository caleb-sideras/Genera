const check_collection_status = (url, collection_name) => {
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        if (data["complete"]){
            create_notification("Generation Complete!", `Your collection '${collection_name}' has been generated! Thank you for your patience - page will be refreshed automatically :)`, duration=5000, theme="success")
            setTimeout(function () {
                location.reload()
            }, 5000);
        }
        else
            console.log("Collection is not complete")
    })
}   