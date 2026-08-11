(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-baerii-caviar"] = revive({"slug":"baerii-caviar","lang":"zh","eyebrow":"鱼子酱知识科普","title":"贝氏鲟鱼子酱","meta":"鱼子酱知识科普 · 2026","image":"assets/media/academy/baerii-caviar-cover-page-bg.png","intro":"贝氏鲟鱼子酱取自西伯利亚鲟（Acipenser baerii），以灰棕色小颗粒和带有轻柔碘感的细腻风味著称。","opening":["贝氏鲟是成熟速度较快的鲟鱼品种之一，约 7–8 年即可成熟，产出的鱼卵也比其他品种更小。","这是我们产品目录中价格最亲民的鱼子酱，但凭借稳定品质和鲜明风味，依然深受厨师与美食爱好者喜爱。"],"sections":[["贝氏鲟鱼子酱的感官特征",["品种：西伯利亚鲟（Acipenser baerii）","色泽：从浅灰色到灰棕色","颗粒尺寸：约2.9–3.0毫米","鲟鱼年龄：8年","香气：无强烈气味","质地：颗粒紧实，弹性良好","风味：香气细腻，带有轻柔咸鲜气息"]]],"sectionMedia":[[]],"relatedSlugs":["beluga-caviar","kaluga-amur-caviar","caviar-processing"],"asideSummary":"从较快的成熟周期和亲民价格，到紧实的灰棕色颗粒与细腻咸鲜风味，本文完整介绍贝氏鲟鱼子酱的核心特点。","topic":"caviar","topicLabel":"鱼子酱学院","column":"鱼子酱学院","archive":"贝氏鲟","wideCover":true,"related":["zh-academy-beluga-caviar","zh-academy-kaluga-amur-caviar","zh-academy-caviar-processing"]});
})();
