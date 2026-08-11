(() => {
  const assetBase = new URL("../", document.currentScript?.src || location.href);
  const asset = (path) => new URL(path, assetBase).href;

  const images = {
    oil: asset("media/brand/gifting-collab-truffle-oil.jpg"),
    slices: asset("media/brand/gifting-channel-truffle-products.webp"),
    salt: asset("media/brand/gifting-wholesale-truffle-salt.webp"),
    truffle: asset("media/brand/contact-partnership-fresh-truffles.webp"),
  };
  const galleries = {
    oil: [images.oil, images.truffle],
    slices: [images.slices, images.truffle],
    seasoning: [images.salt, images.truffle],
    whole: [images.truffle, images.slices],
  };
  // Match the Italian mockup label and package size to each registered product row.
  const productImageOrder = [2, 1, 4, 3, 6, 7, 5, 8, 9, 11, 10, 13, 12, 16, 14, 15, 18, 19, 20, 17, 23, 21, 22, 24];
  const productImages = productImageOrder.map((number) =>
    asset(`media/products/appennino/product-${String(number).padStart(2, "0")}.webp`)
  );

  const labelCommon = {
    zh: {
      allergens: "除对配料过敏或不耐受者外，所有人群均可食用。",
      origin: "意大利",
      importer: "露意膳（上海）贸易有限公司",
      address: "上海市金山区枫泾镇曹黎路38弄19号5312室",
    },
    en: {
      allergens: "Suitable for all consumers except those allergic or intolerant to any ingredient.",
      origin: "Italy",
      importer: "LuxurEat (Shanghai) Trading Co., Ltd.",
      address: "Room 5312, No. 19, Lane 38, Caoli Road, Fengjing Town, Jinshan District, Shanghai",
    },
  };
  const labelFamilies = {
    flavoredOil: {
      zh: { type: "调味油", ingredients: "橄榄油、食用香料。", storage: "避光、避热保存。", nutrition: "每100毫升：能量3379千焦，蛋白质0克，脂肪91.3克，碳水化合物0克，糖0克，膳食纤维0克，钠500毫克。", summary: "以橄榄油和食用香料调制的白松露风味油，适合为意面、烩饭、蛋料理与冷盘增添松露香气。" },
      en: { type: "Seasoning Oil", ingredients: "Olive oil and flavouring.", storage: "Store away from light and heat.", nutrition: "Per 100 ml: energy 3379 kJ, protein 0 g, fat 91.3 g, carbohydrate 0 g, sugars 0 g, dietary fibre 0 g, sodium 500 mg.", summary: "A white-truffle-flavoured olive oil for finishing pasta, risotto, egg dishes and cold plates." },
    },
    evoo: {
      zh: { type: "调味油", ingredients: "特级初榨橄榄油、春季白松露干（白孢块菌）0.2%、食用香料。", storage: "避光、避热保存。", nutrition: "每100毫升：能量3382千焦，蛋白质0克，脂肪91.4克，碳水化合物0克，糖0克，膳食纤维0克，钠500毫克。", summary: "以特级初榨橄榄油、0.2%春季白松露干和食用香料调制，兼具橄榄油果香与白松露香气。" },
      en: { type: "Seasoning Oil", ingredients: "Extra virgin olive oil, dried spring white truffle (Tuber borchii) 0.2%, and flavouring.", storage: "Store away from light and heat.", nutrition: "Per 100 ml: energy 3382 kJ, protein 0 g, fat 91.4 g, carbohydrate 0 g, sugars 0 g, dietary fibre 0 g, sodium 500 mg.", summary: "Extra virgin olive oil blended with 0.2% dried spring white truffle and flavouring for a rounded truffle finish." },
    },
    slices: {
      zh: { type: "食用菌罐头", ingredients: "夏季黑松露（夏块菌）52%、橄榄油、食用盐、食用香料。", storage: "置于阴凉干燥处；开封后需2°C-4°C冷藏保存。", nutrition: "每100克：能量1562千焦，蛋白质3.7克，脂肪38.1克，碳水化合物2克，糖0.7克，膳食纤维6.9克，钠300毫克。", summary: "精选夏季黑松露切片，以橄榄油、食用盐和食用香料调制，适合直接点缀主菜、意面与烩饭。" },
      en: { type: "Canned Edible Fungi", ingredients: "Summer black truffle (Tuber aestivum) 52%, olive oil, salt, and flavouring.", storage: "Store in a cool, dry place; refrigerate at 2°C-4°C after opening.", nutrition: "Per 100 g: energy 1562 kJ, protein 3.7 g, fat 38.1 g, carbohydrate 2 g, sugars 0.7 g, dietary fibre 6.9 g, sodium 300 mg.", summary: "Slices of summer black truffle preserved in olive oil, ready for garnishing mains, pasta and risotto." },
    },
    waterSlices: {
      zh: { type: "食用菌罐头", ingredients: "水、夏季黑松露（夏块菌）、食用盐；松露原产于欧盟。", storage: "置于阴凉干燥处；开封后需2°C-4°C冷藏保存。", nutrition: "每100克：能量247千焦，蛋白质4.9克，脂肪0.6克，碳水化合物4.8克，糖0克，膳食纤维7.4克，钠350毫克。", summary: "水浸夏季黑松露片保留食材本味与清晰质感，适合厨房按需调味和二次加工。" },
      en: { type: "Canned Edible Fungi", ingredients: "Water, summer black truffle (Tuber aestivum), and salt; truffles of EU origin.", storage: "Store in a cool, dry place; refrigerate at 2°C-4°C after opening.", nutrition: "Per 100 g: energy 247 kJ, protein 4.9 g, fat 0.6 g, carbohydrate 4.8 g, sugars 0 g, dietary fibre 7.4 g, sodium 350 mg.", summary: "Summer black truffle slices preserved in water for a clean flavour and flexible professional-kitchen use." },
    },
    sunflowerSlices: {
      zh: { type: "食用菌罐头", ingredients: "葵花籽油、夏季黑松露（夏块菌）40%、食用盐、食用香料。", storage: "置于阴凉干燥处；开封后需2°C-4°C冷藏保存。", nutrition: "每100克：能量702千焦，蛋白质6.5克，脂肪12.6克，碳水化合物3.3克，糖0克，膳食纤维8.4克，钠800毫克。", summary: "夏季黑松露含量40%，以葵花籽油浸渍，风味柔和，适合餐饮批量应用与成品装饰。" },
      en: { type: "Canned Edible Fungi", ingredients: "Sunflower oil, summer black truffle (Tuber aestivum) 40%, salt, and flavouring.", storage: "Store in a cool, dry place; refrigerate at 2°C-4°C after opening.", nutrition: "Per 100 g: energy 702 kJ, protein 6.5 g, fat 12.6 g, carbohydrate 3.3 g, sugars 0 g, dietary fibre 8.4 g, sodium 800 mg.", summary: "Summer black truffle slices at 40%, preserved in sunflower oil for balanced flavour and food-service use." },
    },
    honey: {
      zh: { type: "复合调味品", ingredients: "洋槐蜜99%、食用香料、春季白松露干（白孢块菌）0.05%。", storage: "置于阴凉干燥处。", nutrition: "每100克：能量1379千焦，蛋白质0克，脂肪0克，碳水化合物81.1克，糖80.8克，膳食纤维0克，钠20毫克。", summary: "以99%洋槐蜜融合白松露风味，适合搭配奶酪、烤肉、甜点与礼赠组合。" },
      en: { type: "Compound Condiment", ingredients: "Acacia honey 99%, flavouring, and dried spring white truffle (Tuber borchii) 0.05%.", storage: "Store in a cool, dry place.", nutrition: "Per 100 g: energy 1379 kJ, protein 0 g, fat 0 g, carbohydrate 81.1 g, sugars 80.8 g, dietary fibre 0 g, sodium 20 mg.", summary: "Acacia honey at 99% with white truffle character, designed for cheese, roasted meats, desserts and gifting." },
    },
    whiteSauce: {
      zh: { type: "复合调味品", ingredients: "双孢蘑菇（双孢菇）54%、橄榄油、白松露（意大利白块菌）1%、食用盐、食用香料。", storage: "置于阴凉干燥处；开封后需2°C-4°C冷藏保存。", nutrition: "每100克：能量1683千焦，蛋白质2.1克，脂肪44.2克，碳水化合物0克，糖0克，膳食纤维1.5克，钠980毫克。", summary: "以双孢蘑菇、橄榄油和1%意大利白松露制成的细腻复合酱料，可用于意面、烩饭、肉类和酱汁调配。" },
      en: { type: "Compound Condiment", ingredients: "Button mushrooms 54%, olive oil, Italian white truffle 1%, salt, and flavouring.", storage: "Store in a cool, dry place; refrigerate at 2°C-4°C after opening.", nutrition: "Per 100 g: energy 1683 kJ, protein 2.1 g, fat 44.2 g, carbohydrate 0 g, sugars 0 g, dietary fibre 1.5 g, sodium 980 mg.", summary: "A smooth sauce of button mushrooms, olive oil and 1% Italian white truffle for pasta, risotto, meats and sauces." },
    },
    blackSauce: {
      zh: { type: "复合调味品", ingredients: "双孢蘑菇（双孢菇）50%、橄榄油、夏季黑松露（夏块菌）、黑橄榄、食用盐、食用香料。", storage: "置于阴凉干燥处；开封后需2°C-4°C冷藏保存。", nutrition: "每100克：能量2081千焦，蛋白质2.5克，脂肪54克，碳水化合物0.6克，糖0克，膳食纤维3.8克，钠750毫克。", summary: "以双孢蘑菇、橄榄油、夏季黑松露和黑橄榄调制的浓郁松露酱，适合热菜、酱汁与烘焙馅料。" },
      en: { type: "Compound Condiment", ingredients: "Button mushrooms 50%, olive oil, summer black truffle (Tuber aestivum), black olives, salt, and flavouring.", storage: "Store in a cool, dry place; refrigerate at 2°C-4°C after opening.", nutrition: "Per 100 g: energy 2081 kJ, protein 2.5 g, fat 54 g, carbohydrate 0.6 g, sugars 0 g, dietary fibre 3.8 g, sodium 750 mg.", summary: "A rich sauce of button mushrooms, olive oil, summer black truffle and black olives for hot dishes, sauces and savoury fillings." },
    },
    winterSauce: {
      zh: { type: "复合调味品", ingredients: "双孢蘑菇（双孢菇）50%、橄榄油、鸡油菌（黑喇叭菌）5%、冬季黑松露（黑孢块菌）2.9%、天然黑松露食用香料、食用盐；不含麸质。", storage: "置于阴凉干燥处；开封后需冷藏保存。", nutrition: "每100克：能量1562千焦，蛋白质1.9克，脂肪40.2克，碳水化合物2.7克，糖0克，膳食纤维3.7克，钠1480毫克。", summary: "含2.9%冬季黑松露与5%黑喇叭菌，层次深沉且不含麸质，适合精细餐饮调味。" },
      en: { type: "Compound Condiment", ingredients: "Button mushrooms 50%, olive oil, black trumpet mushrooms 5%, winter black truffle (Tuber melanosporum) 2.9%, natural black truffle flavouring, and salt; gluten-free.", storage: "Store in a cool, dry place; refrigerate after opening.", nutrition: "Per 100 g: energy 1562 kJ, protein 1.9 g, fat 40.2 g, carbohydrate 2.7 g, sugars 0 g, dietary fibre 3.7 g, sodium 1480 mg.", summary: "A gluten-free sauce with 2.9% winter black truffle and 5% black trumpet mushrooms for refined savoury applications." },
    },
    whole: {
      zh: { type: "食用菌罐头", ingredients: "夏季黑松露（夏块菌）、水、食用盐；松露原产于欧盟。", storage: "置于阴凉干燥处；开封后需2°C-4°C冷藏保存。", nutrition: "每100克：能量223千焦，蛋白质5.8克，脂肪0.6克，碳水化合物2.6克，糖0克，膳食纤维7.2克，钠490毫克。", summary: "整颗夏季黑松露以水和食用盐保存，便于切片、刨削或加入酱汁，保留完整食材形态。" },
      en: { type: "Canned Edible Fungi", ingredients: "Summer black truffle (Tuber aestivum), water, and salt; truffles of EU origin.", storage: "Store in a cool, dry place; refrigerate at 2°C-4°C after opening.", nutrition: "Per 100 g: energy 223 kJ, protein 5.8 g, fat 0.6 g, carbohydrate 2.6 g, sugars 0 g, dietary fibre 7.2 g, sodium 490 mg.", summary: "Whole summer black truffles preserved in water and salt, ready for slicing, shaving or sauce preparation." },
    },
    juice: {
      zh: { type: "复合调味汁", ingredients: "冬季黑松露汁（黑孢块菌）99.5%、食用盐、天然黑松露食用香料；不含麸质。", storage: "置于阴凉干燥处；开封后需冷藏保存。", nutrition: "每100毫升：能量10千焦，蛋白质0.6克，脂肪0克，碳水化合物0克，糖0克，膳食纤维0.6克，钠500毫克。", summary: "以99.5%冬季黑松露汁制成的不含麸质复合调味汁，适合强化高汤、酱汁与烩饭的松露风味。" },
      en: { type: "Compound Seasoning Sauce", ingredients: "Winter black truffle juice (Tuber melanosporum) 99.5%, salt, and natural black truffle flavouring; gluten-free.", storage: "Store in a cool, dry place; refrigerate after opening.", nutrition: "Per 100 ml: energy 10 kJ, protein 0.6 g, fat 0 g, carbohydrate 0 g, sugars 0 g, dietary fibre 0.6 g, sodium 500 mg.", summary: "A gluten-free seasoning sauce made with 99.5% winter black truffle juice for enriching stocks, sauces and risotto." },
    },
  };
  const familyFor = (slug) => {
    if (slug.startsWith("white-truffle-oil")) return "flavoredOil";
    if (slug.startsWith("white-truffle-evoo")) return "evoo";
    if (slug.includes("slices-water")) return "waterSlices";
    if (slug.includes("slices-oil")) return "sunflowerSlices";
    if (slug.startsWith("summer-truffle-slices")) return "slices";
    if (slug.startsWith("truffle-honey")) return "honey";
    if (slug.startsWith("white-truffle-sauce")) return "whiteSauce";
    if (slug.startsWith("black-truffle-sauce")) return "blackSauce";
    if (slug.startsWith("winter-black-truffle-sauce")) return "winterSauce";
    if (slug.startsWith("whole-summer-truffles")) return "whole";
    return "juice";
  };
  const labelDetails = (label, lang, registration) => {
    const common = labelCommon[lang];
    const names = lang === "zh"
      ? ["产品类型", "配料", "致敏提醒", "原产国", "进口商", "进口商地址", "贮存条件", "境外生产企业注册编号", "营养成分"]
      : ["Product Type", "Ingredients", "Allergen Advice", "Country of Origin", "Importer", "Importer Address", "Storage", "Overseas Producer Registration", "Nutrition Information"];
    return [
      label.type, label.ingredients, common.allergens, common.origin, common.importer,
      common.address, label.storage, registration, label.nutrition,
    ].map((value, index) => ({ label: names[index], value }));
  };
  const typeKeys = {
    "调味油": "seasoning-oil",
    "食用菌罐头": "canned-fungi",
    "复合调味品": "compound-condiment",
    "复合调味汁": "compound-sauce",
  };

  const rows = [
    ["white-truffle-oil-60ml", "Olio aromatizzato al tartufo bianco", "白松露风味油", "60 ml", "oil", "CITA06022511070074", "1517909002-101 / 1517909002-102 / 2103909000-103", "2029-10-12"],
    ["white-truffle-oil-250ml", "Olio aromatizzato al tartufo bianco", "白松露风味油", "250 ml", "oil", "CITA06022511070074", "1517909002-101 / 1517909002-102 / 2103909000-103", "2029-10-12"],
    ["white-truffle-evoo-60ml", "Olio extravergine al tartufo bianco", "白松露特级初榨橄榄油", "60 ml", "oil", "CITA06022511070074", "1517909002-101 / 1517909002-102 / 2103909000-103", "2029-10-12"],
    ["white-truffle-evoo-250ml", "Olio extravergine al tartufo bianco", "白松露特级初榨橄榄油", "250 ml", "oil", "CITA06022511070074", "1517909002-101 / 1517909002-102 / 2103909000-103", "2029-10-12"],
    ["summer-truffle-slices-50g", "Fette tartufo nero estate", "夏季黑松露片", "50 g", "slices", "CITA19012411040130", "2003901990-119", "2029-11-04"],
    ["summer-truffle-slices-80g", "Fette tartufo nero estate", "夏季黑松露片", "80 g", "slices", "CITA19012411040130", "2003901990-119", "2029-11-04"],
    ["summer-truffle-slices-180g", "Fette tartufo nero estate", "夏季黑松露片", "180 g", "slices", "CITA19012411040130", "2003901990-119", "2029-11-04"],
    ["summer-truffle-slices-water-350g", "Fette tartufo nero estate in acqua", "水浸夏季黑松露片", "350 g", "slices", "CITA19012411040130", "2003901990-119", "2029-11-04"],
    ["summer-truffle-slices-oil-350g", "Fette tartufo nero estate in olio di girasole", "葵花籽油浸夏季黑松露片", "350 g", "slices", "CITA19012411040130", "2003901990-119", "2029-11-04"],
    ["truffle-honey-50g", "Miele al tartufo", "松露蜂蜜", "50 g", "seasoning", "CITA28052410120158", "Other seasoning", "2029-10-12"],
    ["truffle-honey-170g", "Miele al tartufo", "松露蜂蜜", "170 g", "seasoning", "CITA28052410120158", "Other seasoning", "2029-10-12"],
    ["white-truffle-sauce-80g", "Salsa al tartufo bianco", "白松露酱", "80 g", "seasoning", "CITA28052410120158", "Other seasoning", "2029-10-12"],
    ["white-truffle-sauce-500g", "Salsa al tartufo bianco", "白松露酱", "500 g", "seasoning", "CITA28052410120158", "Other seasoning", "2029-10-12"],
    ["black-truffle-sauce-80g", "Salsa al tartufo nero", "黑松露酱", "80 g", "seasoning", "CITA28052410120158", "Other seasoning", "2029-10-12"],
    ["black-truffle-sauce-180g", "Salsa al tartufo nero", "黑松露酱", "180 g", "seasoning", "CITA28052410120158", "Other seasoning", "2029-10-12"],
    ["black-truffle-sauce-500g", "Salsa al tartufo nero", "黑松露酱", "500 g", "seasoning", "CITA28052410120158", "Other seasoning", "2029-10-12"],
    ["whole-summer-truffles-35g", "Tartufi estivi naturali", "整颗夏季黑松露", "35 g", "whole", "CITA19012411040130", "2003901990-119", "2029-11-04"],
    ["whole-summer-truffles-55g", "Tartufi estivi naturali", "整颗夏季黑松露", "55 g", "whole", "CITA19012411040130", "2003901990-119", "2029-11-04"],
    ["whole-summer-truffles-110g", "Tartufi estivi naturali", "整颗夏季黑松露", "110 g", "whole", "CITA19012411040130", "2003901990-119", "2029-11-04"],
    ["whole-summer-truffles-275g", "Tartufi estivi naturali", "整颗夏季黑松露", "275 g", "whole", "CITA19012411040130", "2003901990-119", "2029-11-04"],
    ["winter-black-truffle-sauce-80g", "Salsa al tartufo nero invernale", "冬季黑松露酱", "80 g", "seasoning", "CITA28052410120158", "Other seasoning", "2029-10-12"],
    ["winter-black-truffle-sauce-180g", "Salsa al tartufo nero invernale", "冬季黑松露酱", "180 g", "seasoning", "CITA28052410120158", "Other seasoning", "2029-10-12"],
    ["winter-black-truffle-sauce-500g", "Salsa al tartufo nero invernale", "冬季黑松露酱", "500 g", "seasoning", "CITA28052410120158", "Other seasoning", "2029-10-12"],
    ["winter-black-truffle-juice-350ml", "Succo di tartufo nero pregiato", "冬季黑松露汁", "350 ml", "seasoning", "CITA06022511070074", "1517909002-101 / 1517909002-102 / 2103909000-103", "2029-10-12"],
  ];

  const products = {};
  rows.forEach(([slug, italian, chinese, unit, category, registration, hsCode, validUntil], index) => {
    const image = productImages[index];
    const family = labelFamilies[familyFor(slug)];
    const common = {
      id: slug, sku: slug, unit, category: "truffle", typeKey: typeKeys[family.zh.type], registration, hsCode, validUntil,
      manufacturer: "APPENNINO FOOD GROUP SPA", image,
      gallery: [image, ...(galleries[category] || [])],
      catalogOnly: true, amount: 0, currency: "", priceLabel: "TEST",
    };
    products[`zh-${slug}`] = {
      ...common, title: `${chinese} · ${unit}`, eyebrow: family.zh.type,
      subtitle: italian,
      desc: `${family.zh.summary} 产品规格为 ${unit}。中国注册号：${registration}，注册有效期至 ${validUntil}。`,
      cardDesc: `${family.zh.summary} 产品规格为 ${unit}。`,
      mainIngredients: `主要配料：${family.zh.ingredients}`,
      details: labelDetails(family.zh, "zh", registration),
    };
    products[`en-${slug}`] = {
      ...common, title: `${italian} · ${unit}`, eyebrow: family.en.type,
      subtitle: chinese,
      desc: `${family.en.summary} Format: ${unit}. China registration: ${registration}; registration valid until ${validUntil}.`,
      cardDesc: `${family.en.summary} Format: ${unit}.`,
      mainIngredients: `Main ingredients: ${family.en.ingredients}`,
      details: labelDetails(family.en, "en", registration),
    };
  });

  window.LUXUREAT_PRODUCT_DATA = { images, galleries, products };
})();
