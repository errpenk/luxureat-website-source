(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-producers-modena-acetaia"] = revive({"slug":"producers-modena-acetaia","lang":"zh","topic":"producers","topicLabel":"生产者、大师与产地故事","column":"生产者、大师与产地故事","eyebrow":"生产者、大师与产地故事","title":"屋顶下的时间：摩德纳传统香醋与一座家庭醋坊","meta":"生产者、大师与产地故事 · 2026","archive":"生产者、大师与产地故事","image":"assets/media/academy/producers-modena-acetaia.webp","intro":"有些意大利食品靠火候完成。有些靠发酵。而摩德纳传统香醋最重要的原料之一，是时间。","opening":["在摩德纳，传统醋坊通常被称为 acetaia。","它不仅是一间生产空间，也可能是一段家庭历史。"],"sections":[["一切从葡萄开始",["摩德纳传统香醋不是简单把普通葡萄酒醋放久一点。","其生产建立在当地葡萄和葡萄汁基础之上，并受到严格的原产地规范保护。","传统摩德纳香醋原产地保护产品的整个生产体系与摩德纳省紧密相连。官方保护机构强调，从葡萄到长期熟成，产品与当地生产者和土地之间具有不可分割的联系。"]],["为什么醋坊经常出现在房屋高处？",["传统醋坊常利用建筑上层空间。","这里一年中会经历明显温度变化。","而不同温度条件正是长期熟成过程的一部分。","醋液会在一组大小不同、木材不同的桶中经历漫长变化。","这组桶常被称为一个“桶组”。","随着时间推移，水分蒸发、风味集中，生产者再按照传统方法管理不同木桶之间的液体。"]],["每一组木桶都可能成为家庭记忆",["摩德纳传统香醋保护联盟在介绍当地醋坊时，直接把它描述成“家庭、醋坊与代代相传故事”的结合。","当地一些醋坊至今仍由多代家庭持续经营。","这让香醋拥有一种很特别的时间尺度。","一组木桶可能比一份商业计划活得更久。","今天管理它的人，可能并不是最初放入葡萄汁的人。","于是，生产变成一种继承。"]],["为什么真正的传统香醋不会只追求酸？",["好的传统香醋并不是“越酸越好”。","长期熟成带来的价值，在于酸、甜、香气和浓度之间逐渐形成平衡。","它可以和帕尔马干酪、肉类、水果甚至甜点搭配。","重点并不是像普通调味醋一样大量倒入，而是通过较少用量增加层次。"]],["摩德纳不是包装上的一个词",["今天“香醋”已经成为国际消费者熟悉的类别。","但真正理解摩德纳传统香醋，需要重新回到：","葡萄；","土地；","木桶；","醋坊；","时间；","以及管理这些桶的人。","这才是产地故事的真正内容。"]],["LuxurEat(露意膳)视角",["对于 LuxurEat(露意膳) 来说，摩德纳香醋非常适合说明一个核心理念：","知识可以直接提升产品价值。","如果消费者只知道“这是一瓶黑色、酸甜的意大利醋”，价格差异会很难理解。","当消费者开始理解原产地体系、原料、熟成方式和使用方法之后，一瓶香醋才真正拥有身份。","LuxurEat(露意膳) 希望做的，正是把这层身份重新放回产品之中。"]]],"sectionMedia":[[],[],[],[],[],[]],"asideSummary":"有些意大利食品靠火候完成。有些靠发酵。而摩德纳传统香醋最重要的原料之一，是时间。","related":["zh-academy-producers-neapolitan-pizzaiuolo","zh-academy-producers-modern-gelatiere","zh-academy-producers-truffle-hunters"]});
})();
