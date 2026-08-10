const nav = document.querySelector("nav");

nav.addEventListener("mousemove",(e)=>{

    const rect = nav.getBoundingClientRect();

    nav.style.setProperty("--x",(e.clientX-rect.left)+"px");

    nav.style.setProperty("--y",(e.clientY-rect.top)+"px");

});

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        nav.classList.add("scrolled");

    }else{

        nav.classList.remove("scrolled");

    }

});

const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

const navMain = document.getElementById("navMain");
const navLogoBtn = document.getElementById("navLogoBtn");

navLogoBtn.addEventListener("click", () => {
    navMain.classList.toggle("expanded");
});

navLogoBtn.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        navMain.classList.toggle("expanded");
    }
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMain.classList.remove("expanded");
    });
});

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});