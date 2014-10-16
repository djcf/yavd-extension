function clickHandler(e) {
	chrome.downloads.download({url: e.toElement.textContent });
}

chrome.runtime.sendMessage({cmd: "getURLsForPage"}, function(response) {
	for(i=0;i<response.urls.length;i++) {
		/**document.addEventListener('DOMContentLoaded', function () {
			document.querySelector('#theTemplate .downloadBtn').addEventListener('click', clickHandler);
		});**/

		theTemplate = $("#theTemplate .listItemTemplate").clone();
		console.log('cloning template'+theTemplate);

		$("button", theTemplate).attr("id", "btn"+i);
		$("button span", theTemplate).text(response.urls[i]);

		$("input", theTemplate).click(function() {
			$(this).select();
		});

		$("input", theTemplate).val(response.urls[i]);
		console.log('added url to textbox');

		$("a span", theTemplate).text('"' + response.urls[i] + '"');
		console.log('added url to href');

		$("#theList").append(theTemplate);
		console.log('appending to dom');

		document.getElementById("btn"+i).addEventListener("click", clickHandler);
	}
});