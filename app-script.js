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

	localStorage.setItem(localStorage.length + 1, JSON.stringify(values))
    window.location.href = "app.html"
})

$.get("entry.html", function (data) {
	for (var i = localStorage.length - 1; i >= 0; i--) {
		var values = JSON.parse(localStorage.getItem(localStorage.key( i )))
		$("#list").prepend(data)
		$("#size").prepend(values.size)
		$("#cream").prepend(values.cream)
		$("#sugar").prepend(values.sugar)
		if (values.Su) $("#Days").append("Su ")
		if (values.M) $("#Days").append("M ")
		if (values.T) $("#Days").append("T ")
		if (values.W) $("#Days").append("W ")
		if (values.R) $("#Days").append("R ")
		if (values.F) $("#Days").append("F ")
		if (values.St) $("#Days").append("St")
		$("#Time").prepend(values.timeIn)
		$(".entry").fadeIn("slow")
	}
})

function make() {
	$("#ranges").fadeOut("slow")
	$("#times").fadeOut("slow")
	$("#maker").fadeOut("slow", function() {
		$("#load").fadeIn("slow")
		var thing = setTimeout(done, 7000)
	})
}

function done() {
	$("#status").html('Done')
	setTimeout(out, 1500)
}

function out() {
	$("#load").fadeOut("slow", function() {
	location.href='app.html', 3000})
}

