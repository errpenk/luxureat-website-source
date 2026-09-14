(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-caviar-after-opening"] = revive({"slug":"caviar-after-opening","lang":"zh","eyebrow":"鱼子酱知识科普","title":"鱼子酱开封后的保存方法","meta":"鱼子酱知识科普 · 2026","image":"assets/media/academy/caviar-after-opening-cover.webp","intro":"鱼子酱已经开封，但一次吃不完？以下是保持其最佳品质的方法。","opening":["鱼子酱非常娇贵。一旦开封，接触空气以及温度变化都会很快影响它的风味、口感和新鲜度。","遵循以下几个简单的原则，可以帮助保持其品质："],"sections":[["保持低温",["将鱼子酱存放在冰箱中温度最低的位置，理想保存温度为 -2°C 至 +2°C。切勿冷冻。"]],["使用合适的勺子",["选择珍珠母贝、牛角、玻璃或其他合适的非金属材质勺子，以免影响鱼子酱细腻的风味。"]],["尽量减少与空气接触",["取用后，将一小片食品级保鲜膜轻轻直接覆盖在剩余鱼子酱的表面，并尽可能排出其中的空气。随后将罐子密封好，并立即放回冰箱冷藏。"]],["尽快食用",["鱼子酱开封后最好尽快食用。在全程保持正确冷藏的情况下，一般建议在 2–3天内食用完毕。"]],["黄金法则",["保持低温、尽量减少与空气接触，并小心保存。","因为优质的鱼子酱，值得从第一勺到最后一勺，都保持它应有的美味。"]]],"sectionMedia":[[{"src":"assets/media/academy/caviar-after-opening-cold.webp","alt":"鱼子酱开封后的保存方法"}],[{"src":"assets/media/academy/caviar-after-opening-spoon.webp","alt":"鱼子酱开封后的保存方法"}],[{"src":"assets/media/academy/caviar-after-opening-care.webp","alt":"鱼子酱开封后的保存方法"}],[],[]],"relatedSlugs":["caviar-processing","main-types-of-caviar","baerii-caviar"],"asideSummary":"掌握开封鱼子酱的低温保存、减少空气接触、合适取用工具与 2–3 天食用期限。","topic":"caviar","topicLabel":"鱼子酱学院","column":"鱼子酱学院","archive":"开封保存","wideCover":false,"related":["zh-academy-caviar-processing","zh-academy-main-types-of-caviar","zh-academy-baerii-caviar"]});
})();
