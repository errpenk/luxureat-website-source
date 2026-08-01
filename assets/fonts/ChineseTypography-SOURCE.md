# Chinese typography sources

## Body — LuxurEat ZhiSong Web

- Original family: LXGW Neo ZhiSong v1.066
- Upstream: https://github.com/lxgw/LxgwNeoZhiSong
- Original font: https://github.com/lxgw/LxgwNeoZhiSong/releases/download/v1.066/LXGWNeoZhiSong.ttf
- License: IPA Font License Agreement 1.0, bundled as `LXGWNeoZhiSong-LICENSE.md`
- Web derivative: `LuxurEatZhiSongWeb-subset.woff2`

The derivative uses a distinct family and filename. To replace it with the original program, download the original font from the URL above and change the corresponding `@font-face` source in `integration.css`. The web derivative was produced with fontTools by retaining the characters used in `zh/`, `assets/data/`, and `assets/js/`, then generating WOFF2 with all layout features.

## Headlines — KingHwa Old Song

- Supplied file: `/Users/mac/Downloads/京華老宋体v3.0.ttf`
- Embedded family: KingHwa_OldSong / 京華老宋体
- Version: 3.0
- Designer metadata: TerryWang 王廷瑞
- Web subset: `KingHwaOldSong-subset.woff2` (site headings, short UI labels, and dynamic content titles)
- Homepage subset: `KingHwaOldSong-home-subset.woff2` (homepage headings and first-screen UI only; the web subset remains the reader fallback)

The headline subsets intentionally omit body-copy-only glyphs because body text uses `LuxurEat ZhiSong Web`. Both files retain the original layout tables and WOFF2 compression.
