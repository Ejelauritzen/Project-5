/*

Project:  Project 5
Name: Erica Egbert
Submitted: April, 26, 2023

I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student,
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.

*/

let phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/

const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];
let form = null;
let successMsg = null;

function initValidation(formId, successId) {

    form = document.getElementById(formId);
    successMsg = document.getElementById(successId);

    let inputs = document.querySelectorAll("input");
    for (let input of inputs) {

        input.addEventListener("change", inputChanged);
    }
    form.addEventListener("submit", submitForm);

}

function inputChanged(ev) {
    let el = ev.currentTarget;
    validateForm();
    /*NOTE: we use 'was-validated' class so that you show the error indications only for the single field rather than the whole form at once*/
    el.classList.add("was-validated")

}

function submitForm(ev) {
    console.log("in submit");
    let form = ev.currentTarget;
    //if you don't preventDefault and stopPropagation
    //the default form action would be to redirect to the url in the 'action' attribute of the form
    //https://wp.zybooks.com/form-viewer.php
    ev.preventDefault(); //for now so we don't redirect
    ev.stopPropagation();

    validateForm();

    //DOM checkValidity function tells you current status of form according to html5

    if (!form.checkValidity()) {
        let formInputs = form.querySelectorAll("input");
        for (let input in formInputs) {
            input.classList.add("was-validated");
        }
    } else {
        form.classList.add("hidden")
        document.getElementById("success").classList.remove("hidden")
    }
}


function validateForm() {

    checkRequired("first-name", "First Name is Required");
    checkRequired("last-name", "Last Name is Required");
    checkRequired("address", "Address is Required");
    checkRequired("city", "City is Required");

    if (checkRequired("state", "State is Required")) {
        validateState("state", "Not a valid State, enter two digit code e.g., UT");
    }

    if (checkRequired("email", "Email Address is required")) {
        checkFormat("email", "email format is bad", emailRegex)
    }
    if (checkRequired("zip", "Zip Code is Required")) {
        checkFormat("zip", `malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex)
    }
    if (checkRequired("phone", "Phone is required")) {
        checkFormat("phone", "phone format is bad", phoneRegex)
    }
    checkRequired("facebook", "you must select at least one!");

}

function validateState(id, msg) {
    let el = document.getElementById(id);
    let valid = false;

    let upperCase = el.value.toUpperCase()
    if (stateAbbreviations.includes(upperCase)) {
        valid = true;
    }
    setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
    let el = document.getElementById(id);
    let valid = regex.test(el.value);
    //this function applies a regex to determine if element is valid


    setElementValidity(id, valid, msg);
    return valid;

}

function checkRequired(id, message) {
    let el = document.getElementById(id);
    let valid = false;
    let type = el.type;
    switch (type) {
        case 'text':
        case 'password':
            if (el.value === "") {
                valid = false;
            } else {
                valid = true;
            }
            break;

        case 'checkbox':
        case 'radio':
            let name = el.name;
            let checkList = document.getElementsByName(name)
            for (let check of checkList) {
                if (check.checked === true) {
                    valid = true;
                } else {
                    continue
                }
            }
    }
    setElementValidity(id, valid, message);


    return valid;
}

function setElementValidity(id, valid, message) {
    let el = document.getElementById(id);
    let messageDiv = el.parentElement.getElementsByClassName("errorMsg")[0];

    if (valid) { //it has a value
        messageDiv.innerHTML = ""

        el.setCustomValidity(''); //sets to no error message and field is valid
    } else {
        messageDiv.innerHTML = message;
        el.setCustomValidity(message); //sets error message and field gets 'invalid' stat

    }//TODO  insert or remove message in error div for element

}