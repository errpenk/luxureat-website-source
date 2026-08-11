document.querySelectorAll("[data-chef-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll("[data-chef-slide]")];
  if (slides.length < 2) return;

  let index = 0;
  let timer;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const show = (next) => {
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === next;
      slide.hidden = !active;
      slide.classList.toggle("is-active", active);
    });
    index = next;
  };
  const play = () => {
    if (reducedMotion) return;
    clearInterval(timer);
    timer = setInterval(() => show((index + 1) % slides.length), 5200);
  };

  show(0);
  carousel.querySelector("[data-chef-prev]")?.addEventListener("click", () => {
    show((index - 1 + slides.length) % slides.length);
    play();
  });
  carousel.querySelector("[data-chef-next]")?.addEventListener("click", () => {
    show((index + 1) % slides.length);
    play();
  });
  if (!reducedMotion) {
    play();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearInterval(timer);
      else play();
    });
  }
});

if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealItems = document.querySelectorAll([
    ".lux-new-editorial-intro", ".lux-new-feature", ".lux-new-filmstrip",
    ".lux-new-space > *", ".lux-new-categories > article", ".lux-new-about > *",
    ".lux-chef-advice-stage", ".lux-new-menu > article", ".lux-new-features > header",
    ".lux-new-features article", ".lux-new-media-mosaic",
  ].join(","));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => target.classList.toggle("is-in-view", isIntersecting));
  }, { rootMargin: "0px 0px -8%", threshold: .08 });
  revealItems.forEach((item) => {
    item.classList.add("lux-new-reveal");
    revealObserver.observe(item);
  });

  document.querySelectorAll(".lux-new-filmstrip").forEach((strip) => {
    let timer;
    new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      strip.classList.remove("is-auto-flipped");
      if (!entry.isIntersecting) return;
      requestAnimationFrame(() => strip.classList.add("is-auto-flipped"));
      timer = setTimeout(() => strip.classList.remove("is-auto-flipped"), 1250);
    }, { threshold: .42 }).observe(strip);
  });
}
