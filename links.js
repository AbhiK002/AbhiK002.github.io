contentlinks = {
    home: "index.html",
    aboutUs: "aboutus.html",
    menu: "menu.html",
    gallery: "gallery.html",
    healthTips: "healthtips.html",
    contactUs: "contactus.html"
}

filelinks = {
    maincss: "css/main.css",
    css1: "css/content1home.css",
    css2: "css/content2aboutus.css",
    css3: "css/content3menu.css",
    css4: "css/content4gallery.css",
    css5: "css/content5healthtips.css",
    css6: "css/content6contactus.css",
}

function setlink(self, id) {
    document.getElementById(id).setAttribute("href", self);
}

function assignlinks() {
    setlink(filelinks.maincss, "maincsslinker");
    setlink(filelinks.css1, "css1linker");

    setlink(contentlinks.home, "toplogoimagelink");
    
    setlink(contentlinks.home, "homelink");
    setlink(contentlinks.home, "aboutuslink");
    setlink(contentlinks.home, "menulink");
    setlink(contentlinks.home, "gallerylink");
    setlink(contentlinks.home, "healthtipslink");
    setlink(contentlinks.home, "contactuslink");
}