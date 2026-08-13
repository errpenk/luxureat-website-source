const luxEscapeCoreHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));
const luxIsMobile = matchMedia("(max-width: 640px)").matches;
const luxSaveData = navigator.connection?.saveData || /(^|-)2g$/.test(navigator.connection?.effectiveType || "");
const luxCoreUrl = new URL(document.currentScript.src);
const luxImageSource = (source) => {
  if (!luxIsMobile || !source) return source;
  try {
    const url = new URL(source, document.baseURI);
    const marker = url.pathname.indexOf("/assets/");
    const variant = marker < 0 ? null : window.LUXUREAT_IMAGE_VARIANTS?.[url.pathname.slice(marker + 8)];
    return variant ? new URL(`../${variant}`, luxCoreUrl).href : source;
  } catch { return source; }
};
window.luxImageSource = luxImageSource;
window.luxResponsiveData = (value) => {
  if (typeof value === "string") return luxImageSource(value);
  if (Array.isArray(value)) return value.map(window.luxResponsiveData);
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => { value[key] = window.luxResponsiveData(item); });
  }
  return value;
};

const luxDelayedAnalytics = document.querySelector("script[data-lux-analytics-src]");
const luxCookieConsentKey = "luxureat_cookie_consent";
const luxGetCookieConsent = () => {
  try { return localStorage.getItem(luxCookieConsentKey); } catch { return null; }
};
const luxSetCookieConsent = (value) => {
  try { localStorage.setItem(luxCookieConsentKey, value); } catch { /* Storage may be disabled. */ }
  document.documentElement.dataset.luxCookieConsent = value;
};
document.documentElement.dataset.luxCookieConsent = luxGetCookieConsent() || "unset";
let luxAnalyticsLoaded = false;
const loadAnalytics = () => {
  if (!luxDelayedAnalytics || luxAnalyticsLoaded || luxGetCookieConsent() !== "analytics") return;
  luxAnalyticsLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = luxDelayedAnalytics.dataset.luxAnalyticsSrc;
  document.head.appendChild(script);
};
if (luxDelayedAnalytics) {
  const scheduleAnalytics = () => { if (!luxSaveData) setTimeout(loadAnalytics, luxIsMobile ? 15000 : 1000); };
  if (luxGetCookieConsent() === "analytics") {
    if (document.readyState === "complete") scheduleAnalytics();
    else addEventListener("load", scheduleAnalytics, { once: true });
    addEventListener("pointerdown", loadAnalytics, { once: true, passive: true });
    addEventListener("keydown", loadAnalytics, { once: true });
  }
}

const luxEngagementUrl = new URL("engagement.js", luxCoreUrl);
luxEngagementUrl.search = luxCoreUrl.search;
let luxEngagementLoading;
const loadLuxEngagement = () => luxEngagementLoading ||= new Promise((resolve) => {
  const script = document.createElement("script");
  script.src = luxEngagementUrl;
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});
const luxEngagementSelector = "[data-account-open],[data-footer-modal],[data-newsletter-form]";
["pointerover", "focusin"].forEach((type) => document.addEventListener(type, (event) => {
  if (event.target.closest?.(luxEngagementSelector)) loadLuxEngagement();
}, { passive: true }));
document.addEventListener("click", (event) => {
  const trigger = event.target.closest?.("[data-account-open],[data-footer-modal]");
  if (!trigger || window.LuxEngagementReady) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  loadLuxEngagement().then((ready) => { if (ready) trigger.click(); });
}, true);
document.addEventListener("submit", (event) => {
  if (!event.target.matches("[data-newsletter-form]") || window.LuxEngagementReady) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const form = event.target;
  loadLuxEngagement().then((ready) => { if (ready) form.requestSubmit(); });
}, true);
if (["required", "verified", "verification-failed"].includes(new URLSearchParams(location.search).get("account"))) loadLuxEngagement();

