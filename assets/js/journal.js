const luxJournalAssetBase = new URL("../", document.currentScript?.src || location.href);
const luxJournalAsset = (path) => new URL(path, luxJournalAssetBase).href;

function initLuxReader() {
  const articleData = window.LUXUREAT_ARTICLE_DATA || {};
  const articles = articleData.articles || {};
  const events = window.LUXUREAT_EVENT_DATA?.events || [];
  const eventMount = document.querySelector("[data-recent-events]");
  const mapMount = document.querySelector("[data-exhibition-map]");
  const newsMount = document.querySelector("[data-news-center]");
  const aboutMount = document.querySelector("[data-about-story]");
  const recipeLibraryMount = document.querySelector("[data-recipe-library-app]");
  const eventHash = decodeURIComponent(location.hash).replace(/^#event-/, "");
  const readerHash = decodeURIComponent(location.hash).replace(/^#reader-/, "");
  const triggers = document.querySelectorAll("[data-reader-open], [data-reader-archive], [data-event-open]");
  if (!triggers.length && !eventMount && !mapMount && !newsMount && !aboutMount && !recipeLibraryMount && !events.some((event) => event.id === eventHash)) return;
  if (!Object.keys(articles).length && !events.length) return;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const labels = () => document.documentElement.lang?.startsWith("zh")
    ? { back: "返回", close: "关闭", related: "延伸阅读", read: "阅读详情", archive: "往期随笔", note: "品鉴笔记", noteText: "温度、器具与节奏共同决定入口的第一层印象；真正的奢华来自克制而准确的服务。" }
    : { back: "Back", close: "Close", related: "Further Reading", read: "View Details", archive: "Archive", note: "Tasting Notes", noteText: "Temperature, service ware, and pacing shape the first impression; luxury is restraint made precise." };
  const archiveGroups = () => document.documentElement.lang?.startsWith("zh")
    ? [
      ["品牌与产业", ["zh-harvest", "zh-truffle", "zh-service"]],
      ["品鉴与文化", ["zh-malossol", "zh-champagne"]],
      ["品质与溯源", ["zh-mother-of-pearl"]],
    ]
    : [
      ["Brand & Industry", ["en-harvest", "en-truffle", "en-service"]],
      ["Tasting & Culture", ["en-malossol", "en-champagne"]],
      ["Quality & Traceability", ["en-mother-of-pearl"]],
    ];
  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const renderRecipeLibrary = () => {
    if (!recipeLibraryMount) return;
    const copy = lang === "zh"
      ? { region: "参考地区", ingredient: "核心原料", allRegions: "全部地区", allIngredients: "全部原料", clear: "清空筛选", count: "份食谱", read: "阅读详情", empty: "没有符合当前条件的食谱" }
      : { region: "Reference region", ingredient: "Core ingredient", allRegions: "All regions", allIngredients: "All ingredients", clear: "Clear filters", count: "recipes", read: "View Details", empty: "No recipes match these filters" };
    const ingredientGroups = [
      ["olive-oil", lang === "zh" ? "橄榄油" : "Olive oil", /橄榄油|olive oil|extra-virgin/i],
      ["truffle", lang === "zh" ? "松露" : "Truffle", /松露|truffle/i],
      ["caviar", lang === "zh" ? "鱼子酱" : "Caviar", /鱼子酱|caviar/i],
      ["pasta", lang === "zh" ? "意面与面粉" : "Pasta & flour", /意面|面粉|披萨|spaghetti|pasta|flour|pizza|ravioli|tagliolini/i],
      ["rice", lang === "zh" ? "米" : "Rice", /卡纳罗利米|烩饭|rice|risotto|carnaroli/i],
      ["egg", lang === "zh" ? "鸡蛋" : "Egg", /鸡蛋|蛋黄|蛋白|egg/i],
      ["mushroom", lang === "zh" ? "菌菇" : "Mushroom", /蘑菇|香菇|牛肝菌|mushroom|porcini/i],
      ["seafood", lang === "zh" ? "海鲜" : "Seafood", /虾|扇贝|鱼|shrimp|prawn|scallop|fish|caviar/i],
      ["dairy", lang === "zh" ? "乳制品" : "Dairy", /牛奶|奶油|奶酪|黄油|马斯卡彭|milk|cream|cheese|butter|mascarpone|mozzarella/i],
      ["vegetable", lang === "zh" ? "蔬菜" : "Vegetables", /番茄|茴香|橙子|西葫芦|胡萝卜|西芹|甜椒|tomato|fennel|orange|courgette|zucchini|carrot|celery|pepper/i],
      ["meat", lang === "zh" ? "肉类" : "Meat", /鸡|羊|chicken|lamb/i],
    ];
    const regionGroups = [
      ["piedmont", lang === "zh" ? "皮埃蒙特" : "Piedmont", /皮埃蒙特|piedmont/i],
      ["lombardy", lang === "zh" ? "伦巴第" : "Lombardy", /伦巴第|lombardy/i],
      ["liguria", lang === "zh" ? "利古里亚" : "Liguria", /利古里亚|ligurian/i],
      ["veneto", lang === "zh" ? "威尼托" : "Veneto", /威尼斯|威尼托|venetian|veneto/i],
      ["tuscany", lang === "zh" ? "托斯卡纳" : "Tuscany", /托斯卡纳|tuscany/i],
      ["umbria", lang === "zh" ? "翁布里亚" : "Umbria", /翁布里亚|瓦尔内里纳|umbria|valnerina/i],
      ["lazio", lang === "zh" ? "拉齐奥" : "Lazio", /拉齐奥|lazio/i],
      ["campania", lang === "zh" ? "坎帕尼亚" : "Campania", /坎帕尼亚|那不勒斯|campania|naples/i],
      ["sicily", lang === "zh" ? "西西里" : "Sicily", /西西里|sicily/i],
      ["north", lang === "zh" ? "意大利北部" : "Northern Italy", /意大利北部|northern italian/i],
      ["central", lang === "zh" ? "意大利中部" : "Central Italy", /意大利中部|central italy/i],
      ["south", lang === "zh" ? "意大利南部" : "Southern Italy", /意大利南部|southern italy/i],
      ["italy", lang === "zh" ? "意大利通用 / 跨地区" : "Italy-wide / Cross-regional", /./],
    ];
    const recipeRegions = (value = "") => {
      const specific = regionGroups.slice(0, 9).filter(([, , pattern]) => pattern.test(value)).map(([key]) => key);
      if (specific.length) return specific;
      return [regionGroups.slice(9).find(([, , pattern]) => pattern.test(value))?.[0] || "italy"];
    };
    const recipes = Object.entries(articles)
      .filter(([, article]) => article.type === "recipe" && article.lang === lang && article.recipe)
      .map(([id, article]) => {
        const searchable = [article.title, article.recipe.ingredients.join(" "), article.recipe.products || ""].join(" ");
        return { id, article, regions: recipeRegions(article.recipe.region), ingredients: ingredientGroups.filter(([, , pattern]) => pattern.test(searchable)).map(([key]) => key) };
      });
    const regions = regionGroups.filter(([key]) => recipes.some((recipe) => recipe.regions.includes(key)));
    const usedIngredients = ingredientGroups.filter(([key]) => recipes.some((recipe) => recipe.ingredients.includes(key)));
    recipeLibraryMount.innerHTML = `
      <div class="lux-recipe-library-controls">
        <label><span>${copy.region}</span><select data-recipe-region><option value="">${copy.allRegions}</option>${regions.map(([key, label]) => `<option value="${key}">${label}</option>`).join("")}</select></label>
        <label><span>${copy.ingredient}</span><select data-recipe-ingredient><option value="">${copy.allIngredients}</option>${usedIngredients.map(([key, label]) => `<option value="${key}">${label}</option>`).join("")}</select></label>
        <button type="button" data-recipe-clear>${copy.clear}</button>
        <p aria-live="polite" data-recipe-count></p>
      </div>
      <div class="lux-recipe-library-grid" data-recipe-grid></div>
      <p class="lux-recipe-library-empty" data-recipe-empty hidden>${copy.empty}</p>`;
    const regionSelect = recipeLibraryMount.querySelector("[data-recipe-region]");
    const ingredientSelect = recipeLibraryMount.querySelector("[data-recipe-ingredient]");
    const grid = recipeLibraryMount.querySelector("[data-recipe-grid]");
    const count = recipeLibraryMount.querySelector("[data-recipe-count]");
    const empty = recipeLibraryMount.querySelector("[data-recipe-empty]");
    const update = () => {
      const filtered = recipes.filter(({ regions, ingredients }) => (!regionSelect.value || regions.includes(regionSelect.value)) && (!ingredientSelect.value || ingredients.includes(ingredientSelect.value)));
      grid.innerHTML = filtered.map(({ id, article, ingredients }) => {
        const slug = id.replace(/^(?:zh|en)-recipe-/, "");
        const href = location.pathname.endsWith(".html") ? `recipe.html?recipe=${encodeURIComponent(slug)}` : `${encodeURIComponent(slug)}/`;
        return `
        <a href="${href}" class="lux-recipe-library-card" data-reader-open="${escapeHtml(id)}">
          <span class="lux-recipe-library-media"><img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}"><span class="lux-reader-cta">${copy.read}</span></span>
          <span class="lux-recipe-library-copy"><small>${escapeHtml(article.recipe.region || article.eyebrow)}</small><strong>${escapeHtml(article.title)}</strong><span>${escapeHtml(article.recipe.time)} · ${escapeHtml(article.recipe.difficulty)}</span><span class="lux-recipe-library-tags">${ingredients.map((key) => `<i>${escapeHtml(ingredientGroups.find(([groupKey]) => groupKey === key)?.[1] || key)}</i>`).join("")}</span></span>
        </a>`;
      }).join("");
      count.textContent = `${filtered.length} ${copy.count}`;
      empty.hidden = filtered.length > 0;
    };
    regionSelect.addEventListener("change", update);
    ingredientSelect.addEventListener("change", update);
    recipeLibraryMount.querySelector("[data-recipe-clear]").addEventListener("click", () => { regionSelect.value = ""; ingredientSelect.value = ""; update(); regionSelect.focus(); });
    update();
  };
  renderRecipeLibrary();
  const localizeArchiveLabel = (value) => {
    if (lang !== "zh") return value;
    const labels = {
      MAISON: "品牌",
      MASTERCLASS: "大师课",
      RECIPE: "食谱",
      ATLAS: "产业版图",
      MARKET: "市场",
      RITUAL: "品鉴",
      PAIRING: "配餐",
      SERVICE: "服务",
    };
    return labels[value] || value;
  };
  const eventLabels = lang === "zh"
    ? { kicker: "发布 LuxurEat（露意膳）参与的国际食品展会、行业活动与品牌展示信息，包括活动预告、展位安排、现场动态及展后回顾。", title: "展览活动", past: "过往活动", empty: "暂无过往活动", read: "查看详情" }
    : { kicker: "Updates on LuxurEat (露意膳) at international food fairs, industry events and brand showcases, including previews, stand information, live coverage and post-event reviews.", title: "Exhibitions & Events", past: "Past Events", empty: "No past events yet", read: "View details" };
  const newsLabels = lang === "zh"
    ? { kicker: "聚焦 LuxurEat（露意膳）的品牌动态、新品发布、战略合作、市场拓展与企业发展，及时分享公司在高端食品领域的创新成果、业务进展及重要资讯。", title: "新闻中心", search: "搜索新闻", read: "阅读详情", empty: "没有找到相关内容" }
    : { kicker: "Follow LuxurEat (露意膳) brand updates, product launches, strategic partnerships, market expansion and company development, with timely news on innovation and business progress in premium food.", title: "News Centre", search: "Search news", read: "Read more", empty: "No matching stories found" };
  const aboutArticle = articles[`${lang}-about`];
  const aboutLabels = lang === "zh"
    ? { title: "关于我们", journal: "品牌调查", story: "品牌故事", madeIn: "意大利制造", view: "查看大图", previous: "查看上一张图片", next: "查看下一张图片", slide: "左右滑动查看", close: "关闭", portrait: "Roberto Ugolini 肖像" }
    : { title: "About Us", journal: "LuxurEat (露意膳) Journal", story: "Brand Story", madeIn: "Made in Italy", view: "View Full Size", previous: "View previous image", next: "View next image", slide: "Slide left or right", close: "Close", portrait: "Portrait of Roberto Ugolini" };
  const loadLeaflet = () => {
    if (window.L) return Promise.resolve(window.L);
    if (!document.querySelector('link[data-lux-leaflet]')) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      stylesheet.integrity = "sha256-p4NxAoJBhIINfQ3yn+RltJ9VxSHxNSvHNxgynexlxs=";
      stylesheet.crossOrigin = "";
      stylesheet.dataset.luxLeaflet = "";
      document.head.append(stylesheet);
    }
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-lux-leaflet]');
      if (existing) {
        existing.addEventListener("load", () => resolve(window.L), { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      script.crossOrigin = "";
      script.dataset.luxLeaflet = "";
      script.addEventListener("load", () => resolve(window.L), { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.append(script);
    });
  };

  const renderRecentEvents = () => {
    if (!eventMount) return;
    const latest = events.filter((event) => event.status === "latest").sort((a, b) => a.endDate.localeCompare(b.endDate));
    const past = events.filter((event) => event.status === "past").sort((a, b) => b.endDate.localeCompare(a.endDate));
    eventMount.innerHTML = `
      <div class="lux-recent-events-inner">
        <header class="lux-recent-events-head">
          <span>${eventLabels.kicker}</span>
          <h2>${eventLabels.title}</h2>
        </header>
        <div class="lux-recent-events-latest">
          ${latest.map((event) => {
            const copy = event[lang];
            return copy ? `<button type="button" class="lux-event-card" data-event-open="${escapeHtml(event.id)}">
              <img loading="lazy" decoding="async" src="${escapeHtml(event.cardImage || event.image)}" alt="${escapeHtml(copy.articleTitle)}">
              <span class="lux-event-card-copy">
                <small>${escapeHtml(copy.dateIso)} · ${escapeHtml(copy.city)}</small>
                <strong>${escapeHtml(copy.articleTitle)}</strong>
                <span>${escapeHtml(copy.intro)}</span>
                <span class="lux-narrative-link">${eventLabels.read}<span class="material-symbols-outlined" data-icon="arrow_forward" aria-hidden="true" translate="no"></span></span>
              </span>
            </button>` : "";
          }).join("")}
        </div>
        ${past.length ? `<div class="lux-past-events">
          <h3>${eventLabels.past}</h3>
          <div class="lux-past-events-grid">${past.map((event) => {
            const copy = event[lang];
            return `<button type="button" class="lux-event-card" data-event-open="${escapeHtml(event.id)}"><img loading="lazy" decoding="async" src="${escapeHtml(event.cardImage || event.image)}" alt="${escapeHtml(copy.articleTitle)}"><span class="lux-event-card-copy"><small>${escapeHtml(copy.dateIso)} · ${escapeHtml(copy.city)}</small><strong>${escapeHtml(copy.articleTitle)}</strong></span></button>`;
          }).join("")}</div>
        </div>` : ""}
      </div>`;
  };
  renderRecentEvents();

  const renderExhibitionMap = () => {
    if (!mapMount) return;
    const mapLabels = lang === "zh"
      ? { kicker: "展会图谱", title: "展会地图", intro: "查看 LuxurEat（露意膳）即将参与及已经结束的展会。将鼠标移至地点标记可预览，点击可打开对应活动详情。", upcoming: "即将开始", ended: "已结束", detail: "查看详情", reset: "返回中国地图视角", unavailable: "地图暂时无法加载，请稍后重试。" }
      : { kicker: "Exhibition Atlas", title: "Exhibition Map", intro: "Explore upcoming and completed LuxurEat (露意膳) exhibitions. Hover over a location to preview it, then select the marker to open the event article.", upcoming: "Upcoming", ended: "Ended", detail: "View details", reset: "Reset to China view", unavailable: "The map is temporarily unavailable. Please try again shortly." };
    const today = new Date();
    const mappedEvents = events.filter((event) => Array.isArray(event.coordinates)).map((event) => ({
      ...event,
      isEnded: event.status === "past" || (event.endDate && new Date(`${event.endDate}T23:59:59`) < today),
    }));
    const groups = [...mappedEvents.reduce((result, event) => {
      const key = event.coordinates.join(",");
      const group = result.get(key) || { coordinates: event.coordinates, events: [] };
      group.events.push(event);
      result.set(key, group);
      return result;
    }, new Map()).values()];
    const details = (group) => group.events.map((event) => {
      const copy = event[lang];
      const image = event.cardImage || event.previewImage || event.image;
      return `<article style="--lux-map-event-image:url('${escapeHtml(image)}')"><small class="${event.isEnded ? "is-ended" : "is-upcoming"}">${event.isEnded ? mapLabels.ended : mapLabels.upcoming}</small><strong>${escapeHtml(copy.articleTitle)}</strong><span>${escapeHtml(copy.date)} · ${escapeHtml(copy.city)}</span><button type="button" data-event-open="${escapeHtml(event.id)}">${mapLabels.detail}</button></article>`;
    }).join("");

    mapMount.innerHTML = `<div class="lux-exhibition-map-head"><span>${mapLabels.kicker}</span><h2>${mapLabels.title}</h2><p>${mapLabels.intro}</p><div><span><i class="is-upcoming"></i>${mapLabels.upcoming}</span><span><i class="is-ended"></i>${mapLabels.ended}</span></div></div><div class="lux-amap-shell"><div class="lux-amap-canvas" data-osm-map role="application" aria-label="${escapeHtml(mapLabels.title)}"></div><button type="button" class="lux-map-reset" data-map-reset aria-label="${escapeHtml(mapLabels.reset)}" title="${escapeHtml(mapLabels.reset)}"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.42 1.42"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path><circle cx="12" cy="12" r="2"></circle></svg></button><div class="lux-map-popover" data-map-popover hidden></div></div>`;

    const popover = mapMount.querySelector("[data-map-popover]");
    const mapCanvas = mapMount.querySelector("[data-osm-map]");
    const chinaBounds = [[18, 73], [54, 135]];
    let hideTimer;
    const showGroup = (group) => {
      clearTimeout(hideTimer);
      popover.innerHTML = details(group);
      popover.hidden = false;
    };
    const hideGroup = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => { popover.hidden = true; }, 480);
    };
    popover.addEventListener("mouseenter", () => clearTimeout(hideTimer));
    popover.addEventListener("mouseleave", hideGroup);

    loadLeaflet().then((L) => {
      const map = L.map(mapCanvas, {
        minZoom: 3,
        maxZoom: 18,
        zoomControl: true,
        worldCopyJump: false,
        scrollWheelZoom: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
      });
      map.attributionControl.setPrefix(false);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      const resetView = () => map.fitBounds(chinaBounds, { padding: [24, 24], animate: true });
      resetView();
      groups.forEach((group) => {
        const ended = group.events.every((event) => event.isEnded);
        const city = group.events.map((event) => event[lang].city).filter((value, index, values) => values.indexOf(value) === index).join("、");
        const icon = L.divIcon({
          className: "lux-osm-marker-wrap",
          html: `<span class="lux-osm-marker ${ended ? "is-ended" : "is-upcoming"}"><span>${group.events.length}</span></span>`,
          iconSize: [40, 48],
          iconAnchor: [20, 44],
        });
        const marker = L.marker([group.coordinates[1], group.coordinates[0]], { icon, title: city, keyboard: true }).addTo(map);
        marker.on("mouseover", () => showGroup(group));
        marker.on("mouseout", hideGroup);
        marker.on("click", () => {
          showGroup(group);
          renderEvent(group.events[0].id);
        });
        const markerElement = marker.getElement();
        markerElement?.addEventListener("mouseenter", () => showGroup(group));
        markerElement?.addEventListener("mouseleave", hideGroup);
        markerElement?.addEventListener("focus", () => showGroup(group));
        markerElement?.addEventListener("blur", hideGroup);
      });
      mapMount.querySelector("[data-map-reset]").addEventListener("click", resetView);
    }).catch(() => {
      mapCanvas.classList.add("is-unavailable");
      mapCanvas.textContent = mapLabels.unavailable;
    });
  };
  renderExhibitionMap();

  const renderNewsCenter = () => {
    if (!newsMount) return;
    const story = lang === "zh" ? {
      title: "CaviareEat Baerii 的产地与真实品质",
      date: "2025年9月4日",
      intro: "CaviareEat Baerii（西伯利亚鲟，Acipenser baerii）来自意大利、法国、德国与中国的精选养殖场，并以动物福利、可追溯性和环境可持续标准为基础。每一批产品均配有 CITES 文件并接受严格质量控制。",
      sections: [
        ["品鉴特征", "颜色从炭灰至深棕，并带有珍珠光泽；颗粒直径约 2.5–3.0 毫米。质地丝滑、奶油感细腻且富有弹性，风味优雅而持久，带有榛子、新鲜黄油与淡水气息。"],
        ["适用渠道", "适合追求优雅与多用途鱼子酱的厨师及高端餐厅，也适用于甜咸创作、精品鸡尾酒、高端零售与私人品牌；Halal、Kosher 及有机市场可按需求提供相应方案。"],
        ["享用方式", "经典搭配包括布里尼薄饼、酸奶油与水煮蛋；现代搭配可选择鞑靼、卡帕乔、生蚝或寿司；也可用于风味黄油、甜咸小食、白巧克力甜点，以及伏特加、金酒和柑橘浸泡酒等鸡尾酒。"],
        ["规格与质量控制", "提供 1 千克原装罐，以及 10 克、30 克、50 克、125 克、250 克、500 克与 1 千克认证包装，可采用 CaviareEat 品牌或私人标签，全程冷链运输。所有批次遵循 HACCP、IFS 与 BRC 体系，并可按需求提供 Halal 与 Kosher 认证。"],
      ],
      closing: "CaviareEat Baerii 让鱼子酱在保持奢华感与可持续价值的同时更易融入专业餐饮与创意厨房。",
      alt: "CaviareEat Royal Baerii 鱼子酱罐",
    } : {
      title: "Origin and Authenticity of CaviareEat Baerii",
      date: "September 4, 2025",
      intro: "Our Baerii caviar (Acipenser baerii) comes from selected farms in Italy, France, Germany, and China, all operating under exacting standards of animal welfare, traceability, and environmental sustainability. Every package is supported by CITES documentation and strict quality controls.",
      sections: [
        ["Tasting profile", "Its colour ranges from anthracite grey to deep brown with pearly reflections. The 2.5–3.0 mm eggs are silky, creamy and firm, with a delicate yet persistent flavour recalling hazelnut, fresh butter and freshwater notes."],
        ["Who it is for", "CaviareEat Baerii suits chefs and gourmet restaurants seeking elegant versatility, pastry chefs and mixologists creating sweet-savoury dishes or premium cocktails, private-label and high-end retail programmes, and Halal, Kosher or organic markets on request."],
        ["How to serve it", "Serve it traditionally on blinis with sour cream or hard-boiled egg; pair it with tartare, carpaccio, oysters or sushi; or use it in flavoured butter, sweet-savoury finger food, white-chocolate desserts, vodka, gin, citrus infusions and artisanal bitters."],
        ["Formats and quality control", "Formats include an original 1 kg tin and certified 10 g, 30 g, 50 g, 125 g, 250 g, 500 g and 1 kg packs, under the CaviareEat label or private label, delivered through a complete cold chain. Every batch follows HACCP, IFS and BRC protocols, with Halal and Kosher certification available on request."],
      ],
      closing: "CaviareEat Baerii makes caviar more accessible and versatile without compromising luxury, safety or sustainability.",
      alt: "CaviareEat Royal Baerii caviar tin",
    };
    const storyId = `${lang}-caviareat-baerii-news`;
    articles[storyId] = {
      lang,
      eyebrow: newsLabels.title,
      title: story.title,
      meta: `CaviareEat · ${story.date}`,
      image: luxJournalAsset("media/events/caviareat-baerii-news.png"),
      intro: story.intro,
      sections: story.sections,
      quote: story.closing,
      column: newsLabels.title,
      archive: "CaviareEat",
      related: [],
    };
    newsMount.innerHTML = `
      <div class="lux-recent-events-inner">
        <header class="lux-recent-events-head"><span>${newsLabels.kicker}</span><h2>${newsLabels.title}</h2></header>
        <div class="lux-recent-events-latest">
          <button type="button" class="lux-event-card lux-news-feature" data-reader-open="${storyId}">
            <img loading="lazy" decoding="async" src="${escapeHtml(luxJournalAsset("media/events/caviareat-baerii-news.png"))}" alt="${escapeHtml(story.alt)}">
            <span class="lux-event-card-copy">
              <small>${escapeHtml(story.date)} · CaviareEat</small>
              <strong>${escapeHtml(story.title)}</strong>
              <span>${escapeHtml(story.intro)}</span>
              <span class="lux-narrative-link">${escapeHtml(newsLabels.read)}<span class="material-symbols-outlined" data-icon="arrow_forward" aria-hidden="true" translate="no"></span></span>
            </span>
          </button>
        </div>
      </div>`;
  };
  renderNewsCenter();

  const renderAboutStory = () => {
    if (!aboutMount || !aboutArticle) return;
    const [titleBrand, ...titleRest] = aboutArticle.title.split("｜");
    const paragraphs = (content) => content.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    const sectionHtml = aboutArticle.sections.map(([heading, content], index) => {
      const media = aboutArticle.sectionMedia[index] || [];
      const figures = media.map((item) => `<figure>
        <button type="button" class="lux-about-image-button" data-about-image="${escapeHtml(item.src)}" data-about-image-alt="${escapeHtml(item.alt)}" aria-label="${escapeHtml(aboutLabels.view)}: ${escapeHtml(item.alt)}">
          <img loading="lazy" decoding="async" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}">
          <span>${escapeHtml(aboutLabels.view)}</span>
        </button>
      </figure>`).join("");
      const gallery = index === aboutArticle.sections.length - 1
        ? `<div class="lux-about-carousel" data-about-carousel data-carousel-hint="${escapeHtml(aboutLabels.slide)}">
            <button type="button" class="lux-about-carousel-arrow is-prev" data-about-carousel-step="-1" aria-label="${escapeHtml(aboutLabels.previous)}"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg></button>
            <div class="lux-about-carousel-track">${figures}</div>
            <button type="button" class="lux-about-carousel-arrow is-next" data-about-carousel-step="1" aria-label="${escapeHtml(aboutLabels.next)}"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></button>
          </div>`
        : `<div class="lux-reader-section-media">${figures}</div>`;
      const divider = /传统、创新|Tradition, Innovation/i.test(heading)
        ? `<figure class="lux-about-section-divider"><img loading="lazy" decoding="async" src="${escapeHtml(luxJournalAsset("media/brand/about-aquaculture-divider.webp"))}" alt="${escapeHtml(lang === "zh" ? "山水之间的可持续水产养殖场" : "Sustainable aquaculture among mountains and clear water")}"></figure>`
        : "";
      const virtualTour = index === 1
        ? `<figure class="lux-about-vr">
            <iframe loading="lazy" src="https://trufflebar.com/vr/" title="${escapeHtml(lang === "zh" ? "曼谷 TruffleBar & Restaurant 360° 全景体验" : "TruffleBar & Restaurant Bangkok 360° virtual tour")}" allow="fullscreen; accelerometer; gyroscope" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
            <figcaption><span>${escapeHtml(lang === "zh" ? "TruffleBar & Restaurant · 曼谷全景体验" : "TruffleBar & Restaurant · Bangkok Virtual Tour")}</span><a href="https://trufflebar.com/vr/" target="_blank" rel="noopener">${escapeHtml(lang === "zh" ? "全屏打开" : "Open Full Screen")}<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"></path><path d="M7 7h10v10"></path></svg></a></figcaption>
          </figure>`
        : "";
      return `${divider}${virtualTour}<section class="lux-reader-section" id="lux-about-section-${index}">
        <h3>${escapeHtml(heading)}</h3>
        ${paragraphs(content)}
        ${gallery}
      </section>`;
    }).join("");

    aboutMount.innerHTML = `
      <div class="lux-recent-events-inner">
        <header class="lux-recent-events-head">
          <span>Maison Story</span>
          <h2>${escapeHtml(aboutLabels.title)}</h2>
        </header>
      </div>
      <article class="lux-reader-layout">
        <section class="lux-reader-hero">
          <div class="lux-reader-hero-copy">
            <div class="lux-reader-meta-grid"><span>${escapeHtml(aboutLabels.journal)}</span><span>${escapeHtml(aboutLabels.title)}</span><span>${escapeHtml(aboutLabels.story)}</span><span>${escapeHtml(aboutLabels.madeIn)}</span></div>
            <h2><span class="lux-about-title-brand">${escapeHtml(titleBrand)}｜</span>${escapeHtml(titleRest.join("｜"))}</h2>
            <p class="lux-reader-summary">${escapeHtml(aboutArticle.intro)}</p>
          </div>
          <figure class="lux-reader-cover">
            <button type="button" class="lux-about-image-button" data-about-image="${escapeHtml(aboutArticle.image)}" data-about-image-alt="${escapeHtml(aboutLabels.portrait)}" aria-label="${escapeHtml(aboutLabels.view)}: ${escapeHtml(aboutLabels.portrait)}">
              <img loading="lazy" decoding="async" src="${escapeHtml(aboutArticle.image)}" alt="${escapeHtml(aboutLabels.portrait)}">
              <span>${escapeHtml(aboutLabels.view)}</span>
            </button>
          </figure>
        </section>
        <section class="lux-reader-content lux-about-content">
          <div class="lux-reader-copy">
            <section class="lux-reader-section lux-reader-section-opening">${paragraphs(aboutArticle.opening)}</section>
            ${sectionHtml}
            <blockquote class="lux-reader-quote">${escapeHtml(aboutArticle.quote)}</blockquote>
          </div>
        </section>
      </article>`;
  };
  renderAboutStory();

  if (aboutMount) {
    aboutMount.querySelectorAll("[data-about-carousel]").forEach((carousel) => {
      const track = carousel.querySelector(".lux-about-carousel-track");
      if (!track) return;
      let timer;
      const advance = () => track.scrollTo({ left: track.scrollLeft >= track.scrollWidth - track.clientWidth - 1 ? 0 : track.scrollLeft + track.clientWidth * .8, behavior: "smooth" });
      const stop = () => clearInterval(timer);
      const start = () => {
        stop();
        if (!matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches && track.scrollWidth > track.clientWidth) timer = setInterval(advance, 4000);
      };
      carousel.addEventListener("mouseenter", stop);
      carousel.addEventListener("mouseleave", start);
      carousel.addEventListener("focusin", stop);
      carousel.addEventListener("focusout", (event) => { if (!carousel.contains(event.relatedTarget)) start(); });
      document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
      start();
    });
    const lightbox = document.createElement("dialog");
    lightbox.className = "lux-about-lightbox";
    lightbox.innerHTML = `<div class="lux-image-lightbox-frame"><button type="button" data-about-lightbox-close aria-label="${escapeHtml(aboutLabels.close)}"><svg class="lux-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg></button><img loading="lazy" decoding="async" alt=""></div>`;
    document.body.appendChild(lightbox);

    document.addEventListener("click", (event) => {
      const imageTrigger = event.target.closest("[data-about-image]");
      if (imageTrigger) {
        const image = lightbox.querySelector("img");
        image.src = imageTrigger.dataset.aboutImage;
        image.alt = imageTrigger.dataset.aboutImageAlt || "";
        lightbox.showModal();
        return;
      }

      const carouselTrigger = event.target.closest("[data-about-carousel-step]");
      if (carouselTrigger) {
        const track = carouselTrigger.closest("[data-about-carousel]").querySelector(".lux-about-carousel-track");
        track.scrollBy({ left: Number(carouselTrigger.dataset.aboutCarouselStep) * track.clientWidth * .8, behavior: "smooth" });
        return;
      }

      if (event.target === lightbox || event.target.closest("[data-about-lightbox-close]")) lightbox.close();
    });
  }

  const syncReaderCards = () => {
    const seen = new Set();
    const sync = (node, article) => {
      if (!node || seen.has(node) || node.closest(".lux-home-harvest, .lux-olive-recipe-stories") || node.matches(".lux-recipe-theme-card")) return;
      seen.add(node);
      const image = node.querySelector("img");
      const background = node.querySelector(".lux-dark-photo-bg, [style*='background-image']");
      if (image) {
        image.src = article.cardImage || article.image;
        image.alt = article.cardTitle || article.title;
        if (article.cardPosition || article.coverPosition) image.style.objectPosition = article.cardPosition || article.coverPosition;
      } else if (background) {
        background.style.backgroundImage = `url("${article.cardImage || article.image}")`;
      }
      const heading = node.querySelector("h1,h2,h3,h4");
      if (heading) heading.textContent = article.cardTitle || article.title;
      const eyebrow = Array.from(node.querySelectorAll("span"))
        .find((span) => !span.closest("a,button") && !span.classList.contains("material-symbols-outlined") && /\D/.test(span.textContent.trim()) && span.textContent.trim().length < 64);
      if (eyebrow) eyebrow.textContent = article.cardEyebrow || article.eyebrow;
      const paragraph = node.querySelector("p");
      if (paragraph) {
        paragraph.textContent = article.cardText || article.intro;
        paragraph.style.whiteSpace = article.cardText?.includes("\n") ? "pre-line" : "";
      }
    };

    document.querySelectorAll("[data-reader-open]").forEach((trigger) => {
      if (trigger.closest(".lux-home-market-collage")) return;
      const article = articles[trigger.dataset.readerOpen];
      if (!article) return;
      sync(trigger.closest(".lux-reader-card, .article-card") || trigger.parentElement, article);
    });
  };
  syncReaderCards();

  const reader = document.createElement("div");
  reader.className = "lux-reader";
  reader.hidden = true;
  reader.innerHTML = `
    <div class="lux-reader-backdrop" data-reader-close></div>
    <section class="lux-reader-panel" role="dialog" aria-modal="true" aria-labelledby="lux-reader-title">
      <header class="lux-reader-header">
        <button type="button" class="lux-reader-back" data-reader-back hidden></button>
        <button type="button" class="lux-reader-close" data-reader-close></button>
      </header>
      <div class="lux-reader-body" tabindex="-1"></div>
    </section>`;
  document.body.appendChild(reader);

  const body = reader.querySelector(".lux-reader-body");
  const panel = reader.querySelector(".lux-reader-panel");
  const backButton = reader.querySelector("[data-reader-back]");
  const closeButtons = reader.querySelectorAll("[data-reader-close]");
  let currentId = "";
  let archiveOrigin = false;
  const stack = [];
  const syncReaderTop = () => {
    panel.classList.toggle("is-at-top", body.scrollTop <= 4);
  };

  const showReader = (copy) => {
    reader.hidden = false;
    document.body.classList.add("lux-reader-open");
    backButton.hidden = stack.length === 0;
    backButton.textContent = copy.back;
    reader.querySelector(".lux-reader-close").textContent = copy.close;
    body.focus();
    body.scrollTop = 0;
    syncReaderTop();
  };

  const renderArchive = (push) => {
    if (push && currentId) stack.push(currentId);
    currentId = "__archive";
    const copy = labels();
    const groups = archiveGroups();
    const allLabel = document.documentElement.lang?.startsWith("zh") ? "全部内容" : "All Collections";
    const items = groups.flatMap(([title, ids]) => ids.map((id) => ({ id, title })));
    body.innerHTML = `
      <article class="lux-reader-archive">
        <div class="lux-reader-archive-head">
          <h2>${escapeHtml(copy.archive)}</h2>
          <div class="lux-reader-archive-tabs">
            <button type="button" class="is-active" data-reader-archive-filter="all">${escapeHtml(allLabel)}</button>
            ${groups.map(([title]) => `<button type="button" data-reader-archive-filter="${escapeHtml(title)}">${escapeHtml(title)}</button>`).join("")}
          </div>
        </div>
        <div class="lux-reader-archive-grid">
          ${items.map(({ id, title }) => {
            const item = articles[id];
            return item ? `
              <button type="button" class="lux-reader-archive-card" data-reader-archive-item="${escapeHtml(id)}" data-reader-archive-category="${escapeHtml(title)}">
                <span class="lux-reader-archive-media"><img loading="lazy" decoding="async" src="${escapeHtml(item.image)}" alt=""><span class="lux-reader-archive-cta">${copy.read}</span></span>
                <span class="lux-reader-archive-copy"><span>${escapeHtml(item.eyebrow)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(lang === "zh" ? item.meta.split("·").map((part, index) => index ? part.trim() : localizeArchiveLabel(part.trim())).join(" · ") : item.meta)}</small></span>
              </button>` : "";
          }).join("")}
        </div>
      </article>`;
    showReader(copy);
  };

  const topicArt = (article, compact = false) => article.image
    ? `<img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">`
    : `<div class="lux-reader-cover-art ${escapeHtml(article.artClass || "is-caviar")}" role="img" aria-label="${escapeHtml(article.title)}"></div>`;

  const render = (id, push) => {
    const article = articles[id];
    if (!article) return;
    if (push && currentId) stack.push(currentId);
    currentId = id;
    const copy = labels();
    if (article.type === "recipe" && article.recipe) {
      const recipe = article.recipe;
      const recipeLabels = article.lang === "zh"
        ? { time: "时间", difficulty: "难度", servings: "份量", ingredients: "食材", method: "准备", nutrition: "每份的估计营养成分", nutritionNote: "营养说明", region: "参考产区", oil: "推荐用油", professionalTip: "专业提示", foodSafety: "食品安全", allergens: "过敏原提示", substitutions: "可替换食材", products: "相关产品" }
        : { time: "Time", difficulty: "Difficulty", servings: "Serves", ingredients: "Ingredients", method: "Method", nutrition: "Estimated nutrition per serving", nutritionNote: "Nutrition note", region: "Reference region", oil: "Suggested oil", professionalTip: "Professional tip", foodSafety: "Food safety", allergens: "Allergen note", substitutions: "Substitutions", products: "Related products" };
      const productCategory = article.productCategory || (article.topic === "olive" ? "olive-oil" : article.topic);
      const productIndex = document.querySelector('.lux-nav a[href$="product.html"], .lux-nav a[href$="/product/"]')?.href || "product.html";
      const productUrl = new URL(productIndex, location.href);
      if (productCategory) productUrl.searchParams.set("category", productCategory);
      productUrl.hash = productCategory ? "product-catalogue" : "";
      const productHref = productUrl.href;
      body.innerHTML = `
        <article class="lux-recipe-reader">
          <section class="lux-recipe-hero">
            <figure>${article.image ? `<img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">` : topicArt(article)}</figure>
            <div class="lux-recipe-intro">
              <span>${escapeHtml(article.eyebrow)}</span>
              <h2 id="lux-reader-title">${escapeHtml(article.title)}</h2>
              <p>${escapeHtml(article.intro)}</p>
              <dl class="lux-recipe-facts">
                <div><dt>${recipeLabels.time}</dt><dd>${escapeHtml(recipe.time)}</dd></div>
                <div><dt>${recipeLabels.difficulty}</dt><dd>${escapeHtml(recipe.difficulty)}</dd></div>
                <div><dt>${recipeLabels.servings}</dt><dd>${escapeHtml(recipe.servings)}</dd></div>
              </dl>
            </div>
          </section>
          <section class="lux-recipe-body">
            <aside class="lux-recipe-ingredients">
              <h3>${recipeLabels.ingredients}</h3>
              <ul>${recipe.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </aside>
            <div class="lux-recipe-method">
              <h3>${recipeLabels.method}</h3>
              <ol>${recipe.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
            </div>
          </section>
          <section class="lux-recipe-nutrition">
            <header><h3>${recipeLabels.nutrition}</h3></header>
            <dl>${recipe.nutrition.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>
            ${recipe.nutritionNote ? `<p class="lux-recipe-nutrition-note"><strong>${recipeLabels.nutritionNote}</strong>${escapeHtml(recipe.nutritionNote)}</p>` : ""}
          </section>
          <section class="lux-recipe-details">
            ${[[recipeLabels.region, recipe.region], [recipeLabels.oil, recipe.oil], [recipeLabels.professionalTip, recipe.professionalTip], [recipeLabels.foodSafety, recipe.foodSafety], [recipeLabels.allergens, recipe.allergens], [recipeLabels.substitutions, recipe.substitutions]].filter(([, value]) => value).map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
            ${recipe.products ? `<div><dt>${recipeLabels.products}</dt><dd><a class="lux-recipe-product-link" href="${escapeHtml(productHref)}">${escapeHtml(recipe.products)}<svg class="lux-lucide" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"/></svg></a></dd></div>` : ""}
          </section>
        </article>`;
      showReader(copy);
      return;
    }
    const articleSections = article.sections.length ? article.sections : [[copy.note, copy.noteText]];
    const contentText = (item) => typeof item === "string"
      ? item
      : item?.type === "table"
        ? item.rows.flat().join(" ")
        : item?.lines?.join("") || item?.text || "";
    const paragraphs = (content, mergeShortCopy = false) => {
      const items = Array.isArray(content) ? content : [content];
      if (mergeShortCopy && items.every((item) => typeof item === "string")) {
        const groups = [];
        for (const item of items) {
          const isListItem = item.startsWith("• ");
          const previous = groups.at(-1);
          if (isListItem && previous?.type === "list") previous.items.push(item.slice(2));
          else if (isListItem) groups.push({ type: "list", items: [item.slice(2)] });
          else if (previous?.type === "copy") previous.items.push(item);
          else groups.push({ type: "copy", items: [item] });
        }
        return groups.map((group) => group.type === "list"
          ? `<ul class="lux-reader-prose-list">${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
          : `<p>${group.items.map(escapeHtml).join(article.lang === "zh" ? "" : " ")}</p>`).join("");
      }
      return items.map((item) => item?.type === "table"
        ? `<div class="lux-reader-table-wrap"><table><tbody>${item.rows.map((row, rowIndex) => `<tr>${row.map((cell) => `<${rowIndex ? "td" : "th"}>${escapeHtml(cell)}</${rowIndex ? "td" : "th"}>`).join("")}</tr>`).join("")}</tbody></table></div>`
        : item?.type === "strong"
        ? `<p class="lux-reader-inline-heading"><strong>${escapeHtml(item.text)}</strong></p>`
        : item?.type === "quote"
          ? `<blockquote class="lux-reader-indent-quote">${item.lines.map((line, index) => `<p>${item.bold?.includes(index) ? `<strong>${escapeHtml(line)}</strong>` : escapeHtml(line)}</p>`).join("")}</blockquote>`
          : `<p>${escapeHtml(item)}</p>`)
        .join("");
    };
    const opening = article.opening || [];
    const plainText = [article.intro, ...opening, ...articleSections.flatMap(([, content]) => (Array.isArray(content) ? content : [content]).map(contentText))].join(" ");
    const units = article.lang === "zh" ? plainText.replace(/\s/g, "").length / 300 : (plainText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length / 200;
    const minutes = Math.max(1, Math.ceil(units));
    const metaParts = article.meta.split("·").map((part) => part.trim()).filter(Boolean);
    const readTime = article.lang === "zh" ? `${minutes} 分钟阅读` : `${minutes} min read`;
    const issue = article.slug
      ? (article.lang === "zh" ? "知识博客" : "Knowledge Blog")
      : (article.lang === "zh" ? "品牌调查" : "LuxurEat (露意膳) Journal");
    const metaItems = [issue, article.eyebrow, readTime, metaParts[1] || metaParts[0] || ""];
    const asideRows = [
      [article.lang === "zh" ? "栏目" : "Column", article.column || article.eyebrow],
      [article.lang === "zh" ? "档案" : "Series", article.archive || localizeArchiveLabel(metaParts[0]) || copy.archive],
      [article.lang === "zh" ? "日期" : "Date", metaParts[1] || ""],
    ].filter(([, value]) => value);
    const tocLabel = article.lang === "zh" ? "目录" : "Contents";
    const figureLabel = article.lang === "zh" ? "图" : "Figure";
    const openingHtml = opening.length ? `<section class="lux-reader-section lux-reader-section-opening">${paragraphs(opening, Boolean(article.slug))}</section>` : "";
    const sectionHtml = articleSections.map(([heading, content], index) => {
      const media = article.sectionMedia?.[index] || [];
      return `
          <section class="lux-reader-section" id="lux-reader-section-${index}">
            <h3>${escapeHtml(heading)}</h3>
            ${paragraphs(content, Boolean(article.slug))}
            ${media.length ? `<div class="lux-reader-section-media">${media.map((item, mediaIndex) => `
              <figure>
                <button type="button" class="lux-reader-image-button" data-reader-image="${escapeHtml(item.src)}" aria-label="${escapeHtml(article.lang === "zh" ? `放大查看：${item.alt || heading}` : `View full size: ${item.alt || heading}`)}">
                  <img loading="lazy" decoding="async" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || heading)}">
                </button>
                <figcaption>${figureLabel} ${String(mediaIndex + 1).padStart(2, "0")} / ${escapeHtml(heading)}</figcaption>
              </figure>`).join("")}</div>` : ""}
          </section>`;
    }).join("");
    const tocHtml = articleSections.map(([heading], index) => `<a href="#lux-reader-section-${index}">${escapeHtml(article.tocLabels?.[index] || heading)}</a>`).join("");

    body.innerHTML = `
      <article class="lux-reader-layout${article.slug ? " lux-academy-reader" : ""}${article.wideCover ? " is-wide-cover" : ""}">
        <div class="lux-reader-rule"></div>
        <section class="lux-reader-hero">
          <div class="lux-reader-hero-copy">
            <div class="lux-reader-meta-grid">
              ${metaItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
            </div>
            <h2 id="lux-reader-title">${escapeHtml(article.title)}</h2>
            <p class="lux-reader-summary">${escapeHtml(article.intro)}</p>
          </div>
          <figure class="lux-reader-cover">
            ${article.image ? `<img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}"${article.coverPosition ? ` style="object-position: ${escapeHtml(article.coverPosition)}"` : ""}>` : topicArt(article)}
            <figcaption>${figureLabel} 01 / ${escapeHtml(article.archive || article.eyebrow)}</figcaption>
          </figure>
        </section>
        <section class="lux-reader-content">
          <aside class="lux-reader-aside">
            ${asideRows.map(([label, value]) => `<span>${escapeHtml(label)}：${escapeHtml(value)}</span>`).join("")}
          </aside>
          <div class="lux-reader-copy">
            ${openingHtml}
            ${sectionHtml}
            ${article.cta ? `<a class="lux-reader-article-cta" href="${escapeHtml(article.cta.href)}">${escapeHtml(article.cta.label)}</a>` : ""}
            ${article.quote ? `<blockquote class="lux-reader-quote">${escapeHtml(article.quote)}</blockquote>` : ""}
          </div>
          <aside class="lux-reader-pull">
            <p>${escapeHtml(article.asideSummary || article.quote || copy.noteText)}</p>
            <nav class="lux-reader-toc" aria-label="${escapeHtml(tocLabel)}">
              <span>${escapeHtml(tocLabel)}</span>
              ${tocHtml}
            </nav>
          </aside>
        </section>
          <section class="lux-reader-related">
            <div class="lux-reader-related-head">
              <h3>${copy.related}</h3>
            </div>
            <div class="lux-reader-related-grid">
              ${article.related.map((relatedId) => {
                const item = articles[relatedId];
                return item ? `
                  <button type="button"${item.wideCover ? ' class="is-wide-cover"' : ""} data-reader-related="${escapeHtml(relatedId)}">
                    <span class="lux-reader-related-media">
                      ${item.image ? `<img loading="lazy" decoding="async" src="${escapeHtml(item.image)}" alt="">` : topicArt(item, true)}
                      <span class="lux-reader-related-cta">${copy.read}</span>
                    </span>
                    <span>${escapeHtml(item.archive || item.eyebrow)}</span>
                    <strong>${escapeHtml(item.title)}</strong>
                  </button>` : "";
              }).join("")}
            </div>
          </section>
      </article>`;

    showReader(copy);
  };

  const renderEvent = (id) => {
    const event = events.find((item) => item.id === id);
    const article = event?.[lang];
    if (!event || !article) return;
    stack.length = 0;
    archiveOrigin = false;
    currentId = `event:${id}`;
    const copy = labels();
    const allEvents = events.map((item) => ({ item, copy: item[lang] })).filter(({ copy: itemCopy }) => itemCopy);
    body.innerHTML = `
      <article class="lux-event-reader">
        <header class="lux-event-reader-intro">
          <div>
            <p>${escapeHtml(article.eyebrow)} / ${escapeHtml(article.category)}</p>
            <h2 id="lux-reader-title">${escapeHtml(article.articleTitle)}</h2>
          </div>
          <p>${escapeHtml(article.intro)}</p>
        </header>
        <div class="lux-event-reader-layout">
          <section class="lux-event-reader-article">
            <figure><img loading="lazy" decoding="async" src="${escapeHtml(event.previewImage || event.image)}" alt="${escapeHtml(article.articleTitle)}"></figure>
            <div class="lux-event-reader-lead">
              <span>${escapeHtml(article.dateIso)}<br>${escapeHtml(article.city)}<br>${escapeHtml(article.category)}</span>
              <p>${escapeHtml(article.intro)}</p>
            </div>
            <div class="lux-event-reader-copy">
              <aside>${lang === "zh" ? "活动回顾" : "Event Journal"}<br>${escapeHtml(article.location)}</aside>
              <div>
                ${article.sections.map(([heading, text]) => `<section><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(text)}</p></section>`).join("")}
                <blockquote>${escapeHtml(article.quote)}</blockquote>
              </div>
            </div>
          </section>
          <aside class="lux-event-reader-index">
            <div><h3>${lang === "zh" ? "所有活动" : "All Events"}</h3><span>${String(allEvents.length).padStart(2, "0")}</span></div>
            ${allEvents.map(({ item, copy: itemCopy }, index) => `<button type="button" data-event-open="${escapeHtml(item.id)}"><img loading="lazy" decoding="async" src="${escapeHtml(item.poster || item.image)}" alt=""><span><strong>${escapeHtml(itemCopy.articleTitle)}</strong><small>${escapeHtml(itemCopy.city)} / ${escapeHtml(itemCopy.dateIso)}</small></span><small>${String(index + 1).padStart(2, "0")}</small></button>`).join("")}
          </aside>
        </div>
      </article>`;
    showReader(copy);
  };

  const open = (id) => {
    stack.length = 0;
    archiveOrigin = false;
    currentId = "";
    render(id, false);
  };
  const close = () => {
    if (archiveOrigin && currentId !== "__archive") {
      stack.length = 0;
      archiveOrigin = false;
      renderArchive(false);
      return;
    }
    reader.hidden = true;
    document.body.classList.remove("lux-reader-open");
    stack.length = 0;
    archiveOrigin = false;
    currentId = "";
    if (location.hash.startsWith("#event-") || location.hash.startsWith("#reader-")) history.replaceState(null, "", `${location.pathname}${location.search}`);
  };

  const imageLightbox = document.createElement("dialog");
  imageLightbox.className = "lux-about-lightbox";
  imageLightbox.innerHTML = `<div class="lux-image-lightbox-frame"><button type="button" data-reader-lightbox-close aria-label="${lang === "zh" ? "关闭大图" : "Close full-size image"}"><svg class="lux-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg></button><img alt=""></div>`;
  document.body.appendChild(imageLightbox);

  document.addEventListener("click", (event) => {
    const eventTrigger = event.target.closest("[data-event-open]");
    if (eventTrigger) {
      event.preventDefault();
      renderEvent(eventTrigger.dataset.eventOpen);
      return;
    }
    const archive = event.target.closest("[data-reader-archive]");
    if (archive) {
      event.preventDefault();
      stack.length = 0;
      archiveOrigin = false;
      currentId = "";
      renderArchive(false);
      return;
    }
    const trigger = event.target.closest("[data-reader-open]") || event.target.closest(".lux-reader-media")?.querySelector("[data-reader-open]");
    if (!trigger || !articles[trigger.dataset.readerOpen]) return;
    event.preventDefault();
    open(trigger.dataset.readerOpen);
  });
  body.addEventListener("click", (event) => {
    const imageTrigger = event.target.closest("[data-reader-image]");
    if (imageTrigger) {
      const image = imageLightbox.querySelector("img");
      image.src = imageTrigger.dataset.readerImage;
      image.alt = imageTrigger.querySelector("img")?.alt || "";
      imageLightbox.showModal();
      return;
    }
    const archived = event.target.closest("[data-reader-archive-item]");
    if (archived) {
      stack.length = 0;
      archiveOrigin = true;
      render(archived.dataset.readerArchiveItem, false);
      return;
    }
    const related = event.target.closest("[data-reader-related]");
    if (related) render(related.dataset.readerRelated, true);
    const archiveFilter = event.target.closest("[data-reader-archive-filter]");
    if (archiveFilter) {
      const filter = archiveFilter.dataset.readerArchiveFilter || "all";
      body.querySelectorAll("[data-reader-archive-filter]").forEach((button) => {
        button.classList.toggle("is-active", button === archiveFilter);
      });
      body.querySelectorAll("[data-reader-archive-category]").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.readerArchiveCategory !== filter;
      });
    }
  });
  imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox || event.target.closest("[data-reader-lightbox-close]")) imageLightbox.close();
  });
  body.addEventListener("scroll", syncReaderTop, { passive: true });
  backButton.addEventListener("click", () => {
    const previous = stack.pop();
    if (previous === "__archive") renderArchive(false);
    else if (previous) render(previous, false);
  });
  closeButtons.forEach((button) => button.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !imageLightbox.open && !reader.hidden) close();
  });
  if (location.hash === "#archive") renderArchive(false);
  else if (events.some((event) => event.id === eventHash)) renderEvent(eventHash);
  else if (articles[readerHash]) open(readerHash);
}


if (document.readyState === "complete") initLuxReader();
else document.addEventListener("DOMContentLoaded", initLuxReader, { once: true });
