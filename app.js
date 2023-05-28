lightTheme = false;

function debugText(text) {
    document.getElementById("js-tester").innerText = text;
}

// useful functions
function runAfter(func, duration){
    const init = performance.now();

    function check(){
        let elapsed = performance.now() - init;
        if(elapsed >= duration){
            try {
                func();
            } catch (error) {
                // Handle the error here
                console.error('An error occurred:', error);
            }
            return;
        }
        requestAnimationFrame(check);
    }
    requestAnimationFrame(check);
}

function styleAfter(element, attr, value, duration){
    if(element == null || element.nodeType != 1){
        console.log(`${element} doesn't exist`)
        return;
    }
    const init = performance.now();

    function check(){
        let elapsed = performance.now() - init;
        if(elapsed >= duration){
            element.style.setProperty(attr, value);
            return;
        }
        requestAnimationFrame(check);
    }
    requestAnimationFrame(check);
}

function stylesAfter(... eleAttrValDurs){
    init = performance.now();
    let time = 0
    for(const [ele, attr, val, dur] of eleAttrValDurs){
        time += dur;
        styleAfter(ele, attr, val, time);
    }
}

// DOM stuff
const handleOnMouseMove = e => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);

    // debugText(`${target} ${rect} == ${rect.left} ${rect.top} == ${e.clientX} ${e.clientY}`);
}

const lampString = document.getElementsByClassName("lamp-string")[0];
const docElement = document.documentElement;

if(lightTheme){
    docElement.classList.add("light-mode");
}

if(docElement.classList.contains("light-mode")){
    lampString.classList.add("string-pulled-down")
}

function toggleTheme() {
    lampString.classList.toggle('string-pulled-down');
    runAfter(()=>{docElement.classList.toggle('light-mode');}, 300);
}
but = document.getElementsByClassName("theme-switch-div")[0];
but.onclick = toggleTheme;

for(const card of document.querySelectorAll(".tile")) {
    card.onmousemove = e => handleOnMouseMove(e);
}

const myDetails = {
    fullname: "Abhineet Kelley",
    description: "A Desktop App Developer currently transitioning to Full-Stack Web Development, focused on crafting memorable products",
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

const logotext = document.getElementById("logotext");
const logoContainer = document.getElementById("logo-container");

const coverDiv = document.getElementsByClassName("cover-div")[0];
const bgSVG = document.getElementById("background-svg");
const topDiv = document.getElementsByClassName("top-bar")[0];
const contentDiv = document.getElementsByClassName("content")[0];
const coverDesc = document.getElementsByClassName("content-desc")[0];

styleAfter(topDiv, "transform", "translateY(0%)", 500)

function loadCoverDiv(){
    stylesAfter(
        [bgSVG, "opacity", "1", 0],
        [contentDiv, "transform", "translateX(0%)", 300],
        [contentDiv, "opacity", "1", 0],
        [coverDesc, "opacity", "1", 500]
    )
}

function controlCover(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting) loadCoverDiv();
    })
}

let coverIntersectOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
};

let coverObserver = new IntersectionObserver(controlCover, coverIntersectOptions);
coverObserver.observe(coverDiv);

function hideLogo() {
    logotext.style.setProperty("transform", `translateX(-30%)`);
    logotext.style.setProperty("opacity", "0");
}

function showLogo() {
    logotext.style.setProperty("transform", `translateX(0)`);
    logotext.style.setProperty("opacity", "1")
}

function controlTopBarTransparency(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            topDiv.style.setProperty("background","rgb(0, 0, 0, 0)"); 
            topDiv.style.setProperty("border-color", "transparent");
            topDiv.style.setProperty("box-shadow", "0 4px 16px rgba(0, 0, 0, 0)");
            logoContainer.onmouseenter = showLogo
            logoContainer.onmouseleave = null
            runAfter(showLogo, 600)
        }
        else{
            topDiv.style.setProperty("background","rgb(var(--major-bg))"); 
            topDiv.style.setProperty("border-color", "rgba(var(--white), 0.1)");
            topDiv.style.setProperty("box-shadow", "0 4px 16px rgba(0, 0, 0, 0.4)");
            logoContainer.onmouseenter = showLogo
            logoContainer.onmouseleave = hideLogo
            runAfter(hideLogo, 600)
        }
    })
}

let topbarTransparencyObserver = new IntersectionObserver(
    controlTopBarTransparency,
    {
        root: null,
        rootMargin: '0px',
        threshold: 0.9
    }
);
topbarTransparencyObserver.observe(coverDiv)

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
    stylesAfter(
        [designWord, "opacity", "1", 400],
        [intoWord, "opacity", "1", 400],
        [codeCursor, "visibility", "visible", 400]
    )
    if(busy) return;
    if(codeText.innerText.length > 1) {
        runAfter(untypeCode, 600);
        runAfter(typeCode, 1600);
    }
    else{
        runAfter(typeCode, 1200)
    }
}

