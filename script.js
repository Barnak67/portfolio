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

/* =========================
   COPY EMAIL ON CLICK
========================= */

const copyEmailBtn = document.getElementById("copyEmail");

const toast = document.createElement("div");
toast.className = "toast";
toast.setAttribute("role", "status");
toast.setAttribute("aria-live", "polite");
document.body.appendChild(toast);

let toastTimer;

function showToast(message){
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function fallbackCopy(text){
    // For browsers / contexts where navigator.clipboard isn't available
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();

    let ok = false;
    try { ok = document.execCommand("copy"); } catch(err) { ok = false; }

    document.body.removeChild(temp);
    return ok;
}

copyEmailBtn.addEventListener("click", async (e) => {

    // Stop the mailto: link from opening the mail app
    e.preventDefault();

    const email = copyEmailBtn.dataset.email;
    let copied = false;

    try {
        if(navigator.clipboard && window.isSecureContext){
            await navigator.clipboard.writeText(email);
            copied = true;
        }else{
            copied = fallbackCopy(email);
        }
    }catch(err){
        copied = fallbackCopy(email);
    }

    showToast(copied ? "Email copied: " + email : "Couldn't copy. Email: " + email);

});