(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-pizza-pinsa-at-home"] = revive({"slug":"pizza-pinsa-at-home","lang":"zh","topic":"pizza","topicLabel":"披萨学院","column":"披萨学院","artClass":"is-pizza","eyebrow":"披萨学院","title":"在家如何制作意大利风格披萨与品萨","meta":"披萨学院 · 2026","archive":"产品与实际应用","imageFile":"pizza-pinsa-at-home.webp","intro":"家用烤箱无法复制专业披萨店的全部条件，但只要让面团、热量和配料与目标风格匹配，家庭用户仍然可以明显接近意大利风格的成品。","opening":[],"sections":[["先确定风格，再决定面团",["那不勒斯风格披萨追求柔软中心和蓬松外圈；酥脆的罗马风格披萨或品萨则追求不同质地。相比一个万能面团公式，为特定用途设计的面粉或混合粉，往往能为家庭制作提供更合适的起点。"]],["尽可能发挥家用烤箱的能力",["充分预热。披萨石或披萨钢需要时间储存热量，在最后阶段短时间开启上火／烧烤功能，也有助于顶部上色。家用烤箱温度通常低于专业那不勒斯披萨炉，因此应根据实际设备调整面团和烘烤时间。"]],["做品萨：先讲质地，不先讲功能",["品萨风格面团常采用高水合度、更长发酵时间，以及可能包含小麦、米和大豆的混合粉，目标是形成酥脆外层与轻盈、开放的内部组织。与其承诺产品一定“更易消化”，不如直接描述消费者能够真实感受到的质地。"]],["配料：少即是多",["经典玛格丽特披萨很清楚地体现了这一逻辑：番茄、马苏里拉奶酪、罗勒和特级初榨橄榄油。两三种选择得当的配料，通常比把披萨堆得很满更容易得到清晰的意大利风格。"]],["LuxurEat（露意膳） 应用",["LuxurEat（露意膳） 可以通过意大利风格混合面粉，以及针对特定披萨或品萨应用的配套食材来支持这一体验。每个产品页都应明确说明对应风格、过敏原以及最终批准的制作方法。"]]],"sectionMedia":[],"asideSummary":"家用烤箱无法复制专业披萨店的全部条件，但只要让面团、热量和配料与目标风格匹配，家庭用户仍然可以明显接近意大利风格的成品。","relatedSlugs":["neapolitan-roman-pizza-styles","story-of-italian-pizza","modern-pinsa-romana"],"image":"assets/media/academy/pizza-pinsa-at-home.webp","related":["zh-academy-neapolitan-roman-pizza-styles","zh-academy-story-of-italian-pizza","zh-academy-modern-pinsa-romana"]});
})();
