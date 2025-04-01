document.getElementById("clickMe").addEventListener("click", () => {
    alert("Extension is Running")
    //Periodic call to function to be added later
    start()
})

async function start(){
    try {
        //data.json to be replaced with API url
        const response = await fetch(chrome.runtime.getURL("data.json"))
        const json = await response.json()
        openTabs(json)
    } catch (e) {
        alert("Could not fetch data", e)
    }
}

function openTabs(data){
    chrome.tabs.query({}, (tabs) => {
        const openUrls = tabs.map(tab => tab.url)
        data.forEach(url => {
            if (!openUrls.includes(url.url)){
                chrome.tabs.create({ url: url.url })
            } else {
                console.log(`Tab for ${url} already open.`)
            }
        })
    })
}