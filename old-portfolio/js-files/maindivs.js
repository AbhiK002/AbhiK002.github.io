const paths = {
    home: "./index.html",
    about: "./about.html",
    contact: "./contact.html",
    logo: "./mainlogo.svg"
}

function makeElement(
    name, 
    e_id=null, 
    e_class=null, 
    e_href=null, 
    e_src=null,
    e_alt=null)
    {
        ele = document.createElement(name);
        if(e_id != null) ele.id = e_id;
        if(e_class != null) ele.className = e_class;

        if(name == "a"){
            if(e_href != null) ele.href = e_href;
        }

        else if(name == "img"){
            if(e_src != null) ele.src = e_src;
            if(e_alt != null) ele.alt = e_alt;
        }

        return ele;
    }

function makeTopDiv(source = "home") {
    active_link_id = "link-" + source;

    const top_div = makeElement("div", null, e_class="div-top");
        const logo = makeElement(
                "a", 
                e_id="logo-link", 
                e_class="unselectable", 
                e_href=paths.home
            )
            const logo_image = makeElement("img", 
                    e_id="logo-image", null, null,
                    e_src=paths.logo,
                    e_alt="AK | Abhineet Kelley")
            logo.append(logo_image);
        
        const navbar = makeElement("div", null, e_class="nav-bar");
            const home_link = makeElement("a", null, null, e_href=paths.home);
            home_link.innerText = "HOME";
            const about_link = makeElement("a", null, null, e_href=paths.about);
            about_link.innerText = "ABOUT";
            const contact_link = makeElement("a", null, null, e_href=paths.contact);
            contact_link.innerText = "CONTACT";
            
            switch(source) {
                case "home":
                    home_link.id = active_link_id; break;
                case "about":
                    about_link.id = active_link_id; break;
                case "contact":
                    contact_link.id = active_link_id; break;
                default:
                    break;
            }
            navbar.append(home_link); 
            navbar.append(about_link);
            navbar.append(contact_link);
        
        const temp_span = makeElement("span");

        const menuicon = makeElement("div", null, e_class="menu-icon");
        menuicon.onclick = toggleMenu;

            for(let i=0; i<3; i++) {
                menuicon.append(makeElement("span", null, e_class="icon-bar"));
            }
        
        top_div.append(logo);
        top_div.append(navbar);
        top_div.append(temp_span);
        top_div.append(menuicon);

    document.body.append(top_div);
}

function toggleMenu() {
    const navMenu = document.getElementsByClassName("nav-bar")[0];
    navMenu.classList.toggle('active');
}
