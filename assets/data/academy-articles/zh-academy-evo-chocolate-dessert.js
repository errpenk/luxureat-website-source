(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-evo-chocolate-dessert"] = revive({"slug":"evo-chocolate-dessert","lang":"zh","topic":"olive","topicLabel":"橄榄油学院","column":"橄榄油学院","artClass":"is-olive","eyebrow":"橄榄油学院","title":"特级初榨橄榄油不只拌沙拉：当特级初榨橄榄油遇见巧克力和甜点","meta":"橄榄油学院 · 2026","archive":"学院 / 文化","imageFile":"evo-chocolate-dessert.webp","intro":"特级初榨橄榄油通常通过咸味料理被认识，但它的果香、苦味和芳香同样可以与巧克力、蛋糕和意式手工冰淇淋形成细腻的对比。关键在于选择合适的油，并控制使用量。","opening":[],"sections":[["不仅仅是一种烹饪脂肪",["特级初榨橄榄油带来的不只是油脂感。制作良好的油本身可能具有青草、香草、果香、苦味、胡椒感或坚果般的气息。正是这种独立的芳香个性，让它在甜点中具有趣味。","在烘焙中，黄油常用于提供结构和浓郁度。特级初榨橄榄油在部分配方中可以承担其中一部分作用，同时带入自己的风味。这并不自动意味着成品“更轻”或“更健康”，只是采用了不同的感官思路。"]],["巧克力与特级初榨橄榄油",["黑巧克力和风格鲜明的特级初榨橄榄油可以相互呼应，因为两者都可能带有苦味和较深的香气层次。少量特级初榨橄榄油可以淋在黑巧克力上、用于类似甘纳许的配方，或加入蛋糕中，让风味延伸而不是被遮盖。","较温和、果香更明显的油，也可以和牛奶巧克力或柑橘类甜点搭配。强度匹配非常重要：过于辛辣的油可能压过精致甜点，而过于温和的油则可能完全消失。"]],["用意式手工冰淇淋理解这种搭配",["最容易理解的方式之一，是选择纯牛奶口味或香草这类中性、柔和风味的意式手工冰淇淋，在表面加入几滴果香型特级初榨橄榄油，再配一点盐。","这种反差非常直接：冰凉、奶油般的口感，对上芳香与轻微苦感。因为做法足够简单，橄榄油本身的品质和风格反而更容易被感知。"]],["追求平衡，而不是“猎奇”",["特级初榨橄榄油用在甜点里不应该被当成噱头。它和咸味搭配遵循同一原则：使用量要足以让人识别出橄榄油，又不能让它盖过甜点基底。","因此，甜点搭配也是一种很好的消费者教育方式：让人理解特级初榨橄榄油并非只有一种“中性油味”，而是存在从细腻到强劲的一整套风格。"]],["LuxurEat（露意膳） 视角",["LuxurEat（露意膳） 精选的意大利特级初榨橄榄油不必只围绕沙拉和日常烹饪来呈现，也可以通过搭配内容帮助消费者理解每款油的芳香性格。把具体橄榄油与巧克力、柑橘蛋糕、意式手工冰淇淋或水果等食谱连接起来，就能把产品宣传转化为实用的风味教育。"]]],"sectionMedia":[],"asideSummary":"特级初榨橄榄油通常通过咸味料理被认识，但它的果香、苦味和芳香同样可以与巧克力、蛋糕和意式手工冰淇淋形成细腻的对比。关键在于选择合适的油，并控制使用量。","relatedSlugs":["evo-vs-common-cooking-oil","story-of-italian-evo","choose-use-store-evo"],"image":"assets/media/academy/evo-chocolate-dessert.webp","related":["zh-academy-evo-vs-common-cooking-oil","zh-academy-story-of-italian-evo","zh-academy-choose-use-store-evo"]});
})();
