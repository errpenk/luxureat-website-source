(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-gelato-history"] = revive({"lang":"zh","slug":"gelato-history","topic":"gelato","topicLabel":"意式手工冰淇淋学院","artClass":"is-gelato","eyebrow":"意式手工冰淇淋学院","title":"意式手工冰淇淋：从城市传统到现代工艺","meta":"意式手工冰淇淋学院 · 2026","archive":"历史与工艺","intro":"从意大利冷冻甜品传统、城市门店到现代设备，理解意式手工冰淇淋如何成为日常文化与专业工艺。","opening":["冷冻甜品的历史并非由某一天、某一个人突然发明。冰雪保存、糖浆、乳制品和制冷技术在欧洲及更广阔地区长期演变，意大利城市的宫廷厨房、咖啡馆和手工门店逐步发展出今天熟悉的冷冻甜品文化。","现代意式手工冰淇淋既继承地方风味，也依赖食品科学与设备。巴氏处理、熟化、动态冷冻、硬化或展示、清洁消毒和冷链都决定产品能否安全、细腻且稳定。传统与技术不是对立面，可靠工艺让原料表达可以重复。"],"sections":[["从稀缺冰雪到机械制冷",["早期冷冻甜品受季节冰雪和储冰条件限制，制作与消费并不普及。糖、盐与冰的使用帮助降低温度，但真正改变行业规模的是机械制冷、卫生控制和可重复的冷冻设备。","当制作不再完全依赖自然冰，门店可以更稳定地生产和展示，配方也能针对冰晶、空气与融化进行精细调整。今天对“手工”的理解，应包含对温度和流程的专业控制。"]],["城市中的日常仪式",["意大利的冰淇淋店与街道、广场、晚间散步和家庭聚会相连。消费者在柜台选择口味、杯或甜筒，并在短时间内享用，这种服务节奏塑造了柔软度、展示方式和口味轮换。","地方文化也进入口味：西西里的柑橘与坚果、北部的乳制品和山地风味、各地咖啡与巧克力传统，都能成为灵感。但具体产品仍取决于当季原料和门店配方。"]],["现代工艺的关键节点",["乳基配方通常经历混合、加热处理、冷却熟化与动态冷冻；水果雪葩的流程和配方重点不同。每一步都影响水分、脂肪、蛋白质、糖和固形物之间的平衡。","温度波动会促进冰晶变大，降低细腻度，因此从生产到展示和运输都要保持稳定。设备无法弥补失衡配方，配方也不能弥补卫生和冷链缺失。"]],["传统如何走向中国餐桌",["跨市场表达首先要翻译清楚名称、口味、配料和过敏原，再考虑甜度、份量与消费场景。尊重中国消费者不等于随意改变工艺，也不等于把意大利口味固定成少数符号。","LuxurEat（露意膳）会从原料产地、基础配方、操作建议与专业供应入手，让家庭、店铺和食品业客户理解每种选择的理由。历史提供文化坐标，最终体验仍由真实原料与稳定制作完成。"]],["一间现代门店的专业性",["门店除了展示口味，还要管理原料验收、批次、巴氏处理记录、设备清洁、展示温度与当天周转。口味牌应能对应配料和过敏原信息，员工也要知道如何回答消费者问题。","当“手工”能够被流程和记录支持，它才不只是视觉印象。LuxurEat（露意膳）关注的正是文化与执行之间的连接：让传统风味通过现代质量管理被稳定呈现。"]]],"asideSummary":"意式手工冰淇淋从冷冻甜品传统走向现代门店，制冷、卫生、配方和城市生活共同塑造了今天的样貌。","relatedSlugs":["gelato-vs-ice-cream","ugolini-gelato-mix"],"image":"assets/media/academy/gelato-cover-02.webp","column":"意式手工冰淇淋学院","related":["zh-academy-gelato-vs-ice-cream","zh-academy-ugolini-gelato-mix","zh-academy-gelato-flavours"],"sectionMedia":[]});
})();
