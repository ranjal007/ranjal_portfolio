
window.addEventListener("load",function(){
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function(){
        document.querySelector(".preloader").style.display="none";
    },3000)
})

//firebase


var firebaseConfig = {
    // apiKey: "AIzaSyBwajr9IL63JWo2tZ4THp1eMdFLlM8DlbU",
    // authDomain: "portfolio-db81d.firebaseapp.com",
    // databaseURL: "https://portfolio-db81d.firebaseio.com",
    // projectId: "portfolio-db81d",
    // storageBucket: "portfolio-db81d.appspot.com",
    // messagingSenderId: "367305720933",
    // appId: "1:367305720933:web:6d22a437dfeb3bf9bb328c"
    apiKey: "AIzaSyAGYGHq7zoz4IeFMknS5uhN3lgMSDpsG1o",
    authDomain: "ranjal-portfolio.firebaseapp.com",
    databaseURL: "https://ranjal-portfolio.firebaseio.com",
    projectId: "ranjal-portfolio",
    storageBucket: "ranjal-portfolio.appspot.com",
    messagingSenderId: "781269750913",
    appId: "1:781269750913:web:aa018cc0ac2a713e626980"
  };
  firebase.initializeApp(firebaseConfig);

  var messagesRef=firebase.database().ref('/messages');
document.getElementById('contactForm').addEventListener('submit',submitForm);


function submitForm(e){
    e.preventDefault();


    var name=getInputVal('name');
    var email=getInputVal('email');
    var email=getInputVal('subject');
    var comment=getInputVal('comment');
    saveMessages(name,email,subject,comment);


    document.getElementById('contactForm').reset();
}


function getInputVal(id){
    return document.getElementById(id).value;
}

function saveMessages(name,email,subject,comment){
    var newMessageRef=messagesRef.push();
    newMessageRef.set({
        name:name,
        email:email,
        subject:subject,
        comment:comment
    });
    

    //show alert

    document.querySelector(".alert").style.display="block";


    //hide after 3 seconds

    setTimeout(function(){
        document.querySelector(".alert").style.display="none";
    },3000)

}


// portfolio item filter
let totalFilterItems=0;

const filterContainer=document.querySelector(".portfolio-filter"),
    filrerBtns=filterContainer.children,
    totoalFilterBtn=filrerBtns.length,
    portfolioItems=document.querySelectorAll(".portfolio-item"),
    totalPortfolioItem=portfolioItems.length;

    for(let i=0;i<totoalFilterBtn;i++){
        filrerBtns[i].addEventListener("click",function(){
            filterContainer.querySelector(".active").classList.remove("active");
            this.classList.add("active"); 


            const filterValue=this.getAttribute("data-filter");
            
            for(k=0;k<totalPortfolioItem;k++){
                // console.log(filterValue);
                if(filterValue===portfolioItems[k].getAttribute("data-category")){
                    portfolioItems[k].classList.add("show");
                    portfolioItems[k].classList.remove("hide");
                    totalFilterItems++;
                }
                else{
                    portfolioItems[k].classList.remove("show");
                    portfolioItems[k].classList.add("hide");
                }
                if(filterValue==="all"){
                    portfolioItems[k].classList.add("show");
                    portfolioItems[k].classList.remove("hide");
                    totalFilterItems=6;
                
                }
            }
           // console.log(totalFilterItems);
             check();
            totalFilterItems=0;
          
        })
        
    }

    function check(){
        //console.log(totalFilterItems);
    }

    //portfolio lightbox
    //console.log(totalFilterItems);
    const lightbox =document.querySelector(".lightbox"),
        lightboxClose=lightbox.querySelector(".lightbox-close"),
        lightboxImg=lightbox.querySelector(".lightbox-img"),
        lightboxText=lightbox.querySelector(".caption-text"),
        lightboxCounter=lightbox.querySelector(".caption-counter");

    let itemIndex=0;
    
    for(let i=0;i<totalPortfolioItem;i++){
        portfolioItems[i].addEventListener("click",function(){
            itemIndex=i;
            changeItem();
            toggleLightbox();
        })
    }


    function nextItem(){
        if(itemIndex===totalPortfolioItem - 1){
            itemIndex=0;
        }
        else{
            itemIndex++;
        }
        changeItem();
    }
    

    function prevItem(){
        if(itemIndex===0){
            itemIndex=totalPortfolioItem-1;
        }
        else{
            itemIndex--;
        }
        changeItem();
    }

    function toggleLightbox(){
        lightbox.classList.toggle("open");
    }
    function changeItem(){
        imgSrc=portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
        lightboxImg.src=imgSrc;
        lightboxText.innerHTML=portfolioItems[itemIndex].querySelector("h4").innerHTML;
        lightboxCounter.innerHTML=(itemIndex+1) +" of "+ totalPortfolioItem;
    }

    //close light box


    lightbox.addEventListener("click",function(event){
        if(event.target=== lightboxClose|| event.target=== lightbox){
            toggleLightbox();
        }
    })



    //aside navbar


    const nav =document.querySelector(".nav"),
    navList=nav.querySelectorAll("li"),
    totalNavList=navList.length,
    allSection=document.querySelectorAll(".section"),
    totalSection=allSection.length;


    for(let i=0;i<totalNavList;i++){
        const a=navList[i].querySelector("a");
        a.addEventListener("click",function(){

            //remove back section class
            removeBackSectionClass();
            
       
            for(let j=0;j<totalNavList;j++){
                if(navList[j].querySelector("a").classList.contains("active")){

                    // add back section class
                    addBackSectionClass(j);
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active");
            showSection(this);
            if(window.innerWidth<1200){
                asideSectionTogglerBtn();
            }
        })
    }

    function removeBackSectionClass(){
         for(let i=0;i<totalSection;i++){
            allSection[i].classList.remove("back-section");
         }
    }
    
    function addBackSectionClass(num){
        allSection[num].classList.add("back-section");
    }

    function showSection(element){

        for(let i=0;i<totalSection;i++){
            allSection[i].classList.remove("active");
        }

        const target=element.getAttribute("href").split("#")[1];
        
        document.querySelector("#"+target).classList.add("active");
    }

    
    function updateNav(element){
        for(let i=0;i<totalNavList;i++){
            navList[i].querySelector("a").classList.remove("active");
            const target =element.getAttribute("href").split("#")[1];
            if(target===navList[i].querySelector("a").getAttribute("href").split("#")[1]){
                navList[i].querySelector("a").classList.add("active");
            }
        }
    }

        document.querySelector(".hire-me").addEventListener("click",function(){
            const sectionIndex=this.getAttribute("data-section-index");
            showSection(this);
            updateNav(this);
            removeBackSectionClass();
            addBackSectionClass(sectionIndex);
        })

    const navTogglerBtn =document.querySelector(".nav-toggler"),
        aside=document.querySelector(".aside");


        navTogglerBtn.addEventListener("click",()=>{
                asideSectionTogglerBtn();
        })

        function asideSectionTogglerBtn(){
            aside.classList.toggle("open");
            navTogglerBtn.classList.toggle("open");
            for(let i=0;i<totalSection;i++){
                allSection[i].classList.toggle("open");
            }
        }


