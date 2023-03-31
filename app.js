function debugText(text) {
    document.getElementById("js-tester").innerText = text;
}

const handleOnMouseMove = e => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);

    // debugText(`${target} ${rect} == ${rect.left} ${rect.top} == ${e.clientX} ${e.clientY}`);
}

for(const card of document.querySelectorAll(".tile")) {
    card.onmousemove = e => handleOnMouseMove(e);
}

const myDetails = {
    fullname: "Abhineet Kelley",
    description: "A random guy who enjoys developing desktop and web applications, while brainstorming creative solutions to challenging problems",
    langs: ["Python", "Java", "C++", "JavaScript", "HTML", "CSS"],
    tools: ["JavaFX", "Qt C++", "PyQt5", "tkinter"]
}
const colors = [
    ["red", "#de3b51"],
    ["yellow", "#f0ed4d"],
    ["blue", "#2a4bf5"],
    ["green", "#7bf52a"],
    ["light-blue", "#6bf5ff"],
    ["orange", "#ff9736"],
    ["purple", "#7820e3"]
]

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

const logo = document.getElementById("logo-container");
let initLogoWidth = logo.offsetWidth;
logo.style.setProperty("width", `${parseInt(initLogoWidth)/3}px`)

const coverDiv = document.getElementsByClassName("cover-div")[0];
const bgSVG = document.getElementById("background-svg");
const topDiv = document.getElementsByClassName("top-bar")[0];
const contentDiv = document.getElementsByClassName("content")[0];
const coverDesc = document.getElementsByClassName("content-desc")[0];

function loadCoverDiv(){
    bgSVG.style.setProperty("opacity", "1");
    setTimeout(() => {
        topDiv.style.setProperty("transform","translateY(0%)");
        setTimeout(() => {
            contentDiv.style.setProperty("transform", "translateX(0%)")
            contentDiv.style.setProperty("opacity", "1");
            setTimeout(() => {    
                coverDesc.style.setProperty("opacity", "1");
                setTimeout(() => {
                    logo.style.setProperty("width", `${initLogoWidth}px`);
                }, 1000);
            }, 500);
        }, 300);
    }, 300);
}

function controlCover(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting) loadCoverDiv();
    })
}

let coverIntersectOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6
};

let coverObserver = new IntersectionObserver(controlCover, coverIntersectOptions);
coverObserver.observe(coverDiv);


// skills section
function addSkillsSummary(){
    const mainDiv = document.getElementsByClassName("skills-div")[0];
    
    const skillTitle = document.createElement("h1");
    skillTitle.innerText = "My Skills"

    const langsDiv = document.createElement("div");
    langsDiv.className = "lang-div";
    
    for (const lang in myDetails.langs){
        let ld = document.createElement("div");
        ld.className = "lang-item";
        ld.innerText = myDetails.langs[lang];
        langsDiv.append(ld);
    }

    const toolDiv = document.createElement("div");
    toolDiv.className = "tool-div";

    const toolTitle = document.createElement("h2");
    const toolItems = document.createElement("div");
    toolItems.className = "tool-items";
    for (const tool in myDetails.tools){
        let ld = document.createElement("div");
        ld.className = "tool-item";
        ld.innerText = myDetails.tools[tool];
        toolItems.append(ld);
    }
    
    toolTitle.append(toolItems);
    toolDiv.append(toolTitle);

    mainDiv.append(skillTitle, langsDiv, toolDiv);
}

// second div
const secondDiv = document.getElementsByClassName("second-div")[0];
const codeText = document.getElementById("word-code");
const designWord = document.getElementById("word-design");
const intoWord = document.getElementById("word-into");
const secondh1 = document.getElementById("second-h1");
const codeCursor = document.getElementById("cursor");

designWord.style.setProperty("background-color", "transparent");
designWord.style.setProperty("opacity", "0");
intoWord.style.setProperty("opacity", "0");
secondh1.style.setProperty("opacity", "0");
codeCursor.style.setProperty("visibility", "hidden")

let busy = false;

function loadDecoration() {
    const bars = document.getElementsByClassName("decoration-bar");
    for(let i in bars){
        bars[i].style = "opacity: 1;"
    }
    secondh1.style.setProperty("opacity", "1");
    designWord.style.setProperty("background-color", "rgba(var(--sig-red), 0.2)");
    setTimeout(() => {
        designWord.style.setProperty("opacity", "1");
        setTimeout(() => {
            intoWord.style.setProperty("opacity", "1");
            if(busy) return;
            if(codeText.innerText.length > 1) untypeCode();
            setTimeout(() => {
                codeCursor.style.setProperty("visibility", "visible");
                setTimeout(typeCode, 300);
            }, 800);
        }, 500);
    }, 700);
}

function typeCode() {
    codeText.innerText = "C";
    setTimeout(() => {
        codeText.innerText = "Co";
        setTimeout(() => {
            codeText.innerText = "Cod";
            setTimeout(() => {
                codeText.innerText = "Code";
                busy = false;
                setTimeout(switchBorderRadius, 300);
            }, 200);
        }, 100);
    }, 200);
}
function untypeCode() {
    if(busy) return;
    busy = true;
    codeText.innerText = "Cod";
    setTimeout(() => {
        codeText.innerText = "Co";
        setTimeout(() => {
            codeText.innerText = "C";
            setTimeout(() => {
                codeText.innerText = "";
            }, 200);
        }, 200);
    }, 100);
}

