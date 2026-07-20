const luxAssetBase = new URL(".", document.currentScript?.src || location.href);
const luxAsset = (path) => new URL(path, luxAssetBase).href;
const luxEscapeCoreHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));

const luxLazyBackgrounds = document.querySelectorAll("[data-lux-bg]");
const loadLuxBackground = (element) => {
  element.style.backgroundImage = `url("${element.dataset.luxBg}")`;
  delete element.dataset.luxBg;
};

if ("IntersectionObserver" in window) {
  const backgroundObserver = new IntersectionObserver((entries, observer) => {
    entries.filter(({ isIntersecting }) => isIntersecting).forEach(({ target }) => {
      loadLuxBackground(target);
      observer.unobserve(target);
    });
  }, { rootMargin: "400px" });
  luxLazyBackgrounds.forEach((element) => backgroundObserver.observe(element));
} else {
  luxLazyBackgrounds.forEach(loadLuxBackground);
}

const luxBackgroundVideos = document.querySelectorAll(".lux-about-program-media, .lux-hero-video");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.play().catch(() => {});
      else target.pause();
    }), { rootMargin: "120px", threshold: .05 });
    luxBackgroundVideos.forEach((video) => videoObserver.observe(video));
  } else {
    luxBackgroundVideos.forEach((video) => video.play().catch(() => {}));
  }
} else {
  luxBackgroundVideos.forEach((video) => video.pause());
}

const updateLuxBagCount = () => {
  let count = 0;
  try {
    const items = JSON.parse(localStorage.getItem("luxureatBag") || "[]");
    if (Array.isArray(items)) count = items.reduce((sum, item) => sum + Math.max(1, Number(item.quantity) || 1), 0);
  } catch (_) {
    // Ignore unavailable or malformed local storage.
  }
  document.querySelectorAll("[data-bag-count]").forEach((badge) => {
    badge.textContent = count ? String(count) : "";
    badge.hidden = count === 0;
  });
};
updateLuxBagCount();
document.addEventListener("lux-bag-change", updateLuxBagCount);
window.addEventListener("storage", (event) => {
  if (event.key === "luxureatBag") updateLuxBagCount();
});

const luxNav = document.querySelector(".lux-nav");
const luxMenu = document.querySelector(".lux-menu");

const luxNavigation = {
  zh: [
    ["index.html", "首页", [["甄选产品目录", 4], ["品牌概览", 5], ["我们的价值观", 6], ["全球合作", 7]]],
    ["journal.html", "关于我们", [["关于我们", 1], ["品牌传承", 5]]],
    ["caviar.html", "系列产品", ["产品全览"]],
    ["rituals.html", "食谱艺术", [["早餐", 3], ["第一道主食", 4], ["第二道主食", 5], ["甜品", 6]]],
    ["news.html", "品牌新闻", ["品牌新闻"]],
    ["certification.html", "品质认证", [["责任采购与全球合规", 2], ["全球品质体系", 3], ["认证体系", 4], ["认证与品质标识", 5]]],
    ["gifting.html", "礼赠合作", [["国际市场定制", 2], ["合作案例", 3], ["企业合作方案", 4], ["中国经销合作", 5], ["开启专业合作", 6]]],
    ["contact.html", "联系我们", [["品牌咨询", 2], ["全球足迹", 5]]],
  ],
  en: [
    ["index.html", "Home", [["Selected Product Catalogue", 4], ["Maison Overview", 5], ["Our Values", 6], ["Global Partnership", 7]]],
    ["journal.html", "About Us", [["About Us", 1], ["Brand Heritage", 5]]],
    ["products.html", "Products", ["Premium Products"]],
    ["rituals.html", "Recipe Art", [["Breakfast", 3], ["First Courses", 4], ["Main Courses", 5], ["Desserts", 6]]],
    ["news.html", "Brand News", ["Brand News"]],
    ["certification.html", "Certification", [["Responsible Trade", 2], ["Global Quality System", 3], ["Certification System", 4], ["Certification Glossary", 5]]],
    ["gifting.html", "Gifting", [["International Market Solutions", 2], ["Partnership Cases", 3], ["Business Partnership Solutions", 4], ["Distribution Partners", 5], ["Start a Professional Partnership", 6]]],
    ["contact.html", "Contact", [["Brand Consultation", 2], ["Global Presence", 5]]],
  ],
};

