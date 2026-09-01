(() => {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touchMode = matchMedia("(hover: none), (pointer: coarse)");
  const tapCards = [...document.querySelectorAll(".lux-import-export-page .lux-ms-card, #import-into-china .lux-ms-process article")];
  tapCards.forEach((card) => {
    card.tabIndex = 0;
    card.addEventListener("click", () => {
      if (!touchMode.matches) return;
      tapCards.forEach((item) => item !== card && item.classList.remove("is-tapped"));
      card.classList.toggle("is-tapped");
    });
  });
  const serviceLinks = [...document.querySelectorAll(".lux-service-bento a")];
  serviceLinks.forEach((link) => link.addEventListener("click", (event) => {
    if (!touchMode.matches || link.classList.contains("is-tapped")) return;
    event.preventDefault();
    serviceLinks.forEach((item) => item.classList.remove("is-tapped"));
    link.classList.add("is-tapped");
  }));
  if (touchMode.matches && "IntersectionObserver" in window) {
    const visibleServiceLinks = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting
        ? visibleServiceLinks.set(entry.target, entry.intersectionRatio)
        : visibleServiceLinks.delete(entry.target));
      const active = [...visibleServiceLinks].sort((a, b) => b[1] - a[1])[0]?.[0];
      serviceLinks.forEach((link) => link.classList.toggle("is-tapped", link === active));
    }, { threshold: [.45, .7], rootMargin: "-18% 0px -18%" });
    serviceLinks.forEach((link) => observer.observe(link));
  }
  document.querySelectorAll(".lux-service-media").forEach((media) => {
    media.tabIndex = 0;
    media.addEventListener("click", () => touchMode.matches && media.classList.toggle("is-tapped"));
  });
  if (("IntersectionObserver" in window) && !reducedMotion) document.querySelectorAll("#sourcing-export .lux-ms-card-grid, #brand-digital .lux-ms-card-grid").forEach((group) => {
    const cards = [...group.querySelectorAll(".lux-ms-card")];
    let timers = [];
    const reset = () => {
      timers.forEach(clearTimeout);
      timers = [];
      cards.forEach((card) => card.classList.remove("is-auto-revealed"));
    };

    new IntersectionObserver(([entry]) => {
      reset();
      if (!entry.isIntersecting) return;
      cards.forEach((card, index) => {
        timers.push(setTimeout(() => card.classList.add("is-auto-revealed"), index * 140));
        timers.push(setTimeout(() => card.classList.remove("is-auto-revealed"), 1050 + index * 140));
      });
    }, { threshold: .22 }).observe(group);
  });

  document.querySelectorAll(".lux-flip-orbit").forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      const flipped = button.classList.toggle("is-flipped");
      button.setAttribute("aria-pressed", String(flipped));
    });
  });

  const orbitGroup = document.querySelector(".lux-market-entry-orbits");
  if (orbitGroup && ("IntersectionObserver" in window) && !reducedMotion) {
    const orbits = [...orbitGroup.querySelectorAll(".lux-flip-orbit")];
    let orbitTimers = [];
    const resetOrbits = () => {
      orbitTimers.forEach(clearTimeout);
      orbitTimers = [];
      orbits.forEach((orbit) => orbit.classList.remove("is-auto-flipped"));
    };
    new IntersectionObserver(([entry]) => {
      resetOrbits();
      if (!entry.isIntersecting) return;
      orbits.forEach((orbit, index) => {
        orbitTimers.push(setTimeout(() => orbit.classList.add("is-auto-flipped"), 120 + index * 180));
        orbitTimers.push(setTimeout(() => orbit.classList.remove("is-auto-flipped"), 820 + index * 180));
      });
    }, { threshold: .5 }).observe(orbitGroup);
  }

  const faq = document.querySelector("#faq");
  const faqVisual = faq?.querySelector(".lux-faq-scroll-visual img");
  if (faqVisual && !reducedMotion) {
    let queued = false;
    const updateFaqVisual = () => {
      const rect = faq.getBoundingClientRect();
      const travel = rect.height + innerHeight;
      const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / travel));
      const overflow = Math.max(0, faqVisual.offsetHeight - faqVisual.parentElement.clientHeight);
      faqVisual.style.setProperty("--faq-image-shift", `${-overflow * progress}px`);
      queued = false;
    };
    const requestFaqVisualUpdate = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(updateFaqVisual);
    };
    addEventListener("scroll", requestFaqVisualUpdate, { passive: true });
    addEventListener("resize", requestFaqVisualUpdate);
    updateFaqVisual();
  }

  const input = faq?.querySelector("[data-faq-search]");
  const clear = faq?.querySelector("[data-faq-clear]");
  const popular = faq?.querySelector("[data-faq-popular]");
  const suggestion = faq?.querySelector("[data-faq-suggestion]");
  const suggestionButton = faq?.querySelector("[data-faq-suggestion-button]");
  const status = faq?.querySelector("[data-faq-status]");
  const details = [...(faq?.querySelectorAll(".lux-ms-faq details") || [])];
  if (!input || !clear || !popular || !suggestion || !suggestionButton || !status || !details.length) return;

  const isZh = document.documentElement.lang.startsWith("zh");
  const normalize = (value) => value.normalize("NFKC").toLocaleLowerCase().replace(/\s+/g, " ").trim();
  const units = (value) => {
    const text = normalize(value);
    return /[\u3400-\u9fff]/u.test(text)
      ? [...text].filter((character) => /[\p{L}\p{N}]/u.test(character))
      : text.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  };
  const similarity = (query, question) => {
    const queryUnits = new Set(units(query));
    const questionUnits = new Set(units(question));
    const overlap = [...queryUnits].filter((unit) => questionUnits.has(unit)).length;
    return queryUnits.size ? (2 * overlap) / (queryUnits.size + questionUnits.size) : 0;
  };
  const question = (detail) => detail.querySelector("summary")?.textContent.trim() || "";
  const showOne = (detail) => {
    details.forEach((item) => {
      item.hidden = item !== detail;
      item.open = item === detail;
    });
    suggestion.hidden = true;
    clear.hidden = false;
    status.textContent = isZh ? "已显示推荐问题" : "Showing the recommended question";
  };
  const search = () => {
    const query = normalize(input.value);
    clear.hidden = !query;
    suggestion.hidden = true;
    details.forEach((detail) => { detail.open = false; });
    if (!query) {
      details.forEach((detail) => { detail.hidden = false; });
      status.textContent = "";
      return;
    }
    const matches = details.filter((detail) => normalize(detail.textContent).includes(query));
    details.forEach((detail) => { detail.hidden = !matches.includes(detail); });
    if (matches.length) {
      status.textContent = isZh ? `找到 ${matches.length} 个相关问题` : `${matches.length} related question${matches.length === 1 ? "" : "s"} found`;
      return;
    }
    const nearest = details.reduce((best, detail) => similarity(query, question(detail)) > similarity(query, question(best)) ? detail : best, details[0]);
    suggestionButton.textContent = question(nearest);
    suggestionButton.onclick = () => showOne(nearest);
    suggestion.hidden = false;
    status.textContent = isZh ? "没有直接匹配，已推荐最接近的问题" : "No direct match; the closest question is suggested";
  };

  details.slice(0, 3).forEach((detail) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = question(detail);
    button.addEventListener("click", () => {
      input.value = question(detail);
      showOne(detail);
    });
    popular.append(button);
  });
  input.addEventListener("input", search);
  clear.addEventListener("click", () => {
    input.value = "";
    search();
    input.focus();
  });
})();
