(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-beluga-caviar"] = revive({"slug":"beluga-caviar","lang":"zh","eyebrow":"鱼子酱知识科普","title":"贝鲁迦鱼子酱","meta":"鱼子酱知识科普 · 2026","image":"assets/media/academy/beluga-caviar-cover-new-page-bg.png","intro":"贝鲁迦鱼子酱（Beluga caviar）被视为最奢华、最稀有的鱼子酱之一，取自欧鳇（Beluga sturgeon，Huso huso），以硕大的灰色颗粒和细腻、奶油般的口感闻名。","opening":["贝鲁迦鱼子酱长期被视为最负盛名、价格最高昂的鱼子酱。爱德华八世的妻子华里丝·辛普森十分喜爱它，使其成为奢华生活与社会地位的象征。温莎夫妇在巴黎温莎别墅、昂蒂布角克罗城堡和伊夫林地区日夫的磨坊庄园举行的晚宴，以大量供应贝鲁迦鱼子酱闻名，宾客包括温斯顿·丘吉尔和玛琳·黛德丽等名流。","作为稀有且备受追捧的珍馐，俄罗斯传统上曾是贝鲁迦鱼子酱的主要来源之一。"],"sections":[["贝鲁迦鱼子酱的感官特征",["品种：欧鳇","色泽：从深灰色到浅灰色","颗粒尺寸：3.3–3.5毫米，色泽均匀、油脂感良好","鲟鱼年龄：18–20年","香气：无明显气味","质地：柔软、细腻，带有奶油感","风味：清新的鱼鲜味与海洋、奶油气息，尾韵略带甜感"]],["如何辨别贝鲁迦鱼子酱",["可通过密封罐上的标签辨别贝鲁迦鱼子酱。传统上，贝鲁迦标签和罐身使用蓝色或浅蓝色标识。鱼卵直径应在3–3.5毫米之间，色泽均匀。CaviarEat会在标签上明确标注纯种贝鲁迦，保证其纯度。"]],["杂交贝鲁迦",["市场上也有常被称为“西伯利亚贝鲁迦”的杂交品种，由贝氏鲟雌鱼与欧鳇雄鱼杂交而成。其生产周期只需7–8年，而纯种欧鳇通常需要18–20年。"]],["贝鲁迦鱼子酱的搭配",["理想搭配是香槟或优质起泡酒，可平衡鱼子酱天然的油脂感；冰镇伏特加也是经典选择。其他适合的酒款包括卢瓦尔河坡慕斯卡黛、加卢拉维蒙蒂诺DOCG、普罗旺斯卡西斯AOC、佛得角白麝香葡萄酒，或更现代的瓦尔多比亚德内普罗塞克。食物方面，可搭配薄切水煮土豆、黄油布里尼、溏心蛋，或淋有榛子油、核桃油的烤面包。"]]],"sectionMedia":[[],[{"src":"assets/media/academy/beluga-caviar-02.png","alt":"贝鲁迦鱼子酱"}],[],[]],"relatedSlugs":["kaluga-amur-caviar","oscetra-caviar","baerii-caviar"],"asideSummary":"本文从稀有性、感官特征和标签辨别，到杂交品种、奢华历史与经典搭配，系统认识贝鲁迦鱼子酱。","topic":"caviar","topicLabel":"鱼子酱学院","column":"鱼子酱学院","archive":"欧鳇","wideCover":true,"related":["zh-academy-kaluga-amur-caviar","zh-academy-oscetra-caviar","zh-academy-baerii-caviar"]});
})();