(() => {
  const isEn = document.documentElement.lang.toLowerCase().startsWith("en");
  const copy = isEn ? {
    label: "Cookie preferences",
    text: "We use necessary cookies for core features. With your permission, analytics cookies help us improve the website.",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
    necessary: "Necessary only",
    accept: "Accept analytics",
  } : {
    label: "Cookie 设置",
    text: "我们使用必要 Cookie 保障基本功能；经您同意后，分析 Cookie 将帮助我们改进网站。",
    privacy: "隐私政策",
    cookie: "Cookie政策",
    necessary: "仅使用必要 Cookie",
    accept: "接受分析 Cookie",
  };
  const banner = document.createElement("section");
  banner.className = "lux-cookie-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", copy.label);
  banner.hidden = true;
  banner.innerHTML = `<img width="64" height="64" src="${new URL("../media/brand/luxureat-logo-64.webp", luxCoreUrl)}" alt="LuxurEat"><div><p>${copy.text}</p><span class="lux-cookie-policy-links"><button type="button" data-footer-modal="privacy">${copy.privacy}</button><span aria-hidden="true">/</span><button type="button" data-footer-modal="cookie">${copy.cookie}</button></span></div><div class="lux-cookie-actions"><button type="button" data-cookie-choice="analytics">${copy.accept}</button><button type="button" data-cookie-choice="necessary">${copy.necessary}</button></div>`;
  document.body.appendChild(banner);

  document.addEventListener("click", (event) => {
    const choice = event.target.closest("[data-cookie-choice]")?.dataset.cookieChoice;
    if (!choice) return;
    luxSetCookieConsent(choice);
    banner.hidden = true;
    if (choice === "analytics") loadAnalytics();
    else if (luxAnalyticsLoaded) location.reload();
  });
  banner.hidden = Boolean(luxGetCookieConsent());
})();

const luxLazyBackgrounds = document.querySelectorAll("[data-lux-bg]");
const loadLuxBackground = (element) => {
  element.style.backgroundImage = `url("${luxImageSource(element.dataset.luxBg)}")`;
  delete element.dataset.luxBg;
};

if ("IntersectionObserver" in window) {
  const backgroundObserver = new IntersectionObserver((entries, observer) => {
    entries.filter(({ isIntersecting }) => isIntersecting).forEach(({ target }) => {
      loadLuxBackground(target);
      observer.unobserve(target);
    });
  }, { rootMargin: luxIsMobile ? "200px" : "400px" });
  luxLazyBackgrounds.forEach((element) => backgroundObserver.observe(element));
} else {
  luxLazyBackgrounds.forEach(loadLuxBackground);
}

if (luxIsMobile) {
  document.querySelectorAll("img[data-lux-mobile-src]").forEach((image) => {
    if (image.dataset.luxSrc) image.dataset.luxSrc = image.dataset.luxMobileSrc;
    else image.src = image.dataset.luxMobileSrc;
    delete image.dataset.luxMobileSrc;
  });
}
const luxLazyImages = document.querySelectorAll("img[data-lux-src]");
const loadLuxImage = (image) => {
  image.src = image.dataset.luxSrc;
  delete image.dataset.luxSrc;
};
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.filter(({ isIntersecting }) => isIntersecting).forEach(({ target }) => {
      loadLuxImage(target);
      observer.unobserve(target);
    });
  }, { rootMargin: luxIsMobile ? "240px 0px" : "1200px" });
  luxLazyImages.forEach((image) => imageObserver.observe(image));
} else {
  luxLazyImages.forEach(loadLuxImage);
}

const luxDeferredScripts = document.querySelector("[data-lux-deferred-scripts]");
if (luxDeferredScripts) {
  const coreUrl = new URL(document.currentScript.src);
  const deferredUrl = (path) => {
    const url = new URL(path, coreUrl);
    url.search = coreUrl.search;
    return url.href;
  };
  const data = ["../data/products.js", "../data/events.js", "../data/journal.js"].map(deferredUrl);
  const runtimes = ["events.js", "journal.js", "products.js"].map(deferredUrl);
  let started = false;
  let loaded = false;
  let loading;
  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.append(script);
  });
  const loadDeferredScripts = () => {
    if (started) return loading;
    started = true;
    loading = Promise.all(data.map(loadScript))
      .then(() => Promise.all(runtimes.map(loadScript)))
      .then(() => {
        loaded = true;
        return true;
      })
      .catch(() => false);
    return loading;
  };
  const scheduleDeferredScripts = () => { if (!luxIsMobile) setTimeout(loadDeferredScripts, 800); };
  if (document.readyState === "complete") scheduleDeferredScripts();
  else addEventListener("load", scheduleDeferredScripts, { once: true });
  addEventListener("scroll", loadDeferredScripts, { once: true, passive: true });
  addEventListener("pointerdown", loadDeferredScripts, { once: true, passive: true });
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest?.("[data-reader-open]");
    if (!trigger || loaded) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    loadDeferredScripts()?.then((ready) => {
      if (ready) trigger.click();
      else if (trigger.href) location.href = trigger.href;
    });
  }, true);
}

