(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-modern-pinsa-romana"] = revive({"slug":"modern-pinsa-romana","lang":"zh","topic":"pizza","topicLabel":"披萨学院","column":"披萨学院","artClass":"is-pizza","eyebrow":"披萨学院","title":"经典披萨之外：认识现代罗马品萨","meta":"披萨学院 · 2026","archive":"学院 / 文化","imageFile":"modern-pinsa-romana.webp","intro":"更准确的理解方式，是把罗马品萨看成一种现代罗马烘焙创新，而不是一份从古罗马时代原封不动流传下来的古老配方。它的身份来自独特的面团思路、细长形状，以及介于熟悉披萨印象与现代烘焙技术之间的质地。","opening":[],"sections":[["现代罗马创新",["现代商业形态的罗马品萨大约在 21 世纪初出现。这样介绍它，比依赖“直接延续古罗马配方”这类夸大说法更准确，也更有意思。","它的成功说明，意大利饮食文化依然能够创造新形式，同时继续借助熟悉的核心原则：发酵、面粉、水合度、谨慎烘烤和克制配料。"]],["独特的面团概念",["品萨风格面团通常与混合粉、高水合度和较长发酵联系在一起；混合粉中可能包括小麦粉、米粉和大豆粉。具体配方则会因生产者和产品而不同。","这些选择的目标，是形成轻盈、开放的内部组织以及薄而酥脆的外层。与其承诺品萨一定“更容易消化”，不如直接描述这种可感知的质地——因为个体消化情况不同，各产品配方也并不完全一致。"]],["形状也是身份的一部分",["品萨通常会拉伸成细长或椭圆形，而不是经典的圆形披萨。视觉差异让消费者很容易辨认，也支持不同的出餐方式：可以在烘烤前或烘烤后加配料，可以切块分享，也可以同时承载经典和现代风格食材。","品萨这一名称常被解释为与拉丁语中“按压、拉伸”的含义有关，但它今天最有力的身份仍然来自现代产品本身，而不是所谓古代连续性的叙事。"]],["创新，但不丢失意大利逻辑",["品萨之所以成立，是因为创新本身仍然清晰可理解：面团有明确质地，配料可以保持克制，产品仍然依赖意大利料理常见的一项原则——让少数几种食材拥有足够空间被真正品尝出来。","因此，品萨也是一个很适合学院内容的案例：意大利传统并不是被冻结在过去，它同样可以成为新产品的框架，只要创新仍尊重技术与原料平衡。"]],["LuxurEat（露意膳） 视角",["品萨对 LuxurEat（露意膳） 尤其有价值，因为它可以直接连接专业混合面粉，以及家庭和酒店、餐厅与咖啡馆等餐饮渠道餐饮场景中的具体应用。最有力的传播重点不是“古罗马神奇面团”，而是一种具有明确质地、形状和制作逻辑的现代意大利形式。"]]],"sectionMedia":[],"asideSummary":"更准确的理解方式，是把罗马品萨看成一种现代罗马烘焙创新，而不是一份从古罗马时代原封不动流传下来的古老配方。它的身份来自独特的面团思路、细长形状，以及介于熟悉披萨印象与现代烘焙技术之间的质地。","relatedSlugs":["neapolitan-roman-pizza-styles","story-of-italian-pizza","pizza-pinsa-at-home"],"image":"assets/media/academy/modern-pinsa-romana.webp","related":["zh-academy-neapolitan-roman-pizza-styles","zh-academy-story-of-italian-pizza","zh-academy-pizza-pinsa-at-home"]});
})();
