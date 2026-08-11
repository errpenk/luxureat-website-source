(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-olive-storage"] = revive({"lang":"zh","slug":"olive-storage","topic":"olive","topicLabel":"橄榄油学院","artClass":"is-olive","eyebrow":"保存方法与保质期","title":"让橄榄油保持风味：光、热与时间","meta":"橄榄油学院 · 2026","archive":"保存指南","intro":"理解光、热、氧与时间如何削弱橄榄油风味，并为家庭和餐饮场景建立可执行的保存方法。","opening":["橄榄油离开榨油厂后仍会缓慢氧化。光照、较高温度、空气接触和时间都会加速香气消退与哈败发展。优质原料和先进加工无法抵消错误储存，因此保存不是购买之后的小事，而是品质链条的一部分。","氧化速度受包装、剩余空间、环境温度与开关频率影响，无法用一个开封天数概括所有产品。标签给出安全和品质期限，开瓶后的最佳风味则需要结合实际条件观察。"],"sections":[["避开光与持续高温",["把油放在阴凉橱柜，而不是窗台、射灯下或灶台边。短时间烹饪加热与整瓶长期处在高温环境是两件事；后者会在每次使用前就持续消耗风味。","深色玻璃或金属罐能提供保护，但不是绝对屏障。店铺陈列、运输和家庭储藏都应减少日照与温度波动，尤其不要把库存放在车辆或热源附近。"]],["减少不必要的空气接触",["每次使用后立即盖紧，保持瓶口清洁。随着油量下降，容器内空气比例增加，频繁开合也会带入新空气，因此超大包装未必适合低频家庭使用。","若需分装，选择干燥、无异味、可密封并能避光的食品接触容器。不要把新油不断倒进残留旧油的油壶，旧油和水分会影响风味与卫生。"]],["冰箱不是通用答案",["低温可能使橄榄油出现浑浊或结晶，回温后通常可恢复，但这种现象不能用来鉴别真伪。家庭频繁进出冰箱还会带来温度变化和冷凝风险，除非标签或生产者有明确建议，否则稳定的阴凉环境通常更实用。","判断真伪和等级需要来源文件、理化检测与感官评价，不能依靠“冷藏是否凝固”之类的网络测试。不同脂肪酸和微量成分组成会让低温表现不同。"]],["建立库存和开瓶制度",["家庭可以在瓶身记录开封日期，餐饮端则应标注入库、开封和分装信息，执行先进先出。定期闻香，发现果香变平或出现陈旧、蜡笔、旧坚果般气息时，说明风味已明显衰退。","购买量应与使用频率匹配。LuxurEat（露意膳）在供应与应用建议中，会把包装规格、储运条件和预计消耗一起考虑，让产品从仓库到餐桌都保持可追溯和稳定。"]],["餐饮端的现场细节",["后厨应把日常用油放在远离热源且便于盖紧的位置，服务壶只补充当餐合理用量。收餐后不要把敞口剩油直接倒回原包装，以免带入食物残渣和水分。","仓库、备餐区与餐桌服务应使用同一批次记录。这样即使发现风味异常，也能快速追溯到入库、开封、分装或环境环节。"]],["离开包装后的原则",["倒入盘中或调味碗后的油应按菜肴需要及时使用，不把已经接触水分、盐或食物的剩余油长期保存。把清洁、避光和减少空气接触贯穿到最后一次使用，才能真正延续生产端的品质管理。"]]],"asideSummary":"避光、避热、密封并按消耗速度购买；记录开瓶和批次，比用颜色或冷藏凝固判断品质更可靠。","relatedSlugs":["olive-how-to-choose","olive-tasting","olive-nutrition"],"image":"assets/media/academy/olive-cover-07.webp","column":"橄榄油学院","related":["zh-academy-olive-how-to-choose","zh-academy-olive-tasting","zh-academy-olive-nutrition"],"sectionMedia":[]});
})();
