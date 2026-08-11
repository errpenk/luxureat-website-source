(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-sevruga-caviar"] = revive({"slug":"sevruga-caviar","lang":"zh","eyebrow":"鱼子酱知识科普","title":"闪光鲟鱼子酱","meta":"鱼子酱知识科普 · 2026","image":"assets/media/academy/sevruga-caviar-cover-page-bg.png","intro":"闪光鲟鱼子酱（Sevruga caviar）取自闪光鲟（stellate sturgeon，Acipenser stellatus），其鱼卵是主要鱼子酱品种中最小的，直径约2毫米，色泽均匀、质地紧实、风味浓郁。","opening":["其风味带有海洋、碘、榛子与植物气息，并具有鲜明的清新感。它是风格最强烈的鱼子酱之一，尤其受到偏爱浓郁香气者的欣赏。"],"sections":[["闪光鲟鱼子酱的历史",["20世纪上半叶，连接美国与欧洲的远洋客轮——如玛丽王后号、诺曼底号、雷克斯号、卡罗尼亚号、卢西塔尼亚号和著名的泰坦尼克号——象征着奢华与舒适。名流与上流社会聚集的船上餐厅供应精美菜肴，闪光鲟鱼子酱是头等舱菜单的亮点之一。传统上，它会盛放在带有镀金边缘的精致瓷贝壳中，并搭配细切洋葱、碎熟鸡蛋和烤面包。"]],["闪光鲟鱼子酱的特征",["色泽：从深灰色到浅灰色，白化个体偶见金色。","外观：颗粒较小，约2毫米，紧实且色泽均匀。","香气：细腻海洋气息，伴有轻微榛子与草本香。","质地：颗粒紧实，在柔软与爽脆之间取得平衡。","风味：浓郁饱满，带有海洋、碘、榛子和植物层次，并有清新的明亮感。"]],["推荐搭配",["闪光鲟鱼子酱既适合搭配菜肴，也适合精选酒款。可选择来自Cap Breton的白色沙地葡萄酒，或苏玳、托卡伊阿苏精华等甜酒。菜肴方面，可搭配酸奶油和洋葱烤土豆、融化黄油煮芦笋或烤鱼，以衬托其独特而浓郁的风味。"]]],"sectionMedia":[[],[],[]],"relatedSlugs":["white-sturgeon-caviar","history-of-caviar","oscetra-caviar"],"asideSummary":"本文介绍闪光鲟鱼子酱的小颗粒、强烈海洋风味、远洋客轮时代的历史，以及其感官特征和推荐搭配。","topic":"caviar","topicLabel":"鱼子酱学院","column":"鱼子酱学院","archive":"闪光鲟","wideCover":true,"related":["zh-academy-white-sturgeon-caviar","zh-academy-history-of-caviar","zh-academy-oscetra-caviar"]});
})();
