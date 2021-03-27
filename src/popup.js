console.log("Pop-up js....")

document.getElementById('checkPage').addEventListener('click',onBtnClick)

function onBtnClick() {
    let param = {active: true,lastFocusedWindow: true}

    let curStatus = document.getElementById('checkPage').value;
    let updatedStatus = (curStatus == "on") ? "off" : "on"; 
    updateBtn(updatedStatus);

    chrome.tabs.query(param,(tabs)=>{
            let currentTab = tabs[0];
            // Send current tab ID to Background.js
            chrome.runtime.sendMessage({id:currentTab.id, status:updatedStatus, task : "init"})
    })
}

// When you open popup check for ON/OFF
window.onload = function(){
    console.log("DOM Loaded...")

    let param = {active: true,lastFocusedWindow: true}
    chrome.tabs.query(param,(tabs)=>{
            let currentTabId = tabs[0].id
        
            //get status from background.js
            let bg = chrome.extension.getBackgroundPage()
            let tabStatus = bg.tabStatus

            let curStatus = (currentTabId in tabStatus) ? tabStatus[currentTabId].status : "off";
            updateBtn(curStatus);

    })
}

//update button to on/off
function updateBtn(status){
    document.getElementById('checkPage').value = status;
    document.getElementById('checkPage').innerHTML = status;

    let style = (status == "off") ? "color:white; background-color:red;font-weight:bold;" : "color:white; background-color:green;font-weight:bold;";
    document.getElementById('checkPage').setAttribute('style',style)
}