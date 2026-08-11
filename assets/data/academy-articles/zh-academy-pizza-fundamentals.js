(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-pizza-fundamentals"] = revive({"lang":"zh","slug":"pizza-fundamentals","topic":"pizza","topicLabel":"披萨学院","artClass":"is-pizza","eyebrow":"披萨基础课","title":"一张意式披萨，从面团开始","meta":"披萨学院 · 2026","archive":"面团与烘烤","intro":"从面粉、含水、发酵、整形到炉温，理解一张意式披萨如何获得轻盈饼边、柔韧中心与清晰配料。","opening":["意式披萨的基础不是堆满配料，而是让面团、酱汁、乳酪与烘烤在短时间内完成平衡。以那不勒斯披萨为例，行业规范会对原料、面团制作、发酵、手工整形与烘烤提出明确要求；其他意大利流派则可能采用不同厚度、含水量和炉具。","因此，所谓“正宗”不应只靠圆形、焦斑或高温几个视觉符号判断。面粉强度是否适合发酵时间，面团温度是否可控，酱汁含水量与配料重量是否匹配，才决定入口时是轻盈有弹性，还是湿软、干硬或难以消化。"],"sections":[["面粉、含水与盐",["面粉需要具备与目标发酵时长相匹配的吸水和面筋能力。并非蛋白质越高越好：过强可能让面团难以拉伸，过弱则可能支撑不足。含水量同样没有万能数字，它受面粉、设备、环境湿度、操作经验和成品风格共同影响。","盐不仅提供味道，也影响面筋和发酵节奏。水温则帮助控制和面后的面团温度。家庭制作应先固定面粉、室温和配方，再一次只调整一个变量；餐饮端还应记录批次和实际出缸温度。"]],["耐心精筛发酵状态",["发酵时间本身不是品质勋章。酵母用量、面团温度、室温或冷藏条件要一起看。发酵不足时面团紧、香气单薄；过度发酵则可能结构变弱、酸味或酒精气息突出，并在整形时难以保留气体。","判断应结合体积、表面状态、延展性和气味，而不是只看计时器。分割滚圆后，面团还需要足够松弛，才能在不使用擀面杖强压饼边的情况下从中心向外手工展开。"]],["酱汁、乳酪与配料",["番茄酱的水分、酸甜和用量会影响中心是否湿软；乳酪的含水量和切法会影响融化与出水。罗勒与橄榄油可在烘烤前后承担不同香气角色，具体顺序取决于炉温与菜谱。","每增加一种配料，都要重新考虑重量、含水和熟成时间。薄片蔬菜、腌制肉类或预熟食材的处理不同，不能靠延长烘烤弥补过重配料，否则饼边可能先干或烧焦。过敏原信息也应随面粉、乳制品和加工肉制品逐项确认。"]],["高温烘烤与成品判断",["高温让面团中的水迅速转化为蒸汽，推动饼边膨胀并形成烘烤香气。家庭烤箱温度较低时，可借助预热充分的烤石或烤钢改善底部传热，但时间和结果不会完全复制专业炉。","好的焦斑带来香气，不应成为大面积苦味或生面团的掩饰。切开后观察底部是否熟成、中心能否承托配料、饼边是否轻盈而有弹性。LuxurEat（露意膳）把专业面粉、稳定原料和可执行工艺放在一起，帮助用户理解意大利披萨久负盛名的理由。"]]],"asideSummary":"披萨的核心是变量配合：面粉、含水、发酵、配料水分和炉温共同决定结构，而非单一的长发酵或高温标签。","relatedSlugs":["cooking-techniques","olive-recipes-guide","italian-food-culture"],"image":"assets/media/academy/pizza-cover-01.webp","column":"披萨学院","related":["zh-academy-cooking-techniques","zh-academy-olive-recipes-guide","zh-academy-italian-food-culture"],"sectionMedia":[]});
})();
