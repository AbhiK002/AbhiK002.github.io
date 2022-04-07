function getdata(id) {
    return document.getElementById(id).innerHTML;
}

function setdata(id, self) {
    document.getElementById(id).innerHTML = self;
}

function getvalue(id) {
    return document.getElementById(id).value;
}

function setvalue(id, self) {
    document.getElementById(id).value = self;
}

function setattr(id, attr, value) {
    document.getElementById(id).setAttribute(attr, value);
}

function getattr(id, attr) {
    return String(document.getElementById(id).getAttribute(attr));
}

function toggleFeedback() {
    let styleattr = getattr("feedbacktable", "style");
    if(styleattr.includes("visibility: visible")){
        setattr("feedbacktable", "style", "visibility: hidden");
        setdata("feedbackbutton", "Give Feedback ▼")
    }
    else{
        setattr("feedbacktable", "style", "visibility: visible")
        setdata("feedbackbutton", "Give Feedback ▶")
        setdata("feedbackstatus", "")
    }
}

function submitFeedback() {
    if(getvalue("nameinput")!="" && getvalue("emailinput")!="" && getvalue("feedbackinput")!=""){
        toggleFeedback();
        setdata("feedbackstatus", "Thank you for your feedback!");
        setvalue("nameinput", "");
        setvalue("emailinput", "");
        setvalue("feedbackinput", "");
    }
}