if (luxNav && luxMenu) {
  const language = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const pathParts = location.pathname.split("/").filter(Boolean);
  const isStaticPage = location.pathname.endsWith(".html");
  const currentSlug = isStaticPage
    ? (pathParts[pathParts.length - 1] || "index.html").replace(/\.html$/, "")
    : (!pathParts.length || pathParts[pathParts.length - 1] === "en" ? "index" : pathParts[pathParts.length - 1]);
  const currentPage = `${currentSlug}.html`;
  const pageItems = luxNavigation[language];
  const pageHref = (href, targetLanguage = language) => {
    if (isStaticPage) return targetLanguage === language ? href : `../${targetLanguage}/${href}`;
    const slug = href.replace(/\.html$/, "");
    if (targetLanguage === "zh") return slug === "index" ? "/" : `/${slug}/`;
    return slug === "index" ? "/en/" : `/en/${slug}/`;
  };

  luxNav.replaceChildren(...pageItems.map(([href, label, sections], itemIndex) => {
    const item = document.createElement("div");
    item.className = "lux-nav-item";

    const link = document.createElement("a");
    link.href = pageHref(href);
    link.textContent = label;
    link.classList.toggle("active", href === currentPage);
    link.addEventListener("click", () => {
      const target = new URL(pageHref(href), location.href);
      sessionStorage.setItem(`luxureatScroll:${target.pathname}`, "0");
    });
    item.appendChild(link);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "lux-nav-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", `lux-nav-flyout-${itemIndex}`);
    toggle.setAttribute("aria-label", language === "zh" ? `展开${label}子菜单` : `Expand ${label} submenu`);
    toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
    item.appendChild(toggle);

    const flyout = document.createElement("div");
    flyout.className = "lux-nav-flyout";
    flyout.id = `lux-nav-flyout-${itemIndex}`;
    flyout.setAttribute("aria-label", `${label} sections`);
    sections.forEach((section, index) => {
      const [sectionLabel, targetIndex] = Array.isArray(section) ? section : [section, index + 1];
      const sectionLink = document.createElement("a");
      sectionLink.href = `${pageHref(href)}#section-${targetIndex}`;
      sectionLink.textContent = sectionLabel;
      flyout.appendChild(sectionLink);
    });
    item.appendChild(flyout);

    toggle.addEventListener("click", () => {
      const expanded = !item.classList.contains("is-expanded");
      luxNav.querySelectorAll(".lux-nav-item.is-expanded").forEach((node) => {
        node.classList.remove("is-expanded");
        node.querySelector(".lux-nav-toggle")?.setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("is-expanded", expanded);
      toggle.setAttribute("aria-expanded", String(expanded));
    });
    return item;
  }));

  const footerNav = document.querySelector(".lux-footer nav");
  if (footerNav) {
    footerNav.replaceChildren(...pageItems.map(([href, label]) => {
      const link = document.createElement("a");
      link.href = pageHref(href);
      link.textContent = label;
      return link;
    }));
  }

  const pairedPage = language === "zh"
    ? currentPage === "caviar.html" ? "products.html" : currentPage
    : currentPage === "products.html" ? "caviar.html" : currentPage;
  const languageLinks = document.querySelectorAll(".lux-lang a");
  if (languageLinks.length === 2 && pairedPage !== "bag.html") {
    languageLinks[0].href = language === "zh" ? "#" : pageHref(pairedPage, "zh");
    languageLinks[1].href = language === "en" ? "#" : pageHref(pairedPage, "en");
  }

  if (pageItems.some(([href]) => href === currentPage)) {
    const headings = document.querySelectorAll("body > header:not(.lux-header) h1, body > section h1, body > section h2, main h1, main h2");
    headings.forEach((heading, index) => {
      heading.id ||= `section-${index + 1}`;
      heading.classList.add("lux-section-anchor");
    });
    if (location.hash.startsWith("#section-")) {
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
    }
  }

  const setOpen = (open) => {
    luxNav.classList.toggle("open", open);
    luxMenu.setAttribute("aria-expanded", String(open));
    luxMenu.textContent = open ? luxMenu.dataset.open : luxMenu.dataset.closed;
    if (!open) {
      luxNav.querySelectorAll(".lux-nav-item.is-expanded").forEach((item) => item.classList.remove("is-expanded"));
      luxNav.querySelectorAll(".lux-nav-toggle").forEach((toggle) => toggle.setAttribute("aria-expanded", "false"));
    }
  };

  luxMenu.addEventListener("click", () => {
    setOpen(!luxNav.classList.contains("open"));
  });

  luxNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  luxNav.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      luxMenu.focus();
    }
  });
}

