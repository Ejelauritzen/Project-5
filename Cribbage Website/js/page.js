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

function navigate(id) {
    let activePages = document.getElementsByClassName('active')
    for (let page of activePages) {
        page.classList.remove('active')
    }
    let newPage = document.getElementById(id)
    newPage.classList.add('active')
}
