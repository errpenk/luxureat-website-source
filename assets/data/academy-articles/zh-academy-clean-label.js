(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-clean-label"] = revive({"lang":"zh","slug":"clean-label","topic":"nutrition","topicLabel":"营养与配料指南","artClass":"is-nutrition","eyebrow":"无添加标签","title":"无添加标签：先问清楚没有添加什么","meta":"营养与配料指南 · 2026","archive":"配料与声明","intro":"“无添加”只有在对象、范围和证据明确时才有意义，它不自动等于更天然、更安全或营养更好。","opening":["“无添加”容易让人产生完整、绝对的印象，但食品配方和标签需要更精确的问题：没有添加哪一种成分，是配方中未使用，还是最终产品未检出；这一说法是否符合适用法规；同类产品本来是否就不需要该成分。","一款食品是否值得选择，仍要看食品名称、完整配料、营养、致敏物质、生产卫生、储存和可追溯信息。减少不必要成分可以是清晰的产品原则，却不能替代安全控制，也不能把合法且具有技术作用的食品添加剂一概描述为有害。"],"sections":[["把声明写完整",["比起只写“无添加”，更负责任的表达会指出具体对象和适用范围，并能由配方、供应商文件和生产记录支持。若产品从未需要该成分，用醒目声明制造特殊优势，也可能造成误导。","“无防腐剂”“无人工色素”“无蔗糖”等表述涉及不同定义，不能相互替代。是否可以使用、如何标示和是否需要说明其他糖来源，应按产品和市场逐项审核。"]],["添加剂有明确功能",["食品添加剂可能用于安全、抗氧化、酸度、乳化、稳定、膨松、着色或其他工艺目的，并受到品种、使用范围和用量规则约束。配料表可帮助消费者识别实际使用情况。","删除一种稳定剂或乳化剂可能改变质地、融化、保质和冷链要求。若要简化配方，必须通过研发和验证重新建立安全与品质，而不是仅在文案中删掉名称。"]],["天然来源也要评估",["天然成分同样可能含致敏物质、糖、盐或天然毒素，来源天然不代表适合所有人。香料、浓缩汁、蜂蜜和植物提取物也需要准确标示和合理使用。","消费者可结合饮食目标选择配料更简洁的产品，但不必把配料数量当作唯一评分。功能清楚、用量合规、来源可追溯，往往比单纯追求短名单更重要。"]],["LuxurEat（露意膳）的信息原则",["产品上线前应完成配料、营养、过敏原、规格、保存和使用文件，再决定哪些声明能够被证据支持。尚未定稿的意式手工冰淇淋粉末基底不会提前承诺“无添加”或其他营养属性。","网站会把品牌原则与产品事实分开：前者说明我们重视透明、可靠和可追溯，后者必须由每款产品的最终标签和技术资料证明。这样，“无添加”才不是空泛的健康光环。"]],["消费者可以如何提问",["看到无添加声明时，可以询问具体未添加的对象、同类产品是否通常使用、产品通过什么方式保持稳定，以及信息能否在配料和文件中核对。清楚回答比模糊的天然故事更有价值。","如果个人目标是减少糖、钠或特定成分，应直接查看营养和配料，而不是假设“无添加”自动满足这些目标。"]]],"asideSummary":"无添加需要明确对象、范围和证据；完整配料、安全控制与可追溯信息比一个笼统标签更重要。","relatedSlugs":["nutrition-labels","allergens-guide","ugolini-gelato-mix"],"image":"assets/media/academy/nutrition-cover-03.webp","column":"营养与配料指南","related":["zh-academy-nutrition-labels","zh-academy-allergens-guide","zh-academy-ugolini-gelato-mix"],"sectionMedia":[]});
})();
