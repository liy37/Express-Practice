//$(document).ready(function(){
//    $("button.save-button").click(function(e){
//        e.preventDefault();
//        $("savecontainer").slideToggle();
//        $("crcontainer").slideToggle();
//    });
//});
var user;

function loadSaves(){
$.ajax({
    url: "/ajax/user",
    type: "POST",
    success: function(data, textStatus, xhr){
        user = data;
//        for(var i = 1; i < 6; i++){
//            $("#l"+i).text(user.saves["s" + i].title);
//            $("#l"+i + " clickable").css("background-color", "black");
//        };
    }
});
}

$(".saveState").on("click", function(e){
    var savenum = $(this).attr('id')
    var pathname = window.location.pathname;
    $.ajax({
        url: "/user",
        type: "POST",
        data: {
            numberdata: savenum,
            userdata: user,
            url: pathname
        },
        success: function(data, textStatus, xhr){
            location.reload();
        }
    });
});

$(document).ready(function(){
    loadSaves();
})

$("#comment-collapse").on("click", function(e){
    $(".commentscontainer").toggle();
})