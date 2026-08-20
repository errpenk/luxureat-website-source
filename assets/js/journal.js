const luxJournalAssetBase = new URL("../", document.currentScript?.src || location.href);
const luxJournalAsset = (path) => new URL(path, luxJournalAssetBase).href;

function initLuxReader() {
  const articleData = window.LUXUREAT_ARTICLE_DATA || {};
  window.luxResponsiveData?.(articleData);
  window.luxResponsiveData?.(window.LUXUREAT_EVENT_DATA);
  const articles = articleData.articles || {};
  const events = window.LUXUREAT_EVENT_DATA?.events || [];
  const eventMount = document.querySelector("[data-recent-events]");
  const mapMount = document.querySelector("[data-exhibition-map]");
  const newsMount = document.querySelector("[data-news-center]");
  const aboutMount = document.querySelector("[data-about-story]");
  const recipeLibraryMount = document.querySelector("[data-recipe-library-app]");
  const eventHash = decodeURIComponent(location.hash).replace(/^#event-/, "");
  const readerHash = decodeURIComponent(location.hash).replace(/^#reader-/, "");
  const triggers = document.querySelectorAll("[data-reader-open], [data-reader-archive], [data-event-open]");
  if (!triggers.length && !eventMount && !mapMount && !newsMount && !aboutMount && !recipeLibraryMount && !events.some((event) => event.id === eventHash)) return;
  if (!Object.keys(articles).length && !events.length) return;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const labels = () => document.documentElement.lang?.startsWith("zh")
    ? { back: "返回", close: "关闭", related: "延伸阅读", read: "阅读详情", archive: "往期随笔", note: "品鉴笔记", noteText: "温度、器具与节奏共同决定入口的第一层印象；真正的奢华来自克制而准确的服务。" }
    : { back: "Back", close: "Close", related: "Further Reading", read: "View Details", archive: "Archive", note: "Tasting Notes", noteText: "Temperature, service ware, and pacing shape the first impression; luxury is restraint made precise." };
  const archiveGroups = () => document.documentElement.lang?.startsWith("zh")
    ? [
      ["品牌与产业", ["zh-harvest", "zh-truffle", "zh-service"]],
      ["品鉴与文化", ["zh-malossol", "zh-champagne"]],
      ["品质与溯源", ["zh-mother-of-pearl"]],
    ]
    : [
      ["Brand & Industry", ["en-harvest", "en-truffle", "en-service"]],
      ["Tasting & Culture", ["en-malossol", "en-champagne"]],
      ["Quality & Traceability", ["en-mother-of-pearl"]],
    ];
  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const requestedRecipe = new URLSearchParams(location.search).get("recipe");
  const contentLinks = lang === "zh" ? {
    truffle: { knowledge: { label: "为什么松露只需要一点？理解松露的香气与风味搭配", href: "blog.html?article=truffle-truffle-aroma-pairing" }, recipe: { label: "查看白松露或黑松露细面食谱 →", href: "recipe.html?recipe=truffle-tagliolini" }, product: "松露产品目录（以实际库存和标签为准）", productCategory: "truffle" },
    olive: { knowledge: { label: "如何选择、使用与保存特级初榨橄榄油", href: "blog.html?article=choose-use-store-evo" }, recipe: { label: "查看蒜香橄榄油意面食谱 →", href: "recipe.html?recipe=olive-pasta" }, product: "橄榄油产品目录（以实际库存和标签为准）", productCategory: "olive-oil" },
    caviar: { knowledge: { label: "鱼子酱的风味搭配与品鉴", href: "blog.html?article=pairings-class" }, recipe: { label: "查看甜面包配黄油和鱼子酱食谱 →", href: "recipe.html?recipe=sweet-bread-butter-caviar" } },
    pizza: { knowledge: { label: "意大利披萨的面团、发酵与烘烤基础", href: "blog.html?article=pizza-fundamentals" }, recipe: { label: "查看经典玛格丽特披萨食谱 →", href: "recipe.html?recipe=pizza-margherita" } },
    gelato: { knowledge: { label: "意式手工冰淇淋与普通冰淇淋有什么不同？", href: "blog.html?article=gelato-vs-ice-cream" }, recipe: { label: "查看经典意式手工冰淇淋食谱 →", href: "recipe.html?recipe=gelato-classic" } },
  } : {
    truffle: { knowledge: { label: "Why Does Truffle Often Need Only a Little? Understanding Aroma and Pairing", href: "blog.html?article=truffle-truffle-aroma-pairing" }, recipe: { label: "View the Tagliolini with White or Black Truffle recipe →", href: "recipe.html?recipe=truffle-tagliolini" }, product: "Truffle product catalogue (subject to current stock and labels)", productCategory: "truffle" },
    olive: { knowledge: { label: "How to Choose, Use and Store Extra Virgin Olive Oil", href: "blog.html?article=choose-use-store-evo" }, recipe: { label: "View the Garlic and Olive Oil Pasta recipe →", href: "recipe.html?recipe=olive-pasta" }, product: "Olive oil product catalogue (subject to current stock and labels)", productCategory: "olive-oil" },
    caviar: { knowledge: { label: "Caviar Flavour Pairing and Tasting", href: "blog.html?article=pairings-class" }, recipe: { label: "View the Sweet Bread with Butter and Caviar recipe →", href: "recipe.html?recipe=sweet-bread-butter-caviar" } },
    pizza: { knowledge: { label: "Italian Pizza Dough, Fermentation and Baking Fundamentals", href: "blog.html?article=pizza-fundamentals" }, recipe: { label: "View the Classic Margherita Pizza recipe →", href: "recipe.html?recipe=pizza-margherita" } },
    gelato: { knowledge: { label: "How Is Italian Gelato Different from Ordinary Ice Cream?", href: "blog.html?article=gelato-vs-ice-cream" }, recipe: { label: "View the Classic Italian Gelato recipe →", href: "recipe.html?recipe=gelato-classic" } },
  };
  const topicPatterns = { truffle: /松露|truffle/i, olive: /橄榄油|olive oil|extra virgin/i, caviar: /鱼子酱|caviar/i, pizza: /披萨|pizza/i, gelato: /冰淇淋|gelato/i };
  const topicFor = (id, article) => article.topic && contentLinks[article.topic] ? article.topic : Object.entries(topicPatterns).find(([, pattern]) => pattern.test(`${id} ${article.title || ""} ${(article.recipe?.ingredients || []).join(" ")}`))?.[0];
  const localized = (zh, en) => lang === "zh" ? zh : en;
  const guideLink = (slug, zh, en) => ({ label: localized(zh, en), href: `blog.html?article=${slug}` });
  const recipeLink = (slug, zh, en) => ({ label: localized(zh, en), href: `recipe.html?recipe=${slug}` });
  const productLink = (href, zh, en) => ({ label: localized(zh, en), href });
  const recipeKnowledgeRules = [
    [/truffle-tiramisu/, [guideLink("truffle-meets-dessert", "松露甜点中如何平衡香气与甜味", "How to Balance Truffle Aroma and Sweetness in Desserts"), guideLink("truffle-truffle-aroma-pairing", "理解松露用量与风味搭配", "Understanding Truffle Quantity and Flavour Pairing")]],
    [/truffle-summer-crostini/, [guideLink("truffle-truffle-types", "夏季松露与其他松露有什么不同？", "How Summer Truffle Differs from Other Truffles"), guideLink("truffle-buying-truffle-products", "整颗松露与松露制品应该如何选择？", "Choosing Whole Truffles and Truffle Products")]],
    [/(?:black-truffle-risotto|truffle-ravioli|mushroom-soup)/, [guideLink("truffle-buying-truffle-products", "为烩饭、馄饨与汤选择合适的松露产品", "Choosing Truffle Products for Risotto, Ravioli and Soup"), guideLink("truffle-truffle-aroma-pairing", "温度与脂肪如何释放松露香气", "How Temperature and Fat Release Truffle Aroma")]],
    [/(?:beef-carpaccio-scallop-truffle|shrimp-tartare-truffle|truffle-trout|truffle-lamb)/, [guideLink("truffle-truffle-types", "不同松露适合搭配哪些肉类与海鲜？", "Which Truffles Suit Meat and Seafood?"), guideLink("truffle-truffle-aroma-pairing", "松露与主食材的风味平衡原则", "Balancing Truffle with the Main Ingredient")]],
    [/(?:truffle-eggs|truffle-toast|truffle-tagliolini)/, [guideLink("truffle-truffle-aroma-pairing", "鸡蛋、黄油与意面为什么适合松露？", "Why Eggs, Butter and Pasta Suit Truffle"), guideLink("truffle-truffle-types", "根据菜式选择白松露、黑松露或夏季松露", "Choosing White, Black or Summer Truffle for a Dish")]],
    [/olive-bruschetta/, [guideLink("olive-tasting", "烤面包如何帮助品鉴橄榄油？", "How Bruschetta Helps You Taste Olive Oil"), guideLink("olive-how-to-choose", "选择适合生食和蘸食的橄榄油", "Choosing Olive Oil for Raw Serving and Dipping")]],
    [/olive-panzanella/, [guideLink("olive-recipes-guide", "橄榄油在托斯卡纳面包沙拉中的作用", "The Role of Olive Oil in Tuscan Panzanella"), guideLink("olive-tasting", "用香气、苦味与辛辣感调整沙拉", "Balancing Salad with Aroma, Bitterness and Pungency")]],
    [/olive-pinzimonio/, [guideLink("olive-how-to-choose", "如何选择适合生蔬菜蘸食的橄榄油", "How to Choose Olive Oil for Raw Vegetables"), guideLink("olive-tasting", "通过 Pinzimonio 练习橄榄油品鉴", "Practising Olive Oil Tasting with Pinzimonio")]],
    [/(?:light-fennel-orange-salad|light-grilled-zucchini|light-sea-bass-acqua-pazza)/, [guideLink("olive-tasting", "用香气、苦味与辛辣感搭配清淡菜式", "Pairing Light Dishes with Aroma, Bitterness and Pungency"), guideLink("olive-nutrition", "橄榄油在均衡饮食中的用量与位置", "Olive Oil Portions in a Balanced Diet")]],
    [/olive-pasta/, [guideLink("choose-use-store-evo", "意面用橄榄油的选择、使用与保存", "Choosing, Using and Storing Olive Oil for Pasta"), guideLink("olive-oil-basics", "理解特级初榨橄榄油的基础特征", "Understanding Extra Virgin Olive Oil Basics")]],
    [/family-spaghetti-pomodoro/, [guideLink("pasta-academy", "番茄酱汁应该搭配什么意面形状？", "Which Pasta Shapes Suit Tomato Sauce?"), guideLink("dictionary-pasta-risotto", "意面与烩饭基础术语", "Essential Pasta and Risotto Terms")]],
    [/(?:family-zucchini-frittata|family-chicken-cacciatora)/, [guideLink("cooking-techniques", "这道家庭料理使用的意大利烹饪技法", "Italian Techniques Used in This Home-Style Dish")]],
  ];
  const articleContentLinks = {
    "allergens-guide": [recipeLink("family-zucchini-frittata", "通过西葫芦烘蛋识别鸡蛋与乳制品过敏原", "Identify Egg and Dairy Allergens in a Courgette Frittata"), productLink("product.html?product=white-truffle-sauce-80g", "查看白松露酱的配料与过敏原信息", "Review Ingredients and Allergens for White Truffle Sauce")],
    "baerii-caviar": [recipeLink("sweet-bread-butter-caviar", "用贝氏鲟鱼子酱完成黄油甜面包", "Finish Buttered Sweet Bread with Baerii Caviar")],
    "beluga-caviar": [recipeLink("sweet-bread-butter-caviar", "参考黄油与鱼子酱的经典呈现方式", "See a Classic Butter-and-Caviar Presentation")],
    "caviar-processing": [recipeLink("sweet-bread-butter-caviar", "观察轻盐鱼子酱在温热食谱中的使用", "Use Malossol Caviar in a Warm Recipe")],
    "china-italian-evo": [recipeLink("olive-pasta", "用蒜香意面理解橄榄油在中国家庭厨房的应用", "Use Garlic Pasta to Explore EVOO in Chinese Home Kitchens"), productLink("new.html#olive-oil", "查看即将推出的意大利橄榄油系列", "Explore the Upcoming Italian Olive Oil Range")],
    "china-italian-gelato": [recipeLink("gelato-classic", "在家制作基础意式手工冰淇淋", "Make a Classic Gelato Base at Home"), productLink("new.html#gelato", "查看意式手工冰淇淋新品计划", "Explore the Upcoming Gelato Range")],
    "china-pizza-pinsa": [recipeLink("pizza-margherita", "先用玛格丽特披萨练习面团与炉温", "Practise Dough and Oven Control with Margherita Pizza"), productLink("new.html#pizza", "查看披萨与 Pinsa 原料计划", "Explore the Pizza and Pinsa Ingredient Range")],
    "choose-use-store-evo": [recipeLink("olive-pasta", "把橄榄油用于蒜香意面的乳化收尾", "Use EVOO to Emulsify and Finish Garlic Pasta"), recipeLink("olive-bruschetta", "把橄榄油用于烤面包生食调味", "Use EVOO Raw on Bruschetta"), productLink("new.html#olive-oil", "查看意大利橄榄油产品计划", "Explore the Italian Olive Oil Range")],
    "clean-label": [recipeLink("mushroom-soup", "从菌菇汤配料理解“简单配方”", "Explore Simple Ingredient Lists with Mushroom Soup"), productLink("product.html?product=winter-black-truffle-sauce-80g", "核对冬季黑松露酱的正式标签", "Review the Winter Black Truffle Sauce Label")],
    "cooking-techniques": [recipeLink("family-chicken-cacciatora", "用猎人烩鸡练习煎香与慢炖", "Practise Browning and Braising with Chicken Cacciatora"), recipeLink("light-sea-bass-acqua-pazza", "用海鲈鱼练习温和水煮火候", "Practise Gentle Cooking with Acqua Pazza Sea Bass")],
    "dictionary-cheese-cured-meat": [recipeLink("pizza-margherita", "在玛格丽特披萨中认识莫扎里拉奶酪", "Understand Mozzarella through Margherita Pizza"), recipeLink("truffle-toast", "用奶酪与松露烤面包理解风味搭配", "Explore Cheese Pairing with Truffle Toast")],
    "dictionary-cooking-methods": [recipeLink("family-chicken-cacciatora", "用猎人烩鸡理解煎与炖", "Understand Browning and Braising with Chicken Cacciatora"), recipeLink("light-grilled-zucchini", "用烤西葫芦理解 Griglia 烹饪", "Understand Griglia Cooking with Courgettes")],
    "dictionary-food-labels": [productLink("product.html?product=summer-truffle-slices-water-350g", "用水浸夏季松露片练习阅读食品标签", "Practise Reading a Food Label with Summer Truffle Slices")],
    "dictionary-italian-menu": [recipeLink("family-chicken-cacciatora", "从猎人烩鸡认识意大利主菜", "Learn Italian Main-Course Terms with Chicken Cacciatora"), recipeLink("gelato-classic", "从意式手工冰淇淋认识甜点栏目", "Learn Dessert Menu Terms with Gelato")],
    "dictionary-pasta-risotto": [recipeLink("family-spaghetti-pomodoro", "用番茄意面理解意面形状与酱汁", "Understand Pasta Shapes with Spaghetti al Pomodoro"), recipeLink("black-truffle-risotto", "用黑松露烩饭理解 Risotto 技法", "Understand Risotto Technique with Black Truffle Risotto")],
    "evo-chocolate-dessert": [recipeLink("gelato-classic", "在经典意式冰淇淋上尝试少量橄榄油", "Try a Small EVOO Finish on Classic Gelato"), productLink("new.html#olive-oil", "选择适合甜点的意大利橄榄油", "Explore Italian Olive Oils for Desserts")],
    "evo-vs-common-cooking-oil": [recipeLink("light-grilled-zucchini", "用烤西葫芦比较橄榄油的完成风味", "Compare Finishing Flavour on Grilled Courgettes"), recipeLink("olive-pasta", "观察橄榄油在意面乳化中的作用", "See EVOO's Role in Pasta Emulsification"), productLink("new.html#olive-oil", "查看意大利橄榄油产品方向", "Explore the Italian Olive Oil Range")],
    "gelato-flavours": [recipeLink("gelato-classic", "用基础配方练习牛奶、香草与坚果风味", "Practise Milk, Vanilla and Nut Flavours with a Classic Base"), productLink("new.html#gelato", "查看意式手工冰淇淋基底与新品", "Explore Gelato Bases and New Products")],
    "gelato-history": [recipeLink("gelato-classic", "从经典配方理解现代意式手工冰淇淋", "Connect Gelato History with a Classic Modern Recipe")],
    "gelato-vs-ice-cream": [recipeLink("gelato-classic", "用经典配方比较空气量与食用温度", "Compare Overrun and Serving Temperature with a Classic Recipe"), productLink("new.html#gelato", "查看意式手工冰淇淋产品计划", "Explore the Gelato Product Plan")],
    "history-of-caviar": [recipeLink("sweet-bread-butter-caviar", "从经典食谱认识鱼子酱的现代餐桌应用", "See Caviar's Modern Table Role in a Classic Recipe")],
    "ingredients-territory": [recipeLink("light-sea-bass-acqua-pazza", "从海鲈鱼、番茄与橄榄油理解产地组合", "Explore Terroir through Sea Bass, Tomato and Olive Oil"), productLink("product.html?product=whole-summer-truffles-35g", "查看整颗夏季松露的产地与标签信息", "Review Origin and Label Details for Whole Summer Truffle")],
    "italian-food-culture": [recipeLink("family-spaghetti-pomodoro", "从番茄意面进入意大利家庭餐桌", "Enter Italian Home Cooking through Spaghetti al Pomodoro"), recipeLink("olive-panzanella", "从托斯卡纳面包沙拉理解地方饮食", "Explore Regional Food through Tuscan Panzanella")],
    "italian-gelato-vs-ice-cream": [recipeLink("gelato-classic", "实际制作并比较意式手工冰淇淋质地", "Make Gelato and Compare Its Texture with Ice Cream"), productLink("new.html#gelato", "了解意式手工冰淇淋原料计划", "Explore the Gelato Ingredient Plan")],
    "italy-regions": [recipeLink("black-truffle-risotto", "从北部烩饭理解地域差异", "Explore Northern Italy through Truffle Risotto"), recipeLink("pizza-margherita", "从那不勒斯披萨理解南部传统", "Explore Southern Italy through Neapolitan Pizza")],
    "kaluga-amur-caviar": [recipeLink("sweet-bread-butter-caviar", "用黄油甜面包比较卡露伽与其他鱼子酱", "Compare Kaluga with Other Caviars on Buttered Sweet Bread")],
    "main-types-of-caviar": [recipeLink("sweet-bread-butter-caviar", "用同一基础食谱比较不同鱼子酱类型", "Compare Caviar Types with One Neutral Recipe")],
    "modern-pinsa-romana": [recipeLink("pizza-margherita", "先掌握披萨面团，再理解 Pinsa 的差异", "Master Pizza Dough before Comparing Pinsa"), productLink("new.html#pizza", "查看披萨与 Pinsa 原料系列", "Explore Pizza and Pinsa Ingredients")],
    "neapolitan-roman-pizza-styles": [recipeLink("pizza-margherita", "用玛格丽特披萨实践那不勒斯风格", "Practise Neapolitan Style with Margherita Pizza"), productLink("new.html#pizza", "查看适合不同披萨风格的原料方向", "Explore Ingredients for Different Pizza Styles")],
    "nutrition-labels": [recipeLink("light-fennel-orange-salad", "用清淡沙拉理解每份营养与用油量", "Understand Portions and Oil Quantity with a Light Salad"), productLink("product.html?product=white-truffle-evoo-60ml", "查看白松露特级初榨橄榄油营养标签", "Review the Nutrition Label for White Truffle EVOO")],
    "nutrition-myths": [recipeLink("light-grilled-zucchini", "用简单食谱把营养判断放回份量", "Put Nutrition Claims Back into Portion Context")],
    "olive-cultivars": [recipeLink("olive-pinzimonio", "用生蔬菜比较不同橄榄品种的风味", "Compare Olive Cultivars with Pinzimonio"), productLink("new.html#olive-oil", "查看意大利橄榄油品种计划", "Explore the Italian Olive Cultivar Range")],
    "olive-fasting": [recipeLink("light-fennel-orange-salad", "把橄榄油放回完整的一餐，而非空腹饮用", "Use Olive Oil in a Complete Meal, Not as a Fasting Cure"), recipeLink("olive-panzanella", "通过面包沙拉控制实际用油份量", "Control Real Portions with Panzanella")],
    "olive-how-to-choose": [recipeLink("olive-pinzimonio", "用生蔬菜判断橄榄油是否适合生食", "Judge Raw-Serving EVOO with Pinzimonio"), productLink("new.html#olive-oil", "查看不同用途的意大利橄榄油", "Explore Italian Olive Oils for Different Uses")],
    "olive-myths": [recipeLink("olive-pasta", "在加热与乳化中验证橄榄油常见误区", "Test Common EVOO Myths through Heating and Emulsification"), recipeLink("light-grilled-zucchini", "在烤制菜式中观察橄榄油风味", "Observe EVOO Flavour in a Grilled Dish")],
    "olive-nutrition": [recipeLink("light-fennel-orange-salad", "用茴香橙子沙拉控制橄榄油份量", "Control EVOO Portions with Fennel and Orange Salad"), productLink("new.html#olive-oil", "查看意大利橄榄油产品计划", "Explore the Italian Olive Oil Range")],
    "olive-oil-basics": [recipeLink("olive-bruschetta", "从烤面包开始认识特级初榨橄榄油", "Start Understanding EVOO with Bruschetta"), productLink("new.html#olive-oil", "查看特级初榨橄榄油产品方向", "Explore the Extra Virgin Olive Oil Range")],
    "olive-recipes-guide": [recipeLink("olive-panzanella", "在托斯卡纳面包沙拉中生用橄榄油", "Use EVOO Raw in Tuscan Panzanella"), recipeLink("olive-pasta", "在蒜香意面中用橄榄油完成乳化", "Emulsify Garlic Pasta with EVOO"), productLink("new.html#olive-oil", "查看适合不同菜式的橄榄油", "Explore Olive Oils for Different Dishes")],
    "olive-regions": [recipeLink("olive-pinzimonio", "用生蔬菜比较不同产区橄榄油", "Compare Regional Olive Oils with Pinzimonio"), productLink("new.html#olive-oil", "查看意大利不同产区的橄榄油计划", "Explore Olive Oils from Different Italian Regions")],
    "olive-storage": [recipeLink("olive-pasta", "用保存良好的橄榄油完成蒜香意面", "Finish Garlic Pasta with Properly Stored EVOO"), productLink("new.html#olive-oil", "查看橄榄油包装与储存建议", "Explore Olive Oil Packaging and Storage")],
    "olive-tasting": [recipeLink("olive-bruschetta", "用烤面包进行橄榄油品鉴", "Taste Olive Oil with Bruschetta"), recipeLink("olive-pinzimonio", "用生蔬菜比较苦味与辛辣感", "Compare Bitterness and Pungency with Pinzimonio")],
    "oscetra-caviar": [recipeLink("sweet-bread-butter-caviar", "用黄油甜面包衬托奥西特拉的坚果风味", "Highlight Oscetra's Nutty Notes with Buttered Sweet Bread")],
    "pairings-class": [recipeLink("sweet-bread-butter-caviar", "用鱼子酱练习咸度、脂肪与温度平衡", "Balance Salt, Fat and Temperature with Caviar"), recipeLink("truffle-trout", "用松露鳟鱼练习香气强度搭配", "Practise Aroma Intensity with Truffle Trout")],
    "pasta-academy": [recipeLink("family-spaghetti-pomodoro", "用番茄意面实践形状与酱汁搭配", "Practise Shape-and-Sauce Pairing with Spaghetti al Pomodoro"), recipeLink("truffle-tagliolini", "用细面理解酱汁附着与出锅收尾", "Understand Sauce Cling and Finishing with Tagliolini")],
    "pizza-fundamentals": [recipeLink("pizza-margherita", "从和面到烘烤完成玛格丽特披萨", "Make Margherita Pizza from Dough to Bake"), productLink("new.html#pizza", "查看披萨面粉与专业原料计划", "Explore Pizza Flour and Professional Ingredients")],
    "pizza-pinsa-at-home": [recipeLink("pizza-margherita", "先用玛格丽特面团建立家庭发酵基准", "Establish a Home Fermentation Baseline with Margherita Dough"), productLink("new.html#pizza", "查看家庭披萨与 Pinsa 原料", "Explore Home Pizza and Pinsa Ingredients")],
    "producers-modena-acetaia": [recipeLink("light-fennel-orange-salad", "用茴香橙子沙拉理解酸甜调味平衡", "Explore Sweet-and-Sour Balance with Fennel and Orange Salad")],
    "producers-modern-gelatiere": [recipeLink("gelato-classic", "用经典配方理解现代冰淇淋师的配方平衡", "Understand Modern Gelato Balancing with a Classic Recipe"), productLink("new.html#gelato", "查看专业意式手工冰淇淋基底计划", "Explore Professional Gelato Base Plans")],
    "producers-neapolitan-pizzaiuolo": [recipeLink("pizza-margherita", "用玛格丽特披萨理解披萨师的技艺", "Understand Pizzaiuolo Craft through Margherita Pizza"), productLink("new.html#pizza", "查看专业披萨原料方向", "Explore Professional Pizza Ingredients")],
    "producers-parmigiano-cheesemakers": [recipeLink("truffle-ravioli", "在松露馄饨中使用帕尔马干酪完成收尾", "Finish Truffle Ravioli with Parmigiano Reggiano"), recipeLink("pizza-margherita", "比较帕尔马干酪与莫扎里拉的使用位置", "Compare the Roles of Parmigiano and Mozzarella")],
    "producers-truffle-hunters": [recipeLink("truffle-summer-crostini", "把采集到的夏季松露用于烤面包", "Use Summer Truffle from the Hunt on Crostini"), productLink("product.html?product=whole-summer-truffles-35g", "查看整颗夏季松露产品", "View Whole Summer Truffle")],
    "regional-traditions": [recipeLink("family-chicken-cacciatora", "从猎人烩鸡理解地方家庭传统", "Explore Regional Home Traditions with Chicken Cacciatora"), recipeLink("olive-panzanella", "从面包沙拉理解托斯卡纳传统料理", "Explore Tuscan Cucina Povera through Panzanella")],
    "sevruga-caviar": [recipeLink("sweet-bread-butter-caviar", "用黄油甜面包平衡闪光鲟浓郁风味", "Balance Sevruga's Intensity with Buttered Sweet Bread")],
    "story-of-italian-evo": [recipeLink("olive-panzanella", "从托斯卡纳面包沙拉理解橄榄油日常传统", "See EVOO's Everyday Tradition through Panzanella"), productLink("new.html#olive-oil", "查看意大利橄榄油产品故事", "Explore the Italian Olive Oil Story")],
    "story-of-italian-gelato": [recipeLink("gelato-classic", "用经典配方连接冰冻甜品历史与现代工艺", "Connect Frozen-Dessert History with a Modern Gelato Recipe"), productLink("new.html#gelato", "查看意式手工冰淇淋系列计划", "Explore the Gelato Range")],
    "story-of-italian-pizza": [recipeLink("pizza-margherita", "用玛格丽特披萨连接那不勒斯历史与今天", "Connect Neapolitan History with Today's Margherita Pizza"), productLink("new.html#pizza", "查看意大利披萨原料计划", "Explore the Italian Pizza Ingredient Range")],
    "table-etiquette": [recipeLink("olive-panzanella", "用共享面包沙拉实践意大利餐桌节奏", "Practise Italian Table Sharing with Panzanella"), recipeLink("pizza-margherita", "用披萨理解分食与共同用餐", "Explore Sharing and Togetherness with Pizza")],
    "truffle-buying-truffle-products": [recipeLink("truffle-ravioli", "在馄饨中使用松露酱", "Use Truffle Sauce in Ravioli"), recipeLink("mushroom-soup", "在菌菇汤中使用松露制品", "Use Truffle Products in Mushroom Soup"), productLink("product.html?product=white-truffle-sauce-80g", "查看适合精细菜式的白松露酱", "View White Truffle Sauce for Refined Dishes"), productLink("product.html?product=summer-truffle-slices-50g", "查看适合点缀的夏季松露片", "View Summer Truffle Slices for Garnishing")],
    "truffle-gelato-at-home": [recipeLink("gelato-classic", "先制作适合加入松露的冰淇淋基底", "Prepare a Gelato Base Suitable for Truffle"), recipeLink("truffle-tiramisu", "比较松露在另一种甜点中的使用", "Compare Truffle in Another Dessert"), productLink("product.html?product=truffle-honey-170g", "用松露蜂蜜尝试甜味松露搭配", "Try Sweet Truffle Pairing with Truffle Honey")],
    "truffle-italian-truffle-map": [recipeLink("truffle-lamb", "用松露羊肉理解中部产区风味", "Explore Central Italian Flavour with Truffle Lamb"), recipeLink("black-truffle-risotto", "用烩饭理解北部松露料理", "Explore Northern Truffle Cooking through Risotto"), productLink("product.html?product=whole-summer-truffles-55g", "查看整颗夏季松露", "View Whole Summer Truffle")],
    "truffle-meets-dessert": [recipeLink("truffle-tiramisu", "用松露完成提拉米苏", "Make Tiramisu with Truffle"), recipeLink("gelato-classic", "以经典冰淇淋基底尝试松露甜点", "Use a Classic Gelato Base for a Truffle Dessert"), productLink("product.html?product=truffle-honey-50g", "查看适合甜点的松露蜂蜜", "View Truffle Honey for Desserts")],
    "truffle-truffle-aroma-pairing": [recipeLink("truffle-tagliolini", "用细面突出松露香气", "Showcase Truffle Aroma with Tagliolini"), recipeLink("truffle-eggs", "体验松露与鸡蛋的经典搭配", "Try the Classic Truffle-and-Egg Pairing"), productLink("product.html?product=white-truffle-oil-60ml", "查看适合出锅调味的白松露油", "View White Truffle Oil for Finishing")],
    "truffle-truffle-types": [recipeLink("black-truffle-risotto", "用黑松露制作烩饭", "Make Risotto with Black Truffle"), recipeLink("truffle-summer-crostini", "用夏季松露制作烤面包", "Make Crostini with Summer Truffle"), productLink("product.html?product=summer-truffle-slices-50g", "查看夏季松露片", "View Summer Truffle Slices"), productLink("product.html?product=winter-black-truffle-sauce-80g", "查看冬季黑松露酱", "View Winter Black Truffle Sauce")],
    "truffle-what-is-truffle": [recipeLink("truffle-eggs", "从鸡蛋开始认识松露香气", "Start Understanding Truffle Aroma with Eggs"), recipeLink("truffle-summer-crostini", "用烤面包体验夏季松露质地", "Experience Summer Truffle Texture on Crostini"), productLink("product.html?product=whole-summer-truffles-35g", "查看整颗夏季松露的原料形态", "View Whole Summer Truffle")],
    "ugolini-gelato-mix": [recipeLink("gelato-classic", "用经典配方理解冰淇淋基底的作用", "Understand Gelato Base Function with a Classic Recipe"), productLink("new.html#gelato", "查看意式手工冰淇淋基底新品", "Explore the Upcoming Gelato Base")],
    "white-sturgeon-caviar": [recipeLink("sweet-bread-butter-caviar", "用黄油甜面包衬托白鲟鱼子酱的细腻口感", "Highlight White Sturgeon Caviar with Buttered Sweet Bread")],
  };
  const knowledgeForRecipe = (id, article, fallback) => article.recipe?.knowledge ? [article.recipe.knowledge] : recipeKnowledgeRules.find(([pattern]) => pattern.test(id))?.[1] || (fallback ? [fallback] : []);
  const recipeForArticle = (article, fallback) => [article.cta, ...(article.slug ? articleContentLinks[article.slug] || [] : fallback ? [fallback] : [])].filter((link, index, links) => link && links.findIndex((item) => item?.href === link.href) === index);
  const renderRecipeLibrary = () => {
    if (!recipeLibraryMount) return;
    const copy = lang === "zh"
      ? { region: "参考地区", ingredient: "核心原料", allRegions: "全部地区", allIngredients: "全部原料", clear: "清空筛选", count: "份食谱", read: "阅读详情", empty: "没有符合当前条件的食谱" }
      : { region: "Reference region", ingredient: "Core ingredient", allRegions: "All regions", allIngredients: "All ingredients", clear: "Clear filters", count: "recipes", read: "View Details", empty: "No recipes match these filters" };
    const ingredientGroups = [
      ["olive-oil", lang === "zh" ? "橄榄油" : "Olive oil", /橄榄油|olive oil|extra-virgin/i],
      ["truffle", lang === "zh" ? "松露" : "Truffle", /松露|truffle/i],
      ["caviar", lang === "zh" ? "鱼子酱" : "Caviar", /鱼子酱|caviar/i],
      ["pasta", lang === "zh" ? "意面与面粉" : "Pasta & flour", /意面|面粉|披萨|spaghetti|pasta|flour|pizza|ravioli|tagliolini/i],
      ["rice", lang === "zh" ? "米" : "Rice", /卡纳罗利米|烩饭|rice|risotto|carnaroli/i],
      ["egg", lang === "zh" ? "鸡蛋" : "Egg", /鸡蛋|蛋黄|蛋白|egg/i],
      ["mushroom", lang === "zh" ? "菌菇" : "Mushroom", /蘑菇|香菇|牛肝菌|mushroom|porcini/i],
      ["seafood", lang === "zh" ? "海鲜" : "Seafood", /虾|扇贝|鱼|shrimp|prawn|scallop|fish|caviar/i],
      ["dairy", lang === "zh" ? "乳制品" : "Dairy", /牛奶|奶油|奶酪|黄油|马斯卡彭|milk|cream|cheese|butter|mascarpone|mozzarella/i],
      ["vegetable", lang === "zh" ? "蔬菜" : "Vegetables", /番茄|茴香|橙子|西葫芦|胡萝卜|西芹|甜椒|tomato|fennel|orange|courgette|zucchini|carrot|celery|pepper/i],
      ["meat", lang === "zh" ? "肉类" : "Meat", /鸡|羊|chicken|lamb/i],
    ];
    const regionGroups = [
      ["piedmont", lang === "zh" ? "皮埃蒙特" : "Piedmont", /皮埃蒙特|piedmont/i],
      ["lombardy", lang === "zh" ? "伦巴第" : "Lombardy", /伦巴第|lombardy/i],
      ["liguria", lang === "zh" ? "利古里亚" : "Liguria", /利古里亚|ligurian/i],
      ["veneto", lang === "zh" ? "威尼托" : "Veneto", /威尼斯|威尼托|venetian|veneto/i],
      ["tuscany", lang === "zh" ? "托斯卡纳" : "Tuscany", /托斯卡纳|tuscany/i],
      ["umbria", lang === "zh" ? "翁布里亚" : "Umbria", /翁布里亚|瓦尔内里纳|umbria|valnerina/i],
      ["lazio", lang === "zh" ? "拉齐奥" : "Lazio", /拉齐奥|lazio/i],
      ["campania", lang === "zh" ? "坎帕尼亚" : "Campania", /坎帕尼亚|那不勒斯|campania|naples/i],
      ["sicily", lang === "zh" ? "西西里" : "Sicily", /西西里|sicily/i],
      ["north", lang === "zh" ? "意大利北部" : "Northern Italy", /意大利北部|northern italian/i],
      ["central", lang === "zh" ? "意大利中部" : "Central Italy", /意大利中部|central italy/i],
      ["south", lang === "zh" ? "意大利南部" : "Southern Italy", /意大利南部|southern italy/i],
      ["italy", lang === "zh" ? "意大利通用 / 跨地区" : "Italy-wide / Cross-regional", /./],
    ];
    const recipeRegions = (value = "") => {
      const specific = regionGroups.slice(0, 9).filter(([, , pattern]) => pattern.test(value)).map(([key]) => key);
      if (specific.length) return specific;
      return [regionGroups.slice(9).find(([, , pattern]) => pattern.test(value))?.[0] || "italy"];
    };
    const recipes = Object.entries(articles)
      .filter(([, article]) => article.type === "recipe" && article.lang === lang && article.recipe)
      .map(([id, article]) => {
        const searchable = [article.title, article.recipe.ingredients.join(" "), article.recipe.products || ""].join(" ");
        return { id, article, regions: recipeRegions(article.recipe.region), ingredients: ingredientGroups.filter(([, , pattern]) => pattern.test(searchable)).map(([key]) => key) };
      });
    const regions = regionGroups.filter(([key]) => recipes.some((recipe) => recipe.regions.includes(key)));
    const usedIngredients = ingredientGroups.filter(([key]) => recipes.some((recipe) => recipe.ingredients.includes(key)));
    recipeLibraryMount.innerHTML = `
      <div class="lux-recipe-library-controls">
        <label><span>${copy.region}</span><select data-recipe-region><option value="">${copy.allRegions}</option>${regions.map(([key, label]) => `<option value="${key}">${label}</option>`).join("")}</select></label>
        <label><span>${copy.ingredient}</span><select data-recipe-ingredient><option value="">${copy.allIngredients}</option>${usedIngredients.map(([key, label]) => `<option value="${key}">${label}</option>`).join("")}</select></label>
        <button type="button" data-recipe-clear>${copy.clear}</button>
        <p aria-live="polite" data-recipe-count></p>
      </div>
      <div class="lux-recipe-library-grid" data-recipe-grid></div>
      <p class="lux-recipe-library-empty" data-recipe-empty hidden>${copy.empty}</p>`;
    const regionSelect = recipeLibraryMount.querySelector("[data-recipe-region]");
    const ingredientSelect = recipeLibraryMount.querySelector("[data-recipe-ingredient]");
    const grid = recipeLibraryMount.querySelector("[data-recipe-grid]");
    const count = recipeLibraryMount.querySelector("[data-recipe-count]");
    const empty = recipeLibraryMount.querySelector("[data-recipe-empty]");
    const update = () => {
      const filtered = recipes.filter(({ regions, ingredients }) => (!regionSelect.value || regions.includes(regionSelect.value)) && (!ingredientSelect.value || ingredients.includes(ingredientSelect.value)));
      grid.innerHTML = filtered.map(({ id, article, ingredients }) => {
        const slug = id.replace(/^(?:zh|en)-recipe-/, "");
        const href = location.pathname.endsWith(".html") ? `recipe.html?recipe=${encodeURIComponent(slug)}` : `${encodeURIComponent(slug)}/`;
        return `
        <a href="${href}" class="lux-recipe-library-card" data-reader-open="${escapeHtml(id)}">
          <span class="lux-recipe-library-media"><img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}"><span class="lux-reader-cta">${copy.read}</span></span>
          <span class="lux-recipe-library-copy"><small>${escapeHtml(article.recipe.region || article.eyebrow)}</small><strong>${escapeHtml(article.title)}</strong><span>${escapeHtml(article.recipe.time)} · ${escapeHtml(article.recipe.difficulty)}</span><span class="lux-recipe-library-tags">${ingredients.map((key) => `<i>${escapeHtml(ingredientGroups.find(([groupKey]) => groupKey === key)?.[1] || key)}</i>`).join("")}</span></span>
        </a>`;
      }).join("");
      count.textContent = `${filtered.length} ${copy.count}`;
      empty.hidden = filtered.length > 0;
    };
    regionSelect.addEventListener("change", update);
    ingredientSelect.addEventListener("change", update);
    recipeLibraryMount.querySelector("[data-recipe-clear]").addEventListener("click", () => { regionSelect.value = ""; ingredientSelect.value = ""; update(); regionSelect.focus(); });
    update();
  };
  renderRecipeLibrary();
  const localizeArchiveLabel = (value) => {
    if (lang !== "zh") return value;
    const labels = {
      GROUP: "品牌",
      MASTERCLASS: "大师课",
      RECIPE: "食谱",
      ATLAS: "产业版图",
      MARKET: "市场",
      RITUAL: "品鉴",
      PAIRING: "配餐",
      SERVICE: "服务",
    };
    return labels[value] || value;
  };
  const eventLabels = lang === "zh"
    ? { kicker: "发布 LuxurEat（露意膳）参与的国际食品展会、行业活动与品牌展示信息，包括活动预告、展位安排、现场动态及展后回顾。", title: "展览活动", past: "过往活动", empty: "暂无过往活动", read: "查看详情" }
    : { kicker: "Updates on LuxurEat (露意膳) at international food fairs, industry events and brand showcases, including previews, stand information, live coverage and post-event reviews.", title: "Exhibitions & Events", past: "Past Events", empty: "No past events yet", read: "View details" };
  const newsLabels = lang === "zh"
    ? { kicker: "聚焦 LuxurEat（露意膳）的品牌动态、新品发布、战略合作、市场拓展与企业发展，及时分享公司在高端食品领域的创新成果、业务进展及重要资讯。", title: "新闻中心", search: "搜索新闻", read: "阅读详情", empty: "没有找到相关内容" }
    : { kicker: "Follow LuxurEat (露意膳) brand updates, product launches, strategic partnerships, market expansion and company development, with timely news on innovation and business progress in premium food.", title: "News Centre", search: "Search news", read: "Read more", empty: "No matching stories found" };
  const aboutArticle = articles[`${lang}-about`];
  const aboutLabels = lang === "zh"
    ? { title: "关于我们", journal: "品牌调查", story: "品牌故事", madeIn: "意大利制造", view: "查看大图", previous: "查看上一张图片", next: "查看下一张图片", slide: "左右滑动查看", close: "关闭", portrait: "Roberto Ugolini 肖像" }
    : { title: "About Us", journal: "LuxurEat (露意膳) Journal", story: "Brand Story", madeIn: "Made in Italy", view: "View Full Size", previous: "View previous image", next: "View next image", slide: "Slide left or right", close: "Close", portrait: "Portrait of Roberto Ugolini" };
  const loadLeaflet = () => {
    if (window.L) return Promise.resolve(window.L);
    if (!document.querySelector('link[data-lux-leaflet]')) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = luxJournalAsset("vendor/leaflet/leaflet.css");
      stylesheet.dataset.luxLeaflet = "";
      document.head.append(stylesheet);
    }
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-lux-leaflet]');
      if (existing) {
        existing.addEventListener("load", () => resolve(window.L), { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = luxJournalAsset("vendor/leaflet/leaflet.js");
      script.dataset.luxLeaflet = "";
      script.addEventListener("load", () => resolve(window.L), { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.append(script);
    });
  };

  const renderRecentEvents = () => {
    if (!eventMount) return;
    const latest = events.filter((event) => event.status === "latest").sort((a, b) => a.endDate.localeCompare(b.endDate));
    const past = events.filter((event) => event.status === "past").sort((a, b) => b.endDate.localeCompare(a.endDate));
    eventMount.innerHTML = `
      <div class="lux-recent-events-inner">
        <header class="lux-recent-events-head">
          <span>${eventLabels.kicker}</span>
          <h2>${eventLabels.title}</h2>
        </header>
        <div class="lux-recent-events-latest">
          ${latest.map((event) => {
            const copy = event[lang];
            return copy ? `<button type="button" class="lux-event-card" data-event-open="${escapeHtml(event.id)}">
              <img loading="lazy" decoding="async" src="${escapeHtml(event.cardImage || event.image)}" alt="${escapeHtml(copy.articleTitle)}">
              <span class="lux-event-card-copy">
                <small>${escapeHtml(copy.dateIso)} · ${escapeHtml(copy.city)}</small>
                <strong>${escapeHtml(copy.articleTitle)}</strong>
                <span>${escapeHtml(copy.intro)}</span>
                <span class="lux-narrative-link">${eventLabels.read}<span class="material-symbols-outlined" data-icon="arrow_forward" aria-hidden="true" translate="no"></span></span>
              </span>
            </button>` : "";
          }).join("")}
        </div>
        ${past.length ? `<div class="lux-past-events">
          <h3>${eventLabels.past}</h3>
          <div class="lux-past-events-grid">${past.map((event) => {
            const copy = event[lang];
            return `<button type="button" class="lux-event-card" data-event-open="${escapeHtml(event.id)}"><img loading="lazy" decoding="async" src="${escapeHtml(event.cardImage || event.image)}" alt="${escapeHtml(copy.articleTitle)}"><span class="lux-event-card-copy"><small>${escapeHtml(copy.dateIso)} · ${escapeHtml(copy.city)}</small><strong>${escapeHtml(copy.articleTitle)}</strong></span></button>`;
          }).join("")}</div>
        </div>` : ""}
      </div>`;
  };
  renderRecentEvents();

  const renderExhibitionMap = () => {
    if (!mapMount) return;
    const mapLabels = lang === "zh"
      ? { kicker: "展会图谱", title: "展会地图", intro: "查看 LuxurEat（露意膳）即将参与及已经结束的展会。将鼠标移至地点标记可预览，点击可打开对应活动详情。", upcoming: "即将开始", ended: "已结束", detail: "查看详情", reset: "返回中国地图视角", unavailable: "地图暂时无法加载，请稍后重试。" }
      : { kicker: "Exhibition Atlas", title: "Exhibition Map", intro: "Explore upcoming and completed LuxurEat (露意膳) exhibitions. Hover over a location to preview it, then select the marker to open the event article.", upcoming: "Upcoming", ended: "Ended", detail: "View details", reset: "Reset to China view", unavailable: "The map is temporarily unavailable. Please try again shortly." };
    const today = new Date();
    const mappedEvents = events.filter((event) => Array.isArray(event.coordinates)).map((event) => ({
      ...event,
      isEnded: event.status === "past" || (event.endDate && new Date(`${event.endDate}T23:59:59`) < today),
    }));
    const groups = [...mappedEvents.reduce((result, event) => {
      const key = event.coordinates.join(",");
      const group = result.get(key) || { coordinates: event.coordinates, events: [] };
      group.events.push(event);
      result.set(key, group);
      return result;
    }, new Map()).values()];
    const details = (group) => group.events.map((event) => {
      const copy = event[lang];
      const image = event.cardImage || event.previewImage || event.image;
      return `<article style="--lux-map-event-image:url('${escapeHtml(image)}')"><small class="${event.isEnded ? "is-ended" : "is-upcoming"}">${event.isEnded ? mapLabels.ended : mapLabels.upcoming}</small><strong>${escapeHtml(copy.articleTitle)}</strong><span>${escapeHtml(copy.date)} · ${escapeHtml(copy.city)}</span><button type="button" data-event-open="${escapeHtml(event.id)}">${mapLabels.detail}</button></article>`;
    }).join("");

    mapMount.innerHTML = `<div class="lux-exhibition-map-head"><span>${mapLabels.kicker}</span><h2>${mapLabels.title}</h2><p>${mapLabels.intro}</p><div><span><i class="is-upcoming"></i>${mapLabels.upcoming}</span><span><i class="is-ended"></i>${mapLabels.ended}</span></div></div><div class="lux-amap-shell"><div class="lux-amap-canvas" data-osm-map role="application" aria-label="${escapeHtml(mapLabels.title)}"></div><button type="button" class="lux-map-reset" data-map-reset aria-label="${escapeHtml(mapLabels.reset)}" title="${escapeHtml(mapLabels.reset)}"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.42 1.42"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path><circle cx="12" cy="12" r="2"></circle></svg></button><div class="lux-map-popover" data-map-popover hidden></div></div>`;

    const popover = mapMount.querySelector("[data-map-popover]");
    const mapCanvas = mapMount.querySelector("[data-osm-map]");
    const chinaBounds = [[18, 73], [54, 135]];
    let hideTimer;
    const showGroup = (group) => {
      clearTimeout(hideTimer);
      popover.innerHTML = details(group);
      popover.hidden = false;
    };
    const hideGroup = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => { popover.hidden = true; }, 480);
    };
    popover.addEventListener("mouseenter", () => clearTimeout(hideTimer));
    popover.addEventListener("mouseleave", hideGroup);

    loadLeaflet().then((L) => {
      const map = L.map(mapCanvas, {
        minZoom: 3,
        maxZoom: 18,
        zoomControl: true,
        worldCopyJump: false,
        scrollWheelZoom: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
      });
      map.attributionControl.setPrefix(false);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      const resetView = () => map.fitBounds(chinaBounds, { padding: [24, 24], animate: true });
      resetView();
      groups.forEach((group) => {
        const ended = group.events.every((event) => event.isEnded);
        const city = group.events.map((event) => event[lang].city).filter((value, index, values) => values.indexOf(value) === index).join("、");
        const icon = L.divIcon({
          className: "lux-osm-marker-wrap",
          html: `<span class="lux-osm-marker ${ended ? "is-ended" : "is-upcoming"}"><span>${group.events.length}</span></span>`,
          iconSize: [40, 48],
          iconAnchor: [20, 44],
        });
        const marker = L.marker([group.coordinates[1], group.coordinates[0]], { icon, title: city, keyboard: true }).addTo(map);
        marker.on("mouseover", () => showGroup(group));
        marker.on("mouseout", hideGroup);
        marker.on("click", () => {
          showGroup(group);
          renderEvent(group.events[0].id);
        });
        const markerElement = marker.getElement();
        markerElement?.addEventListener("mouseenter", () => showGroup(group));
        markerElement?.addEventListener("mouseleave", hideGroup);
        markerElement?.addEventListener("focus", () => showGroup(group));
        markerElement?.addEventListener("blur", hideGroup);
      });
      mapMount.querySelector("[data-map-reset]").addEventListener("click", resetView);
    }).catch(() => {
      mapCanvas.classList.add("is-unavailable");
      mapCanvas.textContent = mapLabels.unavailable;
    });
  };
  renderExhibitionMap();

  const renderNewsCenter = () => {
    if (!newsMount) return;
    const story = lang === "zh" ? {
      title: "CaviareEat Baerii 的产地与真实品质",
      date: "2025年9月4日",
      intro: "CaviareEat Baerii（西伯利亚鲟，Acipenser baerii）来自意大利、法国、德国与中国的精选养殖场，并以动物福利、可追溯性和环境可持续标准为基础。每一批产品均配有 CITES 文件并接受严格质量控制。",
      sections: [
        ["品鉴特征", "颜色从炭灰至深棕，并带有珍珠光泽；颗粒直径约 2.5–3.0 毫米。质地丝滑、奶油感细腻且富有弹性，风味优雅而持久，带有榛子、新鲜黄油与淡水气息。"],
        ["适用渠道", "适合追求优雅与多用途鱼子酱的厨师及高端餐厅，也适用于甜咸创作、精品鸡尾酒、高端零售与私人品牌；Halal、Kosher 及有机市场可按需求提供相应方案。"],
        ["享用方式", "经典搭配包括布里尼薄饼、酸奶油与水煮蛋；现代搭配可选择鞑靼、卡帕乔、生蚝或寿司；也可用于风味黄油、甜咸小食、白巧克力甜点，以及伏特加、金酒和柑橘浸泡酒等鸡尾酒。"],
        ["规格与质量控制", "提供 1 千克原装罐，以及 10 克、30 克、50 克、125 克、250 克、500 克与 1 千克认证包装，可采用 CaviareEat 品牌或私人标签，全程冷链运输。所有批次遵循 HACCP、IFS 与 BRC 体系，并可按需求提供 Halal 与 Kosher 认证。"],
      ],
      closing: "CaviareEat Baerii 让鱼子酱在保持奢华感与可持续价值的同时更易融入专业餐饮与创意厨房。",
      alt: "CaviareEat Royal Baerii 鱼子酱罐",
    } : {
      title: "Origin and Authenticity of CaviareEat Baerii",
      date: "September 4, 2025",
      intro: "Our Baerii caviar (Acipenser baerii) comes from selected farms in Italy, France, Germany, and China, all operating under exacting standards of animal welfare, traceability, and environmental sustainability. Every package is supported by CITES documentation and strict quality controls.",
      sections: [
        ["Tasting profile", "Its colour ranges from anthracite grey to deep brown with pearly reflections. The 2.5–3.0 mm eggs are silky, creamy and firm, with a delicate yet persistent flavour recalling hazelnut, fresh butter and freshwater notes."],
        ["Who it is for", "CaviareEat Baerii suits chefs and gourmet restaurants seeking elegant versatility, pastry chefs and mixologists creating sweet-savoury dishes or premium cocktails, private-label and high-end retail programmes, and Halal, Kosher or organic markets on request."],
        ["How to serve it", "Serve it traditionally on blinis with sour cream or hard-boiled egg; pair it with tartare, carpaccio, oysters or sushi; or use it in flavoured butter, sweet-savoury finger food, white-chocolate desserts, vodka, gin, citrus infusions and artisanal bitters."],
        ["Formats and quality control", "Formats include an original 1 kg tin and certified 10 g, 30 g, 50 g, 125 g, 250 g, 500 g and 1 kg packs, under the CaviareEat label or private label, delivered through a complete cold chain. Every batch follows HACCP, IFS and BRC protocols, with Halal and Kosher certification available on request."],
      ],
      closing: "CaviareEat Baerii makes caviar more accessible and versatile without compromising luxury, safety or sustainability.",
      alt: "CaviareEat Royal Baerii caviar tin",
    };
    const storyId = `${lang}-caviareat-baerii-news`;
    articles[storyId] = {
      lang,
      eyebrow: newsLabels.title,
      title: story.title,
      meta: `CaviareEat · ${story.date}`,
      image: luxJournalAsset("media/events/caviareat-baerii-news.png"),
      intro: story.intro,
      sections: story.sections,
      quote: story.closing,
      column: newsLabels.title,
      archive: "CaviareEat",
      related: [],
    };
    newsMount.innerHTML = `
      <div class="lux-recent-events-inner">
        <header class="lux-recent-events-head"><span>${newsLabels.kicker}</span><h2>${newsLabels.title}</h2></header>
        <div class="lux-recent-events-latest">
          <button type="button" class="lux-event-card lux-news-feature" data-reader-open="${storyId}">
            <img loading="lazy" decoding="async" src="${escapeHtml(luxJournalAsset("media/events/caviareat-baerii-news.png"))}" alt="${escapeHtml(story.alt)}">
            <span class="lux-event-card-copy">
              <small>${escapeHtml(story.date)} · CaviareEat</small>
              <strong>${escapeHtml(story.title)}</strong>
              <span>${escapeHtml(story.intro)}</span>
              <span class="lux-narrative-link">${escapeHtml(newsLabels.read)}<span class="material-symbols-outlined" data-icon="arrow_forward" aria-hidden="true" translate="no"></span></span>
            </span>
          </button>
        </div>
      </div>`;
  };
  renderNewsCenter();

  const renderAboutStory = () => {
    if (!aboutMount || !aboutArticle) return;
    const [titleBrand, ...titleRest] = aboutArticle.title.split("｜");
    const paragraphs = (content) => content.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    const sectionHtml = aboutArticle.sections.map(([heading, content], index) => {
      const media = aboutArticle.sectionMedia[index] || [];
      const figures = media.map((item) => `<figure>
        <button type="button" class="lux-about-image-button" data-about-image="${escapeHtml(item.src)}" data-about-image-alt="${escapeHtml(item.alt)}" aria-label="${escapeHtml(aboutLabels.view)}: ${escapeHtml(item.alt)}">
          <img loading="lazy" decoding="async" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}">
          <span>${escapeHtml(aboutLabels.view)}</span>
        </button>
      </figure>`).join("");
      const gallery = index === aboutArticle.sections.length - 1
        ? `<div class="lux-about-carousel" data-about-carousel data-carousel-hint="${escapeHtml(aboutLabels.slide)}">
            <button type="button" class="lux-about-carousel-arrow is-prev" data-about-carousel-step="-1" aria-label="${escapeHtml(aboutLabels.previous)}"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg></button>
            <div class="lux-about-carousel-track">${figures}</div>
            <button type="button" class="lux-about-carousel-arrow is-next" data-about-carousel-step="1" aria-label="${escapeHtml(aboutLabels.next)}"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></button>
          </div>`
        : `<div class="lux-reader-section-media">${figures}</div>`;
      const divider = /传统、创新|Tradition, Innovation/i.test(heading)
        ? `<figure class="lux-about-section-divider"><img loading="lazy" decoding="async" src="${escapeHtml(luxJournalAsset("media/brand/about-aquaculture-divider.webp"))}" alt="${escapeHtml(lang === "zh" ? "山水之间的可持续水产养殖场" : "Sustainable aquaculture among mountains and clear water")}"></figure>`
        : "";
      const virtualTour = index === 1
        ? `<figure class="lux-about-vr">
            <iframe loading="lazy" src="https://trufflebar.com/vr/" title="${escapeHtml(lang === "zh" ? "曼谷 TruffleBar & Restaurant 360° 全景体验" : "TruffleBar & Restaurant Bangkok 360° virtual tour")}" allow="fullscreen; accelerometer; gyroscope" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
            <figcaption><span>${escapeHtml(lang === "zh" ? "TruffleBar & Restaurant · 曼谷全景体验" : "TruffleBar & Restaurant · Bangkok Virtual Tour")}</span><a href="https://trufflebar.com/vr/" target="_blank" rel="noopener">${escapeHtml(lang === "zh" ? "全屏打开" : "Open Full Screen")}<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"></path><path d="M7 7h10v10"></path></svg></a></figcaption>
          </figure>`
        : "";
      return `${divider}${virtualTour}<section class="lux-reader-section" id="lux-about-section-${index}">
        <h3>${escapeHtml(heading)}</h3>
        ${paragraphs(content)}
        ${gallery}
      </section>`;
    }).join("");

    aboutMount.innerHTML = `
      <div class="lux-recent-events-inner">
        <header class="lux-recent-events-head">
          <span>Group Story</span>
          <h2>${escapeHtml(aboutLabels.title)}</h2>
        </header>
      </div>
      <article class="lux-reader-layout">
        <section class="lux-reader-hero">
          <div class="lux-reader-hero-copy">
            <div class="lux-reader-meta-grid"><span>${escapeHtml(aboutLabels.journal)}</span><span>${escapeHtml(aboutLabels.title)}</span><span>${escapeHtml(aboutLabels.story)}</span><span>${escapeHtml(aboutLabels.madeIn)}</span></div>
            <h2><span class="lux-about-title-brand">${escapeHtml(titleBrand)}｜</span>${escapeHtml(titleRest.join("｜"))}</h2>
            <p class="lux-reader-summary">${escapeHtml(aboutArticle.intro)}</p>
          </div>
          <figure class="lux-reader-cover">
            <button type="button" class="lux-about-image-button" data-about-image="${escapeHtml(aboutArticle.image)}" data-about-image-alt="${escapeHtml(aboutLabels.portrait)}" aria-label="${escapeHtml(aboutLabels.view)}: ${escapeHtml(aboutLabels.portrait)}">
              <img loading="lazy" decoding="async" src="${escapeHtml(aboutArticle.image)}" alt="${escapeHtml(aboutLabels.portrait)}">
              <span>${escapeHtml(aboutLabels.view)}</span>
            </button>
          </figure>
        </section>
        <section class="lux-reader-content lux-about-content">
          <div class="lux-reader-copy">
            <section class="lux-reader-section lux-reader-section-opening">${paragraphs(aboutArticle.opening)}</section>
            ${sectionHtml}
            <blockquote class="lux-reader-quote">${escapeHtml(aboutArticle.quote)}</blockquote>
          </div>
        </section>
      </article>`;
  };
  renderAboutStory();

  if (aboutMount) {
    aboutMount.querySelectorAll("[data-about-carousel]").forEach((carousel) => {
      const track = carousel.querySelector(".lux-about-carousel-track");
      if (!track) return;
      let timer;
      const advance = () => track.scrollTo({ left: track.scrollLeft >= track.scrollWidth - track.clientWidth - 1 ? 0 : track.scrollLeft + track.clientWidth * .8, behavior: "smooth" });
      const stop = () => clearInterval(timer);
      const start = () => {
        stop();
        if (!matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches && track.scrollWidth > track.clientWidth) timer = setInterval(advance, 4000);
      };
      carousel.addEventListener("mouseenter", stop);
      carousel.addEventListener("mouseleave", start);
      carousel.addEventListener("focusin", stop);
      carousel.addEventListener("focusout", (event) => { if (!carousel.contains(event.relatedTarget)) start(); });
      document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
      start();
    });
    const lightbox = document.createElement("dialog");
    lightbox.className = "lux-about-lightbox";
    lightbox.innerHTML = `<div class="lux-image-lightbox-frame"><button type="button" data-about-lightbox-close aria-label="${escapeHtml(aboutLabels.close)}"><svg class="lux-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg></button><img loading="lazy" decoding="async" alt=""></div>`;
    document.body.appendChild(lightbox);

    document.addEventListener("click", (event) => {
      const imageTrigger = event.target.closest("[data-about-image]");
      if (imageTrigger) {
        const image = lightbox.querySelector("img");
        image.src = imageTrigger.dataset.aboutImage;
        image.alt = imageTrigger.dataset.aboutImageAlt || "";
        lightbox.showModal();
        return;
      }

      const carouselTrigger = event.target.closest("[data-about-carousel-step]");
      if (carouselTrigger) {
        const track = carouselTrigger.closest("[data-about-carousel]").querySelector(".lux-about-carousel-track");
        track.scrollBy({ left: Number(carouselTrigger.dataset.aboutCarouselStep) * track.clientWidth * .8, behavior: "smooth" });
        return;
      }

      if (event.target === lightbox || event.target.closest("[data-about-lightbox-close]")) lightbox.close();
    });
  }

  const syncReaderCards = () => {
    const seen = new Set();
    const sync = (node, article) => {
      if (!node || seen.has(node) || node.closest(".lux-home-harvest, .lux-olive-recipe-stories") || node.matches(".lux-recipe-theme-card")) return;
      seen.add(node);
      const image = node.querySelector("img");
      const background = node.querySelector(".lux-dark-photo-bg, [style*='background-image']");
      if (image) {
        image.src = article.cardImage || article.image;
        image.alt = article.cardTitle || article.title;
        if (article.cardPosition || article.coverPosition) image.style.objectPosition = article.cardPosition || article.coverPosition;
      } else if (background) {
        background.style.backgroundImage = `url("${article.cardImage || article.image}")`;
      }
      const heading = node.querySelector("h1,h2,h3,h4");
      if (heading) heading.textContent = article.cardTitle || article.title;
      const eyebrow = Array.from(node.querySelectorAll("span"))
        .find((span) => !span.closest("a,button") && !span.classList.contains("material-symbols-outlined") && /\D/.test(span.textContent.trim()) && span.textContent.trim().length < 64);
      if (eyebrow) eyebrow.textContent = article.cardEyebrow || article.eyebrow;
      const paragraph = node.querySelector("p");
      if (paragraph) {
        paragraph.textContent = article.cardText || article.intro;
        paragraph.style.whiteSpace = article.cardText?.includes("\n") ? "pre-line" : "";
      }
    };

    document.querySelectorAll("[data-reader-open]").forEach((trigger) => {
      if (trigger.closest(".lux-home-market-collage")) return;
      const article = articles[trigger.dataset.readerOpen];
      if (!article) return;
      sync(trigger.closest(".lux-reader-card, .article-card") || trigger.parentElement, article);
    });
  };
  syncReaderCards();

  const reader = document.createElement("div");
  reader.className = "lux-reader";
  reader.hidden = true;
  reader.innerHTML = `
    <div class="lux-reader-backdrop" data-reader-close></div>
    <section class="lux-reader-panel" role="dialog" aria-modal="true" aria-labelledby="lux-reader-title">
      <header class="lux-reader-header">
        <button type="button" class="lux-reader-back" data-reader-back hidden></button>
        <button type="button" class="lux-reader-close" data-reader-close></button>
      </header>
      <div class="lux-reader-body" tabindex="-1"></div>
    </section>`;
  document.body.appendChild(reader);

  const body = reader.querySelector(".lux-reader-body");
  const panel = reader.querySelector(".lux-reader-panel");
  const backButton = reader.querySelector("[data-reader-back]");
  const closeButtons = reader.querySelectorAll("[data-reader-close]");
  let currentId = "";
  let archiveOrigin = false;
  const stack = [];
  const syncReaderTop = () => {
    panel.classList.toggle("is-at-top", body.scrollTop <= 4);
  };

  const showReader = (copy) => {
    reader.hidden = false;
    document.body.classList.add("lux-reader-open");
    backButton.hidden = stack.length === 0;
    backButton.textContent = copy.back;
    reader.querySelector(".lux-reader-close").textContent = copy.close;
    body.focus();
    body.scrollTop = 0;
    syncReaderTop();
  };

  const renderArchive = (push) => {
    if (push && currentId) stack.push(currentId);
    currentId = "__archive";
    const copy = labels();
    const groups = archiveGroups();
    const allLabel = document.documentElement.lang?.startsWith("zh") ? "全部内容" : "All Collections";
    const items = groups.flatMap(([title, ids]) => ids.map((id) => ({ id, title })));
    body.innerHTML = `
      <article class="lux-reader-archive">
        <div class="lux-reader-archive-head">
          <h2>${escapeHtml(copy.archive)}</h2>
          <div class="lux-reader-archive-tabs">
            <button type="button" class="is-active" data-reader-archive-filter="all">${escapeHtml(allLabel)}</button>
            ${groups.map(([title]) => `<button type="button" data-reader-archive-filter="${escapeHtml(title)}">${escapeHtml(title)}</button>`).join("")}
          </div>
        </div>
        <div class="lux-reader-archive-grid">
          ${items.map(({ id, title }) => {
            const item = articles[id];
            return item ? `
              <button type="button" class="lux-reader-archive-card" data-reader-archive-item="${escapeHtml(id)}" data-reader-archive-category="${escapeHtml(title)}">
                <span class="lux-reader-archive-media"><img loading="lazy" decoding="async" src="${escapeHtml(item.image)}" alt=""><span class="lux-reader-archive-cta">${copy.read}</span></span>
                <span class="lux-reader-archive-copy"><span>${escapeHtml(item.eyebrow)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(lang === "zh" ? item.meta.split("·").map((part, index) => index ? part.trim() : localizeArchiveLabel(part.trim())).join(" · ") : item.meta)}</small></span>
              </button>` : "";
          }).join("")}
        </div>
      </article>`;
    showReader(copy);
  };

  const topicArt = (article, compact = false) => article.image
    ? `<img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">`
    : `<div class="lux-reader-cover-art ${escapeHtml(article.artClass || "is-caviar")}" role="img" aria-label="${escapeHtml(article.title)}"></div>`;

  const render = (id, push) => {
    const article = articles[id];
    if (!article) return;
    if (push && currentId) stack.push(currentId);
    currentId = id;
    const copy = labels();
    if (article.type === "recipe" && article.recipe) {
      const recipe = article.recipe;
      const relatedContent = contentLinks[topicFor(id, article)] || {};
      const relatedKnowledge = knowledgeForRecipe(id, article, relatedContent.knowledge);
      const recipeLabels = article.lang === "zh"
        ? { time: "时间", difficulty: "难度", servings: "份量", ingredients: "食材", method: "准备", nutrition: "每份的估计营养成分", nutritionNote: "营养说明", region: "参考产区", oil: "推荐用油", professionalTip: "专业提示", foodSafety: "食品安全", allergens: "过敏原提示", substitutions: "可替换食材", knowledge: "相关知识", products: "相关产品" }
        : { time: "Time", difficulty: "Difficulty", servings: "Serves", ingredients: "Ingredients", method: "Method", nutrition: "Estimated nutrition per serving", nutritionNote: "Nutrition note", region: "Reference region", oil: "Suggested oil", professionalTip: "Professional tip", foodSafety: "Food safety", allergens: "Allergen note", substitutions: "Substitutions", knowledge: "Related guide", products: "Related products" };
      const productCategory = article.productCategory || relatedContent.productCategory;
      const productIndex = document.querySelector('.lux-nav a[href$="product.html"], .lux-nav a[href$="/product/"]')?.href || "product.html";
      const productUrl = new URL(productIndex, location.href);
      if (productCategory) productUrl.searchParams.set("category", productCategory);
      productUrl.hash = productCategory ? "product-catalogue" : "";
      const productHref = productUrl.href;
      const productCta = recipe.products || relatedContent.product;
      body.innerHTML = `
        <article class="lux-recipe-reader">
          <section class="lux-recipe-hero">
            <figure>${article.image ? `<img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">` : topicArt(article)}</figure>
            <div class="lux-recipe-intro">
              <span>${escapeHtml(article.eyebrow)}</span>
              <h2 id="lux-reader-title">${escapeHtml(article.title)}</h2>
              <p>${escapeHtml(article.intro)}</p>
              <dl class="lux-recipe-facts">
                <div><dt>${recipeLabels.time}</dt><dd>${escapeHtml(recipe.time)}</dd></div>
                <div><dt>${recipeLabels.difficulty}</dt><dd>${escapeHtml(recipe.difficulty)}</dd></div>
                <div><dt>${recipeLabels.servings}</dt><dd>${escapeHtml(recipe.servings)}</dd></div>
              </dl>
            </div>
          </section>
          <section class="lux-recipe-body">
            <aside class="lux-recipe-ingredients">
              <h3>${recipeLabels.ingredients}</h3>
              <ul>${recipe.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </aside>
            <div class="lux-recipe-method">
              <h3>${recipeLabels.method}</h3>
              <ol>${recipe.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
            </div>
          </section>
          <section class="lux-recipe-nutrition">
            <header><h3>${recipeLabels.nutrition}</h3></header>
            <dl>${recipe.nutrition.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>
            ${recipe.nutritionNote ? `<p class="lux-recipe-nutrition-note"><strong>${recipeLabels.nutritionNote}</strong>${escapeHtml(recipe.nutritionNote)}</p>` : ""}
          </section>
          <section class="lux-recipe-details">
            ${[[recipeLabels.region, recipe.region], [recipeLabels.oil, recipe.oil], [recipeLabels.professionalTip, recipe.professionalTip], [recipeLabels.foodSafety, recipe.foodSafety], [recipeLabels.allergens, recipe.allergens], [recipeLabels.substitutions, recipe.substitutions]].filter(([, value]) => value).map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
            ${relatedKnowledge.length ? `<div><dt>${recipeLabels.knowledge}</dt><dd><nav class="flex flex-col items-start gap-2" aria-label="${recipeLabels.knowledge}">${relatedKnowledge.map((link) => `<a class="lux-recipe-product-link" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}<svg class="lux-lucide" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"/></svg></a>`).join("")}</nav></dd></div>` : ""}
            ${productCta ? `<div><dt>${recipeLabels.products}</dt><dd><a class="lux-recipe-product-link" href="${escapeHtml(productHref)}" data-lux-cta data-lux-cta-type="product" data-lux-cta-id="${escapeHtml(id)}" data-lux-cta-location="recipe-details">${escapeHtml(productCta)}<svg class="lux-lucide" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"/></svg></a></dd></div>` : ""}
          </section>
        </article>`;
      showReader(copy);
      return;
    }
    const articleSections = article.sections.length ? article.sections : [[copy.note, copy.noteText]];
    const contentText = (item) => typeof item === "string"
      ? item
      : item?.type === "table"
        ? item.rows.flat().join(" ")
        : item?.lines?.join("") || item?.text || "";
    const paragraphs = (content, mergeShortCopy = false) => {
      const items = Array.isArray(content) ? content : [content];
      if (mergeShortCopy && items.every((item) => typeof item === "string")) {
        const groups = [];
        for (const item of items) {
          const isListItem = item.startsWith("• ");
          const previous = groups.at(-1);
          if (isListItem && previous?.type === "list") previous.items.push(item.slice(2));
          else if (isListItem) groups.push({ type: "list", items: [item.slice(2)] });
          else if (previous?.type === "copy") previous.items.push(item);
          else groups.push({ type: "copy", items: [item] });
        }
        return groups.map((group) => group.type === "list"
          ? `<ul class="lux-reader-prose-list">${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
          : `<p>${group.items.map(escapeHtml).join(article.lang === "zh" ? "" : " ")}</p>`).join("");
      }
      return items.map((item) => item?.type === "table"
        ? `<div class="lux-reader-table-wrap"><table><tbody>${item.rows.map((row, rowIndex) => `<tr>${row.map((cell) => `<${rowIndex ? "td" : "th"}>${escapeHtml(cell)}</${rowIndex ? "td" : "th"}>`).join("")}</tr>`).join("")}</tbody></table></div>`
        : item?.type === "strong"
        ? `<p class="lux-reader-inline-heading"><strong>${escapeHtml(item.text)}</strong></p>`
        : item?.type === "quote"
          ? `<blockquote class="lux-reader-indent-quote">${item.lines.map((line, index) => `<p>${item.bold?.includes(index) ? `<strong>${escapeHtml(line)}</strong>` : escapeHtml(line)}</p>`).join("")}</blockquote>`
          : `<p>${escapeHtml(item)}</p>`)
        .join("");
    };
    const opening = article.opening || [];
    const plainText = [article.intro, ...opening, ...articleSections.flatMap(([, content]) => (Array.isArray(content) ? content : [content]).map(contentText))].join(" ");
    const units = article.lang === "zh" ? plainText.replace(/\s/g, "").length / 300 : (plainText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length / 200;
    const minutes = Math.max(1, Math.ceil(units));
    const metaParts = article.meta.split("·").map((part) => part.trim()).filter(Boolean);
    const readTime = article.lang === "zh" ? `${minutes} 分钟阅读` : `${minutes} min read`;
    const issue = article.slug
      ? (article.lang === "zh" ? "知识博客" : "Knowledge Blog")
      : (article.lang === "zh" ? "品牌调查" : "LuxurEat (露意膳) Journal");
    const metaItems = [issue, article.eyebrow, readTime, metaParts[1] || metaParts[0] || ""];
    const asideRows = [
      [article.lang === "zh" ? "栏目" : "Column", article.column || article.eyebrow],
      [article.lang === "zh" ? "档案" : "Series", article.archive || localizeArchiveLabel(metaParts[0]) || copy.archive],
      [article.lang === "zh" ? "日期" : "Date", metaParts[1] || ""],
    ].filter(([, value]) => value);
    const tocLabel = article.lang === "zh" ? "目录" : "Contents";
    const figureLabel = article.lang === "zh" ? "图" : "Figure";
    const openingHtml = opening.length ? `<section class="lux-reader-section lux-reader-section-opening">${paragraphs(opening, Boolean(article.slug))}</section>` : "";
    const articleLinks = recipeForArticle(article, contentLinks[article.topic]?.recipe);
    const primaryArticleLink = articleLinks[0];
    const secondaryArticleLinks = articleLinks.slice(1);
    const middleSectionIndex = Math.max(0, Math.ceil(articleSections.length / 2) - 1);
    const linkType = (href) => href.includes("recipe=") ? "recipe" : /(?:product|new)\.html/.test(href) ? "product" : "content";
    const sectionHtml = articleSections.map(([heading, content], index) => {
      const media = article.sectionMedia?.[index] || [];
      return `
          <section class="lux-reader-section" id="lux-reader-section-${index}">
            <h3>${escapeHtml(heading)}</h3>
            ${paragraphs(content, Boolean(article.slug))}
            ${media.length ? `<div class="lux-reader-section-media">${media.map((item, mediaIndex) => `
              <figure>
                <button type="button" class="lux-reader-image-button" data-reader-image="${escapeHtml(item.src)}" aria-label="${escapeHtml(article.lang === "zh" ? `放大查看：${item.alt || heading}` : `View full size: ${item.alt || heading}`)}">
                  <img loading="lazy" decoding="async" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || heading)}">
                </button>
                <figcaption>${figureLabel} ${String(mediaIndex + 1).padStart(2, "0")} / ${escapeHtml(heading)}</figcaption>
              </figure>`).join("")}</div>` : ""}
          </section>
          ${primaryArticleLink && index === middleSectionIndex ? `<nav class="lux-reader-article-links lux-reader-inline-links" aria-label="${escapeHtml(copy.related)}"><a class="lux-recipe-product-link" href="${escapeHtml(primaryArticleLink.href)}" data-lux-cta data-lux-cta-type="${linkType(primaryArticleLink.href)}" data-lux-cta-id="${escapeHtml(article.slug || id)}" data-lux-cta-location="article-body">${escapeHtml(primaryArticleLink.label.replace(/\s*→\s*$/, ""))}<svg class="lux-lucide" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"/></svg></a></nav>` : ""}`;
    }).join("");
    const tocHtml = articleSections.map(([heading], index) => `<a href="#lux-reader-section-${index}">${escapeHtml(article.tocLabels?.[index] || heading)}</a>`).join("");

    body.innerHTML = `
      <article class="lux-reader-layout${article.slug ? " lux-academy-reader" : ""}${article.wideCover ? " is-wide-cover" : ""}">
        <div class="lux-reader-rule"></div>
        <section class="lux-reader-hero">
          <div class="lux-reader-hero-copy">
            <div class="lux-reader-meta-grid">
              ${metaItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
            </div>
            <h2 id="lux-reader-title">${escapeHtml(article.title)}</h2>
            <p class="lux-reader-summary">${escapeHtml(article.intro)}</p>
          </div>
          <figure class="lux-reader-cover">
            ${article.image ? `<img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}"${article.coverPosition ? ` style="object-position: ${escapeHtml(article.coverPosition)}"` : ""}>` : topicArt(article)}
            <figcaption>${figureLabel} 01 / ${escapeHtml(article.archive || article.eyebrow)}</figcaption>
          </figure>
        </section>
        <section class="lux-reader-content">
          <aside class="lux-reader-aside">
            ${asideRows.map(([label, value]) => `<span>${escapeHtml(label)}：${escapeHtml(value)}</span>`).join("")}
          </aside>
          <div class="lux-reader-copy">
            ${openingHtml}
            ${sectionHtml}
            ${secondaryArticleLinks.length ? `<nav class="lux-reader-article-links" aria-label="${escapeHtml(copy.related)}">${secondaryArticleLinks.map((link) => `<a class="lux-recipe-product-link" href="${escapeHtml(link.href)}" data-lux-cta data-lux-cta-type="${linkType(link.href)}" data-lux-cta-id="${escapeHtml(article.slug || id)}" data-lux-cta-location="article-related">${escapeHtml(link.label.replace(/\s*→\s*$/, ""))}<svg class="lux-lucide" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"/></svg></a>`).join("")}</nav>` : ""}
            ${article.quote ? `<blockquote class="lux-reader-quote">${escapeHtml(article.quote)}</blockquote>` : ""}
          </div>
          <aside class="lux-reader-pull">
            <p>${escapeHtml(article.asideSummary || article.quote || copy.noteText)}</p>
            <nav class="lux-reader-toc" aria-label="${escapeHtml(tocLabel)}">
              <span>${escapeHtml(tocLabel)}</span>
              ${tocHtml}
            </nav>
          </aside>
        </section>
          <section class="lux-reader-related">
            <div class="lux-reader-related-head">
              <h3>${copy.related}</h3>
            </div>
            <div class="lux-reader-related-grid">
              ${article.related.map((relatedId) => {
                const item = articles[relatedId];
                return item ? `
                  <button type="button"${item.wideCover ? ' class="is-wide-cover"' : ""} data-reader-related="${escapeHtml(relatedId)}">
                    <span class="lux-reader-related-media">
                      ${item.image ? `<img loading="lazy" decoding="async" src="${escapeHtml(item.image)}" alt="">` : topicArt(item, true)}
                      <span class="lux-reader-related-cta">${copy.read}</span>
                    </span>
                    <span>${escapeHtml(item.archive || item.eyebrow || item.topicLabel)}</span>
                    <strong>${escapeHtml(item.title)}</strong>
                  </button>` : "";
              }).join("")}
            </div>
          </section>
      </article>`;

    showReader(copy);
  };

  const renderEvent = (id) => {
    const event = events.find((item) => item.id === id);
    const article = event?.[lang];
    if (!event || !article) return;
    stack.length = 0;
    archiveOrigin = false;
    currentId = `event:${id}`;
    const copy = labels();
    const allEvents = events.map((item) => ({ item, copy: item[lang] })).filter(({ copy: itemCopy }) => itemCopy);
    body.innerHTML = `
      <article class="lux-event-reader">
        <header class="lux-event-reader-intro">
          <div>
            <p>${escapeHtml(article.eyebrow)} / ${escapeHtml(article.category)}</p>
            <h2 id="lux-reader-title">${escapeHtml(article.articleTitle)}</h2>
          </div>
          <p>${escapeHtml(article.intro)}</p>
        </header>
        <div class="lux-event-reader-layout">
          <section class="lux-event-reader-article">
            <figure><img loading="lazy" decoding="async" src="${escapeHtml(event.previewImage || event.image)}" alt="${escapeHtml(article.articleTitle)}"></figure>
            <div class="lux-event-reader-lead">
              <span>${escapeHtml(article.dateIso)}<br>${escapeHtml(article.city)}<br>${escapeHtml(article.category)}</span>
              <p>${escapeHtml(article.intro)}</p>
            </div>
            <div class="lux-event-reader-copy">
              <aside>${lang === "zh" ? "活动回顾" : "Event Journal"}<br>${escapeHtml(article.location)}</aside>
              <div>
                ${article.sections.map(([heading, text]) => `<section><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(text)}</p></section>`).join("")}
                <blockquote>${escapeHtml(article.quote)}</blockquote>
              </div>
            </div>
          </section>
          <aside class="lux-event-reader-index">
            <div><h3>${lang === "zh" ? "所有活动" : "All Events"}</h3><span>${String(allEvents.length).padStart(2, "0")}</span></div>
            ${allEvents.map(({ item, copy: itemCopy }, index) => `<button type="button" data-event-open="${escapeHtml(item.id)}"><img loading="lazy" decoding="async" src="${escapeHtml(item.poster || item.image)}" alt=""><span><strong>${escapeHtml(itemCopy.articleTitle)}</strong><small>${escapeHtml(itemCopy.city)} / ${escapeHtml(itemCopy.dateIso)}</small></span><small>${String(index + 1).padStart(2, "0")}</small></button>`).join("")}
          </aside>
        </div>
      </article>`;
    showReader(copy);
  };

  const open = (id) => {
    stack.length = 0;
    archiveOrigin = false;
    currentId = "";
    render(id, false);
  };
  const close = () => {
    if (archiveOrigin && currentId !== "__archive") {
      stack.length = 0;
      archiveOrigin = false;
      renderArchive(false);
      return;
    }
    if (window.LuxureatReturnFromInternalLink?.()) return;
    reader.hidden = true;
    document.body.classList.remove("lux-reader-open");
    stack.length = 0;
    archiveOrigin = false;
    currentId = "";
    if (location.hash.startsWith("#event-") || location.hash.startsWith("#reader-")) history.replaceState(null, "", `${location.pathname}${location.search}`);
  };

  const imageLightbox = document.createElement("dialog");
  imageLightbox.className = "lux-about-lightbox";
  imageLightbox.innerHTML = `<div class="lux-image-lightbox-frame"><button type="button" data-reader-lightbox-close aria-label="${lang === "zh" ? "关闭大图" : "Close full-size image"}"><svg class="lux-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg></button><img alt=""></div>`;
  document.body.appendChild(imageLightbox);

  document.addEventListener("click", (event) => {
    const eventTrigger = event.target.closest("[data-event-open]");
    if (eventTrigger) {
      event.preventDefault();
      renderEvent(eventTrigger.dataset.eventOpen);
      return;
    }
    const archive = event.target.closest("[data-reader-archive]");
    if (archive) {
      event.preventDefault();
      stack.length = 0;
      archiveOrigin = false;
      currentId = "";
      renderArchive(false);
      return;
    }
    const trigger = event.target.closest("[data-reader-open]") || event.target.closest(".lux-reader-media")?.querySelector("[data-reader-open]");
    if (!trigger || !articles[trigger.dataset.readerOpen]) return;
    event.preventDefault();
    open(trigger.dataset.readerOpen);
  });
  body.addEventListener("click", (event) => {
    const imageTrigger = event.target.closest("[data-reader-image]");
    if (imageTrigger) {
      const image = imageLightbox.querySelector("img");
      image.src = imageTrigger.dataset.readerImage;
      image.alt = imageTrigger.querySelector("img")?.alt || "";
      imageLightbox.showModal();
      return;
    }
    const archived = event.target.closest("[data-reader-archive-item]");
    if (archived) {
      stack.length = 0;
      archiveOrigin = true;
      render(archived.dataset.readerArchiveItem, false);
      return;
    }
    const related = event.target.closest("[data-reader-related]");
    if (related) render(related.dataset.readerRelated, true);
    const archiveFilter = event.target.closest("[data-reader-archive-filter]");
    if (archiveFilter) {
      const filter = archiveFilter.dataset.readerArchiveFilter || "all";
      body.querySelectorAll("[data-reader-archive-filter]").forEach((button) => {
        button.classList.toggle("is-active", button === archiveFilter);
      });
      body.querySelectorAll("[data-reader-archive-category]").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.readerArchiveCategory !== filter;
      });
    }
  });
  imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox || event.target.closest("[data-reader-lightbox-close]")) imageLightbox.close();
  });
  body.addEventListener("scroll", syncReaderTop, { passive: true });
  backButton.addEventListener("click", () => {
    const previous = stack.pop();
    if (previous === "__archive") renderArchive(false);
    else if (previous) render(previous, false);
  });
  closeButtons.forEach((button) => button.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !imageLightbox.open && !reader.hidden) close();
  });
  if (location.hash === "#archive") renderArchive(false);
  else if (events.some((event) => event.id === eventHash)) renderEvent(eventHash);
  else if (articles[readerHash]) open(readerHash);
  else if (requestedRecipe && articles[`${lang}-recipe-${requestedRecipe}`]) open(`${lang}-recipe-${requestedRecipe}`);
}


if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initLuxReader, { once: true });
else initLuxReader();
