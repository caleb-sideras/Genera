const check_collection_status = (url) => {
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        if (data["complete"]){
            create_notification("Generation Complete!", "A collection has been generated! Thank you for your patience - page will be refreshed automatically :)", duration=5000, theme="success")
            setTimeout(function () {
                location.reload()
            }, 5000);
        }
    })
}

if (typeof url !== 'undefined') {
    if (url != "") {
        setInterval(() => check_collection_status(url), 10000);
    }
}