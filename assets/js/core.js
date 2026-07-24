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
  const items = window.LuxureatAccount?.loggedIn ? window.LuxureatAccount.bag : [];
  if (Array.isArray(items)) count = items.reduce((sum, item) => sum + Math.max(1, Number(item.quantity) || 1), 0);
  document.querySelectorAll("[data-bag-count]").forEach((badge) => {
    badge.textContent = count ? String(count) : "";
    badge.hidden = count === 0;
  });
};
updateLuxBagCount();
document.addEventListener("lux-bag-change", updateLuxBagCount);

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
    button.innerHTML = '<svg class="lux-back-to-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"></path></svg>';
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
  const privacyZh = `最后更新日期：2026年7月23日

Luxureat China（露意膳）尊重并保护您的个人信息。本政策说明我们在您访问网站、注册账户、购买商品、参加活动或联系我们时，如何收集、使用、存储、共享和保护个人信息，以及您依法享有的权利。

一、个人信息处理者基本信息
个人信息处理者：露意膳（上海）贸易有限公司
统一社会信用代码：91310000MAERED2X1W
法定代表人：UGOLINI ROBERTO
注册地址：上海市金山区枫泾镇曹黎路38弄19号5312室
联系邮箱：info@luxureat.com

二、本隐私政策的适用与变更
本政策适用于 Luxureat China（露意膳）网站及相关在线服务。若处理目的、方式或个人信息种类发生重大变化，我们将更新政策并以显著方式通知您；法律要求取得单独同意的，我们将另行征得同意。

三、我们收集哪些个人信息
1. 您主动提供的信息：咨询或联系时提供的姓名、公司、职位、邮箱、电话及沟通内容；注册账户时提供的邮箱、密码及账户设置；下单时提供的商品、数量、金额、订单状态、优惠与备注；配送和开票所需的收货人、电话、地址及发票信息；支付状态、交易编号及退款状态（完整银行卡信息由支付机构处理）；客服、投诉、退换货材料；报名活动或订阅营销时提供的信息。
2. 自动收集的信息：IP 地址、浏览器与操作系统、设备类型、访问时间、页面浏览、点击、来源页面、Cookie、登录和安全日志、购物车及偏好设置。
3. 第三方提供的信息：支付、物流、活动平台或依法授权的合作伙伴为完成交易、配送、安全与合规目的提供的必要信息。

四、我们如何使用个人信息
我们仅在法律允许的范围内，将个人信息用于提供账户、订单、支付、配送、售后和活动服务；运营分析与体验改进；回复咨询与发送交易通知；在您选择同意后发送活动提醒和产品上新信息；防范欺诈、滥用和安全风险；履行会计、税务、监管及争议处理等法定义务。营销同意为可选项，撤回同意不影响其他服务。

五、Cookie 及类似技术
我们使用必要 Cookie 维持登录、购物车、安全防护和网站基本功能；经您允许后，可使用分析或偏好 Cookie 改进服务。您可以通过浏览器管理 Cookie，但停用必要 Cookie 可能影响网站功能。

六、委托处理和共享
我们可能委托云服务、支付、物流、客服、邮件、网站维护、安全、审计和专业顾问处理必要信息，并通过合同要求其按我们的指示采取安全措施。我们不会出售个人信息。除取得您的同意、履行合同、依法履责或法律另有规定外，不向其他主体共享个人信息。

七、公开披露
原则上我们不会公开披露您的个人信息。确需公开披露时，将告知披露目的、类型和范围，并依法取得单独同意，法律法规另有规定的除外。

八、存储期限
我们仅在实现处理目的所需的最短期限内保存个人信息。账户信息通常保存至账户注销后合理期限；订单、支付、发票和售后记录按会计、税务及消费者保护要求保存；安全日志按合理安全周期保存。期限届满后将删除或匿名化，法律要求继续保存的将仅用于法定目的。

九、存储地点及跨境
我们在中华人民共和国境内运营中收集和产生的个人信息原则上存储在境内。如确需向境外提供个人信息，我们将依法履行安全评估、认证、标准合同或其他程序，告知境外接收方、处理目的、方式、信息种类和行使权利方式，并在需要时取得单独同意。

十、信息安全
我们采取访问控制、最小权限、传输保护、备份、日志审计、员工培训和供应商管理等合理措施保护个人信息。互联网环境无法保证绝对安全；发生或可能发生泄露、篡改、丢失时，我们将依法采取补救措施并履行通知和报告义务。

十一、您的权利
您依法享有知情、决定、限制或拒绝处理、查阅复制、更正补充、删除、撤回同意、注销账户、获取个人信息转移说明以及要求解释处理规则等权利。撤回同意不影响撤回前基于同意进行的处理。

十二、如何行使权利
您可通过账户功能或发送邮件至 info@luxureat.com 提交请求。为保护账户安全，我们可能核验您的身份。通常将在15个工作日内答复；复杂情形将说明延期原因。对于重复、超出合理限度或法律允许拒绝的请求，我们可能依法处理。

十三、未成年人保护
本网站主要面向成年人。我们不会主动收集不满14周岁未成年人的个人信息。若发现未经监护人同意收集了儿童信息，将及时删除或采取其他必要措施。

十四、第三方网站与服务
网站可能包含第三方链接或服务。第三方依其自身规则处理个人信息，不受本政策约束。请在使用前阅读其隐私政策。

十五、投诉与争议
如您认为个人信息权益受到侵害，可通过 info@luxureat.com 联系我们，也可向有管辖权的监管部门投诉或依法寻求其他救济。

十六、联系我们
露意膳（上海）贸易有限公司
注册地址：上海市金山区枫泾镇曹黎路38弄19号5312室
联系邮箱：info@luxureat.com`;
  const privacyEn = `Last updated: July 23, 2026

Luxureat China（露意膳） respects and protects your personal information. This policy explains how we collect, use, store, share and protect information when you visit our website, register an account, place an order, attend an event or contact us.

1. Controller
Luxureat (Shanghai) Trading Co., Ltd.; Unified Social Credit Code: 91310000MAERED2X1W; Legal representative: UGOLINI ROBERTO; Registered address: Room 5312, Lane 38, Caoli Road, Fengjing Town, Jinshan District, Shanghai; Email: info@luxureat.com.

2. Scope and updates
This policy applies to the Luxureat China website and related online services. Material changes will be prominently notified, and separate consent will be obtained where required by law.

3. Information collected
We may collect information you provide for inquiries, accounts, orders, delivery, invoicing, payment status, support, returns, events and subscriptions; technical information such as IP address, browser, device, access logs, cookies, cart and preferences; and necessary information from payment, logistics, event and authorized partners.

4. Uses
Information is used to provide account, ordering, payment, delivery, after-sales and event services; improve operations; communicate with you; send marketing only when you opt in; prevent fraud and security risks; and meet accounting, tax, regulatory and dispute-resolution obligations.

5. Cookies
Necessary cookies support sign-in, cart, security and core features. Optional analytics or preference cookies may be used with permission. Disabling necessary cookies can affect functionality.

6. Processors and sharing
Cloud, payment, logistics, support, email, maintenance, security, audit and professional providers may process only necessary information under contractual security duties. We do not sell personal information and share it only with consent, to perform a contract, comply with law or as otherwise legally permitted.

7. Public disclosure
We do not normally disclose personal information publicly. Where disclosure is necessary, we will provide the legally required notice and obtain separate consent unless an exception applies.

8. Retention
Information is kept only for the shortest period needed for its purpose. Account, order, payment, invoice, support and security records are retained as required by applicable accounting, tax, consumer-protection and security rules, then deleted or anonymized.

9. Location and cross-border transfers
Information collected in mainland China is generally stored there. Any required overseas transfer will follow applicable assessment, certification, standard-contract and notice requirements, including separate consent where required.

10. Security
We use access controls, least privilege, transmission protection, backups, audit logs, staff training and supplier controls. If an incident occurs, we will take remedial action and comply with notification and reporting duties.

11–12. Your rights and requests
You may request access, copies, correction, deletion, restriction, withdrawal of consent, account closure, transfer information and an explanation of processing rules. Send requests to info@luxureat.com. We may verify identity and normally respond within 15 business days.

13. Minors
The site is intended primarily for adults. We do not knowingly collect personal information from children under 14 without guardian consent.

14–15. Third parties, complaints and disputes
Third-party services follow their own privacy rules. For complaints, contact info@luxureat.com or the competent regulator.

16. Contact
Luxureat (Shanghai) Trading Co., Ltd.
Room 5312, Lane 38, Caoli Road, Fengjing Town, Jinshan District, Shanghai
info@luxureat.com`;
  const scriptSrc = document.querySelector("script[src*='assets/js/core.js']")?.src || location.href;
  const asset = (file) => new URL(`../media/brand/${file}`, scriptSrc).href;
  const copy = isZh
    ? {
      close: "关闭",
      privacy: ["Luxureat China（露意膳）用户服务协议和隐私政策", privacyZh],
      terms: ["销售条款", "所有商品以确认订单与付款记录为准。鱼子酱等冷链商品因食品安全原因，发出后非质量问题不支持退换；如运输异常，请在签收后 24 小时内联系我们。"],
      shipping: ["配送说明", "我们采用 0-4°C 冷链包装与预约配送。发货前会确认收货时间，偏远地区或特殊活动订单将由顾问单独确认时效。"],
      wechat: ["微信", "请扫描二维码联系 LuxurEat（露意膳） 中国顾问。", "您也可以通过微信ID：LuxurEatChina 与我们联系。"],
    }
    : {
      close: "Close",
      privacy: ["Luxureat China（露意膳） Terms of Service and Privacy Policy", privacyEn],
      terms: ["Terms of Sale", "Orders are confirmed by written order details and payment records. For food-safety reasons, shipped cold-chain goods are not returnable unless quality or transport issues are reported within 24 hours of delivery."],
      shipping: ["Shipping", "We ship with 0-4°C cold-chain packaging and scheduled delivery. Timing is confirmed before dispatch; remote areas and special-event orders are coordinated by a concierge."],
      wechat: ["WeChat", "Scan the QR code to contact the LuxurEat China（露意膳） concierge.", "You can also reach us via WeChat ID: LuxurEatChina."],
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
    body.classList.toggle("is-legal", key === "privacy");
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
    eye: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    eyeOff: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 2 20 20"></path><path d="M6.71 6.71C4.87 7.9 3.5 9.7 2.62 11.59a1 1 0 0 0 0 .82C4.48 16.42 7.93 19 12 19c1.45 0 2.82-.33 4.05-.91"></path><path d="M10.73 5.08A9 9 0 0 1 12 5c4.07 0 7.52 2.58 9.38 6.59a1 1 0 0 1 0 .82 11.1 11.1 0 0 1-1.1 1.85"></path><path d="M14.12 14.12A3 3 0 0 1 9.88 9.88"></path></svg>',
  };

  const isZh = () => document.documentElement.lang?.toLowerCase().startsWith("zh") || location.pathname.includes("/zh/");
  const copy = () => isZh() ? {
    close: "关闭",
    signIn: "登录账号",
    create: "创建账号",
    subtitleSignIn: "欢迎回到您的 LuxurEat（露意膳） 账户。",
    subtitleCreate: "创建您的 LuxurEat（露意膳） 账户。",
    resetTitle: "重置密码",
    subtitleReset: "输入注册邮箱，我们会发送安全的密码重置链接。",
    email: "电子邮箱",
    emailInvalid: "电子邮箱不存在或格式错误。",
    password: "密码",
    passwordHint: "至少 12 位，须包含字母和数字。",
    remember: "记住我",
    forgot: "忘记密码？",
    showPassword: "显示密码",
    hidePassword: "隐藏密码",
    haveAccount: "已有账号？",
    consentPrefix: "我已阅读并同意",
    consentLabel: "《用户协议和隐私政策》",
    consentRequired: "请先阅读并同意用户服务协议和隐私政策。",
    newsletter: "我愿意接收 LuxurEat 的活动提醒和产品上新邮件（可选）",
    sendReset: "发送重置链接",
    resetSent: "如果该邮箱已注册，密码重置链接已发送，请检查收件箱和垃圾邮件。",
    unavailable: "账号服务暂未连接，请稍后再试。",
    working: "请稍候…",
    loginRequired: "请先登录账号，然后继续结算。",
    signOut: "退出登录",
  } : {
    close: "Close",
    signIn: "Sign In",
    create: "Create Account",
    subtitleSignIn: "Welcome back to your LuxurEat（露意膳） account.",
    subtitleCreate: "Create your LuxurEat（露意膳） account.",
    resetTitle: "Reset Password",
    subtitleReset: "Enter your account email and we will send a secure reset link.",
    email: "Email Address",
    emailInvalid: "The email address does not exist or is invalid.",
    password: "Password",
    passwordHint: "Use at least 12 characters with letters and numbers.",
    remember: "Remember Me",
    forgot: "Forgot Password?",
    showPassword: "Show password",
    hidePassword: "Hide password",
    haveAccount: "Already have an account?",
    consentPrefix: "I have read and agree to",
    consentLabel: "Terms of Service and Privacy Policy",
    consentRequired: "Please read and agree to the Terms of Service and Privacy Policy.",
    newsletter: "Email me about LuxurEat events and new products (optional)",
    sendReset: "Send Reset Link",
    resetSent: "If the email is registered, a reset link has been sent. Please check your inbox and spam folder.",
    unavailable: "Account service is not connected yet. Please try again later.",
    working: "Please wait…",
    loginRequired: "Please sign in before continuing to checkout.",
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
          <form data-account-form novalidate>
            <label class="lux-account-field">
              <span>${text.email}</span>
              <div class="lux-account-input">${icons.mail}<input name="email" type="email" placeholder="china@luxureat.com" autocomplete="email" required></div>
              <small class="lux-account-field-error" data-account-email-hint hidden>${text.emailInvalid}</small>
            </label>
            <label class="lux-account-field" data-account-password>
              <span>${text.password}</span>
              <div class="lux-account-input lux-account-password-input">${icons.lock}<input name="password" type="password" placeholder="••••••••" autocomplete="current-password" minlength="1" required><button type="button" class="lux-account-password-toggle" data-account-password-toggle aria-label="${text.showPassword}" title="${text.showPassword}">${icons.eye}</button></div>
              <small class="lux-account-password-hint" data-account-password-hint hidden>${text.passwordHint}</small>
            </label>
            <input name="company" type="text" tabindex="-1" autocomplete="off" hidden aria-hidden="true">
            <div class="lux-account-row" data-account-login-options>
              <label><input name="remember" type="checkbox" value="1"><span>${text.remember}</span></label>
              <span class="lux-account-inline-actions"><a href="${luxEscapeCoreHtml(window.LuxureatAccount?.lostPasswordUrl || "#")}" data-account-forgot>${text.forgot}</a><button type="button" data-account-toggle>${text.create}</button></span>
            </div>
            <p class="lux-account-existing" data-account-register-options hidden>${text.haveAccount} <button type="button" data-account-toggle>${text.signIn}</button></p>
            <label class="lux-account-newsletter" data-account-newsletter hidden><input name="newsletter" type="checkbox" value="1"><span>${text.newsletter}</span></label>
            <label class="lux-account-consent" data-account-consent hidden><input name="consent" type="checkbox" value="1"><span>${text.consentPrefix} <button type="button" data-footer-modal="privacy">${text.consentLabel}</button></span></label>
            <p class="lux-account-feedback" data-account-feedback role="status" aria-live="polite"></p>
            <button class="lux-account-submit" type="submit" data-account-submit>${icons.logIn}<span>${text.signIn}</span></button>
          </form>
          <button class="lux-account-logout" type="button" data-account-logout>${icons.logOut}<span>${text.signOut}</span></button>
        </section>
      </div>
    </div>`;
  };

  let lastFocus = null;

  const modal = () => document.querySelector("[data-account-modal]");

  const ensureModal = () => {
    if (!modal()) document.body.insertAdjacentHTML("beforeend", modalHtml());
    const node = modal();
    const loggedIn = Boolean(window.LuxureatAccount?.loggedIn);
    node.querySelector("[data-account-form]").hidden = loggedIn;
    node.querySelector("[data-account-logout]").hidden = !loggedIn;
    return node;
  };

  const setMode = (node, mode) => {
    const text = copy();
    const creating = mode === "register";
    const resetting = mode === "forgot";
    const password = node.querySelector("input[name='password']");
    const passwordToggle = node.querySelector("[data-account-password-toggle]");
    const consent = node.querySelector("input[name='consent']");
    node.dataset.accountMode = mode;
    node.querySelector("[data-account-title]").textContent = resetting ? text.resetTitle : creating ? text.create : text.signIn;
    node.querySelector("[data-account-subtitle]").textContent = resetting ? text.subtitleReset : creating ? text.subtitleCreate : text.subtitleSignIn;
    node.querySelector("[data-account-icon]").innerHTML = resetting ? icons.mail : creating ? icons.userPlus : icons.logIn;
    node.querySelector("[data-account-submit]").innerHTML = resetting ? `${icons.mail}<span>${text.sendReset}</span>` : creating ? `${icons.userPlus}<span>${text.create}</span>` : `${icons.logIn}<span>${text.signIn}</span>`;
    node.querySelector("[data-account-password]").hidden = resetting;
    node.querySelector("[data-account-password-hint]").hidden = true;
    node.querySelector("[data-account-login-options]").hidden = mode !== "login";
    node.querySelector("[data-account-register-options]").hidden = !creating;
    node.querySelector("[data-account-newsletter]").hidden = !creating;
    node.querySelector("[data-account-consent]").hidden = !creating;
    password.disabled = resetting;
    password.required = !resetting;
    password.minLength = creating ? 12 : 1;
    password.pattern = creating ? "(?=.*[A-Za-z])(?=.*\\d).{12,}" : "";
    password.autocomplete = creating ? "new-password" : "current-password";
    password.type = "password";
    passwordToggle.innerHTML = icons.eye;
    passwordToggle.setAttribute("aria-label", text.showPassword);
    passwordToggle.title = text.showPassword;
    consent.required = creating;
    node.querySelector("[data-account-feedback]").textContent = "";
    node.querySelector("[data-account-feedback]").classList.remove("is-shaking");
    node.querySelector("[data-account-email-hint]").hidden = true;
  };

  const shake = (node) => {
    node.classList.remove("is-shaking");
    void node.offsetWidth;
    node.classList.add("is-shaking");
  };

  const submit = async (form) => {
    const node = ensureModal();
    const text = copy();
    const feedback = node.querySelector("[data-account-feedback]");
    const button = node.querySelector("[data-account-submit]");
    const account = window.LuxureatAccount;
    const email = form.elements.email;
    const emailHint = node.querySelector("[data-account-email-hint]");
    if (!email.validity.valid) {
      emailHint.hidden = false;
      shake(emailHint);
      email.focus();
      return;
    }
    emailHint.hidden = true;
    const creating = node.dataset.accountMode === "register";
    const password = form.elements.password;
    const hint = node.querySelector("[data-account-password-hint]");
    const validPassword = password.value.length >= 12 && /[A-Za-z]/.test(password.value) && /\d/.test(password.value);
    if (creating && !validPassword) {
      hint.hidden = false;
      shake(hint);
      password.focus();
      return;
    }
    hint.hidden = true;
    if (creating && !form.elements.consent.checked) {
      feedback.textContent = text.consentRequired;
      shake(feedback);
      form.elements.consent.focus();
      return;
    }
    if (!account?.ajaxUrl || !account?.nonce) {
      feedback.textContent = text.unavailable;
      return;
    }

    button.disabled = true;
    feedback.textContent = text.working;
    const data = new URLSearchParams(new FormData(form));
    const challenge = account.botChallenge;
    if (!challenge || !window.crypto?.subtle) {
      feedback.textContent = text.unavailable;
      button.disabled = false;
      return;
    }
    const random = new Uint8Array(16);
    crypto.getRandomValues(random);
    const botNonce = Array.from(random, (byte) => byte.toString(16).padStart(2, "0")).join("");
    const encoder = new TextEncoder();
    let botProof = -1;
    for (let proof = 0; proof <= 1000000; proof += 1) {
      const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(`${challenge}:${botNonce}:${proof}`)));
      if (digest[0] === 0 && digest[1] < 16) {
        botProof = proof;
        break;
      }
    }
    if (botProof < 0) {
      feedback.textContent = text.unavailable;
      button.disabled = false;
      return;
    }
    data.set("action", "luxureat_account");
    data.set("nonce", account.nonce);
    data.set("bot_challenge", challenge);
    data.set("bot_nonce", botNonce);
    data.set("bot_proof", String(botProof));
    data.set("mode", node.dataset.accountMode || "login");
    data.set("lang", isZh() ? "zh" : "en");
    try {
      const response = await fetch(account.ajaxUrl, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: data,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.data?.message || text.unavailable);
      if (node.dataset.accountMode === "forgot") {
        feedback.textContent = result.data?.message || text.resetSent;
        button.disabled = false;
        return;
      }
      location.reload();
    } catch (error) {
      feedback.textContent = error.message || text.unavailable;
      if (/邮箱|email|password|密码/i.test(feedback.textContent)) {
        emailHint.hidden = false;
        emailHint.textContent = text.emailInvalid;
        shake(emailHint);
      } else {
        shake(feedback);
      }
      button.disabled = false;
    }
  };

  const setOpen = (open) => {
    const node = ensureModal();
    node.classList.toggle("is-open", open);
    node.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      if (!window.LuxureatAccount?.loggedIn) setMode(node, "login");
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
      setMode(node, node.dataset.accountMode === "login" ? "register" : "login");
      return;
    }
    const passwordToggle = event.target.closest("[data-account-password-toggle]");
    if (passwordToggle) {
      const node = ensureModal();
      const password = node.querySelector("input[name='password']");
      const revealing = password.type === "password";
      password.type = revealing ? "text" : "password";
      passwordToggle.innerHTML = revealing ? icons.eyeOff : icons.eye;
      passwordToggle.setAttribute("aria-label", revealing ? copy().hidePassword : copy().showPassword);
      passwordToggle.title = revealing ? copy().hidePassword : copy().showPassword;
      password.focus();
      return;
    }
    if (event.target.closest("[data-account-forgot]")) {
      event.preventDefault();
      setMode(ensureModal(), "forgot");
      return;
    }
    if (event.target.closest("[data-account-logout]")) {
      location.href = window.LuxureatAccount?.logoutUrl || "/";
    }
  });

  document.addEventListener("submit", (event) => {
    if (!event.target.matches("[data-account-form]")) return;
    event.preventDefault();
    submit(event.target);
  });

  document.addEventListener("input", (event) => {
    if (!event.target.matches("[data-account-form] input")) return;
    const form = event.target.closest("[data-account-form]");
    if (event.target.name === "password") {
      const hint = form.querySelector("[data-account-password-hint]");
      hint.hidden = true;
      hint.classList.remove("is-shaking");
    }
    if (event.target.name === "email") {
      const hint = form.querySelector("[data-account-email-hint]");
      hint.hidden = true;
      hint.classList.remove("is-shaking");
    }
    const feedback = form.querySelector("[data-account-feedback]");
    feedback.textContent = "";
    feedback.classList.remove("is-shaking");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal()?.classList.contains("is-open")) setOpen(false);
  });

  document.addEventListener("DOMContentLoaded", () => {
    if (new URLSearchParams(location.search).get("account") !== "required") return;
    const node = ensureModal();
    setOpen(true);
    node.querySelector("[data-account-feedback]").textContent = copy().loginRequired;
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