function typeCode() {
    busy = true;
    codeText.innerText = "C";
    runAfter(()=>{codeText.innerText = "Co"}, 200)
    runAfter(()=>{codeText.innerText = "Cod"}, 400)
    runAfter(()=>{codeText.innerText = "Code"}, 600)
    runAfter(()=>{busy=false}, 1600);
}

function untypeCode() {
    if(busy) return;
    busy = true;
    codeText.innerText = "Cod";
    runAfter(()=>{codeText.innerText = "Co"}, 200)
    runAfter(()=>{codeText.innerText = "C"}, 400)
    runAfter(()=>{codeText.innerText = ""}, 600)
}

function controlDecoration(entries, observer)
{
  entries.forEach(entry => {
    if(entry.isIntersecting){
        runAfter(loadDecoration, 100)
    }
  });
}

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
};

let observer = new IntersectionObserver(controlDecoration, options);
observer.observe(secondDiv);

const brvalues = ["2rem 7rem 2rem 7rem", "7rem 2rem 7rem 2rem"];
let curr = 0;
function switchBorderRadius(){
    designWord.style.setProperty("border-radius", brvalues[curr%brvalues.length])
    curr++;
}

switchBorderRadius();
designWord.onmouseover = switchBorderRadius

// about me div


// third div
const thirdDiv = document.getElementsByClassName("third-div")[0];
const focusTitle = document.getElementById("focus-title");
const focusItems = document.getElementsByClassName("focus-item");
const shapesDiv = document.getElementsByClassName("shapes")[0];
const textCr = document.getElementById("focus-creativity");
const textSi = document.getElementById("focus-simplicity");
const textPe = document.getElementById("focus-perfection");

// shapes
const shapes = 7;
const perfection_letters = document.getElementsByClassName("letter");
const simpl_letters = document.getElementsByClassName("s-letter");
const creat_letters = document.getElementsByClassName("c-letter");

const letter_shuffle = [0.3, -0.3, 0.3, -0.3, 0.3, -0.3, 0.3, -0.3, 0.3, -0.3, 0.3, -0.3, 0.3, -0.3, 0.3, -0.3, 0.3, -0.3, 0.3, -0.3]

const idleWH = ["14em", "11em"]
const idleCoords = [
    "-7em, -5em", "-1em, -3em", 
    "-4em, -1em", "3em, -4em", 
    "-5em, 1em", "-2em, 1em", 
    "3em, 0em"
]
const squareWH = ["10em", "10em"]
const squareCoords = [
    "-5em, -5em", "1em, -5em", 
    "-5em, -1em", "-2em, -1em", 
    "-5em, 1em", "-2em, 3em", 
    "3em, -1em"
]

const circularWH = ["20em", "12em"]
const circularCoords = [
    "-10em, -6em", 
    "4em, -6.7em", 
    "-2em, -6.5em", 
    "3em, 4em", 
    "-4em, 5em", 
    "-10em, 3em", 
    "6em, -2.6em"
]
const circularAngles = [135, 45, 0, 135, 90, 135, 90]

const funnyWH = ["15em", "15em"]
const funnyCoords = [
    "-3.5em, -5.5em", 
    "0em, 2.5em", 
    "-2em, -7.5em", 
    "-3em, -1.5em", 
    "-4em, 2.5em", 
    "-7.5em, -6.5em", 
    "3em, -5.5em"
]
const funnyAngles = [0, 0, 0, 0, 0, 45, 150]

let hoverEffectsEnabled = false;

function makeIdleShape(){
    for(let i=0; i<shapes; i++){
        const shape = document.getElementById(`shape${i+1}`);
        shape.style.setProperty("transform", `translate(${idleCoords[i]})`);
        shape.style.setProperty("border-radius", "12rem")
    }
    // shapesDiv.style.setProperty("width", idleWH[0]);
    // shapesDiv.style.setProperty("height", idleWH[1]);
}

// Creativity
function funnyTextEffects(){
    for(let i=0; i<creat_letters.length; i++){
        creat_letters[i].style.setProperty("transform", `translateY(0rem)`)
        creat_letters[i].style.color = "rgb(var(--sig-orange))"
    }
};
function undoFunnyTextEffects(idleShape = true){
    for(let i=0; i<creat_letters.length; i++){
        creat_letters[i].style.setProperty("transform", `translateY(${letter_shuffle[i]}rem)`)
        creat_letters[i].style.color = "rgb(var(--white))"
    }
}
function makeFunnyShape(){
    for(let i=0; i<shapes; i++){
        const shape = document.getElementById(`shape${i+1}`);
        shape.style.setProperty("transform", `translate(${funnyCoords[i]}) rotate(${funnyAngles[i]}deg)`);
        shape.style.setProperty("border-radius", "1rem")
    }
}

