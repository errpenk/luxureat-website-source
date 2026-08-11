(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-olive-oil-basics"] = revive({"lang":"zh","slug":"olive-oil-basics","topic":"olive","topicLabel":"橄榄油学院","artClass":"is-olive","eyebrow":"橄榄油学院","title":"什么是特级初榨橄榄油？","meta":"橄榄油学院 · 2026","archive":"基础认识","intro":"从法定等级、机械加工、感官评价到日常使用，建立判断特级初榨橄榄油的完整基础。","opening":["特级初榨橄榄油首先是一个受到标准约束的等级，而不是泛指颜色金黄、包装精美或价格较高的橄榄油。它来自橄榄果实，只通过机械或其他物理方式取得，并需同时满足理化指标和感官要求。欧盟现行规则把理化分析、果香以及是否存在感官缺陷放在一起判断，因此只看酸度数字并不足以确认品质。","对消费者而言，理解这个等级的意义，不是背诵一组实验室参数，而是知道果实状态、加工速度、温度管理、卫生和储存如何共同影响一瓶油。品牌故事可以帮助理解产区，但最终仍应回到标签、批次文件与开瓶后的真实感官表现。"],"sections":[["从橄榄果到油",["橄榄在采收后仍会继续发生生化变化。果实受伤、堆放过久或温度过高，都可能加快发酵和氧化，形成霉味、酒醋味或哈败气息。因此，成熟度合适的果实、尽快运输与及时加工，是保持新鲜风味的重要前提。","现代生产通常包括清理、清洗、破碎、搅拌和离心分离。所谓冷提取不是把果实冻起来，而是在加工中控制温度，减少香气损失和不必要的氧化。过滤与否会影响外观和保存管理，但浑浊本身不等于更天然，也不自动代表更高品质。"]],["等级需要两类证据",["理化分析可观察游离脂肪酸、过氧化值及其他组成指标，感官评价则由受训评审员识别果香、苦味、辛辣感和缺陷。优质特级初榨橄榄油应有可感知的果香，并且没有规定中的感官缺陷。酸度是实验室指标，无法靠舌头直接尝出，也不能单独说明全部新鲜度。","苦味和喉部辛辣感常与新鲜橄榄中的酚类物质相关，可以是正常而积极的特征，但强度并非越高越好。品种、成熟度与菜肴需要不同，真正值得关注的是香气是否清晰，入口是否平衡，余味是否干净。"]],["标签能告诉你什么",["先确认正面的法定品名，再查看原产信息、净含量、日期、储存要求、生产者或进口商。采收年份、橄榄品种和庄园信息能增加判断依据，但并非所有市场都强制标示。若包装只写“橄榄油”，其类别可能与特级初榨不同，应继续阅读完整名称。","深色玻璃、金属罐或阻光包装有助于减少光照，但包装不能替代正确储运。到货时检查封口、标签与批次，开瓶后闻香并记录使用时间。任何健康或品质表述，都应与产品文件和适用法规一致。"]],["把油用在正确位置",["清新细致的油适合生食、面包、海鲜、沙拉和起锅后的点缀；果香饱满、苦辣更明显的油可配豆类、烤蔬菜、肉类、汤和意面。烹饪会改变香气层次，因此不必把同一瓶油用于所有步骤。","LuxurEat（露意膳）在选品时更关注产地证明、品种、采收与加工信息、储存和批次稳定性。对家庭用户而言，最有效的判断仍然简单：购买合适容量，避光密封保存，在风味仍然鲜明时用完。"]]],"asideSummary":"特级初榨是一套由原料、机械加工、理化指标和感官评价共同构成的等级；标签与开瓶后的真实风味同样重要。","relatedSlugs":["olive-regions","olive-tasting"],"image":"assets/media/academy/olive-cover-01.webp","column":"橄榄油学院","related":["zh-academy-olive-regions","zh-academy-olive-tasting","zh-academy-olive-nutrition"],"sectionMedia":[]});
})();
