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

var values = {}
$('#scheduler').submit(function() {
	values.size = $("#sizeIn").val()
	values.cream = $("#creamIn").val()
	values.sugar = $("#sugarIn").val()
	values.Su = $("#Su").prop('checked')
	values.M = $("#M" ).prop('checked')
	values.T = $("#T" ).prop('checked')
	values.W = $("#W" ).prop('checked')
	values.R = $("#R" ).prop('checked')
	values.F = $("#F" ).prop('checked')
	values.St = $("#St").prop('checked')
	values.timeIn = $("#timeIn").val()

	localStorage.setItem(localStorage.length, JSON.stringify(values))
    window.location.href = "appHome.html"
})


for (var i = 0; i < localStorage.length; i++) {
	var data = JSON.parse(localStorage.getItem(i));
	alert(data.cream)
	$.get("entry.html", function (data) {
		$("#schedule").append(data)
		$(".entry").fadeIn("slow")
	})
}