(() => {
  const prefetched = new Set();

  const hrefFor = (anchor) => {
    const href = anchor?.getAttribute?.("href");
    if (!href || href.startsWith("#") || anchor.target || anchor.hasAttribute("download")) return "";

    const url = new URL(href, location.href);
    if (url.origin !== location.origin || url.protocol !== "http:" && url.protocol !== "https:") return "";
    if (url.pathname === location.pathname && url.search === location.search) return "";
    if (!url.pathname.endsWith("/") && !url.pathname.endsWith(".html")) return "";

    url.hash = "";
    return url.href;
  };

  const prefetch = (target) => {
    const anchor = target?.closest?.("a[href]");
    const href = hrefFor(anchor);
    if (!href || prefetched.has(href)) return;

    prefetched.add(href);
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "document";
    link.href = href;
    document.head.appendChild(link);
  };

  document.addEventListener("pointerover", (event) => prefetch(event.target), { passive: true });
  document.addEventListener("focusin", (event) => prefetch(event.target));
  document.addEventListener("touchstart", (event) => prefetch(event.target), { passive: true });
})();

(() => {
  const key = `luxureatScroll:${location.pathname}`;
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  const save = () => sessionStorage.setItem(key, String(window.scrollY || 0));
  const restore = () => {
    const target = location.hash && document.querySelector(location.hash);
    if (target) {
      target.scrollIntoView();
      return;
    }
    const y = Number(sessionStorage.getItem(key) || 0);
    window.scrollTo(0, Number.isFinite(y) ? y : 0);
  };

  document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(restore));
  window.addEventListener("pagehide", save);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") save();
  });
})();

(() => {
  const lang = () => document.documentElement.lang?.startsWith("zh") ? "返回顶部" : "Back to top";

  const init = () => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lux-back-to-top";
    button.setAttribute("aria-label", lang());
    button.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">arrow_upward</span>';
    document.body.appendChild(button);

    const update = () => button.classList.toggle("visible", window.scrollY > 360);
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      sessionStorage.setItem(`luxureatScroll:${location.pathname}`, "0");
    });
    window.addEventListener("scroll", update, { passive: true });
    update();
  };

  document.addEventListener("DOMContentLoaded", init);
})();

function initLuxInfoPopovers() {
  const buttons = document.querySelectorAll("[data-info-popover]");
  if (!buttons.length) return;

  const popover = document.createElement("div");
  popover.className = "lux-info-popover";
  popover.hidden = true;
  document.body.appendChild(popover);

  let activeButton = null;
  let closeTimer = 0;

  const clearCloseTimer = () => {
    clearTimeout(closeTimer);
    closeTimer = 0;
  };
  const close = () => {
    clearCloseTimer();
    popover.hidden = true;
    if (activeButton) activeButton.setAttribute("aria-expanded", "false");
    activeButton = null;
  };
  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer = setTimeout(() => {
      if (activeButton?.matches(":hover, :focus") || popover.matches(":hover, :focus-within")) return;
      close();
    }, 90);
  };
  const place = (button) => {
    const rect = button.getBoundingClientRect();
    const top = Math.min(window.innerHeight - 150, rect.bottom + 12);
    const left = Math.min(window.innerWidth - 280, Math.max(16, rect.right - 260));
    popover.style.top = `${Math.max(16, top)}px`;
    popover.style.left = `${left}px`;
  };
  const open = (button) => {
    clearCloseTimer();
    if (activeButton === button && !popover.hidden) {
      place(button);
      return;
    }
    if (activeButton) activeButton.setAttribute("aria-expanded", "false");
    activeButton = button;
    button.setAttribute("aria-expanded", "true");
    popover.innerHTML = `<strong>${luxEscapeCoreHtml(button.dataset.infoTitle || "")}</strong><p>${luxEscapeCoreHtml(button.dataset.infoText || "")}</p>`;
    place(button);
    popover.hidden = false;
  };

  buttons.forEach((button) => {
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("mouseenter", () => open(button));
    button.addEventListener("focus", () => open(button));
    button.addEventListener("mouseleave", scheduleClose);
    button.addEventListener("blur", scheduleClose);
  });
  popover.addEventListener("mouseenter", clearCloseTimer);
  popover.addEventListener("mouseleave", scheduleClose);
  document.addEventListener("click", (event) => {
    if (!popover.contains(event.target) && !activeButton?.contains(event.target)) close();
  });
  window.addEventListener("resize", close);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function initLuxGiftScroller() {
  const grid = document.querySelector("[data-gift-grid]");
  const buttons = document.querySelectorAll("[data-gift-scroll]");
  if (!grid || !buttons.length) return;
  const sync = () => {
    const max = grid.scrollWidth - grid.clientWidth;
    buttons.forEach((button) => {
      const disabled = max <= 1 || (Number(button.dataset.giftScroll) < 0 ? grid.scrollLeft <= 1 : grid.scrollLeft >= max - 1);
      button.disabled = disabled;
      button.setAttribute("aria-disabled", String(disabled));
    });
  };
  buttons.forEach((button) => button.addEventListener("click", () => {
    if (button.disabled) return;
    grid.scrollBy({ left: Number(button.dataset.giftScroll) * grid.clientWidth, behavior: "smooth" });
  }));
  grid.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  requestAnimationFrame(sync);
}