document.querySelectorAll("#selected-products > .grid > .group").forEach((card) => {
  const productLink = card.querySelector("[data-product-open]");
  if (!productLink) return;
  card.setAttribute("role", "link");
  card.tabIndex = 0;
  card.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) return;
    location.href = productLink.href;
  });
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    location.href = productLink.href;
  });
});

document.querySelectorAll("[data-content-search]").forEach((input) => {
  const items = [...document.querySelectorAll(input.dataset.contentSearch || "")];
  input.addEventListener("input", () => {
    const term = input.value.trim().toLocaleLowerCase(document.documentElement.lang || "en");
    items.forEach((item) => {
      item.hidden = Boolean(term) && !item.textContent.toLocaleLowerCase(document.documentElement.lang || "en").includes(term);
    });
  });
});

const prepareLuxVideo = (video) => {
  video.controls = false;
  video.removeAttribute("controls");
  video.autoplay = true;
  video.setAttribute("autoplay", "");
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.disablePictureInPicture = true;
  video.disableRemotePlayback = true;
  video.setAttribute("x-webkit-airplay", "deny");
  video.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
};
const startLuxVideo = (video) => {
  prepareLuxVideo(video);
  if (video.dataset.luxPlayPending) return;
  video.dataset.luxPlayPending = "true";
  Promise.resolve(video.play()).then(() => {
    delete video.dataset.luxPlayPending;
    delete video.dataset.luxPlayBlocked;
  }).catch(() => {
    delete video.dataset.luxPlayPending;
    video.dataset.luxPlayBlocked = "true";
  });
};
const luxVideoObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      target.preload = "auto";
      startLuxVideo(target);
    } else {
      target.pause();
    }
  }), { rootMargin: luxIsMobile ? "0px" : "600px 0px", threshold: .01 })
  : null;
const initLuxVideo = (video) => {
  if (video.dataset.luxVideoReady) return;
  video.dataset.luxVideoReady = "true";
  prepareLuxVideo(video);
  video.addEventListener("loadeddata", () => startLuxVideo(video), { once: true });
  video.addEventListener("canplay", () => startLuxVideo(video), { once: true });
  if (video.matches(".lux-hero-video")) {
    const startHero = () => {
      if (luxIsMobile || luxSaveData) return;
      video.preload = "auto";
      startLuxVideo(video);
    };
    if (document.readyState === "complete") startHero();
    else addEventListener("load", startHero, { once: true });
  } else if (!luxVideoObserver) {
    video.preload = "auto";
    startLuxVideo(video);
  } else {
    luxVideoObserver.observe(video);
  }
};
const luxAutoplaySelector = "video[autoplay], video[data-lux-autoplay]";
document.querySelectorAll(luxAutoplaySelector).forEach(initLuxVideo);
new MutationObserver((records) => records.forEach(({ addedNodes }) => addedNodes.forEach((node) => {
  if (!(node instanceof Element)) return;
  if (node.matches(luxAutoplaySelector)) initLuxVideo(node);
  node.querySelectorAll?.(luxAutoplaySelector).forEach(initLuxVideo);
}))).observe(document.body, { childList: true, subtree: true });
addEventListener("pointerdown", () => {
  document.querySelectorAll(`${luxAutoplaySelector}[data-lux-play-blocked]`).forEach(startLuxVideo);
}, { passive: true });

document.querySelectorAll(".lux-home-market-system").forEach((section) => {
  if (!("IntersectionObserver" in window)) {
    section.classList.add("is-media-ready");
    return;
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    section.classList.add("is-media-ready");
    observer.disconnect();
  }, { rootMargin: "400px" });
  observer.observe(section);
});

const initLuxScrollReveal = () => {
  if (document.querySelector(".lux-products-main")) return;
  if (document.body.classList.contains("lux-academy-page") || document.body.classList.contains("lux-new-page")) return;
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const elements = document.querySelectorAll([
    "body > header:not(.lux-header)",
    "body > section",
    "main > header",
    "main section",
    "body > section header",
    "main section header",
    "body > section article",
    "main section article",
    "body > section figure",
    "main section figure",
    "body > section blockquote",
    "main section blockquote",
    ".lux-home-partnership-process li",
    ".lux-brand-promise-copy",
    ".lux-brand-promise-card > div",
  ].join(","));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => target.classList.toggle("is-in-view", isIntersecting));
  }, { rootMargin: "0px 0px -8%", threshold: 0 });
  elements.forEach((element) => {
    if (element.matches(".reveal-on-scroll, .opacity-0") || element.closest("[hidden], dialog")) return;
    element.classList.add("lux-scroll-reveal");
    observer.observe(element);
  });
};

