const webdes = [
    {
        index: "1-1",
        title: "Restaurant Classic",
        descr: "Traditional, Old-Fashioned and Themed Website Design with Colorful Elements",
        image: "./index-designs/restaurant/classic.jpg",
        support: ["pc", "mob"],
        link: "./1vyanjan/content1home.html"
    }
]

const python = [
    {
        index: "2-1",
        title: "Tasky",
        descr: "An app that tracks and displays deadlines of upto 20 tasks",
        image: "./index-designs/tools/tlogo.jpg",
        support: ["win", "linux"],
        link: "https://github.com/AbhiK002/Tasky/releases/tag/v1.0.1"
    },
    {
        index: "2-1",
        title: "Virtual Keyboard",
        descr: "A GUI based customised virtual keyboard",
        image: "./index-designs/tools/vkblogo.jpg",
        support: ["win"],
        link: "https://github.com/AbhiK002/virtual-keyboard/releases/tag/v1.0"
    },
    {
        index: "2-2",
        title: "Rock Paper Scissors",
        descr: "Python version of the popular game of Rock Paper Scissors",
        image: "./index-designs/cli/rps.jpg",
        support: ["win", "linux"],
        link: "https://github.com/AbhiK002/Tasky/releases/tag/v1.0.1"
    },
    {
        index: "2-2",
        title: "Prime Numbers",
        descr: "A program to display all the prime numbers between 2 given numbers",
        image: "./index-designs/cli/prime.jpg",
        support: ["win", "linux"],
        link: "https://github.com/AbhiK002/Prime_Numbers"
    },
    {
        index: "2-3",
        title: "DVD Window Bounce",
        descr: "Python version of the popular DVD Screensaver",
        image: "./index-designs/fun/dvd.jpg",
        support: ["win", "linux"],
        link: "https://github.com/AbhiK002/dvd-bounce"
    },
    {
        index: "2-3",
        title: "Gravity with Python",
        descr: "Simulation of gravity and bounce fall effect on a floating window using tkinter",
        image: "./index-designs/fun/gravity.jpg",
        support: ["win", "linux"],
        link: "https://github.com/AbhiK002/bouncy-window"
    }
]

const icons = {
    "pc": ["./index-designs/pc-icon.svg", "PC"],
    "mob": ["./index-designs/mob-icon.svg", "Phone"],
    "win": ["./index-designs/windows.png", "Windows"],
    "linux": ["./index-designs/linux.png", "Linux"]
}

function renderDesign(card, num, py){
    desid = card.index + "-" + String(num);
    const target_div = document.getElementById(card.index);
    
    const design = document.createElement("div");
    design.className = "design" + py;
    design.id = desid;

        const des_img = document.createElement("img");
        des_img.className = "design-image";
        des_img.alt = "Image Error";
        des_img.src = card.image;

        const device_icons = document.createElement("div");
        device_icons.className = "device-icons unselectable";
            let dt = "Supports ";
            for(let j=0; j<card.support.length; j++){
                const icon = document.createElement("img");
                icon.className = "device-icon";
                icon.src = icons[card.support[j]][0];
                device_icons.append(icon);

                if(j != 0) dt = dt + " & " + icons[card.support[j]][1];
                else dt = dt + icons[card.support[j]][1];
            }

            const dev_text = document.createElement("span");
            dev_text.className = "device-text";
            dev_text.innerText = dt;
            device_icons.append(dev_text);

        const des_details = document.createElement("div");
        des_details.className = "design-details";
            const des_title = document.createElement("p");
            const des_desc = document.createElement("p");
            des_title.className = "design-title" + py;
            des_desc.className = "design-description";
            des_title.innerText = card.title;
            des_desc.innerText = card.descr;

            const des_actions = document.createElement("div");
            des_actions.className = "design-actions";
                const da_anchor = document.createElement("a");
                da_anchor.href = card.link;
                da_anchor.target = "_blank";
                    const daa_span = document.createElement("span");
                    daa_span.className = "view-icon" + py;
                        const daas_image = document.createElement("img");
                        daas_image.src = "./index-designs/view-icon.svg";
                        daas_image.className = "unselectable";
                        const daas_span = document.createElement("span");
                        daas_span.innerText = "VIEW";
                        daa_span.append(daas_image, daas_span);
                    da_anchor.append(daa_span);
                des_actions.append(da_anchor);

            des_details.append(des_title, des_desc, des_actions);
        design.append(des_img, device_icons, des_details);
    target_div.append(design);
}

function renderCards(){
    for(let i=0; i<webdes.length; i++) {
        renderDesign(webdes[i], i+1, "");
    }
    for(let i=0; i<python.length; i++) {
        renderDesign(python[i], i+1, "-python");
    }
    
}

renderCards();
