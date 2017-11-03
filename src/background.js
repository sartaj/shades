// From: https://stackoverflow.com/a/23341124

function getToggle(callback) { // expects function(value){...}
  chrome.storage.local.get('toggle', function(data){
    if(data.toggle === undefined) {
      callback(true); // default value
    } else {
      callback(data.toggle);
    }
  });
}

function setToggle(value, callback){ // expects function(){...}
  chrome.storage.local.set({toggle : value}, function(){
    if(chrome.runtime.lastError) {
      throw Error(chrome.runtime.lastError);
    } else {
      callback();
    }
  });
}

function setIcon(value){
  var path = (value)?"icons/icon-on.png":"icons/icon-off.png";
  chrome.browserAction.setIcon({path: path});
}

getToggle(setIcon); // Initial state

chrome.browserAction.onClicked.addListener(function(tab) {
  getToggle(function(toggle){
    setToggle(!toggle, function(){
      setIcon(!toggle);
    });
  });
});