document.querySelectorAll("[data-cert-quote-carousel]").forEach((carousel) => {
  const quotes = [...carousel.querySelectorAll("[data-cert-quote]")];
  const story = carousel.closest(".lux-cert-network-story");
  story?.querySelectorAll(".lux-cert-quote-nav").forEach((nav, index) => { nav.hidden = index > 0; });
  const images = [...(story?.querySelectorAll("[data-cert-quote-image]") || [])];
  const footers = [...carousel.querySelectorAll("[data-cert-quote-footer]")];
  const status = story?.querySelector("[data-cert-quote-status]");
  const count = Math.max(quotes.length, images.length, footers.length);
  if (count < 2) return;
  let index = 0;
  let timer;
  const show = (next) => {
    index = (next + count) % count;
    quotes.forEach((quote, quoteIndex) => {
      const active = quoteIndex === index % quotes.length;
      quote.hidden = !active;
      quote.classList.toggle("is-active", active);
    });
    images.forEach((image, imageIndex) => image.classList.toggle("is-active", imageIndex === index));
    if (images[index]) story?.style.setProperty("--lux-cert-quote-background", `url("${images[index].currentSrc || images[index].src}")`);
    footers.forEach((footer, footerIndex) => {
      const active = footerIndex === index % footers.length;
      footer.hidden = !active;
      footer.classList.toggle("is-active", active);
    });
    if (status) status.textContent = `${index + 1} / ${count}`;
  };
  const stop = () => window.clearInterval(timer);
  const start = () => {
    stop();
    if (!matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches) timer = window.setInterval(() => show(index + 1), 4000);
  };
  story?.querySelectorAll("[data-cert-quote-prev]").forEach((button) => button.addEventListener("click", () => { show(index - 1); start(); }));
  story?.querySelectorAll("[data-cert-quote-next]").forEach((button) => button.addEventListener("click", () => { show(index + 1); start(); }));
  story?.addEventListener("mouseenter", stop);
  story?.addEventListener("mouseleave", start);
  story?.addEventListener("focusin", stop);
  story?.addEventListener("focusout", (event) => {
    if (!story.contains(event.relatedTarget)) start();
  });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  show(0);
  start();
});

document.querySelectorAll("[data-cert-media-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll("[data-cert-media-slide]")];
  carousel.querySelectorAll(".lux-cert-media-nav").forEach((nav, index) => { nav.hidden = index > 0; });
  if (slides.length < 2) return;
  let index = 0;
  let timer;
  const show = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === index));
  };
  const stop = () => window.clearInterval(timer);
  const start = () => {
    stop();
    if (!matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches) timer = window.setInterval(() => show(index + 1), 4000);
  };
  carousel.querySelector("[data-cert-media-prev]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    show(index - 1);
    start();
  });
  carousel.querySelector("[data-cert-media-next]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    show(index + 1);
    start();
  });
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) start();
  });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  show(0);
  start();
});

document.querySelectorAll("[data-home-timeline]").forEach((timeline) => {
  const steps = [...timeline.querySelectorAll("[data-timeline-step]")];
  const images = [...timeline.querySelectorAll("[data-timeline-image]")];
  const activate = (index) => {
    steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
    images.forEach((image, imageIndex) => image.classList.toggle("is-active", imageIndex === index));
  };
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const active = entries.filter(({ isIntersecting }) => isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) activate(Number(active.target.dataset.timelineIndex) || 0);
    }, { rootMargin: "-28% 0px -38%", threshold: [0, .25, .5, .75] });
    steps.forEach((step) => observer.observe(step));
  }
});

document.querySelectorAll("[data-count-up]").forEach((counter) => {
  const target = Number(counter.dataset.countUp) || 0;
  const suffix = counter.dataset.countSuffix || "";
  const showFinal = () => {
    counter.textContent = `${target}${suffix}`;
  };
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showFinal();
    return;
  }
  const animate = () => {
    window.cancelAnimationFrame(frameId);
    const started = performance.now();
    const duration = 950;
    const frame = (now) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - (1 - progress) ** 3;
      counter.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);
  };
  let frameId;
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ intersectionRatio }) => {
        if (intersectionRatio >= .35) animate();
        else {
          window.cancelAnimationFrame(frameId);
          counter.textContent = "0";
        }
      });
    }, { threshold: .35 });
    observer.observe(counter);
  } else {
    animate();
  }
});

