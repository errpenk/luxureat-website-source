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
  productImages[0] = asset("media/products/appennino/white-truffle-oil-60ml.webp");

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
      id: slug, sku: slug, unit, category: "truffle",
      categories: index < 4 ? ["truffle", "olive-oil"] : ["truffle"],
      typeKey: typeKeys[family.zh.type], registration, hsCode, validUntil,
      manufacturer: "APPENNINO FOOD GROUP SPA", image,
      gallery: [image, ...(galleries[category] || [])],
      catalogOnly: true, amount: 0, currency: "", priceLabel: "PRICE",
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

  const pastaProcessGallery = [
    asset("media/products/pasta/process-short-pasta.webp"),
    asset("media/products/pasta/process-long-pasta.webp"),
    asset("media/products/pasta/process-hand-finished.webp"),
  ];
  const campofiloneRows = [
    ["maccheroncini-di-campofilone-pgi", "Maccheroncini di Campofilone PGI", "坎波菲洛内通心粉（原产地认证）", "M0001", "1–2 分钟", "1–2 minutes", "0.6/0.7 mm × 1 mm；长 45–55 cm", "0.6/0.7 mm × 1 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "源自坎波菲洛内的经典鸡蛋面，以意大利硬质小麦粗面粉与新鲜鸡蛋制成。面体极细，经过低温缓慢干燥后呈现粗糙多孔的质地，既能充分吸附酱汁，又保持细腻轻盈的口感。2013 年获得欧盟地理标志保护（PGI）认证，并严格限定于坎波菲洛内当地生产。", "A classic egg pasta from Campofilone, made with Italian durum wheat semolina and fresh eggs. Its exceptionally thin strands are slowly dried at low temperature, creating a rough and porous texture with a delicate taste and excellent cooking yield. In 2013, Maccheroncini di Campofilone received European Protected Geographical Indication (PGI) recognition and can only be produced in the municipality of Campofilone."],
    ["linguine-di-campofilone", "Linguine di Campofilone", "坎波菲洛内细扁面", "M0002", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 2 mm；长 45–55 cm", "0.7/0.8 mm × 2 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "以意大利硬质小麦粗面粉和新鲜鸡蛋制成，延续坎波菲洛内传统鸡蛋面的轻薄特色。低温慢干赋予面体粗糙多孔的表面，更易与酱汁融合，同时保留细腻口感。", "Made with Italian durum wheat semolina and fresh eggs, this pasta reflects the thin and delicate character of traditional Campofilone egg pasta. Slow drying at low temperature gives it a rough and porous surface, ideal for blending with sauces while preserving a delicate texture."],
    ["fettuccine-di-campofilone", "Fettuccine di Campofilone", "坎波菲洛内宽面", "M0003", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 4 mm；长 45–55 cm", "0.7/0.8 mm × 4 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "精选意大利硬质小麦粗面粉与新鲜鸡蛋，以传统工艺制成。宽而轻薄的面体经过低温慢干，形成粗糙多孔的表面，能够充分承载酱汁。", "Made with Italian durum wheat semolina and fresh eggs according to traditional methods. The wide, thin strands are slowly dried at low temperature, creating a rough and porous surface that blends well with sauces."],
    ["tagliatelle-di-campofilone", "Tagliatelle di Campofilone", "坎波菲洛内宽扁面", "M0004", "3–4 分钟", "3–4 minutes", "0.7/0.8 mm × 6 mm；长 45–55 cm", "0.7/0.8 mm × 6 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "采用意大利硬质小麦粗面粉与新鲜鸡蛋制作，宽扁面体经低温缓慢干燥，口感细腻而富有韧性，粗糙多孔的表面能够充分包裹酱汁。", "Made with Italian durum wheat semolina and fresh eggs. The wide, flat strands are slowly dried at low temperature, giving the pasta a delicate texture and a rough, porous surface that holds sauces well."],
    ["chitarrine-di-campofilone", "Chitarrine di Campofilone", "坎波菲洛内干长面", "M0005", "4–6 分钟", "4–6 minutes", "1.2/1.5 mm × 1 mm；长 45–55 cm", "1.2/1.5 mm × 1 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "以意大利硬质小麦粗面粉和新鲜鸡蛋制成，细长面体兼具轻盈与质感。传统工艺和低温慢干形成粗糙多孔的表面，让酱汁均匀附着。", "Made with Italian durum wheat semolina and fresh eggs. The fine, long strands combine a delicate texture with the rough, porous surface created by traditional processing and slow low-temperature drying."],
    ["pappardelle-di-campofilone", "Pappardelle di Campofilone", "坎波菲洛内平扁面", "M0009", "6–8 分钟", "6–8 minutes", "1/1.2 mm × 12 mm；长 45–55 cm", "1/1.2 mm × 12 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "宽阔的面体带来更饱满的咀嚼感。精选意大利硬质小麦粗面粉和新鲜鸡蛋，经传统工艺制作并低温缓慢干燥，面体粗糙多孔，适合承载浓郁酱汁。", "Its broad strands provide a fuller texture. Made with Italian durum wheat semolina and fresh eggs using traditional methods, the pasta is slowly dried at low temperature to achieve a rough and porous surface."],
    ["sfoglia-di-campofilone", "Sfoglia di Campofilone", "坎波菲洛内酥皮面", "M0006", "3–4 分钟", "3–4 minutes", "0.7/0.8 mm × 13/15 cm；长 23–25 cm", "0.7/0.8 mm × 13/15 cm; length 23–25 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "以意大利硬质小麦粗面粉与新鲜鸡蛋制成的传统鸡蛋面皮，质地薄而细腻，经过低温缓慢干燥，兼具良好的烹饪表现与可塑性。", "Traditional egg pasta sheets made with Italian durum wheat semolina and fresh eggs. Thin and delicate, they are slowly dried at low temperature for excellent cooking performance."],
    ["saffron-fettuccine", "Saffron Fettuccine", "藏红花宽面", "M0070", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 4 mm；长 45–55 cm", "0.7/0.8 mm × 4 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 30.3%、藏红花 0.2%", "Durum wheat semolina, eggs 30.3%, saffron 0.2%", "在传统坎波菲洛内鸡蛋面中加入 0.2% 藏红花，带来优雅香气与鲜明色泽。以硬质小麦粗面粉和鸡蛋为基础，经低温缓慢干燥形成粗糙多孔的面体。", "Traditional Campofilone egg pasta enriched with 0.2% saffron, giving it a distinctive aroma and colour. Made with durum wheat semolina and eggs, it is slowly dried to create a rough and porous texture."],
    ["truffle-fettuccine", "Truffle Fettuccine", "松露宽面", "M0071", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 4 mm；长 45–55 cm", "0.7/0.8 mm × 4 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 23%、松露 3.6%、香料", "Durum wheat semolina, eggs 23%, truffle 3.6%, flavourings", "以硬质小麦粗面粉为基础，加入鸡蛋 23%、松露 3.6% 及香料，突出松露特有的馥郁香气。粗糙多孔的面体经过低温慢干，更易与酱汁融合。", "Made with durum wheat semolina, 23% eggs, 3.6% truffle and flavourings, highlighting the distinctive aroma of truffle. The rough and porous pasta is slowly dried at low temperature."],
    ["porcini-mushroom-fettuccine", "Porcini Mushroom Fettuccine", "牛肝菌宽面", "M0011", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 4 mm；长 45–55 cm", "0.7/0.8 mm × 4 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 30.3%、牛肝菌 5.6%", "Durum wheat semolina, eggs 30.3%, porcini mushrooms 5.6%", "在鸡蛋面中加入 5.6% 牛肝菌，赋予面体浓郁而自然的菌菇香气。采用硬质小麦粗面粉和鸡蛋制作，并经低温慢干保持粗糙多孔的质地。", "Egg pasta with 5.6% porcini mushrooms, giving the pasta a rich, natural mushroom aroma. Made with durum wheat semolina and eggs and slowly dried at low temperature to maintain its rough and porous texture."],
    ["squid-ink-fettuccine", "Squid Ink Fettuccine", "鱿鱼墨汁宽面", "M0012", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 4 mm；长 45–55 cm", "0.7/0.8 mm × 4 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 30.3%、鱿鱼墨 2%", "Durum wheat semolina, eggs 30.3%, squid ink 2%", "加入 2% 鱿鱼墨的鸡蛋宽面，拥有醒目的深色外观与鲜明海洋风味。以硬质小麦粗面粉和鸡蛋制成，经低温慢干形成适合挂汁的粗糙表面。", "Egg fettuccine with 2% squid ink, distinguished by its dark colour and characteristic marine flavour. Made with durum wheat semolina and eggs, it is slowly dried at low temperature to create a rough surface."],
    ["chili-pepper-fettuccine", "Chili Pepper Fettuccine", "辣椒宽面", "M0013", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 4 mm；长 45–55 cm", "0.7/0.8 mm × 4 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 30.3%、辣椒 3.6%", "Durum wheat semolina, eggs 30.3%, chili pepper 3.6%", "在传统鸡蛋宽面中加入 3.6% 辣椒，带来鲜明而有层次的辛香。面体经低温缓慢干燥，保持粗糙多孔的质感。", "Traditional egg fettuccine with 3.6% chili pepper, giving the pasta a distinctive spicy character. Slow low-temperature drying preserves its rough and porous texture."],
    ["sage-fettuccine", "Sage Fettuccine", "鼠尾草宽面", "M0015", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 4 mm；长 45–55 cm", "0.7/0.8 mm × 4 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 30.3%、鼠尾草 2.3%", "Durum wheat semolina, eggs 30.3%, sage 2.3%", "加入 2.3% 鼠尾草的鸡蛋宽面，自带清新而富有辨识度的草本香气。采用硬质小麦粗面粉与鸡蛋制成，并经低温慢干。", "Egg fettuccine with 2.3% sage, offering a distinctive herbal aroma. Made with durum wheat semolina and eggs and slowly dried at low temperature."],
    ["spinach-fettuccine", "Spinach Fettuccine", "菠菜宽面", "M0016", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 4 mm；长 45–55 cm", "0.7/0.8 mm × 4 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 30.3%、菠菜 1.9%", "Durum wheat semolina, eggs 30.3%, spinach 1.9%", "在鸡蛋宽面中加入 1.9% 菠菜，呈现自然色泽与清新的蔬菜风味。面体粗糙多孔，能够很好地承载酱汁。", "Egg fettuccine with 1.9% spinach, giving the pasta a natural colour and delicate vegetable character. Its rough and porous surface blends well with sauces."],
    ["nettle-fettuccine", "Nettle Fettuccine", "荨麻宽面", "M0018", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 4 mm；长 45–55 cm", "0.7/0.8 mm × 4 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 30.3%、荨麻 3.2%", "Durum wheat semolina, eggs 30.3%, nettle 3.2%", "加入 3.2% 荨麻的鸡蛋宽面，具有独特的草本风味与自然色泽。以硬质小麦粗面粉和鸡蛋为基础，经低温缓慢干燥。", "Egg fettuccine with 3.2% nettle, characterized by a distinctive herbal flavour and natural colour. Made with durum wheat semolina and eggs and slowly dried at low temperature."],
    ["lemon-fettuccine", "Lemon Fettuccine", "柠檬宽面", "M0081", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 4 mm；长 45–55 cm", "0.7/0.8 mm × 4 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 30.3%、柠檬 5.3%", "Durum wheat semolina, eggs 30.3%, lemon 5.3%", "加入 5.3% 柠檬的鸡蛋宽面，带来清新明亮的柑橘香气。粗糙多孔的面体能够与酱汁充分融合，同时保留轻盈风味。", "Egg fettuccine with 5.3% lemon, offering a fresh citrus aroma. Its rough and porous texture blends well with sauces while preserving a delicate character."],
  ];
  const strampelliRows = [
    ["rigatoni", "Rigatoni", "粗通心粉", "ST018", "8056326390181", "6 × 500 g", "9–11 分钟", "9–11 minutes", "选用 100% 意大利硬质小麦粗面粉与大萨索山和蒙蒂德拉拉加国家公园附近的纯净泉水制作。经青铜模具拉制形成粗糙多孔的表面，并在 40–45°C 下低温慢干 24–48 小时。", "Made with 100% Italian durum wheat semolina and pure water from springs near the Gran Sasso and Monti della Laga National Park. Bronze drawing creates a rough and porous surface, followed by slow drying for 24–48 hours at 40–45°C."],
    ["penne-triangolari", "Penne Triangolari", "斜管面", "ST021", "8056326390211", "10 × 500 g", "7–9 分钟", "7–9 minutes", "独特的三角管状造型兼具辨识度与挂汁能力。采用 100% 意大利硬质小麦粗面粉和当地纯净泉水，经青铜模具拉制并在 40–45°C 下低温慢干 24–48 小时。", "Its distinctive triangular tubular shape offers a characteristic appearance and a surface well suited to sauces. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C."],
    ["mezze-maniche", "Mezze Maniche", "袖筒面", "ST017", "8056326390174", "6 × 500 g", "9–11 分钟", "9–11 minutes", "经典短管造型带来饱满的咀嚼感。采用 100% 意大利硬质小麦粗面粉与当地纯净泉水，经青铜模具拉制形成粗糙多孔的表面，并在 40–45°C 下低温慢干 24–48 小时。", "A classic short tubular shape with a substantial texture. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn for a rough and porous surface and slowly dried for 24–48 hours at 40–45°C."],
    ["fusilloni", "Fusilloni", "螺旋粉", "ST023", "8056326390235", "6 × 350 g", "4–6 分钟", "4–6 minutes", "宽大的螺旋结构能够将酱汁充分卷入面体。采用 100% 意大利硬质小麦粗面粉与当地纯净泉水制作，经青铜模具拉制和 40–45°C 低温慢干 24–48 小时。", "The large spiral shape is designed to hold sauces effectively. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C."],
    ["spaghetti-ad-archetto", "Spaghetti ad Archetto", "U型长面", "ST016", "8056326390167", "12 × 500 g", "8–10 分钟", "8–10 minutes", "采用 100% 意大利硬质小麦粗面粉和当地纯净泉水制成，保留传统 U 型长面造型。青铜模具拉制赋予面体粗糙多孔的表面，并经 40–45°C 低温慢干 24–48 小时。", "Made with 100% Italian durum wheat semolina and pure local spring water in the traditional U-shaped long-pasta format. Bronze drawing gives the pasta a rough and porous surface, followed by slow drying for 24–48 hours at 40–45°C."],
    ["spaghetti-quadrati-ad-archetto", "Spaghetti Quadrati ad Archetto", "方形粗面", "ST022", "8056326390228", "12 × 500 g", "12–14 分钟", "12–14 minutes", "方形截面带来更鲜明的咀嚼感与酱汁承载力。选用 100% 意大利硬质小麦粗面粉和当地纯净泉水，经青铜模具拉制并在 40–45°C 下低温慢干 24–48 小时。", "The square cross-section gives this pasta a distinctive texture and excellent sauce-holding capacity. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C."],
    ["bucatini-ad-archetto", "Bucatini ad Archetto", "U型细管面", "ST019", "8056326390198", "10 × 500 g", "6–8 分钟", "6–8 minutes", "经典中空细管结构让酱汁同时附着于表面并进入面体内部。采用 100% 意大利硬质小麦粗面粉与当地纯净泉水，经青铜模具拉制并在 40–45°C 下低温慢干 24–48 小时。", "The classic hollow shape allows sauces to coat the surface and enter the pasta. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C."],
  ];
  const pastaDetails = (lang, values) => {
    const labels = lang === "zh"
      ? ["产品类型", "产品编号", "包装规格", "建议烹饪时间", "尺寸", "主要配料", "工艺", "生产商"]
      : ["Product Type", "Product Code", "Packaging", "Cooking Time", "Thickness / Width / Length", "Ingredients", "Manufacturing", "Producer"];
    return values.map((value, index) => ({ label: labels[index], value })).filter(({ value }) => value);
  };
  campofiloneRows.forEach(([slug, italian, chinese, code, cookingZh, cookingEn, sizeZh, sizeEn, ingredientsZh, ingredientsEn, descZh, descEn]) => {
    const image = asset(`media/products/pasta/${slug}.webp`);
    const common = { id: slug, sku: code, category: "pasta", categories: ["pasta"], typeKey: "pasta", manufacturer: "Marcozzi di Campofilone", image, gallery: [image, ...pastaProcessGallery], catalogOnly: true, amount: 0, currency: "", priceLabel: "PRICE" };
    products[`zh-${slug}`] = { ...common, unit: "250 g / 4 人份", title: `${chinese} · 250 g`, eyebrow: "面食", subtitle: italian, desc: descZh, cardDesc: descZh, mainIngredients: `主要配料：${ingredientsZh}`, details: pastaDetails("zh", ["面食", code, "250 g / 4 人份", cookingZh, sizeZh, ingredientsZh, "粗糙多孔、缓慢干燥", "Marcozzi di Campofilone（魔蔻滋）"]) };
    products[`en-${slug}`] = { ...common, unit: "250 g / 4 servings", title: `${italian} · 250 g`, eyebrow: "Pasta", subtitle: "Marcozzi di Campofilone", desc: descEn, cardDesc: descEn, mainIngredients: `Main ingredients: ${ingredientsEn}`, details: pastaDetails("en", ["Pasta", code, "250 g / 4 servings", cookingEn, sizeEn, ingredientsEn, "Rough and porous, dried slowly", "Marcozzi di Campofilone"]) };
  });
  strampelliRows.forEach(([slug, italian, chinese, code, ean, packaging, cookingZh, cookingEn, descZh, descEn]) => {
    const image = asset(`media/products/pasta/${slug}.webp`);
    const common = { id: slug, sku: code, category: "pasta", categories: ["pasta"], typeKey: "pasta", manufacturer: "Pastificio Strampelli", image, gallery: [image, ...pastaProcessGallery], catalogOnly: true, amount: 0, currency: "", priceLabel: "PRICE" };
    const ingredientsZh = "100% 意大利硬质小麦粗面粉；当地泉水";
    const ingredientsEn = "100% Italian durum wheat semolina; local spring water";
    products[`zh-${slug}`] = { ...common, unit: packaging, title: `${chinese} · ${packaging}`, eyebrow: "面食", subtitle: italian, desc: descZh, cardDesc: descZh, mainIngredients: `主要配料：${ingredientsZh}`, details: [...pastaDetails("zh", ["面食", code, packaging, cookingZh, "", ingredientsZh, "青铜模具拉制；40–45°C 低温慢干 24–48 小时", "Pastificio Strampelli"]), { label: "商品编码 / EAN", value: ean }] };
    products[`en-${slug}`] = { ...common, unit: packaging, title: `${italian} · ${packaging}`, eyebrow: "Pasta", subtitle: "Pastificio Strampelli", desc: descEn, cardDesc: descEn, mainIngredients: `Main ingredients: ${ingredientsEn}`, details: [...pastaDetails("en", ["Pasta", code, packaging, cookingEn, "", ingredientsEn, "Bronze-drawn; slowly dried for 24–48 hours at 40–45°C", "Pastificio Strampelli"]), { label: "EAN Code", value: ean }] };
  });

  window.LUXUREAT_PRODUCT_DATA = { images, galleries, products };
})();
