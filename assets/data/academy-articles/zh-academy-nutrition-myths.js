(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-nutrition-myths"] = revive({"lang":"zh","slug":"nutrition-myths","topic":"nutrition","topicLabel":"营养与配料指南","artClass":"is-nutrition","eyebrow":"食品真相与误区","title":"营养信息：把事实、个人感受和宣传分开","meta":"营养与配料指南 · 2026","archive":"误区澄清","intro":"用份量、证据等级、适用人群和整体饮食审视营养信息，避免把个人体验或营销语言当成普遍事实。","opening":["营养内容常把复杂问题压缩成一个食材、一个数字或一句禁令。真实饮食却由份量、频率、替代关系、烹饪方式、生活习惯和个人健康状况共同构成。单一食品通常不能独立带来“排毒”“抗癌”或快速减重等结果。","负责任的文章应说明信息来自哪里、适用于谁、测量单位是什么，以及哪些结论仍然不确定。观察研究、临床试验、法规标准、产品检测和个人感受各有用途，不能互相替代。"],"sections":[["误区一：某种食物越多越好",["即使一种食物含有不饱和脂肪、蛋白质或其他有价值成分，过量仍可能让总能量、钠或糖超出需要。营养价值与适量并不冲突。","判断应看它替代了什么。如果橄榄油替代部分饱和脂肪来源，意义与在原有饮食上额外大量添加不同；坚果、乳制品和冷冻甜品也要结合份量。"]],["误区二：一项研究就是定论",["研究对象、样本量、干预时间、对照方式和结果指标都会影响结论。细胞或动物研究不能直接等同于人体日常食用效果，相关性也不自动证明因果。","网站引用研究时应避免只摘取最惊人的数字，并说明研究层级。产品层面的具体声称还需要符合检测与法规条件。"]],["误区三：个人有效就适合所有人",["口味、饱腹、消化和血糖反应可能因年龄、疾病、药物、过敏、活动量和饮食背景而不同。个人体验可以启发问题，却不能替代系统证据。","需要控制体重、血脂、血糖、肾功能或有食物过敏的人，应寻求合格专业人士的个体建议。社交媒体建议不应改变处方或治疗。"]],["建立三步核对法",["第一看来源：是否为卫生部门、法规、专业机构或完整研究；第二看单位和份量：每100克、每份和实际摄入是否一致；第三看边界：这是一般建议、产品数据还是医疗结论。","LuxurEat（露意膳）的营养与配料内容坚持把事实、解释和品牌立场分开。我们可以说明如何阅读和搭配，但不借单一食材制造恐惧，也不把普通食品包装成治疗方案。"]],["写作者与品牌的自检",["发布前应检查标题是否夸大正文、相对风险是否被写成绝对风险、研究对象是否被偷换成所有人，以及产品事实是否有标签或文件支持。必要时明确写出“不确定”或“以最终资料为准”。","更新法规、配方或证据后，旧文章也应修订。可信任不是永不出错，而是能说明依据、版本和修正过程。"]],["对社交媒体内容多问一句",["短视频和海报常省略剂量、对照组与适用条件。遇到惊人结论时，先寻找原始来源与发布日期，确认是否只是相关性、动物实验或品牌自有调查。无法核实时，不把它用于医疗或大幅改变饮食。"]]],"asideSummary":"营养判断需要来源、份量、替代关系和适用边界；个人感受与营销口号不能代替完整证据。","relatedSlugs":["olive-nutrition","olive-fasting","allergens-guide"],"image":"assets/media/academy/nutrition-cover-04.webp","column":"营养与配料指南","related":["zh-academy-olive-nutrition","zh-academy-olive-fasting","zh-academy-allergens-guide"],"sectionMedia":[]});
})();
