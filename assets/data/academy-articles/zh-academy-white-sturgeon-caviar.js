(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-white-sturgeon-caviar"] = revive({"slug":"white-sturgeon-caviar","lang":"zh","eyebrow":"鱼子酱知识科普","title":"白鲟鱼子酱","meta":"鱼子酱知识科普 · 2026","image":"assets/media/academy/white-sturgeon-caviar-cover-page-bg.png","intro":"白鲟原生于北美西海岸，其鱼子酱以较大颗粒、奶油般质地和细腻风味受到珍视。","opening":["得益于较高产量和易于养殖的特点，白鲟鱼子酱如今已成为国际市场上供应广泛、需求旺盛的品种之一。"],"sections":[["白鲟鱼子酱的主要特征",["色泽：从深灰色到深黑色，具有体现新鲜度的明亮光泽。","颗粒尺寸：比许多品种更大，质地紧实而带有奶油感。","风味：细腻、略带黄油感，伴有海洋气息和顺滑尾韵，适合偏爱优雅、低强度风味的人。","产地：主要养殖于美国和加拿大，以稳定产量和高品质著称。"]],["推荐搭配",["白鲟鱼子酱适合搭配干型香槟、干白葡萄酒，以及黄油烤面包、鱼肉塔塔或新土豆等细腻菜肴。它用途广泛，既适合美食创作，也适合简洁而精致的直接品鉴。"]]],"sectionMedia":[[],[]],"relatedSlugs":["history-of-caviar","main-types-of-caviar","sevruga-caviar"],"asideSummary":"本文从北美产地、较大而绵密的颗粒、稳定生产，到多样餐酒搭配，介绍白鲟鱼子酱的核心价值。","topic":"caviar","topicLabel":"鱼子酱学院","column":"鱼子酱学院","archive":"白鲟","wideCover":true,"related":["zh-academy-history-of-caviar","zh-academy-main-types-of-caviar","zh-academy-sevruga-caviar"]});
})();
