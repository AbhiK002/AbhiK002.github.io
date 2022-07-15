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

function setvis(id, value) {
    if(value == "0"){
    document.getElementById(id).style.visibility = "hidden";}
    else{
        document.getElementById(id).style.visibility = "visible";}
}

function getvis(id) {
    return document.getElementById(id).style.visibility;
}

function toggleFeedback() {
    let styleattr = getvis("feedbacktable");
    if(styleattr == "hidden"){
        setvis("feedbacktable", "1");
        setdata("feedbackbutton", "Give Feedback ▶")
        setdata("feedbackstatus", "")
    }
    else{
        setvis("feedbacktable", "0")
        setdata("feedbackbutton", "Give Feedback ▼")
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