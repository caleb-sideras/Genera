//recolor the notification colors - already done the warning one
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
    // Select the button
    const btn = document.querySelector(".btn-toggle");

    // Listen for a click on the button
    btn.addEventListener("click", function () {
        // Then toggle (add/remove) the .dar k-theme class to the body
        document.body.classList.toggle("dark-mode");
        console.log("dark modee");
    });
}



window.addEventListener("load", main);



