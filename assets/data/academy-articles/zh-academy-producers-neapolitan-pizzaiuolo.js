(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-producers-neapolitan-pizzaiuolo"] = revive({"slug":"producers-neapolitan-pizzaiuolo","lang":"zh","topic":"producers","topicLabel":"生产者、大师与产地故事","column":"生产者、大师与产地故事","eyebrow":"生产者、大师与产地故事","title":"那不勒斯披萨师：为什么做披萨也可以是一门文化遗产？","meta":"生产者、大师与产地故事 · 2026","archive":"生产者、大师与产地故事","image":"assets/media/academy/producers-neapolitan-pizzaiuolo.webp","intro":"在全世界，披萨已经变得极其普遍。但在那不勒斯，“披萨师”并不仅仅意味着一个负责把面团送进烤炉的人。真正的传统职业叫做：pizzaiuolo。","opening":["2017 年，“那不勒斯披萨师的技艺”被联合国教科文组织列入人类非物质文化遗产代表作名录。","值得注意的是：","被认可的不是“披萨这道菜”。","而是做披萨的人所掌握的知识、动作和社会实践。"],"sections":[["面团从手开始变化",["那不勒斯披萨最有辨识度的地方之一，是柔软的中心和隆起的外圈。","形成这种结构不能只依赖食谱上的克数。","披萨师需要判断：","面团发酵到了什么程度；","伸展时需要多大力度；","怎样保留外圈中的空气；","怎样把圆形面团迅速整形。","联合国教科文组织对这一传统的描述中，甚至单独记录了面团伸展和形成外圈时具有代表性的手部动作。"]],["烤炉里的时间只有几十秒",["传统那不勒斯披萨需要面对非常高的烤炉温度。","这意味着披萨师没有很长时间慢慢修正。","面团厚度、配料水分、入炉位置和旋转时机都需要快速判断。","真正成熟的披萨师不是机械复制一份标准流程。","而是在非常短的时间里不断做判断。"]],["大师真正传递的是动作",["披萨师的技术长期通过实践传递。","学徒不是只阅读配方，而是观察：","怎样摸面团；","怎样伸展；","怎样放配料；","怎样使用烤炉；","怎样判断成品。","这也是为什么联合国教科文组织把它理解为“活态遗产”。","传统之所以存在，不是因为某一本书一直放在那里。","而是因为还有人在继续做。"]],["那不勒斯为什么不能从故事里被拿掉？",["今天任何城市都可以做出非常好的那不勒斯风格披萨。","但这种技术为什么形成，却离不开那不勒斯本身的城市历史、街头饮食、工匠文化和社会生活。","产地故事不是为了说：","“只有那不勒斯才能做披萨。”","而是解释：","“为什么这种披萨会在那不勒斯形成。”"]],["LuxurEat(露意膳)视角",["LuxurEat(露意膳)在介绍披萨相关面粉、番茄、特级初榨橄榄油和其他产品时，最重要的不是把每样东西都贴上“正宗意大利”的标签。","更好的方式是说明：","这个产品服务于哪一种披萨；","这种披萨追求什么质地；","为什么面粉、水分、发酵和烤炉条件会影响结果。","当消费者理解披萨师的工作之后，原料也会开始变得有意义。"]]],"sectionMedia":[[],[],[],[],[]],"asideSummary":"在全世界，披萨已经变得极其普遍。但在那不勒斯，“披萨师”并不仅仅意味着一个负责把面团送进烤炉的人。真正的传统职业叫做：pizzaiuolo。","related":["zh-academy-producers-modern-gelatiere","zh-academy-producers-truffle-hunters","zh-academy-producers-parmigiano-cheesemakers"]});
})();
