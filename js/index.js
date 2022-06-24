window.addEventListener("load", ()=>{
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(()=>{
        document.querySelector(".page-loader").style.display = 'none';
    },1000)
})

/* TOGGLE NAVBAR*/ 
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener('click', ()=>{
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling")
})

const hideSection=()=>{
    document.querySelector("section.active").classList.toggle("fade-out");
}
const toggleNavbar=()=>{
    document.querySelector(".header").classList.toggle("active");
}

// ACTIVE SECTION

document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("link-item")&& e.target.hash !== "" ){
        document.querySelector(".overlay").classList.add("active");
        navToggler.classList.add("hide");
        if(e.target.classList.contains("nav-item")){
            toggleNavbar();
        }
        else{
            hideSection();
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(()=>{
            document.querySelector("section.active").classList.remove("active", "fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0,0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");
        },500)
    }
})



const tabContainer = document.querySelector(".about-tabs");
const aboutSection = document.querySelector(".about-section");

tabContainer.addEventListener('click', (e)=>{
    if(e.target.classList.contains('tab-item') &&  !e.target.classList.contains('active')){
        tabContainer.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        const target = e.target.getAttribute('data-target');
        aboutSection.querySelector('.tab-content.active').classList.remove('active');
        aboutSection.querySelector(target).classList.add('active');
    }
});



// PORTFOLIO ITEM DETAILS//
document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('view-project-btn')){
        togglePortfolioPopup();
        document.querySelector('.portfolio-popup').scrollTo(0,0)
        portfolioItemDetails(e.target.parentElement);
    }
})
//TOGGLE POPUP//
const togglePortfolioPopup=()=>{
document.querySelector('.portfolio-popup').classList.toggle('open');
document.body.classList.toggle('hide-scrolling');
document.querySelector('.main').classList.toggle('fade-out')
}
//HIDE POPUP WHEN CLICKED OUT//
document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('pp-inner')){
        togglePortfolioPopup();
    }
})


//CLOSE POP-UP//
document.querySelector('.pp-close').addEventListener('click', togglePortfolioPopup);

const portfolioItemDetails=(portfolioItem)=>{
    document.querySelector('.pp-thumbnail img').src =
    portfolioItem.querySelector('.portfolio-item-thumbnail img').src;

    document.querySelector('.pp-header h3').innerHTML = portfolioItem.querySelector('.portfolio-item-title').innerHTML;

    document.querySelector('.pp-body').innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML;
}

// GET FORM DETAILS //

const form = document.getElementById("form")

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let formData = new FormData(form);
    const data={
        name: formData.get('name'),
        email : formData.get('email'),
        subject : formData.get('subject'),
        message : formData.get('message'),
    };
     const emailTemplate = {
    name: data.name,
    email: data.email,
    subject:data.subject,
    message: data.message,
  };

  emailjs.send("service_0w18qf8", "template_k8hlpki", emailTemplate).then(
    function () {
      console.log("SUCCESS!");
    input.forEach(item =>{
        if(item.value){
            notification.classList.add('show');
        }
    });
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
    
    form.reset();
    },
    function (error) {
      console.log("FAILED...", error);
       input.forEach(item =>{
        if(item.value){
            notificationFailure.classList.add('show');
        }
    });
    
    setTimeout(() => {
        notificationFailure.classList.remove('show');
    }, 3000);
    
    form.reset();
    }
  );
})

// NOTIFICATION

const submitBtn = document.getElementById("submit-btn");

const notification = document.querySelector(".notification");
const notificationFailure = document.querySelector(".notification.fail");
const input = document.querySelectorAll(".input-control");