console.log("Extension Loaded....")

// chrome.browserAction.onClicked.addListener(extClicked);

window.tabStatus = {}

chrome.runtime.onMessage.addListener(msgRecieved);

function msgRecieved(msg, sender, sendResponse){
    console.log("RECEIVED:", msg);
    if(msg.task == "updateId"){
        console.log(`Updating tab ${msg.id}`)
        window.tabStatus[msg.id].intervalId = msg.intervalId;
        console.log(window.tabStatus)
    }
    //user closed the tab or closed the browser
    else if(msg.status == "EXIT"){
        delete window.tabStatus[msg.id]
    }
    else{
        console.log("START/STOP")
        let updatedStatus = msg.status;
        let tab_id = msg.id;

        let response = {}
        if(updatedStatus == "on"){
            response.status = "on";
            response.intervalId = "";
            window.tabStatus[tab_id] = {
                status : updatedStatus,
                intervalId : ""
            };
        }
        else{
            response.status = "off";
            response.intervalId = window.tabStatus[tab_id].intervalId;
        }

        response.tabId = tab_id;
        chrome.tabs.sendMessage(tab_id, response)
        console.log(`Sent status = ${response} to tab ${tab_id}`)
    }
}