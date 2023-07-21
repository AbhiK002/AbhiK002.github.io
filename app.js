lightTheme = false;

function debugText(text) {
    document.getElementById("js-tester").innerText = text;
}

// useful functions
function runAfter(func, duration) {
    const init = performance.now();

    function check() {
        let elapsed = performance.now() - init;
        if (elapsed >= duration) {
            try {
                func();
            } catch (error) {
                console.error('An error occurred:', error);
            }
            return;
        }
        requestAnimationFrame(check);
    }
    requestAnimationFrame(check);
}

function styleAfter(element, attr, value, duration) {
    if (element == null || element.nodeType != 1) {
        console.log(`${element} doesn't exist`)
        return;
    }
    const init = performance.now();

    function check() {
        let elapsed = performance.now() - init;
        if (elapsed >= duration) {
            element.style.setProperty(attr, value);
            return;
        }
        requestAnimationFrame(check);
    }
    requestAnimationFrame(check);
}

function stylesAfter(...eleAttrValDurs) {
    init = performance.now();
    let time = 0
    for (const [ele, attr, val, dur] of eleAttrValDurs) {
        time += dur;
        styleAfter(ele, attr, val, time);
    }
}

function setCssStyles(element, styles) {
    for (const [property, value] of Object.entries(styles)) {
        element.style.setProperty(property, value);
    }
}

function node(tagname, attributes, children, cssStyle) {
    if (!tagname) return;
    let node = document.createElement(tagname);

    if (attributes != null) {
        for (const key of Object.keys(attributes)) {
            switch (key) {
                case "cl": case "class": {
                    node.className = attributes[key]; break;
                }
                case "id": {
                    node.id = attributes[key]; break;
                }
                case "iText": case "innerText": {
                    node.innerText = attributes[key]; break;
                }
                case "iHTML": case "innerHTML": {
                    node.innerHTML = attributes[key]; break;
                }
                case "src": {
                    node.src = attributes[key]; break;
                }
                case "href": {
                    node.href = attributes[key]; break;
                }
                case "alt": {
                    node.alt = attributes[key]; break;
                }
                case "height": {
                    node.height = attributes[key]; break;
                }
                case "width": {
                    node.width = attributes[key]; break;
                }
                default: {
                    break;
                }
            }
        }
    }
    if (children != null) {
        for (const child of children) {
            node.appendChild(child);
        }
    }
    if (cssStyle != null) {
        setCssStyles(node, cssStyle);
    }
    return node;
}

// DOM stuff
const handleOnMouseMove = e => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    setCssStyles(target, {
        "--mouse-x": `${x}px`,
        "--mouse-y": `${y}px`
    });

    // debugText(`${target} ${rect} == ${rect.left} ${rect.top} == ${e.clientX} ${e.clientY}`);
}

let prevYScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
let userScrollingUp = false;
document.addEventListener("scroll", (ev) => {
    const currentYScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (currentYScrollPosition > prevYScrollPosition) {
        userScrollingUp = false;
    }
    else {
        userScrollingUp = true;
    }

    prevYScrollPosition = currentYScrollPosition;
})

const lampString = document.getElementsByClassName("lamp-string")[0];
const docElement = document.documentElement;

if (lightTheme) {
    docElement.classList.add("light-mode");
}

if (docElement.classList.contains("light-mode")) {
    lampString.classList.add("string-pulled-down")
}

function toggleTheme() {
    lampString.classList.toggle('string-pulled-down');
    runAfter(() => { docElement.classList.toggle('light-mode'); }, 300);
}
but = document.getElementsByClassName("theme-switch-div")[0];
but.onclick = toggleTheme;

for (const card of document.querySelectorAll(".tile")) {
    card.onmousemove = e => handleOnMouseMove(e);
}

