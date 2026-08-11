(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-olive-how-to-choose"] = revive({"lang":"zh","slug":"olive-how-to-choose","topic":"olive","topicLabel":"橄榄油学院","artClass":"is-olive","eyebrow":"如何选择优质橄榄油","title":"买橄榄油时，先看这些信息","meta":"橄榄油学院 · 2026","archive":"购买指南","intro":"把等级、产地、日期、包装与用途放进同一张检查清单，减少只看价格和营销词的误判。","opening":["买橄榄油时，最醒目的词往往不是最重要的信息。先确认完整法定名称，再看原产、日期、规格、储存方式和责任主体，可以排除许多概念混淆。随后再根据生食、烹饪、餐饮用量或礼赠需求选择风味和容量。","价格能反映果实、采收、加工、产量、包装和流通成本的一部分，却不能单独证明品质。低价不必然等于不合格，高价也不能替代理化与感官证据。可追溯、保存良好并适合实际用途，才是更可靠的组合。"],"sections":[["第一行先看等级",["“特级初榨橄榄油”“初榨橄榄油”“橄榄油”等名称对应不同类别，不能只看到“橄榄”二字就视为同一种产品。混合、风味浸渍或复合调味产品也应按其实际名称理解。","酸度若被突出标示，应与其他规定指标一起阅读。消费者无法用味觉直接尝出酸度，单一的低数字也不能说明产地、香气、储存和全部品质。"]],["原产与日期要具体",["查看橄榄采收地、压榨或装瓶地及生产者信息，区分明确产区与宽泛来源。地理标志能说明遵循相应规范，但仍要看年份和批次。若标有采收季，通常比只看灌装日期更有助于理解新鲜度。","保质期是在标示储存条件下的品质期限，不等于开瓶后始终保持最佳香气。购买前观察货架是否暴晒或靠近热源，到家后也要延续避光、密封和适温保存。"]],["包装与容量服务于使用",["深色玻璃和金属容器能减少光照，袋盒等阻氧设计也可能有帮助；透明瓶若长期受光，风险更高。包装外观不是等级，但会影响油品在流通和使用中的保护。","家庭应按消耗速度选择容量，餐饮大包装则要考虑开封频率、分装卫生与后厨温度。买得便宜却用得太慢，最终风味损失可能抵消容量优势。"]],["到家后的快速复核",["开瓶后先单独闻香和小口品尝，再用于食物。记录果香是否清晰、是否有平衡的苦辣、是否出现陈旧或霉湿气息。如怀疑产品问题，应保留包装、批次和购买凭证，并联系销售方。","LuxurEat（露意膳）的选品说明会尽量提供可验证资料与明确用途，同时避免把“天然”“手工”或奖项当作万能背书。最好的选择，是信息清楚、状态新鲜、风格适合并能在合理时间内用完的那一瓶。"]],["线上购买还要核对这些",["查看商品页是否展示完整中文标签、规格、储存与责任主体，而不是只有正面效果图。收到产品后核对实物与页面是否一致，并观察包装是否渗漏、凹损或经历异常高温。","对于进口食品，运输和仓储是品质链的一部分。可追溯的批次与清楚售后，比无法核实的“庄园同款”“大师推荐”等描述更能支持长期选择。"]]],"asideSummary":"先确认法定等级和来源，再比较日期、包装、容量与用途；价格和宣传词只能作为辅助信息。","relatedSlugs":["olive-storage","olive-oil-basics","olive-myths"],"image":"assets/media/academy/olive-cover-06.webp","column":"橄榄油学院","related":["zh-academy-olive-storage","zh-academy-olive-oil-basics","zh-academy-olive-myths"],"sectionMedia":[]});
})();
