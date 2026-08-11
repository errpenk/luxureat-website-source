(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-choose-use-store-evo"] = revive({"slug":"choose-use-store-evo","lang":"zh","topic":"olive","topicLabel":"橄榄油学院","column":"橄榄油学院","artClass":"is-olive","eyebrow":"橄榄油学院","title":"在家如何选择、使用和保存意大利特级初榨橄榄油","meta":"橄榄油学院 · 2026","archive":"学院 / 文化","imageFile":"olive-cover-10.webp","intro":"挑选一瓶好的特级初榨橄榄油并不需要专业品油师训练。正确读懂产品类别、查看产地信息、避光避热保存，并根据菜肴选择合适的风味强度，这些实用习惯远比单纯看油的颜色更重要。","opening":[],"sections":[["认真读标签",["第一步是确认准确类别：标签上应明确写出“特级初榨橄榄油”。随后可以查看原产信息、生产者或装瓶商资料，在适用时关注地理标志，以及产品是否提供采收信息。","深色玻璃瓶或金属罐有助于保护油品，但包装本身并不能证明品质。颜色同样不可靠：优秀橄榄油既可能呈金黄色，也可能呈深绿色。香气、味道、新鲜度和可追溯性比外观更有意义。"]],["保存方式很重要",["光、热和氧气会逐渐削弱橄榄油的芳香品质。瓶盖应保持紧闭，并远离阳光直射、暖气和灶台周围的高温。","开封后应正常使用，而不是为了“特殊场合”无限期保存。特级初榨橄榄油最有价值的时候，是新鲜香气仍然清晰存在的时候。"]],["生用和加热都可以",["特级初榨橄榄油既可以生用，也可以用于烹饪。加热会改变一部分新鲜芳香，因此好的橄榄油往往在出锅前或装盘后加入时，更能表现自己的性格。","可以尝试用在蔬菜、汤、烤鱼、豆类、面包、意面、肉类，甚至部分甜点上。真正值得问的，不只是“特级初榨橄榄油能不能加热”，而是“这道菜里，我想保留或突出这瓶油的哪些特点？”"]],["按风格选择，而不是只看名气",["强劲、苦感和辛辣感明显的油，能够应对烤蔬菜、肉类和风味浓郁的食物；细腻的油可能更适合鱼、蒸蔬菜、温和奶酪或甜点；果香型橄榄油往往用途尤其广。","没有必要强求一瓶油包办所有场景。理解风格，比只依赖价格、包装或某个著名产区名来选择更有实际意义。"]],["LuxurEat（露意膳） 视角",["LuxurEat（露意膳） 可以把每个特级初榨橄榄油产品页本身做成一份实用指南：它来自哪里、尝起来是什么风格、强度如何、适合什么菜，以及应该怎样保存。相比泛泛而谈“高端意大利橄榄油”，这些信息能给消费者更明确的选择理由。"]]],"sectionMedia":[],"asideSummary":"挑选一瓶好的特级初榨橄榄油并不需要专业品油师训练。正确读懂产品类别、查看产地信息、避光避热保存，并根据菜肴选择合适的风味强度，这些实用习惯远比单纯看油的颜色更重要。","relatedSlugs":["evo-vs-common-cooking-oil","story-of-italian-evo","evo-chocolate-dessert"],"image":"assets/media/academy/olive-cover-10.webp","related":["zh-academy-evo-vs-common-cooking-oil","zh-academy-story-of-italian-evo","zh-academy-evo-chocolate-dessert"]});
})();
