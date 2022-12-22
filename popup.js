'use strict';

// Alert user if Notifications are not enabled
  chrome.notifications.getPermissionLevel(function(level) {
    if (level != "granted") {
      alert("Chrome notification permissions not granted. Please enable");
    }
  });

// CreateAlarm function 
function createAlarm(event){
    
    // Obtain the minutes input by user
    let minutes = parseFloat(event.target.value);
    // Change the badge text to indicate ON
    chrome.action.setBadgeText({text: 'ON'});
    
    // Create the alarm
    chrome.alarms.create({periodInMinutes: minutes});
    chrome.storage.sync.set({minutes: minutes}).then(()=>{
      console.log("value is set to: + minutes");
    });
    //window.close();
}

// cancelAlarm function
function cancelAlarm(){
    chrome.action.setBadgeText({text: 'OFF'});
    chrome.alarms.clearAll();
    window.close();
}

// changeIcon function
function changeIcon(chosenIcon){
    chrome.runtime.sendMessage({
        icon:`${chosenIcon}`
    });
    chrome.storage.sync.set({theme:chosenIcon}, function(){
      console.log("Theme saved to storage: " + chosenIcon);
    });
    alert("Notification icon has been changed");
}

let time = document.getElementById("start");
let select = document.getElementById("select");
let default_option = document.getElementById("default");
let dogs = document.getElementById("dogs");
let cats = document.getElementById("cats");
let auntie = document.getElementById("auntie");
// Give the start button the value of minutes the user selected
time.addEventListener("click", ()=> {time.value = select.value;} );
time.addEventListener("click", createAlarm);

// Buttons clicked will change notif icon and create alert box
default_option.addEventListener("click", () => {
  changeIcon('default');
  console.log("Theme changed to default");
});
dogs.addEventListener("click", () => {
  changeIcon('dogs');
  console.log("Theme changed to dogs");
});
cats.addEventListener("click", () => {
  changeIcon('cats');
  console.log("Theme changed to cats");
});
auntie.addEventListener("click", () => {
  changeIcon('asian');
  console.log("Theme changed to asian mum");
});

// Call cancelAlarm function when clicked
document.getElementById("cancel").addEventListener("click", cancelAlarm);
