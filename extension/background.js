function getCurrentTab() {
    return browser.tabs.query({ currentWindow: true, active: true });
}

async function getJobInfo() {
    const tabInfo = await getCurrentTab();
    const [{ id: tabId }] = tabInfo;
    browser.tabs.sendMessage(tabId, { trigger: 'scrape' });
}

browser.browserAction.onClicked.addListener(getJobInfo);

browser.runtime.onMessage.addListener(data => {
    const { trigger } = data;
    if (trigger === 'promptReady'){          
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", "http://localhost:8080/");
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.send(JSON.stringify({"prompt": data.promptStr}));
        
    }
  });