// Simplicity
function circularTextEffects(){
    for(let i=0; i<simpl_letters.length; i++){
        simpl_letters[i].style.setProperty("transform", `translateY(0rem)`);
        simpl_letters[i].style.setProperty("color", "rgb(var(--sig-orange))")
    }
}
function undoCircularTextEffects(idleShape = true){
    for(let i=0; i<simpl_letters.length; i++){
        simpl_letters[i].style.setProperty("transform", `translateY(${letter_shuffle[i]}rem)`);
        simpl_letters[i].style.setProperty("color", "rgb(var(--white))")
    }
}
function makeCircular(){
    for(let i=0; i<shapes; i++){
        const shape = document.getElementById(`shape${i+1}`);
        shape.style.setProperty("transform", `translate(${circularCoords[i]}) rotate(${circularAngles[i]}deg)`);
        shape.style.setProperty("border-radius", "12rem")
    }
}

// Perfection
function squareTextEffects(){
    for(let i=0; i<perfection_letters.length; i++){
        perfection_letters[i].style.setProperty("transform", `translateY(0rem)`);
        perfection_letters[i].style.setProperty("color", "rgb(var(--sig-orange))")
    }
}
function undoSquareTextEffects(idleShape = true){
    for(let i=0; i<perfection_letters.length; i++){
        perfection_letters[i].style.setProperty("transform", `translateY(${letter_shuffle[i]}rem)`);
        perfection_letters[i].style.setProperty("color", "rgb(var(--white))")
    }
}
function makeSquare(){
    for(let i=0; i<shapes; i++){
        const shape = document.getElementById(`shape${i+1}`);
        shape.style.setProperty("transform", `translate(${squareCoords[i]})`);
        shape.style.setProperty("border-radius", "2rem")
    }
}

// Hover and Hover out functions
function funnyHover(){
    if(!hoverEffectsEnabled) return;
    makeFunnyShape();
    funnyTextEffects();
}
function circularHover(){
    if(!hoverEffectsEnabled) return;
    makeCircular();
    circularTextEffects();
}
function squareHover(){
    if(!hoverEffectsEnabled) return;
    makeSquare();
    squareTextEffects();
}

function funnyHoverOut(){
    if(!hoverEffectsEnabled) return;
    makeIdleShape();
    undoFunnyTextEffects();
}
function circularHoverOut(){
    if(!hoverEffectsEnabled) return;
    makeIdleShape();
    undoCircularTextEffects();
}
function squareHoverOut(){
    if(!hoverEffectsEnabled) return;
    makeIdleShape();
    undoSquareTextEffects();
}

function idleTextEffects(idleShape = true){
    undoSquareTextEffects(idleShape);
    undoCircularTextEffects(idleShape);
    undoFunnyTextEffects(idleShape);
    if(idleShape) makeIdleShape();
}

textCr.onmouseover = funnyHover;
textCr.onmouseleave = funnyHoverOut;

textSi.onmouseover = circularHover;
textSi.onmouseleave = circularHoverOut;

textPe.onmouseover = squareHover;
textPe.onmouseleave = squareHoverOut;

const shapeFuncs = [
    [makeFunnyShape, funnyTextEffects, undoFunnyTextEffects], 
    [makeCircular, circularTextEffects, undoCircularTextEffects], 
    [makeSquare, squareTextEffects, undoSquareTextEffects]];

let firstTime = true;

function loadThirdDiv(){
    focusTitle.style.setProperty("transform", "translateX(0rem)");
    focusTitle.style.setProperty("opacity", "1")

    let time = 700;
    helpText = document.getElementById("hover-help");

    for(let i = 0; i < shapeFuncs.length; i++){
        runAfter(()=>{
            focusItems[i].style.setProperty("transform", "translateY(0rem)");
            focusItems[i].style.setProperty("opacity", "1");
            
            if(firstTime) {
                shapeFuncs[i][0]();  // change the shapes arrangement on first run
            }
            runAfter(shapeFuncs[i][2], 800);
            shapeFuncs[i][1]();

            if(firstTime && i == shapeFuncs.length-1){
                runAfter(()=>{
                    makeIdleShape();
                    hoverEffectsEnabled = true;
                }, 850);
            }
        }, time)

        time += 850
    }
    
    runAfter(()=>{firstTime=false}, time)
}

function resetThirdDiv(){
    focusTitle.style.setProperty("transform", "translateX(-4rem)");
    focusTitle.style.setProperty("opacity", "0");
}

function controlFocusDiv(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            runAfter(loadThirdDiv, 100);
        }
        else {
            runAfter(resetThirdDiv, 100);
        }
    })
}

let secondObserver = new IntersectionObserver(controlFocusDiv, options);
secondObserver.observe(thirdDiv);