function initLuxPartnershipLightbox() {
  const triggers = [...document.querySelectorAll("[data-partnership-image]")];
  if (!triggers.length || typeof HTMLDialogElement === "undefined") return;

  const isChinese = document.documentElement.lang?.toLowerCase().startsWith("zh");
  const viewLabel = isChinese ? "查看大图" : "View large image";
  const closeLabel = isChinese ? "关闭大图" : "Close image";
  const dialog = document.createElement("dialog");
  dialog.className = "lux-partnership-lightbox";
  dialog.setAttribute("aria-label", viewLabel);
  dialog.innerHTML = `<button type="button" data-partnership-lightbox-close aria-label="${closeLabel}">×</button><img alt="">`;
  document.body.appendChild(dialog);

  const lightboxImage = dialog.querySelector("img");
  const close = () => dialog.open && dialog.close();

  triggers.forEach((trigger) => {
    const sourceImage = trigger.matches("img") ? trigger : trigger.querySelector("img");
    if (!sourceImage) return;
    trigger.setAttribute("aria-label", `${viewLabel}：${sourceImage.alt}`);
    const open = () => {
      lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
      lightboxImage.alt = sourceImage.alt;
      dialog.showModal();
    };
    trigger.addEventListener("click", open);
    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      open();
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest("[data-partnership-lightbox-close]")) close();
  });
}

