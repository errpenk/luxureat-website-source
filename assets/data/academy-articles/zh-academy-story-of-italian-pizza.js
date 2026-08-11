(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-story-of-italian-pizza"] = revive({"slug":"story-of-italian-pizza","lang":"zh","topic":"pizza","topicLabel":"披萨学院","column":"披萨学院","artClass":"is-pizza","eyebrow":"披萨学院","title":"意大利披萨的故事：从那不勒斯走向世界","meta":"披萨学院 · 2026","archive":"学院 / 文化","imageFile":"story-of-italian-pizza.webp","intro":"披萨如今是全球最容易识别的食物之一，但现代披萨的身份根植于那不勒斯，以及 18、19 世纪的城市日常饮食文化。它后来才通过移民、地方化改造和简洁灵活的形式，成为全球性食物。","opening":[],"sections":[["从那不勒斯的平民食物开始",["在现代披萨出现之前很久，地中海各地就存在加配料的扁面包。那不勒斯真正发生的变化，是发酵面团、番茄以及其他易获得配料的组合，逐渐形成一种价格亲民的城市食物。","番茄在欧洲接触美洲之后被引入，随后逐渐被意大利南部烹饪接受，并最终成为与那不勒斯披萨联系最紧密的食材之一。"]],["玛格丽特披萨的故事",["一个广为流传的传统说法，把玛格丽特披萨与披萨师拉斐尔·埃斯波西托以及 1889 年玛格丽特王后的王室访问联系起来：番茄、马苏里拉奶酪和罗勒象征意大利国旗的三种颜色。","历史学者至今仍讨论这一故事的每一个细节应该被多大程度按字面理解，但玛格丽特披萨最终确实成为一个持久符号：一张简单的披萨，却获得了强烈的意大利国家形象和全球认知。"]],["移民让披萨走向全球",["意大利移民把披萨传统带到美国、南美和其他地区。当地烤炉、原料和口味进一步产生了新的风格；与此同时，意大利国内的披萨也继续保持地域发展，从罗马形式到西西里西西里厚披萨，再到许多地方变体。","于是形成一个很有意思的悖论：披萨在全球范围内极具适应性，但真正有生命力的风格往往仍然拥有明确身份，而不是把各种配料随机堆在一起。"]],["保护工艺与传统",["那不勒斯披萨于 2010 年进入欧盟“传统特色保证”（传统特色保证）名录。2017 年，联合国教科文组织又单独将“那不勒斯披萨师的技艺”认定为非物质文化遗产。","这些认可说明，披萨既可以是日常食物，也可以是严肃的烹饪文化遗产。它的价值并不来自复杂，而来自面团、发酵、温度和原料平衡背后长期积累的知识。"]],["LuxurEat（露意膳） 视角",["LuxurEat（露意膳） 可以把披萨作为进入意大利饮食文化的一扇门：先解释风格，再介绍帮助实现这种风格的面粉、特级初榨橄榄油、番茄或配料。产品成为故事的实际应用，而不是让故事沦为销售产品的借口。"]]],"sectionMedia":[],"asideSummary":"披萨如今是全球最容易识别的食物之一，但现代披萨的身份根植于那不勒斯，以及 18、19 世纪的城市日常饮食文化。它后来才通过移民、地方化改造和简洁灵活的形式，成为全球性食物。","relatedSlugs":["neapolitan-roman-pizza-styles","modern-pinsa-romana","pizza-pinsa-at-home"],"image":"assets/media/academy/story-of-italian-pizza.webp","related":["zh-academy-neapolitan-roman-pizza-styles","zh-academy-modern-pinsa-romana","zh-academy-pizza-pinsa-at-home"]});
})();
