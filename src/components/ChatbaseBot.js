import { useEffect } from 'react';

function ChatbaseBot() {
  useEffect(() => {
    // Avoid duplicates
    if (document.getElementById("chatbase-script")) return;

    // Set Chatbase config before loading the script
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      window.chatbaseConfig = {
        chatbotId: "te9ti0lr0j8ivmpvm4lq2idbtgwf2ozz",
        autoOpen: false,
        chatflowConfig: {
          welcomeMessage: "Hi! How can I help you?",
        }
      };
    `;
    document.body.appendChild(configScript);

    // Load the main Chatbase script
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "OA2aeaM-JSnPjAXSBieTC";
    script.defer = true;

    script.onload = () => {
      console.log("✅ Chatbase script loaded");
    };

    script.onerror = () => {
      console.error("❌ Failed to load Chatbase script");
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      script.remove();
      configScript.remove();
    };
  }, []);

  return null;
}

export default ChatbaseBot;
