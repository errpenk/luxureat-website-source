(function () {
  const assetBase = new URL("../", document.currentScript?.src || location.href);
  const asset = (path) => new URL(path, assetBase).href;

  window.LUXUREAT_GALLERY_DATA = [
    {
      id: "quattrociocchi-americo-grove", eventId: "quattrociocchi-americo", kind: "video", date: "", sequence: 1,
      collection: {
        zh: { galleryTitle: "从橄榄园到榨油现场 · 意大利", city: "意大利", subtitle: "跟随意大利生产商 Quattrociocchi Americo，观看橄榄采收、压榨与装瓶的过程。" },
        en: { galleryTitle: "From Olive Grove to Olive Mill · Italy", city: "Italy", subtitle: "Follow Italian producer Quattrociocchi Americo through olive harvesting, pressing and bottling." },
      },
      src: asset("media/gallery/quattrociocchi-americo-01-grove.mp4"), poster: asset("media/gallery/quattrociocchi-americo-01-grove-poster.webp"),
      width: 1280, height: 720, zh: { title: "橄榄园与采收" }, en: { title: "Olive Grove & Harvest" },
    },
    { id: "quattrociocchi-americo-mill", eventId: "quattrociocchi-americo", kind: "video", date: "", sequence: 2, src: asset("media/gallery/quattrociocchi-americo-02-mill.mp4"), poster: asset("media/gallery/quattrociocchi-americo-02-mill-poster.webp"), width: 1280, height: 720, zh: { title: "榨油现场" }, en: { title: "At the Olive Mill" } },
    { id: "quattrociocchi-americo-bottling", eventId: "quattrociocchi-americo", kind: "video", date: "", sequence: 3, src: asset("media/gallery/quattrociocchi-americo-03-bottling.mp4"), poster: asset("media/gallery/quattrociocchi-americo-03-bottling-poster.webp"), width: 1280, height: 720, zh: { title: "装瓶与品牌展示" }, en: { title: "Bottling & Brand" } },
    { id: "quattrociocchi-americo-awards", eventId: "quattrociocchi-americo", kind: "video", date: "", sequence: 4, src: asset("media/gallery/quattrociocchi-americo-04-awards.mp4"), poster: asset("media/gallery/quattrociocchi-americo-04-awards-poster.webp"), width: 1280, height: 720, zh: { title: "获奖片段" }, en: { title: "Awards & Recognition" } },
    {
      id: "sial-paris-2026-cooking",
      eventId: "sial-paris-2026",
      kind: "video",
      date: "2026-10-20",
      src: asset("media/events/sial-paris-2026-gallery-01.mp4"),
      poster: asset("media/events/sial-paris-2026-gallery-01.webp"),
      width: 480,
      height: 640,
      zh: { title: "现场烹饪演示" },
      en: { title: "Live cooking demonstration" },
    },
    {
      id: "sial-paris-2026-preparation",
      eventId: "sial-paris-2026",
      kind: "video",
      date: "2026-10-20",
      src: asset("media/events/sial-paris-2026-gallery-02.mp4"),
      poster: asset("media/events/sial-paris-2026-gallery-02.webp"),
      width: 768,
      height: 576,
      zh: { title: "厨师现场制作菜品" },
      en: { title: "Chef preparing a dish" },
    },
    {
      id: "sial-paris-2026-finishing",
      eventId: "sial-paris-2026",
      kind: "video",
      date: "2026-10-20",
      src: asset("media/events/sial-paris-2026-gallery-03.mp4"),
      poster: asset("media/events/sial-paris-2026-gallery-03.webp"),
      width: 768,
      height: 576,
      zh: { title: "菜品调味细节" },
      en: { title: "Finishing touches on a dish" },
    },
    { id: "sial-paris-2026-lazio-stage", eventId: "sial-paris-2026", kind: "photo", date: "2026-10-20", src: asset("media/events/sial-paris-2026-gallery-04.webp"), thumb: asset("media/events/sial-paris-2026-gallery-04-720.webp"), width: 1203, height: 1600, zh: { title: "拉齐奥展区现场交流" }, en: { title: "Conversations at the Lazio pavilion" } },
    { id: "sial-paris-2026-lazio-cooking", eventId: "sial-paris-2026", kind: "photo", date: "2026-10-20", src: asset("media/events/sial-paris-2026-gallery-05.webp"), thumb: asset("media/events/sial-paris-2026-gallery-05-720.webp"), width: 1200, height: 1600, zh: { title: "拉齐奥展区烹饪展示" }, en: { title: "Cooking presentation at the Lazio pavilion" } },
    { id: "sial-paris-2026-lazio-flavours", eventId: "sial-paris-2026", kind: "photo", date: "2026-10-20", src: asset("media/events/sial-paris-2026-gallery-06.webp"), thumb: asset("media/events/sial-paris-2026-gallery-06-720.webp"), width: 1200, height: 1600, zh: { title: "拉齐奥风味现场" }, en: { title: "Lazio flavours on show" } },
    { id: "fhc-shanghai-2026-tasting", eventId: "fhc-shanghai-2026", kind: "photo", date: "2026-11-11", sequence: 1, src: "https://luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-01.webp", thumb: "https://i0.wp.com/luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-01.webp?fit=768%2C576&ssl=1", width: 1440, height: 1080, zh: { title: "展台产品品鉴与交流" }, en: { title: "Product tasting and conversations at the stand" } },
    { id: "fhc-shanghai-2026-stand", eventId: "fhc-shanghai-2026", kind: "photo", date: "2026-11-11", sequence: 2, src: "https://luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-02.webp", thumb: "https://i0.wp.com/luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-02.webp?fit=768%2C1024&ssl=1", width: 1440, height: 1920, zh: { title: "N3A10 展台现场" }, en: { title: "The N3A10 stand" } },
    { id: "fhc-shanghai-2026-visitors", eventId: "fhc-shanghai-2026", kind: "photo", date: "2026-11-11", sequence: 3, src: "https://luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-03.webp", thumb: "https://i0.wp.com/luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-03.webp?fit=768%2C576&ssl=1", width: 1440, height: 1080, zh: { title: "观众了解 TrufflEat 产品" }, en: { title: "Visitors exploring TrufflEat products" } },
    { id: "fhc-shanghai-2026-demonstration", eventId: "fhc-shanghai-2026", kind: "photo", date: "2026-11-11", sequence: 4, src: "https://luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-04.webp", thumb: "https://i0.wp.com/luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-04.webp?fit=768%2C1024&ssl=1", width: 1440, height: 1920, zh: { title: "展台现场试吃演示" }, en: { title: "Live tasting demonstration" } },
    { id: "fhc-shanghai-2026-conversations", eventId: "fhc-shanghai-2026", kind: "photo", date: "2026-11-11", sequence: 5, src: "https://luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-05.webp", thumb: "https://i0.wp.com/luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-05.webp?fit=768%2C576&ssl=1", width: 1440, height: 1080, zh: { title: "与参观者交流意大利风味" }, en: { title: "Sharing Italian flavours with visitors" } },
    { id: "fhc-shanghai-2026-booth-design", eventId: "fhc-shanghai-2026", kind: "photo", date: "2026-11-11", sequence: 6, src: "https://luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-06-live-booth.png", thumb: "https://i0.wp.com/luxureat.cn/wp-content/uploads/2026/11/fhc-shanghai-2026-gallery-06-live-booth.png?fit=768%2C1365&ssl=1", width: 900, height: 1600, zh: { title: "FHC 上海展台实景" }, en: { title: "FHC Shanghai stand on site" } },
  ];
})();
