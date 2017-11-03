chrome.extension.sendMessage({}, function(response) {

	const bodyClassName = '__extension__browser-shades'

	function addStyles() {
		document.body.classList.add(bodyClassName);
	}

	function removeStyles() {
		document.body.classList.remove(bodyClassName);		
	}

	function toggleStyle(toggle) {
		if (toggle) addStyles();
		else removeStyles();
	}
		
	chrome.storage.local.get('toggle', function(data) {
		toggleStyle(data.toggle)
	})
	
	chrome.storage.onChanged.addListener(function(changes, areaName){
		if(areaName == "local" && changes.toggle) {
			toggleStyle(changes.toggle.newValue)
		}
	})

})