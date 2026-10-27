const reach = document.querySelector('.lux-home-page .lux-home-global-reach');
const newsletter = document.querySelector('.lux-home-page .lux-newsletter');
if (reach && newsletter) reach.after(newsletter);

const market = document.querySelector('.lux-home-page .lux-home-market-system');
if (market) {
  const slides = [...market.querySelectorAll('.lux-market-slide')];
  const controls = [...market.querySelectorAll('[data-market-slide-to]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let timer;
  let inView = false;

  const show = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === active));
    controls.forEach((control) => control.setAttribute('aria-pressed', String(Number(control.dataset.marketSlideTo) === active)));
  };
  const stop = () => { clearInterval(timer); timer = undefined; };
  const start = () => {
    stop();
    if (slides.length < 2 || !inView || document.hidden || reducedMotion.matches) return;
    timer = setInterval(() => show(active + 1), 5500);
  };

  controls.forEach((control) => {
    const activate = () => {
      show(Number(control.dataset.marketSlideTo));
      start();
    };
    control.addEventListener('click', activate);
    if (control.tagName !== 'BUTTON') control.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      activate();
    });
  });
  document.addEventListener('visibilitychange', start);
  reducedMotion.addEventListener?.('change', start);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      start();
    }, { threshold: .2 }).observe(market);
  } else {
    inView = true;
    start();
  }
}

const advantageCards = [...document.querySelectorAll('.lux-home-page [data-advantage-flip]')];
const flipTimers = new WeakMap();
const flip = (card, delay = 80) => {
  clearTimeout(flipTimers.get(card));
  card.classList.remove('is-flipped');
  card.setAttribute('aria-pressed', 'false');
  const timer = setTimeout(() => {
    card.classList.add('is-flipped');
    card.setAttribute('aria-pressed', 'true');
  }, delay);
  flipTimers.set(card, timer);
};
const reset = (card) => {
  clearTimeout(flipTimers.get(card));
  card.classList.remove('is-flipped');
  card.setAttribute('aria-pressed', 'false');
};

advantageCards.forEach((card) => {
  card.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') reset(card); });
  card.addEventListener('pointerleave', (event) => { if (event.pointerType === 'mouse') flip(card); });
  card.addEventListener('focus', () => reset(card));
  card.addEventListener('blur', () => flip(card));
  card.addEventListener('click', () => card.classList.contains('is-flipped') ? reset(card) : flip(card));
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.matches(':hover, :focus-visible')) {
      flip(entry.target, 260 + advantageCards.indexOf(entry.target) * 130);
    } else if (!entry.isIntersecting) reset(entry.target);
  }), { threshold: .5 });
  advantageCards.forEach((card) => observer.observe(card));
} else {
  advantageCards.forEach(flip);
}
