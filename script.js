
//Typing animation
var typed = new Typed(".typing", {
    strings: ["Student", "Web Developer", "Freelancer", "Electrical Engineer"],
    typeSpeed: 130,
    backSpeed: 80,
    loop: true
}); 

//Whatsapp button function
function DisplayNumber(){
    alert("WhatsApp Number\n+923135445595");
}

// Instagram button function
function ComingSoon(){
    alert("Instagram Profile is Avalible Soon");
}

//Scroll to Sections

// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener("click", function(e){
//         e.preventDefault();
//         document.querySelector(this.getAttribute("href")).scrollIntoView({
//             behaviour : "smooth"
//         });
//     });
// });