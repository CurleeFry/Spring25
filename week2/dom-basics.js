const addImg = document.createElement("img");
addImg.setAttribute("src", "https://picsum.photos/seed/picsum/200/300");
addImg.setAttribute("alt", "I found this bad boy on picsum. Oh yeah.")
document.body.appendChild(addImg);

const divTime = document.createElement("div");
divTime.innerHTML = "<h2>DOM Basics<h2><li><p>This was added through Javascript</p><h2><li><p>This is another certified Austin C classic</p><h2>"
document.body.appendChild(divTime);
// const newDiv = document.createElement("div");
// newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li></ul>";
// document.body.appendChild(newDiv);