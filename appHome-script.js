/* MEEM4630 App js*/

$("#content").hide()
var visited = document.cookie
if (visited == "true") {
	document.getElementById("content").innerHTML='<object type="text/html" data="homeContent.html"></object>';
	$("#content").show("slow")
} else {
	$("#content").show()
	$("#thing").show("slow")
	$("#spacer").click(function(){
		$("#thing").slideUp(500)
		$("#content").hide()
		document.getElementById("content").innerHTML='<object type="text/html" data="homeContent.html"></object>';
		$("#content").slideDown("slow")
	})
}
document.cookie = true

