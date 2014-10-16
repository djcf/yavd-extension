enabled = true;
var the_list = {}; // KV stores an array of all matched URLs sorted by tabId. Could use URL?

/** We listen carefully for a message from the popup script. If the command is to getURLSForPage,
we look up the currently selected tab and return all URLs **/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.cmd == "getURLsForPage") {
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
			tabId = tabs[0].id;
			if (tabId in the_list) {
				sendResponse({ urls: the_list[tabId] });
			}
		});
    }
    return true;
});

//todo: rename me and describe
function tellContentScripts(the_url, tabId) {
	count="";
	if (tabId in the_list) {
		the_list[tabId].push(the_url);
		count = the_list[tabId].length
	} else {
		the_list[tabId] = [ the_url ];
	}
	chrome.browserAction.setBadgeText({text: count.toString() });
}

/** We update the badge text with the number of discovered URLs when the current active tab changes **/
chrome.tabs.onActivated.addListener(function(activeInfo) {
	if (the_list[activeInfo.tabId]) {
		chrome.browserAction.setBadgeText({text: the_list[activeInfo.tabId].length.toString() });
	} else {
		chrome.browserAction.setBadgeText({text: ""});			
	}
});

//TODO: Clean this up
chrome.webRequest.onBeforeRequest.addListener(function(details) {
		if (details.url.indexOf('jpg') != -1) {
			return;
		}
		if (details.url.indexOf('png') != -1) {
			return;
		}
		if (details.url.indexOf('ping') != -1) {
			return;
		}
		if (details.url.indexOf('ico') != -1) {
			return;
		}
		if (enabled && (details.url.indexOf("flv") != -1)) {
			tellContentScripts(details.url, details.tabId);
		}
		if (enabled && (details.url.indexOf("m4v") != -1)) {
			tellContentScripts(details.url, details.tabId);
		}
		if (enabled && (details.url.indexOf("mp4") != -1)) {
			tellContentScripts(details.url, details.tabId);
		}
		if (enabled && (details.url.indexOf("wmv") != -1)) {
			tellContentScripts(details.url, details.tabId);
		}
		if (enabled && (details.url.indexOf("avi") != -1)) {
			tellContentScripts(details.url, details.tabId);
		}
	}, {
		urls: [
			"<all_urls>"
		]
	}, 
	["blocking"]
);

/** Allow the extension to be toggled at will **/
/*chrome.browserAction.onClicked.addListener(function() {
	if (enabled) {
		enabled = false;
		chrome.browserAction.setIcon({path:"icons/sic-disabled.png"});
		chrome.browserAction.setTitle({ "title": "Enable Video Downloader"});
	} else {
		enabled = true;
		chrome.browserAction.setIcon({path:"icons/sic-19.png"});
		chrome.browserAction.setTitle({ "title": "Disable Video Downloader (sic)"});
	}
});*/