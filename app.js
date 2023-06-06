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
styleAfter(bgSVG, "opacity", "1", 0)

function loadCoverDiv(){
    stylesAfter(
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
        [intoWord, "opacity", "1", 700],
        [codeCursor, "visibility", "visible", 700]
    )
    if(busy) return;
    if(codeText.innerText.length > 1) {
        runAfter(untypeCode, 600);
        runAfter(typeCode, 1600);
    }
    else{
        runAfter(typeCode, 1800)
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
aboutMeContent = [
    [
        "User-Centric Development",
        `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="29.879mm" height="29.879mm" version="1.1" viewBox="0 0 29.879 29.879" xmlns="http://www.w3.org/2000/svg">
         <path class="fill-ele" d="m12.168 12.613a0.75 0.75 0 0 0-0.15234 1.0508c0.62471 0.8371 1.333 1.3379 2.0527 1.5391s1.4099 0.09328 1.9609-0.11719c1.1022-0.42094 1.791-1.2539 1.791-1.2539a0.75 0.75 0 0 0-0.07813-1.0586 0.75 0.75 0 0 0-1.0586 0.08008s-0.52503 0.57828-1.1895 0.83203c-0.33221 0.12688-0.66562 0.17172-1.0215 0.07227-0.35587-0.09946-0.77687-0.35102-1.2539-0.99024a0.75 0.75 0 0 0-1.0508-0.1543zm1.7471-1.9074a1.0924 1.0924 0 0 1-1.0924 1.0924 1.0924 1.0924 0 0 1-1.0924-1.0924 1.0924 1.0924 0 0 1 1.0924-1.0924 1.0924 1.0924 0 0 1 1.0924 1.0924zm4.2333 0a1.0924 1.0924 0 0 1-1.0924 1.0924 1.0924 1.0924 0 0 1-1.0924-1.0924 1.0924 1.0924 0 0 1 1.0924-1.0924 1.0924 1.0924 0 0 1 1.0924 1.0924zm-0.0449 4.1163-0.28125 1.4746s1.1026 0.20927 2.2598 1.0859c1.1571 0.87667 2.3316 2.3491 2.4238 5.1016l0.13086 3.9492 1.5-0.05078-0.13281-3.9492c-0.10646-3.1784-1.5766-5.1559-3.0156-6.2461s-2.8848-1.3652-2.8848-1.3652zm-6.418 0s-1.4457 0.27501-2.8848 1.3652c-1.439 1.0902-2.9092 3.0677-3.0156 6.2461l-0.13281 3.9492 1.5 0.05078 0.13086-3.9492c0.092198-2.7524 1.2667-4.2249 2.4238-5.1016 1.1571-0.87667 2.2598-1.0859 2.2598-1.0859zm3.2539-8.8027c-3.164-1e-7 -5.7461 2.5801-5.7461 5.7441 2e-7 3.164 2.5821 5.7461 5.7461 5.7461 3.164-1e-6 5.7441-2.5821 5.7441-5.7461s-2.5801-5.7441-5.7441-5.7441zm0 1.5c2.3534 2e-7 4.2441 1.8908 4.2441 4.2441 0 2.3534-1.8908 4.2461-4.2441 4.2461-2.3534 0-4.2461-1.8927-4.2461-4.2461 0-2.3534 1.8927-4.2441 4.2461-4.2441zm-4e-6 -7.5195c-8.2419-3.9498e-7 -14.939 6.6976-14.939 14.939 0 8.2419 6.6976 14.939 14.939 14.939 8.2419 0 14.939-6.6976 14.939-14.939 1e-6 -8.2419-6.6976-14.939-14.939-14.939zm0 1.5c7.4312 0 13.439 6.0082 13.439 13.439 0 7.4312-6.0082 13.439-13.439 13.439-7.4312 1e-6 -13.439-6.0082-13.439-13.439-4e-7 -7.4312 6.0082-13.439 13.439-13.439z" color="#000000" fill="#e49c3e" stroke-linecap="round" style="-inkscape-stroke:none"/>
        </svg>
        `,
        "I prioritize user experience and think from the user's perspective when creating desktop apps and websites. My focus is on crafting beautiful, bug-free, and easy-to-use applications that seamlessly complement the needs of the users."
    ],
    [
        "Modern & Technical Designs",
        `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="28.635mm" height="30.029mm" version="1.1" viewBox="0 0 28.635 30.029" xmlns="http://www.w3.org/2000/svg">
         <path class="border-ele" d="m13.144 8.7001c-2.0994-0.047992-4.2051 0.78224-5.7069 2.25s-2.3799 3.554-2.3799 5.6539 0.87814 4.1861 2.3799 5.6539 3.6075 2.298 5.7069 2.25c2.1135-0.04832 4.1926-0.98664 5.627-2.5396 1.4344-1.553 2.2051-3.6998 2.0858-5.8105m-4.6268-11.714c8.2546 0.09521 8.092 8.2403 8.092 8.2403 0 0.28038-0.16672 0.5061-0.37381 0.5061h-7.7181c-0.20709 0-0.37381-0.22572-0.37381-0.5061v-7.7342c0-0.28038 0.16672-0.5061 0.37381-0.5061zm-9.4727-3.1904h15.203c2.9921 0 5.4009 2.4088 5.4009 5.4009v16.346c0 2.9921-2.4088 5.4009-5.4009 5.4009h-15.203c-2.9921 0-5.4009-2.4088-5.4009-5.4009v-16.346c0-2.9921 2.4088-5.4009 5.4009-5.4009z" fill="none" stroke="#e49c3e" stroke-width="1.5"/>
        </svg>
        `,
        "I have a strong background in modern UI design and possess both front-end and back-end development skills. I stay updated with the latest technologies and industry trends to provide cutting-edge solutions that meet the evolving needs of clients."
    ],
    [
        "Attention to Detail",
        `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="26.086mm" height="26.015mm" version="1.1" viewBox="0 0 26.086 26.015" xmlns="http://www.w3.org/2000/svg">
         <path d="m10.295 15.688c0.59806 0.59806 2.5597-0.40064-0.84521 3.0043l-5.6056 5.6056c-1.0663 1.0663-2.4062 1.4433-3.0043 0.84521-0.59806-0.59806-0.2211-1.938 0.8452-3.0043l5.6056-5.6056c3.592-3.592 2.4062-1.4433 3.0043-0.8452z" fill="#e49c3e" stroke="#e49c3e" class="fill-ele border-ele"/>
         <path d="m25.44 9.2682a8.693 8.693 0 0 1-8.693 8.693 8.693 8.693 0 0 1-8.693-8.693 8.693 8.693 0 0 1 8.693-8.693 8.693 8.693 0 0 1 8.693 8.693z" fill="none" stroke="#e49c3e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" class="border-ele"/>
         <path d="m16.674 5.4751c-2.0502 0.00319-4.3557 0.97468-6.6508 3.8933 7.0598 8.8457 13.758-0.12247 13.758-0.12247s-3.0543-3.7771-7.1071-3.7708zm0.10904 0.69608c1.749 0 3.1781 1.4291 3.1781 3.1781 0 1.749-1.4291 3.1776-3.1781 3.1776-1.749 0-3.1781-1.4286-3.1781-3.1776 0-1.749 1.4291-3.1781 3.1781-3.1781zm0 1.093c-1.1584 0-2.0846 0.92675-2.0846 2.0851 0 1.1584 0.92622 2.0846 2.0846 2.0846s2.0852-0.92623 2.0851-2.0846c0-1.1584-0.92665-2.0852-2.0851-2.0851z" fill="#e49c3e" class="fill-ele"/>
        </svg>
        `,
        "I pay meticulous attention to detail, ensuring that no aspect of the application is overlooked. I believe that even the smallest details can make a big difference in the overall impression and usability of an application."
    ],
    [
        "Creative Problem-Solving", 
        `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="28.31mm" height="28.846mm" version="1.1" viewBox="0 0 28.31 28.846" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-ele" d="m13.405 19.326c-0.11776 0.02498-0.18527 0.17329-0.15147 0.33271l0.18332 0.86479c-0.1526 0.06672-0.29921 0.14343-0.43951 0.22826l-0.59412-0.66041c-0.10898-0.12117-0.26871-0.1538-0.3582-0.07327l-0.76333 0.68657c-0.08951 0.08047-0.07363 0.24256 0.03534 0.36372l0.59907 0.66643c-0.09768 0.13121-0.18707 0.26838-0.26721 0.41098l-0.85193-0.27752c-0.15483-0.05034-0.30976 9.35e-4 -0.34702 0.11563l-0.3178 0.97622c-0.03726 0.11446 0.05763 0.24715 0.21262 0.2976l0.84596 0.27542c-0.0204 0.16242-0.03066 0.32726-0.02956 0.49356l-0.86684 0.18374c-0.15942 0.03378-0.26789 0.15577-0.24293 0.27349l0.21285 1.0041c0.02496 0.11775 0.17363 0.18548 0.33306 0.15168l0.85538-0.18132c0.06498 0.15616 0.13963 0.30639 0.22344 0.45005l-0.64618 0.5816c-0.12118 0.10895-0.15409 0.26876-0.07358 0.35826l0.6865 0.76304c0.0805 0.08945 0.24291 0.07383 0.3641-0.03509l0.63539-0.57162c0.1358 0.10438 0.27848 0.19941 0.42697 0.2847l-0.26248 0.80699c-0.05044 0.15496 8.96e-4 0.30983 0.11534 0.34708l0.97623 0.31781c0.11446 0.03724 0.24742-0.05642 0.2976-0.21261l0.25646-0.7876c0.17284 0.02339 0.34852 0.03509 0.52583 0.03406l0.17042 0.80396c0.0338 0.15942 0.15574 0.2679 0.2735 0.24294l1.0044-0.2129c0.11776-0.02498 0.1852-0.17358 0.1514-0.33301l-0.16768-0.79103c0.1668-0.06915 0.3268-0.14977 0.47931-0.2404l0.53868 0.59878c0.10899 0.12118 0.26877 0.15408 0.35826 0.07355l0.76333-0.68656c0.0895-0.08047 0.07357-0.24285-0.03541-0.36402l-0.53642-0.59679c0.10836-0.14334 0.20647-0.29419 0.29367-0.45129l0.76282 0.2482c0.1548 0.05025 0.30978-9.36e-4 0.347-0.11569l0.31787-0.97594c0.03726-0.11447-0.05763-0.24715-0.21262-0.2976l-0.76388-0.24889c0.0212-0.17648 0.0296-0.35571 0.02535-0.53657l0.78897-0.16726c0.15943-0.03378 0.26783-0.15605 0.24287-0.27378l-0.21284-1.004c-0.02496-0.11775-0.17357-0.18519-0.333-0.1514l-0.80043 0.16968c-0.071143-0.16322-0.1534-0.31969-0.24522-0.46878l0.61301-0.55122c0.12118-0.10896 0.15408-0.26877 0.07359-0.35825l-0.68656-0.76334c-0.0805-0.08946-0.24291-0.07383-0.3641 0.03509l-0.62764 0.56477c-0.13878-0.10162-0.28434-0.19375-0.43553-0.27585l0.26329-0.80899c0.05044-0.15495-8.32e-4 -0.30953-0.11527-0.34678l-0.97623-0.31781c-0.11446-0.03724-0.24742 0.05642-0.29766 0.21232l-0.26819 0.82354c-0.16592-0.01834-0.33419-0.02601-0.50389-0.0218l-0.18064-0.85215c-0.03379-0.15942-0.15568-0.26761-0.27343-0.24263zm0.94444 1.8162c1.5838-0.33573 3.129 0.66875 3.4648 2.2525 0.33573 1.5837-0.66904 3.1291-2.2528 3.4648-1.5838 0.33573-3.1288-0.6691-3.4645-2.2529-0.33573-1.5838 0.66881-3.1287 2.2526-3.4645zm7.1235-12.61c-0.15307-9.3e-6 -0.27616 0.16669-0.27615 0.37393l1e-6 1.1241c-0.20743 0.04276-0.41003 0.0995-0.60693 0.16806l-0.56491-0.97819c-0.10362-0.17947-0.2937-0.26217-0.42626-0.18563l-1.1306 0.65277c-0.13256 0.076542-0.15556 0.28231-0.05195 0.46178l0.56949 0.98698c-0.15611 0.13746-0.30348 0.28452-0.44078 0.44078l-0.98659-0.56987c-0.17932-0.10339-0.38563-0.08028-0.46217 0.05221l-0.65276 1.1306c-0.07653 0.13254 0.0066 0.32264 0.18601 0.42626l0.97971 0.56568c-0.06821 0.19667-0.12443 0.39901-0.16691 0.60617l-1.1268-1.9e-5c-0.20723 2.8e-5 -0.37432 0.1231-0.37432 0.27616l2e-6 1.3051c-2e-6 0.15307 0.16708 0.27652 0.37431 0.27652h1.1119c0.03965 0.2114 0.0929 0.41795 0.15928 0.61878l-0.95718 0.55307c-0.17947 0.10361-0.26255 0.29369-0.18601 0.42626l0.65276 1.1302c0.07653 0.13254 0.2827 0.15594 0.46217 0.05231l0.94114-0.54353c0.1414 0.16567 0.29384 0.32149 0.45606 0.46674l-0.53932 0.93465c-0.1036 0.17946-0.08061 0.38563 0.05195 0.46217l1.1306 0.65277c0.13256 0.07654 0.32264-0.0056 0.42626-0.18602l0.52672-0.91212c0.20883 0.07467 0.42428 0.1356 0.64512 0.18105l-3e-6 1.045c-1e-6 0.20723 0.12309 0.37433 0.27616 0.37433h1.3055c0.15307 0 0.27615-0.16708 0.27615-0.37432l-2e-6 -1.0282c0.22572-0.04211 0.44602-0.10008 0.65964-0.17264l0.5122 0.88689c0.10361 0.17948 0.2937 0.26253 0.42626 0.186l1.1306-0.65276c0.13256-0.07654 0.15556-0.28269 0.05194-0.46216l-0.50991-0.88385c0.17259-0.14972 0.33441-0.31151 0.48432-0.48393l0.88346 0.50991c0.17932 0.10338 0.38564 0.08028 0.46217-0.0524l0.65276-1.1302c0.07653-0.13256-0.0066-0.32264-0.18601-0.42626l-0.88461-0.51105c0.07292-0.21395 0.13062-0.43469 0.17303-0.66078l1.0255-9e-6c0.20723 0 0.37431-0.12348 0.37432-0.27653v-1.3051c-2e-6 -0.15306-0.16708-0.27614-0.37432-0.27614h-1.0404c-0.04547-0.22179-0.10652-0.43812-0.18143-0.64781l0.90791-0.52404c0.17947-0.10361 0.26254-0.29371 0.18601-0.42626l-0.65276-1.1306c-0.07653-0.13256-0.2827-0.15596-0.46217-0.0524l-0.92968 0.53704c-0.14583-0.16298-0.30261-0.31598-0.46904-0.45797l0.54085-0.93693c0.1036-0.17946 0.08061-0.38525-0.05195-0.46179l-1.1306-0.65276c-0.13257-0.076542-0.32265 0.00561-0.42626 0.18563l-0.55078 0.95375c-0.20157-0.066623-0.40886-0.12043-0.62106-0.16004v-1.1077c0-0.20723-0.12309-0.37395-0.27615-0.37393zm0.69592 2.5083c2.0587 0 3.716 1.657 3.716 3.7157 2e-6 2.0587-1.6574 3.716-3.716 3.716s-3.7157-1.6574-3.7157-3.716c-1e-6 -2.0587 1.657-3.7157 3.7157-3.7157zm-14.685-11.041c-0.20709-9.3572e-6 -0.37362 0.22553-0.37362 0.50591l3.7e-6 1.5208c-0.28065 0.057827-0.55475 0.13467-0.82114 0.22738l-0.76429-1.3234c-0.14019-0.24282-0.39736-0.3547-0.57671-0.25116l-1.5296 0.88316c-0.17935 0.10355-0.21047 0.38195-0.070282 0.62477l0.77049 1.3353c-0.21121 0.18597-0.41059 0.38494-0.59634 0.59634l-1.3348-0.771c-0.24261-0.13982-0.52174-0.10857-0.62529 0.07074l-0.88315 1.5296c-0.10354 0.17934 0.008796 0.43651 0.25167 0.57671l1.3255 0.76532c-0.092299 0.26609-0.16835 0.53983-0.22583 0.82011l-1.5245-9.4e-6c-0.28037 2.81e-5 -0.50643 0.16654-0.50643 0.37362l3.7429e-6 1.7658c-1.8714e-6 0.20709 0.22604 0.37413 0.50643 0.37413h1.5043c0.053645 0.28599 0.12569 0.56546 0.21549 0.83717l-1.295 0.74828c-0.24282 0.14019-0.35522 0.39735-0.25167 0.5767l0.88315 1.5291c0.10355 0.17934 0.38247 0.21098 0.62529 0.07083l1.2733-0.73536c0.19131 0.22413 0.39754 0.43498 0.61702 0.63149l-0.72967 1.2645c-0.14017 0.2428-0.10907 0.52173 0.070282 0.62528l1.5296 0.88315c0.17935 0.10356 0.43652-0.0084 0.57671-0.25166l0.71262-1.234c0.28254 0.10101 0.57403 0.18344 0.87282 0.24495l-2.8e-6 1.4139c-9e-7 0.28038 0.16653 0.50644 0.37363 0.50644h1.7663c0.20709 0 0.37362-0.22605 0.37362-0.50643l-2.8e-6 -1.3911c0.30538-0.05698 0.60344-0.13542 0.89245-0.23358l0.69298 1.1999c0.14019 0.24282 0.39736 0.35521 0.57671 0.25166l1.5296-0.88315c0.17935-0.10355 0.21047-0.38247 0.07028-0.62528l-0.68988-1.1958c0.2335-0.20257 0.45244-0.42146 0.65526-0.65474l1.1953 0.68988c0.24261 0.13983 0.52174 0.10855 0.62528-0.07083l0.88315-1.5291c0.10355-0.17935-0.0089-0.43651-0.25166-0.5767l-1.1968-0.69143c0.09865-0.28946 0.17672-0.5881 0.2341-0.894l1.3875-9.3e-6c0.28038-9.4e-6 0.50643-0.16704 0.50643-0.37414l1e-6 -1.7658c-2e-6 -0.20709-0.22605-0.37361-0.50643-0.37361h-1.4077c-0.061523-0.30006-0.14412-0.59274-0.24547-0.87644l1.2284-0.70899c0.24282-0.14019 0.35521-0.39737 0.25166-0.57671l-0.88315-1.5296c-0.10355-0.17936-0.38247-0.21099-0.62529-0.070834l-1.2578 0.72658c-0.19731-0.22051-0.40942-0.42751-0.63458-0.61959l0.73174-1.2676c0.14017-0.2428 0.10906-0.52122-0.07028-0.62476l-1.5296-0.88315c-0.17936-0.10357-0.43652 0.0084215-0.57671 0.25115l-0.74517 1.2904c-0.27271-0.090016-0.55317-0.16292-0.84026-0.21653l-9e-7 -1.4986c0-0.28038-0.16653-0.50591-0.37362-0.50591zm0.94155 3.3936c2.7852 0 5.0276 2.2418 5.0276 5.0271 2e-6 2.7852-2.2424 5.0276-5.0276 5.0276-2.7852 0-5.0271-2.2424-5.0271-5.0276-9e-7 -2.7852 2.2418-5.0271 5.0271-5.0271z" fill="#e49c3e"/>
        </svg>
        `,
        "I thrive on finding creative solutions to challenges that arise during development. I approach projects with a fresh and imaginative perspective, constantly seeking innovative ways to address problems and create unique solutions."
    ]
]

const aboutMeCardsDiv = document.getElementsByClassName("aboutme-cards-div")[0];

function makeAboutMeCard(title, description, icon) {
    cardDiv = document.createElement("div");
    cardDiv.className = "aboutme-card";

    cardIcon = document.createElement("div");
    cardIcon.className = "aboutme-icon";
    cardIcon.innerHTML = icon;

    cardTitle = document.createElement("span");
    cardTitle.className = "aboutme-title";
    cardTitle.innerText = title;

    cardDesc = document.createElement("span");
    cardDesc.className = "aboutme-desc";
    cardDesc.innerText = description;

    cardDiv.append(cardIcon, cardTitle, cardDesc);
    return cardDiv;
}

function addAboutMeCards(){
    for(const cardContent of aboutMeContent){
        aboutMeCardsDiv.appendChild(makeAboutMeCard(cardContent[0], cardContent[2], cardContent[1]));
    }
}

addAboutMeCards();

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
