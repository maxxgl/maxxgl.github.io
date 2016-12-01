/* MEEM4630 App js*/

document.cookie = "username=John Doe"

$("#content").hide();
document.getElementById("content").innerHTML='<object type="text/html" data="homeContent.html"></object>';     

var content = document.getElementById("content")
var t = document.createTextNode("Hello World")

$("#spacer").click(function(){
    $("#content").show("slow");
});

