
let prompt = document.querySelector("#prompt");
let container = document.querySelector(".container");
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;

let Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAQZvApZYeQE4DAVjxsS3KXCfKkNPYDc9U";
// // Function to create chat boxes
function createChatBox(html, className) {
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
//     // chatContainer.appendChild(div);
//         chatContainer.insertBefore(div, chatContainer.firstChild);
    return div;
}

function linkify(text) {
    let urlPattern = /(\bhttps?:\/\/[^\s]+)/gi;
    return text.replace(urlPattern, function(url) {
        return `<a href="${url}" target="_blank" style="color: #4fa3d1; text-decoration: underline;">${url}</a>`;
    });
}


async function getApiResponse(aiChatBox) {
    let textElement = aiChatBox.querySelector(".text");

    try {
        let response = await fetch(Api_Url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: userMessage }
                        ]
                    }
                ]
            })
        });

        let data = await response.json();
        let ApiResponse = data?.candidates[0].content.parts[0].text || "No response.";
        

        textElement.innerText = ApiResponse;
    } catch (error) {
        console.error(error);
        textElement.innerText = "Error fetching response.";
    } finally {
        aiChatBox.querySelector(".loading").style.display = "none";
        scrollToBottom();
    }
}


function showLoading() {
    let html = `
        <div class="img">
            <img src="ai.jpg" alt="AI" width="50">
        </div>
        <p class="text"></p>
        <img class="loading" src="load.jpg" alt="loading" height="50">`
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox)
//     scrollToBottom();
    getApiResponse(aiChatBox);
}


// // Button click
btn.addEventListener("click", ()=>{
    userMessage =  prompt.value
    if(userMessage==""){
        container.style.display = "flex";
    }{
                container.style.display = "none";
    }
    if(!userMessage) return;
    let html = `<div class = "img">
    <img src = "user.png" alt = "" width = "50">
    </div>
    <p class = "text"><P>`;
    let userChatBox = createChatBox(html,"user-chat-box")
    userChatBox.querySelector(".text").innerText = userMessage
    chatContainer.appendChild(userChatBox)
    prompt.value=""
    setTimeout(showLoading,500)
})











































































































