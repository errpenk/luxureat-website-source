(() => {
  const assetBase = new URL("../", document.currentScript?.src || location.href);
  const asset = (path) => new URL(path, assetBase).href;
  const articleImage = (file) => asset(`media/journal/${file}`);
  const images = {
    harvest: articleImage("about-caviar.webp"),
    harvestDetail: asset("media/academy/caviar-processing-02.webp"),
    service: articleImage("caviar-etiquette-service.webp"),
    malossol: asset("media/academy/caviar-processing-04.webp"),
    champagne: asset("media/brand/home-values-caviar-plating.webp"),
    spoon: articleImage("caviar-etiquette-service.webp"),
    ice: asset("media/brand/partnership-solution-caviar-service.jpg"),
    temperature: asset("media/brand/cert-food-safety.webp"),
    table: articleImage("recipe-sweet-bread-butter-caviar.webp"),
    blini: articleImage("blini-hero.jpg"),
    aboutRoberto: articleImage("about-roberto.webp"),
    aboutDining: articleImage("about-trufflebar-dining.webp"),
    aboutBar: articleImage("about-trufflebar-bar.webp"),
    aboutProducts: articleImage("about-truffle-products.webp"),
    aboutMap: articleImage("about-global-map-cropped.png"),
    aboutCaviar: articleImage("about-caviar.webp"),
    aboutShrimp: articleImage("about-shrimp-tartare.webp"),
    caviarWorld: articleImage("caviar-world-map.webp"),
    italianCaviar: articleImage("italian-caviar-market.webp"),
    caviarEtiquette: articleImage("caviar-etiquette-service.webp"),
    sensoryAnalysis: articleImage("sensory-analysis-cover.webp"),
    caviarLabeling: articleImage("caviar-labeling-cover.webp"),
    caviarLabelDiagram: articleImage("caviar-labeling-diagram.webp"),
    philosophy: articleImage("luxureat-philosophy.webp"),
    recipeTruffleEggs: articleImage("recipe-truffle-eggs.webp"),
    recipeTruffleToast: articleImage("recipe-truffle-toast.webp"),
    recipeTruffleTagliolini: articleImage("recipe-truffle-tagliolini.webp"),
    recipeTruffleRavioli: articleImage("recipe-truffle-ravioli.webp"),
    recipeBlackTruffleRisotto: articleImage("recipe-black-truffle-risotto.webp"),
    recipeMushroomSoup: articleImage("recipe-mushroom-soup.webp"),
    recipeBeefCarpaccioScallopTruffle: articleImage("recipe-beef-carpaccio-scallop-truffle.webp"),
    recipeShrimpTartareTruffle: articleImage("recipe-shrimp-tartare-truffle.webp"),
    recipeSweetBreadButterCaviar: articleImage("recipe-sweet-bread-butter-caviar.webp"),
    recipeTruffleTiramisu: articleImage("recipe-truffle-tiramisu.webp"),
    recipePizza: articleImage("recipe-pizza-margherita.webp"),
    recipeGelato: articleImage("recipe-gelato-classic.webp"),
    recipeOliveBruschetta: articleImage("recipe-olive-bruschetta.webp"),
    recipeOliveAglioOlio: articleImage("recipe-olive-aglio-olio.webp"),
    recipeOlivePanzanella: articleImage("recipe-olive-panzanella.webp"),
    recipeOlivePinzimonio: articleImage("recipe-olive-pinzimonio.webp"),
    recipeLightFennelOrangeSalad: articleImage("recipe-light-fennel-orange-salad.webp"),
    recipeLightGrilledZucchini: articleImage("recipe-light-grilled-zucchini.webp"),
    recipeLightSeaBass: articleImage("recipe-light-sea-bass-acqua-pazza.webp"),
    recipeFamilyPomodoro: articleImage("recipe-family-spaghetti-pomodoro.webp"),
    recipeFamilyFrittata: articleImage("recipe-family-zucchini-frittata.webp"),
    recipeFamilyCacciatora: articleImage("recipe-family-chicken-cacciatora.webp"),
    recipeTruffleCrostini: articleImage("recipe-truffle-summer-crostini.webp"),
    recipeTruffleTrout: articleImage("recipe-truffle-trout.webp"),
    recipeTruffleLamb: articleImage("recipe-truffle-lamb.webp"),
  };
  const articles = {
    "zh-about": {
      lang: "zh", eyebrow: "关于我们", title: "LuxurEat（露意膳）｜从意大利家族餐桌，到世界高端美食版图", meta: "MAISON · 品牌故事",
      image: images.aboutRoberto,
      intro: "LuxurEat（露意膳）的故事，始于意大利家庭餐桌上代代相传的味道。",
      opening: [
        "品牌创始人Roberto Ugolini从小生活在浓厚的意大利饮食文化中。祖父Renato是一位热爱研究美食的自学型美食家，母亲Renata则对意大利传统烹饪充满热情。在家庭环境的影响下，Roberto逐渐建立起对天然食材、地方菜谱和食品品质的重视。",
      ],
      sections: [
        ["从松露开始的美食事业", [
          "Roberto最初从高品质松露的贸易起步，并逐渐将个人对美食的热爱发展为一项国际化事业。",
          "LuxurEat（露意膳）从TrufflEat积累的行业经验中发展而来，业务范围也从松露逐步扩展至鱼子酱、高端调味品和其他精品食品。品牌希望在保留意大利传统风味与手工品质的同时，通过产品创新，让高端食材进入更多餐饮和日常消费场景。",
          "2018年，团队在曼谷开设了TruffleBar & Restaurant，将意大利松露文化带入亚洲餐饮市场。虽然餐厅在2020年因疫情限制关闭，但这一项目成为品牌国际化发展过程中的重要阶段，也推动团队进一步转向全球销售、合作经营与品牌拓展。",
        ]],
        ["从意大利走向世界", [
          "如今，LuxurEat（露意膳）已经发展为一家专注于松露、鱼子酱和高端食品的国际集团，在意大利、美国、泰国和中国设有公司或业务机构，并通过合作伙伴和经销渠道进入欧洲、亚洲、中东和美国等市场。",
          "LuxurEat（露意膳） 是在中国设立并以上海为运营中心的中国公司，不是海外品牌代表处，而是直接承担中国本地进口、分销、客户服务与商业发展的运营主体。",
          "集团旗下业务涵盖TrufflEat、CaviarEat、LuxurEat（露意膳）及Ugolini Gourmet等品牌和产品线，面向餐厅、零售商、经销商及国际食品企业提供产品销售和商业合作服务。",
          "除了经营自有品牌，LuxurEat（露意膳）还提供自有品牌和OEM定制服务，包括产品配方开发、包装设计、意大利生产以及国际出口，帮助合作伙伴将产品从概念转化为适合不同市场的商业方案。",
        ]],
        ["传统、创新与全球视野", [
          "对LuxurEat（露意膳）而言，意大利制造不仅意味着产品的原产地，也代表对食材、工艺和饮食文化的尊重。",
          "品牌以意大利美食传统为基础，同时关注可持续发展和不同国际市场的食品需求。LuxurEat（露意膳）提供多种无麸质、纯素、素食、低热量以及针对特定过敏原进行配方优化的产品；Halal、Kosher等特点仅适用于相应产品，具体信息应以各产品说明与认证标识为准。",
          "从一个意大利家庭的餐桌记忆，到覆盖多个国家和地区的高端食品业务，LuxurEat（露意膳）始终围绕同一个目标发展：将意大利的真实风味、优质食材与创新产品带向世界，让传统美食在新的市场和消费场景中持续焕发活力。",
        ]],
      ],
      sectionMedia: [
        [
          { src: images.aboutDining, alt: "曼谷 TruffleBar & Restaurant 城市景观餐厅" },
          { src: images.aboutBar, alt: "曼谷 TruffleBar & Restaurant 酒吧空间" },
        ],
        [
          { src: images.aboutProducts, alt: "LuxurEat（露意膳） 松露产品系列" },
          { src: images.aboutMap, alt: "LuxurEat（露意膳） 全球业务布局" },
        ],
        [
          { src: images.aboutCaviar, alt: "LuxurEat（露意膳） 白鲟鱼子酱" },
          { src: images.aboutShrimp, alt: "LuxurEat（露意膳） 鲜虾塔塔产品" },
        ],
      ],
      quote: "将意大利的真实风味、优质食材与创新产品带向世界。",
      related: ["zh-harvest", "zh-truffle", "zh-service"],
    },
    "zh-harvest": {
      lang: "zh", eyebrow: "品牌理念", title: "LuxurEat（露意膳）的理念与哲学", meta: "MAISON · 理念与哲学",
      image: images.philosophy,
      coverPosition: "center top",
      cardImage: images.philosophy,
      cardPosition: "center 58%",
      cardEyebrow: "品牌传承",
      cardTitle: "本味之道",
      cardText: "传承意大利工艺，甄选当季优质食材，以天然方式守护风味与品质，并通过负责任的采购与包装，表达对土地、自然与未来的尊重。\n\nLuxurEat（露意膳）以传统为根、甄选为准、责任创新为向、永续为责。从优质原料到制作与包装，每一步都忠于意大利美食文化，也尊重自然与食材的未来。",
      intro: "LuxurEat（露意膳）是一家专注于美食领域的国际集团，主要经营松露、鱼子酱和高端食品。",
      opening: ["集团源于TrufflEat积累的经验，并逐步发展成为一家面向全球市场的企业，积极开展美食产品的生产、分销与开发。家庭背景、对美食的热情以及创业愿景，共同孕育了LuxurEat（露意膳）。"],
      sections: [
        ["我们的理念", ["LuxurEat（露意膳）的理念根植于对意大利美食传统的深切尊重，并建立在三个核心原则之上：负责任的创新、切实的可持续性和负责任的采购。", { type: "quote", bold: [0, 2, 4], lines: ["传统", "我们深深植根于意大利美食文化，重视代代相传的传统、经验与工艺。产品开发与甄选重视品质、原料与制作方法，具体产地与工艺以相应产品说明为准。", "创新", "我们持续探索适应不同饮食选择的产品。LuxurEat（露意膳）提供多种无麸质、纯素、素食、低热量以及针对特定过敏原进行配方优化的产品，每款产品的具体特点应以相应产品说明为准。", "可持续性", "我们通过合乎道德且具有包容性的产品和服务，倡导对环境、生物多样性和食物多样性的尊重。我们尊重生物多样性，倡导可持续农业；清真、犹太洁食或纯素等特点仅适用于带有相应说明或认证的产品。"] }]],
        ["我们的哲学", ["对LuxurEat（露意膳）而言，真正的美食不仅来自珍贵的食材，也来自对传统、品质、清晰信息与环境责任的共同坚持。我们的哲学贯穿从原料甄选、产品制作到包装呈现的每一个环节。", { type: "quote", bold: [0, 2, 4, 6], lines: ["历史", "我们致敬由意大利大师代代相传的食谱与制作工艺。传统并不只是对过去的复制，而是通过时间沉淀下来的经验与判断，让食材保留最初的纯真、层次与深度。", "甄选", "品质始于原料。我们坚持严苛的甄选标准，并重视食材的产地、季节与自然状态。", "清晰信息", "我们重视成分、营养、过敏原提示和食用方式的清晰表达。每款产品的实际配方、营养信息和适用说明应以其标签及产品资料为准。", "永续", "每一种食材都来自土地与自然。我们通过符合伦理的采购方式和更加环保的包装选择，减少对环境的负担，并以实际行动表达对土地、生态与未来的尊重。"] }, "这些价值观体现在公司的每一个选择中，从甄选优质原料、支持可持续农业，到按产品实际情况对接适用的国际食品标准。", "秉持诚信、真实与卓越的精神，LuxurEat（露意膳）致力于为全球消费者提供一种既传承意大利传统，又具有前瞻性视野的美食体验。"]],
      ],
      quote: "秉持诚信、真实与卓越的精神，LuxurEat（露意膳）致力于为全球消费者提供一种既传承意大利传统，又具有前瞻性视野的美食体验。",
      related: ["zh-service", "zh-malossol", "zh-champagne"],
    },
    "zh-harvest-craft": {
      lang: "zh", eyebrow: "品牌传承", title: "采撷之艺", meta: "MASTERCLASS · 2024年10月",
      image: images.harvest,
      intro: "鱼子酱的采撷不是速度，而是判断。盐渍大师在温度、颗粒张力、成熟度与批次香气之间寻找那个极窄的窗口；窗口一旦错过，再昂贵的器具与服务都无法弥补。",
      sections: [
        ["鲟鱼的尊贵传承", ["每一批鱼子酱都从产地记录开始。我们关注的不只是鱼种名称，而是水域、饲养周期、成熟度、粒径、油脂比例与开罐后的第一层气味。只有这些指标同时稳定，鱼卵才会进入 LuxurEat（露意膳） 的精选序列。", "在真正的品鉴里，奢华不是强烈，而是清晰。优质鱼卵入口即化，却仍保留轻微的颗粒张力；海洋感在前段出现，随后是奶油、坚果与细微矿物的长尾。"]],
        ["Malossol 的克制", ["低盐不是噱头，而是对原料的信任。盐只负责托起风味，不应遮住鱼卵自身的乳香与海洋深度。越低的盐分，越要求冷链、成熟度和装罐时机足够准确。", "我们的开罐服务会记录每一次温度变化与品鉴反馈。它们像一份安静的档案，让下一次宴席仍能复现同样的稳定度。"]],
        ["餐桌上的最后判断", ["鱼子酱离开冷库后，真正的考验才开始。银灰、琥珀或深金色的颗粒需要在柔和光线下观察，过强的灯会误导色泽判断，过热的室温会让油脂过快释放。", "因此，我们更偏爱慢而准确的服务节奏：先看色泽，再闻开罐后的海风气息，最后以贝母匙送入口中，让风味在舌面自然展开。"]],
      ],
      quote: "采撷的本质，是在最短的时间里做最慢的判断。",
      related: ["zh-service", "zh-malossol", "zh-champagne"],
    },
    "zh-recipe-truffle-eggs": {
      type: "recipe", lang: "zh", eyebrow: "早餐食谱", title: "松露鸡蛋", meta: "RECIPE · 早餐",
      image: images.recipeTruffleEggs,
      intro: "松露鸡蛋是一道美味佳肴，它将新鲜鸡蛋的清爽与松露浓郁的香气完美融合。无论是早餐、早午餐，还是作为精致的开胃菜，这道菜都堪称完美之选。做法简单快捷，其香气和精致口感定会让您爱不释手。",
      recipe: {
        description: "松露煎蛋是一道精致的早餐，它融合了煎蛋的简单和松露的优雅浓郁。这道菜制作快捷却令人惊喜，是开启美好一天的完美之选。",
        time: "10分钟", difficulty: "简单", servings: "1人份",
        ingredients: ["2个新鲜鸡蛋", "1茶匙特级初榨橄榄油或一小块黄油", "4-5片薄薄的黑松露片", "几片新鲜欧芹叶（可选）"],
        steps: ["在不粘锅中倒入少许油或一小块黄油，加热。", "轻轻敲开鸡蛋，用中小火煮，使蛋黄保持柔软。", "加少许盐和胡椒粉。", "鸡蛋快熟时，将松露片放在鸡蛋上，让热气释放松露的香气。"],
        nutrition: [["能量", "950千焦（约225千卡）"], ["饱和脂肪", "5克（25%）"], ["碳水化合物（糖类）", "1克"], ["蛋白质", "12克"]],
      },
      sections: [], related: ["zh-recipe-truffle-toast", "zh-harvest-craft", "zh-malossol"],
    },
    "zh-recipe-truffle-toast": {
      type: "recipe", lang: "zh", eyebrow: "早餐食谱", title: "水煮蛋配松露烤面包片", meta: "RECIPE · 早餐",
      image: images.recipeTruffleToast,
      intro: "烤面包片配水煮蛋和松露，是一道精致的餐桌小点，非常适合招待客人或打造优雅的周日早午餐。金黄酥脆的面包与绵密的鸡蛋和浓郁的松露香气完美融合，带来令人难以抗拒的美味和口感。",
      recipe: {
        description: "水煮蛋配松露烤面包片是一道精致的开胃菜，非常适合优雅的早午餐或美食餐前小酌。水煮蛋的柔滑口感与酥脆的面包和浓郁的松露香气完美融合，带来层次丰富的独特风味。",
        time: "15分钟", difficulty: "中等", servings: "2人份",
        ingredients: ["4片乡村面包或法棍面包", "2个新鲜鸡蛋", "1汤匙白醋", "2汤匙新鲜涂抹型奶酪（例如罗比奥拉奶酪或里科塔奶酪）", "5-6片薄薄的黑松露片", "1茶匙刺山柑（可选）", "新鲜罗勒叶", "适量特级初榨橄榄油", "盐和胡椒粉适量"],
        steps: ["将面包片烤至酥脆，加热烤盘或不粘锅。", "准备水煮蛋：将一锅水和一汤匙醋烧开。用勺子在水面上搅出一个漩涡，然后轻轻地将鸡蛋打入漩涡中心。煮2-3分钟，直到蛋白凝固但蛋黄仍然溏心。", "组装烤面包片：在面包片上涂抹奶油奶酪，放上水煮蛋，最后放上几片松露。", "装饰：淋上少许橄榄油，撒上刺山柑（可选）和几片新鲜罗勒叶。用少许盐和胡椒粉调味。"],
        nutrition: [["能量", "1300千焦（约310千卡）"], ["饱和脂肪", "6克（30%）"], ["碳水化合物（糖类）", "3克"], ["蛋白质", "12克"]],
      },
      sections: [], related: ["zh-recipe-truffle-eggs", "zh-harvest-craft", "zh-malossol"],
    },
    "zh-recipe-truffle-tagliolini": {
      type: "recipe", lang: "zh", eyebrow: "第一道主食", title: "白松露或黑松露细面", meta: "RECIPE · 第一道主食",
      image: images.recipeTruffleTagliolini,
      intro: "精致而令人回味无穷的头盘，是庆祝特殊场合的完美之选。新鲜的鸡蛋细面拌入黄油和帕玛森奶酪，再撒上大量的白松露或黑松露碎，带来令人难忘的香气体验。",
      recipe: {
        description: "一道优雅芬芳的头盘，非常适合特殊场合。软糯的馄饨皮包裹着香浓的奶油松露酱，再点缀以新鲜的黑松露碎屑。",
        time: "25分钟", difficulty: "中等", servings: "2人份",
        ingredients: ["250克意大利饺子（奶酪馅或蘑菇馅）", "30克黄油", "2汤匙鲜奶油", "4-5片新鲜黑松露", "1汤匙磨碎的帕玛森干酪", "新鲜切碎的欧芹适量", "盐和胡椒粉适量"],
        steps: ["煮馄饨：将一锅加盐的水烧开，然后按照包装上的说明煮馄饨（如果是新鲜的，则煮3-4分钟）。", "准备酱汁。在平底锅中，用小火融化黄油，加入奶油和一汤匙煮馄饨的水。搅拌至酱汁浓稠顺滑。", "将馄饨轻轻沥干水分，倒入盛有酱汁的锅中。加入帕玛森奶酪，翻炒1-2分钟。", "装饰盘子，最后放上几片新鲜黑松露和少许切碎的欧芹。"],
        nutrition: [["能量", "1750千焦（约420千卡）"], ["饱和脂肪", "9克（45%）"], ["碳水化合物（糖类）", "3克"], ["蛋白质", "14克"]],
      },
      sections: [], related: ["zh-recipe-truffle-ravioli", "zh-recipe-black-truffle-risotto", "zh-recipe-mushroom-soup"],
    },
    "zh-recipe-truffle-ravioli": {
      type: "recipe", lang: "zh", eyebrow: "第一道主食", title: "松露奶油酱馄饨", meta: "RECIPE · 第一道主食",
      image: images.recipeTruffleRavioli,
      intro: "松露奶油酱汁馄饨，将新鲜意面的细腻口感与松露独特的香气完美融合。",
      recipe: {
        description: "这道菜做法简单却令人印象深刻，是特殊场合的理想之选。软糯的馄饨皮包裹着香浓的奶油松露酱，再点缀以新鲜的黑松露碎屑。",
        time: "25分钟", difficulty: "中等", servings: "2人份",
        ingredients: ["250克意大利饺子（奶酪馅或蘑菇馅）", "30克黄油", "2汤匙鲜奶油", "4-5片新鲜黑松露", "1汤匙磨碎的帕玛森干酪", "新鲜切碎的欧芹适量", "盐和胡椒粉适量"],
        steps: ["煮馄饨：将一锅加盐的水烧开，然后按照包装上的说明煮馄饨（如果是新鲜的，则煮3-4分钟）。", "准备酱汁。在平底锅中，用小火融化黄油，加入奶油和一汤匙煮馄饨的水。搅拌至酱汁浓稠顺滑。", "将馄饨轻轻沥干水分，倒入盛有酱汁的锅中。加入帕玛森奶酪，翻炒1-2分钟。", "装饰盘子，最后放上几片新鲜黑松露和少许切碎的欧芹。"],
        nutrition: [["能量", "1750千焦（约420千卡）"], ["饱和脂肪", "9克（45%）"], ["碳水化合物（糖类）", "3克"], ["蛋白质", "14克"]],
      },
      sections: [], related: ["zh-recipe-truffle-tagliolini", "zh-recipe-black-truffle-risotto", "zh-recipe-mushroom-soup"],
    },
    "zh-recipe-black-truffle-risotto": {
      type: "recipe", lang: "zh", eyebrow: "第一道主食", title: "黑松露烩饭", meta: "RECIPE · 第一道主食",
      image: images.recipeBlackTruffleRisotto,
      intro: "黑松露烩饭将奶油米饭的香滑口感与松露的浓郁风味完美结合，成就了一道制作简单却又精致美味的佳肴。",
      recipe: {
        description: "黑松露烩饭是一道精致柔滑的头盘，卡纳罗利米的细腻口感与浓郁芬芳的松露香气完美融合。无论是优雅的晚宴还是特别的场合，它都能以其独特的风味和丝滑的口感征服您的味蕾。",
        time: "30分钟", difficulty: "中等", servings: "2人份",
        ingredients: ["160克卡纳罗利米", "20克黄油", "1汤匙特级初榨橄榄油", "30克磨碎的帕玛森干酪", "半个小洋葱（或青葱）", "50毫升干白葡萄酒", "4-5片新鲜黑松露薄片", "盐和胡椒粉适量"],
        steps: ["将洋葱切碎，放入平底锅中，加入黄油和少许油，用小火炒至变色。", "烘烤：加入卡纳罗利米，翻炒2-3分钟，直至米粒变得透明。", "脱釉：倒入白葡萄酒，让其完全蒸发。", "烹煮时，逐渐加入热肉汤，一次一勺，并不断搅拌。继续烹煮约15-18分钟。", "关火后，加入磨碎的帕玛森奶酪和一小块黄油，搅拌至顺滑浓稠。", "装饰盘子，最后撒上新鲜黑松露碎屑和少许胡椒粉。"],
        nutrition: [["能量", "1800千焦（约430千卡）"], ["饱和脂肪", "8克（40%）"], ["碳水化合物（糖类）", "2克"], ["蛋白质", "10克"]],
      },
      sections: [], related: ["zh-recipe-truffle-tagliolini", "zh-recipe-truffle-ravioli", "zh-recipe-mushroom-soup"],
    },
    "zh-recipe-mushroom-soup": {
      type: "recipe", lang: "zh", eyebrow: "第一道主食", title: "奶油蘑菇浓汤", meta: "RECIPE · 第一道主食",
      image: images.recipeMushroomSoup,
      intro: "一道温暖舒适的开胃菜，非常适合秋日享用。这款奶油蘑菇汤口感顺滑，散发着浓郁的森林香气，搭配金黄酥脆的烤面包丁或淋上少许松露油，风味更佳。",
      recipe: {
        description: "细腻顺滑的蘑菇浓汤以新鲜蘑菇、土豆和蔬菜汤慢煮而成，既温暖舒适，也保留了清晰的森林香气。",
        time: "35分钟", difficulty: "简单", servings: "2人份",
        ingredients: ["300克混合新鲜蘑菇（香菇、牛肝菌或小菇）", "1个中等大小的土豆", "半个洋葱", "1瓣大蒜", "2汤匙特级初榨橄榄油", "400毫升热蔬菜汤", "2汤匙鲜奶油（可选）", "盐和胡椒粉适量", "新鲜欧芹碎，用于装饰", "烤面包丁，用于佐餐"],
        steps: ["准备食材。用湿布擦拭蘑菇，然后切片。土豆去皮，切成小丁。洋葱和大蒜切碎。", "翻炒。在平底锅中加热橄榄油，将洋葱和大蒜翻炒2-3分钟。加入蘑菇和土豆，继续翻炒约5分钟，让各种食材的味道融合。", "烹煮。倒入热蔬菜汤，盖上盖子，用中火慢炖约20分钟，直到蔬菜变软。", "搅拌。离火，用手持搅拌机将所有食材搅拌至顺滑浓稠。如果想要更浓郁的口感，可以加入奶油并搅拌均匀。", "调整口味后即可享用。用盐和胡椒调味，撒上切碎的欧芹装饰，趁热配上金黄酥脆的面包丁或淋上少许松露油。"],
        nutrition: [["能量", "870千焦（约210千卡）"], ["饱和脂肪", "2克（10%）"], ["碳水化合物（糖类）", "14克（其中4克为西葫芦）"], ["蛋白质", "6克"]],
      },
      sections: [], related: ["zh-recipe-truffle-tagliolini", "zh-recipe-truffle-ravioli", "zh-recipe-black-truffle-risotto"],
    },
    "zh-recipe-beef-carpaccio-scallop-truffle": {
      type: "recipe", lang: "zh", eyebrow: "第二道主食", title: "扇贝松露牛肉薄片", meta: "RECIPE · 第二道主食",
      image: images.recipeBeefCarpaccioScallopTruffle,
      intro: "牛肉薄片配扇贝和松露，将生牛肉的浓郁、扇贝的鲜嫩与黑松露的馥郁香气完美融合，是一道优雅而赏心悦目的菜肴。",
      recipe: {
        description: "这道精致菜肴将扇贝的鲜嫩、牛肉薄片的浓郁风味和黑松露的馥郁香气层层融合，既美味又适合用来款待宾客。",
        time: "15分钟", difficulty: "中等", servings: "2人份",
        ingredients: ["120克牛肉薄片（极薄片）", "4个新鲜扇贝", "4-5片黑松露", "1汤匙特级初榨橄榄油", "1茶匙柠檬汁", "盐和胡椒粉适量", "几片混合沙拉蔬菜叶（例如混合蔬菜或芝麻菜）", "几滴绿色酱汁（可选）"],
        steps: ["准备扇贝：在不粘锅中倒入少许油，轻轻加热，将扇贝两面各煎1分钟，保持中心柔软。", "将牛肉薄片均匀地铺在平盘上，形成一层。", "将扇贝放在生牛肉片的中央。", "淋上少许橄榄油和柠檬汁，撒上盐和胡椒粉。最后以黑松露碎屑和沙拉叶装饰，如有需要，再加几滴青莎莎酱或豌豆奶油点缀。"],
        nutrition: [["能量", "850千焦（约200千卡）"], ["饱和脂肪", "2克（10%）"], ["碳水化合物（糖类）", "1克"], ["蛋白质", "22克"]],
      },
      sections: [], related: ["zh-recipe-shrimp-tartare-truffle", "zh-recipe-black-truffle-risotto", "zh-recipe-truffle-tagliolini"],
    },
    "zh-recipe-shrimp-tartare-truffle": {
      type: "recipe", lang: "zh", eyebrow: "第二道主食", title: "脆爽蔬菜松露虾仁鞑靼", meta: "RECIPE · 第二道主食",
      image: images.recipeShrimpTartareTruffle,
      intro: "一道清新精致的菜肴，生虾的鲜甜与蔬菜的爽脆、松露的浓郁香气完美融合，兼具视觉美感和味觉享受。",
      recipe: {
        description: "鲜虾鞑靼配脆爽蔬菜和松露，风味轻盈、层次鲜明，非常适合优雅的午餐或特色海鲜菜单。",
        time: "20分钟", difficulty: "简单", servings: "2人份",
        ingredients: ["200克新鲜红虾，去壳冷冻", "4-5片新鲜黑松露", "6个樱桃番茄", "半根黄瓜", "¼个黄甜椒", "半个酸橙", "1汤匙特级初榨橄榄油", "盐和胡椒粉适量", "几片沙拉叶和一些可食用花卉（用于装饰）"],
        steps: ["准备虾仁：用刀将虾仁切碎，直至达到细腻但不过于浓稠的状态。用橄榄油、青柠汁、盐和胡椒粉调味。", "将黄瓜、小番茄和甜椒切成非常小的丁，拌成色彩鲜艳、口感爽脆的混合蔬菜。", "用糕点切割器组装：底部放上蔬菜，然后将虾仁鞑靼放在上面。", "用松露片、可食用花卉、少许油和几滴香醋浓缩汁或绿色乳液（可选）进行装饰。"],
        nutrition: [["能量", "600千焦（约145千卡）"], ["饱和脂肪", "1克（5%）"], ["碳水化合物（糖类）", "2克"], ["蛋白质", "14克"]],
      },
      sections: [], related: ["zh-recipe-beef-carpaccio-scallop-truffle", "zh-recipe-truffle-ravioli", "zh-recipe-black-truffle-risotto"],
    },
    "zh-recipe-sweet-bread-butter-caviar": {
      type: "recipe", lang: "zh", eyebrow: "甜点食谱", title: "甜面包配黄油和鱼子酱", meta: "RECIPE · 甜品",
      image: images.recipeSweetBreadButterCaviar,
      intro: "甜面包配黄油和鱼子酱是一种优雅的小食，柔软香甜的奶油蛋卷面包、醇厚的黄油与鱼子酱的鲜美风味完美融合。",
      recipe: {
        description: "这道精致小食以甜咸对比带来独特而优雅的味觉体验，是精致开胃菜或美食晚宴的理想佐餐小食。",
        time: "10分钟", difficulty: "简单", servings: "4人份",
        ingredients: ["4块甜面包，例如奶油蛋卷面包", "40克优质黄油（最好是无盐黄油）", "20克鱼子酱（例如鲟鱼子酱或Beluga鱼子酱）", "少许糖粉（可选，用于装饰）"],
        steps: ["将奶油蛋卷面包切成4块立方体或厚片，保持面包柔软。", "将黄油在室温下软化，然后均匀涂抹在面包上。", "将鱼子酱轻轻放在每块涂了黄油的面包上。", "置于优雅的盘子上。如果想增强对比度，可以轻轻撒上糖粉。"],
        nutrition: [["能量", "720千焦（约170千卡）"], ["饱和脂肪", "5克（25%）"], ["碳水化合物（糖类）", "10克"], ["蛋白质", "5克"]],
      },
      sections: [], related: ["zh-recipe-truffle-tiramisu", "zh-recipe-truffle-eggs", "zh-recipe-truffle-toast"],
    },
    "zh-recipe-truffle-tiramisu": {
      type: "recipe", lang: "zh", eyebrow: "甜点食谱", title: "松露提拉米苏", meta: "RECIPE · 甜品",
      image: images.recipeTruffleTiramisu,
      intro: "松露提拉米苏是传统甜点的精致演绎，将经典提拉米苏的绵密奶香与松露的浓郁香气融合，呈现独特而优雅的风味。",
      recipe: {
        description: "一款别具一格、令人惊喜的甜点，以精致口感和高雅格调为餐桌带来意想不到的松露余韵。",
        time: "30分钟", difficulty: "中等", servings: "4人份",
        ingredients: ["250克马斯卡彭奶酪", "2个新鲜鸡蛋（蛋黄和蛋白分开）", "60克糖", "100克手指饼干", "100毫升浓缩咖啡", "1汤匙咖啡利口酒（可选）", "5-6片薄薄的黑松露片", "1茶匙松露油（可选，用于增强香气）", "适量无糖可可粉", "饼干或巧克力片，用于装饰"],
        steps: ["准备咖啡：将咖啡煮好后放凉。如果需要，可以加入利口酒。", "制作马斯卡彭松露奶油：将蛋黄和糖打发至颜色变浅，加入马斯卡彭奶酪并轻轻搅拌。另将蛋白打发至硬性发泡，从底部向上拌入蛋黄混合物，最后淋上少许松露油。", "将浸泡过咖啡的手指饼干和马斯卡彭奶油交替铺在模具或糕点圈中，并在每层之间放入薄薄的松露片。", "最后铺上一层奶油，撒上无糖可可粉，再用松露碎屑和酥脆饼干屑装饰。", "放入冰箱冷藏至少2小时后再食用。"],
        nutrition: [["能量", "1300千焦（约310千卡）"], ["饱和脂肪", "7克（35%）"], ["碳水化合物（糖类）", "20克"], ["蛋白质", "7克"]],
      },
      sections: [], related: ["zh-recipe-sweet-bread-butter-caviar", "zh-recipe-truffle-eggs", "zh-recipe-truffle-toast"],
    },
    "zh-recipe-olive-bruschetta": {
      type: "recipe", lang: "zh", topic: "olive", artClass: "is-olive", eyebrow: "橄榄油食谱", title: "番茄罗勒橄榄油烤面包", meta: "RECIPE · 橄榄油食谱",
      image: images.recipeTruffleToast,
      intro: "用成熟番茄、罗勒和一款风味清晰的特级初榨橄榄油，完成适合中国家庭的简单意式前菜。",
      recipe: {
        description: "番茄的酸甜、烤面包的焦香与橄榄油的果香形成清晰层次。番茄、罗勒和乡村面包在中国市场较易获得，也可以按季节替换。",
        time: "15分钟", difficulty: "简单", servings: "2人份", region: "拉齐奥 / 中部意大利", oil: "果香清新的特级初榨橄榄油", allergens: "含麸质；如使用奶酪需注意牛奶过敏原", substitutions: "法棍可替换为全麦面包；罗勒可用香芹或薄荷少量替代", products: "橄榄油产品目录（以实际库存和标签为准）",
        ingredients: ["4片乡村面包或法棍", "2个成熟番茄", "6片新鲜罗勒", "1瓣蒜", "1.5汤匙特级初榨橄榄油", "少许盐与黑胡椒"],
        steps: ["面包烤至表面金黄，用蒜瓣轻轻擦过。", "番茄切丁，与罗勒、盐和胡椒拌匀，静置3分钟。", "将番茄放在面包上，最后淋橄榄油并立即食用。"],
        nutrition: [["能量", "约720千焦（约170千卡/份）"], ["脂肪", "约7克"], ["碳水化合物", "约23克"], ["蛋白质", "约4克"]],
      },
      sections: [], related: ["zh-recipe-olive-pasta", "zh-recipe-truffle-toast", "zh-academy-olive-oil-basics"],
    },
    "zh-recipe-olive-pasta": {
      type: "recipe", lang: "zh", topic: "olive", artClass: "is-olive", eyebrow: "橄榄油食谱", title: "蒜香橄榄油意面", meta: "RECIPE · 橄榄油食谱",
      image: images.recipeTruffleTagliolini,
      intro: "用蒜、辣椒、欧芹和橄榄油完成一份快速意面，适合作为理解油脂、面水与火候的基础练习。",
      recipe: {
        description: "这道经典意面依靠面水与橄榄油形成轻盈乳化，不需要厚重酱汁。辣椒可按家庭口味减少或省略。",
        time: "20分钟", difficulty: "简单", servings: "2人份", region: "坎帕尼亚 / 南部意大利", oil: "果香中等、带温和辛香的特级初榨橄榄油", allergens: "含麸质；意面可能含蛋，需按包装确认", substitutions: "普通意面可换成全麦或无麸质意面；欧芹可换香菜或罗勒", products: "橄榄油产品目录（以实际库存和标签为准）",
        ingredients: ["180克意面", "3汤匙特级初榨橄榄油", "2瓣蒜", "少量干辣椒", "一小把欧芹", "盐适量"],
        steps: ["将意面放入充足的盐水中煮至略有弹性，保留约100毫升面水。", "小火加热橄榄油与蒜片，加入辣椒，避免蒜片过度变焦。", "加入意面和少量面水，快速翻拌至油与淀粉形成轻盈酱汁。", "关火后加入欧芹，立即装盘并按口味补充橄榄油。"],
        nutrition: [["能量", "约1900千焦（约455千卡/份）"], ["脂肪", "约18克"], ["碳水化合物", "约62克"], ["蛋白质", "约14克"]],
      },
      sections: [], related: ["zh-recipe-olive-bruschetta", "zh-recipe-black-truffle-risotto", "zh-academy-olive-tasting"],
    },
    "zh-recipe-pizza-margherita": {
      type: "recipe", lang: "zh", topic: "pizza", eyebrow: "披萨学院", title: "经典玛格丽特披萨", meta: "RECIPE · 披萨",
      image: images.recipePizza,
      intro: "以耐心发酵的面团、番茄、马苏里拉奶酪与罗勒，完成一张配料克制、饼边轻盈的经典披萨。",
      recipe: {
        description: "玛格丽特披萨让面粉、发酵与高温烘烤成为主角。LuxurEat（露意膳）建议先理解面团状态，再用简洁配料保留麦香与焦香。",
        time: "准备30分钟＋发酵8—24小时", difficulty: "中等", servings: "2张小披萨", region: "坎帕尼亚 / 那不勒斯", allergens: "含麸质与牛奶", substitutions: "可按面粉吸水率微调水量；新鲜马苏里拉可换低水分马苏里拉", products: "披萨产品目录（以实际库存和标签为准）",
        ingredients: ["500克披萨面粉", "325克水", "10克盐", "1克干酵母", "250克番茄碎", "200克马苏里拉奶酪", "罗勒与特级初榨橄榄油"],
        steps: ["混合面粉、水和酵母，静置20分钟后加入盐，揉至面团光滑。", "室温发酵后分割成两份，冷藏熟成8—24小时。", "回温后轻柔展开面团，保留饼边气泡，铺上番茄与奶酪。", "以烤箱可达到的最高温度烘烤至饼边膨起上色，出炉后加入罗勒与橄榄油。"],
        nutrition: [["能量", "约2850千焦（约680千卡/张）"], ["脂肪", "约19克"], ["碳水化合物", "约98克"], ["蛋白质", "约28克"]],
      },
      sections: [], related: ["zh-recipe-olive-pasta", "zh-recipe-gelato-classic", "zh-academy-pizza-dough"],
    },
    "zh-recipe-gelato-classic": {
      type: "recipe", lang: "zh", topic: "gelato", eyebrow: "意式手工冰淇淋", title: "经典意式手工冰淇淋", meta: "RECIPE · 意式手工冰淇淋",
      image: images.recipeGelato,
      intro: "以均衡甜度、细腻质地与清晰风味呈现经典意式手工冰淇淋。",
      recipe: {
        description: "一份平衡的意式手工冰淇淋配方，需要准确控制糖、乳脂、固形物与冷冻温度，让真实原料保持清楚。",
        time: "准备35分钟＋冷藏4小时", difficulty: "中等", servings: "6人份", region: "意大利", allergens: "含牛奶", substitutions: "可按配方结构选用适合的乳制品基底；无冰淇淋机时需分次冷冻搅拌", products: "意式手工冰淇淋产品目录（以实际库存和标签为准）",
        ingredients: ["550克全脂牛奶", "150克淡奶油", "100克糖", "30克脱脂奶粉", "一小撮盐"],
        steps: ["混合糖与奶粉，缓慢加入牛奶和淡奶油并搅匀。", "加热至82°C左右后离火，加入盐并充分乳化。", "快速降温并冷藏至少4小时，让基底成熟。", "倒入冰淇淋机搅冻，完成后短时冷冻定型；食用前稍微回温。"],
        nutrition: [["能量", "约870千焦（约208千卡/份）"], ["脂肪", "约12克"], ["碳水化合物", "约20克"], ["蛋白质", "约6克"]],
      },
      sections: [], related: ["zh-recipe-pizza-margherita", "zh-recipe-truffle-tiramisu", "zh-academy-gelato-basics"],
    },
    "zh-truffle": {
      lang: "zh", eyebrow: "产业观察", title: "世界鱼子酱版图：主要生产国与产业发展", meta: "ATLAS · 全球产地",
      image: images.caviarWorld,
      intro: "如今，鱼子酱生产已经成为一个全球性产业。目前，世界各地约有50家鱼子酱生产商，而且这一数字仍在持续增长。",
      opening: ["中国是全球最大的鱼子酱生产国，意大利、法国、伊朗和美国也是重要的生产地区。根据英国市场研究公司Technavio当时的分析，全球鱼子酱市场规模预计在2021年达到15.5亿美元，与2016年相比增长约75%。"],
      tocLabels: ["中国", "意大利", "伊朗", "法国", "北美", "俄罗斯", "阿联酋", "西班牙", "全球化发展的鱼子酱产业"],
      sections: [
        ["中国：全球最大的鱼子酱生产国", ["中国约占全球鱼子酱产量的60%，是目前世界上最大的鱼子酱生产国。", "位于浙江千岛湖的Kaluga Queen是全球规模最大的鱼子酱生产企业。世界上一半以上的商业鱼子酱养殖场位于中国。2020年，中国国内鱼子酱消费量约为100吨。", "2012年至2017年期间，中国出口了近150吨鱼子酱，并逐渐成为国际市场的重要供应国，客户包括德国汉莎航空等大型企业。", "同一时期，中国对美国的鱼子酱出口量增长了五倍。随着批发价格下降，中国鱼子酱在国际市场上的竞争力也不断提高。"]],
        ["意大利：以布雷西亚为核心的养殖产业", ["意大利的鱼子酱生产最初依赖波河中的鲟鱼，如今则主要来自受控养殖场。", "布雷西亚省是意大利鱼子酱产业的核心地区，年产量约为25吨。其中，Calvisius公司的养殖鱼子酱产量约占全球总产量的15%。"]],
        ["伊朗：历史悠久的鱼子酱传统", ["伊朗拥有悠久的鱼子酱生产历史，其传统可以追溯到古代。", "2010年，伊朗与俄罗斯达成协议，禁止在里海捕捞鲟鱼。此后，伊朗的鱼子酱生产逐渐转向数十家人工养殖场。", "伊朗最著名的产品是Beluga鱼子酱，以柔软的质地和细腻的黄油香气而闻名。2016年，在多年禁止进口之后，美国重新开始进口伊朗鱼子酱。"]],
        ["法国：阿基坦地区的精细生产", ["法国的鱼子酱生产始于1920年，最早集中在吉伦特河右岸，产量很快达到每年5吨。", "如今，阿基坦地区已经成为法国鱼子酱生产的中心，年产量约为24吨。法国八家主要生产商中，有六家位于这一地区。", "当地企业主要加工西伯利亚鲟，即Acipenser baerii的鱼卵，并采用低盐干腌方式，以减少盐分对鱼卵天然风味的影响。"]],
        ["北美：从传统出口地到现代养殖中心", ["20世纪初，北美曾是向欧洲出口鱼子酱的主要地区。", "如今，美国约70%至80%的鱼子酱产量集中在北加利福尼亚州。加拿大的Northern Divine则以生产高品质有机鱼子酱而受到关注。"]],
        ["俄罗斯：保护鲟鱼资源的新生产方式", ["为了保护鲟鱼种群，俄罗斯自2005年起禁止在伏尔加河和里海捕捞鲟鱼。", "Russian Caviar House约占俄罗斯鱼子酱产量的70%。该公司采用无需杀死鲟鱼的鱼卵采集技术，在进行鱼子酱生产的同时，减少对鲟鱼种群的影响。"]],
        ["阿联酋：大型室内鱼子酱生产基地", ["阿布扎比拥有Royal Caviar Company，这是全球最大的室内鱼子酱生产设施，预计年产能力可达到35吨。", "该生产基地采用德国先进技术和高度自动化系统，以控制养殖环境，并为鲟鱼提供稳定的生长条件。"]],
        ["西班牙：两座主要鱼子酱养殖场", ["西班牙主要拥有两座鱼子酱养殖场，分别是位于比利牛斯山地区的Caviar Nacarii，以及位于格拉纳达的Caviar Riofrío。", "两家企业均使用亚得里亚海鲟，即Acipenser naccarii，生产高品质鱼子酱。"]],
        ["全球化发展的鱼子酱产业", ["从中国的大规模生产，到意大利和法国的精细加工，再到俄罗斯和阿联酋的新型养殖技术，鱼子酱产业已经不再局限于里海周边地区。", "人工养殖、生产技术和国际贸易的发展，使越来越多国家参与到鱼子酱市场中，也推动这一传统高端食品逐渐形成更加多元化的全球产业格局。"]],
      ],
      quote: "人工养殖、生产技术和国际贸易的发展，使越来越多国家参与到鱼子酱市场中，也推动这一传统高端食品逐渐形成更加多元化的全球产业格局。",
      related: ["zh-harvest", "zh-service", "zh-malossol"],
    },
    "zh-service": {
      lang: "zh", eyebrow: "市场洞察", title: "意大利鱼子酱市场：欧洲领先的生产中心与全球出口力量", meta: "MARKET · 意大利",
      image: images.italianCaviar,
      intro: "意大利鱼子酱市场近年来保持增长。根据意大利农业联合会旗下水产养殖协会API的数据，2022年意大利鱼子酱产量约为62吨，与2020年相比增长超过30%。这一增长主要由出口市场推动。",
      opening: ["在全球范围内，鱼子酱产业同样呈现稳定增长趋势，预计复合年增长率约为9.59%。相关市场预测显示，全球鱼子酱市场规模在2024年约为8亿美元，并可能在2029年增长至12.6亿美元，整体增幅约为57.5%。"],
      sections: [
        ["全球鱼子酱市场的增长动力", ["鱼子酱作为一种高端食品，其市场需求与经济发展、居民收入和高端消费趋势密切相关。", "高收入人群的增加，推动了奢侈品和高端食品的消费需求。随着多个国家经济复苏和全球财富水平提升，消费者对精致食品、国际饮食文化和高级餐饮体验的兴趣也在不断增强。", "对于富裕消费者而言，鱼子酱不仅是一种食品，也常被视为身份、品位和精致生活方式的象征。"]],
        ["意大利鱼子酱市场规模", ["2022年，意大利企业共生产约62吨鱼子酱，而全球总产量超过600吨。根据文中数据，意大利目前是欧洲最大的鱼子酱生产国，同时也是仅次于中国的全球第二大生产国。", "意大利最重要的鱼子酱生产中心位于伦巴第大区布雷西亚省的Calvisano。除此之外，威尼托、伦巴第和皮埃蒙特也是意大利鱼子酱产业较为集中的地区。", "通过分析主要生产企业的营业收入，意大利鱼子酱市场在2020年的估值约为4,747.5万欧元，2022年增长至约6,233.2万欧元，两年间增长31.3%。"]],
        ["以出口为主的市场结构", ["虽然意大利拥有较高的鱼子酱产量，但国内消费只占较小比例，大部分产品销往海外市场。", "意大利鱼子酱的主要销售渠道包括：", { type: "quote", lines: ["高端餐厅和豪华酒店；", "精品食品店和高档熟食店；", "高端葡萄酒商店；", "邮轮和专业食品精品店；", "电商平台；", "高端餐饮供应商；", "婚礼和大型活动餐饮服务。"] }, "这种以出口和高端渠道为核心的市场结构，使意大利鱼子酱在全球精品食品领域保持较强影响力。"]],
        ["鱼子酱产业链", ["鱼子酱从鲟鱼养殖到最终销售，需要经过一系列专业环节。"]],
        ["繁育与孵化", ["生产企业需要重视鲟鱼的遗传特征、健康状况和种苗质量，并在受控环境中完成繁育与孵化。"]],
        ["水产养殖", ["幼年鲟鱼在专业养殖设施中生长，直到达到能够产卵的成熟阶段。由于鲟鱼成熟周期较长，养殖过程需要持续投入时间、技术和资源。"]],
        ["鱼卵采集", ["成熟鱼卵需要通过精细操作进行采集，以最大程度保持完整度、口感和品质。"]],
        ["加工与熟成", ["鱼卵经过清洗、盐渍和包装等步骤。不同的盐分比例和加工技术，会影响鱼子酱的风味、质地和保存时间。"]],
        ["可持续包装", ["越来越多企业开始采用可回收或可降解包装材料，以减少产品对环境造成的影响。"]],
        ["质量控制与认证", ["每一批产品都需要经过严格检查，并建立完整的可追溯体系，以确保食品安全、产地真实性和品质稳定。"]],
        ["分销", ["最终产品通过高端零售、电商平台、餐厅、酒店和专业食品渠道进入市场。"]],
        ["意大利市场上的主要鱼子酱类型", [{ type: "strong", text: "Beluga" }, "Beluga鱼子酱来自欧洲鳇，即Acipenser huso huso。它通常被认为是最珍贵、价格最高的鱼子酱，具有柔滑、浓郁和类似黄油的风味。", { type: "strong", text: "Oscetra" }, "Oscetra鱼子酱通常来自俄罗斯鲟，颗粒较为紧实，味道浓郁，具有较明显的坚果和海洋风味。", { type: "strong", text: "Sevruga" }, "Sevruga鱼子酱颗粒较小，但味道更加集中和强烈。", { type: "strong", text: "白鲟鱼子酱" }, "白鲟鱼子酱来自Acipenser transmontanus，鱼卵颜色较深，风味相对细腻。", { type: "strong", text: "西伯利亚鲟鱼子酱" }, "西伯利亚鲟，即Acipenser baerii，所生产的鱼卵颜色从棕色到黑色不等，具有轻微的咸鲜余味。", { type: "strong", text: "Kaluga" }, "Kaluga通常是一种高端杂交鱼子酱，颜色可以从棕色变化至金色，口感和品质特点与Beluga较为相似。"]],
        ["市场趋势与未来发展", ["在经济不确定时期，高端产品有时仍能保持较强吸引力。鱼子酱凭借其稀缺性、仪式感和奢华形象，继续在精品食品市场中占据重要位置。", "社交媒体也进一步强化了鱼子酱作为精致生活和高级餐饮象征的形象，并吸引更多年轻消费者关注这一传统食品。", "与此同时，人工养殖技术的发展提高了鱼子酱的供应量，也使部分产品的价格变得更加容易接受。鱼子酱正在逐渐摆脱只面向极少数消费者的形象，进入更多餐饮、零售和节庆消费场景。", "不过，即使市场可及性不断提高，鱼子酱仍然保留着高端、稀有和具有象征意义的产品定位。对于意大利而言，成熟的养殖技术、完整的产业链、稳定的出口渠道和较高的国际品牌认可度，将继续成为其鱼子酱产业发展的重要优势。"]],
      ],
      quote: "对于意大利而言，成熟的养殖技术、完整的产业链、稳定的出口渠道和较高的国际品牌认可度，将继续成为其鱼子酱产业发展的重要优势。",
      related: ["zh-champagne", "zh-mother-of-pearl", "zh-harvest"],
    },
    "zh-malossol": {
      lang: "zh", eyebrow: "品鉴礼仪", title: "鱼子酱礼仪：如何优雅地品尝鱼子酱", meta: "RITUAL · 品鉴指南",
      image: images.caviarEtiquette,
      intro: "鱼子酱不仅是一种珍贵食材，也拥有一套独特的品尝礼仪。无论是在朋友间的轻松晚餐中，还是在更加正式的场合里，鱼子酱都适合以从容而优雅的方式享用。",
      sections: [
        ["优雅与传统", ["鱼子酱曾经是国王和皇室享用的珍品，因此，当人们选择这种高档食材时，往往也会以更加讲究的方式品尝。", "保持优雅的举止并遵循适当的餐桌礼仪，已经成为鱼子酱文化的重要组成部分。这些传统不仅体现对食材的尊重，也让品尝过程更具仪式感。"]],
        ["控制食用量", ["当鱼子酱作为开胃菜供应时，过量食用通常被认为不够优雅。", "一次食用量最好不要超过约2盎司，相当于大约两勺。鱼子酱更适合少量、慢慢地品尝，而不是一次吃下太多。"]],
        ["正确的品尝方式", ["品尝鱼子酱时不建议直接咀嚼，因为这样可能会失去一部分细腻的风味。", "更合适的方式是让鱼卵轻轻滑过上颚，感受其柔滑和奶油般的质地，再让鱼卵在口中自然破开，释放其中的味道。"]],
        ["小口慢品", ["鱼子酱最好以小口的方式享用。每一口都应缓慢而专注，不要快速吞咽。", "对于第一次品尝鱼子酱的人来说，半茶匙是较为理想的分量。这个分量能够让人充分感受鱼子酱的口感和风味，同时不会因为食用过多而影响体验。"]],
      ],
      quote: "鱼子酱更适合少量、慢慢地品尝，而不是一次吃下太多。",
      related: ["zh-harvest", "zh-service", "zh-champagne"],
    },
    "zh-champagne": {
      lang: "zh", eyebrow: "品鉴与文化", title: "鱼子酱感官分析", meta: "品鉴 · 质量评估",
      image: images.sensoryAnalysis,
      archive: "感官分析",
      intro: "鱼子酱的感官分析结合视觉、嗅觉与味觉判断，用于辨识鱼卵的品质等级、颗粒状态、香气、风味与整体表现。",
      sections: [
        ["鱼子酱质量等级", [
          "一级：最高品质等级，鱼卵大而完整、紧实饱满，风味细腻，颜色较浅。",
          "二级：新鲜鱼子酱，鱼卵尺寸标准，风味良好，色调较深。",
          "三级：压制鱼子酱，又称 payusnaya，由破损鱼卵制成，对颜色和尺寸没有精确分类。",
        ]],
        ["感官分析的方法", ["品鉴鱼子酱时，不应将其放在小点心上或使用餐具，而是直接从手上品尝。专业品鉴师会将少量鱼子酱放在拇指与食指之间，先观察鱼卵再进行品尝。鱼卵应当紧实饱满；如果过软或塌陷，可能意味着品质不佳。"]],
        ["香气与风味", ["每一种鱼子酱都有独特的风味特征，即使同一品种的不同批次也可能存在差异。专业人士会使用类似侍酒师的精细词汇，例如草本、清新或紫罗兰气息，来描述品鉴印象。"]],
        ["低品质的迹象", ["苦味、酸败味或过度咸味，以及软烂或黏度过高的鱼卵，都是鱼子酱存在缺陷或储存不当的迹象。"]],
        ["视觉评估", [
          "颜色：根据鲟鱼品种与年龄不同，鱼卵颜色可以从黑色、灰色、棕色延伸至金色。",
          "外观：需要评估鱼卵的尺寸、均匀度与光泽；光泽是新鲜度的重要指标。Beluga鱼子酱尤其重视较大的颗粒。",
        ]],
        ["嗅觉评估", ["鱼子酱只应带有淡淡香气和轻微海洋气息。发酵鱼或鲱鱼般的强烈气味意味着储存不当，不应继续食用。"]],
        ["味觉评估", [
          "质地：鱼卵应当柔软但紧实，不能过度黏稠或水分过多。",
          "风味：应当平衡协调，并带有清新海洋气息；苦味或酸味通常表示产品存在缺陷。",
        ]],
        ["综合评估", ["鱼子酱的感官分析结合视觉、嗅觉和味觉要素，以确定其品质等级。每一个品种都有自身特点，应当作为一个整体来识别与欣赏。"]],
        ["搭配与文化", ["了解不同种类的鱼子酱，既能启发富有创意的搭配，也有助于尊重经典烹饪传统。"]],
        ["鱼子酱的营养特性", [
          "从营养角度看，鱼子酱也具有较高价值，富含Omega-3、硒、维生素和蛋白质。",
          "Omega-3：有助于胶原蛋白生成、伤口愈合、减轻衰老迹象、改善脑功能并减少炎症。",
          "硒：一种强效抗氧化物，有助于刺激免疫系统、支持生育能力，并帮助预防DNA损伤和癌症。",
          "热量：100克新鲜鱼子酱约提供264千卡，其中约61%来自脂肪，33%来自蛋白质。",
          "维生素：富含维生素B12，同时含有维生素D、A、B1、B2、B5、B6和B9，这些营养素参与多种重要代谢过程。",
          "矿物质：含有镁、铁、钠、磷和钙，对整体健康十分重要。",
          "脂肪：含有饱和与不饱和健康脂肪，对能量供给和神经系统健康具有重要作用。",
          "蛋白质与氨基酸：可满足约49%的每日蛋白质需求，并含有赖氨酸、亮氨酸、色氨酸、缬氨酸和苏氨酸等参与代谢的重要氨基酸。",
        ]],
        ["结语", ["鱼子酱的感官分析需要经验、敏感度和对细节的关注。通过这一过程，人们可以充分理解每一种鱼子酱的独特品质，并找到最能提升其风味的搭配方式。"]],
      ],
      quote: "感官分析让视觉、嗅觉与味觉共同呈现每一种鱼子酱的独特品质。",
      related: ["zh-mother-of-pearl", "zh-malossol", "zh-service"],
    },
    "zh-mother-of-pearl": {
      lang: "zh", eyebrow: "品质与溯源", title: "鱼子酱标签：品质与透明度", meta: "溯源 · 标签指南",
      image: images.caviarLabeling,
      archive: "标签溯源",
      intro: "鱼子酱标签包含判断产品品质与来源所必需的信息，包括鲟鱼物种代码、养殖方式、原产国、采收年份、生产商、加工设施与批次编号。",
      opening: ["物种代码和国家缩写遵循国际标准，以保障鱼子酱贸易中的可追溯性、合法性与可持续性。"],
      sections: [
        ["鱼子酱标签包含哪些内容", [
          "包装信息是验证产品真实性与品质不可缺少的依据，主要内容包括：",
          "物种代码：每一种鲟鱼都有唯一代码，例如HUS代表Beluga，GUE代表Oscetra。",
          "鱼子酱来源：自1998年以来，野生鲟鱼捕捞已被禁止，因此市场上的合法鱼子酱均来自养殖场，并以C标识；否则即属非法产品，且没有有效的CITES标签。",
          "生产国：通过官方国家缩写标明，例如IT代表意大利。",
          "生产年份：标明鱼子酱采收的年份。",
          "生产设施：用于识别鱼子酱加工与包装的地点。",
          "批次编号：能够追溯到产品的确切来源批次。",
          "凭借这些信息，消费者可以作出更明智的选择，并为鲟鱼保护作出贡献。",
        ]],
        ["鱼子酱贸易的合法性与可持续性", ["从认证养殖场购买鱼子酱，有助于支持透明的市场和对环境负责的生产方式。CaviarEat倡导安全、合法的贸易，抵制偷猎，并保护自然栖息地中的鲟鱼。"]],
      ],
      sectionMedia: [[{ src: images.caviarLabelDiagram, alt: "鱼子酱标签代码、来源、国家、生产年份、加工设施与批次编号示意图" }]],
      quote: "透明标签让消费者能够验证真实性、追溯来源，并支持合法而可持续的鱼子酱贸易。",
      related: ["zh-champagne", "zh-truffle", "zh-service"],
    },
    "en-about": {
      lang: "en", eyebrow: "About Us", title: "LuxurEat (露意膳)｜From an Italian Family Table to the Global Gourmet Landscape", meta: "MAISON · Brand Story",
      image: images.aboutRoberto,
      intro: "The LuxurEat (露意膳) story begins with flavors passed down through generations at an Italian family table.",
      opening: [
        "Founder Roberto Ugolini grew up immersed in Italian food culture. His grandfather Renato was a self-taught gourmet devoted to studying food, while his mother Renata carried a deep passion for traditional Italian cooking. In this family environment, Roberto developed an enduring respect for natural ingredients, regional recipes, and food quality.",
      ],
      sections: [
        ["A Gourmet Venture Born from Truffles", [
          "Roberto began by trading premium truffles, gradually turning his personal passion for fine food into an international venture.",
          "LuxurEat (露意膳) grew from the industry experience established through TrufflEat, expanding from truffles into caviar, premium condiments, and other specialty foods. While preserving Italian flavor and artisanal quality, the brand uses product innovation to bring exceptional ingredients into a wider range of restaurant and everyday settings.",
          "In 2018, the team opened TruffleBar & Restaurant in Bangkok, introducing Italian truffle culture to the Asian dining market. Although the restaurant closed in 2020 because of pandemic restrictions, the project became an important stage in the brand's international development and helped move the team toward global sales, operating partnerships, and brand expansion.",
        ]],
        ["From Italy to the World", [
          "Today, LuxurEat (露意膳) is an international group specializing in truffles, caviar, and premium foods, with companies or operations in Italy, the United States, Thailand, and China, supported by partners and distribution channels across Europe, Asia, the Middle East, and the United States.",
          "LuxurEat (露意膳) is a Chinese company established. It operates from Shanghai and is not a representative office; it directly manages local imports, distribution, customer service, and commercial development in China.",
          "The group includes TrufflEat, CaviarEat, LuxurEat (露意膳), Ugolini Gourmet, and other brands and product lines, serving restaurants, retailers, distributors, and international food companies through product sales and commercial partnerships.",
          "Alongside its own brands, LuxurEat (露意膳) provides private-label and OEM services, including recipe development, packaging design, Italian production, and international export, helping partners turn an idea into a commercially viable solution for different markets.",
        ]],
        ["Tradition, Innovation, and a Global Vision", [
          "For LuxurEat (露意膳), Made in Italy is more than a statement of origin. It represents respect for ingredients, craftsmanship, and culinary culture.",
          "Rooted in Italian food tradition, the brand also responds to sustainability and the needs of international markets. LuxurEat (露意膳) offers a selection of gluten-free, vegan, vegetarian, reduced-calorie products and products formulated with attention to specific allergens; Halal, Kosher, and other characteristics apply only to relevant products and must be verified in their product information and certification marks.",
          "From the memories of one Italian family table to a premium food business spanning countries and regions, LuxurEat (露意膳) continues to pursue one goal: bringing authentic Italian flavor, exceptional ingredients, and innovative products to the world, so that traditional cuisine can thrive in new markets and new ways of living.",
        ]],
      ],
      sectionMedia: [
        [
          { src: images.aboutDining, alt: "The Bangkok TruffleBar & Restaurant dining room overlooking the city" },
          { src: images.aboutBar, alt: "The bar at TruffleBar & Restaurant in Bangkok" },
        ],
        [
          { src: images.aboutProducts, alt: "LuxurEat (露意膳) truffle product collection" },
          { src: images.aboutMap, alt: "LuxurEat (露意膳) global business map" },
        ],
        [
          { src: images.aboutCaviar, alt: "LuxurEat (露意膳) white sturgeon caviar" },
          { src: images.aboutShrimp, alt: "LuxurEat (露意膳) shrimp tartare products" },
        ],
      ],
      quote: "Bringing authentic Italian flavor, exceptional ingredients, and innovative products to the world.",
      related: ["en-harvest", "en-truffle", "en-service"],
    },
    "en-harvest": {
      lang: "en", eyebrow: "Brand Philosophy", title: "The Philosophy and Values of LuxurEat (露意膳)", meta: "MAISON · Philosophy & Values",
      image: images.philosophy,
      coverPosition: "center top",
      cardImage: images.philosophy,
      cardPosition: "center 58%",
      cardEyebrow: "Brand Heritage",
      cardTitle: "The Way of True Flavor",
      cardText: "Honoring Italian craftsmanship, selecting outstanding seasonal ingredients, and protecting flavor and quality through natural methods, LuxurEat (露意膳) expresses respect for the land, nature, and the future through responsible sourcing and packaging.\n\nLuxurEat (露意膳) is rooted in tradition, guided by selection, committed to responsible innovation, and accountable to sustainability. From premium ingredients to preparation and packaging, every step remains faithful to Italian food culture while respecting the future of nature and its ingredients.",
      intro: "LuxurEat (露意膳) is an international group focused on gastronomy, specializing in truffles, caviar, and premium foods.",
      opening: ["The group grew from the experience accumulated through TrufflEat and gradually developed into a global enterprise active in the production, distribution, and development of gourmet foods. Family heritage, a passion for gastronomy, and an entrepreneurial vision came together to create LuxurEat (露意膳)."],
      sections: [
        ["Our Vision", ["LuxurEat (露意膳)'s vision is rooted in a profound respect for Italian culinary tradition and built on three core principles: responsible innovation, tangible sustainability, and responsible sourcing.", { type: "quote", bold: [0, 2, 4], lines: ["Tradition", "We are deeply rooted in Italian food culture and value traditions, experience, and craftsmanship passed down through generations. Product development and selection emphasize quality, ingredients, and production methods; origin and process details must be verified in the relevant product information.", "Innovation", "We continue to explore products for different dietary choices. LuxurEat (露意膳) offers a selection of gluten-free, vegan, vegetarian, reduced-calorie products and products formulated with attention to specific allergens. The characteristics of each product must be verified in its relevant product information.", "Sustainability", "Through ethical and inclusive products and services, we promote respect for the environment, biodiversity, and food diversity. We support sustainable agriculture; Halal, Kosher, vegan, and other characteristics apply only to products carrying the relevant information or certification."] }]],
        ["Our Philosophy", ["For LuxurEat (露意膳), true gastronomy comes not only from precious ingredients, but also from a shared commitment to tradition, quality, clear information, and environmental responsibility. Our philosophy runs through every step, from ingredient selection and product preparation to final packaging.", { type: "quote", bold: [0, 2, 4, 6], lines: ["History", "We honor recipes and production techniques passed down through generations of Italian masters. Tradition is not simply a repetition of the past, but experience and judgment refined over time, allowing ingredients to retain their original purity, layers, and depth.", "Selection", "Quality begins with ingredients. We maintain rigorous selection standards and pay close attention to origin, season, and natural condition.", "Clear Information", "We value clear ingredient, nutrition, allergen, and serving information. Each product's formulation, nutrition facts, and suitability details must be verified on its label and in its product information.", "Sustainability", "Every ingredient comes from the land and nature. Through ethical sourcing and more environmentally responsible packaging choices, we reduce our impact and express respect for the land, ecosystems, and the future through concrete action."] }, "These values guide every company decision, from selecting premium ingredients and supporting sustainable agriculture to aligning products with applicable international food standards.", "With integrity, authenticity, and excellence, LuxurEat (露意膳) is committed to offering consumers around the world a gourmet experience that carries Italian tradition forward with a future-facing vision."]],
      ],
      quote: "With integrity, authenticity, and excellence, LuxurEat (露意膳) carries Italian tradition forward with a future-facing vision.",
      related: ["en-service", "en-malossol", "en-champagne"],
    },
    "en-harvest-craft": {
      lang: "en", eyebrow: "Maison Heritage", title: "The Art of the Harvest", meta: "MASTERCLASS · October 2024",
      image: images.harvest,
      intro: "Caviar harvesting is an act of judgment. Temperature, pearl tension, maturity, salting, and aroma must meet in a narrow window; once that window closes, no amount of service theatre can restore the first truth of the roe.",
      sections: [
        ["The Heritage of the Sturgeon", ["Every selection begins with traceability. We study water source, age, maturity, pearl size, oil ratio, and the first aroma released after opening. Only when those signals align does a lot enter the LuxurEat (露意膳) selection.", "In true tasting, luxury is not intensity but clarity. The best pearls dissolve quickly while keeping a delicate tension; ocean salinity appears first, followed by cream, hazelnut, and a long mineral finish."]],
        ["The Malossol Method", ["Low salt is not a slogan. It is a vote of confidence in the roe. Salt should lift the flavor, not hide it. The lower the salt, the more the cold chain, timing, and maturity must be exact.", "Every opening service is recorded with temperature notes and tasting feedback. Those quiet records allow the next dinner to repeat the same stability."]],
        ["The Last Judgment at the Table", ["Once caviar leaves the cellar, the final test begins. Grey, amber, or deep golden pearls must be observed under soft light; harsh light can distort color, while a warm room can loosen the oils too quickly.", "Our preferred service rhythm is slow and precise: observe the color, smell the first marine note, then use mother-of-pearl to let the flavor unfold naturally."]],
      ],
      quote: "Harvesting is the fastest moment that still requires the slowest judgment.",
      related: ["en-service", "en-malossol", "en-champagne"],
    },
    "en-recipe-truffle-eggs": {
      type: "recipe", lang: "en", eyebrow: "Breakfast Recipe", title: "Truffle Eggs", meta: "RECIPE · Breakfast",
      image: images.recipeTruffleEggs,
      intro: "Truffle eggs bring together the freshness of eggs and the unmistakable aroma of truffle. Ideal for breakfast, brunch, or a refined appetizer, this quick recipe delivers an elegant texture and deeply fragrant finish.",
      recipe: {
        description: "A refined breakfast that combines the simplicity of fried eggs with the elegant intensity of truffle. Quick to prepare yet full of character, it is a beautiful way to begin the day.",
        time: "10 min", difficulty: "Easy", servings: "1 serving",
        ingredients: ["2 fresh eggs", "1 teaspoon extra-virgin olive oil or a small knob of butter", "4–5 thin slices of black truffle", "A few fresh parsley leaves (optional)"],
        steps: ["Heat a little oil or a small knob of butter in a non-stick pan.", "Crack in the eggs gently and cook over medium-low heat, keeping the yolks soft.", "Season with a little salt and pepper.", "Just before the eggs are ready, arrange the truffle slices on top and let the heat release their aroma."],
        nutrition: [["Energy", "950 kJ (about 225 kcal)"], ["Saturated fat", "5 g (25%)"], ["Carbohydrates (sugars)", "1 g"], ["Protein", "12 g"]],
      },
      sections: [], related: ["en-recipe-truffle-toast", "en-harvest-craft", "en-malossol"],
    },
    "en-recipe-truffle-toast": {
      type: "recipe", lang: "en", eyebrow: "Breakfast Recipe", title: "Poached Egg and Truffle Toast", meta: "RECIPE · Breakfast",
      image: images.recipeTruffleToast,
      intro: "Crisp toast with poached egg and truffle is a refined table bite, perfect for entertaining or an elegant Sunday brunch. Golden bread, silky egg, and deep truffle aroma create an irresistible balance of flavor and texture.",
      recipe: {
        description: "A polished appetizer for brunch or a gourmet aperitivo. The softness of poached egg meets crisp bread and the unmistakable aroma of truffle in a richly layered bite.",
        time: "15 min", difficulty: "Medium", servings: "2 servings",
        ingredients: ["4 slices country bread or baguette", "2 fresh eggs", "1 tablespoon white vinegar", "2 tablespoons fresh spreadable cheese, such as robiola or ricotta", "5–6 thin slices of black truffle", "1 teaspoon capers (optional)", "Fresh basil leaves", "Extra-virgin olive oil, as needed", "Salt and pepper, to taste"],
        steps: ["Toast the bread until crisp in a hot grill pan or non-stick pan.", "Poach the eggs: bring a pan of water and the vinegar to a gentle boil. Stir the water into a whirlpool, slide an egg into the center, and cook for 2–3 minutes until the white is set and the yolk remains soft.", "Assemble the toast: spread the cheese over each slice, add the poached egg, and finish with the truffle slices.", "Garnish with a little olive oil, capers if using, and fresh basil. Season lightly with salt and pepper."],
        nutrition: [["Energy", "1,300 kJ (about 310 kcal)"], ["Saturated fat", "6 g (30%)"], ["Carbohydrates (sugars)", "3 g"], ["Protein", "12 g"]],
      },
      sections: [], related: ["en-recipe-truffle-eggs", "en-harvest-craft", "en-malossol"],
    },
    "en-recipe-truffle-tagliolini": {
      type: "recipe", lang: "en", eyebrow: "First Courses", title: "Tagliolini with White or Black Truffle", meta: "RECIPE · First Courses",
      image: images.recipeTruffleTagliolini,
      intro: "An elegant, memorable first course made for special occasions. Fresh egg pasta is tossed with butter and Parmesan, then finished generously with white or black truffle for an unforgettable aroma.",
      recipe: {
        description: "An elegant and fragrant first course for special occasions, combining tender filled pasta, a creamy truffle sauce, and fresh black truffle shavings.",
        time: "25 min", difficulty: "Medium", servings: "2 servings",
        ingredients: ["250 g filled pasta, with cheese or mushroom filling", "30 g butter", "2 tablespoons fresh cream", "4–5 slices fresh black truffle", "1 tablespoon grated Parmesan", "Fresh chopped parsley, as needed", "Salt and pepper, to taste"],
        steps: ["Bring a pan of salted water to the boil and cook the pasta according to the package directions, or for 3–4 minutes if fresh.", "Melt the butter over low heat. Add the cream and one tablespoon of pasta water, stirring until smooth and thickened.", "Drain the pasta gently and add it to the sauce. Stir in the Parmesan and toss for 1–2 minutes.", "Plate and finish with fresh black truffle slices and a little chopped parsley."],
        nutrition: [["Energy", "1,750 kJ (about 420 kcal)"], ["Saturated fat", "9 g (45%)"], ["Carbohydrates (sugars)", "3 g"], ["Protein", "14 g"]],
      },
      sections: [], related: ["en-recipe-truffle-ravioli", "en-recipe-black-truffle-risotto", "en-recipe-mushroom-soup"],
    },
    "en-recipe-truffle-ravioli": {
      type: "recipe", lang: "en", eyebrow: "First Courses", title: "Ravioli with Truffle Cream Sauce", meta: "RECIPE · First Courses",
      image: images.recipeTruffleRavioli,
      intro: "Ravioli with truffle cream sauce brings together the delicacy of fresh pasta and the unmistakable aroma of truffle.",
      recipe: {
        description: "Simple to prepare yet impressive, this is an ideal dish for special occasions. Tender filled pasta is coated in a rich truffle cream sauce and finished with fresh black truffle.",
        time: "25 min", difficulty: "Medium", servings: "2 servings",
        ingredients: ["250 g ravioli, with cheese or mushroom filling", "30 g butter", "2 tablespoons fresh cream", "4–5 slices fresh black truffle", "1 tablespoon grated Parmesan", "Fresh chopped parsley, as needed", "Salt and pepper, to taste"],
        steps: ["Bring a pan of salted water to the boil and cook the ravioli according to the package directions, or for 3–4 minutes if fresh.", "Melt the butter over low heat. Add the cream and one tablespoon of pasta water, stirring until smooth and thickened.", "Drain the ravioli gently and add them to the sauce. Stir in the Parmesan and toss for 1–2 minutes.", "Plate and finish with fresh black truffle slices and a little chopped parsley."],
        nutrition: [["Energy", "1,750 kJ (about 420 kcal)"], ["Saturated fat", "9 g (45%)"], ["Carbohydrates (sugars)", "3 g"], ["Protein", "14 g"]],
      },
      sections: [], related: ["en-recipe-truffle-tagliolini", "en-recipe-black-truffle-risotto", "en-recipe-mushroom-soup"],
    },
    "en-recipe-black-truffle-risotto": {
      type: "recipe", lang: "en", eyebrow: "First Courses", title: "Black Truffle Risotto", meta: "RECIPE · First Courses",
      image: images.recipeBlackTruffleRisotto,
      intro: "Black truffle risotto combines the silky richness of creamy rice with the intense flavor of truffle in a dish that is simple to make yet refined.",
      recipe: {
        description: "A smooth, elegant first course in which delicate Carnaroli rice meets the deep fragrance of truffle, ideal for a special dinner or celebration.",
        time: "30 min", difficulty: "Medium", servings: "2 servings",
        ingredients: ["160 g Carnaroli rice", "20 g butter", "1 tablespoon extra-virgin olive oil", "30 g grated Parmesan", "½ small onion or shallot", "50 ml dry white wine", "4–5 thin slices fresh black truffle", "Salt and pepper, to taste"],
        steps: ["Finely chop the onion and soften it over low heat with the butter and a little oil.", "Add the rice and toast for 2–3 minutes, until the grains become translucent.", "Pour in the white wine and let it evaporate completely.", "Add hot stock gradually, one ladle at a time, stirring continuously. Cook for about 15–18 minutes.", "Remove from the heat and stir in the Parmesan and a small knob of butter until smooth and creamy.", "Plate and finish with fresh black truffle and a little pepper."],
        nutrition: [["Energy", "1,800 kJ (about 430 kcal)"], ["Saturated fat", "8 g (40%)"], ["Carbohydrates (sugars)", "2 g"], ["Protein", "10 g"]],
      },
      sections: [], related: ["en-recipe-truffle-tagliolini", "en-recipe-truffle-ravioli", "en-recipe-mushroom-soup"],
    },
    "en-recipe-mushroom-soup": {
      type: "recipe", lang: "en", eyebrow: "First Courses", title: "Creamy Mushroom Soup", meta: "RECIPE · First Courses",
      image: images.recipeMushroomSoup,
      intro: "A warm and comforting first course for autumn. This silky mushroom soup carries deep woodland aromas and is especially good with golden croutons or a drizzle of truffle oil.",
      recipe: {
        description: "Fresh mushrooms, potato, and vegetable stock are simmered and blended into a smooth, comforting soup with a clear woodland fragrance.",
        time: "35 min", difficulty: "Easy", servings: "2 servings",
        ingredients: ["300 g mixed fresh mushrooms, such as shiitake, porcini, or button mushrooms", "1 medium potato", "½ onion", "1 garlic clove", "2 tablespoons extra-virgin olive oil", "400 ml hot vegetable stock", "2 tablespoons fresh cream (optional)", "Salt and pepper, to taste", "Fresh chopped parsley, to garnish", "Croutons, to serve"],
        steps: ["Wipe the mushrooms with a damp cloth and slice them. Peel and dice the potato; finely chop the onion and garlic.", "Heat the olive oil and sauté the onion and garlic for 2–3 minutes. Add the mushrooms and potato and cook for about 5 minutes.", "Pour in the hot vegetable stock, cover, and simmer over medium heat for about 20 minutes, until tender.", "Remove from the heat and blend until smooth. Stir in the cream for a richer texture, if desired.", "Season with salt and pepper, garnish with parsley, and serve hot with golden croutons or a drizzle of truffle oil."],
        nutrition: [["Energy", "870 kJ (about 210 kcal)"], ["Saturated fat", "2 g (10%)"], ["Carbohydrates (sugars)", "14 g (including 4 g sugars)"], ["Protein", "6 g"]],
      },
      sections: [], related: ["en-recipe-truffle-tagliolini", "en-recipe-truffle-ravioli", "en-recipe-black-truffle-risotto"],
    },
    "en-recipe-beef-carpaccio-scallop-truffle": {
      type: "recipe", lang: "en", eyebrow: "Main Courses", title: "Beef Carpaccio with Scallops and Truffle", meta: "RECIPE · Main Courses",
      image: images.recipeBeefCarpaccioScallopTruffle,
      intro: "An elegant dish that brings together the rich flavor of thinly sliced beef, the tenderness of scallops, and the unmistakable fragrance of black truffle.",
      recipe: {
        description: "Tender scallops, delicate raw beef, and fragrant black truffle create a refined composition that is both beautiful and effortless to serve.",
        time: "15 min", difficulty: "Medium", servings: "2 servings",
        ingredients: ["120 g very thinly sliced beef carpaccio", "4 fresh scallops", "4–5 slices black truffle", "1 tablespoon extra-virgin olive oil", "1 teaspoon lemon juice", "Salt and pepper, to taste", "A few mixed salad leaves, such as mesclun or rocket", "A few drops green sauce (optional)"],
        steps: ["Warm a little oil in a non-stick pan and sear the scallops for 1 minute on each side, keeping the centers tender.", "Arrange the beef slices evenly in a single layer on a flat plate.", "Place the scallops in the center of the beef carpaccio.", "Drizzle with olive oil and lemon juice, then season with salt and pepper. Finish with black truffle, salad leaves, and, if desired, a few drops of green sauce or pea cream."],
        nutrition: [["Energy", "850 kJ (about 200 kcal)"], ["Saturated fat", "2 g (10%)"], ["Carbohydrates (sugars)", "1 g"], ["Protein", "22 g"]],
      },
      sections: [], related: ["en-recipe-shrimp-tartare-truffle", "en-recipe-black-truffle-risotto", "en-recipe-truffle-tagliolini"],
    },
    "en-recipe-shrimp-tartare-truffle": {
      type: "recipe", lang: "en", eyebrow: "Main Courses", title: "Shrimp Tartare with Crisp Vegetables and Truffle", meta: "RECIPE · Main Courses",
      image: images.recipeShrimpTartareTruffle,
      intro: "A fresh, refined dish in which the sweetness of raw shrimp meets crisp vegetables and the deep aroma of truffle, balancing visual elegance with bright flavor.",
      recipe: {
        description: "Fresh shrimp tartare with crisp vegetables and truffle is light yet layered, ideal for an elegant lunch or a distinctive seafood menu.",
        time: "20 min", difficulty: "Easy", servings: "2 servings",
        ingredients: ["200 g fresh red shrimp, peeled and frozen", "4–5 slices fresh black truffle", "6 cherry tomatoes", "½ cucumber", "¼ yellow bell pepper", "½ lime", "1 tablespoon extra-virgin olive oil", "Salt and pepper, to taste", "Salad leaves and edible flowers, to garnish"],
        steps: ["Finely chop the shrimp with a knife until delicate but not pasty. Season with olive oil, lime juice, salt, and pepper.", "Cut the cucumber, cherry tomatoes, and yellow pepper into very small dice, creating a colorful, crisp vegetable mixture.", "Use a ring mould to assemble the tartare, placing the vegetables at the base and the shrimp tartare on top.", "Finish with truffle slices, edible flowers, a little oil, and, if desired, a few drops of balsamic reduction or green emulsion."],
        nutrition: [["Energy", "600 kJ (about 145 kcal)"], ["Saturated fat", "1 g (5%)"], ["Carbohydrates (sugars)", "2 g"], ["Protein", "14 g"]],
      },
      sections: [], related: ["en-recipe-beef-carpaccio-scallop-truffle", "en-recipe-truffle-ravioli", "en-recipe-black-truffle-risotto"],
    },
    "en-recipe-sweet-bread-butter-caviar": {
      type: "recipe", lang: "en", eyebrow: "Dessert Recipe", title: "Sweet Bread with Butter and Caviar", meta: "RECIPE · Desserts",
      image: images.recipeSweetBreadButterCaviar,
      intro: "Sweet bread with butter and caviar is an elegant bite in which soft brioche, rich butter, and savory caviar create a distinctive contrast of sweetness and salinity.",
      recipe: {
        description: "A refined accompaniment for an appetizer or gourmet dinner, balancing the gentle sweetness of brioche with creamy butter and the clean marine flavor of caviar.",
        time: "10 min", difficulty: "Easy", servings: "4 servings",
        ingredients: ["4 pieces sweet bread, such as brioche", "40 g high-quality butter, preferably unsalted", "20 g caviar, such as sturgeon or Beluga caviar", "A little icing sugar, optional, to garnish"],
        steps: ["Cut the brioche into 4 cubes or thick slices, keeping the bread soft.", "Soften the butter at room temperature and spread it evenly over the bread.", "Gently place the caviar over each buttered piece of bread.", "Arrange on an elegant plate and, for a stronger sweet-salty contrast, finish with a very light dusting of icing sugar."],
        nutrition: [["Energy", "720 kJ (about 170 kcal)"], ["Saturated fat", "5 g (25%)"], ["Carbohydrates (sugars)", "10 g"], ["Protein", "5 g"]],
      },
      sections: [], related: ["en-recipe-truffle-tiramisu", "en-recipe-truffle-eggs", "en-recipe-truffle-toast"],
    },
    "en-recipe-truffle-tiramisu": {
      type: "recipe", lang: "en", eyebrow: "Dessert Recipe", title: "Truffle Tiramisu", meta: "RECIPE · Desserts",
      image: images.recipeTruffleTiramisu,
      intro: "Truffle tiramisu is a refined interpretation of the traditional dessert, combining silky mascarpone with the deep aroma of truffle for an unexpected, elegant finish.",
      recipe: {
        description: "A distinctive dessert that brings together classic tiramisu's creamy texture and the unmistakable fragrance of truffle, designed to leave a lasting impression.",
        time: "30 min", difficulty: "Medium", servings: "4 servings",
        ingredients: ["250 g mascarpone", "2 fresh eggs, yolks and whites separated", "60 g sugar", "100 g ladyfingers", "100 ml espresso", "1 tablespoon coffee liqueur, optional", "5–6 thin slices black truffle", "1 teaspoon truffle oil, optional, to intensify the aroma", "Unsweetened cocoa powder, as needed", "Biscuits or chocolate shards, to decorate"],
        steps: ["Prepare the coffee and leave it to cool. Add the liqueur if desired.", "Beat the egg yolks with the sugar until pale, then gently mix in the mascarpone. In a separate bowl, whisk the egg whites to stiff peaks and fold them into the mascarpone mixture from the bottom upward. Finish with a little truffle oil.", "Alternate coffee-soaked ladyfingers and mascarpone cream in a mould or pastry ring, adding thin truffle slices between the layers.", "Finish with a layer of cream and unsweetened cocoa, then decorate with truffle shavings and crisp biscuit crumbs.", "Refrigerate for at least 2 hours before serving."],
        nutrition: [["Energy", "1,300 kJ (about 310 kcal)"], ["Saturated fat", "7 g (35%)"], ["Carbohydrates (sugars)", "20 g"], ["Protein", "7 g"]],
      },
      sections: [], related: ["en-recipe-sweet-bread-butter-caviar", "en-recipe-truffle-eggs", "en-recipe-truffle-toast"],
    },
    "en-recipe-olive-bruschetta": {
      type: "recipe", lang: "en", topic: "olive", artClass: "is-olive", eyebrow: "Olive Oil Recipe", title: "Tomato and basil bruschetta", meta: "RECIPE · Olive Oil",
      image: images.recipeTruffleToast,
      intro: "Ripe tomato, basil and a clear extra-virgin olive oil make a simple Italian starter that works naturally in a Chinese home kitchen.",
      recipe: {
        description: "Tomato acidity, toasted bread and fruity olive oil create a clean, layered bite. Tomatoes, basil and country bread are widely available in China and can be adapted seasonally.",
        time: "15 min", difficulty: "Easy", servings: "2 servings", region: "Lazio / Central Italy", oil: "A fresh, fruit-forward extra-virgin olive oil", allergens: "Contains gluten; check milk allergen if cheese is added", substitutions: "Baguette can replace country bread; parsley or a little mint can replace basil", products: "Olive oil catalogue (subject to live stock and label)",
        ingredients: ["4 slices country bread or baguette", "2 ripe tomatoes", "6 basil leaves", "1 garlic clove", "1½ tablespoons extra-virgin olive oil", "Salt and black pepper"],
        steps: ["Toast the bread until golden and rub it lightly with the garlic clove.", "Dice the tomatoes and mix with basil, salt and pepper; rest for 3 minutes.", "Spoon the tomatoes over the toast, finish with olive oil and serve immediately."],
        nutrition: [["Energy", "About 720 kJ (170 kcal) per serving"], ["Fat", "About 7 g"], ["Carbohydrate", "About 23 g"], ["Protein", "About 4 g"]],
      },
      sections: [], related: ["en-recipe-olive-pasta", "en-recipe-truffle-toast", "en-academy-olive-oil-basics"],
    },
    "en-recipe-olive-pasta": {
      type: "recipe", lang: "en", topic: "olive", artClass: "is-olive", eyebrow: "Olive Oil Recipe", title: "Spaghetti aglio, olio e peperoncino", meta: "RECIPE · Olive Oil",
      image: images.recipeTruffleTagliolini,
      intro: "Garlic, chilli, parsley and olive oil create a quick pasta dish that teaches the relationship between fat, pasta water and heat.",
      recipe: {
        description: "This classic pasta uses starchy water and olive oil to form a light emulsion rather than a heavy sauce. Reduce or omit chilli to suit the household.",
        time: "20 min", difficulty: "Easy", servings: "2 servings", region: "Campania / Southern Italy", oil: "A medium-fruity extra-virgin olive oil with gentle pepper", allergens: "Contains gluten; egg may be present in pasta, check the package", substitutions: "Use whole-wheat or gluten-free pasta; replace parsley with coriander or basil", products: "Olive oil catalogue (subject to live stock and label)",
        ingredients: ["180 g spaghetti", "3 tablespoons extra-virgin olive oil", "2 garlic cloves", "A little dried chilli", "A handful of parsley", "Salt"],
        steps: ["Cook the pasta in salted water until just al dente and reserve about 100 ml of pasta water.", "Warm the olive oil and sliced garlic over low heat, adding chilli without browning the garlic too far.", "Add the pasta and a little pasta water; toss quickly until the oil and starch form a light sauce.", "Turn off the heat, add parsley and finish with olive oil to taste."],
        nutrition: [["Energy", "About 1,900 kJ (455 kcal) per serving"], ["Fat", "About 18 g"], ["Carbohydrate", "About 62 g"], ["Protein", "About 14 g"]],
      },
      sections: [], related: ["en-recipe-olive-bruschetta", "en-recipe-black-truffle-risotto", "en-academy-olive-tasting"],
    },
    "en-recipe-pizza-margherita": {
      type: "recipe", lang: "en", topic: "pizza", eyebrow: "Pizza Academy", title: "Classic Margherita pizza", meta: "RECIPE · Pizza",
      image: images.recipePizza,
      intro: "Patiently fermented dough, tomato, mozzarella and basil make a restrained classic with an airy rim and clear wheat flavour.",
      recipe: {
        description: "Margherita pizza puts flour, fermentation and high heat first. LuxurEat (露意膳) recommends reading the dough before adding a concise set of toppings.",
        time: "30 min + 8–24 hr fermentation", difficulty: "Medium", servings: "2 small pizzas", region: "Campania / Naples", allergens: "Contains gluten and milk", substitutions: "Adjust water to the flour's absorption; low-moisture mozzarella can replace fresh mozzarella", products: "Pizza catalogue (subject to live stock and label)",
        ingredients: ["500 g pizza flour", "325 g water", "10 g salt", "1 g dry yeast", "250 g crushed tomato", "200 g mozzarella", "Basil and extra-virgin olive oil"],
        steps: ["Mix flour, water and yeast; rest for 20 minutes, add salt and knead until smooth.", "Bulk-ferment, divide into two balls and cold-proof for 8–24 hours.", "Bring to room temperature, open gently while preserving the rim, then add tomato and mozzarella.", "Bake at the oven's highest temperature until risen and charred; finish with basil and olive oil."],
        nutrition: [["Energy", "About 2,850 kJ (680 kcal) per pizza"], ["Fat", "About 19 g"], ["Carbohydrate", "About 98 g"], ["Protein", "About 28 g"]],
      },
      sections: [], related: ["en-recipe-olive-pasta", "en-recipe-gelato-classic", "en-academy-pizza-dough"],
    },
    "en-recipe-gelato-classic": {
      type: "recipe", lang: "en", topic: "gelato", eyebrow: "Artisan Gelato", title: "Classic artisan Gelato", meta: "RECIPE · Artisan Gelato",
      image: images.recipeGelato,
      intro: "Balanced sweetness, fine texture and clear flavour define this classic artisan Gelato.",
      recipe: {
        description: "A balanced artisan gelato formula controls sugar, dairy solids and freezing temperature so the real ingredient remains distinct.",
        time: "35 min + 4 hr chilling", difficulty: "Medium", servings: "6 servings", region: "Italy", allergens: "Contains milk", substitutions: "Use a compatible dairy base with the same formula balance; without a machine, freeze and stir the mixture repeatedly", products: "Artisan Gelato catalogue (subject to live stock and label)",
        ingredients: ["550 g whole milk", "150 g cream", "100 g sugar", "30 g skimmed milk powder", "A small pinch of salt"],
        steps: ["Combine sugar and milk powder, then whisk gradually into the milk and cream.", "Heat to about 82°C, remove from the heat and emulsify with salt.", "Cool rapidly and mature in the refrigerator for at least 4 hours.", "Churn, freeze briefly to set and temper slightly before serving."],
        nutrition: [["Energy", "About 870 kJ (208 kcal) per serving"], ["Fat", "About 12 g"], ["Carbohydrate", "About 20 g"], ["Protein", "About 6 g"]],
      },
      sections: [], related: ["en-recipe-pizza-margherita", "en-recipe-truffle-tiramisu", "en-academy-gelato-basics"],
    },
    "en-truffle": {
      lang: "en", eyebrow: "Industry Atlas", title: "The World of Caviar: Leading Producers and Industry Development", meta: "ATLAS · Global Origins",
      image: images.caviarWorld,
      intro: "Caviar production has become a global industry. Around fifty producers now operate worldwide, and that number continues to grow.",
      opening: ["China is the world's largest caviar producer, while Italy, France, Iran, and the United States are also important production regions. A Technavio analysis at the time projected the global caviar market to reach USD 1.55 billion in 2021, roughly 75% above its 2016 level."],
      tocLabels: ["China", "Italy", "Iran", "France", "North America", "Russia", "United Arab Emirates", "Spain", "A Globalizing Caviar Industry"],
      sections: [
        ["China: The World's Largest Caviar Producer", ["China accounts for about 60% of global caviar output and is currently the world's largest producer.", "Kaluga Queen, located at Qiandao Lake in Zhejiang, is the world's largest caviar producer. More than half of the world's commercial caviar farms are located in China. In 2020, domestic Chinese caviar consumption was about 100 tonnes.", "Between 2012 and 2017, China exported nearly 150 tonnes of caviar and became an important international supplier, serving major clients including Lufthansa.", "Over the same period, Chinese caviar exports to the United States increased fivefold. Falling wholesale prices also strengthened Chinese caviar's competitiveness in international markets."]],
        ["Italy: A Farming Industry Centered on Brescia", ["Italian caviar production originally depended on sturgeon from the Po River, but today it comes mainly from controlled farms.", "The province of Brescia is the heart of Italy's caviar industry, producing about 25 tonnes a year. Farmed caviar from Calvisius represents roughly 15% of global production."]],
        ["Iran: A Long Caviar Tradition", ["Iran has a long history of caviar production, with traditions reaching back to antiquity.", "In 2010, Iran and Russia agreed to prohibit sturgeon fishing in the Caspian Sea. Iranian production subsequently shifted toward dozens of aquaculture farms.", "Iran's best-known product is Beluga caviar, valued for its soft texture and delicate buttery aroma. In 2016, the United States resumed imports of Iranian caviar after a long ban."]],
        ["France: Precision Production in Aquitaine", ["French caviar production began in 1920 on the right bank of the Gironde, quickly reaching five tonnes per year.", "Aquitaine is now the center of French caviar production, with annual output of about 24 tonnes. Six of France's eight principal producers are located there.", "Local companies mainly process roe from Siberian sturgeon, Acipenser baerii, using a low-salt dry-curing method that limits the effect of salt on the roe's natural flavor."]],
        ["North America: From Traditional Exporter to Modern Farming Center", ["In the early twentieth century, North America was a major caviar exporter to Europe.", "Today, roughly 70% to 80% of U.S. caviar production is concentrated in Northern California. Canada's Northern Divine is known for high-quality organic caviar."]],
        ["Russia: New Production Methods to Protect Sturgeon", ["To protect sturgeon populations, Russia banned sturgeon fishing in the Volga River and Caspian Sea in 2005.", "Russian Caviar House represents about 70% of Russian caviar output. It uses a roe-harvesting method that does not require killing the fish, reducing the pressure of production on sturgeon populations."]],
        ["United Arab Emirates: A Major Indoor Production Base", ["Abu Dhabi is home to Royal Caviar Company, the world's largest indoor caviar production facility, with projected annual capacity of 35 tonnes.", "The facility uses advanced German technology and highly automated systems to control the farming environment and maintain stable conditions for sturgeon growth."]],
        ["Spain: Two Principal Caviar Farms", ["Spain has two principal caviar farms: Caviar Nacarii in the Pyrenees and Caviar Riofrío in Granada.", "Both companies use Adriatic sturgeon, Acipenser naccarii, to produce high-quality caviar."]],
        ["A Globalizing Caviar Industry", ["From large-scale production in China to precision processing in Italy and France, and new farming technologies in Russia and the UAE, caviar is no longer confined to the Caspian region.", "The development of aquaculture, production technology, and international trade is bringing more countries into the market and giving this traditional luxury food a more diverse global industrial landscape."]],
      ],
      quote: "The development of aquaculture, production technology, and international trade is giving this traditional luxury food a more diverse global industrial landscape.",
      related: ["en-harvest", "en-service", "en-malossol"],
    },
    "en-service": {
      lang: "en", eyebrow: "Market Insight", title: "The Italian Caviar Market: Europe's Leading Production Center and a Global Export Force", meta: "MARKET · Italy",
      image: images.italianCaviar,
      intro: "Italy's caviar market has continued to grow. According to API, the aquaculture association of the Italian agricultural federation, Italy produced about 62 tonnes in 2022, more than 30% above 2020. Export demand was the main driver.",
      opening: ["The global caviar industry is also expanding steadily, with projected compound annual growth of about 9.59%. Market forecasts placed its value at roughly USD 800 million in 2024 and USD 1.26 billion by 2029, an overall increase of around 57.5%."],
      sections: [
        ["Growth Drivers in the Global Caviar Market", ["Demand for caviar, as a luxury food, is closely linked to economic development, household income, and premium consumption trends.", "The growth of high-income populations has increased demand for luxury goods and premium foods. As economies recover and global wealth rises, consumers are showing greater interest in refined foods, international culinary culture, and fine-dining experiences.", "For affluent consumers, caviar is not only a food but also a symbol of identity, taste, and a refined lifestyle."]],
        ["The Scale of Italy's Caviar Market", ["Italian companies produced about 62 tonnes of caviar in 2022, while global output exceeded 600 tonnes. The source identifies Italy as Europe's largest producer and the world's second largest after China.", "Italy's most important production center is Calvisano in the province of Brescia, Lombardy. Veneto, Lombardy, and Piedmont are the country's other main caviar regions.", "Based on the revenue of leading producers, the Italian caviar market was valued at about EUR 47.475 million in 2020 and EUR 62.332 million in 2022, an increase of 31.3% in two years."]],
        ["An Export-Led Market Structure", ["Despite Italy's high output, domestic consumption represents only a small share and most production is sold abroad.", "The principal sales channels for Italian caviar include:", { type: "quote", lines: ["fine-dining restaurants and luxury hotels;", "gourmet food shops and premium delicatessens;", "high-end wine stores;", "cruise ships and specialist food boutiques;", "e-commerce platforms;", "premium catering suppliers;", "weddings and large-event catering."] }, "This focus on exports and premium channels gives Italian caviar a strong position in the global gourmet-food sector."]],
        ["The Caviar Value Chain", ["Caviar passes through a series of specialized stages from sturgeon farming to final sale."]],
        ["Breeding and Hatching", ["Producers must manage genetics, fish health, and broodstock quality, completing breeding and hatching in controlled environments."]],
        ["Aquaculture", ["Young sturgeon grow in specialized facilities until they reach reproductive maturity. Because sturgeon mature slowly, farming requires sustained investment in time, expertise, and resources."]],
        ["Roe Harvesting", ["Mature roe must be collected with precision to preserve integrity, texture, and quality."]],
        ["Processing and Maturation", ["The roe is washed, salted, and packed. Salt ratios and processing techniques influence flavor, texture, and shelf life."]],
        ["Sustainable Packaging", ["More producers are adopting recyclable or biodegradable packaging to reduce environmental impact."]],
        ["Quality Control and Certification", ["Every batch requires strict inspection and complete traceability to ensure food safety, authenticity of origin, and consistent quality."]],
        ["Distribution", ["Finished products reach the market through premium retail, e-commerce, restaurants, hotels, and specialist food channels."]],
        ["Principal Caviar Types in the Italian Market", [{ type: "strong", text: "Beluga" }, "Beluga caviar comes from the European beluga sturgeon, Acipenser huso huso. It is commonly considered the rarest and most expensive caviar, with a smooth, rich, buttery flavor.", { type: "strong", text: "Oscetra" }, "Oscetra generally comes from Russian sturgeon. Its pearls are firmer, with a rich flavor and pronounced nutty and marine notes.", { type: "strong", text: "Sevruga" }, "Sevruga has smaller pearls but a more concentrated and intense flavor.", { type: "strong", text: "White Sturgeon Caviar" }, "White sturgeon caviar comes from Acipenser transmontanus. Its roe is darker and relatively delicate in flavor.", { type: "strong", text: "Siberian Sturgeon Caviar" }, "Siberian sturgeon, Acipenser baerii, produces brown-to-black roe with a lightly saline finish.", { type: "strong", text: "Kaluga" }, "Kaluga is generally a premium hybrid caviar whose color can range from brown to gold, with texture and quality characteristics similar to Beluga." ]],
        ["Market Trends and Future Development", ["Premium products can remain attractive even during periods of economic uncertainty. Caviar's rarity, ritual, and luxury image keep it important in the gourmet-food market.", "Social media has reinforced caviar's image as a symbol of refined living and fine dining, attracting more young consumers to this traditional food.", "At the same time, advances in aquaculture have increased supply and made some products more accessible. Caviar is gradually moving beyond a very small consumer base into more restaurant, retail, and celebratory occasions.", "Even as accessibility improves, caviar retains its premium, rare, and symbolic positioning. For Italy, mature farming expertise, a complete value chain, stable export channels, and strong international brand recognition will remain central advantages."]],
      ],
      quote: "For Italy, mature farming expertise, a complete value chain, stable export channels, and strong international brand recognition will remain central advantages.",
      related: ["en-champagne", "en-mother-of-pearl", "en-harvest"],
    },
    "en-malossol": {
      lang: "en", eyebrow: "Tasting Etiquette", title: "Caviar Etiquette: How to Taste Caviar with Elegance", meta: "RITUAL · Tasting Guide",
      image: images.caviarEtiquette,
      intro: "Caviar is not only a precious ingredient; it also has a distinctive tasting etiquette. Whether shared at a relaxed dinner with friends or served on a formal occasion, it is best enjoyed calmly and elegantly.",
      sections: [
        ["Elegance and Tradition", ["Caviar was once a delicacy reserved for kings and royal courts, so people often approach this fine ingredient with particular care.", "Graceful behavior and proper table etiquette have become important parts of caviar culture. These traditions show respect for the ingredient and add a sense of ritual to the tasting."]],
        ["Control the Portion", ["When caviar is served as an appetizer, excessive consumption is generally considered inelegant.", "A serving should preferably stay below about two ounces, or roughly two spoonfuls. Caviar is better tasted slowly in small quantities than eaten all at once."]],
        ["The Correct Way to Taste", ["Caviar should not be chewed immediately, as this can diminish some of its delicate flavor.", "Instead, let the roe glide gently across the upper palate, notice its smooth, creamy texture, and allow the pearls to break naturally in the mouth and release their flavor."]],
        ["Small, Slow Tastes", ["Caviar is best enjoyed in small bites. Each should be slow and attentive rather than swallowed quickly.", "For a first tasting, half a teaspoon is an ideal portion. It is enough to experience texture and flavor fully without overwhelming the palate."]],
      ],
      quote: "Caviar is better tasted slowly in small quantities than eaten all at once.",
      related: ["en-harvest", "en-service", "en-champagne"],
    },
    "en-champagne": {
      lang: "en", eyebrow: "Tasting & Culture", title: "Sensory Analysis of Caviar", meta: "TASTING · Quality Assessment",
      image: images.sensoryAnalysis,
      archive: "Sensory Analysis",
      intro: "Caviar sensory analysis combines visual, olfactory, and taste evaluation to identify quality, pearl condition, aroma, flavor, and overall character.",
      sections: [
        ["Caviar Quality Categories", [
          "Grade 1: The highest level of quality, with large, intact, compact eggs, a delicate flavor, and a lighter color.",
          "Grade 2: Fresh caviar with standard-sized eggs, good flavor, and darker tones.",
          "Grade 3: Pressed caviar, also known as payusnaya, made from broken eggs, with no precise classification for color or size.",
        ]],
        ["How Sensory Analysis is Performed", ["Caviar is not tasted on canapés or with utensils but directly from the hand. Professional tasters place a small amount between the thumb and index finger, examining the eggs before tasting. The pearls should be firm and compact; if too soft or collapsing, this may indicate poor quality."]],
        ["Aromas and Flavors", ["Each type of caviar has a unique flavor profile, which can vary even between batches of the same variety. Professionals use a refined vocabulary, similar to that of sommeliers, with terms such as herbaceous, fresh, or violet notes to describe their impressions."]],
        ["Signs of Low Quality", ["A bitter, rancid, or overly salty taste, along with eggs that are mushy or excessively viscous, are signs of defective or improperly stored caviar."]],
        ["Visual Evaluation", [
          "Color: Can range from black to grey, brown, and even golden, depending on the sturgeon species and age.",
          "Appearance: Size and uniformity of the eggs are assessed, along with brightness, an indicator of freshness. In Beluga caviar, larger eggs are especially prized.",
        ]],
        ["Olfactory Evaluation", ["Caviar should have only a faint aroma, with a light marine note. Strong odors, such as fermented fish or herring, indicate poor storage and the product should not be consumed."]],
        ["Taste Evaluation", [
          "Texture: Eggs should feel soft yet firm, never overly viscous or watery.",
          "Flavor: Balanced and harmonious, with fresh, marine notes. A bitter or acidic taste signals a defect.",
        ]],
        ["Overall Assessment", ["Sensory analysis combines visual, olfactory, and taste elements to define the qualitative level of caviar. Each variety has its own characteristics that should be recognized and appreciated as a whole."]],
        ["Pairings and Culture", ["Knowing the different types of caviar allows for creative pairings as well as respect for classic culinary traditions."]],
        ["Nutritional Properties of Caviar", [
          "Caviar is also a valuable food from a nutritional perspective, thanks to its content of omega-3, selenium, vitamins, and proteins.",
          "Omega-3: Promote collagen production, wound healing, reduce signs of aging, improve brain function, and reduce inflammation.",
          "Selenium: A powerful antioxidant that stimulates the immune system, supports fertility, and helps prevent DNA damage and cancer.",
          "Calories: 100 g of fresh caviar provide about 264 kcal, of which 61% comes from fats and 33% from proteins.",
          "Vitamins: Rich in vitamin B12 and also contains vitamins D, A, B1, B2, B5, B6, and B9, all essential for numerous metabolic processes.",
          "Minerals: Includes magnesium, iron, sodium, phosphorus, and calcium, essential for overall well-being.",
          "Fats: Contains healthy fats, both saturated and unsaturated, important for energy and nervous system health.",
          "Proteins and amino acids: Covers about 49% of the daily protein requirement, with amino acids such as lysine, leucine, tryptophan, valine, and threonine, essential for metabolism.",
        ]],
        ["Conclusion", ["The sensory analysis of caviar requires experience, sensitivity, and attention to detail. Through this process, one can fully appreciate the unique qualities of each type and discover the best pairings to enhance its flavor."]],
      ],
      quote: "Sensory analysis brings sight, aroma, and taste together to reveal the distinctive quality of every caviar.",
      related: ["en-mother-of-pearl", "en-malossol", "en-service"],
    },
    "en-mother-of-pearl": {
      lang: "en", eyebrow: "Quality & Traceability", title: "Caviar Labeling: Quality and Transparency", meta: "TRACEABILITY · Label Guide",
      image: images.caviarLabeling,
      archive: "Labeling",
      intro: "Caviar labels contain essential information to determine the quality and origin of the product. These include the sturgeon species code, whether the caviar comes from farming or not, the country of origin, the harvest year, the producer’s name, the processing facility, and the batch number.",
      opening: ["Species codes and country abbreviations follow international standards, ensuring traceability, legality, and sustainability in the caviar trade."],
      sections: [
        ["What Caviar Labels Include", [
          "The information on packaging is indispensable for certifying authenticity and quality. Key elements include:",
          "Species code: Each sturgeon type has a unique code (e.g., HUS for Beluga, GUE for Oscetra).",
          "Caviar origin: Since 1998, wild sturgeon fishing has been banned; therefore, all available caviar is farmed (marked with C). Otherwise, it is illegal and lacks a valid CITES label.",
          "Country of production: Indicated through official abbreviations (e.g., IT for Italy).",
          "Year of production: Specifies the year in which the caviar was harvested.",
          "Production facility: Identifies the site where the caviar was processed and packaged.",
          "Batch number: Allows tracing back to the exact batch of origin.",
          "Thanks to this information, consumers can make informed choices and contribute to sturgeon conservation.",
        ]],
        ["Legality and Sustainability of Caviar Trade", ["Purchasing caviar from certified farms supports a transparent market and environmentally responsible practices. CaviarEat promotes safe and legal trade, discouraging poaching and protecting sturgeon in their natural habitats."]],
      ],
      sectionMedia: [[{ src: images.caviarLabelDiagram, alt: "Diagram of caviar species code, origin, country, production year, facility, and batch number" }]],
      quote: "Transparent labeling helps consumers verify authenticity, trace origin, and support legal, sustainable caviar trade.",
      related: ["en-champagne", "en-truffle", "en-service"],
    },
  };


  const addDocumentedRecipe = (id, image, productCategory, zh, en, related = []) => {
    [["zh", zh], ["en", en]].forEach(([lang, copy]) => {
      articles[`${lang}-recipe-${id}`] = {
        type: "recipe", lang, topic: productCategory === "olive-oil" ? "olive" : productCategory,
        productCategory, artClass: productCategory === "olive-oil" ? "is-olive" : undefined,
        eyebrow: copy.eyebrow, title: copy.title, meta: copy.meta, image, intro: copy.intro,
        recipe: copy.recipe, sections: [], related: related.map((item) => `${lang}-${item}`),
      };
    });
  };

  addDocumentedRecipe("olive-bruschetta", images.recipeOliveBruschetta, "olive-oil", {
    eyebrow: "橄榄油食谱", title: "番茄罗勒意式烤面包", meta: "RECIPE · 橄榄油食谱",
    intro: "成熟番茄、烤面包、蒜与特级初榨橄榄油构成最经典的意式前菜之一。重点在于面包的酥脆、番茄的新鲜度，以及最后加入的橄榄油果香。",
    recipe: {
      description: "Bruschetta al Pomodoro · Tomato and Basil Bruschetta",
      time: "15分钟", difficulty: "简单", servings: "4人份", region: "意大利中部广泛流行；经典意式前菜", oil: "中等果香、低至中等苦辣度的特级初榨橄榄油。",
      ingredients: ["乡村面包160克，切4片", "成熟番茄400克", "特级初榨橄榄油30克（约33毫升）", "蒜1瓣（约5克）", "新鲜罗勒8克", "细盐2克", "现磨黑胡椒适量"],
      steps: ["番茄洗净、擦干并切成约1厘米小丁。加入20克橄榄油、盐和撕碎的罗勒，轻轻拌匀后静置10分钟。", "面包在烤箱、烤架或干燥平底锅中烤至两面金黄且表面酥脆。", "趁热用切开的蒜瓣轻擦面包表面，不要反复摩擦，以免蒜味压过番茄和橄榄油。", "将番茄沥去过多汁液后铺在面包上，淋剩余10克橄榄油，磨少量黑胡椒，立即上桌。"],
      professionalTip: "面包应保持酥脆，番茄汁不要过多；橄榄油在最后加入，才能保留清晰果香。", foodSafety: "生食番茄和罗勒应在流动饮用水下充分清洗并擦干。装配后建议立即食用，避免长时间室温放置。",
      allergens: "含麸质谷物（面包）。", substitutions: "乡村面包可换为法棍或酸面包；有无麸质需求时，应使用经认证的无麸质面包。", products: "LuxurEat（露意膳）特级初榨橄榄油产品（以实际目录和标签为准）",
      nutrition: [["能量", "约850千焦 / 205千卡"], ["脂肪", "约9克"], ["其中饱和脂肪", "约1.5克"], ["碳水化合物", "约24克"], ["其中糖", "约4克"], ["蛋白质", "约5克"], ["膳食纤维", "约2.5克"], ["钠", "约390毫克"]],
      nutritionNote: "营养数据为按上述标准化配料计算的每份估算值，实际结果会因面包品牌、番茄品种及实际调味量而变化。",
    },
  }, {
    eyebrow: "Olive Oil Recipes", title: "Tomato and Basil Bruschetta", meta: "RECIPE · Olive Oil",
    intro: "Ripe tomatoes, toasted bread, garlic and extra-virgin olive oil make one of Italy’s classic antipasti. Crisp bread, fresh tomato and the fruitiness of the finishing oil are the essentials.",
    recipe: {
      description: "Bruschetta al Pomodoro",
      time: "15 min", difficulty: "Easy", servings: "Serves 4", region: "Widely enjoyed in Central Italy; a classic Italian antipasto", oil: "A medium-fruity extra-virgin olive oil with low to medium bitterness and pepperiness.",
      ingredients: ["160 g country bread, cut into 4 slices", "400 g ripe tomatoes", "30 g extra-virgin olive oil (about 33 ml)", "1 garlic clove (about 5 g)", "8 g fresh basil", "2 g fine salt", "Freshly ground black pepper"],
      steps: ["Wash and dry the tomatoes, then cut into 1 cm dice. Mix gently with 20 g of the oil, the salt and torn basil; rest for 10 minutes.", "Toast the bread in an oven, on a grill or in a dry frying pan until golden and crisp on both sides.", "While hot, rub each slice lightly with the cut garlic. Do not over-rub or the garlic will dominate.", "Drain excess tomato juice, spoon the mixture over the bread, drizzle with the remaining 10 g oil, add black pepper and serve immediately."],
      professionalTip: "Keep the bread crisp, drain excess tomato juice and add the final oil at the end so its fruit character stays distinct.", foodSafety: "Wash tomatoes and basil thoroughly under potable running water and dry them. Serve immediately after assembly and do not leave at room temperature for long.",
      allergens: "Contains gluten cereals (bread).", substitutions: "Replace country bread with baguette or sourdough. Use certified gluten-free bread when required.", products: "LuxurEat (露意膳) extra-virgin olive oil range (subject to the live catalogue and label)",
      nutrition: [["Energy", "About 850 kJ / 205 kcal"], ["Fat", "About 9 g"], ["of which saturates", "About 1.5 g"], ["Carbohydrate", "About 24 g"], ["of which sugars", "About 4 g"], ["Protein", "About 5 g"], ["Fibre", "About 2.5 g"], ["Sodium", "About 390 mg"]],
      nutritionNote: "Estimated per serving from the standardised ingredients above; bread brand, tomato variety and actual seasoning will change the result.",
    },
  }, ["recipe-olive-pasta", "recipe-olive-panzanella", "academy-olive-oil-basics"]);

  addDocumentedRecipe("olive-pasta", images.recipeOliveAglioOlio, "olive-oil", {
    eyebrow: "橄榄油食谱", title: "蒜香辣椒橄榄油意面", meta: "RECIPE · 橄榄油食谱",
    intro: "经典的 Aglio, Olio e Peperoncino 依靠蒜、辣椒、特级初榨橄榄油和富含淀粉的面水形成轻薄乳化，而不是用大量油把意面浸湿。",
    recipe: {
      description: "Spaghetti Aglio, Olio e Peperoncino · Spaghetti with Garlic, Olive Oil and Chilli",
      time: "20分钟", difficulty: "简单", servings: "4人份", region: "坎帕尼亚及意大利南部传统", oil: "中等果香、带适度辛香感的特级初榨橄榄油。",
      ingredients: ["干 Spaghetti 320克", "特级初榨橄榄油60克（约66毫升）", "蒜4瓣（约20克），切薄片", "干辣椒1–2个，或辣椒碎1–2克", "新鲜欧芹12克，切碎，可选但推荐", "细盐约6克，用于煮面水", "保留煮面水约150毫升"],
      steps: ["在充足沸水中加盐，放入意面，煮至比包装标示的 al dente 时间少约1分钟，舀出约150毫升面水备用。", "冷锅加入橄榄油和蒜片，以中低火缓慢加热。蒜应逐渐释放香气并变成浅金色，不要炸至深褐。", "加入辣椒，继续低火加热数十秒。", "将意面直接转入锅中，加入约80毫升面水，以中火快速翻拌。", "根据需要少量补充面水，使橄榄油和淀粉水形成乳化，并均匀附着在面条表面。", "当意面达到 al dente、锅底几乎没有游离水分时关火，加入欧芹，翻拌后立即装盘。"],
      professionalTip: "重点不是油越多越好，而是通过面水中的淀粉完成乳化。蒜如果炸焦，会产生明显苦味。", foodSafety: "煮熟意面不宜在室温下长时间放置。如非立即食用，应尽快冷却并冷藏。",
      allergens: "含麸质谷物（意面）；如使用含蛋意面，则另含蛋。", substitutions: "可使用全麦意面或经认证的无麸质意面。辣椒可按口味减少，但标准版本不建议用香菜替代欧芹。", products: "中等果香型 LuxurEat（露意膳）特级初榨橄榄油",
      nutrition: [["能量", "约1810千焦 / 435千卡"], ["脂肪", "约16克"], ["其中饱和脂肪", "约2.5克"], ["碳水化合物", "约59克"], ["其中糖", "约3克"], ["蛋白质", "约11克"], ["膳食纤维", "约3克"], ["钠", "取决于煮面水盐度和沥水程度"]],
      nutritionNote: "营养数据为每份估算值。煮面水中的盐不会全部进入最终成品。",
    },
  }, {
    eyebrow: "Olive Oil Recipes", title: "Spaghetti with Garlic, Olive Oil and Chilli", meta: "RECIPE · Olive Oil",
    intro: "Classic Aglio, Olio e Peperoncino uses garlic, chilli, extra-virgin olive oil and starchy pasta water to form a light emulsion rather than soaking the pasta in oil.",
    recipe: {
      description: "Spaghetti Aglio, Olio e Peperoncino",
      time: "20 min", difficulty: "Easy", servings: "Serves 4", region: "Campania and the tradition of Southern Italy", oil: "A medium-fruity extra-virgin olive oil with moderate pepperiness.",
      ingredients: ["320 g dried spaghetti", "60 g extra-virgin olive oil (about 66 ml)", "4 garlic cloves (about 20 g), thinly sliced", "1–2 dried chillies, or 1–2 g chilli flakes", "12 g fresh parsley, chopped, optional but recommended", "About 6 g fine salt for the pasta water", "About 150 ml reserved pasta water"],
      steps: ["Cook the pasta in plenty of salted boiling water until about 1 minute short of the package’s al dente time. Reserve about 150 ml pasta water.", "Add the oil and garlic to a cold pan and warm slowly over medium-low heat. Let the garlic become pale gold, never dark brown.", "Add the chilli and cook over low heat for a few seconds.", "Transfer the pasta directly to the pan, add about 80 ml pasta water and toss briskly over medium heat.", "Add small amounts of pasta water as needed so the oil and starch emulsify and coat the spaghetti.", "When the pasta is al dente and almost no free liquid remains, turn off the heat, add parsley, toss and serve immediately."],
      professionalTip: "The key is not more oil but emulsification with the starch in the pasta water. Burnt garlic will make the dish distinctly bitter.", foodSafety: "Do not leave cooked pasta at room temperature for extended periods. Cool promptly and refrigerate if it will not be served immediately.",
      allergens: "Contains gluten cereals (pasta). Egg pasta also contains egg.", substitutions: "Use whole-wheat or certified gluten-free pasta. Reduce chilli to taste; the standard version should not replace parsley with coriander.", products: "Medium-fruity LuxurEat (露意膳) extra-virgin olive oil",
      nutrition: [["Energy", "About 1,810 kJ / 435 kcal"], ["Fat", "About 16 g"], ["of which saturates", "About 2.5 g"], ["Carbohydrate", "About 59 g"], ["of which sugars", "About 3 g"], ["Protein", "About 11 g"], ["Fibre", "About 3 g"], ["Sodium", "Depends on pasta-water salinity and draining"]],
      nutritionNote: "Estimated per serving. Not all salt added to the cooking water enters the finished dish.",
    },
  }, ["recipe-olive-bruschetta", "recipe-olive-panzanella", "academy-olive-tasting"]);

  addDocumentedRecipe("olive-panzanella", images.recipeOlivePanzanella, "olive-oil", {
    eyebrow: "橄榄油食谱", title: "托斯卡纳面包沙拉", meta: "RECIPE · 橄榄油食谱",
    intro: "Panzanella 是托斯卡纳及意大利中部经典的陈面包沙拉。略微回软的面包吸收番茄、醋和特级初榨橄榄油的风味，形成清爽又保留结构感的夏季料理。",
    recipe: {
      description: "Panzanella Toscana · Tuscan Panzanella",
      time: "约55分钟，含静置时间", difficulty: "简单", servings: "4人份", region: "托斯卡纳", oil: "果香清晰、苦辣度适中的托斯卡纳风格特级初榨橄榄油。",
      ingredients: ["陈乡村面包240克", "成熟番茄500克", "黄瓜180克", "红洋葱80克", "新鲜罗勒12克", "特级初榨橄榄油40克（约44毫升）", "红酒醋20克", "冷饮用水约120毫升", "细盐3克", "现磨黑胡椒适量"],
      steps: ["面包切成约1厘米厚片或较大的块，均匀洒上冷水和约一半红酒醋。", "静置10–15分钟，使面包回软，但不要完全泡烂。", "番茄切块，黄瓜切片，红洋葱切薄片；洋葱过辣时可在冷水中浸泡10分钟后彻底沥干。", "轻轻挤去面包中过多水分，再用手撕成大小均匀的块。", "将面包、番茄、黄瓜、洋葱和罗勒混合。", "加入剩余红酒醋、橄榄油、盐和黑胡椒，轻轻拌匀。", "冷藏静置约30分钟。上桌前再次拌匀，并微调酸度和盐度。"],
      professionalTip: "面包应该湿润而有结构，而不是彻底泡成糊状。番茄汁、醋和橄榄油会继续软化面包，初始湿润程度不要过高。", foodSafety: "所有生食蔬菜和香草都应在流动饮用水下充分清洗。成品应冷藏保存并尽量当天食用。",
      allergens: "含麸质谷物（面包）。", substitutions: "传统托斯卡纳无盐面包可用结构紧实的陈乡村面包替代；红酒醋可换为白酒醋。", products: "结构感清晰的 LuxurEat（露意膳）特级初榨橄榄油",
      nutrition: [["能量", "约1160千焦 / 280千卡"], ["脂肪", "约12克"], ["其中饱和脂肪", "约2克"], ["碳水化合物", "约37克"], ["其中糖", "约7克"], ["蛋白质", "约7克"], ["膳食纤维", "约4克"], ["钠", "约530毫克"]],
      nutritionNote: "营养数据为每份估算值，实际结果会随面包种类、面包含盐量及实际调味量变化。",
    },
  }, {
    eyebrow: "Olive Oil Recipes", title: "Tuscan Panzanella", meta: "RECIPE · Olive Oil",
    intro: "Panzanella is Tuscany’s classic stale-bread salad. Softened bread absorbs tomato, vinegar and extra-virgin olive oil while retaining enough structure for a fresh summer dish.",
    recipe: {
      description: "Panzanella Toscana",
      time: "About 55 min, including resting", difficulty: "Easy", servings: "Serves 4", region: "Tuscany", oil: "A Tuscan-style extra-virgin olive oil with clear fruit and moderate bitterness and pepperiness.",
      ingredients: ["240 g stale country bread", "500 g ripe tomatoes", "180 g cucumber", "80 g red onion", "12 g fresh basil", "40 g extra-virgin olive oil (about 44 ml)", "20 g red-wine vinegar", "About 120 ml cold potable water", "3 g fine salt", "Freshly ground black pepper"],
      steps: ["Cut the bread into 1 cm slices or large pieces and sprinkle evenly with cold water and half the vinegar.", "Rest for 10–15 minutes so the bread softens without becoming mushy.", "Cut the tomatoes, slice the cucumber and thinly slice the onion. If the onion is too sharp, soak in cold water for 10 minutes and drain thoroughly.", "Gently squeeze excess water from the bread and tear it into even pieces.", "Combine bread, tomatoes, cucumber, onion and basil.", "Add the remaining vinegar, oil, salt and pepper and toss gently.", "Refrigerate for about 30 minutes. Toss again before serving and adjust acidity and salt."],
      professionalTip: "The bread should be moist but structured, never a paste. Tomato juice, vinegar and oil continue to soften it, so do not over-wet it initially.", foodSafety: "Wash all raw vegetables and herbs under potable running water. Keep refrigerated, eat the same day and do not leave in a warm environment.",
      allergens: "Contains gluten cereals (bread).", substitutions: "Replace traditional unsalted Tuscan bread with firm stale country bread; white-wine vinegar may replace red-wine vinegar.", products: "A structured LuxurEat (露意膳) extra-virgin olive oil",
      nutrition: [["Energy", "About 1,160 kJ / 280 kcal"], ["Fat", "About 12 g"], ["of which saturates", "About 2 g"], ["Carbohydrate", "About 37 g"], ["of which sugars", "About 7 g"], ["Protein", "About 7 g"], ["Fibre", "About 4 g"], ["Sodium", "About 530 mg"]],
      nutritionNote: "Estimated per serving; bread type, bread salt and actual seasoning will affect the result.",
    },
  }, ["recipe-olive-bruschetta", "recipe-olive-pinzimonio", "academy-olive-oil-basics"]);

  addDocumentedRecipe("olive-pinzimonio", images.recipeOlivePinzimonio, "olive-oil", {
    eyebrow: "橄榄油食谱", title: "意式生蔬菜配橄榄油蘸汁", meta: "RECIPE · 橄榄油食谱",
    intro: "Pinzimonio 以新鲜、脆爽的时令蔬菜搭配特级初榨橄榄油、盐、黑胡椒和少量柠檬汁，直接展现优质橄榄油的果香、苦味和辛香感。",
    recipe: {
      description: "Pinzimonio di Verdure · Italian Raw Vegetables with Olive-Oil Dip",
      time: "20分钟", difficulty: "简单", servings: "4人份", region: "意大利多个地区均有传统", oil: "适合直接品尝的高品质特级初榨橄榄油。",
      ingredients: ["胡萝卜160克", "西芹120克", "茴香球200克", "红甜椒150克", "小萝卜100克", "菊苣或红菊苣120克", "特级初榨橄榄油60克（约66毫升）", "新鲜柠檬汁20克", "细盐2克", "现磨黑胡椒适量"],
      steps: ["所有蔬菜在流动饮用水下充分洗净并彻底擦干。", "胡萝卜、西芹、茴香和甜椒切成长条，小萝卜对半切，菊苣分成适合手持的叶片。", "将橄榄油、柠檬汁、盐和黑胡椒放入小碗，用叉子快速搅拌形成暂时乳化的蘸汁。", "将蔬菜分类摆放在冷盘中，蘸汁按人数分装成小碗，现蘸现食。"],
      professionalTip: "蔬菜必须新鲜、脆爽，橄榄油也不应有明显氧化、哈喇或陈旧气味。", foodSafety: "生食蔬菜要避免与处理生肉、生鱼的砧板和刀具交叉污染。切配后冷藏保存，建议2小时内上桌。",
      allergens: "标准配方不含欧盟14大主要过敏原；仍需根据实际加工原料和消费者个体情况确认。", substitutions: "可随季节加入黄瓜、樱桃番茄或甜菊苣，但应保持适合生食、脆爽和方便手持。", products: "LuxurEat（露意膳）特级初榨橄榄油产品",
      nutrition: [["能量", "约790千焦 / 190千卡"], ["脂肪", "约15克"], ["其中饱和脂肪", "约2克"], ["碳水化合物", "约13克"], ["其中糖", "约7克"], ["蛋白质", "约3克"], ["膳食纤维", "约5克"], ["钠", "约300毫克"]],
      nutritionNote: "营养数据为每份估算值，实际结果会随蔬菜种类、橄榄油实际食用量和调味量变化。",
    },
  }, {
    eyebrow: "Olive Oil Recipes", title: "Italian Raw Vegetables with Olive-Oil Dip", meta: "RECIPE · Olive Oil",
    intro: "Pinzimonio pairs crisp seasonal vegetables with extra-virgin olive oil, salt, pepper and a little lemon, showing the oil’s fruit, bitterness and pepperiness with almost no cooking.",
    recipe: {
      description: "Pinzimonio di Verdure",
      time: "20 min", difficulty: "Easy", servings: "Serves 4", region: "Traditional in several regions of Italy", oil: "A high-quality extra-virgin olive oil suitable for tasting raw.",
      ingredients: ["160 g carrots", "120 g celery", "200 g fennel bulb", "150 g red sweet pepper", "100 g radishes", "120 g chicory or radicchio", "60 g extra-virgin olive oil (about 66 ml)", "20 g fresh lemon juice", "2 g fine salt", "Freshly ground black pepper"],
      steps: ["Wash all vegetables thoroughly under potable running water and dry completely.", "Cut carrots, celery, fennel and pepper into batons, halve the radishes and separate chicory into hand-held leaves.", "Whisk the oil, lemon juice, salt and pepper with a fork to make a temporary emulsion.", "Arrange the vegetables by type on a chilled platter, divide the dip into individual bowls and dip only when eating."],
      professionalTip: "Vegetables must be fresh and crisp, and the oil must be free from oxidised, rancid or stale aromas.", foodSafety: "Prevent cross-contamination with boards and knives used for raw meat or fish. Refrigerate after cutting and serve within 2 hours, sooner in hot conditions.",
      allergens: "The standard recipe contains none of the EU’s 14 major allergens; confirm against the actual processed ingredients and individual needs.", substitutions: "Use seasonal cucumber, cherry tomatoes or endive, while keeping the selection crisp, suitable for raw service and easy to hold.", products: "LuxurEat (露意膳) extra-virgin olive oil range",
      nutrition: [["Energy", "About 790 kJ / 190 kcal"], ["Fat", "About 15 g"], ["of which saturates", "About 2 g"], ["Carbohydrate", "About 13 g"], ["of which sugars", "About 7 g"], ["Protein", "About 3 g"], ["Fibre", "About 5 g"], ["Sodium", "About 300 mg"]],
      nutritionNote: "Estimated per serving; vegetable selection, the amount of oil actually eaten and seasoning will change the result.",
    },
  }, ["recipe-olive-panzanella", "recipe-olive-bruschetta", "academy-olive-tasting"]);

  addDocumentedRecipe("light-fennel-orange-salad", images.recipeLightFennelOrangeSalad, "olive-oil", {
    eyebrow: "健康轻食", title: "西西里茴香橙子黑橄榄沙拉", meta: "RECIPE · 健康轻食", intro: "清脆茴香、鲜甜橙子与黑橄榄组成西西里风格沙拉，以橙汁和特级初榨橄榄油完成清爽调味。",
    recipe: { description: "Insalata di Finocchi, Arance e Olive Nere", time: "20分钟", difficulty: "简单", servings: "4人份", region: "西西里", oil: "果香清晰、苦辣度温和的特级初榨橄榄油。",
      ingredients: ["茴香球500克", "橙子400克（约3个，以去皮后重量计）", "去核黑橄榄80克", "特级初榨橄榄油25克（约28毫升）", "新鲜橙汁20克", "细盐1.5克", "现磨黑胡椒适量", "茴香叶少量，装饰用"],
      steps: ["茴香洗净并彻底擦干，保留少量茴香叶；球茎纵向切半后切成均匀薄片。", "橙子去皮并彻底去除白色筋膜，在碗上方切出果肉瓣并保留流出的果汁。", "黑橄榄对半切开。", "将20克橙汁、橄榄油、盐和黑胡椒搅拌成调味汁。", "茴香、橙子和橄榄轻轻混合，淋入调味汁再次拌匀。", "以茴香叶装饰并尽快上桌。"],
      professionalTip: "茴香要切得均匀而薄；橙子应多汁、酸甜平衡，才能让沙拉保持清爽。", foodSafety: "所有生食材料应充分清洗。若提前准备，请将各部分分开冷藏，食用前再混合。", allergens: "标准配方不含欧盟14大主要过敏原；加工橄榄仍需核对标签。", substitutions: "可使用其他风味温和的去核黑橄榄；不要使用糖浆罐头橙子。", products: "LuxurEat（露意膳）特级初榨橄榄油产品",
      nutrition: [["能量", "约640千焦 / 155千卡"], ["脂肪", "约9克"], ["其中饱和脂肪", "约1.5克"], ["碳水化合物", "约18克"], ["其中糖", "约12克"], ["蛋白质", "约3克"], ["膳食纤维", "约6克"], ["钠", "约260毫克"]], nutritionNote: "营养数据为每份估算值，实际结果会随橙子、橄榄及调味量变化。" },
  }, { eyebrow: "Healthy Light Meals", title: "Fennel, Orange and Black Olive Salad", meta: "RECIPE · Healthy Light Meals", intro: "Crisp fennel, sweet orange and black olives form a Sicilian-style salad finished with fresh orange juice and extra-virgin olive oil.",
    recipe: { description: "Insalata di Finocchi, Arance e Olive Nere", time: "20 min", difficulty: "Easy", servings: "Serves 4", region: "Sicily", oil: "A clearly fruity extra-virgin olive oil with gentle bitterness and pepperiness.", ingredients: ["500 g fennel bulbs", "400 g oranges (about 3, peeled weight)", "80 g pitted black olives", "25 g extra-virgin olive oil (about 28 ml)", "20 g fresh orange juice", "1.5 g fine salt", "Freshly ground black pepper", "A few fennel fronds to garnish"], steps: ["Wash and dry the fennel, reserving a few fronds. Halve the bulbs lengthways and slice evenly and thinly.", "Peel the oranges, remove all white pith and cut out the segments over a bowl, retaining the juice.", "Halve the olives.", "Whisk 20 g orange juice with the oil, salt and pepper.", "Gently combine fennel, orange and olives, add the dressing and toss again.", "Garnish with fennel fronds and serve promptly."], professionalTip: "Slice the fennel evenly and thinly; choose juicy oranges with balanced sweetness and acidity.", foodSafety: "Wash all raw ingredients thoroughly. If preparing ahead, refrigerate the components separately and combine just before serving.", allergens: "The standard recipe contains none of the EU’s 14 major allergens; check the label on processed olives.", substitutions: "Use another mild pitted black olive; do not use oranges canned in syrup.", products: "LuxurEat (露意膳) extra-virgin olive oil range", nutrition: [["Energy", "About 640 kJ / 155 kcal"], ["Fat", "About 9 g"], ["of which saturates", "About 1.5 g"], ["Carbohydrate", "About 18 g"], ["of which sugars", "About 12 g"], ["Protein", "About 3 g"], ["Fibre", "About 6 g"], ["Sodium", "About 260 mg"]], nutritionNote: "Estimated per serving; oranges, olives and seasoning will affect the result." },
  }, ["recipe-light-grilled-zucchini", "recipe-light-sea-bass-acqua-pazza"]);

  addDocumentedRecipe("light-grilled-zucchini", images.recipeLightGrilledZucchini, "olive-oil", {
    eyebrow: "健康轻食", title: "香草柠檬腌烤西葫芦", meta: "RECIPE · 健康轻食", intro: "薄切西葫芦经高温快速烤制，再以柠檬、薄荷、蒜与橄榄油短暂腌渍，保留清脆质地。",
    recipe: { description: "Zucchine Grigliate al Limone e Menta", time: "35分钟（含短暂腌渍）", difficulty: "简单", servings: "4人份", region: "意大利家庭料理", oil: "清新、果香温和的特级初榨橄榄油。", ingredients: ["西葫芦700克", "特级初榨橄榄油30克（约33毫升）", "新鲜柠檬汁25克", "蒜1瓣（约5克），切末", "新鲜薄荷8克，或欧芹10克", "细盐2.5克", "现磨黑胡椒适量"], steps: ["西葫芦洗净擦干，纵向切成4–5毫米厚片。", "烤盘或烤架充分预热。", "西葫芦分批铺开，每面烤约1–2分钟至出现烤痕且刚刚变软，不要堆叠。", "橄榄油、柠檬汁、蒜、盐和黑胡椒混合，加入切碎薄荷。", "将温热西葫芦分层摆放，每层刷少量调味汁。", "静置约15分钟入味；若不立即食用，应冷藏保存。"], professionalTip: "不要把西葫芦烤得过软；高温短时加热才能保留结构和清新感。", foodSafety: "烤后尽快冷却或及时食用。含新鲜蒜的油汁不可在室温长期存放。", allergens: "标准配方不含欧盟14大主要过敏原。", substitutions: "薄荷可换为欧芹；部分柠檬汁可换为白酒醋。", products: "LuxurEat（露意膳）特级初榨橄榄油产品", nutrition: [["能量", "约485千焦 / 115千卡"], ["脂肪", "约8克"], ["其中饱和脂肪", "约1克"], ["碳水化合物", "约7克"], ["其中糖", "约5克"], ["蛋白质", "约3克"], ["膳食纤维", "约2克"], ["钠", "约260毫克"]], nutritionNote: "营养数据为每份估算值。" },
  }, { eyebrow: "Healthy Light Meals", title: "Grilled Courgettes with Lemon and Mint", meta: "RECIPE · Healthy Light Meals", intro: "Thin courgette slices are grilled quickly, then briefly marinated with lemon, mint, garlic and olive oil to retain their bite.", recipe: { description: "Zucchine Grigliate al Limone e Menta", time: "35 min, including a short marinade", difficulty: "Easy", servings: "Serves 4", region: "Italian home cooking", oil: "A fresh, gently fruity extra-virgin olive oil.", ingredients: ["700 g courgettes", "30 g extra-virgin olive oil (about 33 ml)", "25 g fresh lemon juice", "1 garlic clove (about 5 g), minced", "8 g fresh mint, or 10 g parsley", "2.5 g fine salt", "Freshly ground black pepper"], steps: ["Wash and dry the courgettes, then slice lengthways 4–5 mm thick.", "Preheat a griddle or grill thoroughly.", "Grill in uncrowded batches for 1–2 minutes per side, until marked and just tender.", "Mix the oil, lemon juice, garlic, salt and pepper, then add chopped mint.", "Layer the warm courgettes, brushing each layer with a little dressing.", "Rest for about 15 minutes. Refrigerate if not serving immediately."], professionalTip: "Do not overcook the courgettes; brief high heat preserves their structure and freshness.", foodSafety: "Cool promptly or serve at once. Oil containing fresh garlic must not be stored at room temperature for extended periods.", allergens: "The standard recipe contains none of the EU’s 14 major allergens.", substitutions: "Replace mint with parsley; replace part of the lemon juice with white-wine vinegar.", products: "LuxurEat (露意膳) extra-virgin olive oil range", nutrition: [["Energy", "About 485 kJ / 115 kcal"], ["Fat", "About 8 g"], ["of which saturates", "About 1 g"], ["Carbohydrate", "About 7 g"], ["of which sugars", "About 5 g"], ["Protein", "About 3 g"], ["Fibre", "About 2 g"], ["Sodium", "About 260 mg"]], nutritionNote: "Estimated per serving." },
  }, ["recipe-light-fennel-orange-salad", "recipe-light-sea-bass-acqua-pazza"]);

  addDocumentedRecipe("light-sea-bass-acqua-pazza", images.recipeLightSeaBass, "olive-oil", {
    eyebrow: "健康轻食", title: "意式番茄水煮海鲈鱼", meta: "RECIPE · 健康轻食", intro: "海鲈鱼在番茄、蒜、白葡萄酒和少量水构成的浅汤中轻柔煮熟，是坎帕尼亚经典的清淡鱼料理。",
    recipe: { description: "Branzino all’Acqua Pazza", time: "30分钟", difficulty: "中等", servings: "4人份", region: "坎帕尼亚及意大利南部", oil: "中等果香、适合鱼类的特级初榨橄榄油。", ingredients: ["去骨海鲈鱼排600克", "樱桃番茄350克，对半切", "水180毫升", "干白葡萄酒80毫升，可选", "特级初榨橄榄油25克", "蒜2瓣（约10克）", "新鲜欧芹15克", "细盐3克", "现磨黑胡椒适量"], steps: ["鱼排擦干，确认无残留鱼刺，以盐和黑胡椒轻调味。", "宽锅加入橄榄油和拍裂的蒜，以中低火加热至出香。", "加入番茄，中火翻炒约3分钟。", "倒入白葡萄酒并煮1分钟使酒精挥发；不用酒时直接加等量水。", "加入180毫升水，煮至轻微沸腾。", "鱼排皮面朝下放入浅汤，盖锅以小火煮约6–8分钟。", "根据厚度轻轻翻面，继续煮2–4分钟，中心温度达到63°C。", "取出鱼排，汤汁按需稍微收浓。", "加入欧芹，调整盐和黑胡椒。", "将番茄和浅汤浇在鱼排周围，立即上桌。"], professionalTip: "Acqua pazza 是浅汤，不是大量水煮；液体只需帮助鱼肉温和熟成并形成鲜味汁液。", foodSafety: "生鱼应冷藏并与即食食材分开处理；中心温度达到63°C。剩余成品应在2小时内冷却冷藏。", allergens: "含鱼类；白葡萄酒可能含亚硫酸盐。", substitutions: "可用海鲷替代海鲈鱼；省略葡萄酒时增加80毫升水。", products: "LuxurEat（露意膳）特级初榨橄榄油产品", nutrition: [["能量", "约1045千焦 / 250千卡"], ["脂肪", "约10克"], ["其中饱和脂肪", "约2克"], ["碳水化合物", "约5克"], ["其中糖", "约3克"], ["蛋白质", "约36克"], ["膳食纤维", "约1.5克"], ["钠", "约440毫克"]], nutritionNote: "营养数据为每份估算值；葡萄酒是否使用会影响结果。" },
  }, { eyebrow: "Healthy Light Meals", title: "Sea Bass in Acqua Pazza", meta: "RECIPE · Healthy Light Meals", intro: "Sea bass cooks gently in a shallow broth of tomato, garlic, white wine and water in this light Campanian classic.", recipe: { description: "Branzino all’Acqua Pazza", time: "30 min", difficulty: "Medium", servings: "Serves 4", region: "Campania and Southern Italy", oil: "A medium-fruity extra-virgin olive oil suited to fish.", ingredients: ["600 g boneless sea-bass fillets", "350 g cherry tomatoes, halved", "180 ml water", "80 ml dry white wine, optional", "25 g extra-virgin olive oil", "2 garlic cloves (about 10 g)", "15 g fresh parsley", "3 g fine salt", "Freshly ground black pepper"], steps: ["Pat the fish dry, remove any pin bones and season lightly with salt and pepper.", "Warm the oil and crushed garlic in a wide pan over medium-low heat.", "Add the tomatoes and cook over medium heat for about 3 minutes.", "Add the wine and boil for 1 minute; if omitting it, add the same volume of water.", "Add 180 ml water and bring to a gentle simmer.", "Place the fish skin-side down in the shallow broth, cover and cook gently for 6–8 minutes.", "Depending on thickness, turn carefully and cook for another 2–4 minutes, to 63°C at the centre.", "Remove the fish and reduce the broth slightly if needed.", "Add parsley and adjust salt and pepper.", "Spoon the tomatoes and broth around the fish and serve immediately."], professionalTip: "Acqua pazza is a shallow broth, not a large pot of water; use only enough liquid to cook the fish gently and make a savoury sauce.", foodSafety: "Keep raw fish chilled and separate from ready-to-eat food; cook to 63°C. Cool leftovers and refrigerate within 2 hours.", allergens: "Contains fish; white wine may contain sulphites.", substitutions: "Use sea bream instead of sea bass; omit the wine and add 80 ml extra water.", products: "LuxurEat (露意膳) extra-virgin olive oil range", nutrition: [["Energy", "About 1,045 kJ / 250 kcal"], ["Fat", "About 10 g"], ["of which saturates", "About 2 g"], ["Carbohydrate", "About 5 g"], ["of which sugars", "About 3 g"], ["Protein", "About 36 g"], ["Fibre", "About 1.5 g"], ["Sodium", "About 440 mg"]], nutritionNote: "Estimated per serving; using wine will affect the result." },
  }, ["recipe-light-fennel-orange-salad", "recipe-light-grilled-zucchini"]);

  addDocumentedRecipe("family-spaghetti-pomodoro", images.recipeFamilyPomodoro, "olive-oil", {
    eyebrow: "适合中国家庭的意大利菜", title: "经典番茄意面", meta: "RECIPE · 家庭意大利菜", intro: "以番茄、蒜、罗勒和橄榄油完成的意大利国民经典，材料容易获得，关键在于酱汁收浓与面水乳化。",
    recipe: { description: "Spaghetti al Pomodoro", time: "35分钟", difficulty: "简单", servings: "4人份", region: "意大利国民经典", oil: "中等果香的特级初榨橄榄油。", ingredients: ["干 Spaghetti 320克", "番茄泥 Passata 500克", "特级初榨橄榄油30克", "蒜1瓣（约5克）", "新鲜罗勒12克", "细盐约7克（含煮面水）", "保留煮面水约150毫升"], steps: ["宽锅中加入橄榄油和拍裂的蒜，以中低火加热至出香，不要上色过深。", "加入番茄泥和少量盐，中小火煮约15–20分钟，期间偶尔搅拌。", "加入一半罗勒，继续煮至酱汁浓稠而仍有流动性。", "另锅烧足量水，加盐后放入意面。", "意面煮至比包装标示的 al dente 时间少约1分钟，保留约150毫升面水。", "意面转入番茄酱锅，加入少量面水，中火翻拌约1分钟。", "按需要继续少量补充面水，使酱汁均匀包裹面条。", "关火，加入剩余罗勒并拌匀。", "装盘后可淋少量橄榄油，立即上桌。"], professionalTip: "不要用糖修正番茄酱；应选择质量更好的番茄泥，或通过延长收汁获得自然甜度。", foodSafety: "开封番茄泥和煮熟意面应及时冷藏，不要在室温长时间放置。", allergens: "含麸质谷物；如使用含蛋意面则另含蛋。", substitutions: "可使用优质罐装番茄泥、全麦或无麸质意面；罗勒不建议用香菜替代。", products: "LuxurEat（露意膳）特级初榨橄榄油与意面产品", nutrition: [["能量", "约1530千焦 / 365千卡"], ["脂肪", "约9克"], ["其中饱和脂肪", "约1.5克"], ["碳水化合物", "约62克"], ["其中糖", "约7克"], ["蛋白质", "约12克"], ["膳食纤维", "约4克"], ["钠", "取决于煮面水盐度"]], nutritionNote: "营养数据为每份估算值。" },
  }, { eyebrow: "Italian Food for Chinese Homes", title: "Classic Spaghetti al Pomodoro", meta: "RECIPE · Italian Home Cooking", intro: "This Italian staple uses tomato, garlic, basil and olive oil. The ingredients are accessible; reducing the sauce and emulsifying with pasta water make the difference.", recipe: { description: "Spaghetti al Pomodoro", time: "35 min", difficulty: "Easy", servings: "Serves 4", region: "An Italian national classic", oil: "A medium-fruity extra-virgin olive oil.", ingredients: ["320 g dried spaghetti", "500 g tomato passata", "30 g extra-virgin olive oil", "1 garlic clove (about 5 g)", "12 g fresh basil", "About 7 g fine salt, including pasta water", "About 150 ml reserved pasta water"], steps: ["Warm the oil and crushed garlic over medium-low heat until aromatic, without deep browning.", "Add the passata and a little salt; simmer for 15–20 minutes, stirring occasionally.", "Add half the basil and cook until thick but still fluid.", "Bring plenty of water to the boil in another pot, salt it and add the pasta.", "Cook until about 1 minute short of the package’s al dente time and reserve 150 ml pasta water.", "Transfer the pasta to the sauce, add a little pasta water and toss over medium heat for 1 minute.", "Add more pasta water in small amounts until the sauce coats the spaghetti evenly.", "Turn off the heat, add the remaining basil and toss.", "Plate, finish with a little oil if desired and serve immediately."], professionalTip: "Do not correct tomato sauce with sugar; choose better passata or reduce it longer for natural sweetness.", foodSafety: "Refrigerate opened passata and cooked pasta promptly; do not leave them at room temperature for long.", allergens: "Contains gluten cereals; egg pasta also contains egg.", substitutions: "Use quality canned passata, whole-wheat pasta or certified gluten-free pasta. Do not replace basil with coriander in the standard version.", products: "LuxurEat (露意膳) extra-virgin olive oil and pasta products", nutrition: [["Energy", "About 1,530 kJ / 365 kcal"], ["Fat", "About 9 g"], ["of which saturates", "About 1.5 g"], ["Carbohydrate", "About 62 g"], ["of which sugars", "About 7 g"], ["Protein", "About 12 g"], ["Fibre", "About 4 g"], ["Sodium", "Depends on pasta-water salinity"]], nutritionNote: "Estimated per serving." },
  }, ["recipe-family-zucchini-frittata", "recipe-family-chicken-cacciatora"]);

  addDocumentedRecipe("family-zucchini-frittata", images.recipeFamilyFrittata, "olive-oil", {
    eyebrow: "适合中国家庭的意大利菜", title: "西葫芦意式煎蛋", meta: "RECIPE · 家庭意大利菜", intro: "先炒去西葫芦多余水分，再与鸡蛋和帕玛森凝固成柔嫩烘蛋，是适合家庭平底锅完成的意大利日常菜。",
    recipe: { description: "Frittata di Zucchine", time: "35分钟", difficulty: "简单", servings: "4人份", region: "意大利家庭料理", oil: "果香温和的特级初榨橄榄油。", ingredients: ["鸡蛋6个（约300克）", "西葫芦450克", "洋葱80克", "帕玛森奶酪30克，磨碎", "特级初榨橄榄油20克", "细盐2.5克", "现磨黑胡椒适量"], steps: ["西葫芦洗净擦干，切成薄片；洋葱切细丝。", "不粘平底锅加入一半橄榄油，中火炒洋葱至变软。", "加入西葫芦和少量盐，中高火炒至水分明显减少，约6–8分钟。", "鸡蛋打入大碗，加入帕玛森、剩余盐和黑胡椒，搅匀。", "将炒好的西葫芦稍微放凉后加入蛋液。", "擦净锅底，加入剩余橄榄油并以中低火加热。", "倒入蛋液，轻轻晃平。", "盖锅，以小火煮8–10分钟，直至边缘凝固、中心仍略湿。", "借助大盘翻面，或放入预热烤箱上火完成表面。", "继续加热3–5分钟，中心温度达到71°C。", "静置5分钟后切块上桌。"], professionalTip: "西葫芦必须先炒去多余水分，否则烘蛋会松散并渗水。", foodSafety: "带壳鸡蛋应完全加热；中心温度达到71°C。高风险人群应使用巴氏杀菌蛋制品。", allergens: "含蛋、牛奶（帕玛森）。", substitutions: "帕玛森可换为 Grana Padano；无乳糖奶酪并不等于不含牛奶蛋白。", products: "LuxurEat（露意膳）特级初榨橄榄油产品", nutrition: [["能量", "约990千焦 / 235千卡"], ["脂肪", "约17克"], ["其中饱和脂肪", "约5.5克"], ["碳水化合物", "约6克"], ["其中糖", "约4克"], ["蛋白质", "约16克"], ["膳食纤维", "约1.5克"], ["钠", "约500毫克"]], nutritionNote: "营养数据为每份估算值。" },
  }, { eyebrow: "Italian Food for Chinese Homes", title: "Courgette Frittata", meta: "RECIPE · Italian Home Cooking", intro: "Courgettes are sautéed to remove excess moisture, then set with eggs and Parmigiano in an everyday Italian frittata suited to a home frying pan.", recipe: { description: "Frittata di Zucchine", time: "35 min", difficulty: "Easy", servings: "Serves 4", region: "Italian home cooking", oil: "A gently fruity extra-virgin olive oil.", ingredients: ["6 eggs (about 300 g)", "450 g courgettes", "80 g onion", "30 g Parmigiano, grated", "20 g extra-virgin olive oil", "2.5 g fine salt", "Freshly ground black pepper"], steps: ["Wash and dry the courgettes and slice thinly; thinly slice the onion.", "Warm half the oil in a non-stick pan and soften the onion over medium heat.", "Add courgettes and a little salt; cook over medium-high heat for 6–8 minutes until much of the moisture evaporates.", "Beat the eggs with Parmigiano, remaining salt and pepper.", "Cool the courgettes slightly and add them to the egg mixture.", "Wipe the pan, add the remaining oil and warm over medium-low heat.", "Pour in the egg mixture and level it gently.", "Cover and cook over low heat for 8–10 minutes, until the edges set and the centre remains slightly moist.", "Turn with a large plate, or finish the top under a preheated grill.", "Cook for another 3–5 minutes, to 71°C at the centre.", "Rest for 5 minutes, then slice and serve."], professionalTip: "Cook excess water out of the courgettes first or the frittata will be loose and watery.", foodSafety: "Cook shell eggs fully to 71°C at the centre. Use pasteurised egg products for high-risk diners.", allergens: "Contains egg and milk (Parmigiano).", substitutions: "Replace Parmigiano with Grana Padano. Lactose-free cheese is not the same as milk-protein-free cheese.", products: "LuxurEat (露意膳) extra-virgin olive oil range", nutrition: [["Energy", "About 990 kJ / 235 kcal"], ["Fat", "About 17 g"], ["of which saturates", "About 5.5 g"], ["Carbohydrate", "About 6 g"], ["of which sugars", "About 4 g"], ["Protein", "About 16 g"], ["Fibre", "About 1.5 g"], ["Sodium", "About 500 mg"]], nutritionNote: "Estimated per serving." },
  }, ["recipe-family-spaghetti-pomodoro", "recipe-family-chicken-cacciatora"]);

  addDocumentedRecipe("family-chicken-cacciatora", images.recipeFamilyCacciatora, "olive-oil", {
    eyebrow: "适合中国家庭的意大利菜", title: "意式猎人烩鸡", meta: "RECIPE · 家庭意大利菜", intro: "鸡腿与洋葱、胡萝卜、西芹、番茄、白葡萄酒和香草慢炖，是中部意大利风格浓郁而适合家庭操作的主菜。",
    recipe: { description: "Pollo alla Cacciatora", time: "约1小时", difficulty: "中等", servings: "4人份", region: "意大利中部，多地区有变体", oil: "结构感中等的特级初榨橄榄油。", ingredients: ["带骨去皮鸡腿900克", "番茄泥400克", "洋葱100克", "胡萝卜80克", "西芹60克", "特级初榨橄榄油30克", "干白葡萄酒100毫升", "蒜1瓣（约5克）", "迷迭香1枝", "月桂叶1片", "细盐5克", "现磨黑胡椒适量"], steps: ["鸡腿擦干，以盐和黑胡椒调味。", "厚底锅加入橄榄油，中高火分批将鸡腿表面煎至金黄。", "鸡腿取出备用，锅中保留油脂。", "加入切碎的洋葱、胡萝卜和西芹，中火炒5–7分钟。", "加入蒜、迷迭香和月桂叶，炒至出香。", "倒入白葡萄酒，刮起锅底焦香物并煮至液体约减半。", "加入番茄泥并搅匀。", "鸡腿放回锅中，酱汁应覆盖鸡肉约一半。", "煮沸后转小火，半盖锅盖炖约30–35分钟。", "期间翻动鸡腿，并按需少量加水。", "确认鸡肉最厚处中心温度达到74°C。", "取出迷迭香和月桂叶。", "按需收浓酱汁并调整盐和黑胡椒。", "静置数分钟后上桌。"], professionalTip: "鸡肉分批充分上色是风味基础；锅底焦香物必须用葡萄酒或水完整刮起。", foodSafety: "不要清洗生鸡肉；处理后清洁双手、砧板与台面。中心温度达到74°C，剩余成品在2小时内冷却冷藏。", allergens: "基础配方不含欧盟14大主要过敏原；葡萄酒可能含亚硫酸盐，番茄泥或高汤需核对标签。", substitutions: "可用其他带骨鸡腿或整鸡分件；葡萄酒可用低盐高汤或水替代。", products: "LuxurEat（露意膳）特级初榨橄榄油产品", nutrition: [["能量", "约1900千焦 / 455千卡"], ["脂肪", "约26克"], ["其中饱和脂肪", "约6克"], ["碳水化合物", "约11克"], ["其中糖", "约7克"], ["蛋白质", "约44克"], ["膳食纤维", "约3克"], ["钠", "约760毫克"]], nutritionNote: "营养数据为每份估算值。" },
  }, { eyebrow: "Italian Food for Chinese Homes", title: "Chicken Cacciatora", meta: "RECIPE · Italian Home Cooking", intro: "Chicken thighs braised with onion, carrot, celery, tomato, white wine and herbs make a deeply flavoured Central Italian-style main course for the home kitchen.", recipe: { description: "Pollo alla Cacciatora", time: "About 1 hr", difficulty: "Medium", servings: "Serves 4", region: "Central Italy, with regional variations", oil: "A medium-structured extra-virgin olive oil.", ingredients: ["900 g bone-in, skinless chicken thighs", "400 g tomato passata", "100 g onion", "80 g carrot", "60 g celery", "30 g extra-virgin olive oil", "100 ml dry white wine", "1 garlic clove (about 5 g)", "1 rosemary sprig", "1 bay leaf", "5 g fine salt", "Freshly ground black pepper"], steps: ["Pat the chicken dry and season with salt and pepper.", "Heat the oil in a heavy pan and brown the chicken in batches over medium-high heat.", "Remove the chicken, leaving the fat in the pan.", "Add chopped onion, carrot and celery and cook for 5–7 minutes.", "Add garlic, rosemary and bay and cook until aromatic.", "Pour in the wine, scrape up the browned residue and reduce the liquid by about half.", "Add the passata and stir.", "Return the chicken; the sauce should come about halfway up the pieces.", "Bring to the boil, reduce to low, partially cover and simmer for 30–35 minutes.", "Turn the chicken during cooking and add a little water if needed.", "Check that the thickest part reaches 74°C.", "Remove rosemary and bay.", "Reduce the sauce if needed and adjust salt and pepper.", "Rest for a few minutes before serving."], professionalTip: "Deep browning in uncrowded batches builds the flavour; deglaze every browned bit from the pan.", foodSafety: "Do not wash raw chicken. Clean hands, boards and worktops after handling it. Cook to 74°C and refrigerate leftovers within 2 hours.", allergens: "The base recipe contains none of the EU’s 14 major allergens; wine may contain sulphites, and passata or stock labels should be checked.", substitutions: "Use other bone-in thighs or a jointed chicken; replace wine with low-salt stock or water.", products: "LuxurEat (露意膳) extra-virgin olive oil range", nutrition: [["Energy", "About 1,900 kJ / 455 kcal"], ["Fat", "About 26 g"], ["of which saturates", "About 6 g"], ["Carbohydrate", "About 11 g"], ["of which sugars", "About 7 g"], ["Protein", "About 44 g"], ["Fibre", "About 3 g"], ["Sodium", "About 760 mg"]], nutritionNote: "Estimated per serving." },
  }, ["recipe-family-spaghetti-pomodoro", "recipe-family-zucchini-frittata"]);

  addDocumentedRecipe("truffle-summer-crostini", images.recipeTruffleCrostini, "truffle", {
    eyebrow: "松露食谱", title: "翁布里亚夏季黑松露烤面包", meta: "RECIPE · 松露食谱", intro: "翁布里亚风格烤面包以蒜香橄榄油承接夏季松露，低温处理并在最后刨片，保留易挥发香气。",
    recipe: { description: "Crostini al Tartufo Estivo", time: "20分钟", difficulty: "简单", servings: "4人份", region: "翁布里亚", oil: "风味温和、不压过松露的特级初榨橄榄油。", ingredients: ["乡村面包200克，切8片", "夏季松露 Tuber aestivum 30克", "特级初榨橄榄油50克", "蒜1瓣（约5克）", "细盐1.5克"], steps: ["松露以软刷彻底刷去泥土，快速冲洗后立即擦干。", "将20克松露细磨，剩余10克留作刨片。", "橄榄油与拍裂的蒜以极低火温热，不要让蒜上色。", "移除蒜并让油稍微降温，再拌入磨碎松露和盐。", "面包烤至两面金黄酥脆。", "趁热将松露油酱均匀涂在烤面包上。", "刨上剩余松露，立即上桌。"], professionalTip: "松露香气具有挥发性，不应长时间高温加热；磨碎部分只在油稍降温后加入。", foodSafety: "松露属于带土食材，必须刷洗干净、擦干并冷藏保存。", allergens: "含麸质谷物（面包）。", substitutions: "可用其他黑松露替代，但应按香气强度调整用量。", products: "LuxurEat（露意膳）松露与特级初榨橄榄油产品", nutrition: [["能量", "约1090千焦 / 260千卡"], ["脂肪", "约13克"], ["其中饱和脂肪", "约2克"], ["碳水化合物", "约26克"], ["其中糖", "约3克"], ["蛋白质", "约6克"], ["膳食纤维", "约2.5克"], ["钠", "约400毫克"]], nutritionNote: "营养数据为每份估算值。" },
  }, { eyebrow: "Truffle Recipes", title: "Summer Truffle Crostini", meta: "RECIPE · Truffle", intro: "Umbrian-style crostini use garlic-scented olive oil to carry summer truffle, handled at low heat and shaved at the end to preserve its volatile aroma.", recipe: { description: "Crostini al Tartufo Estivo", time: "20 min", difficulty: "Easy", servings: "Serves 4", region: "Umbria", oil: "A mild extra-virgin olive oil that will not overpower the truffle.", ingredients: ["200 g country bread, cut into 8 slices", "30 g summer truffle (Tuber aestivum)", "50 g extra-virgin olive oil", "1 garlic clove (about 5 g)", "1.5 g fine salt"], steps: ["Brush all soil from the truffle, rinse briefly and dry immediately.", "Finely grate 20 g truffle and reserve 10 g for shaving.", "Warm the oil and crushed garlic over very low heat without browning the garlic.", "Remove the garlic, let the oil cool slightly, then mix in the grated truffle and salt.", "Toast the bread until golden and crisp on both sides.", "Spread the warm toast evenly with the truffle oil mixture.", "Shave over the remaining truffle and serve immediately."], professionalTip: "Truffle aroma is volatile, so avoid prolonged high heat; add the grated truffle only after the oil cools slightly.", foodSafety: "Truffles carry soil and must be brushed clean, dried and kept refrigerated.", allergens: "Contains gluten cereals (bread).", substitutions: "Use another black truffle, adjusting the quantity to its aroma intensity.", products: "LuxurEat (露意膳) truffle and extra-virgin olive oil products", nutrition: [["Energy", "About 1,090 kJ / 260 kcal"], ["Fat", "About 13 g"], ["of which saturates", "About 2 g"], ["Carbohydrate", "About 26 g"], ["of which sugars", "About 3 g"], ["Protein", "About 6 g"], ["Fibre", "About 2.5 g"], ["Sodium", "About 400 mg"]], nutritionNote: "Estimated per serving." },
  }, ["recipe-truffle-trout", "recipe-truffle-lamb"]);

  addDocumentedRecipe("truffle-trout", images.recipeTruffleTrout, "truffle", {
    eyebrow: "松露食谱", title: "翁布里亚黑松露鳟鱼", meta: "RECIPE · 松露食谱", intro: "来自翁布里亚 Valnerina 的传统搭配，以温和烹调的鳟鱼承接黑松露和蒜香橄榄油。",
    recipe: { description: "Trota al Tartufo Nero", time: "35分钟", difficulty: "中等", servings: "2人份", region: "翁布里亚 Valnerina", oil: "温和果香的特级初榨橄榄油。", ingredients: ["整条去内脏鳟鱼2条，每条约300克", "黑松露30克", "特级初榨橄榄油30克", "蒜1瓣（约5克）", "细盐3克", "新鲜欧芹5克，可选"], steps: ["鳟鱼清理干净，冲洗后彻底擦干。", "鱼腹和表面轻撒盐。", "烤箱预热至190°C，鳟鱼放入烤盘并淋少量橄榄油。", "烤约15–18分钟，至鱼肉刚熟、中心温度达到63°C。", "其余橄榄油与拍裂的蒜以低火温热，不要上色。", "移除蒜，加入20克细磨黑松露。", "鳟鱼去头、去骨并保持鱼肉完整。", "将松露油汁淋在鱼肉上。", "刨上剩余10克松露，可用欧芹点缀后立即上桌。"], professionalTip: "酱汁应保持简单，鱼肉也不要过熟；温润鱼肉能承接松露，而不会被强烈调味覆盖。", foodSafety: "生鱼应冷藏并与即食食材分开处理；中心温度达到63°C。剩余成品及时冷藏。", allergens: "含鱼类。", substitutions: "可用肉质细嫩的淡水鱼替代，但不应称为传统 Valnerina 版本。", products: "LuxurEat（露意膳）黑松露与特级初榨橄榄油产品", nutrition: [["能量", "约2280千焦 / 545千卡"], ["脂肪", "约35克"], ["其中饱和脂肪", "约6克"], ["碳水化合物", "约1克"], ["其中糖", "少于1克"], ["蛋白质", "约63克"], ["膳食纤维", "约0.5克"], ["钠", "约730毫克"]], nutritionNote: "营养数据为每份估算值。" },
  }, { eyebrow: "Truffle Recipes", title: "Trout with Black Truffle", meta: "RECIPE · Truffle", intro: "A Valnerina tradition from Umbria, pairing gently cooked trout with black truffle and garlic-scented olive oil.", recipe: { description: "Trota al Tartufo Nero", time: "35 min", difficulty: "Medium", servings: "Serves 2", region: "Valnerina, Umbria", oil: "A gently fruity extra-virgin olive oil.", ingredients: ["2 whole gutted trout, about 300 g each", "30 g black truffle", "30 g extra-virgin olive oil", "1 garlic clove (about 5 g)", "3 g fine salt", "5 g fresh parsley, optional"], steps: ["Clean the trout, rinse and dry thoroughly.", "Season the cavities and surfaces lightly with salt.", "Preheat the oven to 190°C, place the trout in a roasting dish and drizzle with a little oil.", "Roast for 15–18 minutes, until just cooked and 63°C at the centre.", "Warm the remaining oil and crushed garlic over low heat without browning.", "Remove the garlic and add 20 g finely grated black truffle.", "Remove the heads and bones while keeping the fillets intact.", "Spoon over the truffle oil.", "Shave over the remaining 10 g truffle, garnish with parsley if desired and serve immediately."], professionalTip: "Keep the sauce simple and the fish moist; gentle trout carries the truffle without masking it.", foodSafety: "Keep raw fish chilled and separate from ready-to-eat food; cook to 63°C and refrigerate leftovers promptly.", allergens: "Contains fish.", substitutions: "Use another delicate freshwater fish, but do not present it as the traditional Valnerina version.", products: "LuxurEat (露意膳) black truffle and extra-virgin olive oil products", nutrition: [["Energy", "About 2,280 kJ / 545 kcal"], ["Fat", "About 35 g"], ["of which saturates", "About 6 g"], ["Carbohydrate", "About 1 g"], ["of which sugars", "Less than 1 g"], ["Protein", "About 63 g"], ["Fibre", "About 0.5 g"], ["Sodium", "About 730 mg"]], nutritionNote: "Estimated per serving." },
  }, ["recipe-truffle-summer-crostini", "recipe-truffle-lamb"]);

  addDocumentedRecipe("truffle-lamb", images.recipeTruffleLamb, "truffle", {
    eyebrow: "松露食谱", title: "翁布里亚黑松露烩羊肉", meta: "RECIPE · 松露食谱", intro: "翁布里亚 Valnerina 风格慢炖羊肉，以白葡萄酒、迷迭香和黑松露完成；松露在最后加入，避免香气流失。",
    recipe: { description: "Agnello al Tartufo Nero", time: "约1小时45分钟", difficulty: "中等", servings: "6人份", region: "翁布里亚 Valnerina", oil: "结构感中等的特级初榨橄榄油。", ingredients: ["去骨羊肩或羊腿肉1.2千克，切约4厘米块", "黑松露50克", "特级初榨橄榄油35克", "蒜2瓣（约10克）", "迷迭香2克", "干白葡萄酒180毫升", "低盐或无盐高汤约250毫升，按需", "细盐7克", "现磨黑胡椒适量"], steps: ["羊肉擦干，以盐和黑胡椒调味。", "厚底锅加入橄榄油，中高火分批将羊肉煎至表面金黄。", "羊肉取出备用。", "锅中加入拍裂的蒜和迷迭香，短暂炒香。", "羊肉放回锅中，倒入白葡萄酒。", "刮起锅底焦香物，煮至酒液约减半。", "加入足量高汤，使液体达到羊肉约一半高度。", "煮沸后转小火，半盖锅盖炖约60–75分钟。", "期间翻动并按需补充少量高汤，直至羊肉柔嫩。", "确认中心温度至少达到63°C并静置；慢炖通常会达到更高温度。", "关火，加入30克细磨黑松露拌入酱汁。", "装盘后刨上剩余20克松露，立即上桌。"], professionalTip: "松露应在烹调结束时加入；长时间炖煮会显著削弱其香气。", foodSafety: "生羊肉应使用独立砧板并避免交叉污染。整块羊肉最低中心温度63°C并静置，慢炖菜通常加热至更高温度。", allergens: "基础配方不含欧盟14大主要过敏原；高汤可能含西芹或麸质，葡萄酒可能含亚硫酸盐。", substitutions: "可用羊肩或羊腿；葡萄酒可用高汤替代。", products: "LuxurEat（露意膳）黑松露与特级初榨橄榄油产品", nutrition: [["能量", "约2130千焦 / 510千卡"], ["脂肪", "约25克"], ["其中饱和脂肪", "约8克"], ["碳水化合物", "约2克"], ["其中糖", "约1克"], ["蛋白质", "约57克"], ["膳食纤维", "少于1克"], ["钠", "约580毫克"]], nutritionNote: "营养数据为每份估算值。" },
  }, { eyebrow: "Truffle Recipes", title: "Lamb with Black Truffle", meta: "RECIPE · Truffle", intro: "A Valnerina-style lamb braise with white wine, rosemary and black truffle; the truffle is added at the end to preserve its aroma.", recipe: { description: "Agnello al Tartufo Nero", time: "About 1 hr 45 min", difficulty: "Medium", servings: "Serves 6", region: "Valnerina, Umbria", oil: "A medium-structured extra-virgin olive oil.", ingredients: ["1.2 kg boneless lamb shoulder or leg, cut into 4 cm pieces", "50 g black truffle", "35 g extra-virgin olive oil", "2 garlic cloves (about 10 g)", "2 g rosemary", "180 ml dry white wine", "About 250 ml low-salt or unsalted stock, as needed", "7 g fine salt", "Freshly ground black pepper"], steps: ["Pat the lamb dry and season with salt and pepper.", "Heat the oil in a heavy pan and brown the lamb in batches over medium-high heat.", "Remove the lamb.", "Briefly cook crushed garlic and rosemary in the pan.", "Return the lamb and add the wine.", "Scrape up the browned residue and reduce the wine by about half.", "Add enough stock to come halfway up the lamb.", "Bring to the boil, reduce to low, partially cover and braise for 60–75 minutes.", "Turn the meat and add small amounts of stock as needed, until tender.", "Ensure the centre reaches at least 63°C and rest; a braise normally reaches a higher temperature.", "Turn off the heat and stir 30 g finely grated black truffle into the sauce.", "Plate, shave over the remaining 20 g truffle and serve immediately."], professionalTip: "Add truffle at the end; prolonged braising significantly weakens its aroma.", foodSafety: "Use a separate board for raw lamb and prevent cross-contamination. Whole cuts require at least 63°C plus a rest; braises normally cook hotter.", allergens: "The base recipe contains none of the EU’s 14 major allergens; stock may contain celery or gluten and wine may contain sulphites.", substitutions: "Use lamb shoulder or leg; replace wine with stock.", products: "LuxurEat (露意膳) black truffle and extra-virgin olive oil products", nutrition: [["Energy", "About 2,130 kJ / 510 kcal"], ["Fat", "About 25 g"], ["of which saturates", "About 8 g"], ["Carbohydrate", "About 2 g"], ["of which sugars", "About 1 g"], ["Protein", "About 57 g"], ["Fibre", "Less than 1 g"], ["Sodium", "About 580 mg"]], nutritionNote: "Estimated per serving." },
  }, ["recipe-truffle-summer-crostini", "recipe-truffle-trout"]);

  // Keep the documented recipes verbatim in Chinese and aligned with their English translations.
  Object.assign(articles["en-recipe-light-fennel-orange-salad"], { title: "Sicilian Fennel, Orange and Black Olive Salad" });
  Object.assign(articles["en-recipe-light-grilled-zucchini"], { title: "Marinated Grilled Zucchini" });
  Object.assign(articles["en-recipe-light-sea-bass-acqua-pazza"], { title: "Sea Bass all’Acqua Pazza" });
  Object.assign(articles["en-recipe-truffle-summer-crostini"], { title: "Umbrian Crostini with Summer Black Truffle" });
  Object.assign(articles["en-recipe-truffle-trout"], { title: "Umbrian Trout with Black Truffle" });
  Object.assign(articles["en-recipe-truffle-lamb"], { title: "Umbrian Lamb with Black Truffle" });
  Object.assign(articles["en-recipe-family-zucchini-frittata"], { title: "Italian Zucchini Frittata" });
  Object.assign(articles["en-recipe-family-chicken-cacciatora"], { title: "Italian Hunter-Style Chicken" });

  const localiseChineseRecipe = (text) => text
      .replaceAll("干 Spaghetti", "干意大利细面")
      .replaceAll("番茄泥 Passata", "番茄泥")
      .replaceAll("番茄 Passata", "番茄泥")
      .replaceAll("比包装标示的 al dente 时间", "比包装标示的最佳嚼劲时间")
      .replaceAll("达到 al dente", "达到理想嚼劲")
      .replaceAll("Aglio, Olio e Peperoncino", "蒜香辣椒橄榄油意面")
      .replaceAll("Panzanella", "托斯卡纳面包沙拉")
      .replaceAll("Pinzimonio", "意式生蔬菜配橄榄油蘸汁")
      .replaceAll("Acqua pazza", "意式番茄水煮")
      .replaceAll("Tuber aestivum", "夏季黑松露")
      .replaceAll("Valnerina", "瓦尔内里纳")
      .replaceAll("Grana Padano", "格拉娜帕达诺奶酪");
  Object.values(articles).forEach((article) => {
    if (article.lang !== "zh" || article.type !== "recipe" || !article.recipe) return;
    article.intro = localiseChineseRecipe(article.intro);
    Object.entries(article.recipe).forEach(([key, value]) => {
      if (typeof value === "string") article.recipe[key] = localiseChineseRecipe(value);
      if (Array.isArray(value)) article.recipe[key] = value.map((item) => Array.isArray(item) ? item.map(localiseChineseRecipe) : localiseChineseRecipe(item));
    });
    article.recipe.description = "";
  });

  const recipeProfiles = {
    "truffle-eggs": { zh: ["参考：意大利家庭早餐", "含蛋；如使用黄油需注意牛奶过敏原", "鸡蛋可按个人饮食替换；松露片可用适量松露产品替代", "特级初榨橄榄油或黄油，按实际产品标签使用", "松露产品目录（以实际库存和标签为准）"], en: ["Reference: Italian home breakfast", "Contains egg; butter adds a milk allergen", "Use a dietary egg alternative if appropriate; truffle slices may be replaced by a suitable truffle product", "Extra-virgin olive oil or butter, following the product label", "Truffle catalogue (subject to live stock and label)" ] },
    "truffle-toast": { zh: ["参考：意大利早午餐", "含麸质、蛋、奶；刺山柑按实际包装确认", "乡村面包可替换为法棍或无麸质面包；罗比奥拉可替换为里科塔", "风味清新的特级初榨橄榄油", "松露产品目录（以实际库存和标签为准）"], en: ["Reference: Italian brunch", "Contains gluten, egg and milk; check capers on the package", "Replace country bread with baguette or gluten-free bread; robiola with ricotta", "A fresh extra-virgin olive oil", "Truffle catalogue (subject to live stock and label)" ] },
    "truffle-tagliolini": { zh: ["参考：皮埃蒙特风味", "含麸质、蛋、奶", "新鲜意面可替换为干意面；黄油可用橄榄油减少乳制品", "温和果香型特级初榨橄榄油", "松露产品目录（以实际库存和标签为准）"], en: ["Reference: Piedmont-style", "Contains gluten, egg and milk", "Fresh pasta can be replaced by dried pasta; use olive oil to reduce dairy", "A gentle, fruity extra-virgin olive oil", "Truffle catalogue (subject to live stock and label)" ] },
    "truffle-ravioli": { zh: ["参考：意大利北部风味", "含麸质、奶；馅料可能含蛋", "奶酪馅可替换为蘑菇馅；鲜奶油可用无糖燕麦烹饪奶替代但需确认配方", "中等果香型特级初榨橄榄油", "松露产品目录（以实际库存和标签为准）"], en: ["Reference: Northern Italian style", "Contains gluten and milk; filling may contain egg", "Replace cheese filling with mushroom; unsweetened oat cooking cream can replace dairy if the label allows", "A medium-fruity extra-virgin olive oil", "Truffle catalogue (subject to live stock and label)" ] },
    "black-truffle-risotto": { zh: ["参考：皮埃蒙特 / 伦巴第风味", "含奶；高汤与奶酪需按包装确认麸质和其他过敏原", "卡纳罗利米可替换为其他圆粒米；白葡萄酒可用无酒精高汤替代", "结构感中等的特级初榨橄榄油", "松露产品目录（以实际库存和标签为准）"], en: ["Reference: Piedmont / Lombardy style", "Contains milk; check stock and cheese labels for gluten and other allergens", "Carnaroli can be replaced by another round-grain rice; wine by alcohol-free stock", "A medium-structured extra-virgin olive oil", "Truffle catalogue (subject to live stock and label)" ] },
    "mushroom-soup": { zh: ["参考：翁布里亚 / 中部意大利风味", "如加入奶油则含奶；高汤需按包装确认", "奶油可省略或用无糖燕麦奶替代；香菇、口蘑可按供应替换", "果香温和的特级初榨橄榄油", "松露产品目录（以实际库存和标签为准）"], en: ["Reference: Umbrian / Central Italian style", "Contains milk if cream is used; check the stock label", "Omit cream or use unsweetened oat milk; mushrooms can follow local supply", "A gently fruity extra-virgin olive oil", "Truffle catalogue (subject to live stock and label)" ] },
    "beef-carpaccio-scallop-truffle": { zh: ["参考：皮埃蒙特现代前菜", "含鱼类/贝类；可能含芥末或其他酱汁过敏原，按包装确认", "扇贝可换熟虾；生牛肉应使用符合食品安全要求的原料，不建议高风险人群食用", "清新、低苦味的特级初榨橄榄油", "松露产品目录（以实际库存和标签为准）"], en: ["Reference: modern Piedmont-style starter", "Contains fish and shellfish; check any mustard or sauce allergens", "Scallops can be replaced by cooked shrimp; use food-safe beef and avoid for high-risk groups", "A fresh, low-bitterness extra-virgin olive oil", "Truffle catalogue (subject to live stock and label)" ] },
    "shrimp-tartare-truffle": { zh: ["参考：利古里亚海岸风味", "含甲壳类；可能含鱼类或芥末，按包装确认", "生虾可改用彻底加热的虾；青柠可用柠檬替代", "清新果香型特级初榨橄榄油", "松露产品目录（以实际库存和标签为准）"], en: ["Reference: Ligurian coastal style", "Contains crustaceans; check fish or mustard in sauces", "Replace raw shrimp with fully cooked shrimp; lime with lemon", "A fresh, fruity extra-virgin olive oil", "Truffle catalogue (subject to live stock and label)" ] },
    "sweet-bread-butter-caviar": { zh: ["参考：威尼斯风味甜咸小食", "含麸质、奶、鱼类；面包与鱼子酱标签需确认", "奶油蛋卷可换小片法棍；黄油可用无乳涂抹酱但需确认鱼子酱搭配", "此食谱以无额外用油为主，可用少量温和橄榄油收尾", "鱼子酱产品目录（以实际库存和标签为准）"], en: ["Reference: Venetian-style sweet-savoury bite", "Contains gluten, milk and fish; check bread and caviar labels", "Brioche can be replaced with baguette; use a dairy-free spread only after checking compatibility", "No added oil is required; a little mild olive oil can finish", "Caviar catalogue (subject to live stock and label)" ] },
    "truffle-tiramisu": { zh: ["参考：威尼托甜点的创意表达", "含蛋、奶、麸质；咖啡利口酒可能含酒精", "马斯卡彭可用奶油奶酪；手指饼可按包装替换为无麸质版本", "此食谱以松露油为风味点缀，不建议过量", "松露产品目录（以实际库存和标签为准）"], en: ["Reference: Veneto-inspired dessert", "Contains egg, milk and gluten; coffee liqueur may contain alcohol", "Mascarpone can be replaced by cream cheese; check a gluten-free biscuit label", "Truffle oil is a finishing accent and should be used sparingly", "Truffle catalogue (subject to live stock and label)" ] },
  };
  const recipeProductCategories = {
    "truffle-eggs": "truffle",
    "truffle-toast": "truffle",
    "truffle-tagliolini": "truffle",
    "truffle-ravioli": "truffle",
    "black-truffle-risotto": "truffle",
    "mushroom-soup": "truffle",
    "beef-carpaccio-scallop-truffle": "truffle",
    "shrimp-tartare-truffle": "truffle",
    "sweet-bread-butter-caviar": "caviar",
    "truffle-tiramisu": "truffle",
  };
  Object.entries(articles).forEach(([id, article]) => {
    if (article.type !== "recipe" || !article.recipe) return;
    const key = id.replace(/^(?:zh|en)-recipe-/, "");
    article.productCategory = recipeProductCategories[key] || (article.topic === "olive" ? "olive-oil" : article.topic);
    const profile = recipeProfiles[key]?.[article.lang];
    if (!profile) return;
    ["region", "allergens", "substitutions", "oil", "products"].forEach((field, index) => {
      if (!article.recipe[field]) article.recipe[field] = profile[index];
    });
  });

  window.LUXUREAT_ARTICLE_DATA = { images, articles };
})();
