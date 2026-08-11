(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["zh-academy-allergens-guide"] = revive({"lang":"zh","slug":"allergens-guide","topic":"nutrition","topicLabel":"营养与配料指南","artClass":"is-nutrition","eyebrow":"过敏原信息","title":"过敏原信息：按产品逐项确认","meta":"营养与配料指南 · 2026","archive":"食品安全","intro":"区分配方含有、交叉接触与个人风险，按产品和批次核对致敏物质，而不是用全系列口号代替标签。","opening":["食物过敏是免疫系统对特定食物蛋白的反应，严重程度因人而异。乳糖不耐受、一般消化不适和食物过敏并不是同一概念，处理建议也不同。对已知过敏者而言，最重要的是阅读具体产品标签并遵循医疗建议。","一家品牌拥有多条产品线时，不能用一句“无过敏原”覆盖全部。鱼子酱、含乳冷冻甜品、坚果口味、含麸质披萨和酱料的风险来源不同，配方与生产环境也可能随规格和批次变化。"],"sections":[["配方中明确存在的致敏物质",["先从配料表和过敏原提示确认乳、蛋、含麸质谷物、坚果、大豆、鱼类、甲壳类等与自身相关的成分。复合配料中的组成也需要展开阅读，不能只看主名称。","名称相似或翻译不熟悉时，不应凭经验猜测。联系生产者或销售方索取最新中文标签和技术资料，在无法确认时选择不食用。"]],["理解交叉接触",["产品配方没有主动加入某种致敏物质，不代表生产环境一定不存在接触可能。共用设备、储存、运输、工具和门店操作都需要风险评估与清洁管理。","预防性提示应依据生产者文件和适用法规，不宜由经销商自行扩大或删除。对高风险人群而言，“可能含有”需要按个人医疗方案认真对待。"]],["餐饮和家庭的二次确认",["餐厅使用原包装原料后，还会加入其他酱汁、乳酪、坚果或装饰，并可能使用共用炉具和器皿。点餐时应明确告知过敏情况，让餐厅评估是否能安全提供。","家庭分装时保留原标签和批次，不要只把粉末或酱料装入无标识罐。为不同成员准备食物时，清洁台面、工具和双手，避免同一刀具或勺子交叉使用。"]],["出现风险时怎么办",["有过敏史者应与医生制定个人管理方案，并按建议携带所需急救药物。出现呼吸困难、喉咙紧、全身反应或其他严重症状，应立即寻求紧急医疗帮助。","LuxurEat（露意膳）会按产品发布配料和致敏信息，不把知识文章作为医疗或购买保证。任何配方更新都应同步到标签与销售资料，让消费者和专业客户能在使用前核对。"]],["给专业采购的文件清单",["餐厅和食品企业采购时，应保存规格书、配料和过敏原声明、生产变更通知与联系人。菜单或培训材料要与当前版本同步，不能沿用旧配方结论。","供应方发生原料、工厂或共线生产变化时，风险评估也可能变化。定期复核比一次性索取“无过敏原证明”更可靠。"]],["不要用替代品自行试探",["对某种坚果、乳或谷物过敏的人，不能仅因产品使用替代原料就推断安全；替代品本身也可能是致敏物，且生产环境可能不同。任何试吃都应建立在标签确认和个人医疗方案之上。"]]],"asideSummary":"过敏原管理必须逐产品核对配方、生产环境和标签；网站教育不能替代包装信息与个人医疗方案。","relatedSlugs":["nutrition-labels","clean-label","ugolini-gelato-mix"],"image":"assets/media/academy/nutrition-cover-02.webp","column":"营养与配料指南","related":["zh-academy-nutrition-labels","zh-academy-clean-label","zh-academy-ugolini-gelato-mix"],"sectionMedia":[]});
})();