const updateLuxBagCount = () => {
  let count = 0;
  const items = window.LuxureatBag?.items?.()
    || (window.LuxureatAccount?.loggedIn ? window.LuxureatAccount.bag : []);
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
    ["index.html", "首页", [["遇见我们", "meet-us"], ["甄选产品", "selected-products"], ["意式美食文化", "italian-food-culture"], ["品牌概览", "maison-overview"], ["我们的价值观", "market-system"], ["品牌历程", "brand-timeline"], ["中国合作伙伴", "china-partnership"], ["合作流程", "partnership-process"]]],
    ["about-us.html", "关于我们", [["关于我们", "about-us"], ["品牌传承", "featured"], ["品牌承诺", "brand-promise"], ["时令随笔", "seasonal-notes"]]],
    ["new.html", "热门新品", [["橄榄油", "olive-oil"], ["披萨", "pizza"], ["意式手工冰淇淋", "gelato"]]],
    ["product.html", "系列产品", [["产品全览", "product-catalogue"]]],
    ["recipe.html", "食谱艺术", [["意式风味食谱", "italian-flavor-recipes"], ["橄榄油食谱", "olive-recipes"], ["松露食谱", "truffle-recipes"], ["健康轻食", "healthy-light-recipes"], ["适合中国家庭的意大利菜", "china-family-recipes"], ["食谱库", "recipe-library"]]],
    ["brand.html", "品牌新闻", [["展览活动", "recent-events"], ["展会地图", "exhibition-map"], ["新闻中心", "news-center"]]],
    ["blog.html", "知识博客", [["探索意大利", "culture-academy"], ["鱼子酱学院", "caviar-academy"], ["橄榄油学院", "olive-academy"], ["披萨学院", "pizza-academy"], ["松露学院", "truffle-academy"], ["意式手工冰淇淋", "gelato-academy"], ["营养与配料指南", "nutrition-guide"], ["意大利美食词典", "italian-food-dictionary"], ["生产者、大师与产地故事", "producers-stories"]]],
    ["certification.html", "品质认证", [["责任采购与全球合规", "responsible-trade"], ["全球品质体系", "quality-system"], ["认证体系", "certification-system"], ["获奖记录", "award-proofs"], ["品质与认证", "certification-glossary"], ["合作图集", "partnership-gallery"]]],
    ["cooperation.html", "商务合作", [["国际市场定制", "private-label"], ["合作案例", "partnership-cases"], ["企业合作方案", "business-partnership"], ["中国经销合作", "china-partnership"], ["开启专业合作", "inquiry"]]],
    ["contact.html", "联系我们", [["品牌咨询", "brand-consultation"], ["全球足迹", "global-footprint"]]],
  ],
  en: [
    ["index.html", "Home", [["Meet Us", "meet-us"], ["Curated Selection", "selected-products"], ["Italian Food Culture", "italian-food-culture"], ["Group Overview", "maison-overview"], ["Our Values", "market-system"], ["Brand Journey", "brand-timeline"], ["China Partnership", "china-partnership"], ["Partnership Process", "partnership-process"]]],
    ["about-us.html", "About Us", [["About Us", "about-us"], ["Brand Heritage", "featured"], ["Brand Promise", "brand-promise"], ["Seasonal Notes", "seasonal-notes"]]],
    ["new.html", "New Arrivals", [["Olive Oil", "olive-oil"], ["Pizza", "pizza"], ["Gelato", "gelato"]]],
    ["product.html", "Products", [["Premium Products", "product-catalogue"]]],
    ["recipe.html", "Recipe Art", [["Italian Flavor Recipes", "italian-flavor-recipes"], ["Olive Oil Recipes", "olive-recipes"], ["Truffle Recipes", "truffle-recipes"], ["Healthy Light Meals", "healthy-light-recipes"], ["Italian Food for Chinese Homes", "china-family-recipes"], ["Recipe Library", "recipe-library"]]],
    ["brand.html", "Brand News", [["Exhibitions & Events", "recent-events"], ["Exhibition Map", "exhibition-map"], ["News Centre", "news-center"]]],
    ["blog.html", "Blog", [["Explore Italy", "culture-academy"], ["Caviar Academy", "caviar-academy"], ["Olive Oil Academy", "olive-academy"], ["Pizza Academy", "pizza-academy"], ["Truffle Academy", "truffle-academy"], ["Italian Gelato", "gelato-academy"], ["Nutrition & Ingredients", "nutrition-guide"], ["Italian Food Dictionary", "italian-food-dictionary"], ["Producers, Masters & Stories of Place", "producers-stories"]]],
    ["certification.html", "Certification", [["Responsible Trade", "responsible-trade"], ["Global Quality System", "quality-system"], ["Certification System", "certification-system"], ["Award Records", "award-proofs"], ["Quality & Certification", "certification-glossary"], ["Partnership Gallery", "partnership-gallery"]]],
    ["cooperation.html", "Cooperation", [["International Market Solutions", "private-label"], ["Partnership Cases", "partnership-cases"], ["Business Partnership Solutions", "business-partnership"], ["Distribution Partners", "china-partnership"], ["Start a Professional Partnership", "inquiry"]]],
    ["contact.html", "Contact", [["Brand Consultation", "brand-consultation"], ["Global Presence", "global-footprint"]]],
  ],
};

