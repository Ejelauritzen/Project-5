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

document.addEventListener("DOMContentLoaded", function(event) {
    initValidation("myForm");
});

function changeTheme() {
    const themeStyle = Array.from(document.styleSheets).find(styleSheet =>
        styleSheet.href.includes('theme'))

    if (themeStyle !== undefined) {
        const ownerNode = themeStyle.ownerNode
        ownerNode.parentNode.removeChild(ownerNode);
        return;
    }

    const newStyle = document.createElement('link')
    newStyle.rel = 'stylesheet';
    newStyle.type = 'text/css';
    newStyle.href = 'css/theme.css';
    document.getElementsByTagName('head')[0].appendChild(newStyle);
}
document.addEventListener("DOMContentLoaded", function() {
    initValidation("myform");
});
