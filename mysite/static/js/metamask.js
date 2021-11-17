function main() {
    console.log("METAMASK")
    login_button = document.getElementsByClassName("metamask_login_button")[0]
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

window.addEventListener("load", main);