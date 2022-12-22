'use strict';

// Opens a help page when extension is first installed
// Page includes how to enable notifs and how to use etc.
chrome.runtime.onInstalled.addListener(function (object) {
  let externalUrl = "welcome.html";
  let internalUrl = chrome.runtime.getURL("views/onboarding.html");

  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.tabs.create({ url: externalUrl }, function (tab) {
          console.log("New tab launched with your site");
      });
  }
  chrome.storage.sync.get(["theme"], function(items){
    console.log("Retrieved theme from storage: " + items.theme);
  })
});

// Array of all messages
function chooseMessage(){
  const messages = [
  'Keep going and prove those doubters they\'re wrong and most importantly, that YOU are more capable than you thought! 💪',
  'Take a short break then push on! Reaching your goal is a marathon, not a sprint 🏃🏽‍♂️',
  'No one can make you feel inferior without your consent 🙅 Keep going!!',
  'If you find yourself doubting how far you can go, remember how far you have come 🧗‍♂️ Keep going!!',
  'Courage isn\'t having the strength to go on. It is going on when you don\'t have strength. Keep going!! 🏃🏽‍♂️',
  'Strength doesn\’t come from what you can do. It comes from overcoming the things you once thought you couldn\’t. Keep going!! 🏃🏽‍♂️',
  'Soon, when all is well, you\’re going to look back on this period of your life and be so glad that you never gave up. Keep it up!! 🏃🏾',
  'Our greatest glory is not in never falling, but in rising every time we fall 🌅 Chin up buttercup 👑',
  'Stop beating yourself up. You are a work in progress 🚧 Patience is key. Keep going!!',
  'Some people want things to happen, some wish it would happen, but YOU will make it happen 🌟',
  'So far you\'ve survived 100% of your worst days ❤️‍🩹 You\'re doing great! Keep going!!',
  'Be kind to yourself ❣️ Remember that you are doing the best you can, and that it\'s 🆗 to make mistakes.'
  ];
  // Return one out of all the possible messages
  const messageIndex = Math.floor(Math.random() * messages.length);
  const msg = messages[messageIndex];
  return msg;
}

function chooseDog(){
  var dog_number = Math.floor(Math.random() * 15) + 1;
  var dog_file = `img/dog/${dog_number}.jpeg`;
  return dog_file;
}

function chooseCat(){
  var cat_number = Math.floor(Math.random() * 15) + 1;
  var cat_file = `img/cat/${cat_number}.jpeg`;
  return cat_file;
}

let theme = "default";

chrome.runtime.onMessage.addListener(function(request, sender,sendResponse){
  console.log("Received message to change icon to " + request.icon);
  if (request.icon === "dogs"){
    theme = "doggo";
  }
  else if (request.icon === "cats"){
    theme = "cats";
  }
  else if (request.icon === "asian"){
    theme = "mum";
  }
  else{
    theme = "default";
  }
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: 'ON' });
  if (theme === "doggo"){
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chooseDog(),
      title: 'HEY HOOMAN',
      message: chooseMessage(),
      priority: 2
    });
  }
  else if (theme === "cats"){
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chooseCat(),
      title: 'HEY HOOMAN',
      message: chooseMessage(),
      priority: 2
    });
  }
  else if (theme === "default"){
    chrome.notifications.create({
      type: 'basic',
      iconUrl: "img/confidence.jpeg",
      title: 'HEY YOU',
      message: chooseMessage(),
      priority: 2
    });
  }
  else if (theme === "mum"){
    chrome.notifications.create({
      type: 'basic',
      iconUrl: "img/landlady.jpeg",
      title: 'OI WEAKLING',
      message: chooseMessage(),
      priority: 2
    });
  }
});