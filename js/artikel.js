document.getElementById("artikel-iframe").onload = function() {
    var cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "../css/artikel.css";
    document.head.appendChild(cssLink);
}