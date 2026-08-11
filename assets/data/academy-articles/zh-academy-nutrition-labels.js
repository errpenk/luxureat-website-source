(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-nutrition-labels"] = revive({"lang":"zh","slug":"nutrition-labels","topic":"nutrition","topicLabel":"营养与配料指南","artClass":"is-nutrition","eyebrow":"认识食品配料表","title":"读懂一张食品配料表","meta":"营养与配料指南 · 2026","archive":"标签阅读","intro":"按食品名称、配料、营养、致敏物质、日期、储存与责任主体的顺序，读懂一张预包装食品标签。","opening":["食品标签是产品事实的入口，但需要按顺序阅读。正面图片和广告语负责吸引注意，法定名称、配料表、营养成分、净含量、日期、储存方式、生产者和进口商等信息，才帮助消费者判断产品究竟是什么。","中国已发布GB 7718-2025等新版标准，具体实施与过渡要求应以国家卫生健康部门和市场监管部门的正式文件为准。网站文章只能解释阅读方法，任何具体产品都应以实际中文标签和当期适用法规为最终依据。"],"sections":[["先确认食品名称",["品牌名、系列名和风味名不一定是食品的法定或真实属性。先寻找能说明类别的名称，例如调味品、酱、橄榄油或冷冻甜品，再判断正面图片是否与实际配料一致。","若强调加入某种配料或特定成分，相关含量可能需要按适用规则标示。不要只因包装出现橄榄、松露或水果图片，就假设它们是主要成分。"]],["再读配料顺序",["配料通常按加入量递减排列，复合配料可能需要展开标示其组成。食品添加剂应按规定名称或功能类别呈现，不能仅凭配料名称长短判断产品优劣。","同一类产品可能为结构、酸度、乳化、保存或风味使用不同成分。关键是名称清楚、用途合法、信息可核对，并符合消费者的饮食和过敏需求。"]],["营养数字要换算到份量",["营养成分可能按每100克、每100毫升或每份标示。比较产品时先统一单位，再根据实际一次食用量换算。能量、蛋白质、脂肪、碳水化合物和钠等数字不能脱离总饮食解释。","“低”“无”“高”等营养声称受到条件约束，不是日常语言中的模糊形容词。遇到声称时应同时看数值、份量和适用标准。"]],["最后检查安全与使用信息",["过敏原、生产日期、保质期、开封后要求和储存温度直接影响选择。保质期建立在标示储存条件上，冷链产品离开规定温度后不能只看日期判断。","进口产品还应查看境内责任主体与中文信息。LuxurEat（露意膳）会把线上介绍与最终产品文件对应，若网页和包装存在差异，应以合法标签与最新技术资料为准并及时核实。"]],["数字标签与线上页面",["线上销售页面应提供消费者作出选择所需的关键信息，但网页截图可能在产品更新后过期。下单和收货时仍要核对实际包装，尤其是配方、过敏原、规格和日期。","二维码或数字标签可以承载更详细资料，却不应遮挡或取代依法必须出现在包装上的信息。无法确认版本时，保留批次并向责任主体查询。"]]],"asideSummary":"从食品名称到配料、营养、过敏原和储存逐层阅读，正面营销信息不能替代完整中文标签。","relatedSlugs":["allergens-guide","clean-label","ingredients-territory"],"image":"assets/media/academy/nutrition-cover-01.webp","column":"营养与配料指南","related":["zh-academy-allergens-guide","zh-academy-clean-label","zh-academy-ingredients-territory"],"sectionMedia":[]});
})();