function controlDecoration(entries, observer)
{
  entries.forEach(entry => {
    if(entry.isIntersecting){
        loadDecoration();
    }
  });
}

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6
};

let observer = new IntersectionObserver(controlDecoration, options);
observer.observe(secondDiv);

const brvalues = ["2rem 10rem 2rem 10rem", "10rem 2rem 10rem 2rem"];
let curr = 0;
function switchBorderRadius(){
    designWord.style.setProperty("border-radius", brvalues[curr%brvalues.length])
    curr++;
}

switchBorderRadius();
designWord.onmouseover = switchBorderRadius

// third div
thirdDiv = document.getElementsByClassName("third-div")[0];
focusTitle = document.getElementById("focus-title");
const focusItems = document.getElementsByClassName("focus-item");
const shapesDiv = document.getElementsByClassName("shapes")[0];
const textCr = document.getElementById("focus-creativity");
const textSi = document.getElementById("focus-simplicity");
const textPe = document.getElementById("focus-perfection");

function loadThirdDiv(){
    focusTitle.style.setProperty("transform", "translateX(0rem)");

    let time = 300;
    for(const i in focusItems){
        setTimeout(() => {
            focusItems[i].style.setProperty("transform", "translateY(0rem)")
            focusItems[i].style.setProperty("opacity", "1");
        }, time);
        time += 400
    }
}

function resetThirdDiv(){
    focusTitle.style.setProperty("transform", "translateX(-4rem)")
}

function controlFocusDiv(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            loadThirdDiv();
        }
        else {
            resetThirdDiv();
        }
    })
}

let secondObserver = new IntersectionObserver(controlFocusDiv, options);
secondObserver.observe(thirdDiv);

// shapes
const shapes = 7;

const idleWH = ["14em", "11em"]
const idleCoords = [
    "0em, 0em", "6em, 2em", 
    "3em, 4em", "10em, 1em", 
    "2em, 6em", "5em, 6em", 
    "10em, 5em"
]
const squareWH = ["10em", "10em"]
const squareCoords = [
    "0em, 0em", "6em, 0em", 
    "0em, 4em", "3em, 4em", 
    "0em, 6em", "3em, 8em", 
    "8em, 4em"
]

const circularWH = ["20em", "12em"]
const circularCoords = [
    "0em, 0em", 
    "14em, -0.7em", 
    "8em, -0.5em", 
    "13em, 10em", 
    "6em, 11em", 
    "0em, 9em", 
    "16em, 3.4em"
]
const circularAngles = [135, 45, 0, 135, 90, 135, 90]

const funnyWH = ["15em", "15em"]
const funnyCoords = [
    "10em, 10em", 
    "10em, 10em", 
    "10em, 10em", 
    "10em, 10em", 
    "10em, 10em", 
    "10em, 10em", 
    "10em, 10em"
]
const funnyAngles = [0, 0, 0, 0, 0, 0, 0]

function makeIdleShape(){
    for(let i=0; i<shapes; i++){
        const shape = document.getElementById(`shape${i+1}`);
        shape.style.setProperty("transform", `translate(${idleCoords[i]})`);
        shape.style.setProperty("border-radius", "12rem")
    }
    shapesDiv.style.setProperty("width", idleWH[0]);
    shapesDiv.style.setProperty("height", idleWH[1]);
}

function makeSquare(){
    for(let i=0; i<shapes; i++){
        const shape = document.getElementById(`shape${i+1}`);
        shape.style.setProperty("transform", `translate(${squareCoords[i]})`);
        shape.style.setProperty("border-radius", "2rem")
    }
    shapesDiv.style.setProperty("width", squareWH[0]);
    shapesDiv.style.setProperty("height", squareWH[1]);
}

function makeCircular(){
    for(let i=0; i<shapes; i++){
        const shape = document.getElementById(`shape${i+1}`);
        shape.style.setProperty("transform", `translate(${circularCoords[i]}) rotate(${circularAngles[i]}deg)`);
        shape.style.setProperty("border-radius", "12rem")
    }
    shapesDiv.style.setProperty("width", circularWH[0]);
    shapesDiv.style.setProperty("height", circularWH[1]);
}

function makeFunnyShape(){
    for(let i=0; i<shapes; i++){
        const shape = document.getElementById(`shape${i+1}`);
        shape.style.setProperty("transform", `translate(${funnyCoords[i]}) rotate(${funnyAngles[i]}deg)`);
        shape.style.setProperty("border-radius", "12rem")
    }
    shapesDiv.style.setProperty("width", funnyWH[0]);
    shapesDiv.style.setProperty("height", funnyWH[1]);
}

makeIdleShape();
makeFunnyShape();

textCr.onmouseenter = makeFunnyShape;
textCr.onmouseleave = makeIdleShape;

textSi.onmouseenter = makeCircular;
textSi.onmouseleave = makeIdleShape;

textPe.onmouseenter = makeSquare;
textPe.onmouseleave = makeIdleShape;
