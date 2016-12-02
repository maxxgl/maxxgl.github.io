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

// localStorage.setItem(i, JSON.stringify(["L","1 tbsp","2 lumps"]));
// JSON.parse(localStorage.getItem(i));

$("#new").click(function() {
	$.get("entry.html", function (data) {
		$("#schedule").append(data)
		$(".entry").fadeIn("slow");
	})
})

