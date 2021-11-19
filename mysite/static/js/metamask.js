ajax_script = {}

function main() {

    login_button = document.getElementsByClassName("metamask_login_button")[0]

    ajax_button = document.getElementById("ajax_test")
    
    ajax_script = ajax_button.dataset.json
    console.log(JSON.parse(ajax_script))

    Moralis.initialize("5rreQED2xNHYym6yIRdpRdG21XXiwUV7en5biB3y"); // Application id from moralis.io
    Moralis.serverURL = "https://6hrohfqr0ddj.usemoralis.com:2053/server"; //Server url from moralis.io
    login_button.addEventListener("click", function() {
        login().then().catch(error => create_notification("Connection error", error.message, duration = 10000, "error"))
    })
}

async function login() {
    console.log("login clicked");
    var user = await Moralis.Web3.authenticate();

    if (user) {
        create_notification("Connection status", "Wallet connected succesfully!", duration = 10000, "success")
        console.log(user);
        
        user.set("nickname", "Caleb");
        user.set("fav_color", "blue");
        user.save();
        console.log(user.get("nickname"));
    }

}


function ajax_server_post(url) {

    //HTTPREQUEST INIT CODE
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        http_request = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
        http_request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //HTTPREQUEST INIT CODE

    http_request.onreadystatechange = function() {
        // Process the server response here (Sent from Django view inside JsonResponse)
        if (http_request.readyState === XMLHttpRequest.DONE) {

            if (http_request.status === 200) { //Status can also be different and defined within the JSONResponse
                var response = JSON.parse(http_request.responseText)

                alert(response["server_message"]) //access specific key from the reponse object - we only pass server message in this example

            } else { //if status is not 200 - assume fail, unless different status handled explicitly
                alert('There was a problem with the request.');
            }
        }
    };

    // Send the POST request to the url/DJANGO VIEW
    //setup for request header - not important
    http_request.open('POST', url, true);
    http_request.setRequestHeader('X-CSRFToken', get_cookie('csrftoken'));
    http_request.setRequestHeader('contentType', 'application/json');
    //end of setup

    // Send the request as a JSON MAKE SURE TO ALWAYS HAVE THE CSRFTOKEN COOKIE !!! !! ! ! ! !! 
    http_request.send(
        JSON.stringify(
            {'csrfmiddlewaretoken' : get_cookie('csrftoken'), //compulsory
            'ajax_test': "This is a test message, from the clientside JS" //can add as many other entries to dict as necessary
            })
        )
}


window.addEventListener("load", main);