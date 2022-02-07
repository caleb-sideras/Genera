//recolor the notification colors - already done the warning one
ajax_url = null
function create_notification(title, message, duration = 5000, theme) { // success, info, warning, error, and none
    window.createNotification({ theme: theme, showDuration: duration })({ title: title, message: message })
}

function create_server_notification() { // success, info, warning, error, and none
    //if server message exists, create notification
    if (typeof(document.getElementById("server_message")) != 'undefined' && document.getElementById("server_message") != null) {
        var [server_message, message_type] = document.getElementById("server_message").value.split("$") 
        
        create_notification("Server message", server_message, duration=100000, theme=message_type)
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
    

    //dark mode switch
    document.querySelector(".btn_toggle").addEventListener("click", function () {
        if (localStorage.dark_mode) {
            localStorage.removeItem("dark_mode");
            document.documentElement.classList.remove("dark-mode-root");
        } else {
            localStorage.dark_mode = true;
            document.documentElement.classList.add("dark-mode-root");
        }
    }); 
    

    const burger_btn = document.querySelector(".burger_toggle");
    burger_btn.addEventListener("click", function () {
        const burger_navbar = document.querySelector(".burger_navbar");
        if (burger_navbar.style.display == "none") {
            burger_navbar.style.display = "block"
        }
        else{
            burger_navbar.style.display = "none"
        }

    })
    //showcase of new ajax function
    if (typeof(document.getElementById("button")) != 'undefined' && document.getElementById("button") != null) {
        document.getElementById("button").addEventListener("click", function() {
            ajax_post_json({"hello":"there"}) //plug in the JSON here that you wish to send to the server. Cookies and certificates are all handled in the function

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
        field_object.classList = "field_error"
        field_object.title = "Field is empty"
        return
    }

    ajax_post_json({"field_name": field_object.name, "field_content": field_object.value})

    .then(function(response) {
        if (response["passed"] == 1) {
            field_object.classList.add("field_success")
            field_object.classList.remove("field_error")
            field_object.setCustomValidity("")
            field_object.removeAttribute("title")
        }
        else if (response["passed"] == 0) {
            field_object.classList.add("field_error")
            field_object.classList.remove("field_success")
            field_object.setCustomValidity(response["message"])
            field_object.title = response["message"]
        }
    })
}

function ajax_post_factory(post_type) { //currently supports JSON and FORM data

    var generated_post_function = (payload) => {
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

            if (post_type == "JSON") {
                http_request.setRequestHeader('Content-Type', 'application/json');
                http_request.send(
                    JSON.stringify(
                        {...{'csrfmiddlewaretoken': get_cookie('csrftoken')}, ...payload}
                    )
                )
            }
            else 
                http_request.send(payload)

            http_request.onreadystatechange = function () {
                // Process the server response here (Sent from Django view inside JsonResponse)
                if (http_request.readyState === XMLHttpRequest.DONE) {
                    if (http_request.status === 200) { //ifstatus is 200 - assume PROPER RESPONSE
                        console.log(JSON.parse(http_request.responseText))
                        resolve(JSON.parse(http_request.responseText))
                    }
                    else if (http_request.status === 201) { //handled response from Django view
                        close_loading_popup()
                        response = JSON.parse(http_request.responseText)
                        if (response["url"])
                            window.location.replace(response["url"]) //server redirect - imitate return redirect(reverse(...)) from django view for ajax stuff
                        else{
                            resolve(JSON.parse(http_request.responseText))
                        }
                        return
                    }
                    else if (http_request.status === 202) { // error messages
                        let parsed_json = JSON.parse(http_request.responseText)
                        alert(parsed_json['server_message'])
                    }
                    else { //unhandled error
                        alert("Unkown server error")
                        return
                    }   
                }
            };
        })
    }

    return generated_post_function
}

ajax_post_json = ajax_post_factory("JSON")
ajax_post_form = ajax_post_factory("FORM")

function create_and_render_loading_popup(heading = "Generating Collection", subheading = "Please don't close this window. Higher resolutions and collection sizes will result in longer generation times...") { //Not recommended to use more than 3 words - ull need to hard code edge cases for the offsets more.
    //CREATES THE LOOP ANIMATION IN THE CENTER OF THE SCREEN
    document.body.classList.add('disable_scrolling');
    let pop_up_code = 
    `<div id="disable_div"></div>
    <div class="deploy_collection_container border rounded_container_no_padding" style="display: flex; z-index: 2;" id="deploy_collection_container">
        <div class="dc_content">
            <div class="dc_status_container">
                <div class="dc_status_sections">
                    <div style="text-align: left;">
                        <div class="dc_status_dot" id="dc_status_4"></div>
                        <p style="margin-left: -35px;">Generating Collection</p>
                    </div>
                    <div></div>
                    <div></div>
                    <div style="text-align: right;">
                        <div class="dc_status_dot" id="dc_status_4" style="left: 83.5%;"></div>
                        <p>Redirect to Collection</p>
                    </div>
                </div>
                <div class="dc_status_bar_container sub_color_background">
                    <div class="dc_status_bar_active main_color_background"></div>
                </div>
            </div>
            <h2>${heading}</h2>
            <h4>${subheading}</h4>
            <div class="dc_body">
                <div class="spinner" style="display: flex">
                    <div class="rect1" id="spin1"></div>
                    <div class="rect1" id="spin2"></div>
                    <div class="rect1" id="spin3"></div>
                    <div class="rect1" id="spin4"></div>
                    <div class="rect1" id="spin5"></div>
                </div>
                <div class="input_wrapper"></div>
            </div>
            <div class="dc_buttons">
            </div>
        </div>
    </div>`
    document.body.appendChild(document.createRange().createContextualFragment(pop_up_code))
}

function close_loading_popup() {
    if (document.contains(document.getElementById("deploy_collection_container"))) {
        document.body.classList.remove('disable_scrolling');
        document.getElementById("deploy_collection_container").remove()
        document.getElementById("disable_div").remove()
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
        yes_button.onclick = () => {res(true), close_yes_no_popup()};
        no_button.onclick = () => {res(false), close_yes_no_popup()};
    });
}

function close_yes_no_popup() {
    if (document.getElementsByClassName("popup_wrapper")[0]){
        document.getElementsByClassName("popup_wrapper")[0].remove()
    }
}

function button_cooldown(){

}

Object.prototype.isEmpty = function() { //check if object is empty
    for (var prop in this) if (this.hasOwnProperty(prop)) return false;
    return true;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

window.addEventListener("load", main);



