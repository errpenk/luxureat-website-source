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
      zh: { type: "复合调味品", ingredients: "双孢蘑菇（双孢菇）50%、橄榄油、黑喇叭菌5%、冬季黑松露（黑孢块菌）2.9%、天然黑松露食用香料、食用盐；不含麸质。", storage: "置于阴凉干燥处；开封后需冷藏保存。", nutrition: "每100克：能量1562千焦，蛋白质1.9克，脂肪40.2克，碳水化合物2.7克，糖0克，膳食纤维3.7克，钠1480毫克。", summary: "含2.9%冬季黑松露与5%黑喇叭菌，层次深沉且不含麸质，适合精细餐饮调味。" },
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
      image,
      gallery: [image, ...(galleries[category] || [])],
      catalogOnly: true, amount: 0, currency: "", priceLabel: "PRICE",
    };
    products[`zh-${slug}`] = {
      ...common, title: `${chinese} · ${unit}`, eyebrow: family.zh.type,
      subtitle: italian,
      desc: family.zh.summary,
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
    ["maccheroncini-di-campofilone-pgi", "Maccheroncini di Campofilone PGI", "坎波菲洛内细面（原产地认证）", "M0001", "1–2 分钟", "1–2 minutes", "0.6/0.7 mm × 1 mm；长 45–55 cm", "0.6/0.7 mm × 1 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "源自坎波菲洛内的经典鸡蛋面，以意大利硬质小麦粗面粉与新鲜鸡蛋制成。面体极细，经过低温缓慢干燥后呈现粗糙多孔的质地，既能充分吸附酱汁，又保持细腻轻盈的口感。2013 年获得欧盟地理标志保护（PGI）认证，并严格限定于坎波菲洛内当地生产。", "A classic egg pasta from Campofilone, made with Italian durum wheat semolina and fresh eggs. Its exceptionally thin strands are slowly dried at low temperature, creating a rough and porous texture with a delicate taste and excellent cooking yield. In 2013, Maccheroncini di Campofilone received European Protected Geographical Indication (PGI) recognition and can only be produced in the municipality of Campofilone."],
    ["linguine-di-campofilone", "Linguine di Campofilone", "坎波菲洛内细扁面", "M0002", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 2 mm；长 45–55 cm", "0.7/0.8 mm × 2 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "以意大利硬质小麦粗面粉和新鲜鸡蛋制成，延续坎波菲洛内传统鸡蛋面的轻薄特色。低温慢干赋予面体粗糙多孔的表面，更易与酱汁融合，同时保留细腻口感。", "Made with Italian durum wheat semolina and fresh eggs, this pasta reflects the thin and delicate character of traditional Campofilone egg pasta. Slow drying at low temperature gives it a rough and porous surface, ideal for blending with sauces while preserving a delicate texture."],
    ["fettuccine-di-campofilone", "Fettuccine di Campofilone", "坎波菲洛内宽面", "M0003", "2–3 分钟", "2–3 minutes", "0.7/0.8 mm × 4 mm；长 45–55 cm", "0.7/0.8 mm × 4 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "精选意大利硬质小麦粗面粉与新鲜鸡蛋，以传统工艺制成。宽而轻薄的面体经过低温慢干，形成粗糙多孔的表面，能够充分承载酱汁。", "Made with Italian durum wheat semolina and fresh eggs according to traditional methods. The wide, thin strands are slowly dried at low temperature, creating a rough and porous surface that blends well with sauces."],
    ["tagliatelle-di-campofilone", "Tagliatelle di Campofilone", "坎波菲洛内宽扁面", "M0004", "3–4 分钟", "3–4 minutes", "0.7/0.8 mm × 6 mm；长 45–55 cm", "0.7/0.8 mm × 6 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "采用意大利硬质小麦粗面粉与新鲜鸡蛋制作，宽扁面体经低温缓慢干燥，口感细腻而富有韧性，粗糙多孔的表面能够充分包裹酱汁。", "Made with Italian durum wheat semolina and fresh eggs. The wide, flat strands are slowly dried at low temperature, giving the pasta a delicate texture and a rough, porous surface that holds sauces well."],
    ["chitarrine-di-campofilone", "Chitarrine di Campofilone", "坎波菲洛内干长面", "M0005", "4–6 分钟", "4–6 minutes", "1.2/1.5 mm × 1 mm；长 45–55 cm", "1.2/1.5 mm × 1 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "以意大利硬质小麦粗面粉和新鲜鸡蛋制成，细长面体兼具轻盈与质感。传统工艺和低温慢干形成粗糙多孔的表面，让酱汁均匀附着。", "Made with Italian durum wheat semolina and fresh eggs. The fine, long strands combine a delicate texture with the rough, porous surface created by traditional processing and slow low-temperature drying."],
    ["pappardelle-di-campofilone", "Pappardelle di Campofilone", "坎波菲洛内平扁面", "M0009", "6–8 分钟", "6–8 minutes", "1/1.2 mm × 12 mm；长 45–55 cm", "1/1.2 mm × 12 mm; length 45–55 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "宽阔的面体带来更饱满的咀嚼感。精选意大利硬质小麦粗面粉和新鲜鸡蛋，经传统工艺制作并低温缓慢干燥，面体粗糙多孔，适合承载浓郁酱汁。", "Its broad strands provide a fuller texture. Made with Italian durum wheat semolina and fresh eggs using traditional methods, the pasta is slowly dried at low temperature to achieve a rough and porous surface."],
    ["sfoglia-di-campofilone", "Sfoglia di Campofilone", "坎波菲洛内鸡蛋面皮", "M0006", "3–4 分钟", "3–4 minutes", "0.7/0.8 mm × 13/15 cm；长 23–25 cm", "0.7/0.8 mm × 13/15 cm; length 23–25 cm", "硬质小麦粗面粉、鸡蛋 35.3%", "Durum wheat semolina, eggs 35.3%", "以意大利硬质小麦粗面粉与新鲜鸡蛋制成的传统鸡蛋面皮，质地薄而细腻，经过低温缓慢干燥，兼具良好的烹饪表现与可塑性。", "Traditional egg pasta sheets made with Italian durum wheat semolina and fresh eggs. Thin and delicate, they are slowly dried at low temperature for excellent cooking performance."],
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

  const elixirMedia = {
    "dark-chocolate": [[4458588, 1.896296], [4458665, 1.777778], [5515587, 1.777778], [7015435, 1.777778], [7141506, 1.896296]],
    strawberry: [[13674866, 1.777778], [15763722, 1.777778], [2583475, 1.777778], [6663330, 2.074975], [6664286, 2.074975]],
    pistachio: [[15858641, 1.777778], [4389504, 1.897233], [6004931, 1.777778], [6529554, 1.777778], [7015397, 1.777778]],
    "madagascar-vanilla": [[329918097, 1.777778], [17095007, 1.777778], [6529503, 1.777778], [6956368, 1.777778], [7015398, 1.777778]],
    "spicy-mango": [[20054254, 1.777778], [202732639, 1.777778], [229708700, 1.777778], [234281481, 1.777778], [236261895, 1.777778]],
    tamarind: [[328686365, 1.777778], [205637740, 1.502693, "image"], [214490562, 1.780456, "image"], [3698196, 1.777778], [264152318, 0.562667, "image"], [39468205, 0.666667, "image"]],
  };
  const elixirRows = [
    ["dark-chocolate", "Dark Chocolate", "黑巧克力", "023", "0805698516723", "糖、水、天然香料、天然松露香料、可可提取物。", "Sugar, water, natural flavoring, natural truffle flavoring, cocoa extract.", 1423, 340, 84.1],
    ["strawberry", "Strawberry", "草莓", "009", "0805698516808", "糖水、天然香料、浓缩草莓汁、柠檬酸、天然松露香料、色素 E163。", "Sweetened water, natural flavoring, concentrated strawberry juice, citric acid, natural truffle flavoring, color E163.", 1448, 346, 85.7],
    ["spicy-mango", "Spicy Mango", "香辣芒果", "015", "0805698516860", "糖、水、天然香料、天然松露香料、浓缩芒果汁、色素 E161b 和 E150a、阿拉伯胶。", "Sugar, water, natural flavoring, natural truffle flavoring, concentrated mango juice, colors E161b and E150a, acacia gum.", 1414, 338, 83],
    ["pistachio", "Pistachio", "开心果", "003", "0805698516747", "糖水、天然香料、天然松露香料、天然开心果香料。", "Sweetened water, natural flavoring, natural truffle flavoring, natural pistachio flavoring.", 1423, 340, 84.1],
    ["tamarind", "Tamarind", "罗望子", "026", "0805698517065", "糖、水、天然罗望子香料、浓缩罗望子汁、天然松露香料。", "Sugar, water, natural tamarind flavoring, concentrated tamarind juice, natural truffle flavoring.", 1347, 322, 80],
    ["madagascar-vanilla", "Madagascar Vanilla", "马达加斯加香草", "005", "0805698516761", "糖、水、天然香草香料、浓缩香草香料、浓缩柠檬汁、天然松露香料、添加剂 E202（用途待供应商确认）。", "Sugar, water, natural vanilla flavoring, concentrated vanilla flavoring, concentrated lemon juice, natural truffle flavoring, E202 (function awaiting supplier confirmation).", 1423, 340, 84.1],
  ];
  elixirRows.forEach(([flavour, english, chinese, code, ean, ingredientsZh, ingredientsEn, kj, kcal, carbs]) => {
    const slug = `truffelixir-${flavour}-100ml`;
    const image = asset(`media/products/truffelixir/${flavour}.svg`);
    const allMedia = elixirMedia[flavour].map(([id, ratio, type = "video"]) => ({ type, ratio,
      src: asset(`media/products/truffelixir/${type === "video" ? "videos" : "stills"}/${flavour}-${id}.${type === "video" ? "mp4" : "webp"}`),
      poster: type === "video" ? asset(`media/products/truffelixir/stills/${flavour}-${id}.webp`) : undefined,
    }));
    const storyMedia = allMedia.filter(({ type }) => type === "video").slice(-2);
    const showcaseMedia = allMedia.filter((media) => !storyMedia.includes(media));
    const common = { id: slug, sku: `TE-ELX-100-${code}`, unit: "100 ml", category: "truffelixir", categories: ["truffelixir", "truffle"], typeKey: "syrup", manufacturer: "Truffleat S.r.l.", image, gallery: [image], showcaseMedia, storyMedia, catalogOnly: true, amount: 0, currency: "", priceLabel: "PRICE", series: "TrufflElixir" };
    for (const lang of ["zh", "en"]) {
      const zh = lang === "zh";
      const summary = zh ? `TrufflElixir ${chinese}风味糖浆，含天然松露香料，意大利制造，净含量 100 ml。` : `TrufflElixir ${english.toLowerCase()} syrup with natural truffle flavoring, made in Italy. Net content: 100 ml.`;
      const allergen = zh ? "过敏原信息尚待供应商确认；对配料过敏者请先咨询。" : "Allergen information awaits supplier confirmation; consult before use if allergic to any ingredient.";
      const details = [
        ["系列 / Series", "TrufflElixir"],
        [zh ? "产品类型" : "Product Type", zh ? "风味糖浆" : "Flavoured syrup"],
        [zh ? "产品编号" : "SKU", common.sku],
        ["EAN-13", ean],
        [zh ? "净含量" : "Net Content", "100 ml"],
        [zh ? "配料（供应商资料）" : "Ingredients (supplier sheet)", zh ? ingredientsZh : ingredientsEn],
        [zh ? "原产国" : "Country of Origin", zh ? "意大利" : "Italy"],
        [zh ? "生产商" : "Manufacturer", "Truffleat S.r.l."],
        [zh ? "生产地址" : "Manufacturing Facility", "Via Tuscania 9, 01028 Orte (VT), Italy"],
        [zh ? "贮存条件" : "Storage", zh ? "阴凉干燥处保存，避免光照。" : "Store in a cool, dry place, protected from light."],
        [zh ? "保质期" : "Shelf Life", zh ? "24 个月；生产日期及批次以实际包装为准。" : "24 months; see the actual pack for production date and batch."],
        [zh ? "致敏提醒" : "Allergen Advice", allergen + (flavour === "pistachio" ? (zh ? " 开心果香料是否含坚果衍生成分也需确认。" : " Confirm whether the pistachio flavoring contains tree nut derivatives.") : "")],
        [zh ? "营养资料参考值（待确认）" : "Provisional Nutrition (awaiting confirmation)", zh ? `每 100 ml：能量 ${kj} kJ / ${kcal} kcal，蛋白质 0 g，脂肪 0 g，碳水化合物 ${carbs} g，钠约 12 mg。以最终产品标签为准。` : `Per 100 ml: energy ${kj} kJ / ${kcal} kcal, protein 0 g, fat 0 g, carbohydrate ${carbs} g, sodium approximately 12 mg. Subject to confirmation against the final product label.`],
      ].map(([label, value]) => ({ label, value }));
      products[`${lang}-${slug}`] = { ...common, title: zh ? `TrufflElixir ${chinese}风味糖浆 · 100 ml` : `TrufflElixir ${english} · 100 ml`, eyebrow: zh ? "风味糖浆" : "Flavoured syrup", subtitle: zh ? english : "TrufflElixir", desc: summary, cardDesc: summary, mainIngredients: `${zh ? "配料：" : "Ingredients: "}${zh ? ingredientsZh : ingredientsEn}`, details };
    }
  });

  const productVideoIds = {
    "white-truffle-oil-60ml": [33460121, 4109923],
    "white-truffle-oil-250ml": [14527415, 5897983],
    "white-truffle-evoo-60ml": [4912636, 10048555],
    "white-truffle-evoo-250ml": [5657574, 28409032],
    "summer-truffle-slices-50g": ["refresh-19905875", "refresh-19905887"],
    "summer-truffle-slices-80g": ["refresh-19905875", "refresh-19905887"],
    "summer-truffle-slices-180g": ["refresh-19905875", "refresh-19905887"],
    "summer-truffle-slices-water-350g": ["refresh-19905875", "refresh-19905887"],
    "summer-truffle-slices-oil-350g": ["refresh-19905875", "refresh-19905887"],
    "truffle-honey-50g": [9491522, 31185864],
    "truffle-honey-170g": [6792647, 31656449],
    "white-truffle-sauce-80g": ["refresh-4253150", "refresh-4253330"],
    "white-truffle-sauce-500g": ["refresh-4253150", "refresh-4253330"],
    "black-truffle-sauce-80g": ["refresh-13944500", "refresh-4253723"],
    "black-truffle-sauce-180g": ["refresh-13944500", "refresh-4253723"],
    "black-truffle-sauce-500g": ["refresh-13944500", "refresh-4253723"],
    "whole-summer-truffles-35g": ["refresh-19551103", "refresh-855537-3x"],
    "whole-summer-truffles-55g": ["refresh-19551103", "refresh-855537-3x"],
    "whole-summer-truffles-110g": ["refresh-19551103", "refresh-855537-3x"],
    "whole-summer-truffles-275g": ["refresh-19551103", "refresh-855537-3x"],
    "winter-black-truffle-sauce-80g": ["refresh-13944500", "refresh-4253723"],
    "winter-black-truffle-sauce-180g": ["refresh-13944500", "refresh-4253723"],
    "winter-black-truffle-sauce-500g": ["refresh-13944500", "refresh-4253723"],
    "winter-black-truffle-juice-350ml": ["refresh-13944500", "refresh-4253723"],
    "maccheroncini-di-campofilone-pgi": [2382083, 26811243],
    "linguine-di-campofilone": [10054735, 8107801],
    "fettuccine-di-campofilone": [6288312, 8963624],
    "tagliatelle-di-campofilone": [6222584, 5906022],
    "chitarrine-di-campofilone": [10048876, 10054734],
    "pappardelle-di-campofilone": [8107391, 10054743],
    "sfoglia-di-campofilone": [37294906, 10049434],
    "saffron-fettuccine": ["refresh-6222573", "refresh-6645705"],
    "truffle-fettuccine": [32778470, 38045761],
    "porcini-mushroom-fettuccine": [14584573, 39498952],
    "squid-ink-fettuccine": ["refresh-3251915", "refresh-4252804"],
    "chili-pepper-fettuccine": [35373681, 40347009],
    "sage-fettuccine": [20397141, 37919129],
    "spinach-fettuccine": ["refresh-6824891", "refresh-6975441"],
    "nettle-fettuccine": [32105263, 35011627],
    "lemon-fettuccine": [31481186, 32847452],
    rigatoni: [8107679, 34929974],
    "penne-triangolari": [7815584, 8107490],
    "mezze-maniche": [8107663, 40118106],
    fusilloni: [8107676, 8107680],
    "spaghetti-ad-archetto": [37116696, 4058085],
    "spaghetti-quadrati-ad-archetto": [1793156, 4084465],
    "bucatini-ad-archetto": [8107806, 4389249],
  };
  const newScenes = {
    oil: ["truffle-oil-pizza-portrait", "truffle-oil-salmon-portrait", "truffle-oil-bottles-portrait", "truffle-oil-pour-portrait"],
    pasta: ["scene-15432510", "scene-6222170", "scene-6221669", "scene-6221664"],
    greenPasta: ["scene-15792800", "scene-15764502", "scene-6221664", "scene-13636685"],
    truffle: ["scene-4253138", "scene-13636685", "scene-6221669", "scene-6221664"],
    mushroom: ["scene-4253138", "scene-13636685", "scene-5950767", "scene-14477476"],
    sauce: ["scene-4253138", "scene-13636685", "scene-15064649", "scene-14477476"],
    whole: ["refresh-19905875", "refresh-19905887", "scene-19905874"],
    slices: ["refresh-19551103", "refresh-855537-3x", "scene-19905874"],
  };
  const sceneRatios = {
    "truffle-oil-pizza-portrait": 0.527473,
    "truffle-oil-salmon-portrait": 0.562061,
    "truffle-oil-bottles-portrait": 0.527473,
    "truffle-oil-pour-portrait": 0.527473,
    "scene-15432510": 0.5625,
    "scene-6222170": 0.5625,
    "scene-6221669": 0.5625,
    "scene-6221664": 0.5625,
    "scene-15792800": 0.5625,
    "scene-15764502": 0.5625,
    "scene-13636685": 0.5625,
    "scene-4253138": 0.527859,
    "scene-5950767": 0.5625,
    "scene-14477476": 0.5625,
    "scene-15064649": 0.5625,
    "refresh-19905875": 1.777778,
    "refresh-19905887": 1.777778,
    "scene-19905874": 1.777778,
    "refresh-19551103": 1.777778,
    "refresh-855537-3x": 1.777778,
    "9491522": 1.777778,
    "31185864": 1.777778,
    "6792647": 1.777778,
    "31656449": 1.777778,
    "4109923": 1.777778,
    "5897983": 1.777778,
    "10054735": 1.777778,
    "8107801": 1.777778,
    "6288312": 1.777778,
    "8963624": 1.777778,
    "refresh-13944500": 1.777778,
    "refresh-4253150": 1.777778,
    "refresh-4253330": 1.777778
};
  for (const product of Object.values(products)) {
    if (product.series === "TrufflElixir") continue;
    product.videoIds = productVideoIds[product.id] || [];
    const id = product.id;
    const group = /(?:oil|evoo)-/.test(id) && !id.includes("slices") ? "oil"
      : id.startsWith("whole-") ? "whole"
      : id.includes("slices") ? "slices"
      : /(?:spinach|nettle|sage)-/.test(id) ? "greenPasta"
      : id.includes("porcini") || id.startsWith("white-truffle-sauce") ? "mushroom"
      : /(?:sauce|juice)/.test(id) ? "sauce"
      : id === "truffle-fettuccine" ? "truffle" : "pasta";
    product.showcaseVideoIds = id.startsWith("truffle-honey")
      ? [9491522, 31185864, 6792647, 31656449].filter((video) => !product.videoIds.includes(video)).concat("scene-19905874")
      : [...newScenes[group]];
    product.showcaseLayout = product.showcaseVideoIds.length === 4 ? "portrait" : "landscape";
    const supplements = group === "oil" ? [4109923, 5897983]
      : group === "mushroom" ? ["refresh-13944500"]
      : group === "sauce" ? ["refresh-4253150", "refresh-4253330"]
      : [10054735, 8107801, 6288312, 8963624];
    for (const video of supplements) {
      if (product.showcaseVideoIds.reduce((sum, id) => sum + sceneRatios[id], 0) >= 3.2) break;
      if (!product.videoIds.includes(video) && !product.showcaseVideoIds.includes(video)) product.showcaseVideoIds.push(video);
    }
    product.showcaseVideoRatios = product.showcaseVideoIds.map((id) => sceneRatios[id]);
  }

  const detailDescriptionsZh = {
    "zh-white-truffle-oil-60ml": "白松露风味油以橄榄油和食用香料调制，油脂本身的柔和口感为白松露香气提供了清晰的承托。它适合在料理完成阶段使用：搭配意面、烩饭、炒蛋、土豆和冷盘时，可以少量淋用或拌入酱汁，让松露香气与食材自然融合。\n\n由于产品的重点在于提香，更适合最后一步使用，避免长时间高温烹煮带走香气。产品规格为 60 ml。",
    "zh-white-truffle-oil-250ml": "白松露风味油以橄榄油和食用香料调制，油脂本身的柔和口感为白松露香气提供了清晰的承托。它适合在料理完成阶段使用：搭配意面、烩饭、炒蛋、土豆和冷盘时，可以少量淋用或拌入酱汁，让松露香气与食材自然融合。\n\n由于产品的重点在于提香，更适合最后一步使用，避免长时间高温烹煮带走香气。产品规格为 250 ml。",
    "zh-white-truffle-evoo-60ml": "这款调味油以特级初榨橄榄油为基底，加入 0.2% 春季白松露干和食用香料。特级初榨橄榄油带来清晰的果香和顺滑口感，春季白松露则增添具有辨识度的松露气息。\n\n适合在意面、烩饭、炒蛋、烤土豆或蔬菜料理出锅后少量使用，也可以与黄油、奶油或芝士混合，让橄榄油的果香和松露香气在完成阶段同时呈现。产品规格为 60 ml。",
    "zh-white-truffle-evoo-250ml": "这款调味油以特级初榨橄榄油为基底，加入 0.2% 春季白松露干和食用香料。特级初榨橄榄油带来清晰的果香和顺滑口感，春季白松露则增添具有辨识度的松露气息。\n\n适合在意面、烩饭、炒蛋、烤土豆或蔬菜料理出锅后少量使用，也可以与黄油、奶油或芝士混合，让橄榄油的果香和松露香气在完成阶段同时呈现。产品规格为 250 ml。",
    "zh-summer-truffle-slices-50g": "夏季黑松露片含 52% 夏季黑松露，以橄榄油、食用盐和食用香料调制。橄榄油为松露片带来油润的口感，盐和调味香料让整体风味更适合直接使用；片状松露则保留了清晰的形态和菌菇类香气。\n\n开罐后可以直接铺在意面、烩饭、炒蛋、煎肉和冷盘上，也可以切碎后加入奶油酱或蘑菇酱，让松露风味更均匀地融入料理。产品规格为 50 g。",
    "zh-summer-truffle-slices-80g": "夏季黑松露片含 52% 夏季黑松露，以橄榄油、食用盐和食用香料调制。橄榄油为松露片带来油润的口感，盐和调味香料让整体风味更适合直接使用；片状松露则保留了清晰的形态和菌菇类香气。\n\n开罐后可以直接铺在意面、烩饭、炒蛋、煎肉和冷盘上，也可以切碎后加入奶油酱或蘑菇酱，让松露风味更均匀地融入料理。产品规格为 80 g。",
    "zh-summer-truffle-slices-180g": "夏季黑松露片含 52% 夏季黑松露，以橄榄油、食用盐和食用香料调制。橄榄油为松露片带来油润的口感，盐和调味香料让整体风味更适合直接使用；片状松露则保留了清晰的形态和菌菇类香气。\n\n开罐后可以直接铺在意面、烩饭、炒蛋、煎肉和冷盘上，也可以切碎后加入奶油酱或蘑菇酱，让松露风味更均匀地融入料理。产品规格为 180 g。",
    "zh-summer-truffle-slices-water-350g": "水浸夏季黑松露片以水、夏季黑松露和食用盐保存，没有额外油脂，整体配料和调味更为简洁。水浸形式方便厨师根据菜式自行加入橄榄油、黄油、奶油或其他酱汁，突出松露本身的菌菇类风味。\n\n可以直接搭配意面、烩饭、炒蛋和煎肉，也可以切碎后加入高汤、奶油酱或蘑菇酱中进行二次加工。产品规格为 350 g。",
    "zh-summer-truffle-slices-oil-350g": "这款夏季黑松露片含 40% 夏季黑松露，以葵花籽油浸渍，并加入食用盐和食用香料。葵花籽油带来相对轻柔的油脂口感，夏季黑松露提供清楚的菌菇类风味，片状形态则方便直接使用和摆盘。\n\n可以整片用于意面、烩饭、披萨、烤土豆和肉类，也可以切碎后加入馅料、酱汁或热菜中。产品规格为 350 g。",
    "zh-truffle-honey-50g": "松露蜂蜜以 99% 洋槐蜜为基础，加入春季白松露干和食用香料。洋槐蜜带来清甜、柔和的蜂蜜风味，白松露则在甜味之外增加一层独特的菌菇类香气。\n\n它不需要复杂烹饪，适合淋在奶酪、烤肉、烤面包和冰淇淋上，也可以少量加入甜点或作为冷盘搭配，让甜味与咸鲜风味形成对比。产品规格为 50 g。",
    "zh-truffle-honey-170g": "松露蜂蜜以 99% 洋槐蜜为基础，加入春季白松露干和食用香料。洋槐蜜带来清甜、柔和的蜂蜜风味，白松露则在甜味之外增加一层独特的菌菇类香气。\n\n它不需要复杂烹饪，适合淋在奶酪、烤肉、烤面包和冰淇淋上，也可以少量加入甜点或作为冷盘搭配，让甜味与咸鲜风味形成对比。产品规格为 170 g。",
    "zh-white-truffle-sauce-80g": "白松露酱以 54% 双孢蘑菇、橄榄油和 1% 意大利白松露制成，并加入食用盐和食用香料。双孢蘑菇提供柔和的菌菇底味，橄榄油带来顺滑的口感，白松露则让香气更集中，整体质地细腻。\n\n可以拌入意面或烩饭，也可以涂抹在烤面包上，或用来搭配鸡肉、牛肉和其他主菜；加入少量奶油、黄油或面水后，风味会更柔和顺滑。产品规格为 80 g。",
    "zh-white-truffle-sauce-500g": "白松露酱以 54% 双孢蘑菇、橄榄油和 1% 意大利白松露制成，并加入食用盐和食用香料。双孢蘑菇提供柔和的菌菇底味，橄榄油带来顺滑的口感，白松露则让香气更集中，整体质地细腻。\n\n可以拌入意面或烩饭，也可以涂抹在烤面包上，或用来搭配鸡肉、牛肉和其他主菜；加入少量奶油、黄油或面水后，风味会更柔和顺滑。产品规格为 500 g。",
    "zh-black-truffle-sauce-80g": "黑松露酱以 50% 双孢蘑菇为基础，加入橄榄油、夏季黑松露、黑橄榄、食用盐和食用香料。双孢蘑菇带来圆润的菌菇底味，黑橄榄增加咸鲜和成熟感，夏季黑松露则补充具有辨识度的松露香气。\n\n可以拌入意面、烩饭和土豆泥，也可以作为牛肉、鸡肉或烘焙馅料的调味基础。产品规格为 80 g。",
    "zh-black-truffle-sauce-180g": "黑松露酱以 50% 双孢蘑菇为基础，加入橄榄油、夏季黑松露、黑橄榄、食用盐和食用香料。双孢蘑菇带来圆润的菌菇底味，黑橄榄增加咸鲜和成熟感，夏季黑松露则补充具有辨识度的松露香气。\n\n可以拌入意面、烩饭和土豆泥，也可以作为牛肉、鸡肉或烘焙馅料的调味基础。产品规格为 180 g。",
    "zh-black-truffle-sauce-500g": "黑松露酱以 50% 双孢蘑菇为基础，加入橄榄油、夏季黑松露、黑橄榄、食用盐和食用香料。双孢蘑菇带来圆润的菌菇底味，黑橄榄增加咸鲜和成熟感，夏季黑松露则补充具有辨识度的松露香气。\n\n可以拌入意面、烩饭和土豆泥，也可以作为牛肉、鸡肉或烘焙馅料的调味基础。产品规格为 500 g。",
    "zh-whole-summer-truffles-35g": "整颗夏季黑松露以水和食用盐保存，保留完整的食材形态与自然的菌菇类风味，方便根据菜式自行处理。完整松露可以切成薄片，用于意面、烩饭、炒蛋和烤面包；也可以刨削或切碎后加入黄油、奶油、蘑菇酱和高汤中，让风味更均匀地释放。\n\n完整形态更适合需要现场切配和摆盘呈现的厨房。产品规格为 35 g。",
    "zh-whole-summer-truffles-55g": "整颗夏季黑松露以水和食用盐保存，保留完整的食材形态与自然的菌菇类风味，方便根据菜式自行处理。完整松露可以切成薄片，用于意面、烩饭、炒蛋和烤面包；也可以刨削或切碎后加入黄油、奶油、蘑菇酱和高汤中，让风味更均匀地释放。\n\n完整形态更适合需要现场切配和摆盘呈现的厨房。产品规格为 55 g。",
    "zh-whole-summer-truffles-110g": "整颗夏季黑松露以水和食用盐保存，保留完整的食材形态与自然的菌菇类风味，方便根据菜式自行处理。完整松露可以切成薄片，用于意面、烩饭、炒蛋和烤面包；也可以刨削或切碎后加入黄油、奶油、蘑菇酱和高汤中，让风味更均匀地释放。\n\n完整形态更适合需要现场切配和摆盘呈现的厨房。产品规格为 110 g。",
    "zh-whole-summer-truffles-275g": "整颗夏季黑松露以水和食用盐保存，保留完整的食材形态与自然的菌菇类风味，方便根据菜式自行处理。完整松露可以切成薄片，用于意面、烩饭、炒蛋和烤面包；也可以刨削或切碎后加入黄油、奶油、蘑菇酱和高汤中，让风味更均匀地释放。\n\n完整形态更适合需要现场切配和摆盘呈现的厨房。产品规格为 275 g。",
    "zh-winter-black-truffle-sauce-80g": "冬季黑松露酱以 50% 双孢蘑菇和橄榄油为基础，加入 5% 黑喇叭菌、2.9% 冬季黑松露、天然黑松露食用香料和食用盐，并标示为不含麸质。双孢蘑菇和黑喇叭菌共同形成更深的菌菇底味，冬季黑松露与天然松露香料则让香气更加集中。\n\n适合拌入意面、烩饭、土豆和肉类酱汁，也可以与奶油、黄油或高汤调和。产品规格为 80 g。",
    "zh-winter-black-truffle-sauce-180g": "冬季黑松露酱以 50% 双孢蘑菇和橄榄油为基础，加入 5% 黑喇叭菌、2.9% 冬季黑松露、天然黑松露食用香料和食用盐，并标示为不含麸质。双孢蘑菇和黑喇叭菌共同形成更深的菌菇底味，冬季黑松露与天然松露香料则让香气更加集中。\n\n适合拌入意面、烩饭、土豆和肉类酱汁，也可以与奶油、黄油或高汤调和。产品规格为 180 g。",
    "zh-winter-black-truffle-sauce-500g": "冬季黑松露酱以 50% 双孢蘑菇和橄榄油为基础，加入 5% 黑喇叭菌、2.9% 冬季黑松露、天然黑松露食用香料和食用盐，并标示为不含麸质。双孢蘑菇和黑喇叭菌共同形成更深的菌菇底味，冬季黑松露与天然松露香料则让香气更加集中。\n\n适合拌入意面、烩饭、土豆和肉类酱汁，也可以与奶油、黄油或高汤调和。产品规格为 500 g。",
    "zh-winter-black-truffle-juice-350ml": "冬季黑松露汁以 99.5% 冬季黑松露汁为主体，加入食用盐和天然黑松露食用香料，并标示为不含麸质。高比例的松露汁带来更直接的菌菇类和松露风味，液体形态则便于计量、混合和调整浓度。\n\n适合加入高汤、肉汁、奶油酱和烩饭中，也可以在出锅前少量调入，让松露风味均匀地融入整道料理。产品规格为 350 ml。",
    "zh-maccheroncini-di-campofilone-pgi": "源自坎波菲洛内的经典鸡蛋面，以意大利硬质小麦粗面粉与新鲜鸡蛋制成。面体极细，经过低温缓慢干燥后呈现粗糙多孔的质地，既能充分吸附酱汁，又保持细腻轻盈的口感。\n\n2013 年获得欧盟地理标志保护（PGI）认证，并严格限定于坎波菲洛内当地生产。面体极细，适合搭配橄榄油、黄油、海鲜或清爽的番茄酱，煮制时间较短，出锅后应及时与酱汁拌匀。",
    "zh-linguine-di-campofilone": "以意大利硬质小麦粗面粉和新鲜鸡蛋制成，延续坎波菲洛内传统鸡蛋面的轻薄特色。低温慢干赋予面体粗糙多孔的表面，更易与酱汁融合，同时保留细腻口感。\n\n细扁的面形适合搭配橄榄油、海鲜、青酱和清淡奶油酱，建议在面体仍有咬感时捞出，用面水帮助酱汁附着。",
    "zh-fettuccine-di-campofilone": "精选意大利硬质小麦粗面粉与新鲜鸡蛋，以传统工艺制成。宽而轻薄的面体经过低温慢干，形成粗糙多孔的表面，能够充分承载酱汁。\n\n宽而轻薄的面体适合承载奶油、菌菇和芝士类酱汁，也可以搭配简单的黄油与黑胡椒，突出鸡蛋面的香气。",
    "zh-tagliatelle-di-campofilone": "采用意大利硬质小麦粗面粉与新鲜鸡蛋制作，宽扁面体经低温缓慢干燥，口感细腻而富有韧性，粗糙多孔的表面能够充分包裹酱汁。\n\n宽扁面适合搭配肉酱、菌菇酱和番茄酱等风味较完整的酱汁，翻拌时可以保留少量面水，让酱汁更均匀地包裹面体。",
    "zh-chitarrine-di-campofilone": "以意大利硬质小麦粗面粉和新鲜鸡蛋制成，细长面体兼具轻盈与质感。传统工艺和低温慢干形成粗糙多孔的表面，让酱汁均匀附着。\n\n细长面适合搭配番茄、海鲜和橄榄油类酱汁，煮好后快速拌匀即可，既能保持轻盈口感，也能让酱汁附着在表面。",
    "zh-pappardelle-di-campofilone": "宽阔的面体带来更饱满的咀嚼感。精选意大利硬质小麦粗面粉和新鲜鸡蛋，经传统工艺制作并低温缓慢干燥，面体粗糙多孔，适合承载浓郁酱汁。\n\n宽阔的面体适合搭配炖肉、野味、菌菇和奶油酱等浓郁酱汁，更适合需要较强挂汁能力和饱满口感的主菜。",
    "zh-sfoglia-di-campofilone": "以意大利硬质小麦粗面粉与新鲜鸡蛋制成的传统鸡蛋面皮，质地薄而细腻，经过低温缓慢干燥，兼具良好的烹饪表现与可塑性。\n\n薄而有韧性的面皮适合制作千层面、烤面卷和馅料面食，也可以根据需要切成不同形状，完成家庭或餐饮厨房的二次制作。",
    "zh-saffron-fettuccine": "在传统坎波菲洛内鸡蛋面中加入 0.2% 藏红花，带来优雅香气与鲜明色泽。以硬质小麦粗面粉和鸡蛋为基础，经低温缓慢干燥形成粗糙多孔的面体。\n\n藏红花的色泽和香气适合搭配海鲜、奶油、黄油和清淡蔬菜酱汁，建议避免过重的调味，让面体本身的风味保持清楚。",
    "zh-truffle-fettuccine": "以硬质小麦粗面粉为基础，加入鸡蛋 23%、松露 3.6% 及香料，突出松露特有的馥郁香气。粗糙多孔的面体经过低温慢干，更易与酱汁融合。\n\n松露宽面适合与黄油、奶油、芝士和菌菇搭配，也可以用少量松露油在出锅后补充香气，避免长时间高温掩盖风味。",
    "zh-porcini-mushroom-fettuccine": "在鸡蛋面中加入 5.6% 牛肝菌，赋予面体浓郁而自然的菌菇香气。采用硬质小麦粗面粉和鸡蛋制作，并经低温慢干保持粗糙多孔的质地。\n\n牛肝菌宽面适合搭配黄油、奶油、芝士和其他菌菇，既可以作为简单主食，也适合与烤鸡、煎肉组合成完整菜式。",
    "zh-squid-ink-fettuccine": "加入 2% 鱿鱼墨的鸡蛋宽面，拥有醒目的深色外观与鲜明海洋风味。以硬质小麦粗面粉和鸡蛋制成，经低温慢干形成适合挂汁的粗糙表面。\n\n鱿鱼墨汁宽面的海洋风味适合搭配虾、贝类、鱿鱼和番茄等食材，颜色鲜明，适合用于需要视觉对比的意式菜肴。",
    "zh-chili-pepper-fettuccine": "在传统鸡蛋宽面中加入 3.6% 辣椒，带来鲜明而有层次的辛香。面体经低温缓慢干燥，保持粗糙多孔的质感。\n\n辣椒宽面适合搭配橄榄油、蒜、番茄和海鲜，酱汁不必过于复杂，让辣椒的辛香和面体的蛋香保持平衡。",
    "zh-sage-fettuccine": "加入 2.3% 鼠尾草的鸡蛋宽面，自带清新而富有辨识度的草本香气。采用硬质小麦粗面粉与鸡蛋制成，并经低温慢干。\n\n鼠尾草宽面适合搭配黄油、南瓜、奶油和烤鸡肉，简单煎香黄油后拌面，就能形成清晰的草本风味。",
    "zh-spinach-fettuccine": "在鸡蛋宽面中加入 1.9% 菠菜，呈现自然色泽与清新的蔬菜风味。面体粗糙多孔，能够很好地承载酱汁。\n\n菠菜宽面的蔬菜风味适合搭配奶油、芝士、蘑菇和清淡肉类酱汁，既可以作为日常主食，也适合与其他颜色的食材组合摆盘。",
    "zh-nettle-fettuccine": "加入 3.2% 荨麻的鸡蛋宽面，具有独特的草本风味与自然色泽。以硬质小麦粗面粉和鸡蛋为基础，经低温缓慢干燥。\n\n荨麻宽面带有辨识度较高的草本气息，适合搭配黄油、芝士、奶油和菌菇类酱汁，建议用较克制的调味突出面体本身。",
    "zh-lemon-fettuccine": "加入 5.3% 柠檬的鸡蛋宽面，带来清新明亮的柑橘香气。粗糙多孔的面体能够与酱汁充分融合，同时保留轻盈风味。\n\n柠檬宽面的柑橘香气适合搭配海鲜、橄榄油、奶油和新鲜香草，也可以与烤鱼或鸡肉搭配，形成清新的主菜组合。",
    "zh-rigatoni": "选用 100% 意大利硬质小麦粗面粉与大萨索山和蒙蒂德拉拉加国家公园附近的纯净泉水制作。经青铜模具拉制形成粗糙多孔的表面，并在 40–45°C 下低温慢干 24–48 小时。\n\n粗通心粉的管状结构和纹理适合承载肉酱、番茄酱、奶油酱和烤箱料理中的浓郁酱汁，适合需要饱满咀嚼感的主菜。",
    "zh-penne-triangolari": "独特的三角管状造型兼具辨识度与挂汁能力。采用 100% 意大利硬质小麦粗面粉和当地纯净泉水，经青铜模具拉制并在 40–45°C 下低温慢干 24–48 小时。\n\n三角管状面有清晰的立体结构，适合搭配番茄、肉酱、奶油和烤蔬菜，也适合用于需要保持形状的焗烤菜式。",
    "zh-mezze-maniche": "经典短管造型带来饱满的咀嚼感。采用 100% 意大利硬质小麦粗面粉与当地纯净泉水，经青铜模具拉制形成粗糙多孔的表面，并在 40–45°C 下低温慢干 24–48 小时。\n\n袖筒面短而厚实，适合搭配肉酱、菌菇酱、奶油酱和豆类酱汁，酱汁可以进入管内，形成更完整的口感。",
    "zh-fusilloni": "宽大的螺旋结构能够将酱汁充分卷入面体。采用 100% 意大利硬质小麦粗面粉与当地纯净泉水制作，经青铜模具拉制和 40–45°C 低温慢干 24–48 小时。\n\n宽大的螺旋结构能够卷住较浓的酱汁，适合搭配肉酱、奶油、菌菇和蔬菜，也适合做成冷食意面或焗烤料理。",
    "zh-spaghetti-ad-archetto": "采用 100% 意大利硬质小麦粗面粉和当地纯净泉水制成，保留传统 U 型长面造型。青铜模具拉制赋予面体粗糙多孔的表面，并经 40–45°C 低温慢干 24–48 小时。\n\nU 型长面适合搭配番茄、橄榄油、海鲜和肉酱，长面形态便于翻拌，适合作为日常意式主食使用。",
    "zh-spaghetti-quadrati-ad-archetto": "方形截面带来更鲜明的咀嚼感与酱汁承载力。选用 100% 意大利硬质小麦粗面粉和当地纯净泉水，经青铜模具拉制并在 40–45°C 下低温慢干 24–48 小时。\n\n方形截面带来更鲜明的咬感，适合搭配肉酱、菌菇酱和需要较强挂汁能力的调味，也适合搭配简单的橄榄油与芝士。",
    "zh-bucatini-ad-archetto": "经典中空细管结构让酱汁同时附着于表面并进入面体内部。采用 100% 意大利硬质小麦粗面粉与当地纯净泉水，经青铜模具拉制并在 40–45°C 下低温慢干 24–48 小时。\n\n中空管状结构让酱汁能够附着在表面并进入面体内部，适合搭配番茄、奶酪、培根和橄榄油类酱汁。",
    "zh-truffelixir-dark-chocolate-100ml": "TrufflElixir 黑巧克力风味糖浆，含天然松露香料，意大利制造，净含量 100 ml。黑巧克力风味糖浆以糖、水、天然香料、天然松露香料和可可提取物调制。\n\n可可带来更深的苦甜和烘烤气息，松露香料则增加一层独特的菌菇类香气，适合用于甜点、饮品或需要可可与松露风味的创意搭配。",
    "zh-truffelixir-strawberry-100ml": "TrufflElixir 草莓风味糖浆，含天然松露香料，意大利制造，净含量 100 ml。草莓风味糖浆含糖水、浓缩草莓汁、天然香料、柠檬酸、天然松露香料和色素 E163。\n\n浓缩草莓汁带来清晰的果香和酸甜感，松露香料让风味多一层对比，适合与甜点、乳制品或冷饮搭配。",
    "zh-truffelixir-spicy-mango-100ml": "TrufflElixir 香辣芒果风味糖浆，含天然松露香料，意大利制造，净含量 100 ml。香辣芒果风味糖浆含糖、水、天然香料、天然松露香料、浓缩芒果汁、色素 E161b 和 E150a 以及阿拉伯胶。\n\n浓缩芒果汁带来成熟果香，香辣风味与松露香料形成更有层次的味觉对比，适合用于饮品、甜点或创意调味。",
    "zh-truffelixir-pistachio-100ml": "TrufflElixir 开心果风味糖浆，含天然松露香料，意大利制造，净含量 100 ml。开心果风味糖浆含糖水、天然香料、天然松露香料和天然开心果香料。\n\n开心果香气带来坚果般的圆润感，松露香料增加更深的香气层次，适合加入甜点、乳制品或饮品中。",
    "zh-truffelixir-tamarind-100ml": "TrufflElixir 罗望子风味糖浆，含天然松露香料，意大利制造，净含量 100 ml。罗望子风味糖浆含糖、水、天然罗望子香料、浓缩罗望子汁和天然松露香料。\n\n浓缩罗望子汁带来酸甜和果酸感，松露香料使风味更有深度，适合用于饮品、甜点或需要果酸平衡的创意搭配。",
    "zh-truffelixir-madagascar-vanilla-100ml": "TrufflElixir 马达加斯加香草风味糖浆，含天然松露香料，意大利制造，净含量 100 ml。马达加斯加香草风味糖浆含糖、水、天然香草香料、浓缩香草香料、浓缩柠檬汁、天然松露香料和添加剂 E202。\n\n香草带来柔和甜香，柠檬汁增加清新感，松露香料则补充更深的香气层次，适合用于甜点、饮品和乳制品搭配。",
  };
  for (const [id, description] of Object.entries(detailDescriptionsZh)) products[id].detailDescription = description;

  const topDescriptions = {
    "zh-white-truffle-oil-60ml": "白松露风味油以橄榄油和食用香料调制，适合在意面、烩饭、炒蛋、土豆和冷盘完成后少量使用。油状质地便于淋用或拌入酱汁，适合需要最后一步提香的日常意式料理。",
    "en-white-truffle-oil-60ml": "White-truffle-flavoured oil made with olive oil and flavouring, designed for finishing pasta, risotto, eggs, potatoes and cold plates. Its pourable format makes it easy to drizzle or fold into a sauce when a dish needs a final truffle aroma.",
    "zh-white-truffle-oil-250ml": "白松露风味油以橄榄油和食用香料调制，适合在意面、烩饭、炒蛋、土豆和冷盘完成后少量使用。油状质地便于淋用或拌入酱汁，适合需要最后一步提香的日常意式料理。",
    "en-white-truffle-oil-250ml": "White-truffle-flavoured oil made with olive oil and flavouring, designed for finishing pasta, risotto, eggs, potatoes and cold plates. Its pourable format makes it easy to drizzle or fold into a sauce when a dish needs a final truffle aroma.",
    "zh-white-truffle-evoo-60ml": "白松露特级初榨橄榄油以特级初榨橄榄油、0.2%春季白松露干和食用香料调制，兼具橄榄油的果香与白松露气息。适合用于意面、烩饭、炒蛋、烤土豆和蔬菜料理的完成阶段。",
    "en-white-truffle-evoo-60ml": "White-truffle extra virgin olive oil made with extra virgin olive oil, 0.2% dried spring white truffle and flavouring. It brings together the fruitiness of olive oil and white-truffle character, suited to finishing pasta, risotto, eggs, roast potatoes and vegetables.",
    "zh-white-truffle-evoo-250ml": "白松露特级初榨橄榄油以特级初榨橄榄油、0.2%春季白松露干和食用香料调制，兼具橄榄油的果香与白松露气息。适合用于意面、烩饭、炒蛋、烤土豆和蔬菜料理的完成阶段。",
    "en-white-truffle-evoo-250ml": "White-truffle extra virgin olive oil made with extra virgin olive oil, 0.2% dried spring white truffle and flavouring. It brings together the fruitiness of olive oil and white-truffle character, suited to finishing pasta, risotto, eggs, roast potatoes and vegetables.",
    "zh-summer-truffle-slices-50g": "夏季黑松露片含52%夏季黑松露，以橄榄油、食用盐和食用香料调制，片状形态清晰，开罐后即可使用。适合直接点缀意面、烩饭、炒蛋、煎肉和冷盘，也可以切碎后加入酱汁。",
    "en-summer-truffle-slices-50g": "Summer black truffle slices containing 52% summer black truffle, prepared with olive oil, salt and flavouring. Ready to use from the jar, they can top pasta, risotto, eggs, meat and cold plates, or be chopped into a sauce.",
    "zh-summer-truffle-slices-80g": "夏季黑松露片含52%夏季黑松露，以橄榄油、食用盐和食用香料调制，片状形态清晰，开罐后即可使用。适合直接点缀意面、烩饭、炒蛋、煎肉和冷盘，也可以切碎后加入酱汁。",
    "en-summer-truffle-slices-80g": "Summer black truffle slices containing 52% summer black truffle, prepared with olive oil, salt and flavouring. Ready to use from the jar, they can top pasta, risotto, eggs, meat and cold plates, or be chopped into a sauce.",
    "zh-summer-truffle-slices-180g": "夏季黑松露片含52%夏季黑松露，以橄榄油、食用盐和食用香料调制，片状形态清晰，开罐后即可使用。适合直接点缀意面、烩饭、炒蛋、煎肉和冷盘，也可以切碎后加入酱汁。",
    "en-summer-truffle-slices-180g": "Summer black truffle slices containing 52% summer black truffle, prepared with olive oil, salt and flavouring. Ready to use from the jar, they can top pasta, risotto, eggs, meat and cold plates, or be chopped into a sauce.",
    "zh-summer-truffle-slices-water-350g": "水浸夏季黑松露片以水、夏季黑松露和食用盐保存，配料和调味简洁，方便根据菜式自行搭配油脂和酱汁。适合按需切取，用于意面、烩饭、炒蛋、煎肉和各类松露风味酱汁。",
    "en-summer-truffle-slices-water-350g": "Summer black truffle slices preserved in water and salt, with a simple ingredient and seasoning profile that leaves room for the cook to add oil or sauce. Portion them as needed for pasta, risotto, eggs, meat or truffle sauces.",
    "zh-summer-truffle-slices-oil-350g": "葵花籽油浸夏季黑松露片含40%夏季黑松露，以葵花籽油、食用盐和食用香料调制，使用直接，适合按片取用。可用于意面、烩饭、披萨、烤土豆和肉类料理，也适合餐饮厨房批量备餐。",
    "en-summer-truffle-slices-oil-350g": "Summer black truffle slices containing 40% summer truffle and preserved in sunflower oil with salt and flavouring. The ready-to-use slices suit pasta, risotto, pizza, roast potatoes and meat, as well as portioned food-service preparation.",
    "zh-truffle-honey-50g": "松露蜂蜜以99%洋槐蜜、春季白松露干和食用香料调制，甜味中带有白松露的独特香气。适合搭配奶酪、烤肉、烤面包、冰淇淋和甜点，直接淋用即可完成风味组合。",
    "en-truffle-honey-50g": "Truffle honey made with 99% acacia honey, dried spring white truffle and flavouring. Its honey sweetness carries a distinctive white-truffle aroma and works with cheese, roast meats, toast, gelato and desserts.",
    "zh-truffle-honey-170g": "松露蜂蜜以99%洋槐蜜、春季白松露干和食用香料调制，甜味中带有白松露的独特香气。适合搭配奶酪、烤肉、烤面包、冰淇淋和甜点，直接淋用即可完成风味组合。",
    "en-truffle-honey-170g": "Truffle honey made with 99% acacia honey, dried spring white truffle and flavouring. Its honey sweetness carries a distinctive white-truffle aroma and works with cheese, roast meats, toast, gelato and desserts.",
    "zh-white-truffle-sauce-80g": "白松露酱以双孢蘑菇、橄榄油和1%意大利白松露制成，质地细腻，适合作为料理中的松露风味基础。可以拌入意面或烩饭，也可以搭配烤面包、鸡肉、牛肉和其他主菜。",
    "en-white-truffle-sauce-80g": "White truffle sauce made with button mushrooms, olive oil and 1% Italian white truffle. Its smooth texture makes it a practical base for pasta and risotto, as well as a pairing for toast, chicken, beef and other main dishes.",
    "zh-white-truffle-sauce-500g": "白松露酱以双孢蘑菇、橄榄油和1%意大利白松露制成，质地细腻，适合作为料理中的松露风味基础。可以拌入意面或烩饭，也可以搭配烤面包、鸡肉、牛肉和其他主菜。",
    "en-white-truffle-sauce-500g": "White truffle sauce made with button mushrooms, olive oil and 1% Italian white truffle. Its smooth texture makes it a practical base for pasta and risotto, as well as a pairing for toast, chicken, beef and other main dishes.",
    "zh-black-truffle-sauce-80g": "黑松露酱以双孢蘑菇、橄榄油、夏季黑松露和黑橄榄调制，菌菇与橄榄风味更为饱满。适合拌入意面、烩饭和土豆泥，也可以用于牛肉、鸡肉或烘焙馅料的调味。",
    "en-black-truffle-sauce-80g": "Black truffle sauce made with button mushrooms, olive oil, summer black truffle and black olives for a fuller mushroom and savoury profile. Use it with pasta, risotto and mashed potatoes, or to season beef, chicken and savoury fillings.",
    "zh-black-truffle-sauce-180g": "黑松露酱以双孢蘑菇、橄榄油、夏季黑松露和黑橄榄调制，菌菇与橄榄风味更为饱满。适合拌入意面、烩饭和土豆泥，也可以用于牛肉、鸡肉或烘焙馅料的调味。",
    "en-black-truffle-sauce-180g": "Black truffle sauce made with button mushrooms, olive oil, summer black truffle and black olives for a fuller mushroom and savoury profile. Use it with pasta, risotto and mashed potatoes, or to season beef, chicken and savoury fillings.",
    "zh-black-truffle-sauce-500g": "黑松露酱以双孢蘑菇、橄榄油、夏季黑松露和黑橄榄调制，菌菇与橄榄风味更为饱满。适合拌入意面、烩饭和土豆泥，也可以用于牛肉、鸡肉或烘焙馅料的调味。",
    "en-black-truffle-sauce-500g": "Black truffle sauce made with button mushrooms, olive oil, summer black truffle and black olives for a fuller mushroom and savoury profile. Use it with pasta, risotto and mashed potatoes, or to season beef, chicken and savoury fillings.",
    "zh-whole-summer-truffles-35g": "整颗形态保存的夏季黑松露，方便按需切片、刨削或切碎使用。适合需要现场处理和摆盘呈现的意式料理，也可以根据菜式加入意面、烩饭、炒蛋、烤面包或酱汁中。",
    "en-whole-summer-truffles-35g": "Whole summer black truffle preserved in its complete form for slicing, shaving or chopping as needed. It suits Italian dishes prepared and presented at service, including pasta, risotto, eggs, toast and sauces.",
    "zh-whole-summer-truffles-55g": "整颗形态保存的夏季黑松露，方便按需切片、刨削或切碎使用。适合需要现场处理和摆盘呈现的意式料理，也可以根据菜式加入意面、烩饭、炒蛋、烤面包或酱汁中。",
    "en-whole-summer-truffles-55g": "Whole summer black truffle preserved in its complete form for slicing, shaving or chopping as needed. It suits Italian dishes prepared and presented at service, including pasta, risotto, eggs, toast and sauces.",
    "zh-whole-summer-truffles-110g": "整颗形态保存的夏季黑松露，方便按需切片、刨削或切碎使用。适合需要现场处理和摆盘呈现的意式料理，也可以根据菜式加入意面、烩饭、炒蛋、烤面包或酱汁中。",
    "en-whole-summer-truffles-110g": "Whole summer black truffle preserved in its complete form for slicing, shaving or chopping as needed. It suits Italian dishes prepared and presented at service, including pasta, risotto, eggs, toast and sauces.",
    "zh-whole-summer-truffles-275g": "整颗形态保存的夏季黑松露，方便按需切片、刨削或切碎使用。适合需要现场处理和摆盘呈现的意式料理，也可以根据菜式加入意面、烩饭、炒蛋、烤面包或酱汁中。",
    "en-whole-summer-truffles-275g": "Whole summer black truffle preserved in its complete form for slicing, shaving or chopping as needed. It suits Italian dishes prepared and presented at service, including pasta, risotto, eggs, toast and sauces.",
    "zh-winter-black-truffle-sauce-80g": "冬季黑松露酱以双孢蘑菇和橄榄油为基础，含5%黑喇叭菌与2.9%冬季黑松露，并标示为不含麸质。适合用于意面、烩饭、土豆和肉类酱汁，也可以与奶油、黄油或高汤调和。",
    "en-winter-black-truffle-sauce-80g": "Winter black truffle sauce made with button mushrooms and olive oil, including 5% black trumpet mushrooms and 2.9% winter black truffle; labelled gluten-free. It suits pasta, risotto, potatoes and meat sauces, and can be loosened with cream, butter or stock.",
    "zh-winter-black-truffle-sauce-180g": "冬季黑松露酱以双孢蘑菇和橄榄油为基础，含5%黑喇叭菌与2.9%冬季黑松露，并标示为不含麸质。适合用于意面、烩饭、土豆和肉类酱汁，也可以与奶油、黄油或高汤调和。",
    "en-winter-black-truffle-sauce-180g": "Winter black truffle sauce made with button mushrooms and olive oil, including 5% black trumpet mushrooms and 2.9% winter black truffle; labelled gluten-free. It suits pasta, risotto, potatoes and meat sauces, and can be loosened with cream, butter or stock.",
    "zh-winter-black-truffle-sauce-500g": "冬季黑松露酱以双孢蘑菇和橄榄油为基础，含5%黑喇叭菌与2.9%冬季黑松露，并标示为不含麸质。适合用于意面、烩饭、土豆和肉类酱汁，也可以与奶油、黄油或高汤调和。",
    "en-winter-black-truffle-sauce-500g": "Winter black truffle sauce made with button mushrooms and olive oil, including 5% black trumpet mushrooms and 2.9% winter black truffle; labelled gluten-free. It suits pasta, risotto, potatoes and meat sauces, and can be loosened with cream, butter or stock.",
    "zh-winter-black-truffle-juice-350ml": "冬季黑松露汁以99.5%冬季黑松露汁为主体，加入食用盐和天然黑松露食用香料，并标示为不含麸质。液体形态便于计量和混合，适合加入高汤、肉汁、奶油酱和烩饭中。",
    "en-winter-black-truffle-juice-350ml": "Winter black truffle juice made with 99.5% winter black truffle juice, salt and natural black truffle flavouring; labelled gluten-free. Its liquid format is easy to measure and blend into stock, gravy, cream sauces and risotto.",
    "zh-maccheroncini-di-campofilone-pgi": "源自坎波菲洛内的经典鸡蛋面，以意大利硬质小麦粗面粉与新鲜鸡蛋制成。面体极细，经过低温缓慢干燥后呈现粗糙多孔的质地，既能充分吸附酱汁，又保持细腻轻盈的口感。2013 年获得欧盟地理标志保护（PGI）认证，并严格限定于坎波菲洛内当地生产。",
    "en-maccheroncini-di-campofilone-pgi": "A classic egg pasta from Campofilone, made with Italian durum wheat semolina and fresh eggs. Its exceptionally thin strands are slowly dried at low temperature, creating a rough and porous texture with a delicate taste and excellent cooking yield. In 2013, Maccheroncini di Campofilone received European Protected Geographical Indication (PGI) recognition and can only be produced in the municipality of Campofilone.",
    "zh-linguine-di-campofilone": "以意大利硬质小麦粗面粉和新鲜鸡蛋制成，延续坎波菲洛内传统鸡蛋面的轻薄特色。低温慢干赋予面体粗糙多孔的表面，更易与酱汁融合，同时保留细腻口感。",
    "en-linguine-di-campofilone": "Made with Italian durum wheat semolina and fresh eggs, this pasta reflects the thin and delicate character of traditional Campofilone egg pasta. Slow drying at low temperature gives it a rough and porous surface, ideal for blending with sauces while preserving a delicate texture.",
    "zh-fettuccine-di-campofilone": "精选意大利硬质小麦粗面粉与新鲜鸡蛋，以传统工艺制成。宽而轻薄的面体经过低温慢干，形成粗糙多孔的表面，能够充分承载酱汁。",
    "en-fettuccine-di-campofilone": "Made with Italian durum wheat semolina and fresh eggs according to traditional methods. The wide, thin strands are slowly dried at low temperature, creating a rough and porous surface that blends well with sauces.",
    "zh-tagliatelle-di-campofilone": "采用意大利硬质小麦粗面粉与新鲜鸡蛋制作，宽扁面体经低温缓慢干燥，口感细腻而富有韧性，粗糙多孔的表面能够充分包裹酱汁。",
    "en-tagliatelle-di-campofilone": "Made with Italian durum wheat semolina and fresh eggs. The wide, flat strands are slowly dried at low temperature, giving the pasta a delicate texture and a rough, porous surface that holds sauces well.",
    "zh-chitarrine-di-campofilone": "以意大利硬质小麦粗面粉和新鲜鸡蛋制成，细长面体兼具轻盈与质感。传统工艺和低温慢干形成粗糙多孔的表面，让酱汁均匀附着。",
    "en-chitarrine-di-campofilone": "Made with Italian durum wheat semolina and fresh eggs. The fine, long strands combine a delicate texture with the rough, porous surface created by traditional processing and slow low-temperature drying.",
    "zh-pappardelle-di-campofilone": "宽阔的面体带来更饱满的咀嚼感。精选意大利硬质小麦粗面粉和新鲜鸡蛋，经传统工艺制作并低温缓慢干燥，面体粗糙多孔，适合承载浓郁酱汁。",
    "en-pappardelle-di-campofilone": "Its broad strands provide a fuller texture. Made with Italian durum wheat semolina and fresh eggs using traditional methods, the pasta is slowly dried at low temperature to achieve a rough and porous surface.",
    "zh-sfoglia-di-campofilone": "以意大利硬质小麦粗面粉与新鲜鸡蛋制成的传统鸡蛋面皮，质地薄而细腻，经过低温缓慢干燥，兼具良好的烹饪表现与可塑性。",
    "en-sfoglia-di-campofilone": "Traditional egg pasta sheets made with Italian durum wheat semolina and fresh eggs. Thin and delicate, they are slowly dried at low temperature for excellent cooking performance.",
    "zh-saffron-fettuccine": "在传统坎波菲洛内鸡蛋面中加入 0.2% 藏红花，带来优雅香气与鲜明色泽。以硬质小麦粗面粉和鸡蛋为基础，经低温缓慢干燥形成粗糙多孔的面体。",
    "en-saffron-fettuccine": "Traditional Campofilone egg pasta enriched with 0.2% saffron, giving it a distinctive aroma and colour. Made with durum wheat semolina and eggs, it is slowly dried to create a rough and porous texture.",
    "zh-truffle-fettuccine": "以硬质小麦粗面粉为基础，加入鸡蛋 23%、松露 3.6% 及香料，突出松露特有的馥郁香气。粗糙多孔的面体经过低温慢干，更易与酱汁融合。",
    "en-truffle-fettuccine": "Made with durum wheat semolina, 23% eggs, 3.6% truffle and flavourings, highlighting the distinctive aroma of truffle. The rough and porous pasta is slowly dried at low temperature.",
    "zh-porcini-mushroom-fettuccine": "在鸡蛋面中加入 5.6% 牛肝菌，赋予面体浓郁而自然的菌菇香气。采用硬质小麦粗面粉和鸡蛋制作，并经低温慢干保持粗糙多孔的质地。",
    "en-porcini-mushroom-fettuccine": "Egg pasta with 5.6% porcini mushrooms, giving the pasta a rich, natural mushroom aroma. Made with durum wheat semolina and eggs and slowly dried at low temperature to maintain its rough and porous texture.",
    "zh-squid-ink-fettuccine": "加入 2% 鱿鱼墨的鸡蛋宽面，拥有醒目的深色外观与鲜明海洋风味。以硬质小麦粗面粉和鸡蛋制成，经低温慢干形成适合挂汁的粗糙表面。",
    "en-squid-ink-fettuccine": "Egg fettuccine with 2% squid ink, distinguished by its dark colour and characteristic marine flavour. Made with durum wheat semolina and eggs, it is slowly dried at low temperature to create a rough surface.",
    "zh-chili-pepper-fettuccine": "在传统鸡蛋宽面中加入 3.6% 辣椒，带来鲜明而有层次的辛香。面体经低温缓慢干燥，保持粗糙多孔的质感。",
    "en-chili-pepper-fettuccine": "Traditional egg fettuccine with 3.6% chili pepper, giving the pasta a distinctive spicy character. Slow low-temperature drying preserves its rough and porous texture.",
    "zh-sage-fettuccine": "加入 2.3% 鼠尾草的鸡蛋宽面，自带清新而富有辨识度的草本香气。采用硬质小麦粗面粉与鸡蛋制成，并经低温慢干。",
    "en-sage-fettuccine": "Egg fettuccine with 2.3% sage, offering a distinctive herbal aroma. Made with durum wheat semolina and eggs and slowly dried at low temperature.",
    "zh-spinach-fettuccine": "在鸡蛋宽面中加入 1.9% 菠菜，呈现自然色泽与清新的蔬菜风味。面体粗糙多孔，能够很好地承载酱汁。",
    "en-spinach-fettuccine": "Egg fettuccine with 1.9% spinach, giving the pasta a natural colour and delicate vegetable character. Its rough and porous surface blends well with sauces.",
    "zh-nettle-fettuccine": "加入 3.2% 荨麻的鸡蛋宽面，具有独特的草本风味与自然色泽。以硬质小麦粗面粉和鸡蛋为基础，经低温缓慢干燥。",
    "en-nettle-fettuccine": "Egg fettuccine with 3.2% nettle, characterized by a distinctive herbal flavour and natural colour. Made with durum wheat semolina and eggs and slowly dried at low temperature.",
    "zh-lemon-fettuccine": "加入 5.3% 柠檬的鸡蛋宽面，带来清新明亮的柑橘香气。粗糙多孔的面体能够与酱汁充分融合，同时保留轻盈风味。",
    "en-lemon-fettuccine": "Egg fettuccine with 5.3% lemon, offering a fresh citrus aroma. Its rough and porous texture blends well with sauces while preserving a delicate character.",
    "zh-rigatoni": "选用 100% 意大利硬质小麦粗面粉与大萨索山和蒙蒂德拉拉加国家公园附近的纯净泉水制作。经青铜模具拉制形成粗糙多孔的表面，并在 40–45°C 下低温慢干 24–48 小时。",
    "en-rigatoni": "Made with 100% Italian durum wheat semolina and pure water from springs near the Gran Sasso and Monti della Laga National Park. Bronze drawing creates a rough and porous surface, followed by slow drying for 24–48 hours at 40–45°C.",
    "zh-penne-triangolari": "独特的三角管状造型兼具辨识度与挂汁能力。采用 100% 意大利硬质小麦粗面粉和当地纯净泉水，经青铜模具拉制并在 40–45°C 下低温慢干 24–48 小时。",
    "en-penne-triangolari": "Its distinctive triangular tubular shape offers a characteristic appearance and a surface well suited to sauces. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C.",
    "zh-mezze-maniche": "经典短管造型带来饱满的咀嚼感。采用 100% 意大利硬质小麦粗面粉与当地纯净泉水，经青铜模具拉制形成粗糙多孔的表面，并在 40–45°C 下低温慢干 24–48 小时。",
    "en-mezze-maniche": "A classic short tubular shape with a substantial texture. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn for a rough and porous surface and slowly dried for 24–48 hours at 40–45°C.",
    "zh-fusilloni": "宽大的螺旋结构能够将酱汁充分卷入面体。采用 100% 意大利硬质小麦粗面粉与当地纯净泉水制作，经青铜模具拉制和 40–45°C 低温慢干 24–48 小时。",
    "en-fusilloni": "The large spiral shape is designed to hold sauces effectively. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C.",
    "zh-spaghetti-ad-archetto": "采用 100% 意大利硬质小麦粗面粉和当地纯净泉水制成，保留传统 U 型长面造型。青铜模具拉制赋予面体粗糙多孔的表面，并经 40–45°C 低温慢干 24–48 小时。",
    "en-spaghetti-ad-archetto": "Made with 100% Italian durum wheat semolina and pure local spring water in the traditional U-shaped long-pasta format. Bronze drawing gives the pasta a rough and porous surface, followed by slow drying for 24–48 hours at 40–45°C.",
    "zh-spaghetti-quadrati-ad-archetto": "方形截面带来更鲜明的咀嚼感与酱汁承载力。选用 100% 意大利硬质小麦粗面粉和当地纯净泉水，经青铜模具拉制并在 40–45°C 下低温慢干 24–48 小时。",
    "en-spaghetti-quadrati-ad-archetto": "The square cross-section gives this pasta a distinctive texture and excellent sauce-holding capacity. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C.",
    "zh-bucatini-ad-archetto": "经典中空细管结构让酱汁同时附着于表面并进入面体内部。采用 100% 意大利硬质小麦粗面粉与当地纯净泉水，经青铜模具拉制并在 40–45°C 下低温慢干 24–48 小时。",
    "en-bucatini-ad-archetto": "The classic hollow shape allows sauces to coat the surface and enter the pasta. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C.",
    "zh-truffelixir-dark-chocolate-100ml": "TrufflElixir 黑巧克力风味糖浆，意大利制造，净含量100 ml。黑巧克力风味糖浆结合可可提取物与天然松露香料，带来苦甜、烘烤和松露气息。适合用于甜点、饮品或需要可可与松露风味的创意搭配。",
    "en-truffelixir-dark-chocolate-100ml": "Dark Chocolate TrufflElixir syrup, made in Italy. Net content: 100 ml. Dark-chocolate syrup with cocoa extract and natural truffle flavouring, combining bittersweet cocoa, roasted notes and truffle character. It suits desserts, drinks and creative cocoa-and-truffle pairings.",
    "zh-truffelixir-strawberry-100ml": "TrufflElixir 草莓风味糖浆，意大利制造，净含量100 ml。草莓风味糖浆含浓缩草莓汁、柠檬酸和天然松露香料，带有清晰的果香与酸甜感。适合搭配甜点、乳制品和冷饮。",
    "en-truffelixir-strawberry-100ml": "Strawberry TrufflElixir syrup, made in Italy. Net content: 100 ml. Strawberry syrup with concentrated strawberry juice, citric acid and natural truffle flavouring, offering a clear fruity and sweet-sour character. It suits desserts, dairy-based preparations and cold drinks.",
    "zh-truffelixir-spicy-mango-100ml": "TrufflElixir 香辣芒果风味糖浆，意大利制造，净含量100 ml。香辣芒果风味糖浆含浓缩芒果汁、天然香料和天然松露香料，结合成熟果香、辛香与松露气息。适合用于饮品、甜点和创意调味。",
    "en-truffelixir-spicy-mango-100ml": "Spicy Mango TrufflElixir syrup, made in Italy. Net content: 100 ml. Spicy-mango syrup with concentrated mango juice, natural flavouring and natural truffle flavouring, combining ripe fruit, spice and truffle character. It suits drinks, desserts and creative seasoning.",
    "zh-truffelixir-pistachio-100ml": "TrufflElixir 开心果风味糖浆，意大利制造，净含量100 ml。开心果风味糖浆含天然开心果香料和天然松露香料，带有圆润的坚果香气和更深的松露层次。适合加入甜点、乳制品和饮品中。",
    "en-truffelixir-pistachio-100ml": "Pistachio TrufflElixir syrup, made in Italy. Net content: 100 ml. Pistachio syrup with natural pistachio and natural truffle flavourings, offering a rounded nutty aroma with added truffle depth. It suits desserts, dairy-based preparations and drinks.",
    "zh-truffelixir-tamarind-100ml": "TrufflElixir 罗望子风味糖浆，意大利制造，净含量100 ml。罗望子风味糖浆含浓缩罗望子汁和天然松露香料，酸甜果香与松露气息形成鲜明对比。适合用于饮品、甜点和需要果酸平衡的创意搭配。",
    "en-truffelixir-tamarind-100ml": "Tamarind TrufflElixir syrup, made in Italy. Net content: 100 ml. Tamarind syrup with concentrated tamarind juice and natural truffle flavouring, creating a clear contrast between sweet-sour fruit and truffle character. It suits drinks, desserts and creative pairings.",
    "zh-truffelixir-madagascar-vanilla-100ml": "TrufflElixir 马达加斯加香草风味糖浆，意大利制造，净含量100 ml。马达加斯加香草风味糖浆含天然及浓缩香草香料、浓缩柠檬汁和天然松露香料，兼具柔和甜香、清新感与松露气息。适合用于甜点、饮品和乳制品搭配。",
    "en-truffelixir-madagascar-vanilla-100ml": "Madagascar Vanilla TrufflElixir syrup, made in Italy. Net content: 100 ml. Madagascar-vanilla syrup with natural and concentrated vanilla flavourings, concentrated lemon juice and natural truffle flavouring, combining soft sweetness, freshness and truffle character. It suits desserts, drinks and dairy-based preparations.",
  };
  for (const [id, description] of Object.entries(topDescriptions)) products[id].desc = description;

  const detailDescriptionsEn = {
    "en-white-truffle-oil-60ml": "White-truffle-flavoured oil made with olive oil and flavouring, with the oil providing a soft base for the truffle aroma. It is intended for the finishing stage of a dish and works with pasta, risotto, eggs, potatoes and cold plates.\n\nDrizzle a small amount over the dish or fold it into a sauce so the aroma blends with the ingredients; it is better suited to finishing than prolonged high-heat cooking. Format: 60 ml.",
    "en-white-truffle-oil-250ml": "White-truffle-flavoured oil made with olive oil and flavouring, with the oil providing a soft base for the truffle aroma. It is intended for the finishing stage of a dish and works with pasta, risotto, eggs, potatoes and cold plates.\n\nDrizzle a small amount over the dish or fold it into a sauce so the aroma blends with the ingredients; it is better suited to finishing than prolonged high-heat cooking. Format: 250 ml.",
    "en-white-truffle-evoo-60ml": "This seasoning oil uses extra virgin olive oil as its base, with 0.2% dried spring white truffle and flavouring. The olive oil brings a clear fruity note and smooth texture, while the spring white truffle adds a distinctive truffle character.\n\nUse a small amount to finish pasta, risotto, eggs, roast potatoes or vegetables, or combine it with butter, cream or cheese so both aromas remain clear. Format: 60 ml.",
    "en-white-truffle-evoo-250ml": "This seasoning oil uses extra virgin olive oil as its base, with 0.2% dried spring white truffle and flavouring. The olive oil brings a clear fruity note and smooth texture, while the spring white truffle adds a distinctive truffle character.\n\nUse a small amount to finish pasta, risotto, eggs, roast potatoes or vegetables, or combine it with butter, cream or cheese so both aromas remain clear. Format: 250 ml.",
    "en-summer-truffle-slices-50g": "These slices contain 52% summer black truffle and are prepared with olive oil, salt and flavouring. The oil gives the slices a rounded texture, while the sliced truffle keeps its visible form and mushroom-like character.\n\nUse them straight from the jar over pasta, risotto, eggs, meat and cold plates, or chop them into a cream or mushroom sauce so the flavour spreads through the dish. Format: 50 g.",
    "en-summer-truffle-slices-80g": "These slices contain 52% summer black truffle and are prepared with olive oil, salt and flavouring. The oil gives the slices a rounded texture, while the sliced truffle keeps its visible form and mushroom-like character.\n\nUse them straight from the jar over pasta, risotto, eggs, meat and cold plates, or chop them into a cream or mushroom sauce so the flavour spreads through the dish. Format: 80 g.",
    "en-summer-truffle-slices-180g": "These slices contain 52% summer black truffle and are prepared with olive oil, salt and flavouring. The oil gives the slices a rounded texture, while the sliced truffle keeps its visible form and mushroom-like character.\n\nUse them straight from the jar over pasta, risotto, eggs, meat and cold plates, or chop them into a cream or mushroom sauce so the flavour spreads through the dish. Format: 180 g.",
    "en-summer-truffle-slices-water-350g": "Summer black truffle slices preserved in water and salt, without added oil, giving the product a simple ingredient and seasoning profile. This format lets the cook choose the olive oil, butter, cream or sauce used in the dish while keeping the truffle's mushroom-like character present.\n\nServe the slices with pasta, risotto, eggs or meat, or chop them into stock, cream or mushroom sauces. Format: 350 g.",
    "en-summer-truffle-slices-oil-350g": "These summer black truffle slices contain 40% truffle and are preserved in sunflower oil with salt and flavouring. Sunflower oil gives them a lighter oily texture, while the summer truffle provides a clear mushroom-like character and the sliced format is easy to use and present.\n\nServe them over pasta, risotto, pizza, roast potatoes or meat, or chop them into fillings, sauces and hot dishes. Format: 350 g.",
    "en-truffle-honey-50g": "Made with 99% acacia honey, dried spring white truffle and flavouring, this condiment leads with the light sweetness of acacia honey and adds a distinctive mushroom-like truffle aroma. It needs no cooking: drizzle it over cheese, roast meats, toast or gelato, or use a small amount in desserts and cold plates where the sweet and savoury notes can meet.\n\nFormat: 50 g.",
    "en-truffle-honey-170g": "Made with 99% acacia honey, dried spring white truffle and flavouring, this condiment leads with the light sweetness of acacia honey and adds a distinctive mushroom-like truffle aroma. It needs no cooking: drizzle it over cheese, roast meats, toast or gelato, or use a small amount in desserts and cold plates where the sweet and savoury notes can meet.\n\nFormat: 170 g.",
    "en-white-truffle-sauce-80g": "White truffle sauce made with 54% button mushrooms, olive oil and 1% Italian white truffle, with salt and flavouring. The mushrooms provide a gentle savoury base, the olive oil gives a smooth texture, and the white truffle brings a more concentrated aroma.\n\nUse it with pasta or risotto, spread it on toast, or pair it with chicken and beef; loosen it with cream, butter or pasta water for a softer finish. Format: 80 g.",
    "en-white-truffle-sauce-500g": "White truffle sauce made with 54% button mushrooms, olive oil and 1% Italian white truffle, with salt and flavouring. The mushrooms provide a gentle savoury base, the olive oil gives a smooth texture, and the white truffle brings a more concentrated aroma.\n\nUse it with pasta or risotto, spread it on toast, or pair it with chicken and beef; loosen it with cream, butter or pasta water for a softer finish. Format: 500 g.",
    "en-black-truffle-sauce-80g": "Black truffle sauce combines 50% button mushrooms with olive oil, summer black truffle, black olives, salt and flavouring. The mushrooms create a rounded savoury base, the olives add saltiness and depth, and the summer truffle brings a recognisable truffle aroma.\n\nUse it with pasta, risotto or mashed potatoes, or as a flavour base for beef, chicken and savoury baked fillings. Format: 80 g.",
    "en-black-truffle-sauce-180g": "Black truffle sauce combines 50% button mushrooms with olive oil, summer black truffle, black olives, salt and flavouring. The mushrooms create a rounded savoury base, the olives add saltiness and depth, and the summer truffle brings a recognisable truffle aroma.\n\nUse it with pasta, risotto or mashed potatoes, or as a flavour base for beef, chicken and savoury baked fillings. Format: 180 g.",
    "en-black-truffle-sauce-500g": "Black truffle sauce combines 50% button mushrooms with olive oil, summer black truffle, black olives, salt and flavouring. The mushrooms create a rounded savoury base, the olives add saltiness and depth, and the summer truffle brings a recognisable truffle aroma.\n\nUse it with pasta, risotto or mashed potatoes, or as a flavour base for beef, chicken and savoury baked fillings. Format: 500 g.",
    "en-whole-summer-truffles-35g": "Whole summer black truffles preserved in water and salt, kept in their complete form with their mushroom-like character available for preparation according to the dish. Slice them over pasta, risotto, eggs or toast, or shave and chop them into butter, cream, mushroom sauces or stock so the flavour disperses through the dish.\n\nThe whole format suits kitchens that want to cut and present the ingredient at service. Format: 35 g.",
    "en-whole-summer-truffles-55g": "Whole summer black truffles preserved in water and salt, kept in their complete form with their mushroom-like character available for preparation according to the dish. Slice them over pasta, risotto, eggs or toast, or shave and chop them into butter, cream, mushroom sauces or stock so the flavour disperses through the dish.\n\nThe whole format suits kitchens that want to cut and present the ingredient at service. Format: 55 g.",
    "en-whole-summer-truffles-110g": "Whole summer black truffles preserved in water and salt, kept in their complete form with their mushroom-like character available for preparation according to the dish. Slice them over pasta, risotto, eggs or toast, or shave and chop them into butter, cream, mushroom sauces or stock so the flavour disperses through the dish.\n\nThe whole format suits kitchens that want to cut and present the ingredient at service. Format: 110 g.",
    "en-whole-summer-truffles-275g": "Whole summer black truffles preserved in water and salt, kept in their complete form with their mushroom-like character available for preparation according to the dish. Slice them over pasta, risotto, eggs or toast, or shave and chop them into butter, cream, mushroom sauces or stock so the flavour disperses through the dish.\n\nThe whole format suits kitchens that want to cut and present the ingredient at service. Format: 275 g.",
    "en-winter-black-truffle-sauce-80g": "Winter black truffle sauce is made with 50% button mushrooms and olive oil, with 5% black trumpet mushrooms, 2.9% winter black truffle, natural black truffle flavouring and salt. The mushrooms create a deeper savoury base, while the winter truffle and natural flavouring concentrate the truffle aroma. Use it with pasta, risotto, potatoes or meat sauces, or dilute it with cream, butter or stock.\n\nThe product is labelled gluten-free. Format: 80 g.",
    "en-winter-black-truffle-sauce-180g": "Winter black truffle sauce is made with 50% button mushrooms and olive oil, with 5% black trumpet mushrooms, 2.9% winter black truffle, natural black truffle flavouring and salt. The mushrooms create a deeper savoury base, while the winter truffle and natural flavouring concentrate the truffle aroma. Use it with pasta, risotto, potatoes or meat sauces, or dilute it with cream, butter or stock.\n\nThe product is labelled gluten-free. Format: 180 g.",
    "en-winter-black-truffle-sauce-500g": "Winter black truffle sauce is made with 50% button mushrooms and olive oil, with 5% black trumpet mushrooms, 2.9% winter black truffle, natural black truffle flavouring and salt. The mushrooms create a deeper savoury base, while the winter truffle and natural flavouring concentrate the truffle aroma. Use it with pasta, risotto, potatoes or meat sauces, or dilute it with cream, butter or stock.\n\nThe product is labelled gluten-free. Format: 500 g.",
    "en-winter-black-truffle-juice-350ml": "Winter black truffle juice made with 99.5% winter black truffle juice, salt and natural black truffle flavouring; it is labelled gluten-free. The high proportion of truffle juice gives a direct mushroom-like truffle character, while the liquid format is easy to measure, blend and adjust.\n\nUse it in stock, gravy, cream sauces and risotto, adding a small amount near the end so the flavour is distributed through the dish. Format: 350 ml.",
    "en-maccheroncini-di-campofilone-pgi": "A classic egg pasta from Campofilone, made with Italian durum wheat semolina and fresh eggs. Its exceptionally thin strands are slowly dried at low temperature, creating a rough and porous texture with a delicate taste and excellent cooking yield. In 2013, Maccheroncini di Campofilone received European Protected Geographical Indication (PGI) recognition and can only be produced in the municipality of Campofilone.\n\nIts exceptionally fine strands suit olive oil, butter, seafood and light tomato sauces. Because the cooking time is short, finish the pasta promptly with the sauce.",
    "en-linguine-di-campofilone": "Made with Italian durum wheat semolina and fresh eggs, this pasta reflects the thin and delicate character of traditional Campofilone egg pasta. Slow drying at low temperature gives it a rough and porous surface, ideal for blending with sauces while preserving a delicate texture.\n\nThe fine, flat shape works with olive oil, seafood, pesto and light cream sauces. Finish it while still firm and use a little pasta water to help the sauce cling.",
    "en-fettuccine-di-campofilone": "Made with Italian durum wheat semolina and fresh eggs according to traditional methods. The wide, thin strands are slowly dried at low temperature, creating a rough and porous surface that blends well with sauces.\n\nThe wide, thin strands carry cream, mushroom and cheese sauces well, and also work with simple butter and black pepper that let the egg-pasta character show.",
    "en-tagliatelle-di-campofilone": "Made with Italian durum wheat semolina and fresh eggs. The wide, flat strands are slowly dried at low temperature, giving the pasta a delicate texture and a rough, porous surface that holds sauces well.\n\nThe broad shape suits meat, mushroom and tomato sauces. Keep a little pasta water when finishing so the sauce coats the strands evenly.",
    "en-chitarrine-di-campofilone": "Made with Italian durum wheat semolina and fresh eggs. The fine, long strands combine a delicate texture with the rough, porous surface created by traditional processing and slow low-temperature drying.\n\nThe fine long strands suit tomato, seafood and olive-oil sauces. Toss promptly after cooking to keep the texture light while allowing the sauce to cling.",
    "en-pappardelle-di-campofilone": "Its broad strands provide a fuller texture. Made with Italian durum wheat semolina and fresh eggs using traditional methods, the pasta is slowly dried at low temperature to achieve a rough and porous surface.\n\nThe broad strands suit rich sauces such as braised meat, game, mushrooms and cream, making them a good choice for a fuller main course.",
    "en-sfoglia-di-campofilone": "Traditional egg pasta sheets made with Italian durum wheat semolina and fresh eggs. Thin and delicate, they are slowly dried at low temperature for excellent cooking performance.\n\nThe thin, flexible sheets suit lasagne, baked pasta and filled pasta, and can be cut into different formats for home or food-service preparation.",
    "en-saffron-fettuccine": "Traditional Campofilone egg pasta enriched with 0.2% saffron, giving it a distinctive aroma and colour. Made with durum wheat semolina and eggs, it is slowly dried to create a rough and porous texture.\n\nThe saffron colour and aroma suit seafood, butter, cream and light vegetable sauces. Keep the seasoning restrained so the pasta remains clear.",
    "en-truffle-fettuccine": "Made with durum wheat semolina, 23% eggs, 3.6% truffle and flavourings, highlighting the distinctive aroma of truffle. The rough and porous pasta is slowly dried at low temperature.\n\nTruffle fettuccine pairs naturally with butter, cream, cheese and mushrooms. A small amount of truffle oil can be added after cooking, rather than masking the aroma with prolonged heat.",
    "en-porcini-mushroom-fettuccine": "Egg pasta with 5.6% porcini mushrooms, giving the pasta a rich, natural mushroom aroma. Made with durum wheat semolina and eggs and slowly dried at low temperature to maintain its rough and porous texture.\n\nPorcini fettuccine works with butter, cream, cheese and other mushrooms, either as a simple main course or alongside roast chicken and pan-seared meat.",
    "en-squid-ink-fettuccine": "Egg fettuccine with 2% squid ink, distinguished by its dark colour and characteristic marine flavour. Made with durum wheat semolina and eggs, it is slowly dried at low temperature to create a rough surface.\n\nIts marine character suits prawns, clams, squid and tomato, while the dark colour creates a strong visual contrast in an Italian-style dish.",
    "en-chili-pepper-fettuccine": "Traditional egg fettuccine with 3.6% chili pepper, giving the pasta a distinctive spicy character. Slow low-temperature drying preserves its rough and porous texture.\n\nChilli fettuccine suits olive oil, garlic, tomato and seafood. Keep the sauce simple so the chilli and egg-pasta character stay balanced.",
    "en-sage-fettuccine": "Egg fettuccine with 2.3% sage, offering a distinctive herbal aroma. Made with durum wheat semolina and eggs and slowly dried at low temperature.\n\nSage fettuccine works with butter, pumpkin, cream and roast poultry. Browned butter and a simple finish are enough to show its herbal character.",
    "en-spinach-fettuccine": "Egg fettuccine with 1.9% spinach, giving the pasta a natural colour and delicate vegetable character. Its rough and porous surface blends well with sauces.\n\nSpinach fettuccine suits cream, cheese, mushrooms and light meat sauces, and can be paired with contrasting ingredients for a more colourful plate.",
    "en-nettle-fettuccine": "Egg fettuccine with 3.2% nettle, characterized by a distinctive herbal flavour and natural colour. Made with durum wheat semolina and eggs and slowly dried at low temperature.\n\nIts distinctive herbal character suits butter, cheese, cream and mushroom sauces. Keep the seasoning measured so the pasta itself remains present.",
    "en-lemon-fettuccine": "Egg fettuccine with 5.3% lemon, offering a fresh citrus aroma. Its rough and porous texture blends well with sauces while preserving a delicate character.\n\nThe citrus character suits seafood, olive oil, cream and fresh herbs, and also pairs well with roast fish or chicken for a lighter main course.",
    "en-rigatoni": "Made with 100% Italian durum wheat semolina and pure water from springs near the Gran Sasso and Monti della Laga National Park. Bronze drawing creates a rough and porous surface, followed by slow drying for 24–48 hours at 40–45°C.\n\nThe ridged tube holds meat, tomato, cream and baked-pasta sauces well, making it suitable for a substantial main course.",
    "en-penne-triangolari": "Its distinctive triangular tubular shape offers a characteristic appearance and a surface well suited to sauces. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C.\n\nIts three-sided tubular shape suits tomato, meat, cream and roasted-vegetable sauces, and holds its form well in baked dishes.",
    "en-mezze-maniche": "A classic short tubular shape with a substantial texture. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn for a rough and porous surface and slowly dried for 24–48 hours at 40–45°C.\n\nThis short, substantial tube suits meat, mushroom, cream and bean sauces, allowing sauce to collect inside as well as coat the surface.",
    "en-fusilloni": "The large spiral shape is designed to hold sauces effectively. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C.\n\nThe broad spiral catches thicker sauces and suits meat, cream, mushroom and vegetable preparations, including cold pasta and baked dishes.",
    "en-spaghetti-ad-archetto": "Made with 100% Italian durum wheat semolina and pure local spring water in the traditional U-shaped long-pasta format. Bronze drawing gives the pasta a rough and porous surface, followed by slow drying for 24–48 hours at 40–45°C.\n\nThe U-shaped long pasta suits tomato, olive oil, seafood and meat sauces, and is easy to finish by tossing in the pan.",
    "en-spaghetti-quadrati-ad-archetto": "The square cross-section gives this pasta a distinctive texture and excellent sauce-holding capacity. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C.\n\nThe square cross-section gives a distinct bite and suits meat, mushroom and other sauces that need a surface with strong sauce-holding ability.",
    "en-bucatini-ad-archetto": "The classic hollow shape allows sauces to coat the surface and enter the pasta. Made with 100% Italian durum wheat semolina and pure local spring water, bronze-drawn and slowly dried for 24–48 hours at 40–45°C.\n\nIts hollow tube lets sauce coat the outside and enter the pasta. It suits tomato, cheese, pancetta and olive-oil sauces.",
    "en-truffelixir-dark-chocolate-100ml": "TrufflElixir dark chocolate syrup with natural truffle flavoring, made in Italy. Net content: 100 ml. This dark-chocolate syrup is made with sugar, water, natural flavouring, natural truffle flavouring and cocoa extract.\n\nCocoa brings a deeper bittersweet and roasted character, while the truffle flavouring adds a distinctive mushroom-like note. Use it in desserts, drinks or creative pairings built around cocoa and truffle.",
    "en-truffelixir-strawberry-100ml": "TrufflElixir strawberry syrup with natural truffle flavoring, made in Italy. Net content: 100 ml. This strawberry syrup contains sweetened water, concentrated strawberry juice, natural flavouring, citric acid, natural truffle flavouring and colour E163.\n\nThe strawberry juice brings a clear fruity and sweet-sour character, while the truffle flavouring adds contrast. It suits desserts, dairy-based preparations and cold drinks.",
    "en-truffelixir-spicy-mango-100ml": "TrufflElixir spicy mango syrup with natural truffle flavoring, made in Italy. Net content: 100 ml. This spicy-mango syrup contains sugar, water, natural flavouring, natural truffle flavouring, concentrated mango juice, colours E161b and E150a, and acacia gum.\n\nConcentrated mango juice brings a ripe fruit character, while the spice and truffle flavouring create a layered contrast. It suits drinks, desserts and creative seasoning.",
    "en-truffelixir-pistachio-100ml": "TrufflElixir pistachio syrup with natural truffle flavoring, made in Italy. Net content: 100 ml. This syrup contains sweetened water, natural flavouring, natural truffle flavouring and natural pistachio flavouring.\n\nThe pistachio character brings a rounded nutty note, while the truffle flavouring adds depth. It suits desserts, dairy-based preparations and drinks.",
    "en-truffelixir-tamarind-100ml": "TrufflElixir tamarind syrup with natural truffle flavoring, made in Italy. Net content: 100 ml. This tamarind syrup contains sugar, water, natural tamarind flavouring, concentrated tamarind juice and natural truffle flavouring.\n\nConcentrated tamarind juice brings a sweet-sour fruit acidity, while the truffle flavouring adds depth. It suits drinks, desserts and creative pairings that need fruit acidity.",
    "en-truffelixir-madagascar-vanilla-100ml": "TrufflElixir madagascar vanilla syrup with natural truffle flavoring, made in Italy. Net content: 100 ml. This Madagascar-vanilla syrup contains sugar, water, natural vanilla flavouring, concentrated vanilla flavouring, concentrated lemon juice, natural truffle flavouring and E202.\n\nVanilla brings a soft sweet aroma, lemon adds freshness, and the truffle flavouring adds depth. It suits desserts, drinks and dairy-based preparations.",
  };
  for (const [id, description] of Object.entries(detailDescriptionsEn)) products[id].detailDescription = description;

  const productVideoNotes = {
    "zh-white-truffle-oil-60ml": "松露香气可以留到料理的最后阶段。菜肴完成后关火，保留食材本身的温度，再少量加入并轻轻拌匀，或直接淋在表面。\n\n锅中的食材完成自己的风味后，可以用少量调味油收尾。入口时会先感受到食材和油脂的香气，随后出现松露气息，整体味道清楚，也不必加入复杂调味。",
    "en-white-truffle-oil-60ml": "Truffle aroma is best introduced at the final stage. Turn off the heat, let the dish retain its warmth, then add a small amount and fold it through gently, or drizzle it over the surface.\n\nLet the ingredients develop their own flavour first, then use a small amount of seasoning oil to finish. The ingredients and oil come first on the palate, followed by the truffle aroma, so the dish stays clear without complicated seasoning.",
    "zh-white-truffle-oil-250ml": "松露香气适合留到料理的最后一步。菜肴完成后先关火，保留食材本身的温度，再少量加入并轻轻拌匀，或直接淋在表面。\n\n先让锅中的食材完成自己的风味，再用少量调味油收尾。入口时会先感受到食材和油脂的香气，随后松露气息慢慢出现，整体味道更清楚，也不需要复杂调味。",
    "en-white-truffle-oil-250ml": "Truffle aroma is best introduced at the final stage. Turn off the heat, let the dish retain its warmth, then add a small amount and fold it through gently, or drizzle it over the surface.\n\nLet the ingredients develop their own flavour first, then use a small amount of seasoning oil to finish. The ingredients and oil come first on the palate, followed by the truffle aroma, so the dish stays clear without complicated seasoning.",
    "zh-white-truffle-evoo-60ml": "主体烹饪完成后，可以在出锅前或装盘后加入少量。温热的意面、炒蛋或烤土豆可以承接油脂香气，调味油不必长时间停留在高温锅中。\n\n这类调味可以放在料理的最后阶段使用，也可以先尝基础味道，再按料理的咸淡和质地调整用量，让松露香气自然融入其中。",
    "en-white-truffle-evoo-60ml": "Finish the main cooking first, then add a small amount just before serving or after plating. Warm pasta, eggs or roast potatoes carry the oil’s aroma well, without keeping the seasoning oil over high heat for too long.\n\nThis seasoning works best as a final brushstroke rather than an ingredient added at the beginning. Taste the base dish first, then adjust the amount so its seasoning and texture remain clear and the truffle aroma has room to develop.",
    "zh-white-truffle-evoo-250ml": "主体烹饪完成后，可以在出锅前或装盘后加入少量。温热的意面、炒蛋或烤土豆可以承接油脂香气，调味油不必长时间停留在高温锅中。\n\n这类调味可以放在料理的最后阶段使用，也可以先尝基础味道，再按料理的咸淡和质地调整用量，让松露香气自然融入其中。",
    "en-white-truffle-evoo-250ml": "Finish the main cooking first, then add a small amount just before serving or after plating. Warm pasta, eggs or roast potatoes carry the oil’s aroma well, without keeping the seasoning oil over high heat for too long.\n\nThis seasoning works best as a final brushstroke rather than an ingredient added at the beginning. Taste the base dish first, then adjust the amount so its seasoning and texture remain clear and the truffle aroma has room to develop.",
    "zh-summer-truffle-slices-50g": "取出松露片后，可以直接铺在温热的料理表面，让余温带出香气；也可以切碎后拌入酱汁，使风味更均匀。整片使用时，视觉呈现会更清晰。\n\n如果料理本身已经有奶油、黄油或橄榄油，可以减少其他调味，让松露片成为最后出现的风味重点。切碎后则更适合拌入意面、烩饭或馅料中。",
    "en-summer-truffle-slices-50g": "Place the slices over a warm dish so the residual heat releases their aroma, or chop them into a sauce for a more even distribution. Using the slices whole gives a clearer visual presentation.\n\nWhen the dish already contains cream, butter or olive oil, keep the other seasoning restrained and let the slices become the final flavour focus. Chopped, they work better through pasta, risotto or a filling.",
    "zh-summer-truffle-slices-80g": "取出松露片后，可以直接铺在温热的料理表面，让余温带出香气；也可以切碎后拌入酱汁，使风味更均匀。整片使用时，视觉呈现会更清晰。\n\n如果料理本身已经有奶油、黄油或橄榄油，可以减少其他调味，让松露片成为最后出现的风味重点。切碎后则更适合拌入意面、烩饭或馅料中。",
    "en-summer-truffle-slices-80g": "Place the slices over a warm dish so the residual heat releases their aroma, or chop them into a sauce for a more even distribution. Using the slices whole gives a clearer visual presentation.\n\nWhen the dish already contains cream, butter or olive oil, keep the other seasoning restrained and let the slices become the final flavour focus. Chopped, they work better through pasta, risotto or a filling.",
    "zh-summer-truffle-slices-180g": "取出松露片后，可以直接铺在温热的料理表面，让余温带出香气；也可以切碎后拌入酱汁，使风味更均匀。整片使用时，视觉呈现会更清晰。\n\n如果料理本身已经有奶油、黄油或橄榄油，可以减少其他调味，让松露片成为最后出现的风味重点。切碎后则更适合拌入意面、烩饭或馅料中。",
    "en-summer-truffle-slices-180g": "Place the slices over a warm dish so the residual heat releases their aroma, or chop them into a sauce for a more even distribution. Using the slices whole gives a clearer visual presentation.\n\nWhen the dish already contains cream, butter or olive oil, keep the other seasoning restrained and let the slices become the final flavour focus. Chopped, they work better through pasta, risotto or a filling.",
    "zh-summer-truffle-slices-water-350g": "水浸松露片适合先沥去多余水分，再根据菜式加入油脂或酱汁。这样可以由厨房自行决定整体风味的浓淡，不必让保存液决定成菜的口感。\n\n想保留明显的松露形态时可以使用整片，需要均匀入味时可以切碎。两种处理方式都适合在主体料理完成后进行，让松露风味留在最后的组合里。",
    "en-summer-truffle-slices-water-350g": "Drain the water-preserved slices before adding the oil or sauce that suits the dish. This gives the kitchen control over the final intensity instead of letting the preserving liquid determine the texture.\n\nKeep the slices whole when their shape matters, and chop them when an even distribution is preferred. Both approaches work well after the main dish is cooked, keeping the truffle part of the final assembly.",
    "zh-summer-truffle-slices-oil-350g": "葵花籽油浸松露片可以直接作为热菜或冷盘的最后装饰。整片适合呈现形态，切碎后则可以混入馅料、酱汁或烘焙前的组合中。\n\n使用时不必一次加入太多，可以先让片状松露分布在料理表面，再按需要补充。这样每一口的风味更清楚，摆盘也能保持整洁。",
    "en-summer-truffle-slices-oil-350g": "Sunflower-oil-preserved slices can finish a hot dish or a cold plate directly. Keep them whole when the shape should show, or chop them into a filling, sauce or preparation before baking.\n\nThere is no need to add too much at once. Distribute the slices across the surface first, then add more if needed; this keeps each bite balanced and the presentation clean.",
    "zh-truffle-honey-50g": "松露蜂蜜可以在装盘后使用，不需要再次加热。可以从少量开始，让蜂蜜的甜味与奶酪、烤面包或烤肉的咸鲜味形成对比。\n\n在甜点中，它可以作为最后的点缀，不必覆盖主体风味。少量淋在冰淇淋、奶酪或烤面包上，甜味、油脂感和松露气息会依次出现。",
    "en-truffle-honey-50g": "Truffle honey is best added after plating and does not need to be reheated. Start with a small amount so its sweetness can contrast with the savoury character of cheese, toast or roast meat.\n\nIn desserts, use it as a finishing accent rather than letting it cover the main flavour. A small drizzle over gelato, cheese or toast allows sweetness, richness and truffle aroma to arrive in sequence.",
    "zh-truffle-honey-170g": "松露蜂蜜可以在装盘后使用，不需要再次加热。可以从少量开始，让蜂蜜的甜味与奶酪、烤面包或烤肉的咸鲜味形成对比。\n\n在甜点中，它可以作为最后的点缀，不必覆盖主体风味。少量淋在冰淇淋、奶酪或烤面包上，甜味、油脂感和松露气息会依次出现。",
    "en-truffle-honey-170g": "Truffle honey is best added after plating and does not need to be reheated. Start with a small amount so its sweetness can contrast with the savoury character of cheese, toast or roast meat.\n\nIn desserts, use it as a finishing accent rather than letting it cover the main flavour. A small drizzle over gelato, cheese or toast allows sweetness, richness and truffle aroma to arrive in sequence.",
    "zh-white-truffle-sauce-80g": "白松露酱可以先用少量面水、奶油或黄油调开，再与热的意面或烩饭拌匀。关火后的余温足以完成融合，也更容易保持酱汁的细腻质地。\n\n如果搭配烤面包或主菜，可以先薄薄铺开，再根据食材本身的咸淡调整用量。它适合做成一层清楚的风味，不需要再叠加过多调味。",
    "en-white-truffle-sauce-80g": "Loosen the white truffle sauce with a little pasta water, cream or butter before folding it through hot pasta or risotto. The residual heat after turning off the flame is enough to bring it together while keeping the sauce smooth.\n\nWhen using it with toast or a main dish, spread it in a thin layer and adjust the amount to the seasoning of the food. It works best as a clear layer of flavour without adding too many competing seasonings.",
    "zh-white-truffle-sauce-500g": "白松露酱可以先用少量面水、奶油或黄油调开，再与热的意面或烩饭拌匀。关火后的余温足以完成融合，也更容易保持酱汁的细腻质地。\n\n如果搭配烤面包或主菜，可以先薄薄铺开，再根据食材本身的咸淡调整用量。它适合做成一层清楚的风味，不需要再叠加过多调味。",
    "en-white-truffle-sauce-500g": "Loosen the white truffle sauce with a little pasta water, cream or butter before folding it through hot pasta or risotto. The residual heat after turning off the flame is enough to bring it together while keeping the sauce smooth.\n\nWhen using it with toast or a main dish, spread it in a thin layer and adjust the amount to the seasoning of the food. It works best as a clear layer of flavour without adding too many competing seasonings.",
    "zh-black-truffle-sauce-80g": "黑松露酱适合先在锅中与少量面水或主菜汁液混合，再加入已经煮好的食材。这样酱汁会更均匀地包裹面体或肉类，而不是停留在表面。\n\n由于酱料本身已经有菌菇和橄榄的咸鲜层次，其他调味可以从少量开始。最后保留一点酱汁在表面，能够同时照顾入口的香气和摆盘效果。",
    "en-black-truffle-sauce-80g": "Mix the black truffle sauce with a little pasta water or cooking juices before adding the cooked ingredients. This helps it coat pasta or meat evenly rather than sitting only on the surface.\n\nBecause the sauce already has savoury mushroom and olive depth, start with restrained additional seasoning. Leave a little sauce visible on the surface at the end to support both aroma and presentation.",
    "zh-black-truffle-sauce-180g": "黑松露酱适合先在锅中与少量面水或主菜汁液混合，再加入已经煮好的食材。这样酱汁会更均匀地包裹面体或肉类，而不是停留在表面。\n\n由于酱料本身已经有菌菇和橄榄的咸鲜层次，其他调味可以从少量开始。最后保留一点酱汁在表面，能够同时照顾入口的香气和摆盘效果。",
    "en-black-truffle-sauce-180g": "Mix the black truffle sauce with a little pasta water or cooking juices before adding the cooked ingredients. This helps it coat pasta or meat evenly rather than sitting only on the surface.\n\nBecause the sauce already has savoury mushroom and olive depth, start with restrained additional seasoning. Leave a little sauce visible on the surface at the end to support both aroma and presentation.",
    "zh-black-truffle-sauce-500g": "黑松露酱适合先在锅中与少量面水或主菜汁液混合，再加入已经煮好的食材。这样酱汁会更均匀地包裹面体或肉类，而不是停留在表面。\n\n由于酱料本身已经有菌菇和橄榄的咸鲜层次，其他调味可以从少量开始。最后保留一点酱汁在表面，能够同时照顾入口的香气和摆盘效果。",
    "en-black-truffle-sauce-500g": "Mix the black truffle sauce with a little pasta water or cooking juices before adding the cooked ingredients. This helps it coat pasta or meat evenly rather than sitting only on the surface.\n\nBecause the sauce already has savoury mushroom and olive depth, start with restrained additional seasoning. Leave a little sauce visible on the surface at the end to support both aroma and presentation.",
    "zh-whole-summer-truffles-35g": "需要呈现整颗食材时，可以在最后阶段再切片或刨削，直接落在温热的料理表面。切得薄一些，香气会更容易随着余温展开。\n\n如果希望风味融入酱汁，可以将整颗松露切碎后与黄油、奶油或高汤混合。现场处理的节奏本身也是料理的一部分，适合在装盘时完成最后组合。",
    "en-whole-summer-truffles-35g": "When the ingredient should be seen whole, slice or shave it at the final stage and place it over the warm dish. Thin slices allow the residual heat to open the aroma more easily.\n\nWhen the flavour should run through a sauce, chop the truffle and combine it with butter, cream or stock. The preparation itself becomes part of the service, making the final combination at the plating stage.",
    "zh-whole-summer-truffles-55g": "需要呈现整颗食材时，可以在最后阶段再切片或刨削，直接落在温热的料理表面。切得薄一些，香气会更容易随着余温展开。\n\n如果希望风味融入酱汁，可以将整颗松露切碎后与黄油、奶油或高汤混合。现场处理的节奏本身也是料理的一部分，适合在装盘时完成最后组合。",
    "en-whole-summer-truffles-55g": "When the ingredient should be seen whole, slice or shave it at the final stage and place it over the warm dish. Thin slices allow the residual heat to open the aroma more easily.\n\nWhen the flavour should run through a sauce, chop the truffle and combine it with butter, cream or stock. The preparation itself becomes part of the service, making the final combination at the plating stage.",
    "zh-whole-summer-truffles-110g": "需要呈现整颗食材时，可以在最后阶段再切片或刨削，直接落在温热的料理表面。切得薄一些，香气会更容易随着余温展开。\n\n如果希望风味融入酱汁，可以将整颗松露切碎后与黄油、奶油或高汤混合。现场处理的节奏本身也是料理的一部分，适合在装盘时完成最后组合。",
    "en-whole-summer-truffles-110g": "When the ingredient should be seen whole, slice or shave it at the final stage and place it over the warm dish. Thin slices allow the residual heat to open the aroma more easily.\n\nWhen the flavour should run through a sauce, chop the truffle and combine it with butter, cream or stock. The preparation itself becomes part of the service, making the final combination at the plating stage.",
    "zh-whole-summer-truffles-275g": "需要呈现整颗食材时，可以在最后阶段再切片或刨削，直接落在温热的料理表面。切得薄一些，香气会更容易随着余温展开。\n\n如果希望风味融入酱汁，可以将整颗松露切碎后与黄油、奶油或高汤混合。现场处理的节奏本身也是料理的一部分，适合在装盘时完成最后组合。",
    "en-whole-summer-truffles-275g": "When the ingredient should be seen whole, slice or shave it at the final stage and place it over the warm dish. Thin slices allow the residual heat to open the aroma more easily.\n\nWhen the flavour should run through a sauce, chop the truffle and combine it with butter, cream or stock. The preparation itself becomes part of the service, making the final combination at the plating stage.",
    "zh-winter-black-truffle-sauce-80g": "冬季黑松露酱适合先用少量奶油、黄油或高汤调和，再加入意面、烩饭或肉汁中。逐步调整浓度，比一次加入大量酱料更容易保持风味平衡。\n\n这类复合酱料适合成为料理的底味，再由食材本身补充口感。先让菌菇和松露气息融入酱汁，最后再完成咸淡调整。",
    "en-winter-black-truffle-sauce-80g": "Winter black truffle sauce works well loosened with a little cream, butter or stock before being added to pasta, risotto or a meat sauce. Adjust the concentration gradually rather than adding a large amount at once.\n\nThis type of compound sauce works well as the base of a dish, with the ingredients providing the remaining texture. Let the mushroom and truffle notes blend into the sauce first, then make the final seasoning adjustment.",
    "zh-winter-black-truffle-sauce-180g": "冬季黑松露酱适合先用少量奶油、黄油或高汤调和，再加入意面、烩饭或肉汁中。逐步调整浓度，比一次加入大量酱料更容易保持风味平衡。\n\n这类复合酱料适合成为料理的底味，再由食材本身补充口感。先让菌菇和松露气息融入酱汁，最后再完成咸淡调整。",
    "en-winter-black-truffle-sauce-180g": "Winter black truffle sauce works well loosened with a little cream, butter or stock before being added to pasta, risotto or a meat sauce. Adjust the concentration gradually rather than adding a large amount at once.\n\nThis type of compound sauce works well as the base of a dish, with the ingredients providing the remaining texture. Let the mushroom and truffle notes blend into the sauce first, then make the final seasoning adjustment.",
    "zh-winter-black-truffle-sauce-500g": "冬季黑松露酱适合先用少量奶油、黄油或高汤调和，再加入意面、烩饭或肉汁中。逐步调整浓度，比一次加入大量酱料更容易保持风味平衡。\n\n这类复合酱料适合成为料理的底味，再由食材本身补充口感。先让菌菇和松露气息融入酱汁，最后再完成咸淡调整。",
    "en-winter-black-truffle-sauce-500g": "Winter black truffle sauce works well loosened with a little cream, butter or stock before being added to pasta, risotto or a meat sauce. Adjust the concentration gradually rather than adding a large amount at once.\n\nThis type of compound sauce works well as the base of a dish, with the ingredients providing the remaining texture. Let the mushroom and truffle notes blend into the sauce first, then make the final seasoning adjustment.",
    "zh-winter-black-truffle-juice-350ml": "液体调味汁适合用小量多次加入，先混入高汤、肉汁或酱汁，再根据整体味道调整。这样更容易控制浓度，也能让松露风味均匀分布。\n\n在烩饭或酱汁接近完成时加入，可以把松露风味留在最后的香气层中。搭配黄油、奶油或橄榄油时，整体口感会更加连贯。",
    "en-winter-black-truffle-juice-350ml": "A liquid seasoning is best added in small amounts, mixed into stock, gravy or a sauce, then adjusted to taste. This makes the concentration easier to control and distributes the truffle character evenly.\n\nAdding it near the end of a risotto or sauce keeps the truffle character in the final aromatic layer. Combined with butter, cream or olive oil, it gives the finish a more connected texture.",
    "zh-maccheroncini-di-campofilone-pgi": "出锅后的短暂时间很重要。面条捞出后保留少量面水，立即与酱汁翻拌，让面体在保持轻盈口感的同时完成收汁。",
    "en-maccheroncini-di-campofilone-pgi": "The final moments matter. Reserve a little pasta water, then toss the noodles with the sauce immediately so they finish with a light texture and a well-integrated coating.",
    "zh-linguine-di-campofilone": "出锅后的短暂时间很重要。面条捞出后保留少量面水，立即与酱汁翻拌，让面体在保持轻盈口感的同时完成收汁。",
    "en-linguine-di-campofilone": "The final moments matter. Reserve a little pasta water, then toss the noodles with the sauce immediately so they finish with a light texture and a well-integrated coating.",
    "zh-fettuccine-di-campofilone": "出锅后的短暂时间很重要。面条捞出后保留少量面水，立即与酱汁翻拌，让面体在保持轻盈口感的同时完成收汁。",
    "en-fettuccine-di-campofilone": "The final moments matter. Reserve a little pasta water, then toss the noodles with the sauce immediately so they finish with a light texture and a well-integrated coating.",
    "zh-tagliatelle-di-campofilone": "出锅后的短暂时间很重要。面条捞出后保留少量面水，立即与酱汁翻拌，让面体在保持轻盈口感的同时完成收汁。",
    "en-tagliatelle-di-campofilone": "The final moments matter. Reserve a little pasta water, then toss the noodles with the sauce immediately so they finish with a light texture and a well-integrated coating.",
    "zh-chitarrine-di-campofilone": "出锅后的短暂时间很重要。面条捞出后保留少量面水，立即与酱汁翻拌，让面体在保持轻盈口感的同时完成收汁。",
    "en-chitarrine-di-campofilone": "The final moments matter. Reserve a little pasta water, then toss the noodles with the sauce immediately so they finish with a light texture and a well-integrated coating.",
    "zh-pappardelle-di-campofilone": "出锅后的短暂时间很重要。面条捞出后保留少量面水，立即与酱汁翻拌，让面体在保持轻盈口感的同时完成收汁。",
    "en-pappardelle-di-campofilone": "The final moments matter. Reserve a little pasta water, then toss the noodles with the sauce immediately so they finish with a light texture and a well-integrated coating.",
    "zh-sfoglia-di-campofilone": "出锅后的短暂时间很重要。面条捞出后保留少量面水，立即与酱汁翻拌，让面体在保持轻盈口感的同时完成收汁。",
    "en-sfoglia-di-campofilone": "The final moments matter. Reserve a little pasta water, then toss the noodles with the sauce immediately so they finish with a light texture and a well-integrated coating.",
    "zh-saffron-fettuccine": "宽面更适合在锅中完成最后翻拌，而不是把酱汁单独浇在面上。让面体和酱汁一起收紧，入口时会更连贯。",
    "en-saffron-fettuccine": "Ribbon pasta is best finished in the pan rather than covered with sauce at the table. Let the pasta and sauce come together so the texture feels more connected with each bite.",
    "zh-truffle-fettuccine": "宽面更适合在锅中完成最后翻拌，而不是把酱汁单独浇在面上。让面体和酱汁一起收紧，入口时会更连贯。",
    "en-truffle-fettuccine": "Ribbon pasta is best finished in the pan rather than covered with sauce at the table. Let the pasta and sauce come together so the texture feels more connected with each bite.",
    "zh-porcini-mushroom-fettuccine": "宽面更适合在锅中完成最后翻拌，而不是把酱汁单独浇在面上。让面体和酱汁一起收紧，入口时会更连贯。",
    "en-porcini-mushroom-fettuccine": "Ribbon pasta is best finished in the pan rather than covered with sauce at the table. Let the pasta and sauce come together so the texture feels more connected with each bite.",
    "zh-squid-ink-fettuccine": "宽面更适合在锅中完成最后翻拌，而不是把酱汁单独浇在面上。让面体和酱汁一起收紧，入口时会更连贯。",
    "en-squid-ink-fettuccine": "Ribbon pasta is best finished in the pan rather than covered with sauce at the table. Let the pasta and sauce come together so the texture feels more connected with each bite.",
    "zh-chili-pepper-fettuccine": "宽面更适合在锅中完成最后翻拌，而不是把酱汁单独浇在面上。让面体和酱汁一起收紧，入口时会更连贯。",
    "en-chili-pepper-fettuccine": "Ribbon pasta is best finished in the pan rather than covered with sauce at the table. Let the pasta and sauce come together so the texture feels more connected with each bite.",
    "zh-sage-fettuccine": "宽面更适合在锅中完成最后翻拌，而不是把酱汁单独浇在面上。让面体和酱汁一起收紧，入口时会更连贯。",
    "en-sage-fettuccine": "Ribbon pasta is best finished in the pan rather than covered with sauce at the table. Let the pasta and sauce come together so the texture feels more connected with each bite.",
    "zh-spinach-fettuccine": "宽面更适合在锅中完成最后翻拌，而不是把酱汁单独浇在面上。让面体和酱汁一起收紧，入口时会更连贯。",
    "en-spinach-fettuccine": "Ribbon pasta is best finished in the pan rather than covered with sauce at the table. Let the pasta and sauce come together so the texture feels more connected with each bite.",
    "zh-nettle-fettuccine": "宽面更适合在锅中完成最后翻拌，而不是把酱汁单独浇在面上。让面体和酱汁一起收紧，入口时会更连贯。",
    "en-nettle-fettuccine": "Ribbon pasta is best finished in the pan rather than covered with sauce at the table. Let the pasta and sauce come together so the texture feels more connected with each bite.",
    "zh-lemon-fettuccine": "宽面更适合在锅中完成最后翻拌，而不是把酱汁单独浇在面上。让面体和酱汁一起收紧，入口时会更连贯。",
    "en-lemon-fettuccine": "Ribbon pasta is best finished in the pan rather than covered with sauce at the table. Let the pasta and sauce come together so the texture feels more connected with each bite.",
    "zh-rigatoni": "管状或螺旋面需要让酱汁进入结构之中。翻拌时保留少量面水，可以让酱汁更顺滑，也更容易附着在面体的纹理上。",
    "en-rigatoni": "Tubular and spiral shapes need time for the sauce to enter their structure. A little pasta water during tossing keeps the sauce smooth and helps it cling to the pasta’s texture.",
    "zh-penne-triangolari": "管状或螺旋面需要让酱汁进入结构之中。翻拌时保留少量面水，可以让酱汁更顺滑，也更容易附着在面体的纹理上。",
    "en-penne-triangolari": "Tubular and spiral shapes need time for the sauce to enter their structure. A little pasta water during tossing keeps the sauce smooth and helps it cling to the pasta’s texture.",
    "zh-mezze-maniche": "管状或螺旋面需要让酱汁进入结构之中。翻拌时保留少量面水，可以让酱汁更顺滑，也更容易附着在面体的纹理上。",
    "en-mezze-maniche": "Tubular and spiral shapes need time for the sauce to enter their structure. A little pasta water during tossing keeps the sauce smooth and helps it cling to the pasta’s texture.",
    "zh-fusilloni": "管状或螺旋面需要让酱汁进入结构之中。翻拌时保留少量面水，可以让酱汁更顺滑，也更容易附着在面体的纹理上。",
    "en-fusilloni": "Tubular and spiral shapes need time for the sauce to enter their structure. A little pasta water during tossing keeps the sauce smooth and helps it cling to the pasta’s texture.",
    "zh-spaghetti-ad-archetto": "长面适合在锅中快速翻拌完成，让酱汁均匀包裹面体。关火后再调整咸淡，能够保留面条本身的口感。",
    "en-spaghetti-ad-archetto": "Long pasta is best finished with a quick toss in the pan so the sauce coats the strands evenly. Adjust the seasoning after turning off the heat to keep the pasta’s texture present.",
    "zh-spaghetti-quadrati-ad-archetto": "长面适合在锅中快速翻拌完成，让酱汁均匀包裹面体。关火后再调整咸淡，能够保留面条本身的口感。",
    "en-spaghetti-quadrati-ad-archetto": "Long pasta is best finished with a quick toss in the pan so the sauce coats the strands evenly. Adjust the seasoning after turning off the heat to keep the pasta’s texture present.",
    "zh-bucatini-ad-archetto": "管状或螺旋面需要让酱汁进入结构之中。翻拌时保留少量面水，可以让酱汁更顺滑，也更容易附着在面体的纹理上。",
    "en-bucatini-ad-archetto": "Tubular and spiral shapes need time for the sauce to enter their structure. A little pasta water during tossing keeps the sauce smooth and helps it cling to the pasta’s texture.",
    "zh-truffelixir-dark-chocolate-100ml": "可以先加入少量糖浆，再根据甜点或饮品的基础甜度逐步调整。适合在最后阶段淋用，让颜色和风味都集中在表面。\n\n先让基础风味保持清楚，再用糖浆做最后的收尾。这样不会让甜味过早盖住甜点或饮品本身，也能让松露气息停留在入口之后。",
    "en-truffelixir-dark-chocolate-100ml": "Start with a small amount and adjust according to the sweetness of the dessert or drink. Add it at the final stage so both colour and flavour remain visible on the surface.\n\nKeep the base flavour clear, then use the syrup as a final finish. This prevents the sweetness from covering the dessert or drink too early and lets the truffle note remain after the first taste.",
    "zh-truffelixir-strawberry-100ml": "适合先与冷饮、奶油或乳制品混合，再在表面补少量作为点缀。这样既能形成整体果香，也能保留最后一层松露气息。\n\n先完成主体的果香和甜度，再在表面补少量糖浆。分开这两个步骤，可以让草莓风味更自然，也让最后的松露气息更容易被感知。",
    "en-truffelixir-strawberry-100ml": "Mix it first into a cold drink, cream or dairy-based preparation, then add a small amount on top as a finish. This creates an overall fruit note while keeping a final layer of truffle aroma.\n\nBuild the fruit flavour and sweetness first, then add a small amount on the surface. Keeping the two steps separate makes the strawberry character more natural and the final truffle note easier to notice.",
    "zh-truffelixir-spicy-mango-100ml": "先用少量建立果香和辛香，再根据整体风味决定是否继续增加。它适合用作最后的点缀，让甜、辣和松露气息保持清楚。\n\n如果搭配本身已经有明显甜味或辛香，可以把糖浆放到最后加入。少量分次使用，更容易让果味、辛香和松露气息保持平衡。",
    "en-truffelixir-spicy-mango-100ml": "Use a small amount first to establish the fruit and spice, then decide whether more is needed. It works well as a final accent so the sweet, spicy and truffle notes stay distinct.\n\nIf the pairing already has a clear sweetness or spice, add the syrup at the end. Small additions in stages make it easier to keep the fruit, spice and truffle notes balanced.",
    "zh-truffelixir-pistachio-100ml": "适合在甜点或饮品完成后使用，先让坚果风味成为主体，再用少量糖浆增加尾韵。分次加入比一次加入过多更容易控制。\n\n先让甜点或饮品的坚果风味完成，再用糖浆补充最后一层香气。分次加入可以更好地控制甜度，也能保留不同风味之间的层次。",
    "en-truffelixir-pistachio-100ml": "Use it after finishing a dessert or drink, letting the nutty character lead before adding a small amount for the finish. Adding it in stages is easier to control than adding too much at once.\n\nLet the nutty character of the dessert or drink lead, then use the syrup to add the final aromatic layer. Adding it in stages helps control sweetness and keeps the different flavours distinct.",
    "zh-truffelixir-tamarind-100ml": "可以先将糖浆与饮品或甜点的主体混合，再在表面少量收尾。这样酸甜感不会压过其他风味，松露气息也更有层次。\n\n如果主体已经带有果酸，可以减少糖浆的用量，把它留在表面作为最后的风味提示。这样入口先有酸甜感，之后再出现更深的松露香气。",
    "en-truffelixir-tamarind-100ml": "Mix it into the main drink or dessert first, then use a small amount on the surface as a finish. This keeps the sweet-sour character from overwhelming the other flavours and gives the truffle note more depth.\n\nIf the base already has fruit acidity, use less syrup and keep it on the surface as the final flavour cue. The first impression stays sweet-sour, followed by a deeper truffle aroma.",
    "zh-truffelixir-madagascar-vanilla-100ml": "适合在甜点、饮品或乳制品完成后加入，先用少量观察香草和柠檬的清新感，再决定是否增加松露风味。\n\n香草和柠檬的风味适合保持轻盈，不需要用大量糖浆覆盖主体。最后少量加入，可以让甜香、清新感和松露气息依次出现。",
    "en-truffelixir-madagascar-vanilla-100ml": "Add it after finishing a dessert, drink or dairy-based preparation. Start with a small amount to observe the vanilla and lemon freshness before increasing the truffle character.\n\nKeep the vanilla and lemon notes light rather than covering the base with too much syrup. A small final addition lets sweetness, freshness and truffle character appear in sequence.",
  };
  for (const [id, notes] of Object.entries(productVideoNotes)) products[id].videoNotes = notes;

  const storageImageGroups = {};
  for (const group of ["oil", "syrup", "honey", "sauce", "truffle", "juice", "pasta"]) {
    storageImageGroups[group] = [1, 2, 3, 4].map((index) => {
      const file = `media/products/storage/${group}-${String(index).padStart(2, "0")}`;
      return { src: asset(`${file}.webp`), mobileSrc: asset(`${file}-mobile.webp`) };
    });
  }
  const storageGroups = [
    {"gallery":"oil","ids":["white-truffle-oil-60ml","white-truffle-oil-250ml","white-truffle-evoo-60ml","white-truffle-evoo-250ml"],"zh":"本品应避光、避热保存。使用时按需取用，倒取后及时盖紧瓶盖，并保持瓶口清洁。开封后继续按照上述方式保存，可在料理完成后少量加入。","en":"Store away from light and heat. Take the amount needed for use, close the cap promptly after pouring, and keep the bottle opening clean. After opening, continue to store the oil in the same way. It can be added in a small amount once the dish is finished."},
    {"gallery":"truffle","ids":["summer-truffle-slices-50g","summer-truffle-slices-80g","summer-truffle-slices-180g","summer-truffle-slices-oil-350g"],"zh":"未开封时置于阴凉干燥处保存。开封后需在 2°C–4°C 冷藏保存，使用时按需取用，取用后及时盖紧容器。松露片可以直接用于料理表面，也可以切碎后加入酱汁或馅料。","en":"Before opening, store in a cool, dry place. After opening, refrigerate at 2°C–4°C. Take the amount needed and close the container promptly after use. The slices can be placed directly on a dish or chopped into a sauce or filling."},
    {"gallery":"truffle","ids":["summer-truffle-slices-water-350g"],"zh":"未开封时置于阴凉干燥处保存。开封后需在 2°C–4°C 冷藏保存。使用时可以先取出需要的份量并沥去多余保存液，再按菜式切片或切碎；取用后及时盖紧容器。","en":"Before opening, store in a cool, dry place. After opening, refrigerate at 2°C–4°C. Take out the amount needed and drain off excess preserving liquid before slicing or chopping as required. Close the container promptly after use."},
    {"gallery":"honey","ids":["truffle-honey-50g","truffle-honey-170g"],"zh":"本品应置于阴凉干燥处保存。使用时按需取用，取用后及时盖紧瓶盖，并保持瓶口清洁。可以在奶酪、烤面包、烤肉或甜点装盘后少量加入。","en":"Store in a cool, dry place. Take the amount needed for use, close the cap promptly after opening, and keep the bottle opening clean. It can be added in a small amount after plating cheese, toast, roasted meat or a dessert."},
    {"gallery":"sauce","ids":["white-truffle-sauce-80g","white-truffle-sauce-500g","black-truffle-sauce-80g","black-truffle-sauce-180g","black-truffle-sauce-500g"],"zh":"未开封时置于阴凉干燥处保存。开封后需在 2°C–4°C 冷藏保存，使用时按需取用，取用后及时盖紧容器。酱料可以直接加入热的意面、烩饭或主菜，也可以先用少量面水、奶油、黄油或料理汁液调开。","en":"Before opening, store in a cool, dry place. After opening, refrigerate at 2°C–4°C. Take the amount needed and close the container promptly after use. The sauce can be added directly to hot pasta, risotto or a main dish, or loosened first with a little pasta water, cream, butter or cooking juices."},
    {"gallery":"sauce","ids":["winter-black-truffle-sauce-80g","winter-black-truffle-sauce-180g","winter-black-truffle-sauce-500g"],"zh":"未开封时置于阴凉干燥处保存。开封后需冷藏保存，使用时按需取用，取用后及时盖紧容器。可以先用少量奶油、黄油或高汤调和，再加入意面、烩饭或肉汁中。","en":"Before opening, store in a cool, dry place. Refrigerate after opening. Take the amount needed and close the container promptly after use. It can be loosened with a little cream, butter or stock before being added to pasta, risotto or a meat sauce."},
    {"gallery":"juice","ids":["winter-black-truffle-juice-350ml"],"zh":"未开封时置于阴凉干燥处保存。开封后需冷藏保存，使用时按需取用，取用后及时盖紧瓶盖。可以少量加入高汤、肉汁、酱汁或烩饭中，再根据整体风味调整用量。","en":"Before opening, store in a cool, dry place. Refrigerate after opening. Take the amount needed and close the cap promptly after use. It can be added in small amounts to stock, gravy, sauces or risotto, then adjusted to the overall flavour of the dish."},
    {"gallery":"truffle","ids":["whole-summer-truffles-35g","whole-summer-truffles-55g","whole-summer-truffles-110g","whole-summer-truffles-275g"],"zh":"未开封时置于阴凉干燥处保存。开封后需在 2°C–4°C 冷藏保存。使用时可以按料理需要切片、刨削或切碎，取用后及时盖紧容器。","en":"Before opening, store in a cool, dry place. After opening, refrigerate at 2°C–4°C. Slice, shave or chop the amount needed for the dish, then close the container promptly after use."},
    {"gallery":"pasta","ids":["maccheroncini-di-campofilone-pgi","linguine-di-campofilone","fettuccine-di-campofilone","tagliatelle-di-campofilone","chitarrine-di-campofilone","pappardelle-di-campofilone","sfoglia-di-campofilone","saffron-fettuccine","truffle-fettuccine","porcini-mushroom-fettuccine","squid-ink-fettuccine","chili-pepper-fettuccine","sage-fettuccine","spinach-fettuccine","nettle-fettuccine","lemon-fettuccine","rigatoni","penne-triangolari","mezze-maniche","fusilloni","spaghetti-ad-archetto","spaghetti-quadrati-ad-archetto","bucatini-ad-archetto"],"zh":"本品应置于阴凉干燥处保存，避免光照和潮湿。开封后可以按需取用，剩余面食保持包装封闭并继续放置于干燥处。烹煮时根据包装标示的时间操作，煮好后即可与酱汁翻拌或搭配使用。","en":"Store in a cool, dry place, protected from light and moisture. After opening, take the amount needed and keep the remaining pasta sealed in a dry place. Cook according to the time shown on the packaging, then toss with sauce or serve with the chosen ingredients."},
    {"gallery":"syrup","ids":["truffelixir-dark-chocolate-100ml","truffelixir-strawberry-100ml","truffelixir-spicy-mango-100ml","truffelixir-pistachio-100ml","truffelixir-tamarind-100ml","truffelixir-madagascar-vanilla-100ml"],"zh":"目前产品资料中没有明确列出这组糖浆的保存条件，因此暂不补写“阴凉保存”“冷藏”或具体开封后期限。相关文字需要以产品包装或供应商确认资料为依据。","en":"The current product information does not specify storage conditions for this syrup range. For that reason, no additional wording about cool storage, refrigeration or an after-opening period has been added. Any such wording should be based on the product packaging or confirmed supplier information."},
  ];
  for (const group of storageGroups) {
    for (const id of group.ids) {
      for (const lang of ["zh", "en"]) {
        products[`${lang}-${id}`].storageImages = storageImageGroups[group.gallery];
        products[`${lang}-${id}`].storageNotes = group[lang];
      }
    }
  }

  window.LUXUREAT_PRODUCT_DATA = { images, galleries, products };
})();
