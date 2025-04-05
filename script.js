document.addEventListener("DOMContentLoaded", ()=>{

    const contactForm =   document.getElementById("contact-form");


    async function handleContactFormSubmit (e){
        console.log(e);
        
    }
    contactForm.addEventListener("submit",handleContactFormSubmit)


})