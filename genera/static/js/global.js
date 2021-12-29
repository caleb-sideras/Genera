//recolor the notification colors - already done the warning one
ajax_url = null
function create_notification(title, message, duration = 5000, theme) { // success, info, warning, error, and none
    window.createNotification({ theme: theme, showDuration: duration })({ title: title, message: message })
}

function create_server_notification() { // success, info, warning, error, and none
    //if server message exists, create notification
    if (typeof(document.getElementById("server_message")) != 'undefined' && document.getElementById("server_message") != null) {
        var [server_message, message_type] = document.getElementById("server_message").value.split("$") 
        
        create_notification("Server message", server_message, duration=1000000, theme=message_type)
    }
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

    create_server_notification()
    
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

    //if value is empty, show error img color tick
    if (field_object.value == "") {
        field_object.style.background = "url('/static/icons/remove.svg') no-repeat right";
        field_object.style.backgroundSize = "20px"
        field_object.classList.add("error_img_color")
        field_object.title = response["message"]
        return
    }

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
                    // close_loading_popup()
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

function create_and_render_loading_popup(heading = "Loading") { //Not recommended to use more than 3 words - ull need to hard code edge cases for the offsets more.
    //CREATES THE LOOP ANIMATION IN THE CENTER OF THE SCREEN
    document.body.classList.add('disable_scrolling');
    let popup_course_code = '<div id="loading_animation_wrapper"> <svg> <filter id="glowfloxs"> <feGaussianBlur in="SourceGraphic" stdDeviation="10"/> <feColorMatrix values=" 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"></feColorMatrix> </filter> </svg> <div class="loader"> <span style="--i:1;"></span><span style="--i:2;"></span><span style="--i:3;"></span><span style="--i:4;"></span><span style="--i:5;"></span><span style="--i:6;"></span><span style="--i:7;"></span><span style="--i:8;"></span><span style="--i:9;"></span><span style="--i:10;"></span><span class="rotate" style="--watet:0;"></span><span class="rotate" style="--watet:2;"></span><span class="rotate" style="--watet:3;"></span><span class="rotate" style="--watet:4;"></span><span class="rotate" style="--watet:5;"></span><span class="rotate" style="--watet:6;"></span><span class="rotate" style="--watet:7;"></span> </div></div>';
    document.body.appendChild(document.createRange().createContextualFragment(popup_course_code))

    //CREATES THE ANIMATED TEXT ABOVE
    wrapper = document.createElement("div")
    wrapper.id = "animated_loading_text_area"

    var current_top_offset = 0
    word_split = heading.split(" ")
    
    word_split.forEach(word => {
        wrapper.appendChild(document.createRange().createContextualFragment(`<div class="animated_words_wrapper" style="top: ${current_top_offset}em"> <div class="animated_words"> <h2>${word}</h2> <h2>${word}</h2> </div></div>`))
        current_top_offset += 7
    });

    document.body.appendChild(wrapper)
}

function close_loading_popup() {
    if (document.contains(document.getElementById("loading_animation_wrapper"))) {
        document.body.classList.remove('disable_scrolling');
        document.getElementById("loading_animation_wrapper").remove()
        document.getElementById("animated_loading_text_area").remove()     
    }
}

async function yes_no_popup(query, yes, no){
    document_body = document.body

    popup_container = document.createElement('div')
    popup_container.classList = "popup_wrapper"

    yes_no_container = document.createElement('div')
    yes_no_container.classList = 'yes_no_container rounded_container'

    query_container = document.createElement('div')
    query_container.classList = 'query rounded_container'
    query_container.innerHTML = query

    buttons_containers = document.createElement('div')
    buttons_containers.classList = 'yes_no rounded_container'

    yes_button = document.createElement('div')
    yes_button.classList = "rounded_container"
    yes_button.style = "background: red;"
    yes_button.innerHTML = yes
    
    no_button = document.createElement('div')
    no_button.classList = "rounded_container"
    no_button.style = "background: var(--border-color);"
    no_button.innerHTML = no

    buttons_containers.appendChild(yes_button)
    buttons_containers.appendChild(no_button)

    yes_no_container.appendChild(query_container)
    yes_no_container.appendChild(buttons_containers)
    popup_container.appendChild(yes_no_container)
    document_body.prepend(popup_container)
    
    return new Promise((res) => {
        yes_button.onclick = () => res(true);
        no_button.onclick = () => res(false);
    });
}

function close_yes_no_popup() {
    document.getElementsByClassName("popup_wrapper")[0].remove()
}

window.addEventListener("load", main);



