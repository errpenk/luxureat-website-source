(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-cooking-techniques"] = revive({"lang":"zh","slug":"cooking-techniques","topic":"culture","topicLabel":"探索意大利","artClass":"is-academy","eyebrow":"基础烹饪课程","title":"意大利料理的基础技法","meta":"探索意大利 · 2026","archive":"基础技法","intro":"从火候、乳化、烘烤和静置理解基础技法：少依赖堆叠调味，多观察原料在温度与时间中的变化。","opening":["意大利料理常给人“简单”的印象，但配料少并不代表技术要求低。当一道菜只有面、番茄、橄榄油或少量奶酪时，水分、盐度、火候和加入顺序的误差会更加明显。","学习基础技法，不是记住所有菜谱，而是建立可迁移的判断：什么时候需要高温上色，什么时候应该小火提取，怎样让水与油形成稳定口感，以及食物离火后为何仍会继续变化。"],"sections":[["先处理水分",["蔬菜、番茄、菌菇和肉类的含水量不同。锅中水分过多会降低表面温度，影响上色；水分不足又可能让酱汁过早浓缩。切配大小、锅具容量和分批操作都很重要。","盐会影响出水和味觉，应根据食材与步骤加入，而不是机械地只在最后调味。含盐奶酪、腌制品或高汤也要计入整体盐度。"]],["高温与低温承担不同任务",["高温适合快速上色、形成烘烤香气或让披萨饼边迅速膨胀；较低温度和更长时间则适合软化组织、融合汤汁。两者不是优劣关系，而是目标不同。","家庭灶具和烤箱与专业设备差异很大，不能只照搬时间。更可靠的是同时观察颜色、香气、内部温度或质地，并根据设备调整。"]],["乳化让酱汁与主食连接",["乳化是让水相与油脂形成细腻分散的过程。意面淀粉水、橄榄油、奶酪或其他脂肪，在适当温度与搅动下可以形成包裹面条的酱汁。","温度过高可能让奶酪结块或蛋类凝固，液体过多则会稀薄。离火调整、分次加液和持续翻拌，往往比一次加入所有材料更容易控制。"]],["烘烤需要预热与空间",["披萨、面包和烤蔬菜需要稳定热源。充分预热烤箱与烤盘或烤石，能减少食物进入后温度骤降；食材摆放过密则会积聚蒸汽，削弱表面上色。","焦斑应带来香气与结构，而不是明显苦味。颜色只是信号之一，还要结合内部熟度、底部状态和食物安全判断。"]],["静置与收尾也是烹饪",["肉类、烘焙品、面团和某些酱汁在离火后仍会重新分布水分或继续凝固。适当静置能改善切面与口感，但具体时间取决于体积和配方。","最后加入香草、橄榄油、柑橘皮或奶酪，是为了保留易挥发香气。收尾应少量、逐步品尝，使主料更清晰，而不是掩盖前面的火候工作。"]],["建立自己的厨房记录",["同一配方在不同炉具、锅具和室温下会有差异。记录原料重量、实际温度、时间与观察到的状态，可以帮助下一次调整，也能区分偶然成功与可重复方法。","记录不必复杂：写下起始条件、关键转折和最终结果即可。长期比较后，就能知道自己的烤箱偏热还是偏冷、常用锅具蒸发多快，以及哪种面粉或油品最适合特定做法。"]]],"asideSummary":"以水分、温度、乳化、烘烤和静置建立可观察、可调整的意大利料理基础，而不是死记时间。","relatedSlugs":["pasta-academy","pairings-class","olive-tasting"],"image":"assets/media/academy/culture-cover-06.webp","column":"探索意大利","related":["zh-academy-pasta-academy","zh-academy-pairings-class","zh-academy-olive-tasting"],"sectionMedia":[]});
})();
