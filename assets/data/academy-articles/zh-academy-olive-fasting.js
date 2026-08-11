(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-olive-fasting"] = revive({"lang":"zh","slug":"olive-fasting","topic":"olive","topicLabel":"橄榄油学院","artClass":"is-olive","eyebrow":"营养与误区","title":"空腹喝橄榄油：营养价值、正确方法与常见误区","meta":"橄榄油学院 · 2026","archive":"理性饮食","intro":"从能量、耐受性与饮食结构解释空腹喝橄榄油，区分个人习惯、营养事实和未经证实的功效。","opening":["空腹喝橄榄油在网络上常被描述为排毒、护胃或快速减重方法，但单一食材不能承担这些复杂结果。橄榄油仍是高能量油脂，空腹摄入不会把它变成药物，也不会自动优于把适量油用于蔬菜、豆类和正餐。","有些人能接受直接饮用，有些人会出现恶心、反酸、腹部不适或排便变化。个体感受可以被记录，却不能直接推导普遍健康结论；持续症状或有基础疾病时，应咨询合格医疗专业人员。"],"sections":[["营养价值不会因空腹放大",["橄榄油以不饱和脂肪为主，这一组成不会因为饮用时间发生神奇变化。更重要的是它在全天饮食中替代了什么、用了多少，以及整体是否包含足够蔬菜、水果、全谷物、豆类和适量蛋白质。","若直接喝油只是额外增加，而正餐中的黄油、肥肉和油炸食物不变，总能量会随之上升。把油用于改善健康食物的可口性，往往比单独吞服更有实际意义。"]],["为什么有人感觉不同",["油脂进入消化道会影响胃排空和胆囊收缩，个人耐受差异较大。短期的饱腹、润滑感或排便变化不等于“排出毒素”，也不能证明长期效果。","饮用量、是否同时喝咖啡、睡眠、前一餐内容和心理预期都可能影响体验。若要观察，应保持份量小且记录变量，不要快速增加用量。"]],["哪些情况需要谨慎",["有胆囊、胰腺、胃食管反流或其他消化系统问题，正在服药，处于孕期或需要严格控制能量的人，不应仅依靠网络文章决定做法。儿童和老年人的需求也不同。","出现持续疼痛、呕吐、严重腹泻或其他异常时，应停止尝试并寻求医疗帮助。本文只提供一般饮食信息，不提供诊断或治疗。"]],["更稳妥的日常方式",["把少量特级初榨橄榄油用于番茄、绿叶菜、豆汤、全谷物、鱼类或烤蔬菜，既能观察风味，也能明确份量与搭配。用量勺比凭感觉直接倒入口中更容易管理。","如果喜欢清晨食用，可以把它放进早餐或正餐，而不必赋予空腹时点特殊功效。LuxurEat（露意膳）建议把橄榄油视为优质食材，在多样、平衡和适量的饮食中使用。"]],["如何识别夸大内容",["如果一段内容承诺短期排毒、清除血管、治疗便秘或无需调整其他饮食就减重，应先检查是否提供可靠研究、适用人群和风险说明。普通食材的营养作用不能替代诊疗。","更可信的建议通常语气克制，会讨论份量、替代、个人差异和不确定性。它可能没有戏剧性，却更接近日常可执行的健康选择。"]],["结论",["是否空腹饮用可以是个人习惯，却不是衡量橄榄油价值的标准。更稳妥的长期做法，是把合理份量分散到多样餐食中，并根据体重、活动量与身体反应调整。"]]],"asideSummary":"空腹不会放大橄榄油的营养价值；份量、替代关系、个人耐受与整体饮食比饮用时点更重要。","relatedSlugs":["olive-nutrition","olive-myths","olive-tasting"],"image":"assets/media/academy/olive-cover-08.webp","column":"橄榄油学院","related":["zh-academy-olive-nutrition","zh-academy-olive-myths","zh-academy-olive-tasting"],"sectionMedia":[]});
})();
