(function () {
  const assetBase = new URL("../", document.currentScript?.src || location.href);
  const asset = (path) => new URL(path, assetBase).href;

  window.LUXUREAT_GALLERY_DATA = [
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
  ];
})();
