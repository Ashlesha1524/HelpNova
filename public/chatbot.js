(function () {
    const api_Url = "http://localhost:3000/api/auth/chat";
    const scriptTag = document.currentScript;
    const ownerId = scriptTag.getAttribute("data-owner-id");

    if (!ownerId) {
        console.error("Owner ID not found");
        return;
    }
    const button = document.createElement("div");
    button.innerHTML = "💬"

    Object.assign(button.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "56px",
        height: "50px",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: "999999"
    });

    document.body.appendChild(button);
    const box = document.createElement("div");
    Object.assign(box.style, {
        position: "fixed",
        bottom: "90px",
        right: "24px",
        width: "320px",
        height: "420px",
        background: "#fff",
        boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
        borderRadius: "14px",
        display: "none",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: "999999",
        fontFamily: "Inter, system-ui, sans-serif",
    });

    box.innerHTML = `
<div style="background:#000; color:#fff; padding:12px 14px; font-size:14px; display:flex; 
align-items:center; justify-content:space-between; font-size:14px;">
    <span>Customer Support</span>
    <span id="chat-close" style="cursor:pointer;font-size:16px;">❌</span>
</div>

<div id="chat-messages" style="flex:1; padding:12px; overflow-y:auto; display:flex; flex-direction:column; gap:8px;">
</div>

<div style="
padding:8px; display:flex; gap:6px; border-top:1px solid #e5e7eb;">
<input id="chat-input" type="text" 
style="flex:1; padding:8px 10px; border:1px solid #d1d5db;
border-radius:8px; font-size:13px; outline:none;
" placeholder="Type your message..."/>


<button id="chat-send" style="padding:8px 12px; background:#000; color:#fff; 
border:none; border-radius:8px;font-size:13px; cursor:pointer;
">Send</button>
</div>
`;
    document.body.appendChild(box);

button.onclick = () => {
    box.style.display = box.style.display === "none" ? "flex" : "none";
}

document.querySelector("#chat-close").onclick = () => {
    box.style.display = "none";
}

const input = document.querySelector("#chat-input");
const messagesContainer = document.querySelector("#chat-messages"); 
const sendButton = document.querySelector("#chat-send");

function addMessage(text, from) {
    const bubble = document.createElement("div");
    bubble.innerHTML = text;
    Object.assign(bubble.style, {
        maxWidth: "78%",    
        padding: "8px 12px",
        borderRadius: "14px",
        fontSize: "13px",
        lineHeight: "1.4",
        marginBottom: "8px",
        alignSelf: from === "user" ? "flex-end" : "flex-start",
        backgroundColor: from === "user" ? "#000" : "#e5e7eb",  
        color: from === "user" ? "#fff" : "#000",

        /*bubble direction*/
        borderTopRightRadius: from === "user" ? "4px" : "14px",
        borderTopLeftRadius: from === "user" ? "14px" : "4px",
    });
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

sendButton.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const typing= document.createElement("div");
    typing.innerHTML = "Typing...";
    Object.assign(typing.style, {
        fontSize: "12px",
        color: "#6b7280",
        marginBottom: "8px",
        alignSelf: "flex-start",
    });
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
        const response = await fetch(api_Url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ownerId,
                message: text
            })
        });
        const data = await response.json();
        messagesContainer.removeChild(typing);
        addMessage(data.answer|| "Something went wrong", "ai");

    } catch (error) {
        console.log(error);
        messagesContainer.removeChild(typing);
        addMessage("something went wrong", "ai");
    }
}


})()