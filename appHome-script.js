/* MEEM4630 App js*/

$("#content").hide()
var visited = document.cookie
if (visited == "true") {
	document.getElementById("content").innerHTML='<object type="text/html" data="homeContent.html" style="height: 455px; width: 310px;"></object>';
	$("#content").fadeIn("slow")
} else {
	$("#content").show()
	$("#helper").fadeIn("1500")
	$("#helperButton").click(function() {
		$("#helper").slideUp("slow", function() {
			$("#content").hide()
			document.getElementById("content").innerHTML='<object type="text/html" data="homeContent.html" style="height: 455px; width: 310px;"></object>';
			$("#content").fadeIn("slow")
		})
	})
}
document.cookie = true

