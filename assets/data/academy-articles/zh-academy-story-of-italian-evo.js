(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-story-of-italian-evo"] = revive({"slug":"story-of-italian-evo","lang":"zh","topic":"olive","topicLabel":"橄榄油学院","column":"橄榄油学院","artClass":"is-olive","eyebrow":"橄榄油学院","title":"意大利特级初榨橄榄油的故事：从地中海日常食材到地域手工传统","meta":"橄榄油学院 · 2026","archive":"学院 / 文化","imageFile":"story-of-italian-evo.webp","intro":"橄榄油的历史远早于现代意大利国家的形成，但意大利半岛围绕橄榄种植、压榨、烹饪与品鉴发展出了极其丰富的地域文化。今天的特级初榨橄榄油，正是这段漫长农业与饮食历史的现代延续。","opening":[],"sections":[["比现代意大利更古老",["在意大利成为统一国家之前很久，橄榄种植就已经在地中海地区传播。希腊殖民、罗马农业以及地中海贸易共同推动橄榄油成为意大利半岛重要的食物、商品和日常材料。","在罗马时期，橄榄油通过有组织的贸易网络流通，不仅用于烹饪，也用于照明、化妆和仪式。它既具有饮食价值，也具有重要经济价值。"]],["地域身份逐渐形成",["罗马时期之后，橄榄文化长期保持高度地方化。不同地区根据气候、地形和饮食传统，发展出自己的橄榄品种、采收习惯、压榨方法与风味偏好。","这种地域多样性今天仍然定义着意大利特级初榨橄榄油。托斯卡纳、翁布里亚、利古里亚、普利亚、西西里、卡拉布里亚、加尔达等众多地区，都能生产出感官特征明显不同的橄榄油。原产地名称保护和地理标志保护等体系也保护了其中一部分地理身份。"]],["从经验判断到现代标准",["在很长的历史时期里，品质主要依靠经验、声誉和品尝来判断。进入 20 世纪后，化学分析和正式感官评定的重要性不断提高，国际及欧洲标准也逐步建立了更清晰的初榨、特级初榨、精炼等橄榄油分类。","现代标准并没有取代手工经验，而是为生产者和消费者提供了一套共同语言，用来讨论一种仍然深受农业条件、时间节点和工艺影响的产品。"]],["为什么特级初榨橄榄油经常被拿来和葡萄酒比较",["优质特级初榨橄榄油能够表现出品种、产地、采收和生产选择，这一点很容易让人联想到葡萄酒。品鉴者会谈论果香、苦味、辛辣感和不同香气；厨师也会针对不同食物选择不同风格的油。","这种比较的价值在于，它能帮助消费者摆脱“橄榄油只是中性的厨房用油”这一印象。橄榄油本身也可以为一道菜贡献鲜明风味和身份。"]],["LuxurEat（露意膳） 视角",["LuxurEat（露意膳） 以地域差异作为讲述意大利特级初榨橄榄油的重要方式：一瓶油应有明确的产地、生产者和感官身份。面向中国市场时，如果这些故事能由清晰的产地信息、产品文件以及具体使用建议支持，可信度会更高。"]]],"sectionMedia":[],"asideSummary":"橄榄油的历史远早于现代意大利国家的形成，但意大利半岛围绕橄榄种植、压榨、烹饪与品鉴发展出了极其丰富的地域文化。今天的特级初榨橄榄油，正是这段漫长农业与饮食历史的现代延续。","relatedSlugs":["evo-vs-common-cooking-oil","evo-chocolate-dessert","choose-use-store-evo"],"image":"assets/media/academy/story-of-italian-evo.webp","related":["zh-academy-evo-vs-common-cooking-oil","zh-academy-evo-chocolate-dessert","zh-academy-choose-use-store-evo"]});
})();
