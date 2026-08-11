(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-oscetra-caviar"] = revive({"slug":"oscetra-caviar","lang":"zh","eyebrow":"鱼子酱知识科普","title":"奥西特拉鱼子酱","meta":"鱼子酱知识科普 · 2026","image":"assets/media/academy/oscetra-caviar-cover.png","intro":"奥西特拉鱼子酱的颗粒色泽从灰色延伸至金色，质地丝滑，风味优雅，并带有榛子与黄油气息。","opening":[],"sections":[["不同名称",["市场上常见Asetra、Oscietra或Osetra等不同拼写，但它们指的是同一种鱼子酱。"]],["奥西特拉鱼子酱的感官特征",["品种：俄罗斯鲟（Acipenser gueldenstaedtii）","色泽：从深灰色到浅灰色，年龄较大的鲟鱼可呈现金色调。","颗粒尺寸：3.0–3.3毫米，色泽均匀，质地紧实。","鲟鱼年龄：10–12年。","质地：丝滑、颗粒紧实，卵膜比贝鲁迦鱼子酱（Beluga caviar）略厚。","风味：以榛子和黄油为主调，并带有类似龙虾与新鲜黄油的细腻甜感。"]],["皇家奥西特拉与奥西特拉",["CaviarEat提供两种主要奥西特拉鱼子酱，它们在颗粒尺寸、鲟鱼年龄和整体品质上有所不同：","皇家奥西特拉：鲟鱼年龄12–13年，颗粒直径3.2–3.3毫米。","奥西特拉：鲟鱼年龄10–12年，颗粒直径3.0–3.1毫米。"]],["更多感官特征",["色泽：从深灰色、浅灰色到金色；金色通常更珍贵，因为生产周期更长。","外观：颗粒约2.5毫米，紧实且色泽均匀。","香气：细微的果香与榛子气息，甜感比其他鱼子酱更柔和。","质地：顺滑丝润，卵膜比贝鲁迦鱼子酱略厚。","风味：榛子、黄油的丰润感，并伴有轻微泥土与海洋气息。","不同鲟鱼品种杂交形成的奥西特拉，也会展现独特的感官层次。"]],["推荐搭配",["奥西特拉适合搭配香槟或其他优质起泡酒。静止葡萄酒可选择普里尼-蒙哈榭一级园、夏布利特级园或干型泽比波。食物可从布里尼、薄切水煮土豆，延伸至焦化黄油龙虾配奥西特拉鱼子酱，或雅文邑火焰扇贝、鹅肝与奥西特拉鱼子酱等精致组合。"]],["奥西特拉与名人",["奥西特拉始终是奢华与精致的象征。默片女星葛洛丽亚·斯旺森喜欢用烤面包、奥西特拉鱼子酱、碎熟蛋黄、细切洋葱、柠檬片与薄番茄片制作小食。以优雅著称的加里·格兰特在摩纳哥拍摄《捉贼记》（1955）期间，常在下午五点享用奥西特拉。1956年格蕾丝·凯利与兰尼埃三世亲王的婚礼上，奥西特拉也与香槟一同款待宾客。蒙特卡洛至今仍延续着里维埃拉与摩纳哥公国关于鱼子酱、优雅和精致生活的传统。"]]],"sectionMedia":[[],[],[],[],[],[]],"relatedSlugs":["sevruga-caviar","white-sturgeon-caviar","kaluga-amur-caviar"],"asideSummary":"从名称、感官特征和等级差异，到名人轶事及精致餐酒搭配，本文完整呈现奥西特拉鱼子酱。","topic":"caviar","topicLabel":"鱼子酱学院","column":"鱼子酱学院","archive":"奥西特拉","wideCover":true,"related":["zh-academy-sevruga-caviar","zh-academy-white-sturgeon-caviar","zh-academy-kaluga-amur-caviar"]});
})();
