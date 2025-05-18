const menuBtn = document.querySelector("#menuBtn");

function togglemenu() {
    menu = document.querySelector("#hideFxn");
    menu.classList.toggle("hide")
}

function handleResize() {
    menu = document.querySelector("#hideFxn");
    if (window.innerWidth > 1000) {
        menu.classlist.remove("hide");
    } else {
        menu.classList.add("hide");
    }
}


window.addEventListener("resize", handleResize)
menuBtn.addEventListener("click", togglemenu)