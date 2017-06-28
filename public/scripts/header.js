var modalwindow = $(".modal");
var modalbox = $(".modal-box");
var modalbutton = $(".nav-login");
var modal = document.querySelector(".modal");
var navbar = $(".table-container");
var submitbutton = $("#submit-button");
var loggedin = 0;
var savebutton = $("button.save-button");

navbar.on("click", ".nav-login", function(){
    openmodal();
});

window.onclick = function(e){
    if(e.target === modal){
        closemodal();
    }
}
function openmodal(){
    modalwindow.fadeIn();
    modalbox.slideDown();  
};

function closemodal(){
        modalbox.slideUp();
        modalwindow.fadeOut();    
}
function checkLogin(){
$.ajax({
    url: "/ajax/user",
    type: "POST",
    success: function(data, textStatus, xhr){
        loggedin = 1;
    },
    error: function(data){
        loggedin = 0;
    }
});
}

submitbutton.on("click", function(e){
    if(!loggedin){
        e.preventDefault();
        openmodal();
    };
})

savebutton.on("click", function(e){
    if(!loggedin){
        e.preventDefault();
        openmodal();        
    } else{
        $(".save-container").slideToggle();
        $(".crcontainer").slideToggle();       
    }
});

checkLogin();