function initLuxFooterActions() {
  const triggers = document.querySelectorAll("[data-footer-modal]");
  if (!triggers.length) return;

  const isZh = document.documentElement.lang?.startsWith("zh");
  const scriptSrc = document.querySelector("script[src*='assets/js/core.js']")?.src || location.href;
  const asset = (file) => new URL(`../media/brand/${file}`, scriptSrc).href;
  const copy = isZh
    ? {
      close: "关闭",
      privacy: ["隐私政策", "我们仅收集咨询、订单与售后服务所需的信息，并用于客户沟通、冷链履约、合规记录与服务改进。未经许可，我们不会出售您的个人信息。"],
      terms: ["销售条款", "所有商品以确认订单与付款记录为准。鱼子酱等冷链商品因食品安全原因，发出后非质量问题不支持退换；如运输异常，请在签收后 24 小时内联系我们。"],
      shipping: ["配送说明", "我们采用 0-4°C 冷链包装与预约配送。发货前会确认收货时间，偏远地区或特殊活动订单将由顾问单独确认时效。"],
      wechat: ["微信", "请扫描二维码联系 LuxurEat 中国顾问。", "您也可以通过微信ID：LuxurEatChina 与我们联系。"],
    }
    : {
      close: "Close",
      privacy: ["Privacy Policy", "We collect only the information needed for inquiries, orders, after-sales support, cold-chain fulfillment, compliance records, and service improvement. We do not sell personal information."],
      terms: ["Terms of Sale", "Orders are confirmed by written order details and payment records. For food-safety reasons, shipped cold-chain goods are not returnable unless quality or transport issues are reported within 24 hours of delivery."],
      shipping: ["Shipping", "We ship with 0-4°C cold-chain packaging and scheduled delivery. Timing is confirmed before dispatch; remote areas and special-event orders are coordinated by a concierge."],
      wechat: ["WeChat", "Scan the QR code to contact the LuxurEat China concierge.", "You can also reach us via WeChat ID: LuxurEatChina."],
    };

  const modal = document.createElement("div");
  modal.className = "lux-footer-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="lux-footer-modal-backdrop" data-footer-close></div>
    <section class="lux-footer-modal-panel" role="dialog" aria-modal="true">
      <button type="button" class="lux-footer-modal-close" data-footer-close></button>
      <div class="lux-footer-modal-body" tabindex="-1"></div>
    </section>`;
  document.body.appendChild(modal);

  const body = modal.querySelector(".lux-footer-modal-body");
  const closeButton = modal.querySelector(".lux-footer-modal-close");
  const open = (key) => {
    const item = copy[key];
    if (!item) return;
    const qr = key === "wechat" ? `<img loading="eager" fetchpriority="high" decoding="async" class="lux-footer-qr" src="${asset("wechat-qr.webp")}" alt="WeChat QR">` : "";
    const note = item[2] ? `<p class="lux-footer-wechat-id">${luxEscapeCoreHtml(item[2])}</p>` : "";
    body.classList.toggle("is-wechat", key === "wechat");
    body.innerHTML = `<h2>${luxEscapeCoreHtml(item[0])}</h2><p>${luxEscapeCoreHtml(item[1])}</p>${note}${qr}`;
    closeButton.textContent = copy.close;
    modal.hidden = false;
    document.body.classList.add("lux-reader-open");
    body.focus();
  };
  const close = () => {
    modal.hidden = true;
    document.body.classList.remove("lux-reader-open");
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-footer-modal]");
    if (trigger) {
      event.preventDefault();
      open(trigger.dataset.footerModal);
    }
  });
  modal.querySelectorAll("[data-footer-close]").forEach((button) => button.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close();
  });
}

(() => {
  const icons = {
    x: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
    mail: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    lock: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
    logIn: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" x2="3" y1="12" y2="12"></line></svg>',
    logOut: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>',
    userPlus: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>',
    circle: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle></svg>',
    message: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
  };

  const isZh = () => document.documentElement.lang?.toLowerCase().startsWith("zh") || location.pathname.includes("/zh/");
  const copy = () => isZh() ? {
    close: "关闭",
    signIn: "登录账号",
    create: "创建账号",
    subtitleSignIn: "欢迎回到您的 LuxurEat 账户。",
    subtitleCreate: "创建您的 LuxurEat 账户。",
    email: "电子邮箱",
    password: "密码",
    remember: "记住我",
    forgot: "忘记密码？",
    divider: "或使用以下方式登录",
    signOut: "退出登录",
  } : {
    close: "Close",
    signIn: "Sign In",
    create: "Create Account",
    subtitleSignIn: "Welcome back to your LuxurEat account.",
    subtitleCreate: "Create your LuxurEat account.",
    email: "Email Address",
    password: "Password",
    remember: "Remember Me",
    forgot: "Forgot Password?",
    divider: "Or Sign In With",
    signOut: "Sign Out",
  };

  const modalHtml = () => {
    const text = copy();
    return `
    <div class="lux-account-modal" data-account-modal aria-hidden="true">
      <div class="lux-account-dialog" role="dialog" aria-modal="true" aria-labelledby="lux-account-title">
        <button class="lux-account-close" type="button" data-account-close aria-label="${text.close}">${icons.x}</button>
        <section class="lux-account-form">
          <header class="lux-account-head">
            <span class="lux-account-icon" data-account-icon>${icons.logIn}</span>
            <h2 id="lux-account-title" data-account-title>${text.signIn}</h2>
            <p data-account-subtitle>${text.subtitleSignIn}</p>
          </header>
          <form>
            <label class="lux-account-field">
              <span>${text.email}</span>
              <div class="lux-account-input">${icons.mail}<input type="email" placeholder="china@luxureat.com" autocomplete="email"></div>
            </label>
            <label class="lux-account-field">
              <span>${text.password}</span>
              <div class="lux-account-input">${icons.lock}<input type="password" placeholder="••••••••" autocomplete="current-password"></div>
            </label>
            <div class="lux-account-row">
              <label><input type="checkbox"><span>${text.remember}</span></label>
              <a href="contact.html">${text.forgot}</a>
            </div>
            <button class="lux-account-submit" type="submit" data-account-submit>${icons.logIn}<span>${text.signIn}</span></button>
          </form>
          <div class="lux-account-divider">${text.divider}</div>
          <div class="lux-account-social">
            <button type="button">${icons.circle}Google</button>
            <button type="button">${icons.message}WeChat</button>
          </div>
          <button class="lux-account-toggle" type="button" data-account-toggle>${icons.userPlus}<span>${text.create}</span></button>
          <button class="lux-account-logout" type="button">${icons.logOut}<span>${text.signOut}</span></button>
        </section>
      </div>
    </div>`;
  };

  let lastFocus = null;

  const modal = () => document.querySelector("[data-account-modal]");

  const ensureModal = () => {
    if (!modal()) document.body.insertAdjacentHTML("beforeend", modalHtml());
    return modal();
  };

  const setOpen = (open) => {
    const node = ensureModal();
    node.classList.toggle("is-open", open);
    node.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      lastFocus = document.activeElement;
      requestAnimationFrame(() => node.querySelector("input")?.focus());
    } else {
      lastFocus?.focus?.();
    }
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-account-open]")) {
      setOpen(true);
      return;
    }
    if (event.target.closest("[data-account-close]") || event.target === modal()) {
      setOpen(false);
      return;
    }
    if (event.target.closest("[data-account-toggle]")) {
      const node = ensureModal();
      const title = node.querySelector("[data-account-title]");
      const subtitle = node.querySelector("[data-account-subtitle]");
      const toggle = node.querySelector("[data-account-toggle]");
      const submit = node.querySelector("[data-account-submit]");
      const headerIcon = node.querySelector("[data-account-icon]");
      const text = copy();
      const creating = title.textContent === text.signIn;
      title.textContent = creating ? text.create : text.signIn;
      subtitle.textContent = creating ? text.subtitleCreate : text.subtitleSignIn;
      headerIcon.innerHTML = creating ? icons.userPlus : icons.logIn;
      toggle.innerHTML = creating ? `${icons.logIn}<span>${text.signIn}</span>` : `${icons.userPlus}<span>${text.create}</span>`;
      submit.innerHTML = creating ? `${icons.userPlus}<span>${text.create}</span>` : `${icons.logIn}<span>${text.signIn}</span>`;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal()?.classList.contains("is-open")) setOpen(false);
  });
})();

(() => {
  const icons = {
    mail: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    phone: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.62 2.65a2 2 0 0 1-.45 2.11L8 9.71a16 16 0 0 0 6.29 6.29l1.23-1.23a2 2 0 0 1 2.11-.45c.85.29 1.74.5 2.65.62A2 2 0 0 1 22 16.92z"></path></svg>',
    shield: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>',
    file: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>',
    truck: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>',
  };

  const prependIcon = (node, icon) => {
    if (!node || node.classList.contains("lux-with-icon")) return;
    node.classList.add("lux-with-icon");
    node.insertAdjacentHTML("afterbegin", icon);
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".lux-footer a[href^='mailto:']").forEach((node) => prependIcon(node, icons.mail));
    document.querySelectorAll(".lux-footer a[href^='tel:']").forEach((node) => prependIcon(node, icons.phone));
    document.querySelectorAll(".lux-footprint-card a[href^='mailto:']").forEach((node) => prependIcon(node, icons.mail));
    document.querySelectorAll(".lux-footprint-card a[href^='tel:']").forEach((node) => prependIcon(node, icons.phone));
    document.querySelectorAll(".lux-footer [data-footer-modal='privacy']").forEach((node) => prependIcon(node, icons.shield));
    document.querySelectorAll(".lux-footer [data-footer-modal='terms']").forEach((node) => prependIcon(node, icons.file));
    document.querySelectorAll(".lux-footer [data-footer-modal='shipping']").forEach((node) => prependIcon(node, icons.truck));
  });
})();


document.addEventListener("DOMContentLoaded", () => {
  initLuxInfoPopovers();
  initLuxGiftScroller();
  initLuxPartnershipLightbox();
  initLuxFooterActions();
});
