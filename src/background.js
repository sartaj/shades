// From: https://stackoverflow.com/a/23341124

function setIcon(value){
  var path = (value)?"icons/icon-on.png":"icons/icon-off.png";
  chrome.browserAction.setIcon({path: path});
}

function getToggle(callback) { // expects function(value){...}
  chrome.storage.local.get('toggle', function(data){
    if (data.toggle === undefined) callback(false); // default value
    else callback(data.toggle);
  });
}

function setToggle(value, callback){ // expects function(){...}
  chrome.storage.local.set({toggle : value}, function(){
    if(chrome.runtime.lastError) throw Error(chrome.runtime.lastError);
    else callback(value);
  });
}

getToggle(setIcon); // Initial state

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("WUZZUP", tab);

  getToggle(function(toggle){
    setToggle(!toggle, setIcon);
  });
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "type":"normal",
    "id": "CHANGE_SHADES",
    "title":"Change Shades",
    "contexts":["browser_action"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "CHANGE_SHADES") { // here's where you'll need the ID
    console.log("CHANGE")
    chrome.browserAction.setPopup({
      popup: "src/options.html"
    });
  }
});
