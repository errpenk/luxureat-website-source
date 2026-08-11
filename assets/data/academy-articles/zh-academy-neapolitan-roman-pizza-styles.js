(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-neapolitan-roman-pizza-styles"] = revive({"slug":"neapolitan-roman-pizza-styles","lang":"zh","topic":"pizza","topicLabel":"披萨学院","column":"披萨学院","artClass":"is-pizza","eyebrow":"披萨学院","title":"那不勒斯披萨与罗马披萨：为什么“意大利披萨”并不是一种东西","meta":"披萨学院 · 2026","archive":"学院 / 文化","imageFile":"neapolitan-roman-pizza-styles.webp","intro":"在意大利以外，披萨常被当成一种统一菜式。但在意大利，不同城市和不同风格之间，面团质地、烘烤方式、形状甚至食用场景都可能发生巨大变化。那不勒斯和罗马就是最清楚的两个例子。","opening":[],"sections":[["那不勒斯披萨：柔软、蓬松、快速高温烘烤",["那不勒斯披萨在欧盟登记为“传统特色保证”（传统特色保证），受保护名称对应的规范对原料和制作方式作出了规定。它通常具有柔软的中心、隆起而充满气孔的披萨外圈（外圈），并在极高温的柴火炉中短时间烘烤。","成品应该具有柔韧性，而不是像饼干一样硬脆。它可以在餐桌上用刀叉吃，也可以折叠后作为街头食物。中心偏软是这一风格的一部分，并不等于没有烤熟。"]],["罗马并不只有一种披萨",["“罗马披萨”并不是一个唯一、严格的类别。常见形式之一是罗马圆披萨，也就是以更薄、更脆底部著称的圆形披萨；另一种是罗马方盘切片披萨，在长方形烤盘中烘烤，切块后通常按重量出售。","这些形式和那不勒斯披萨形成了完全不同的食用体验。酥脆、便携、按块出售等特点，有时和配料本身一样重要。"]],["地域风格会改变技术",["那不勒斯和罗马之间的差异说明，披萨更应该被理解为一组意大利地方传统，而不是一种标准化产品。面粉选择、面团管理、发酵、整形、烤炉类型和出餐方式都会参与塑造成品。","两种方式并不存在谁“更好”。柔软的那不勒斯披萨和酥脆的罗马披萨，本来就在追求不同的口感目标。"]],["文化也是产品的一部分",["2017 年，联合国教科文组织将“那不勒斯披萨师的技艺”列入人类非物质文化遗产代表作名录。被认可的是围绕那不勒斯披萨师形成的手艺、动作、知识和社会实践，而不只是某一个配方。","这一点对消费者很重要：真正的饮食文化，并不会因为包装上印一面意大利国旗就自动成立，它来自技术、语境以及长期延续的实践。"]],["LuxurEat（露意膳） 视角",["对 LuxurEat（露意膳） 来说，更有力的披萨产品逻辑，应该先把这些风格差异解释清楚。当消费者理解某种面粉、番茄、特级初榨橄榄油或其他产品究竟服务于哪一种意大利披萨风格，以及该风格追求什么质地和技术目标时，产品本身才会更有意义。"]]],"sectionMedia":[],"asideSummary":"在意大利以外，披萨常被当成一种统一菜式。但在意大利，不同城市和不同风格之间，面团质地、烘烤方式、形状甚至食用场景都可能发生巨大变化。那不勒斯和罗马就是最清楚的两个例子。","relatedSlugs":["story-of-italian-pizza","modern-pinsa-romana","pizza-pinsa-at-home"],"image":"assets/media/academy/neapolitan-roman-pizza-styles.webp","related":["zh-academy-story-of-italian-pizza","zh-academy-modern-pinsa-romana","zh-academy-pizza-pinsa-at-home"]});
})();
