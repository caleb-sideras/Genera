//recolor the notification colors - already done the warning one
ajax_url = null
function create_notification(title, message, duration = 5000, theme) { // success, info, warning, error, and none
    window.createNotification({ theme: theme, showDuration: duration })({ title: title, message: message })
}

function get_cookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function main() {

    if (typeof(document.getElementById("js_vars")) != 'undefined' && document.getElementById("js_vars") != null) {
        js_vars = document.getElementById("js_vars")
        ajax_url = js_vars.dataset.ajax_url
    }
    
    // Select the button
    const btn = document.querySelector(".btn_toggle");

    // Listen for a click on the button
    btn.addEventListener("click", function () {
        if (localStorage.lightMode == "dark") {
            localStorage.lightMode = "light";
            document.body.classList = "";
        } else {
            localStorage.lightMode = "dark";
            document.body.classList = "dark-mode";
        }
    }); 
    //showcase of new ajax function
    if (typeof(document.getElementById("button")) != 'undefined' && document.getElementById("button") != null) {
        document.getElementById("button").addEventListener("click", function() {
            ajax_post({"hello":"there"}) //plug in the JSON here that you wish to send to the server. Cookies and certificates are all handled in the function

            .then(function(response) { //Action that occurs after a response from the server was obtained - here (STATUS 200)

                response[""]
                console.log(response)

            })
            
        })
    }
}

//This function relies on having a js_vars element on the page, which stores the URL of the current page, inside data-ajax_url
function ajax_validate_field(field_object) {
    console.log(field_object.name)
    console.log(field_object.value)
    ajax_post({"field_name": field_object.name, "field_content": field_object.value})

    .then(function(response) {
        if (response["passed"] == 1) {
            field_object.style.background = "url('/static/icons/check.svg') no-repeat right";
            field_object.style.backgroundSize = "20px"
            field_object.classList.remove("error_img_color")
            field_object.title = ""
        }
        else if (response["passed"] == 0) {
            field_object.style.background = "url('/static/icons/remove.svg') no-repeat right";
            field_object.style.backgroundSize = "20px"
            field_object.classList.add("error_img_color")
            field_object.title = response["message"]
        }
    })
}

function ajax_post(payload) {
    return new Promise(function(resolve) {
        console.log("url posted to: " + ajax_url)
        if (ajax_url == null) {
            alert("No URL found on the page!")
            return
        }

        if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
            http_request = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE 6 and older
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        // Send the POST request to the url/DJANGO VIEW
        //setup for request header - not important
        http_request.open('POST', ajax_url, true);
        http_request.setRequestHeader('X-CSRFToken', get_cookie('csrftoken'));
        http_request.setRequestHeader('contentType', 'application/json');
        //end of setup

        // Send the request as a JSON MAKE SURE TO ALWAYS HAVE THE CSRFTOKEN COOKIE !!! !! ! ! ! !! 
        http_request.send(
            JSON.stringify(
                {...{'csrfmiddlewaretoken': get_cookie('csrftoken')}, ...payload}
            )
        )

        http_request.onreadystatechange = function () {
            // Process the server response here (Sent from Django view inside JsonResponse)
            if (http_request.readyState === XMLHttpRequest.DONE) {
                if (http_request.status === 200) { //ifstatus is 200 - assume PROPER RESPONSE
                    resolve(JSON.parse(http_request.responseText))
                }
                else { //unhandled error
                    alert("Unkown server error")
                    return
                }   
            }
        };
    })
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


window.addEventListener("load", main);



