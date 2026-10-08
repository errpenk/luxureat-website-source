(() => {
  const isZh = document.documentElement.lang?.startsWith("zh");
  const copy = isZh ? {
    greeting: "您好！需要什么帮助？",
    question: "我有一个问题",
    more: "了解更多",
    open: "打开客服对话",
    close: "关闭客服问候",
    loading: "正在为您连接客服…",
    failed: "对话加载失败，请再次点击客服图标。",
  } : {
    greeting: "Hi! How can we help?",
    question: "I have a question",
    more: "Tell me more",
    open: "Open customer support chat",
    close: "Close support greeting",
    loading: "Connecting you with LuxurEat…",
    failed: "The chat could not load. Select the button again to open it in a new tab.",
  };
  const edge = "clamp(18px, 3vw, 40px)";
  const placeholder = document.createElement("button");
  placeholder.type = "button";
  placeholder.className = "lux-tawk-placeholder";
  placeholder.setAttribute("aria-label", copy.open);
  placeholder.innerHTML = '<svg viewBox="0 0 800 800" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z"></path></svg>';

  const greeting = document.createElement("aside");
  greeting.className = "lux-chat-greeting";
  greeting.setAttribute("role", "dialog");
  greeting.setAttribute("aria-modal", "false");
  greeting.setAttribute("aria-labelledby", "lux-chat-greeting-title");
  greeting.hidden = true;
  greeting.innerHTML = `<button type="button" class="lux-chat-greeting-close" data-lux-chat-close aria-label="${copy.close}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button><p id="lux-chat-greeting-title"><span aria-hidden="true">👋</span>${copy.greeting}</p><div><button type="button" data-lux-chat-open>${copy.question}</button><button type="button" data-lux-chat-open>${copy.more}</button></div>`;
  const status = document.createElement("div");
  status.className = "lux-chat-status";
  status.setAttribute("role", "status");
  status.hidden = true;
  status.innerHTML = '<span class="lux-chat-spinner" aria-hidden="true"></span><span></span>';
  document.body.append(greeting, status, placeholder);

  const widgetTheme = `
    button.tawk-button.tawk-button-small.tawk-text-left {
      background: #e5e5e5 !important;
      border-color: #e5e5e5 !important;
      color: #000 !important;
    }
    button.tawk-button.tawk-button-small.tawk-text-left span {
      color: #000 !important;
    }
    .tawk-message-preview .tawk-message-box > .tawk-message,
    .tawk-message-preview .tawk-suggested-messages {
      margin-left: 0 !important;
      margin-right: auto !important;
    }
    .tawk-message-preview .tawk-suggested-messages {
      align-items: flex-start !important;
    }
    .tawk-message-preview .tawk-suggested-messages-option {
      justify-content: flex-start !important;
    }
    .tawk-min-chat-icon-down {
      width: 12.8571429px !important;
      height: 12.8571429px !important;
    }
  `;
  let openWhenReady = false;
  let frameRequest = 0;
  let loaded = false;
  let failed = false;
  let loadTimer;
  const theme = (frame) => {
    try {
      const frameDocument = frame.contentDocument;
      if (!frameDocument?.head) return;
      let style = frameDocument.getElementById("luxureat-widget-theme");
      if (!style) {
        style = frameDocument.createElement("style");
        style.id = "luxureat-widget-theme";
        frameDocument.head.appendChild(style);
      }
      if (style.textContent !== widgetTheme) style.textContent = widgetTheme;
    } catch (_) {
      // Tawk currently uses same-origin about:blank frames; fail safely if that changes.
    }
  };
  const position = () => {
    frameRequest = 0;
    for (const frame of document.querySelectorAll("#min-widget > iframe, #max-widget > iframe, #branding-widget > iframe, #message-preview > iframe")) {
      theme(frame);
      const set = (property, value) => {
        if (frame.style.getPropertyValue(property) !== value || frame.style.getPropertyPriority(property) !== "important") {
          frame.style.setProperty(property, value, "important");
        }
      };
      if (frame.parentElement?.id === "min-widget") {
        set("left", edge);
        set("right", "auto");
        set("top", "auto");
        set("bottom", edge);
        set("transform", "scale(.9333333333)");
        set("transform-origin", "left bottom");
      } else if (frame.parentElement?.id === "message-preview") {
        set("left", edge);
        set("right", "auto");
        set("bottom", `calc(${edge} + 68px)`);
      } else if (frame.parentElement?.id === "max-widget") {
        if (innerWidth <= 767) {
          const width = `${innerWidth}px`;
          const height = `${innerHeight}px`;
          set("left", "0px");
          set("right", "auto");
          set("bottom", "0px");
          set("width", width);
          set("min-width", width);
          set("max-width", width);
          set("height", height);
          set("min-height", height);
          set("max-height", height);
          set("transform", "none");
        } else {
          set("left", edge);
          set("right", "auto");
          set("bottom", `calc(${edge} + 68px)`);
        }
      } else if (frame.parentElement?.id === "branding-widget") {
        set("left", edge);
        set("right", "auto");
      }
    }
  };
  const schedule = () => { if (!frameRequest) frameRequest = requestAnimationFrame(position); };
  const load = () => {
    if (loaded) return;
    loaded = true;
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = () => {
      clearTimeout(loadTimer);
      failed = false;
      status.hidden = true;
      schedule();
      greeting.hidden = true;
      placeholder.hidden = true;
      if (openWhenReady) window.Tawk_API.maximize?.();
    };
    const script = document.createElement("script");
    script.id = "luxureat-tawk";
    script.async = true;
    script.src = "https://embed.tawk.to/6ab9ba439050213448937638/1k3inv6m0";
    const fail = () => {
      clearTimeout(loadTimer);
      failed = true;
      status.classList.add("is-error");
      status.lastElementChild.textContent = copy.failed;
      placeholder.classList.remove("is-connecting");
    };
    script.onerror = fail;
    loadTimer = setTimeout(fail, 12000);
    document.head.appendChild(script);
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
    addEventListener("resize", schedule, { passive: true });
    window.visualViewport?.addEventListener("resize", schedule, { passive: true });
    window.visualViewport?.addEventListener("scroll", schedule, { passive: true });
  };
  const open = () => {
    if (failed) {
      window.open("https://tawk.to/chat/6ab9ba439050213448937638/1k3inv6m0", "_blank", "noopener,noreferrer");
      return;
    }
    greeting.hidden = true;
    status.lastElementChild.textContent = copy.loading;
    status.hidden = false;
    placeholder.classList.add("is-connecting");
    if (typeof window.Tawk_API?.maximize === "function") {
      status.hidden = true;
      window.Tawk_API.maximize();
    }
    else {
      openWhenReady = true;
      load();
    }
  };

  placeholder.addEventListener("click", open);
  greeting.addEventListener("click", (event) => {
    if (event.target.closest("[data-lux-chat-close]")) {
      greeting.hidden = true;
    } else if (event.target.closest("[data-lux-chat-open]")) open();
  });

  const greetingKey = "luxureat_chat_greeting_shown";
  const navigationType = performance.getEntriesByType?.("navigation")[0]?.type;
  let enteredFromSite = false;
  try { enteredFromSite = new URL(document.referrer).origin === location.origin; } catch { /* Direct visits have no referrer. */ }
  let shown = false;
  try {
    if (!enteredFromSite && (!navigationType || navigationType === "navigate")) sessionStorage.removeItem(greetingKey);
    shown = sessionStorage.getItem(greetingKey) === "1";
  } catch { /* Storage may be disabled. */ }
  if (!shown && !matchMedia("(max-width: 767px)").matches) setTimeout(() => {
    try { sessionStorage.setItem(greetingKey, "1"); } catch { /* Storage may be disabled. */ }
    greeting.hidden = false;
  }, 900);
})();
