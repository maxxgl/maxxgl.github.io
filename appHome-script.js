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
document.cookie = true


localStorage.setItem("size", "L");


$("#new").click(function() {
	$.get("entry.html", function (data) {
		$("#schedule").append(data)
		$(".entry").fadeIn("slow");
	})
})

