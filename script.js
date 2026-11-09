const menuToggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",open);menuToggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>'});document.querySelectorAll(".nav a").forEach(l=>l.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.innerHTML='<i class="fa-solid fa-bars"></i>'}));if(window.AOS)AOS.init({duration:750,once:true,offset:70});document.getElementById("year").textContent=new Date().getFullYear();
const signupForm = document.querySelector(".seasonal-form");
if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(signupForm);
    const fields = [["Name", "name"], ["Phone", "phone"], ["Address", "property_address"], ["Property type", "property_type"], ["Service", "service"], ["Details", "details"]];
    const body = "Hi JJ, please add my property to your service list.\n" + fields.map(([label, key]) => label + ": " + (data.get(key) || "")).join("\n");
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const separator = isApple ? "&" : "?";
    signupForm.querySelector(".signup-status").textContent = "Tap Send in your messaging app to complete your signup. If it did not open, text your name and property address to (908) 992-8635.";
    window.location.href = "sms:+19089928635" + separator + "body=" + encodeURIComponent(body);
  });
}
