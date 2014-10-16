downloadlist = false

/** We should listen very carefully for messages from the background script**/
chrome.runtime.onMessage.addListener(function(request, sender) {
	console.log("message received:" + request.url);
  if (request.newurl) {
    if (!downloadlist) {
    	console.log("creating bubble");
        // inject a floating bubble
        bubble = $("<div id='videoBubble'></div>");
        bubblePosition = "position: absolute; left: 20px; top: 20px; ";
        bubbleStyle = "";
        bubble.css(bubblePosition + bubbleStyle);
        downloadlist = $("<ul></ul>");
        bubble.append(downloadlist);
        $('body').prepend(bubble)
    }
    console.log("appending link to bubble");
    // add a link to the bubble
    downloadlist.append("<li>"+request.newurl+"</li>");
  } else {
    $("#videoBubble").remove();
    downloadlist=false;
  }
});