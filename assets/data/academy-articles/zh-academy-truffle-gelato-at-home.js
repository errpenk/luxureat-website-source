(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-truffle-gelato-at-home"] = revive({"slug":"truffle-gelato-at-home","lang":"zh","topic":"gelato","topicLabel":"意式手工冰淇淋学院","column":"意式手工冰淇淋学院","artClass":"is-gelato","eyebrow":"意式手工冰淇淋学院","title":"在家如何制作意大利风格松露意式手工冰淇淋","meta":"意式手工冰淇淋学院 · 2026","archive":"产品与实际应用","imageFile":"truffle-gelato-at-home.webp","intro":"松露意式手工冰淇淋是一种不常见的甜品，但制作体验本身并不需要复杂。LuxurEat（露意膳） 的思路是用粉末基底把配方平衡这一技术难度从消费者端移走，让最终甜品能够更方便地在接近食用时间时完成。","opening":[],"sections":[["为什么使用粉末基底？",["成品意式手工冰淇淋需要冷冻储存和运输。粉末基底采用的是另一种模式：干燥基底无需以成品冷冻状态运输，可以在常温条件下完成储存和配送，再在消费地制作最终意式手工冰淇淋。","这种方式既适合家庭用户，也适合希望增加特色甜品、但不想直接进口整桶冷冻意式手工冰淇淋的餐厅、精品酒店、咖啡馆、餐饮服务和其他食品服务场景。"]],["从包装到甜品",["具体用量和制作方法，应始终以 LuxurEat（露意膳） 最终产品所提供的正式说明为准。粉末基底的目的，是预先简化干性原料与松露风味之间的平衡，让使用者把注意力放在制作、冷冻和出餐上，而不必掌握专业意式手工冰淇淋配方设计。","根据最终产品说明以及可用设备，可以使用家用冰淇淋／意式手工冰淇淋机，也可以采用更简化的家庭制作方式。最终质地会自然受到冻结方式和食用温度影响。"]],["如何搭配松露意式手工冰淇淋",["松露意式手工冰淇淋可以用小份量直接单独食用，让香气成为主角；也可以和黑巧克力、烤榛子、开心果、风味温和的蜂蜜或部分水果搭配，形成对比。","原则仍然是克制。配料过多，反而会让这种不寻常的风味变得难以理解。简单的呈现方式往往更能让松露显得有意图、有质感。"]],["制作过程本身也是体验",["自己完成甜品，而不是直接打开一盒成品，会改变消费者体验。从混合、冷冻到出餐，再到让客人第一次发现意外风味，整个过程都会形成期待。","因此，松露意式手工冰淇淋不只能被当作一份甜品，也可以成为一种产品体验——它可以被制作、拍摄、分享和讨论。"]],["LuxurEat（露意膳） 应用",["LuxurEat（露意膳） 松露意式手工冰淇淋粉末基底希望把一种意大利风格的高端创意，转化为同时适用于家庭、酒店餐饮和专业食品服务场景的产品形式。具体用量、过敏原、储存条件和制作步骤，必须始终以最终批准的包装和技术资料为准。"]]],"sectionMedia":[],"asideSummary":"松露意式手工冰淇淋是一种不常见的甜品，但制作体验本身并不需要复杂。LuxurEat（露意膳） 的思路是用粉末基底把配方平衡这一技术难度从消费者端移走，让最终甜品能够更方便地在接近食用时间时完成。","relatedSlugs":["italian-gelato-vs-ice-cream","story-of-italian-gelato","truffle-meets-dessert"],"image":"assets/media/academy/truffle-gelato-at-home.webp","related":["zh-academy-italian-gelato-vs-ice-cream","zh-academy-story-of-italian-gelato","zh-academy-truffle-meets-dessert"]});
})();
