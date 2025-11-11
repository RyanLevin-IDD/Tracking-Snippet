(async () => {
  const endpoint = "https://script.google.com/macros/s/AKfycbx-HqcYrxGJ49qD_Qba1dicxouztjAfbADomZTyDYOc5M26GFhuJZ6_9W8z4fDK3zPDCA/exec";

  function getSessionId() {
    let id = localStorage.getItem("SessionId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("SessionId", id);
    }
    return id;
  }

  async function getUserIP() {
    let ip = localStorage.getItem("UserIP");
    if (ip) return ip;

    try {
      const res6 = await fetch("https://api64.ipify.org?format=json");
      const data6 = await res6.json();
      if (data6?.ip) {
        localStorage.setItem("UserIP", data6.ip);
        return data6.ip;
      }
    } catch (e) {}

    try {
      const res4 = await fetch("https://api.ipify.org?format=json");
      const data4 = await res4.json();
      if (data4?.ip) {
        localStorage.setItem("UserIP", data4.ip);
        return data4.ip;
      }
    } catch (e) {}

    return "unknown";
  }

  function getDomainName() {
    let domain = localStorage.getItem("DomainName");
    if (!domain) {
      domain = window.location.hostname;
      localStorage.setItem("DomainName", domain);
    }
    return domain;
  }

  function getIsraelTimeISO() {
    const now = new Date();
    const israelTime = now.toLocaleString("en-US", { timeZone: "Asia/Jerusalem" });
    const dt = new Date(israelTime);
    const pad = (n, z = 2) => n.toString().padStart(z, '0');
    const year = dt.getFullYear();
    const month = pad(dt.getMonth() + 1);
    const day = pad(dt.getDate());
    const hours = pad(dt.getHours());
    const minutes = pad(dt.getMinutes());
    const seconds = pad(dt.getSeconds());
    const ms = pad(dt.getMilliseconds(), 3);
    const tzOffset = -dt.getTimezoneOffset();
    const sign = tzOffset >= 0 ? "+" : "-";
    const tzHours = pad(Math.floor(Math.abs(tzOffset) / 60));
    const tzMinutes = pad(Math.abs(tzOffset) % 60);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}${sign}${tzHours}:${tzMinutes}`;
  }

  async function sendToSheets(data) {
     try {
       const res = await fetch(endpoint, {
         method: "POST",
         headers: { 
           "Content-Type": "text/plain"
         },
         body: JSON.stringify(data)
       });
       const result = await res.json();
       console.log("API response:", result);
     } catch (err) {
       console.error("Error sending data:", err);
     }
   }

  async function collectData() {
    const data = {
      Time: getIsraelTimeISO(),
      IP: await getUserIP(),
      SessionId: getSessionId(),
      DomainName: getDomainName(),
      Request: window.location.href
    };
    await sendToSheets(data);
    console.log("Tracking Data:", data);
  }

  // Initial run
  await collectData();

  // Track URL changes
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      collectData();
    }
  }).observe(document, { subtree: true, childList: true });

})();