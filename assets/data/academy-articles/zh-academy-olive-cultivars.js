(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-olive-cultivars"] = revive({"lang":"zh","slug":"olive-cultivars","topic":"olive","topicLabel":"橄榄油学院","artClass":"is-olive","eyebrow":"橄榄品种与香气","title":"品种如何改变橄榄油的香气","meta":"橄榄油学院 · 2026","archive":"品种与风味","intro":"从品种差异理解青草、番茄、果仁与辛香的来源，同时避免把品种名称当成固定风味公式。","opening":["葡萄酒会谈葡萄品种，橄榄油同样可以从橄榄品种进入。意大利拥有丰富的本地品种，它们在果实大小、成熟节奏、出油率、抗逆性和典型香气上各有差异。单一品种油强调一种橄榄的表达，混合油则可通过不同品种建立平衡与稳定。","品种提供的是倾向，不是保证。气候、土壤、树龄、采收成熟度、果实健康、加工设备和储存都会改变最终结果。即使标签写着相同品种，不同年份和生产者也可能呈现明显差异。"],"sections":[["品种如何进入香气",["橄榄果中的挥发性物质在破碎与搅拌过程中形成和释放，带来鲜草、叶片、番茄、苹果、杏仁或香草等联想。某些品种更容易表现绿色与辛香，另一些则偏柔和、果仁或成熟果感，但感官描述应以具体样品为准。","苦味和辛辣感与酚类组成相关，也受采收成熟度和加工影响。不能仅凭品种名推断强弱，更不能把辛辣等同于酸度；酸度是实验室测量的游离脂肪酸指标。"]],["单一品种与调和",["单一品种油便于观察地域和品种个性，也能帮助厨师建立明确的搭配语言。调和油并非低一等级：有经验的生产者可把不同香气、苦辣和稳定性组合起来，获得目标风格。关键是原料质量、工艺和标示是否真实。","比较时应选择相近新鲜度和保存状态的样品。若一瓶油因光热或开封过久失去香气，再典型的品种特征也难以辨认。"]],["成熟度改变表达",["较早采收的果实通常出油率较低，常见绿色香气和更清楚的苦辣；随着成熟推进，风味可能变得圆润，果香方向也会变化。这是一般趋势，并不意味着越早越高级，生产者需要在风味、产量和果实状态之间判断。","同一果园分批采收，或将不同成熟度油品调和，都可能形成稳定风格。了解采收日期和批次，有助于解释为何同一品种在不同瓶中表现不同。"]],["从品鉴到餐桌",["建立品种认识最有效的方法，是盲品两到三款并记录香气、苦辣、质地与搭配。柔和型可测试鱼类、乳酪和清淡蔬菜；绿色与辛香型可尝试豆类、烤肉、番茄和根茎菜。","LuxurEat（露意膳）在介绍品种时会同时提供产区、采收、加工与用途，不把品种名称当作营销捷径。对消费者来说，记住自己喜欢的风味组合，比追逐一个被神化的品种更有用。"]],["保存一套可比较样品",["若想系统学习，可选择同一采收季、相近包装状态的两款单一品种油与一款调和油。用相同杯具、温度和顺序品鉴，并在一周内重复一次，观察开瓶后的变化。","标签或课程中的典型香气只是起点。最终记录应以自己面前的样品为准，这也能帮助识别批次稳定性，而不是机械背诵品种词典。"]]],"asideSummary":"品种决定风味潜力，年份、成熟度、加工与储存决定它如何被呈现；单一品种和调和都可能拥有高品质。","relatedSlugs":["olive-regions","olive-oil-basics","pairings-class"],"image":"assets/media/academy/olive-cover-05.webp","column":"橄榄油学院","related":["zh-academy-olive-regions","zh-academy-olive-oil-basics","zh-academy-pairings-class"],"sectionMedia":[]});
})();