const luxHeader = document.querySelector(".lux-header");
if (luxHeader) {
  luxHeader.classList.toggle("is-light-surface", Boolean(document.querySelector(".lux-article-page")));
  if ("IntersectionObserver" in window) {
    const headerSentinel = document.createElement("span");
    headerSentinel.setAttribute("aria-hidden", "true");
    headerSentinel.style.cssText = "position:absolute;top:1px;width:1px;height:1px;pointer-events:none;opacity:0";
    document.body.prepend(headerSentinel);
    new IntersectionObserver(([entry]) => {
      luxHeader.classList.toggle("is-scrolled", !entry.isIntersecting && entry.boundingClientRect.top < 0);
    }).observe(headerSentinel);
  } else {
    const syncHeaderSurface = () => luxHeader.classList.toggle("is-scrolled", window.scrollY > 1);
    window.addEventListener("scroll", syncHeaderSurface, { passive: true });
    syncHeaderSurface();
  }
}

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
      const sectionHash = typeof targetIndex === "number" ? `section-${targetIndex}` : targetIndex;
      sectionLink.href = typeof sectionHash === "string" && sectionHash.startsWith("?")
        ? `${pageHref(href)}${sectionHash}`
        : `${pageHref(href)}#${sectionHash}`;
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

  const pairedPage = currentPage;
  const languageLinks = document.querySelectorAll(".lux-lang a");
  if (languageLinks.length === 2 && pairedPage !== "bag.html" && pageItems.some(([href]) => href === pairedPage)) {
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
    luxHeader?.classList.toggle("is-menu-open", open);
    luxMenu.setAttribute("aria-expanded", String(open));
    luxMenu.textContent = open ? luxMenu.dataset.open : luxMenu.dataset.closed;
    if (open) {
      const currentItem = luxNav.querySelector(".lux-nav-item > a.active")?.closest(".lux-nav-item");
      currentItem?.classList.add("is-expanded");
      currentItem?.querySelector(".lux-nav-toggle")?.setAttribute("aria-expanded", "true");
    }
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

  const navigation = performance.getEntriesByType?.("navigation")[0];
  if (navigation?.type === "reload" || performance.navigation?.type === 1) {
    sessionStorage.removeItem(key);
  }

  const save = () => {
    const anchor = document.elementFromPoint(innerWidth / 2, innerHeight / 3)?.closest?.("[id]");
    sessionStorage.setItem(key, JSON.stringify({
      y: window.scrollY || 0,
      anchor: anchor?.id || "",
      offset: anchor?.getBoundingClientRect().top || 0,
    }));
  };
  const savedPosition = () => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(key) || "0");
      return typeof saved === "number" ? { y: saved } : saved;
    } catch {
      return { y: 0 };
    }
  };
  const restore = (position) => {
    const target = location.hash && document.querySelector(location.hash);
    if (target) {
      target.scrollIntoView();
      return false;
    }
    const anchor = position.anchor && document.getElementById(position.anchor);
    if (anchor) {
      window.scrollBy(0, anchor.getBoundingClientRect().top - position.offset);
    } else {
      window.scrollTo(0, Number.isFinite(position.y) ? position.y : 0);
    }
    return true;
  };

  let restoreCancelled = false;
  const restoreWhenReady = () => {
    restoreCancelled = false;
    const position = savedPosition();
    if (!restore(position)) return;
    let attempts = 0;
    const retry = () => {
      if (restoreCancelled || attempts++ >= 100) return;
      restore(position);
      setTimeout(retry, 100);
    };
    requestAnimationFrame(retry);
  };

  ["wheel", "touchstart", "pointerdown", "keydown"].forEach((eventName) => {
    window.addEventListener(eventName, () => { restoreCancelled = true; }, { passive: true });
  });
  window.addEventListener("pageshow", restoreWhenReady);
  window.addEventListener("pagehide", save);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") save();
  });
})();

