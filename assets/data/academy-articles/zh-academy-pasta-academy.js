(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-pasta-academy"] = revive({"lang":"zh","slug":"pasta-academy","topic":"culture","topicLabel":"探索意大利","artClass":"is-academy","eyebrow":"意大利面学院","title":"意大利面：形状、酱汁与火候","meta":"探索意大利 · 2026","archive":"意面基础","intro":"从原料与形状出发，理解煮面水、酱汁浓度和锅中收尾如何共同决定一盘意大利面的完整度。","opening":["意大利面不是一种固定食物。干面与鲜面、长面与短面、光滑表面与带纹理表面，在含水量、结构和适配酱汁上各不相同。地区传统提供了许多经典组合，但理解原理比机械照搬更重要。","一盘完整的意面，重点不是把煮好的面放在酱汁旁边，而是让面条在最后阶段与液体、脂肪和调味结合。火候、酱汁附着和入口温度需要同时到位。"],"sections":[["先认识干面与鲜面",["干意面通常以硬质小麦粗粒粉和水制成，结构适合储存并能保留清晰咬感；鲜面可能含普通小麦粉、硬质小麦粉、鸡蛋或水，配方与地区做法不同。","不能用“鲜面一定更高级”判断品质。应根据菜式、形状、厚度、酱汁与个人偏好选择，并查看实际产品配料和烹煮说明。"]],["形状为何影响搭配",["细长面适合与流动或乳化型酱汁缠绕，管状和凹槽面能容纳颗粒与浓稠酱汁，宽面则提供更明显的面体口感。这些是实用线索，不是不可改变的禁令。","观察酱汁的颗粒大小、黏度与脂肪感，再选择能够承接它的形状，通常比只按菜名购买更容易成功。"]],["煮面水的作用",["充足沸水有助于面条均匀受热，但锅具大小、面量和是否频繁搅动同样重要。加盐量应结合酱汁中的奶酪、腌制品或其他含盐材料调整。","煮面水中的淀粉可帮助酱汁乳化和附着。保留一部分、分次加入，比一次倒入大量液体更容易控制最终浓度。"]],["火候不是包装时间的机械答案",["包装建议时间是有价值的起点，但面条厚度、锅中水量、海拔和后续收汁时间都会改变结果。如果还要在酱汁中加热，应略早捞出并通过品尝判断。","所谓有咬感，应是中心仍有结构但不生硬，也不应留下明显粉芯。不同面型与个人偏好会有差异，关键是口感均匀。"]],["在锅中完成一盘面",["将面与酱汁在锅中短暂结合，通过翻拌让水、油脂与淀粉形成连续口感。必要时少量加煮面水，过稀则继续收汁，避免只把浓酱堆在表面。","奶酪、鸡蛋或易挥发香草常需要降温或离火加入，以避免结块并保留香气。上桌前再检查盐度、酸度、油脂和份量，让面本身仍是主角。"]],["份量、保存与重新加热",["干面份量应结合菜序、酱汁和用餐者需求，不必把一个固定克数当作所有场合的标准。鲜面和含馅面还需考虑水分、鸡蛋或乳制品等配料，并按产品说明冷藏或冷冻。","刚完成的意面通常最能呈现理想质地。若需要提前准备，可将酱汁与面分别管理，并保留适量液体在上桌前重新结合；反复长时间加热容易让面体过软、酱汁分离。"]]],"asideSummary":"把面型、煮面水、火候与锅中收尾连接起来，建立比固定时间和固定搭配更可靠的意面方法。","relatedSlugs":["cooking-techniques","pairings-class","olive-recipes-guide"],"image":"assets/media/academy/culture-cover-07.webp","column":"探索意大利","related":["zh-academy-cooking-techniques","zh-academy-pairings-class","zh-academy-olive-recipes-guide"],"sectionMedia":[]});
})();
