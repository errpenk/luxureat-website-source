(() => {
  const placeholder = document.querySelector(".lux-tawk-placeholder");
  if (!placeholder) return;

  const edge = "clamp(18px, 3vw, 40px)";
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
  let openWhenReady = placeholder.dataset.luxOpen === "true";
  let frameRequest = 0;
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

  window.Tawk_API = window.Tawk_API || {};
  placeholder.addEventListener("click", () => {
    if (typeof window.Tawk_API.maximize === "function") window.Tawk_API.maximize();
    else openWhenReady = true;
  });
  window.Tawk_API.onLoad = () => {
    schedule();
    placeholder.hidden = true;
    if (openWhenReady) window.Tawk_API.maximize?.();
  };

  const script = document.createElement("script");
  script.id = "luxureat-tawk";
  script.async = true;
  script.src = "https://embed.tawk.to/6ab9ba439050213448937638/1k3inv6m0";
  document.head.appendChild(script);

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
  addEventListener("resize", schedule, { passive: true });
  window.visualViewport?.addEventListener("resize", schedule, { passive: true });
  window.visualViewport?.addEventListener("scroll", schedule, { passive: true });
})();
