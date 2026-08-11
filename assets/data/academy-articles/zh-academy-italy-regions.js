(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-italy-regions"] = revive({"lang":"zh","slug":"italy-regions","topic":"culture","topicLabel":"探索意大利","artClass":"is-culture","eyebrow":"产区地图","title":"意大利二十个大区：一张餐桌地图","meta":"探索意大利 · 2026","archive":"二十个大区","intro":"从阿尔卑斯山到地中海岛屿，用二十个大区建立餐桌坐标，而不是用简单的南北二分概括意大利。","opening":["意大利共有二十个大区，但行政边界只是理解饮食的第一层。山谷、河流、平原、海岸、岛屿与城市市场会在一个大区内部继续制造差异，历史上的交通与贸易也让香料、稻米、玉米、番茄和不同制面方法逐渐进入地方生活。","因此，一张餐桌地图不应把地区排成高低，而应显示食材如何随环境变化。它帮助读者理解为什么有些地方依赖乳制品和稻米，有些地方重视橄榄油、豆类和硬质小麦，也帮助我们辨认产品标签中的产地信息。"],"sections":[["西北：山地、平原与城市传统",["瓦莱达奥斯塔、皮埃蒙特、伦巴第和利古里亚横跨阿尔卑斯山、波河平原与狭长海岸。乳制品、稻米、玉米、榛子、葡萄与海岸香草在这里形成多种组合，不能只用“北方偏浓郁”来概括。","皮埃蒙特的丘陵、伦巴第的稻作区与利古里亚的海岸环境指向完全不同的风味路径。阅读产品时，应继续确认具体省份、品种、生产方式与季节。"]],["东北：高山、潟湖与边境交流",["特伦蒂诺—上阿迪杰、威尼托、弗留利—威尼斯朱利亚和艾米利亚—罗马涅连接高山、亚得里亚海和重要平原。奶酪、腌制肉类、玉米、米饭、鲜面与海鲜共同出现，反映地理与历史交流。","即使相邻地区，也可能在面食形态、脂肪选择和调味方式上不同。把菜名放回具体城市与家庭，比套用统一的北方模板更准确。"]],["中部：丘陵、牧区与城市餐桌",["托斯卡纳、翁布里亚、马尔凯和拉齐奥以丘陵、谷地、牧区和海岸交织。面包、豆类、橄榄油、羊奶制品、手工面食与烤制方法，经常随地方物产组合。","中部并非只有所谓乡村菜。佛罗伦萨、罗马等城市也不断吸收周边供应与社会变化，使街头小食、家庭菜和正式餐饮保持各自节奏。"]],["南部：日照、火山土与硬质小麦",["阿布鲁佐、莫利塞、坎帕尼亚、普利亚、巴西利卡塔和卡拉布里亚拥有山地、长海岸、火山环境与广阔农区。番茄、蔬菜、豆类、硬质小麦、乳酪、鱼类与橄榄油构成多样基础。","披萨与干意面虽然享誉世界，却仍只是南部饮食的一部分。不同地方对辣椒、香草、奶酪、海鲜和保存食品的使用，体现的是可得性与生活经验。"]],["岛屿：独立而开放的风味系统",["西西里和撒丁岛都拥有强烈的地方认同，却不能被合并为一种岛屿风味。西西里的历史交流、柑橘与多样甜点，撒丁岛的牧业、谷物与海陆资源，各自形成复杂传统。","使用这张地图时，应把大区看成下一步查证的入口。具体产品仍要核对标签、地理标志、生产者资料和适用法规；大区名称本身既不是品质保证，也不能替代感官判断。"]]],"asideSummary":"以二十个大区为入口，理解山地、平原、海岸、岛屿与城市如何共同形成意大利的食材和餐桌差异。","relatedSlugs":["italian-food-culture","regional-traditions","olive-regions"],"image":"assets/media/academy/culture-cover-02.webp","column":"探索意大利","related":["zh-academy-italian-food-culture","zh-academy-regional-traditions","zh-academy-olive-regions"],"sectionMedia":[]});
})();
