const check_collection_status = (url) => {
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        if (data["complete"]){
            create_notification("Generation Complete!", "Your collection has been generated! Page will be refreshed automatically :)", duration=5000, theme="success")
            setTimeout(function () {
                location.reload()
            }, 5000);
        }
        else
            console.log("Collection is not complete")
    })
}   