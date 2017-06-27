var id = $("#loginid");
var pw = $("#loginpw");
var form = $("#loginform");

function validateForm(){
    if(id.val().length === 0){
        $("#logindiv").text("pls provide user nom");
        return false;
    } else{
        if(pw.val().length === 0){
            $("#pwdiv").text("pls provide password nom");
            return false;
        };
    };
    return true;
}
function submitForm(){
    $.ajax({
        url: "/ajax/login",
        type: "POST",
        data: form.serialize(),
        success: function(data, textStatus, xhr){
            window.location=data;
        },
        error: function(data){
            $("#logindiv").text("Wrong username or password!");
            $("#pwdiv").text("");
        }
    });
};

$("#loginform").on("submit", function(e){
    e.preventDefault();
    if(validateForm()){
        submitForm();
        return false;
    };
//    submitForm();
});