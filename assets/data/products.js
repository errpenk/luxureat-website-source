(() => {
  const assetBase = new URL("../", document.currentScript?.src || location.href);
  const asset = (path) => new URL(path, assetBase).href;

  const images = {
    beluga: asset("images/lux-005.jpg"),
    oscetra: asset("images/lux-030.jpg"),
    spoon: asset("images/lux-022.jpg"),
    champagne: asset("images/lux-042.jpg"),
    ice: asset("images/lux-039.jpg"),
    truffle: asset("images/lux-026.jpg"),
  };
  const galleries = {
    beluga: [
      images.beluga,
      asset("images/lux-034.jpg"),
      asset("images/lux-010.jpg"),
      asset("images/lux-041.jpg"),
    ],
    oscetra: [images.oscetra, images.beluga, images.truffle],
    spoon: [images.spoon, images.beluga, asset("images/lux-018.jpg")],
    champagne: [images.champagne, images.beluga],
    ice: [images.ice, images.champagne, images.spoon],
    truffle: [images.truffle, images.oscetra],
  };
  const products = {
    "zh-imperial-beluga": { title: "至臻帝王鲟鱼子酱", eyebrow: "Rare Harvest", desc: "源自帝王鲟的银灰色大颗粒，入口即化，呈现奶油、海洋与矿物的长尾。", unit: "30G", image: images.beluga, id: "imperial-beluga-30g", subtitle: "Imperial Beluga / 30g", currency: "¥", amount: 2480, specs: ["Huso Huso", "3.2 - 3.5 MM", "Pearl Grey", "奶油/海洋/矿物"] },
    "zh-royal-oscetra": { title: "皇家奥西特拉鱼子酱", eyebrow: "Nutty Reserve", desc: "金棕色鱼子带来紧实颗粒感与烘焙坚果香，是进阶品鉴与商务宴请的稳妥选择。", unit: "30G", image: images.oscetra, id: "royal-oscetra-30g", subtitle: "Royal Oscetra / 30g", currency: "¥", amount: 1280, specs: ["Acipenser Gueldenstaedtii", "2.8 - 3.1 MM", "Amber Gold", "坚果/黄油/海盐"] },
    "zh-mother-of-pearl": { title: "手工打磨珍珠母贝匙", eyebrow: "Service Ware", desc: "非金属贝母材质避免氧化味，保护鱼子酱最细腻的乳香与矿物尾韵。", unit: "Set", image: images.spoon, id: "zh-spoons", subtitle: "经典对装", currency: "¥", amount: 1280, specs: ["Mother-of-Pearl", "Pair Set", "Hand Polished", "无金属气味"] },
    "zh-champagne": { title: "Krug 陈年香槟", eyebrow: "Pairing", desc: "以明亮酸度和细腻气泡刷新味蕾，适合作为鱼子酱品鉴的经典搭配。", unit: "Bottle", image: images.champagne, id: "zh-champagne", subtitle: "Grand Cuvée 171ème Édition", currency: "¥", amount: 2850, specs: ["Brut", "Grand Cuvée", "Chilled", "酸度/气泡/清爽"] },
    "zh-ice-server": { title: "现代主义银质冰镇座", eyebrow: "Service Ware", desc: "双层冰镇结构稳定开罐后的服务温度，让鱼子酱保持清晰弹性。", unit: "Piece", image: images.ice, id: "zh-ice-server", subtitle: "纯银工艺", currency: "¥", amount: 12400, specs: ["Silver", "Double Wall", "Crushed Ice", "稳定温控"] },
    "en-imperial-beluga": { title: "Imperial Beluga Caviar", eyebrow: "Rare Harvest", desc: "Large steel-grey pearls from Huso Huso sturgeon, with a creamy finish and long oceanic minerality.", unit: "30G", image: images.beluga, id: "imperial-beluga-30g", subtitle: "Maison Reserve / 30g", currency: "$", amount: 350, specs: ["Huso Huso", "3.2 - 3.5 MM", "Pearl Grey", "Cream / Ocean / Mineral"] },
    "en-royal-oscetra": { title: "Royal Oscetra Caviar", eyebrow: "Nutty Reserve", desc: "Golden-brown pearls with firm texture, toasted nut complexity, and a long savory finish.", unit: "30G", image: images.oscetra, id: "royal-oscetra-30g", subtitle: "Royal Oscetra / 30g", currency: "$", amount: 180, specs: ["Acipenser Gueldenstaedtii", "2.8 - 3.1 MM", "Amber Gold", "Nut / Butter / Sea Salt"] },
    "en-mother-of-pearl": { title: "Mother-of-Pearl Spoon", eyebrow: "Service Ware", desc: "A non-reactive spoon that preserves the roe's clean flavor without metallic notes.", unit: "Set", image: images.spoon, id: "en-spoons", subtitle: "Hand-Crafted / Artisan", currency: "$", amount: 45, specs: ["Mother-of-Pearl", "Pair Set", "Hand Polished", "No Metallic Note"] },
    "en-champagne": { title: "Maison Vintage Brut", eyebrow: "Pairing", desc: "Bright acidity and fine bubbles refresh the palate between rich caviar tastings.", unit: "Bottle", image: images.champagne, id: "en-champagne", subtitle: "Grand Cru / 2012", currency: "$", amount: 320, specs: ["Brut", "Grand Cru", "Chilled", "Acidity / Bubbles"] },
    "en-truffle": { title: "Truffle Pairing Set", eyebrow: "Pairing", desc: "A dark, aromatic pairing set for menus that extend beyond the first spoon of caviar.", unit: "Set", image: images.truffle, id: "en-truffle-set", subtitle: "Winter Black / White Alba", currency: "$", amount: 185, specs: ["Winter Black", "White Alba", "Gift Set", "Aromatic Finish"] },
  };

  window.LUXUREAT_PRODUCT_DATA = { images, galleries, products };
})();