const myDetails = {
    fullname: "Abhineet Kelley",
    description: `
        I am a <b>WPF Desktop Application</b> and <b>MERN Full-Stack</b> 
        Web Developer, dedicated to crafting memorable products using 
        <i>awesome</i> technologies
        `,
    bestLangs: ["C#", "Python"],
    bestTools: ["React", "Node.js", "WPF", "Avalonia UI"],
    bestJS: ["React", "Node"],
    avgLangs: ["Java", "C++"],
    avgTools: ["JavaFX", "Qt C++", "PyQt5", "tkinter"]
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

function contentTitle() {
    const titleDiv = document.createElement("div");
    titleDiv.className = "content-title";

    const nameSpan = document.createElement("span");
    nameSpan.id = "fullname";
    nameSpan.innerText = myDetails.fullname;

    titleDiv.innerText = "Hi, I am ";
    titleDiv.append(nameSpan);

    return titleDiv;
}

function contentDescription() {
    const descDiv = document.createElement("div");
    descDiv.className = "content-desc";

    descDiv.innerHTML = myDetails.description;
    return descDiv;
}

function addContent() {
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

function loadCoverDiv() {
    setCssStyles(bgSVG, { "opacity": "1" })
    stylesAfter(
        [contentDiv, "transform", "translateX(0%)", 300],
        [contentDiv, "opacity", "1", 0],
        [coverDesc, "opacity", "1", 500]
    )
}

function controlCover(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) loadCoverDiv();
        else setCssStyles(bgSVG, { "opacity": "0" });
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
    setCssStyles(logotext, {
        "transform": "translateX(-30%)",
        "opacity": "0"
    });
}

function showLogo() {
    setCssStyles(logotext, {
        "transform": "translateX(0)",
        "opacity": "1"
    });
}

function controlTopBarTransparency(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setCssStyles(topDiv, {
                "background": "rgb(0, 0, 0, 0)",
                "border-color": "transparent",
                "box-shadow": "0 4px 16px rgba(0, 0, 0, 0)"
            });

            logoContainer.onmouseenter = showLogo
            logoContainer.onmouseleave = null
            runAfter(showLogo, 600)
        }
        else {
            setCssStyles(topDiv, {
                "background": "rgb(var(--major-bg))",
                "border-color": "rgba(var(--text-color), 0.1)",
                "box-shadow": "0 4px 16px rgba(0, 0, 0, 0.4)"
            });
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

setCssStyles(designWord, { "background-color": "transparent", "opacity": "0" });

setCssStyles(intoWord, { "opacity": "0" });

setCssStyles(secondh1, { "opacity": "0" });

setCssStyles(codeCursor, { "visibility": "hidden" });


let busy = false;

function loadDecoration() {
    const bars = document.getElementsByClassName("decoration-bar");
    for (const bar of bars) {
        setCssStyles(bar, { "opacity": "1" })
    }
    setCssStyles(secondh1, { "opacity": "1" })
    setCssStyles(designWord, { "background-color": "rgba(var(--sig-red), 0.2)" })
    stylesAfter(
        [designWord, "opacity", "1", 400],
        [intoWord, "opacity", "1", 700],
        [codeCursor, "visibility", "visible", 700]
    )
    if (busy) return;
    if (codeText.innerText.length > 1) {
        if (!userScrollingUp) return;
        runAfter(untypeCode, 600);
        runAfter(typeCode, 1600);
    }
    else {
        runAfter(typeCode, 1800)
    }
}

function hideDecoration() {
    const bars = document.getElementsByClassName("decoration-bar");
    for (const bar of bars) {
        setCssStyles(bar, { "opacity": "0" })
    }
    setCssStyles(secondh1, { "opacity": "0" })
    stylesAfter(
        [designWord, "opacity", "0", 0],
        [intoWord, "opacity", "0", 0],
        [codeCursor, "visibility", "hidden", 0]
    )

    codeText.innerText = ""
    busy = false;
}

function typeCode() {
    busy = true;
    codeText.innerText = "C";
    runAfter(() => { codeText.innerText = "Co" }, 200)
    runAfter(() => { codeText.innerText = "Cod" }, 400)
    runAfter(() => { codeText.innerText = "Code" }, 600)
    runAfter(() => { busy = false }, 1600);
}

function untypeCode() {
    if (busy) return;
    busy = true;
    codeText.innerText = "Cod";
    runAfter(() => { codeText.innerText = "Co" }, 200)
    runAfter(() => { codeText.innerText = "C" }, 400)
    runAfter(() => { codeText.innerText = "" }, 600)
}

function controlDecoration(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runAfter(loadDecoration, 100)
        }
        else {
            if (userScrollingUp) {
                runAfter(hideDecoration, 0)
            }
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
function switchBorderRadius() {
    setCssStyles(designWord, { "border-radius": brvalues[curr % brvalues.length] })
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
         <g fill="none" stroke="#e49c3e" stroke-width="1.6" class="border-ele">
          <path d="m6.7573 1.2534h15.203c2.9921 0 5.4009 2.4088 5.4009 5.4009v16.346c0 2.9921-2.4088 5.4009-5.4009 5.4009h-15.203c-2.9921 0-5.4009-2.4088-5.4009-5.4009v-16.346c0-2.9921 2.4088-5.4009 5.4009-5.4009z"/>
          <path id="modern-icon-part" fill=none d="m16.23 4.4438c8.2546 0.09521 8.092 8.2403 8.092 8.2403 0 0.28038-0.16672 0.5061-0.37381 0.5061h-7.7181c-0.20709 0-0.37381-0.22572-0.37381-0.5061v-7.7342c0-0.28038 0.16672-0.5061 0.37381-0.5061z"/>
          <path id="modern-icon-whole" d="m13.144 8.7001c-2.0994-0.047992-4.2051 0.78224-5.7069 2.25s-2.3799 3.554-2.3799 5.6539 0.87814 4.1861 2.3799 5.6539 3.6075 2.298 5.7069 2.25c2.1135-0.04832 4.1926-0.98664 5.627-2.5396 1.4344-1.553 2.2051-3.6998 2.0858-5.8105"/>
         </g>
        </svg>
        
        `,
        "I have a strong background in modern UI design and possess both front-end and back-end development skills. I stay updated with the latest technologies and industry trends to provide cutting-edge solutions that meet the evolving needs of clients."
    ],
    [
        "Precise Attention to Detail",
        `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="26.086mm" height="26.015mm" version="1.1" viewBox="0 0 26.086 26.015" xmlns="http://www.w3.org/2000/svg">
         <path d="m10.295 15.688c0.59806 0.59806 2.5597-0.40064-0.84521 3.0043l-5.6056 5.6056c-1.0663 1.0663-2.4062 1.4433-3.0043 0.84521-0.59806-0.59806-0.2211-1.938 0.8452-3.0043l5.6056-5.6056c3.592-3.592 2.4062-1.4433 3.0043-0.8452z" fill="#e49c3e" stroke="#e49c3e" class="fill-ele border-ele"/>
         <path d="m25.44 9.2682a8.693 8.693 0 0 1-8.693 8.693 8.693 8.693 0 0 1-8.693-8.693 8.693 8.693 0 0 1 8.693-8.693 8.693 8.693 0 0 1 8.693 8.693z" fill="none" stroke="#e49c3e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" class="border-ele"/>
         <path id="eye" d="m16.674 5.4751c-2.0502 0.00319-4.3557 0.97468-6.6508 3.8933 7.0598 8.8457 13.758-0.12247 13.758-0.12247s-3.0543-3.7771-7.1071-3.7708zm0.10904 0.69608c1.749 0 3.1781 1.4291 3.1781 3.1781 0 1.749-1.4291 3.1776-3.1781 3.1776-1.749 0-3.1781-1.4286-3.1781-3.1776 0-1.749 1.4291-3.1781 3.1781-3.1781zm0 1.093c-1.1584 0-2.0846 0.92675-2.0846 2.0851 0 1.1584 0.92622 2.0846 2.0846 2.0846s2.0852-0.92623 2.0851-2.0846c0-1.1584-0.92665-2.0852-2.0851-2.0851z" fill="#e49c3e" class="fill-ele"/>
        </svg>
        `,
        "I pay meticulous attention to detail, ensuring that no aspect of the application is overlooked. I believe that even the smallest details can make a big difference in the overall impression and usability of an application."
    ],
    [
        "Creative Problem-Solving",
        `<?xml version="1.0" encoding="UTF-8"?>
        <svg id="wheel-1" width="16.735mm" height="16.735mm" version="1.1" viewBox="0 0 16.735 16.735" xmlns="http://www.w3.org/2000/svg">
         <path class="fill-ele" d="m7.4843 0c-0.20709-9.3569e-6 -0.37362 0.22553-0.37362 0.50591v1.5208c-0.28065 0.057827-0.55475 0.13467-0.82114 0.22738l-0.76429-1.3234c-0.14019-0.24282-0.39736-0.35469-0.57671-0.25115l-1.5296 0.88315c-0.17935 0.10355-0.21047 0.38195-0.07028 0.62477l0.7705 1.3353c-0.21121 0.18597-0.4106 0.38495-0.59635 0.59635l-1.3348-0.77101c-0.24261-0.13982-0.52174-0.10851-0.62528 0.070797l-0.88315 1.5296c-0.10354 0.17934 0.008791 0.43651 0.25166 0.57671l1.3255 0.76533c-0.092299 0.26609-0.16835 0.53983-0.22583 0.8201h-1.5245c-0.28037 2.81e-5 -0.50643 0.16654-0.50643 0.37362v1.7658c-1.8714e-6 0.20709 0.22604 0.37414 0.50643 0.37414h1.5043c0.053645 0.28599 0.12569 0.56545 0.21549 0.83716l-1.295 0.74828c-0.24282 0.14019-0.35521 0.39736-0.25166 0.57671l0.88315 1.5291c0.10355 0.17934 0.38247 0.21095 0.62528 0.0708l1.2733-0.73536c0.19131 0.22413 0.39754 0.43498 0.61702 0.63149l-0.72967 1.2645c-0.14017 0.2428-0.10907 0.52174 0.07028 0.62528l1.5296 0.88315c0.17935 0.10356 0.43652-0.0084 0.57671-0.25166l0.71262-1.234c0.28254 0.10101 0.57403 0.18344 0.87281 0.24495v1.4139c-9e-7 0.28038 0.16652 0.50643 0.37362 0.50643h1.7663c0.20709 0 0.37362-0.22605 0.37362-0.50643v-1.3911c0.30538-0.05698 0.60344-0.13542 0.89245-0.23358l0.69298 1.1999c0.14019 0.24282 0.39736 0.35521 0.57671 0.25166l1.5296-0.88315c0.17935-0.10355 0.21047-0.38248 0.07028-0.62528l-0.68988-1.1958c0.2335-0.20257 0.45244-0.42146 0.65526-0.65474l1.1953 0.68988c0.24261 0.13983 0.52174 0.10858 0.62528-0.0708l0.88315-1.5291c0.10355-0.17935-0.0089-0.43652-0.25166-0.57671l-1.1968-0.69143c0.09865-0.28946 0.17671-0.5881 0.23409-0.894h1.3875c0.28038-9.4e-6 0.50643-0.16704 0.50643-0.37414v-1.7658c-2e-6 -0.20709-0.22605-0.37362-0.50643-0.37362h-1.4077c-0.06152-0.30006-0.14411-0.59273-0.24546-0.87643l1.2283-0.709c0.24282-0.14019 0.35521-0.39737 0.25166-0.57671l-0.88315-1.5296c-0.10355-0.17936-0.38246-0.21095-0.62528-0.070797l-1.2578 0.72657c-0.19731-0.22051-0.40943-0.42752-0.63459-0.6196l0.73174-1.2676c0.14017-0.2428 0.10906-0.52123-0.07028-0.62477l-1.5296-0.88315c-0.17936-0.10357-0.43652 0.00842-0.57671 0.25115l-0.74517 1.2904c-0.27271-0.090016-0.55317-0.16291-0.84026-0.21652v-1.4986c0-0.28038-0.16653-0.50591-0.37362-0.50591h-1.7663zm0.94154 3.3936c2.7852 0 5.0276 2.2418 5.0276 5.0271 2e-6 2.7852-2.2424 5.0276-5.0276 5.0276s-5.0271-2.2424-5.0271-5.0276c-9e-7 -2.7852 2.2418-5.0271 5.0271-5.0271z" fill="#e49c3e"/>
        </svg>
        <svg id="wheel-2" width="16.735mm" height="16.735mm" version="1.1" viewBox="0 0 16.735 16.735" xmlns="http://www.w3.org/2000/svg">
         <path class="fill-ele" d="m7.4843 0c-0.20709-9.3569e-6 -0.37362 0.22553-0.37362 0.50591v1.5208c-0.28065 0.057827-0.55475 0.13467-0.82114 0.22738l-0.76429-1.3234c-0.14019-0.24282-0.39736-0.35469-0.57671-0.25115l-1.5296 0.88315c-0.17935 0.10355-0.21047 0.38195-0.07028 0.62477l0.7705 1.3353c-0.21121 0.18597-0.4106 0.38495-0.59635 0.59635l-1.3348-0.77101c-0.24261-0.13982-0.52174-0.10851-0.62528 0.070797l-0.88315 1.5296c-0.10354 0.17934 0.008791 0.43651 0.25166 0.57671l1.3255 0.76533c-0.092299 0.26609-0.16835 0.53983-0.22583 0.8201h-1.5245c-0.28037 2.81e-5 -0.50643 0.16654-0.50643 0.37362v1.7658c-1.8714e-6 0.20709 0.22604 0.37414 0.50643 0.37414h1.5043c0.053645 0.28599 0.12569 0.56545 0.21549 0.83716l-1.295 0.74828c-0.24282 0.14019-0.35521 0.39736-0.25166 0.57671l0.88315 1.5291c0.10355 0.17934 0.38247 0.21095 0.62528 0.0708l1.2733-0.73536c0.19131 0.22413 0.39754 0.43498 0.61702 0.63149l-0.72967 1.2645c-0.14017 0.2428-0.10907 0.52174 0.07028 0.62528l1.5296 0.88315c0.17935 0.10356 0.43652-0.0084 0.57671-0.25166l0.71262-1.234c0.28254 0.10101 0.57403 0.18344 0.87281 0.24495v1.4139c-9e-7 0.28038 0.16652 0.50643 0.37362 0.50643h1.7663c0.20709 0 0.37362-0.22605 0.37362-0.50643v-1.3911c0.30538-0.05698 0.60344-0.13542 0.89245-0.23358l0.69298 1.1999c0.14019 0.24282 0.39736 0.35521 0.57671 0.25166l1.5296-0.88315c0.17935-0.10355 0.21047-0.38248 0.07028-0.62528l-0.68988-1.1958c0.2335-0.20257 0.45244-0.42146 0.65526-0.65474l1.1953 0.68988c0.24261 0.13983 0.52174 0.10858 0.62528-0.0708l0.88315-1.5291c0.10355-0.17935-0.0089-0.43652-0.25166-0.57671l-1.1968-0.69143c0.09865-0.28946 0.17671-0.5881 0.23409-0.894h1.3875c0.28038-9.4e-6 0.50643-0.16704 0.50643-0.37414v-1.7658c-2e-6 -0.20709-0.22605-0.37362-0.50643-0.37362h-1.4077c-0.06152-0.30006-0.14411-0.59273-0.24546-0.87643l1.2283-0.709c0.24282-0.14019 0.35521-0.39737 0.25166-0.57671l-0.88315-1.5296c-0.10355-0.17936-0.38246-0.21095-0.62528-0.070797l-1.2578 0.72657c-0.19731-0.22051-0.40943-0.42752-0.63459-0.6196l0.73174-1.2676c0.14017-0.2428 0.10906-0.52123-0.07028-0.62477l-1.5296-0.88315c-0.17936-0.10357-0.43652 0.00842-0.57671 0.25115l-0.74517 1.2904c-0.27271-0.090016-0.55317-0.16291-0.84026-0.21652v-1.4986c0-0.28038-0.16653-0.50591-0.37362-0.50591h-1.7663zm0.94154 3.3936c2.7852 0 5.0276 2.2418 5.0276 5.0271 2e-6 2.7852-2.2424 5.0276-5.0276 5.0276s-5.0271-2.2424-5.0271-5.0276c-9e-7 -2.7852 2.2418-5.0271 5.0271-5.0271z" fill="#e49c3e"/>
        </svg>
        <svg id="wheel-3" width="16.735mm" height="16.735mm" version="1.1" viewBox="0 0 16.735 16.735" xmlns="http://www.w3.org/2000/svg">
         <path class="fill-ele" d="m7.4843 0c-0.20709-9.3569e-6 -0.37362 0.22553-0.37362 0.50591v1.5208c-0.28065 0.057827-0.55475 0.13467-0.82114 0.22738l-0.76429-1.3234c-0.14019-0.24282-0.39736-0.35469-0.57671-0.25115l-1.5296 0.88315c-0.17935 0.10355-0.21047 0.38195-0.07028 0.62477l0.7705 1.3353c-0.21121 0.18597-0.4106 0.38495-0.59635 0.59635l-1.3348-0.77101c-0.24261-0.13982-0.52174-0.10851-0.62528 0.070797l-0.88315 1.5296c-0.10354 0.17934 0.008791 0.43651 0.25166 0.57671l1.3255 0.76533c-0.092299 0.26609-0.16835 0.53983-0.22583 0.8201h-1.5245c-0.28037 2.81e-5 -0.50643 0.16654-0.50643 0.37362v1.7658c-1.8714e-6 0.20709 0.22604 0.37414 0.50643 0.37414h1.5043c0.053645 0.28599 0.12569 0.56545 0.21549 0.83716l-1.295 0.74828c-0.24282 0.14019-0.35521 0.39736-0.25166 0.57671l0.88315 1.5291c0.10355 0.17934 0.38247 0.21095 0.62528 0.0708l1.2733-0.73536c0.19131 0.22413 0.39754 0.43498 0.61702 0.63149l-0.72967 1.2645c-0.14017 0.2428-0.10907 0.52174 0.07028 0.62528l1.5296 0.88315c0.17935 0.10356 0.43652-0.0084 0.57671-0.25166l0.71262-1.234c0.28254 0.10101 0.57403 0.18344 0.87281 0.24495v1.4139c-9e-7 0.28038 0.16652 0.50643 0.37362 0.50643h1.7663c0.20709 0 0.37362-0.22605 0.37362-0.50643v-1.3911c0.30538-0.05698 0.60344-0.13542 0.89245-0.23358l0.69298 1.1999c0.14019 0.24282 0.39736 0.35521 0.57671 0.25166l1.5296-0.88315c0.17935-0.10355 0.21047-0.38248 0.07028-0.62528l-0.68988-1.1958c0.2335-0.20257 0.45244-0.42146 0.65526-0.65474l1.1953 0.68988c0.24261 0.13983 0.52174 0.10858 0.62528-0.0708l0.88315-1.5291c0.10355-0.17935-0.0089-0.43652-0.25166-0.57671l-1.1968-0.69143c0.09865-0.28946 0.17671-0.5881 0.23409-0.894h1.3875c0.28038-9.4e-6 0.50643-0.16704 0.50643-0.37414v-1.7658c-2e-6 -0.20709-0.22605-0.37362-0.50643-0.37362h-1.4077c-0.06152-0.30006-0.14411-0.59273-0.24546-0.87643l1.2283-0.709c0.24282-0.14019 0.35521-0.39737 0.25166-0.57671l-0.88315-1.5296c-0.10355-0.17936-0.38246-0.21095-0.62528-0.070797l-1.2578 0.72657c-0.19731-0.22051-0.40943-0.42752-0.63459-0.6196l0.73174-1.2676c0.14017-0.2428 0.10906-0.52123-0.07028-0.62477l-1.5296-0.88315c-0.17936-0.10357-0.43652 0.00842-0.57671 0.25115l-0.74517 1.2904c-0.27271-0.090016-0.55317-0.16291-0.84026-0.21652v-1.4986c0-0.28038-0.16653-0.50591-0.37362-0.50591h-1.7663zm0.94154 3.3936c2.7852 0 5.0276 2.2418 5.0276 5.0271 2e-6 2.7852-2.2424 5.0276-5.0276 5.0276s-5.0271-2.2424-5.0271-5.0276c-9e-7 -2.7852 2.2418-5.0271 5.0271-5.0271z" fill="#e49c3e"/>
        </svg>
        `,
        "I thrive on finding creative solutions to challenges that arise during development. I approach projects with a fresh and imaginative perspective, constantly seeking innovative ways to address problems and create unique solutions."
    ]
]

const aboutMeCardsDiv = document.getElementsByClassName("aboutme-cards-div")[0];
const aboutMeDivTitle = document.getElementsByClassName("aboutme-div-title")[0];

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

function addAboutMeCards() {
    for (const cardContent of aboutMeContent) {
        aboutMeCardsDiv.appendChild(makeAboutMeCard(cardContent[0], cardContent[2], cardContent[1]));
    }
}

function showCard(card) {
    card.classList.add("card-fade-in")
}
function hideCard(card) {
    card.classList.remove("card-fade-in")
}

function loadAboutMeDiv(entries, observer) {
    delay = 100;
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runAfter(() => { showCard(entry.target); }, delay);
            delay += 300;
        }
        else {
            if (userScrollingUp) {
                runAfter(() => { hideCard(entry.target); }, delay);
                delay += 300;
            }
        }
    })
}

addAboutMeCards();

let cardObserver = new IntersectionObserver(loadAboutMeDiv, {
    root: null,
    rootMargin: '0px',
    threshold: 0.25
})

const cards = document.getElementsByClassName("aboutme-card");
for (const card of cards) {
    cardObserver.observe(card);
}

let divObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setCssStyles(aboutMeDivTitle, {
                "transform": "translateX(0)",
                "opacity": "1"
            });
        }
        else {
            if (!userScrollingUp) return;

            setCssStyles(aboutMeDivTitle, {
                "transform": "translateX(-10%)",
                "opacity": "0"
            });
        }
    })
}, {
    root: null,
    rootMargin: "0px",
    threshold: 0.9
})
divObserver.observe(aboutMeDivTitle)

// trifecta div
const trifectaDiv = document.getElementsByClassName("trifecta-div")[0];
const trifectaTitle = document.getElementById("trifecta-title");
const trifectaItems = document.getElementsByClassName("trifecta-item");
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

function makeIdleShape() {
    for (let i = 0; i < shapes; i++) {
        const shape = document.getElementById(`shape${i + 1}`);
        setCssStyles(shape, {
            "transform": `translate(${idleCoords[i]})`,
            "border-radius": "12rem"
        });
    }
    // shapesDiv.style.setProperty("width", idleWH[0]);
    // shapesDiv.style.setProperty("height", idleWH[1]);
}

// Creativity
function funnyTextEffects() {
    for (let i = 0; i < creat_letters.length; i++) {
        setCssStyles(creat_letters[i], {
            "transform": "translateY(0rem)",
            "color": "rgb(var(--sig-orange))"
        });
    }
};
function undoFunnyTextEffects(idleShape = true) {
    for (let i = 0; i < creat_letters.length; i++) {
        setCssStyles(creat_letters[i], {
            "transform": `translateY(${letter_shuffle[i]}rem)`,
            "color": "rgb(var(--text-color))"
        });
    }
}
function makeFunnyShape() {
    for (let i = 0; i < shapes; i++) {
        const shape = document.getElementById(`shape${i + 1}`);
        setCssStyles(shape, {
            "transform": `translate(${funnyCoords[i]}) rotate(${funnyAngles[i]}deg)`,
            "border-radius": "1rem"
        });
    }
}

// Simplicity
function circularTextEffects() {
    for (let i = 0; i < simpl_letters.length; i++) {
        setCssStyles(simpl_letters[i], {
            "transform": "translateY(0rem)",
            "color": "rgb(var(--sig-orange))"
        });
    }
}
function undoCircularTextEffects(idleShape = true) {
    for (let i = 0; i < simpl_letters.length; i++) {
        setCssStyles(simpl_letters[i], {
            "transform": `translateY(${letter_shuffle[i]}rem)`,
            "color": "rgb(var(--text-color))"
        });
    }
}
function makeCircular() {
    for (let i = 0; i < shapes; i++) {
        const shape = document.getElementById(`shape${i + 1}`);
        setCssStyles(shape, {
            "transform": `translate(${circularCoords[i]}) rotate(${circularAngles[i]}deg)`,
            "border-radius": "12rem"
        });
    }
}

// Perfection
function squareTextEffects() {
    for (let i = 0; i < perfection_letters.length; i++) {
        setCssStyles(perfection_letters[i], {
            "transform": "translateY(0rem)",
            "color": "rgb(var(--sig-orange))"
        });
    }
}
function undoSquareTextEffects(idleShape = true) {
    for (let i = 0; i < perfection_letters.length; i++) {
        setCssStyles(perfection_letters[i], {
            "transform": `translateY(${letter_shuffle[i]}rem)`,
            "color": "rgb(var(--text-color))"
        });
    }
}
function makeSquare() {
    for (let i = 0; i < shapes; i++) {
        const shape = document.getElementById(`shape${i + 1}`);
        setCssStyles(shape, {
            "transform": `translate(${squareCoords[i]})`,
            "border-radius": "2rem"
        });
    }
}

// Hover and Hover out functions
function funnyHover() {
    if (!hoverEffectsEnabled) return;
    makeFunnyShape();
    funnyTextEffects();
}
function circularHover() {
    if (!hoverEffectsEnabled) return;
    makeCircular();
    circularTextEffects();
}
function squareHover() {
    if (!hoverEffectsEnabled) return;
    makeSquare();
    squareTextEffects();
}

function funnyHoverOut() {
    if (!hoverEffectsEnabled) return;
    makeIdleShape();
    undoFunnyTextEffects();
}
function circularHoverOut() {
    if (!hoverEffectsEnabled) return;
    makeIdleShape();
    undoCircularTextEffects();
}
function squareHoverOut() {
    if (!hoverEffectsEnabled) return;
    makeIdleShape();
    undoSquareTextEffects();
}

function idleTextEffects(idleShape = true) {
    undoSquareTextEffects(idleShape);
    undoCircularTextEffects(idleShape);
    undoFunnyTextEffects(idleShape);
    if (idleShape) makeIdleShape();
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

function loadTrifectaDiv() {
    setCssStyles(trifectaTitle, {
        "transform": "translateX(0rem)",
        "opacity": "1"
    });

    let time = 700;
    helpText = document.getElementById("hover-help");

    for (let i = 0; i < shapeFuncs.length; i++) {
        runAfter(() => {
            setCssStyles(trifectaItems[i], {
                "transform": "translateY(0rem)",
                "opacity": "1"
            });

            if (firstTime) {
                shapeFuncs[i][0]();  // change the shapes arrangement on first run
            }
            runAfter(shapeFuncs[i][2], 800);
            shapeFuncs[i][1]();

            if (firstTime && i == shapeFuncs.length - 1) {
                runAfter(() => {
                    makeIdleShape();
                    hoverEffectsEnabled = true;
                }, 850);
            }
        }, time)

        time += 850
    }

    runAfter(() => { firstTime = false }, time)
}

function resetTrifectaDiv() {
    setCssStyles(trifectaTitle, {
        "transform": "translateX(-4rem)",
        "opacity": "0"
    });
}

function controlTrifectaDiv(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runAfter(loadTrifectaDiv, 100);
        }
        else {
            runAfter(resetTrifectaDiv, 100);
        }
    })
}

let secondObserver = new IntersectionObserver(controlTrifectaDiv, options);
secondObserver.observe(trifectaDiv);

// Skills Div
const mainSkillsDiv = document.getElementsByClassName("main-skills")[0];
const knowSkillsDiv = document.getElementsByClassName("know-skills")[0];
const touchSkillsDiv = document.getElementsByClassName("touch-skills")[0];

const skillsInfo = {
    main: {
        title: "Main Skills",
        skills: [
            {
                icon: "./resources/skills/mern.png",
                name: "MERN Stack Web Development",
                description: "I utilize the MERN stack efficiently to produce stable, optimised and beautiful websites that are able to satisfy the users' needs, in addition to the client's requirements. My UI/UX skills really enhance the ease-of-use of the applications, resulting in better products."
            },
            {
                icon: "./resources/skills/wpf.png",
                name: "WPF Desktop & Avalonia Development",
                description: "I develop feature-rich and efficient Windows desktop applications using powerful technologies like WPF (Windows Presentation Foundation) and also have the capability to build cross-platform applications using the Avalonia UI technology with a C# .NET backend."
            }
        ]
    },
    know: {
        title: "Also good at these",
        langs: [
            { icon: "./resources/skills/js.png", name: "JavaScript", perc: 80 },
            { icon: "./resources/skills/cs.png", name: "C#", perc: 75 },
            { icon: "./resources/skills/py.png", name: "Python", perc: 70 },
            { icon: "./resources/skills/java.png", name: "Java", perc: 55 }
        ],
        skills: [
            [
                { icon: "./resources/skills/html.png", name: "HTML" },
                { icon: "./resources/skills/css.png", name: "CSS" },
                { icon: "./resources/skills/ts.png", name: "TypeScript" },
                { icon: "./resources/skills/express.png", name: "Express" },
                { icon: "./resources/skills/mongo.png", name: "MongoDB" },
                { icon: "./resources/skills/sql.png", name: "SQL" },
                { icon: "./resources/skills/nextjs.png", name: "NextJS" },
                { icon: "./resources/skills/cloud.png", name: "Google Cloud/AWS" }
            ],
            [
                { icon: "./resources/skills/winui.png", name: "WinUI" },
                { icon: "./resources/skills/pyqt5.png", name: "PyQt5" },
                { icon: "./resources/skills/javafx.png", name: "JavaFX" },
                { icon: "./resources/skills/tkinter.png", name: "tkinter" },
                { icon: "./resources/skills/git.png", name: "Git" },
                { icon: "./resources/skills/inkscape.png", name: "Inkscape" },
                { icon: "./resources/skills/mspaint.png", name: "MS Paint" }
            ]
        ]
    },
    touch: {
        title: "I know their names",
        skills: [
            { icon: "./resources/skills/figma.png", name: "Figma" },
            { icon: "./resources/skills/electron.png", name: "Electron" },
            { icon: "./resources/skills/cpp.png", name: "C++" },
            { icon: "./resources/skills/bash.png", name: "Bash" },
            { icon: "./resources/skills/excel.png", name: "MS Excel" },
            { icon: "./resources/skills/ppt.png", name: "MS PowerPoint" },
            { icon: "./resources/skills/photoshop.png", name: "PhotoShop" }
        ]
    }
}

// main skills
const msTitle = node("h2", { cl: "skills-title", innerText: skillsInfo.main.title })
const msSkills = node("div", { cl: "main-skills-div" }, skillsInfo.main.skills.map(
    (skill) => {
        return node("div", { cl: "main-skill-card "}, [
            node("div", { cl: "ms-icon" }, [ node("img", { cl: "ms-img" ,src: skill.icon, alt: `${skill.name} icon`, height: 64}) ]),
            node("div", { cl: "ms-details" }, [
                node("h4", { cl: "ms-name", innerText: skill.name }),
                node("span", { cl: "ms-desc", innerText: skill.description })
            ])
        ])
    }
))
mainSkillsDiv.append(msTitle, msSkills);

// know skills
function donutChart(innerNode, perc, extraClass) {
    if (!extraClass) extraClass = "";

    const deg = `${Math.floor(perc/100 * 360)}deg`;
    let donutType = "first";
    if (perc > 50 && perc < 75) {
        donutType = "second";
    }
    else {
        donutType = "third";
    }

    const donut = node("div", { cl: `donut-chart ${donutType} ${extraClass}` }, [node("span", null, [innerNode])], { "--deg": deg });
    return donut;
}

const ksTitle = node("h2", { cl: "skills-title", innerText: skillsInfo.know.title })
const ksSkills = node("div", { cl: "know-skills-div" } , [
    node("div", {cl: "know-skills-langs"}, skillsInfo.know.langs.map(
        (lang) => {return donutChart(node("img", { cl: "ks-lang-img", src: lang.icon, alt: `${lang.name} icon`, width: 48 }), lang.perc, "ks-lang")}
    )),
    node("div", {cl: "know-skills-techs"}, [
        node("div", {cl: "know-skills-techs-inner"}, skillsInfo.know.skills[0].map(
            (tech) => {return node("div", {cl: "ks-tech-card"}, [node("img", {cl: "ks-tech-img", src: tech.icon, alt: `${tech.name} icon`, height: 48})])}
        )),
        node("div", {cl: "know-skills-techs-inner"}, skillsInfo.know.skills[1].map(
            (tech) => {return node("div", {cl: "ks-tech-card"}, [node("img", {cl: "ks-tech-img", src: tech.icon, alt: `${tech.name} icon`, height: 48})])}
        ))
    ])
])
knowSkillsDiv.append(ksTitle, ksSkills)

// touch skills
const tsTitle = node("h2", { cl: "skills-title", innerText: skillsInfo.touch.title })
const tsSkills = node("div", { cl: "touch-skills-div" }, skillsInfo.touch.skills.map(
    (skill) => {return node("div", {cl: "ts-card"}, [node("img", {cl: "ts-img", src: webTech.icon, alt: `${webTech.name} icon`, height: 48})])}
))
touchSkillsDiv.append(tsTitle, tsSkills);