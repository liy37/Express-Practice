var form = $("#post-form");
var title = $("#post-title");
var story = $("#post-text");
var summary = $("#post-summary");
var choiceA = $("#post-ca");
var choiceB = $("#post-cb");
var titleicon = $("#newpost-checklist p:nth-of-type(1)");
var storyicon = $("#newpost-checklist p:nth-of-type(2)");
var summaryicon = $("#newpost-checklist p:nth-of-type(3)");
var choiceABicon = $("#newpost-checklist p:nth-of-type(4)");

function makecross(){
    this.addClass("fa-times");
    this.removeClass("fa-check");
}

function makeplus(){
    this.removeClass("fa-times");
    this.addClass("fa-check");
}
function checkTitle(){
    if (title.val().length < 1 || title.val().length > 50){
        titleicon.html("<p><i class='fa fa-times' aria-hidden='true'></i>Title must be between 1-80 characters.</p>").css("color", "red");
        return false;
    } else{
        titleicon.html("<p><i class='fa fa-check' aria-hidden='true'></i>Title must be between 1-80 characters.</p>").css("color", "green");
    }
    return true;
}
function checkStory(){
    if (story.val().length < 1 || story.val().length > 1200){
        storyicon.html("<p><i class='fa fa-times' aria-hidden='true'></i>Story must be between 1-1200 characters.</p>").css("color", "red");
        return false;
    } else{
        storyicon.html("<p><i class='fa fa-check' aria-hidden='true'></i>Story must be between 1-1200 characters.</p>").css("color", "green");
    }
    return true;
}
function checkSummary(){
    if (summary.val().length < 1 || summary.val().length > 300){
        summaryicon.html("<p><i class='fa fa-times' aria-hidden='true'></i>Summary must be between 1-300 characters.</p>").css("color", "red");
        return false;
    } else{
        summaryicon.html("<p><i class='fa fa-check' aria-hidden='true'></i>Summary must be between 1-300 characters.</p>").css("color", "green");
    }
    return true;
}
function checkAB(){
    if (choiceA.val().length === 0 || choiceB.val().length === 0){
        choiceABicon.html("<p><i class='fa fa-times' aria-hidden='true'></i>Choice A and Choice B must be filled.</p>").css("color", "red");
        return false;
    } else{
        choiceABicon.html("<p><i class='fa fa-check' aria-hidden='true'></i>Choice A and Choice B must be filled.</p>").css("color", "green");
    }
    return true;
}
function validateForm(){
    var sum = 0 + checkTitle() + checkStory() + checkSummary() + checkAB();
    if(sum===4){
        return true;
    } else{
        return false;
    }
}

form.on("submit", function(e){
  
    e.preventDefault(); 
   
    if (validateForm()){
        $.ajax({
            url: "/ajax/read",
            type:"POST",
            data: form.serialize(),
            success: function(data, textStatus, xhr){
                window.location.href = '/read\/' + data.returnurl;
            }
        });
    }
});