(() => {
  const lang = () => document.documentElement.lang?.startsWith("zh") ? "返回顶部" : "Back to top";

  const init = () => {
    const sentinel = document.createElement("span");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:360px;width:1px;height:1px;pointer-events:none;opacity:0";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lux-back-to-top";
    button.setAttribute("aria-label", lang());
    button.innerHTML = '<svg class="lux-back-to-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"></path></svg>';
    document.body.prepend(sentinel);
    document.body.appendChild(button);

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      sessionStorage.setItem(`luxureatScroll:${location.pathname}`, "0");
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        button.classList.toggle("visible", !entry.isIntersecting && entry.boundingClientRect.top < 0);
      }).observe(sentinel);
    } else {
      const update = () => button.classList.toggle("visible", window.scrollY > 360);
      window.addEventListener("scroll", update, { passive: true });
      update();
    }
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
  document.querySelectorAll("[data-gift-grid]").forEach((grid) => {
    const section = grid.closest(".lux-gift-catalogue-section");
    const buttons = section?.querySelectorAll("[data-gift-scroll]") || [];
    let timer, hintTimer, resumeTimer, visible = false;
    const max = () => grid.scrollWidth - grid.clientWidth;
    const sync = () => buttons.forEach((button) => {
      const limit = max();
      const disabled = limit <= 1 || (Number(button.dataset.giftScroll) < 0 ? grid.scrollLeft <= 1 : grid.scrollLeft >= limit - 1);
      button.disabled = disabled;
      button.setAttribute("aria-disabled", String(disabled));
    });
    const advance = () => {
      const limit = max();
      if (limit <= 1) return;
      grid.scrollTo({ left: grid.scrollLeft >= limit - 1 ? 0 : Math.min(grid.scrollLeft + grid.clientWidth, limit), behavior: "smooth" });
    };
    const stop = () => window.clearInterval(timer);
    const cancelHint = () => {
      window.clearTimeout(hintTimer);
      window.clearTimeout(resumeTimer);
    };
    const start = () => {
      stop();
      if (visible && !matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches && max() > 1) timer = window.setInterval(advance, 4000);
    };
    const hint = () => {
      const limit = max();
      if (limit <= 1) return;
      cancelHint();
      stop();
      grid.scrollTo({ left: 0, behavior: "auto" });
      hintTimer = window.setTimeout(() => {
        if (!visible) return;
        grid.scrollTo({ left: limit, behavior: "smooth" });
        hintTimer = window.setTimeout(() => {
          grid.scrollTo({ left: 0, behavior: "smooth" });
          resumeTimer = window.setTimeout(start, 850);
        }, 850);
      }, 40);
    };
    buttons.forEach((button) => button.addEventListener("click", () => {
      cancelHint();
      if (!button.disabled) grid.scrollBy({ left: Number(button.dataset.giftScroll) * grid.clientWidth, behavior: "smooth" });
      start();
    }));
    grid.addEventListener("scroll", sync, { passive: true });
    grid.addEventListener("pointerdown", cancelHint, { passive: true });
    grid.addEventListener("wheel", cancelHint, { passive: true });
    grid.addEventListener("mouseenter", stop);
    grid.addEventListener("mouseleave", start);
    grid.addEventListener("focusin", stop);
    grid.addEventListener("focusout", (event) => { if (!grid.contains(event.relatedTarget)) start(); });
    window.addEventListener("resize", () => { sync(); start(); });
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
    if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches) {
      const observer = new IntersectionObserver(([entry]) => {
        const wasVisible = visible;
        visible = entry.intersectionRatio >= .25;
        if (visible && !wasVisible) hint();
        else if (!visible) {
          cancelHint();
          stop();
        }
      }, { threshold: [.25] });
      observer.observe(section || grid);
    } else {
      visible = true;
    }
    requestAnimationFrame(() => { sync(); start(); });
  });
}

