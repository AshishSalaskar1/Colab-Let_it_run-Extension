console.log("CONTENT JS");

//global variable to store TAB_ID
let tab_id = "";

//Handle Message received from background.js
chrome.runtime.onMessage.addListener(msgRecieved);
function msgRecieved(msg, sender, sendResponse){
    console.log("Recieved "+msg)
    tab_id = msg.tabId;
    if(msg.status == "on"){
        console.log("Starting AutoConnect...");
        StopDisconnect();
    }
    else{
        console.log("Stopping AutoConnect...");
        clearInterval(msg.intervalId)
    }
}


//Stop Disconnecting
function StopDisconnect(interval=5) {
    // convert interval minutes to seconds
    console.log('Enabled Auto Disconnect')
    interval = interval*60*100
    let intervalId = setInterval(clickConnectBtn, interval)
    console.log(intervalId)

    //send interval ID to background.js
    chrome.runtime.sendMessage(
            {
                id : tab_id, 
                status : "", 
                task : "updateId",
                intervalId : intervalId
            }
    );
}

function clickConnectBtn(){
    document.querySelector('#top-toolbar > colab-connect-button').shadowRoot.querySelector('#connect').click();
}

// user closes the tab
window.addEventListener('beforeunload', function (e) {
    chrome.runtime.sendMessage({status : "EXIT", id : tab_id})
});
  