(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-kaluga-amur-caviar"] = revive({"slug":"kaluga-amur-caviar","lang":"zh","eyebrow":"鱼子酱知识科普","title":"卡露伽与阿穆尔鱼子酱","meta":"鱼子酱知识科普 · 2026","image":"assets/media/academy/kaluga-amur-caviar-cover-page-bg.png","intro":"卡露伽与阿穆尔鱼子酱被视为珍贵贝鲁迦鱼子酱（Beluga caviar）的优质替代选择，主要优势在于价格更亲民。卡露伽鲟仅栖息于中俄之间的黑龙江及其支流。","opening":["该鲟鱼的主要养殖场位于中国宜都。其鱼子酱与贝鲁迦鱼子酱十分相似，但风味略为浓郁；鱼卵色泽从棕色延伸至金色，是其鲜明特征。"],"sections":[["卡露伽与阿穆尔鱼子酱的感官特征",["品种：达氏鳇×施氏鲟（Acipenser dauricus x Schrenki）","色泽：从棕色到金色","颗粒尺寸：约3.0–3.1毫米","鲟鱼年龄：10–11年","香气：无强烈气味","质地：颗粒紧实、饱满","风味：平衡而协调"]],["皇家卡露伽与阿穆尔的区别",["CaviarEat产品目录提供两种卡露伽鱼子酱，主要区别在于颗粒尺寸、鲟鱼年龄与品质等级：","皇家卡露伽：鲟鱼年龄10–12年，颗粒直径3.0–3.3毫米。","阿穆尔：鲟鱼年龄约10年，颗粒直径约3.0毫米。"]]],"sectionMedia":[[],[]],"relatedSlugs":["oscetra-caviar","sevruga-caviar","beluga-caviar"],"asideSummary":"本文比较卡露伽与阿穆尔鱼子酱的产地、成熟周期、颗粒尺寸、金棕色泽，以及它们作为贝鲁迦替代选择的价值。","topic":"caviar","topicLabel":"鱼子酱学院","column":"鱼子酱学院","archive":"卡露伽","wideCover":true,"related":["zh-academy-oscetra-caviar","zh-academy-sevruga-caviar","zh-academy-beluga-caviar"]});
})();
