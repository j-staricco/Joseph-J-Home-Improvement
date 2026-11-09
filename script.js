const menuToggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",open);menuToggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>'});document.querySelectorAll(".nav a").forEach(l=>l.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.innerHTML='<i class="fa-solid fa-bars"></i>'}));if(window.AOS)AOS.init({duration:750,once:true,offset:70});document.getElementById("year").textContent=new Date().getFullYear();
const signupForm = document.querySelector(".seasonal-form");
if (signupForm) {
  const status = signupForm.querySelector(".signup-status");
  const textLink = signupForm.querySelector(".signup-text");
  textLink.addEventListener("click", () => {
    const data = new FormData(signupForm);
    const fields = [["Name", "name"], ["Phone", "phone"], ["Email", "email"], ["Address", "property_address"], ["Property type", "property_type"], ["Service", "service"], ["Details", "details"]];
    const body = "Hi JJ, please add my property to your service list.\n" + fields.map(([label, key]) => label + ": " + (data.get(key) || "")).join("\n");
    const separator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? "&" : "?";
    textLink.href = "sms:+19089928635" + separator + "body=" + encodeURIComponent(body);
    status.textContent = "Tap Send in your text app to send your signup to JJ.";
  });
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = signupForm.querySelector('button[type="submit"]');
    if (button.disabled) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    button.disabled = true;
    status.textContent = "Sending your signup...";
    try {
      const response = await fetch("https://formsubmit.co/ajax/jstariccobusiness@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(signupForm))),
        signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === "true") || /activat|confirm.*email|verify/i.test(result.message || "")) throw new Error("Signup not confirmed");
      status.textContent = "Your signup was accepted. JJ will follow up to confirm service. If you do not hear back, text (908) 992-8635.";
    } catch (error) {
      status.textContent = "We could not confirm your signup. Your details are still here. Tap TEXT MY SIGNUP below, then tap Send in your text app to send them directly to JJ.";
    } finally {
      clearTimeout(timer);
      button.disabled = false;
    }
  });
}
