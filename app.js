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
                case "target": {
                    node.target = attributes[key]; break;
                }
                default: {
                    node.setAttribute(key, attributes[key]);
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
    photo: "./TESTS/me.jpg"
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

            // logoContainer.onmouseenter = showLogo
            // logoContainer.onmouseleave = null
            // runAfter(showLogo, 600)
        }
        else {
            setCssStyles(topDiv, {
                "background": "rgb(var(--major-bg))",
                "border-color": "rgba(var(--text-color), 0.1)",
                "box-shadow": "0 4px 16px rgba(0, 0, 0, 0.4)"
            });
            // logoContainer.onmouseenter = showLogo
            // logoContainer.onmouseleave = hideLogo
            // runAfter(hideLogo, 600)
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

let effectDone = false;
function loadDecoration() {
    const bars = document.getElementsByClassName("decoration-bar");
    for (const bar of bars) {
        setCssStyles(bar, { "opacity": "1" })
    }
    setCssStyles(secondh1, { "opacity": "1" })
    setCssStyles(designWord, { "background-color": "rgba(var(--sig-red), 0.2)" })
    stylesAfter(
        [designWord, "opacity", "1", 300],
        [intoWord, "opacity", "1", 600],
        [codeCursor, "visibility", "visible", 900]
    )
    if (effectDone) return;
    runAfter(typeCode, 1500);
    effectDone = true;
}

let lock = true;
function typeCode() {
    codeText.innerText = "C";
    runAfter(() => { codeText.innerText = "Co" }, 200)
    runAfter(() => { codeText.innerText = "Cod" }, 400)
    runAfter(() => { codeText.innerText = "Code" }, 700)
    runAfter(() => { lock = false; }, 1400)
}

function untypeCode() {
    codeText.innerText = "Cod";
    runAfter(() => { codeText.innerText = "Co" }, 200)
    runAfter(() => { codeText.innerText = "C" }, 400)
    runAfter(() => { codeText.innerText = "" }, 700)
}

codeText.addEventListener("mouseover", () => {
    if (lock) return;
    lock = true;
    untypeCode();
    runAfter(typeCode, 1400);
})

function controlDecoration(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runAfter(loadDecoration, 100)
        }
        // else {
        //     if (userScrollingUp) {
        //         runAfter(hideDecoration, 0)
        //     }
        // }
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
designWord.onmouseenter = switchBorderRadius

// myself-div
const myselfDiv = document.getElementsByClassName("myself-div")[0];
const myselfDetails = [
    'A <span class="gold">Full-Stack Web Developer</span> based in India',
    'Skilled in developing websites using technologies like <span class="gold">MERN</span>',
    'Hobbyist Desktop App Developer with <span class="gold">Python and Java</span>',
    'Fascinated with the <span class="gold">.NET</span> ecosystem with its cross platform techs'
]

myselfDiv.appendChild(
    node("div", {cl: "myself-container"}, [
        node("div", {cl: "myself-photo"}, [
            node("img", {cl: "myself-img", src: myDetails.photo, alt: "my photo", width: 128}),
        ]),
        node("div", {cl: "myself-details" }, myselfDetails.map(detail => {
            return node("p", { cl: "myself-item", innerHTML: detail })
        }))
    ])
)

// Skills Div
const mainSkillsDiv = document.getElementsByClassName("main-skills")[0];
const knowSkillsDiv = document.getElementsByClassName("know-skills")[0];
const touchSkillsDiv = document.getElementsByClassName("touch-skills")[0];

const skillsInfo = {
    main: {
        title: "Major Skills",
        skills: [
            {
                icon: "./resources/skills/mern.png",
                name: "MERN Stack Web Development",
                description: "I utilize the MERN stack efficiently to produce stable, optimised and beautiful dynamic websites that are able to satisfy the users' needs, in addition to the client's requirements."
            },
            {
                icon: "./resources/skills/vanilla.png",
                name: "Vanilla Web Development",
                description: "I am adept at creating interactive and modern static websites using only pure HTML, CSS, and vanilla JavaScript. In fact, I've built this portfolio with foundational web technologies."
            },
            // {
            //     icon: "./resources/skills/wpf.png",
            //     name: "WPF Desktop & Avalonia Development",
            //     description: "I develop feature-rich and efficient Windows desktop applications using the powerful technology WPF (Windows Presentation Foundation) and cross-platform apps using Microsoft's Avalonia."
            // },
            {
                icon: "./resources/skills/pyqt5.png",
                name: "Qt Desktop App Development",
                description: "I have a strong command of 'Qt,' a cross-platform desktop GUI technology, and utilize its Python variant, PyQt5, to develop desktop applications that have native-like features on any OS."
            }
        ]
    },
    know: {
        title: "Proficient with these technologies",
        langs: [
            { icon: "./resources/skills/py.png", name: "Python", perc: 80, url: "https://python.org/" },
            { icon: "./resources/skills/js.png", name: "JavaScript", perc: 75, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
            { icon: "./resources/skills/cs.png", name: "C#", perc: 65, url: "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/" },
            { icon: "./resources/skills/java.png", name: "Java", perc: 50, url: "https://www.java.com/en/download/help/whatis_java.html" }
        ],
        skills: [
            [
                { icon: "./resources/skills/react.png", name: "React", url: "https://react.dev/" },
                { icon: "./resources/skills/html.png", name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { icon: "./resources/skills/css.png", name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                { icon: "./resources/skills/nodejs.png", name: "NodeJS", url: "https://nodejs.org/en/about" },
                // { icon: "./resources/skills/ts.png", name: "TypeScript" },
                { icon: "./resources/skills/nextjs.png", name: "NextJS", url: "https://nextjs.org/" },
                { icon: "./resources/skills/mongodb.png", name: "MongoDB", url: "https://www.mongodb.com/" },
                { icon: "./resources/skills/sql.png", name: "SQL", url: "https://en.wikipedia.org/wiki/SQL" },
                // { icon: "./resources/skills/cloud.png", name: "Google Cloud/AWS" }
            ],
            [
                // { icon: "./resources/skills/winui.png", name: "WinUI", url: "https://learn.microsoft.com/en-us/windows/apps/winui/" },
                // { icon: "./resources/skills/wpf.png", name: "Windows Presentation Foundation (WPF)", url: "https://learn.microsoft.com/en-us/dotnet/desktop/wpf/overview/?view=netdesktop-7.0" },
                { icon: "./resources/skills/qt.png", name: "Qt", url: "https://www.qt.io/" },
                { icon: "./resources/skills/javafx.png", name: "JavaFX", url: "https://openjfx.io/" },
                { icon: "./resources/skills/tkinter.png", name: "tkinter", url: "https://docs.python.org/3/library/tkinter.html" },
                { icon: "./resources/skills/git.png", name: "Git", url: "https://git-scm.com/" },
                { icon: "./resources/skills/inkscape.png", name: "Inkscape", url:"https://inkscape.org/" },
                { icon: "./resources/skills/vscode.png", name:"Visual Studio Code" ,url:"https://code.visualstudio.com/"},
                // { icon:"./resources/skills/mspaint.png" ,name:"MS Paint"}
            ]
        ]        
    },
    touch: {
        title: "Foundational Understanding",
        skills: [
            { icon: "./resources/skills/electron.png", name: "ElectronJS", url: "https://www.electronjs.org/" },
            { icon:"./resources/skills/angular.png" ,name:"Angular" ,url:"https://angular.io/"},
            { icon: "./resources/skills/vite.png", name: "Vite", url: "https://vitejs.dev/" },
            { icon: "./resources/skills/chatgpt.png", name: "ChatGPT", url:"https://openai.com/blog/better-language-models/"},
            { icon: "./resources/skills/figma.png", name: "Figma", url: "https://www.figma.com/" },
            { icon: "./resources/skills/wordpress.png", name:"WordPress" ,url:"https://wordpress.org/"},
            { icon:"./resources/skills/bootstrap.png" ,name:"Bootstrap" ,url:"https://getbootstrap.com/"},
            { icon: "./resources/skills/bash.png", name: "Bash", url: "https://www.gnu.org/software/bash/" },
            { icon: "./resources/skills/excel.png", name: "Microsoft Office Excel", url: "https://www.microsoft.com/en-us/microsoft-365/excel" },
            // { icon: "./resources/skills/ppt.png", name: "MS PowerPoint", url: "https://www.microsoft.com/en-us/microsoft-365/powerpoint" },
            // { icon: "./resources/skills/photoshop.png", name: "PhotoShop" }
        ]        
    }
}

// main skills
const msTitle = node("h2", { cl: "skills-title", innerText: skillsInfo.main.title })
const msSkills = node("div", { cl: "main-skills-div" }, skillsInfo.main.skills.map(
    (skill) => {
        return node("div", { cl: "main-skill-card"}, [
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
function donutChart(innerNode, perc, extraClass, url) {
    if (!extraClass) extraClass = "";

    const deg = `${Math.floor(perc/100 * 360)}deg`;
    let donutType = "first";
    if (perc >= 50 && perc < 75) {
        donutType = "second";
    }
    else {
        donutType = "third";
    }

    const donut = node("a", { cl: `donut-chart ${donutType} ${extraClass}`, href: url, target: "_blank" }, [node("a", {cl: "donut-content"}, [innerNode, node("span", {cl: "perc-label", innerText: `${perc}%`})])], { "--deg": deg });
    return donut;
}

const ksTitle = node("h2", { cl: "skills-title", innerText: skillsInfo.know.title })
const ksSkills = node("div", { cl: "know-skills-div" } , [
    node("div", {cl: "know-skills-langs"}, skillsInfo.know.langs.map(
        (lang) => {return node("div", {cl: "ks-lang-container"}, [
            donutChart(node("img", { cl: "kl-img", src: lang.icon, alt: `${lang.name} icon`, width: 48 }), lang.perc, "ks-lang", lang.url),
            node("span", {cl: "tooltip kl-info", innerText: lang.name})
        ])}
    )),
    node("div", {cl: "know-skills-container"}, [
        node("div", {cl: "know-skills-inner"}, skillsInfo.know.skills[0].map(
            (skill) => {return node("div", {cl: "skill-card-container"}, [
                node("a", {cl: "skill-card ks", href: skill.url, target: "_blank"}, [node("img", {cl: "skill-img ks", src: skill.icon, alt: `${skill.name} icon`, height: 48})]),
                node("span", {cl: "tooltip ks-info", innerText: skill.name})
            ])}
        )),
        node("div", {cl: "know-skills-inner"}, skillsInfo.know.skills[1].map(
            (skill) => {return node("div", {cl: "skill-card-container"}, [
                node("a", {cl: "skill-card ks", href: skill.url, target: "_blank"}, [node("img", {cl: "skill-img ks", src: skill.icon, alt: `${skill.name} icon`, height: 48})]),
                node("span", {cl: "tooltip ks-info", innerText: skill.name})
            ])}
        ))
    ])
])
knowSkillsDiv.append(ksTitle, ksSkills)

// touch skills
const tsTitle = node("h2", { cl: "skills-title", innerText: skillsInfo.touch.title })
const tsSkills = node("div", { cl: "touch-skills-div" }, skillsInfo.touch.skills.map(
    (skill) => {return node("div", {cl: "skill-card-container"}, [
        node("a", {cl: "skill-card ts", href: skill.url, target: "_blank"}, [node("img", {cl: "skill-img ts", src: skill.icon, alt: `${skill.name} icon`, height: 48})]),
        node("span", {cl: "tooltip ts-info", innerText: skill.name})
    ])}
))
touchSkillsDiv.append(tsTitle, tsSkills);

const cc = (str) => {return document.getElementsByClassName(str)}
const gd = (id) => {return document.getElementById(id)}

function bringItBack(entries, observer) {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            cc("myself-photo")[0].classList.add("bring-it-back");
            runAfter(() => {
                gd("myself-title").classList.add("bring-it-back")
            }, 200);
            let time = 200;
            for (const item of cc("myself-item")) {
                runAfter(() => {
                    item.classList.add("bring-it-back")
                }, time);
                time += 150
            }
        }
        else {
            if (userScrollingUp) {
                cc("myself-photo")[0].classList.remove("bring-it-back");
                gd("myself-title").classList.remove("bring-it-back")
                for (const item of cc("myself-item")) {
                    item.classList.remove("bring-it-back")
                }
            };
        }
    }
}

let myselfObserver = new IntersectionObserver(bringItBack, { root: null, rootMargin: '0px', threshold: 0.5 })
myselfObserver.observe(cc("myself-div")[0])

function skillsScrollEffect(entries, observer, subjects) {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            let time = 0;
            for (const subject of subjects) {
                runAfter(() => {
                    subject.classList.add("bring-it-back");
                }, time);
                time += 150;
            }
        }
        else {
            if (userScrollingUp) {
                // for (const subject of subjects) {
                //     subject.classList.remove("bring-it-back");
                // }
            }
        }
    }
}

let skillObserver = new IntersectionObserver((e, o) => {skillsScrollEffect(e, o, cc("main-skill-card"))}, { root: null, rootMargin: '0px', threshold: 0.4 })
skillObserver.observe(cc("main-skills")[0])

let moreSkillsObserver = new IntersectionObserver((e, o) => {skillsScrollEffect(e, o, document.querySelectorAll(".touch-skills-div .skill-card-container"))}, {root: null, rootMargin: '0px', threshold: 0.4 })
moreSkillsObserver.observe(cc("touch-skills-div")[0])

let moreSkillsObserver2 = new IntersectionObserver((e, o) => {skillsScrollEffect(e, o, document.querySelectorAll(".know-skills-inner .skill-card-container"))}, {root: null, rootMargin: '0px', threshold: 0.4 })
moreSkillsObserver2.observe(cc("know-skills-div")[0])

// about me div
aboutMeContent = [
    [
        "User-Centric Development",
        `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="29.879mm" height="29.879mm" version="1.1" viewBox="0 0 29.879 29.879" xmlns="http://www.w3.org/2000/svg">
         <path class="border-ele" d="m14.939 0.99057c-7.6951-3.7e-7 -13.948 6.2533-13.948 13.948 0 7.6951 6.2533 13.948 13.948 13.948 7.6951 0 13.948-6.2533 13.948-13.948 1e-6 -7.6951-6.2533-13.948-13.948-13.948z" fill="none" stroke="#ffc880" stroke-width="1.8"/>
         <path class="border-ele move-it" d="m14.94 5.8865c3.2584 3e-7 5.8761 2.6179 5.8761 5.8761 0 3.2584-2.6179 5.8789-5.8761 5.8789-3.2584 0-5.8789-2.6205-5.8789-5.8789s2.6205-5.8761 5.8789-5.8761z" fill="none" stroke="#ffc880" stroke-width="1.5"/>
         <g class="fill-ele move-it">
          <path d="m10.915 15.042s-0.67487 0.05477-2.114 1.145c-1.439 1.0902-2.9092 3.0677-3.0156 6.2461l-0.13281 3.9492 1.5 0.05078 0.13086-3.9492c0.092198-2.7524 1.2667-4.2249 2.4238-5.1016 1.1571-0.87667 2.2598-1.0859 2.2598-1.0859z" />
          <path d="m19.131 15.042-1.309 1.2544s1.1026 0.20927 2.2598 1.0859c1.1571 0.87667 2.3316 2.3491 2.4238 5.1016l0.13086 3.9492 1.5-0.05078-0.13281-3.9492c-0.10646-3.1784-1.5766-5.1559-3.0156-6.2461-0.85694-0.80279-0.77109-0.89436-1.857-1.145z" />
          <path class="move-it" d="m18.678 10.705c0 0.60332-0.48908 1.0924-1.0924 1.0924s-1.0924-0.48908-1.0924-1.0924 0.48908-1.0924 1.0924-1.0924 1.0924 0.48908 1.0924 1.0924z"/>
          <path class="move-it" d="m13.386 10.705c0 0.60332-0.48908 1.0924-1.0924 1.0924s-1.0924-0.48908-1.0924-1.0924 0.48908-1.0924 1.0924-1.0924 1.0924 0.48908 1.0924 1.0924z"/>
          <path class="move-it" d="m12.036 13.142c-0.34857 0.24786-0.42008 0.71868-0.15963 1.0508 0.6546 0.8371 1.3968 1.3379 2.1509 1.5391 0.75414 0.2012 1.4774 0.09328 2.0547-0.11719 1.1549-0.42094 1.8767-1.2539 1.8767-1.2539 0.28405-0.31379 0.24738-0.78801-0.08187-1.0586-0.32935-0.2706-0.8263-0.23472-1.1093 0.08008 0 0-0.55015 0.57828-1.2464 0.83203-0.34811 0.12688-0.69747 0.17172-1.0704 0.07227-0.3729-0.09946-0.81404-0.35102-1.3139-0.99024-0.25909-0.33329-0.75254-0.40244-1.1011-0.1543z"/>
         </g>
         </svg>        
        `,
        "I prioritize user-centric design, crafting bug-free, beautiful apps and websites that seamlessly cater to users' needs."
    ],
    [
        "Strong Fundamental Concepts",
        `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="28.635mm" height="30.029mm" version="1.1" viewBox="0 0 28.635 30.029" xmlns="http://www.w3.org/2000/svg">
         <g fill="none" stroke="#e49c3e" stroke-width="1.6" class="border-ele">
          <path d="m6.7573 1.2534h15.203c2.9921 0 5.4009 2.4088 5.4009 5.4009v16.346c0 2.9921-2.4088 5.4009-5.4009 5.4009h-15.203c-2.9921 0-5.4009-2.4088-5.4009-5.4009v-16.346c0-2.9921 2.4088-5.4009 5.4009-5.4009z"/>
          <path id="modern-icon-part" fill=none d="m16.23 4.4438c8.2546 0.09521 8.092 8.2403 8.092 8.2403 0 0.28038-0.16672 0.5061-0.37381 0.5061h-7.7181c-0.20709 0-0.37381-0.22572-0.37381-0.5061v-7.7342c0-0.28038 0.16672-0.5061 0.37381-0.5061z"/>
          <path id="modern-icon-whole" d="m13.144 8.7001c-2.0994-0.047992-4.2051 0.78224-5.7069 2.25s-2.3799 3.554-2.3799 5.6539 0.87814 4.1861 2.3799 5.6539 3.6075 2.298 5.7069 2.25c2.1135-0.04832 4.1926-0.98664 5.627-2.5396 1.4344-1.553 2.2051-3.6998 2.0858-5.8105"/>
         </g>
        </svg>
        
        `,
        "In addition to new frameworks and technologies, I'm well aware of the underlying fundamental concepts that make them up."
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
        "I'm detail-focused, leaving no part of the app unnoticed. Small details do impact an app's impression and usability."
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
        "I excel at innovative problem-solving, embracing challenges with a fresh perspective to craft unique solutions."
    ]
]

const aboutMeCardsDiv = document.getElementsByClassName("aboutme-cards-div")[0];
const aboutMeDivTitle = document.getElementsByClassName("aboutme-div-title")[0];

function makeAboutMeCard(title, description, icon) {
    let cardDiv = node("div", {cl: "aboutme-card"}, [
        node("div", {cl: "aboutme-icon", innerHTML: icon}),
        node("div", {cl: "aboutme-card-bottom"}, [
            node("div", {cl: "aboutme-title", innerText: title}),
            node("div", {cl: "aboutme-desc", innerText: description})
        ])
    ])
    return cardDiv
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
            "transform": `translateY(${letter_shuffle[i]}rem)`,
            "color": "rgb(var(--sig-orange))"
        });
    }
};
function undoFunnyTextEffects() {
    for (let i = 0; i < creat_letters.length; i++) {
        setCssStyles(creat_letters[i], {
            "transform": "translateY(0rem)",
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
            "transform": `translateY(${letter_shuffle[i]}rem)`,
            "color": "rgb(var(--sig-orange))"
        });
    }
}
function undoCircularTextEffects() {
    for (let i = 0; i < simpl_letters.length; i++) {
        setCssStyles(simpl_letters[i], {
            "transform": "translateY(0rem)",
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
            "transform": `translateY(${letter_shuffle[i]}rem)`,
            "color": "rgb(var(--sig-orange))"
        });
    }
}
function undoSquareTextEffects() {
    for (let i = 0; i < perfection_letters.length; i++) {
        setCssStyles(perfection_letters[i], {
            "transform": "translateY(0rem)",
            "color": "rgb(var(--text-color))"
        });
    }
}
function makeSquare() {
    for (let i = 0; i < shapes; i++) {
        const shape = document.getElementById(`shape${i + 1}`);
        setCssStyles(shape, {
            "transform": `translate(${squareCoords[i]})`,
            "border-radius": "1rem"
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
            shapeFuncs[i][1]();
            runAfter(shapeFuncs[i][2], 800);

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

// Projects Div
const projectsDiv = document.getElementsByClassName("projects-div")[0];
const projectsList = document.getElementsByClassName("projects-list")[0];
const projectPreview = document.getElementsByClassName("project-preview")[0];

const projects = [
    {
        title: "Gismos - Tech Shopping",
        descr: "A full stack e-commerce website that allows users to browse tech gadgets like laptops, smartphones, headsets, and a lot more. It's complete with secure user authentication, a shopping cart, product filters and sorting functionalities.",
        image: "./resources/projects/gismos.jpg",
        link: "https://abhik002.github.io/gismos",
        github: "https://github.com/AbhiK002/gismos",
        techstack: ["MongoDB", "Express", "React", "Node"],
        disabled: false
    },
    {
        title: "EduLearn - Online Learning",
        descr: "An online course selling website that lets users buy their desired courses via the Razorpay payment gateway. It features secure user authentication, a basic searching feature and a modern user interface, along with special admin accounts.",
        image: "./resources/projects/edulearn.jpg",
        link: "https://edulearn-abhik002.netlify.app",
        github: "https://github.com/AbhiK002/edulearn",
        techstack: ["MongoDB", "Express", "React", "Node", "Razorpay"],
        disabled: false
    },
    {
        title: "CallThem - Contacts Storage",
        descr: "A CRUD application that lets you store your contacts in a secure database after securely registering with your email and password. It boasts a beautiful, neon lighting themed and interactive user interface along with a secure token based authorization.",
        image: "./resources/projects/callthem.jpg",
        link: "https://abhik002.github.io/call-them",
        github: "https://github.com/AbhiK002/call-them",
        techstack: ["MongoDB", "Express", "React", "Node"],
        disabled: false
    },
    {
        title: "Website Portfolio",
        descr: "A showcase of my work and some information about me, converted into an elegantly designed static website. Comes in 2 color themes and has lots of animations without any dependence on 3rd party libraries.",
        image: "./resources/projects/portfolio.jpg",
        link: "https://abhik002.github.io/",
        github: "https://github.com/AbhiK002/AbhiK002.github.io",
        techstack: ["HTML", "CSS", "JavaScript"],
        disabled: false,
        specialDisabled: true
    }
]

function addProjects(list) {
    for (let i=0; i<list.length; i++) {
        const project = list[i];
    
        projectsList.append(
            node("div", { cl: `project ${(i%2 == 1 ? "alt" : "")}` }, [
                node("div", { cl: "project-media" }, [
                    node("img", { src: project.image, width: 256, alt: "Project Image" })
                ]),
                node("div", { cl: "project-details" }, [
                    node("h2", { cl: "project-title", innerText: project.title }),
                    node("p", { cl: "project-desc", innerText: project.descr }),
                    node("p", { cl: "project-tech", innerText: "Tech Stack: " }, [
                        node("span", { cl: "gold", innerText: project.techstack.join(", ") })
                    ], { "font-family": "var(--second-font)"}),
                    node("div", { cl: "project-buttons" }, [
                        node("a", { type: "button", cl: "project-button left", href: project.github, target: "_blank" }, [
                            node("img", { src: "./resources/github-logo.svg", width: 36, alt: ">"}),
                            node("span", { innerText: "Source Code"} )
                        ]),
                        node((project.specialDisabled ? "span" : "a"), { type: "button", cl: `project-button right ${project.disabled ? "unavailable" : ""} ${project.specialDisabled ? "special-disabled" : ""}`, href: project.link, target: "_blank" }, [
                            node("img", { src: "./resources/web.png", width: 36, alt: ">"}),
                            node("span", { innerText: (project.specialDisabled ? "You're here!" : "Visit") } )
                        ])
                    ])
                ])
            ])
        )
    }
}

addProjects(projects)

function controlProjects(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("viewed");
        }
        else {
            if (userScrollingUp) entry.target.classList.remove("viewed");
        }
    })
}

let projectsObserver = new IntersectionObserver(controlProjects, { ...options, threshold: 0.5});
for (const proj of document.getElementsByClassName("project")) {
    projectsObserver.observe(proj)
}