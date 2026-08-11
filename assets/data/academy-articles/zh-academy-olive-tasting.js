(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-olive-tasting"] = revive({"lang":"zh","slug":"olive-tasting","topic":"olive","topicLabel":"橄榄油学院","artClass":"is-olive","eyebrow":"橄榄油学院","title":"如何品鉴、保存和使用橄榄油","meta":"橄榄油学院 · 2026","archive":"品鉴与日常","intro":"用可重复的闻香、入口与记录方法品鉴橄榄油，并把保存和烹饪纳入同一套判断。","opening":["橄榄油品鉴的目的不是表演专业术语，而是把闻到、尝到和使用后的感受分开记录。专业感官评价有严格的杯具、温度与评审流程；家庭和餐饮场景虽然不等同于官方分级，也可以通过统一步骤减少包装、颜色和价格带来的先入为主。","颜色并不是特级初榨橄榄油等级的决定因素。叶绿素、类胡萝卜素、品种与成熟度都会影响色泽，因此专业品鉴常使用有色杯遮挡颜色。普通品鉴时不必追求器材，重要的是杯子干净、环境无强烈气味，并让不同样品处于相近条件。"],"sections":[["第一步：闻香",["倒入少量油，用手掌轻轻包住杯底，让油温缓慢接近体温附近，再覆盖杯口短暂聚香。先记录香气是否清晰，然后描述联想到的青草、番茄叶、香草、苹果、杏仁或成熟水果。描述是感官联想，不代表油中真的加入了这些成分。","若出现明显哈败、霉湿、酒醋或陈旧气息，应保持谨慎。单次闻香可能受杯具和环境影响，可以休息后复核；正式等级仍需由合格实验室和受训感官小组判断。"]],["第二步：入口与回味",["小口含住油，让其覆盖口腔，再轻轻吸入少量空气帮助香气上行。记录果香是否延续、苦味出现的位置、质地是轻盈还是圆润，以及吞咽后喉部辛辣感和余味长度。苦与辣可以是积极特征，关键在于是否干净、协调。","连续品鉴多款时，用水和气味温和的食物清洁口腔，并控制样品数量。不要用面包蘸取来做第一轮判断，因为面包本身的香气、盐和质地会改变感受；完成单独品鉴后，再进入搭配测试。"]],["第三步：建立使用记录",["同一款油可分别尝试在番茄、绿叶菜、豆类、烤面包、鱼类和汤品上少量使用。记录它是增强食材、提供苦辣结构，还是掩盖了原味。餐饮团队可把结果转化为冷菜、烹饪和出餐点缀三类使用建议。","品鉴词不需要越多越好。采用香气、强度、平衡、缺陷、余味和适配菜肴几个固定维度，更容易在不同批次之间比较，也能避免把个人偏好误写成绝对品质结论。"]],["保存决定下一次品鉴",["光、热、氧和时间会持续改变油品。把瓶子密封，远离灶台、窗边和温度波动大的位置；不要长期分装在敞口油壶或透明容器里。购买大包装时，应评估实际消耗速度，分装也要使用洁净、避光且密封的容器。","开瓶日期比记忆更可靠。若香气逐渐变平、出现蜡笔或旧坚果般的陈味，即使仍在标示期限内，也说明感官状态已经变化。产品安全和保质期以标签为准，风味最佳期则需要结合开封与储存情况判断。"]]],"asideSummary":"先闻香、再入口、后搭配，并把开瓶日期与储存条件记录下来，才能让品鉴真正服务于购买和烹饪。","relatedSlugs":["olive-oil-basics","olive-regions"],"image":"assets/media/academy/olive-cover-03.webp","column":"橄榄油学院","related":["zh-academy-olive-oil-basics","zh-academy-olive-regions","zh-academy-olive-nutrition"],"sectionMedia":[]});
})();
