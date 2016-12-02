/* MEEM4630 App js*/

var visited = document.cookie
if (visited == "true") {
	$("#homeContent").fadeIn("slow")
} else {
	$("#helper").fadeIn("1500")
	$("#helperButton").click(function() {
		$("#helper").slideUp("slow", function() {
			$("#homeContent").fadeIn("slow")
		})
	})
}
// document.cookie = true

localStorage.setItem("size", "L");

$('#schedule').load('entry.html')

//('<object type="text/html" data="entry.html" style="height: 70px; width: 310px;"></object>')

