(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-history-of-caviar"] = revive({"slug":"history-of-caviar","lang":"zh","eyebrow":"鱼子酱知识科普","title":"鱼子酱的历史","meta":"鱼子酱知识科普 · 2026","image":"assets/media/academy/history-of-caviar-cover.webp","intro":"鱼子酱的历史可追溯至古代波斯与俄罗斯。“caviar”一词源自波斯语“khavyar”，意为“鱼卵”。","opening":["波斯人最早采集并盐渍鲟鱼卵，由此孕育了今天所熟知的鱼子酱。"],"sections":[["在俄罗斯的传播",["早在8世纪，斯拉夫渔民便从伏尔加河捕获大量鲟鱼，并充分利用鱼身各个部分。到12世纪，鱼子酱在俄罗斯仍是较易获得的食物，战争期间甚至被用作能量来源。随着时间推移，它由日常食品逐渐转变为奢华象征，并成为俄罗斯贵族传统的重要标志。"]],["从俄国革命到Petrossian兄弟",["20世纪，鱼子酱随着1917年十月革命后流亡法国的俄罗斯贵族进入法国市场。来自巴库的Petrossian兄弟是最早将其进口到法国的人之一，并与当时政府达成贸易协议。同一时期，在美国，鱼子酱也成为财富与精致生活的象征。"]],["养殖场的兴起",["过度捕捞以及多瑙河、伏尔加河水坝建设，使鲟鱼数量锐减约80%。1998年，鲟鱼被列为受保护物种，全球范围内的野生捕捞受到禁止，推动水产养殖发展。在意大利，鱼子酱早在文艺复兴时期便已出现，尤其与费拉拉有关；许多鳟鱼养殖户后来转向鲟鱼养殖，使意大利长期位居世界产量首位，如今仅次于中国。"]],["当代鱼子酱文化",["中国目前是世界最大的鱼子酱生产国，产品出口全球，并供应法国多家著名餐厅。法国的Emile Prunier在1918至1920年间率先开展本土生产，如今法国市场仍以国内消费为主。比利时、西班牙、英国、匈牙利和保加利亚也共同构成欧洲产区。"]],["历史演变",["波斯起源：波斯人最早盐渍鲟鱼卵，创造了鱼子酱。","俄罗斯：8世纪时鱼子酱仍是普通食物，后来逐渐成为奢华象征。","国际贸易：到12世纪，里海鲟鱼资源减少，引发围绕鱼子酱贸易的竞争。","美国扩张：南北战争后，鱼子酱一度常见到在酒馆中免费供应。","黄金时代：20世纪，鱼子酱成为价格不断攀升的精英食品。","可持续发展：野生鲟鱼减少后，可持续水产养殖让鱼子酱更易获得。","创新：如今市场拥有多种杂交品种与加工技术，在保障品质的同时兼顾环境责任。"]]],"sectionMedia":[[],[],[{"src":"assets/media/academy/history-of-caviar-02.webp","alt":"鱼子酱的历史"}],[],[]],"relatedSlugs":["main-types-of-caviar","caviar-processing","white-sturgeon-caviar"],"asideSummary":"本文沿着波斯起源、俄罗斯传统、欧洲奢华文化、养殖兴起与物种保护，梳理鱼子酱的全球历史。","topic":"caviar","topicLabel":"鱼子酱学院","column":"鱼子酱学院","archive":"历史","wideCover":false,"related":["zh-academy-main-types-of-caviar","zh-academy-caviar-processing","zh-academy-white-sturgeon-caviar"]});
})();
