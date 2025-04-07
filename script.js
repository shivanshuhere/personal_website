document.addEventListener("DOMContentLoaded", ()=>{
    const contactForm =   document.getElementById("contact-form");
    async function handleContactFormSubmit (e){
        console.log(e);
        const data  ={
            name : "",
            email:"",
            phone:"",
            message:"",
        }
        try {
            const res = await axios.post("http:localhost:5000/send", data);
            alert("Message sent successfully. \nCheck your gmail...")
            console.log(JSON.stringify(res))   
        } catch (error) {
            alert("Failed to send message ! \nTry again later...");
            console.log(JSON.stringify(error))   

        }
        
    }
    contactForm.addEventListener("submit",handleContactFormSubmit)

    


})