(function () {
  const assetBase = new URL("../", document.currentScript?.src || location.href);
  const asset = (path) => new URL(path, assetBase).href;

  window.LUXUREAT_EVENT_DATA = {
    events: [
      {
        id: "marca-china-2026",
        status: "latest",
        image: asset("media/events/marca-china-2026.png"),
        poster: asset("media/events/marca-china-2026-home.jpeg"),
        calendar: asset("marca-china-2026.ics"),
        mapQuery: "广州市海珠区琶洲街道新港东路1000号保利世界贸易中心",
        zh: {
          posterAlt: "Marca China 2026 广州国际自有品牌展海报",
          title: "意大利奢味，广州相见。",
          articleTitle: "LuxurEat 关注 Marca China 2026",
          eyebrow: "最近活动",
          date: "2026年9月8–9日",
          dateIso: "2026.09.08–09",
          location: "广州保利世贸展览馆",
          city: "广州",
          category: "行业展会",
          paragraphs: [
            "2026年9月8日至9日，LuxurEat 将携旗下 TrufflEat、CaviarEat、TinCaviar 等品牌亮相 MARCA CHINA 广州国际自有品牌展。",
            "以纯正意大利风味与全球化供应能力，为买家提供更多可能。"
          ],
          intro: "中国食品市场正向健康化、品质化、地域化与年轻化发展。LuxurEat 将在广州与专业买家及合作伙伴共同探索新的产品与商业机会。",
          sections: [
            ["汇聚行业力量", "2026年9月8日至9日，第五届广州国际自有品牌展 Marca China 将在广州保利世贸展览馆举行。展会预计汇聚约500家参展企业和超过20,000名专业观众，覆盖食品饮料、包装设计、宠物用品及美容个护等多个领域。"],
            ["中国食品市场的新趋势", "从地方特色海产品到天然果汁和低度果酒，本届展会反映出中国食品市场正在向健康化、品质化、地域化和年轻化发展。消费者不仅更加关注产品原料和营养价值，也越来越重视产品的使用场景、文化特色和消费体验。"],
            ["连接品牌与全球市场", "作为连接国际食品品牌、优质生产商与全球市场的平台，LuxurEat 将持续关注中国食品行业的发展，并通过 Marca China 等专业展会寻找新的供应商、产品和商业合作机会，推动高品质食品在中国与国际市场之间的交流。"]
          ],
          quote: "以专业展会为窗口，让高品质食品在中国与国际市场之间建立更清晰、更长久的连接。",
          tagline: "The Luxury of Taste, Made in Italy.",
          closing: "期待与您在广州见面！",
          detail: "查看详情",
          mapTitle: "打开地图导航",
          calendarTitle: "添加到日历"
        },
        en: {
          posterAlt: "Marca China 2026 Private Label Fair Guangzhou poster",
          title: "Italian luxury taste meets Guangzhou.",
          articleTitle: "LuxurEat at Marca China 2026",
          eyebrow: "Recent Event",
          date: "September 8–9, 2026",
          dateIso: "08–09.09.2026",
          location: "Poly World Trade Expo Centre, Guangzhou",
          city: "Guangzhou",
          category: "Trade Fair",
          paragraphs: [
            "On September 8–9, 2026, LuxurEat will present TrufflEat, CaviarEat, TinCaviar, and more at MARCA CHINA Private Label Fair.",
            "With authentic Italian flavor and global supply capability, we bring buyers more possibilities."
          ],
          intro: "China's food market is moving toward healthier, higher-quality, more regional, and younger expressions. In Guangzhou, LuxurEat will explore new products and partnerships with professional buyers and industry partners.",
          sections: [
            ["An industry gathering", "The fifth Marca China Private Label Fair will take place at the Poly World Trade Expo Centre in Guangzhou on September 8–9, 2026. Around 500 exhibitors and more than 20,000 professional visitors are expected across food and beverage, packaging design, pet products, beauty, and personal care."],
            ["New directions in China's food market", "From regional seafood specialties to natural juices and low-alcohol wines, this year's fair reflects a market moving toward health, quality, regional identity, and younger audiences. Consumers increasingly consider not only ingredients and nutrition, but also context, culture, and the overall experience of a product."],
            ["Connecting brands with global markets", "As a bridge between international food brands, quality producers, and global markets, LuxurEat will continue to follow the development of China's food industry. Through professional fairs such as Marca China, we seek new suppliers, products, and commercial partnerships that help high-quality foods move between China and international markets."]
          ],
          quote: "Professional fairs create a clear, lasting connection between high-quality food and markets in China and around the world.",
          tagline: "The Luxury of Taste, Made in Italy.",
          closing: "We look forward to meeting you in Guangzhou.",
          detail: "View details",
          mapTitle: "Open map directions",
          calendarTitle: "Add to calendar"
        }
      }
    ]
  };
})();
