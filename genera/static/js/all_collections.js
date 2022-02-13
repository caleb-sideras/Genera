

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

if (typeof url !== 'undefined') {
    if (url != "") {
        console.log("URLING")
        setInterval(() => check_collection_status(url), 5000);

    }
}