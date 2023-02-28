const handleOnMouseMove = e => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);

    document.getElementById("js-tester").innerText = `${target} ${rect} == ${rect.left} ${rect.top} == ${e.clientX} ${e.clientY}`;
}

for(const card of document.querySelectorAll(".tile")) {
    card.onmousemove = e => handleOnMouseMove(e);
}

const myDetails = {
    fullname: "Abhineet Kelley",
    description: "A random guy who likes making Desktop and Web Applications, in addition to Graphic Designing. I always find unique solutions to problems and I love exploring & learning new technologies.",
    languages: ["Python", "Java", "HTML", "CSS", "JavaScript"],
    skills: ["JavaFX", "Qt", "Git", "tkinter"]
}

function contentTitle(){
    const titleDiv = document.createElement("div");
    titleDiv.className = "content-title";

    const nameSpan = document.createElement("span");
    nameSpan.id = "fullname";
    nameSpan.innerHTML = myDetails.fullname;
    
    titleDiv.innerHTML = "Hi, I am ";
    titleDiv.append(nameSpan);

    return titleDiv;
}

function contentDescription(){
    const descDiv = document.createElement("div");
    descDiv.className = "content-desc";

    descDiv.innerText = myDetails.description;
    return descDiv;
}

function addContent(){
    const parent = document.getElementsByClassName("content")[0];

    const mainDiv = document.createElement("div");
    mainDiv.append(contentTitle(), contentDescription())

    parent.append(mainDiv);
}

addContent();

window.onload = setTimeout(loadVisuals, 300);
const logo = document.getElementById("logo-container");
const bgSVG = document.getElementById("background-svg");
const topDiv = document.getElementsByClassName("top-bar")[0];
const coverDiv = document.getElementsByClassName("content")[0];
const coverDesc = document.getElementsByClassName("content-desc")[0];

function loadVisuals(){
    bgSVG.style.setProperty("opacity", "1");
    setTimeout(loadTopBar, 300);
}

function loadTopBar(){
    topDiv.style.setProperty("transform","translateY(0%)");
    setTimeout(loadCoverContent, 300);
}

function loadCoverContent(){
    coverDiv.style.setProperty("transform", "translateX(0%)")
    coverDiv.style.setProperty("opacity", "1");
    setTimeout(loadCoverDesc, 500);
}

function loadCoverDesc(){
    coverDesc.style.setProperty("opacity", "1");
    setTimeout(loadLogo, 1000);
}

function loadLogo(){
    logo.style.setProperty("width", "240px");
}