function initLuxPartnershipLightbox() {
  const triggers = [...document.querySelectorAll("[data-partnership-image], .lux-brand-promise-card > img")];
  if (!triggers.length || typeof HTMLDialogElement === "undefined") return;

  const isChinese = document.documentElement.lang?.toLowerCase().startsWith("zh");
  const viewLabel = isChinese ? "查看大图" : "View large image";
  const closeLabel = isChinese ? "关闭大图" : "Close image";
  const dialog = document.createElement("dialog");
  dialog.className = "lux-partnership-lightbox";
  dialog.setAttribute("aria-label", viewLabel);
  dialog.innerHTML = `<div class="lux-image-lightbox-frame"><button type="button" data-partnership-lightbox-close aria-label="${closeLabel}"><svg class="lux-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg></button><img alt=""></div>`;
  document.body.appendChild(dialog);

  const lightboxImage = dialog.querySelector("img");
  const close = () => dialog.open && dialog.close();

  triggers.forEach((trigger) => {
    if (!trigger.hasAttribute("role")) trigger.setAttribute("role", "button");
    if (!trigger.hasAttribute("tabindex")) trigger.tabIndex = 0;
    const sourceImage = trigger.matches("img") ? trigger : trigger.querySelector("img");
    if (!sourceImage) return;
    trigger.setAttribute("aria-label", `${viewLabel}：${sourceImage.alt}`);
    const open = () => {
      const currentImage = trigger.matches("img")
        ? trigger
        : trigger.querySelector("[data-cert-media-slide].is-active") || trigger.querySelector("img");
      if (!currentImage) return;
      lightboxImage.src = currentImage.currentSrc || currentImage.src;
      lightboxImage.alt = currentImage.alt;
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


function initLuxRecipePanels() {
  const buttons = [...document.querySelectorAll("[data-recipe-panel-open]")];
  const panels = [...document.querySelectorAll("[data-recipe-panel]")];
  if (!buttons.length || !panels.length) return;
  buttons.forEach((button) => button.addEventListener("click", () => {
    const id = button.dataset.recipePanelOpen;
    const opening = button.getAttribute("aria-expanded") !== "true";
    panels.forEach((panel) => { panel.hidden = !opening || panel.id !== id; });
    buttons.forEach((item) => {
      const active = opening && item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-expanded", String(active));
    });
    if (opening) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  const initial = buttons.find((button) => button.dataset.recipePanelOpen === "breakfast") || buttons[0];
  panels.forEach((panel) => { panel.hidden = panel.id !== initial.dataset.recipePanelOpen; });
  initial.classList.add("is-active");
  initial.setAttribute("aria-expanded", "true");
}

function initLuxRecipeCtas() {
  const label = document.documentElement.lang?.startsWith("zh") ? "阅读详情" : "Read More";
  document.querySelectorAll(".lux-recipe-anchor .lux-reader-card[data-reader-open]").forEach((card) => {
    const cta = card.querySelector(".lux-reader-cta") || card.querySelector("button[data-reader-open]") || document.createElement("button");
    const media = card.closest(".lux-olive-recipe-stories") ? card.querySelector("figure") || card : card;
    if (cta.parentElement !== media) media.appendChild(cta);
    cta.type = "button";
    cta.classList.add("lux-reader-cta");
    cta.dataset.readerOpen = card.dataset.readerOpen;
    cta.textContent = label;
  });
}

function initLuxAwardLightbox() {
  const triggers = [...document.querySelectorAll("[data-cert-award-open]")];
  if (!triggers.length || typeof HTMLDialogElement === "undefined") return;
  const dialog = document.createElement("dialog");
  dialog.className = "lux-cert-award-dialog";
  dialog.innerHTML = '<button type="button" aria-label="Close">\u00d7</button><img alt="">';
  document.body.appendChild(dialog);
  const image = dialog.querySelector("img");
  const close = dialog.querySelector("button");
  triggers.forEach((trigger) => trigger.addEventListener("click", () => {
    image.src = trigger.dataset.certAwardOpen;
    image.alt = trigger.querySelector("img")?.alt || "";
    dialog.showModal();
    close.focus();
  }));
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
}



document.addEventListener("DOMContentLoaded", () => {
  initLuxScrollReveal();
  initLuxInfoPopovers();
  initLuxGiftScroller();
  initLuxPartnershipLightbox();
  initLuxRecipePanels();
  initLuxRecipeCtas();
  initLuxAwardLightbox();
});
