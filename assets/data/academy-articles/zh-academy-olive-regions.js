(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-olive-regions"] = revive({"lang":"zh","slug":"olive-regions","topic":"olive","topicLabel":"橄榄油学院","artClass":"is-olive","eyebrow":"橄榄油学院","title":"从产区到风味：意大利橄榄油的区域差异","meta":"橄榄油学院 · 2026","archive":"产区与品种","intro":"从气候、地形与本地品种出发，理解意大利橄榄油为何不存在一种统一的“标准味道”。","opening":["意大利南北跨度大，湖区、丘陵、沿海平原和岛屿拥有不同的温度、降雨、土壤与风。再加上数量众多的本地橄榄品种，同为特级初榨橄榄油，也会呈现从柔和杏仁、鲜草到番茄叶、朝鲜蓟和明显辛香的多种风格。","产区不是味道的快捷标签。相邻庄园可能因品种比例、采收时间、果实健康和加工选择而表现不同；同一庄园也会随年份变化。学习区域差异的意义，是建立更宽的风味坐标，而不是用几个地名替代实际品鉴。"],"sections":[["北部与湖区的细致表达",["意大利北部能种植橄榄的区域常受到湖泊缓和气候的影响。这里的油品常被描述为清新、细致、苦辣较柔和，但这只是常见倾向，并不是所有北部油的固定答案。轻盈香气适合观察鱼类、白肉、蒸煮蔬菜和豆泥中的细微层次。","购买时仍要看具体品种、产地保护标识和生产者资料。湖区产量相对有限，年份差异和储存尤其值得重视；温和不应被误解为没有果香或已经氧化。"]],["中部丘陵的绿色骨架",["托斯卡纳、翁布里亚及周边丘陵经常出现青草、叶片、朝鲜蓟、青杏仁等联想，并伴随清晰的苦味与喉部辛辣感。较早采收常有助于形成鲜明绿色风格，同时也可能降低出油率，对生产者的采收和加工管理提出更高要求。","这类油可用于白豆、烤面包、汤、烤肉和根茎蔬菜。搭配时不是追求油味盖过食物，而是利用苦辣结构连接淀粉、蛋白质与蔬菜的甜味。"]],["南部与岛屿的多样性",["普利亚、卡拉布里亚、西西里和撒丁岛等地区并非只有浓重一种风格。当地品种、海拔与采收成熟度可带来番茄、香草、果仁、成熟水果或更有力度的辛香。大面积种植与小型庄园并存，更需要通过产地和批次资料识别具体来源。","饱满型油品常适合番茄、豆类、烤蔬菜、炖菜与结构更强的鱼肉菜肴；偏清新的岛屿油也能很好地用于生食。菜肴选择应以实际品鉴为准，而不是仅凭南北地理位置。"]],["如何把产区信息用于选择",["先确定用途，再比较同类油：生食需要香气清楚，烹饪需要结构稳定，礼赠则还要关注可追溯文件和包装保护。若标签带有PDO、PGI等地理标志，它说明产品遵循相应产区规范，但不能代替个人口味判断。","建议以小容量建立品鉴记录，写下开瓶日期、香气、苦辣强度和适合菜肴。LuxurEat（露意膳）在介绍产区时，会把地名、品种、年份和生产方式放在一起说明，避免把地域故事写成无法验证的品质保证。"]]],"asideSummary":"区域为风味提供背景，品种、年份、采收和加工决定最终表达；地名应与批次资料和实际品鉴一起阅读。","relatedSlugs":["olive-oil-basics","olive-tasting"],"image":"assets/media/academy/olive-cover-02.webp","column":"橄榄油学院","related":["zh-academy-olive-oil-basics","zh-academy-olive-tasting","zh-academy-olive-nutrition"],"sectionMedia":[]});
})();
