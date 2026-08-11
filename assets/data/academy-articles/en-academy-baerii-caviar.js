(() => {
  const root = new URL("../../../", document.currentScript?.src || location.href);
  const revive = (value) => {
    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;
    if (Array.isArray(value)) return value.map(revive);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));
    return value;
  };
  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };
  data.articles["en-academy-baerii-caviar"] = revive({"slug":"baerii-caviar","lang":"en","eyebrow":"Caviar Academy","title":"Baerii Caviar","meta":"CAVIAR ACADEMY · 2026","image":"assets/media/academy/baerii-caviar-cover-page-bg.png","intro":"Baerii caviar, obtained from the Acipenser baerii sturgeon, is appreciated for its small grey-brown eggs and delicate flavor with light iodine notes.","opening":["The Baerii sturgeon is one of the fastest-maturing sturgeon species, reaching maturity around 7–8 years, and producing smaller eggs compared to other varieties.","This is the most affordable caviar in our catalog, yet it remains highly appreciated by both chefs and enthusiasts for its quality and distinctive flavor."],"sections":[["Sensory Characteristics of Baerii Caviar",["Species: Acipenser baerii","Color: Shades ranging from light grey to grey-brown","Egg size: approx. 2.9 – 3.0 mm","Sturgeon age: 8 years","Aroma: No strong scents","Texture: Compact eggs with good firmness","Flavor: Delicate aroma with light briny notes"]]],"sectionMedia":[[]],"relatedSlugs":["beluga-caviar","kaluga-amur-caviar","caviar-processing"],"topic":"caviar","topicLabel":"Caviar Academy","column":"Caviar Academy","archive":"Baerii","asideSummary":"A practical introduction to Baerii caviar, from its fast maturation and accessible price to its compact grey-brown eggs and delicate briny character.","wideCover":true,"related":["en-academy-beluga-caviar","en-academy-kaluga-amur-caviar","en-academy-caviar-processing"]});
})();
