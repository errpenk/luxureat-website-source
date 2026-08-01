# Chinese typography sources

## Body — LuxurEat ZhiSong Web

- Original family: LXGW Neo ZhiSong v1.066
- Upstream: https://github.com/lxgw/LxgwNeoZhiSong
- Original font: https://github.com/lxgw/LxgwNeoZhiSong/releases/download/v1.066/LXGWNeoZhiSong.ttf
- License: IPA Font License Agreement 1.0, bundled as `LXGWNeoZhiSong-LICENSE.md`
- Web derivatives: page-specific `LuxurEatZhiSong-<slug>-critical.woff2` files
- Homepage critical subset: `LuxurEatZhiSong-home-subset.woff2` (navigation and first-screen copy; the web subset remains the fallback)

The derivative uses a distinct family and filename. To replace it with the original program, download the original font from the URL above and change the corresponding `@font-face` source in `integration.css`. The web derivative was produced with fontTools by retaining the characters used in `zh/`, `assets/data/`, and `assets/js/`, then generating WOFF2 with all layout features.

## Headlines — KingHwa Old Song

- Supplied file: `/Users/mac/Downloads/京華老宋体v3.0.ttf`
- Embedded family: KingHwa_OldSong / 京華老宋体
- Version: 3.0
- Designer metadata: TerryWang 王廷瑞
- Web subsets: page-specific `KingHwaOldSong-<slug>-critical.woff2` files and `KingHwaOldSong-labels-critical.woff2`
- Homepage subsets: `KingHwaOldSong-home-critical.woff2` and `LuxurEatZhiSong-home-subset.woff2` cover the current static and deferred homepage copy without requesting the full Chinese fonts.
- Inner-page critical subsets: `KingHwaOldSong-<slug>-critical.woff2` and `LuxurEatZhiSong-<slug>-critical.woff2`; each Chinese inner page preloads only its own current typography while the full web subsets remain fallbacks for future copy.

The headline subsets intentionally omit body-copy-only glyphs because body text uses `LuxurEat ZhiSong Web`. Both files retain the original layout tables and WOFF2 compression.
