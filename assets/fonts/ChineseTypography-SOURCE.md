# Chinese typography sources

## Body — LuxurEat ZhiSong Web

- Original family: LXGW Neo ZhiSong v1.066
- Upstream: https://github.com/lxgw/LxgwNeoZhiSong
- Original font: https://github.com/lxgw/LxgwNeoZhiSong/releases/download/v1.066/LXGWNeoZhiSong.ttf
- License: IPA Font License Agreement 1.0, bundled as `LXGWNeoZhiSong-LICENSE.md`
- Site-wide web derivative: `LuxurEatZhiSong-site.woff2`
- Homepage critical subset: `LuxurEatZhiSong-home-subset.woff2` (navigation and first-screen copy; the web subset remains the fallback)

The derivative uses a distinct family and filename. To replace it with the original program, download the original font from the URL above and change the corresponding `@font-face` source in `integration.css`. The web derivative was produced with fontTools by retaining the characters used in `zh/`, `assets/data/`, and `assets/js/`, then generating WOFF2 with all layout features.

## Headlines — KingHwa Old Song

- Supplied file: `/Users/mac/Downloads/京華老宋体v3.0.ttf`
- Embedded family: KingHwa_OldSong / 京華老宋体
- Version: 3.0
- Designer metadata: TerryWang 王廷瑞
- Site-wide web derivative: `KingHwaOldSong-site.woff2`
- Site-wide Chinese coverage manifest: `KingHwaOldSong-site-glyphs.txt`. It contains every Chinese glyph and Chinese punctuation mark used by static pages and dynamic content. Keep the manifest and both site-wide WOFF2 files in sync whenever Chinese copy changes.
- Homepage subsets: `KingHwaOldSong-home-critical.woff2` and `LuxurEatZhiSong-home-subset.woff2` cover the current static and deferred homepage copy without requesting the full Chinese fonts.
- Inner-page critical subsets: `KingHwaOldSong-<slug>-critical.woff2` and `LuxurEatZhiSong-<slug>-critical.woff2`; each Chinese inner page preloads only its own current typography while the full web subsets remain fallbacks for future copy.

## Production delivery

- Every Chinese page preloads the two site-wide WOFF2 derivatives. Each contains every Chinese character used anywhere in the current static or dynamic site, so neither heading nor body text can fall back per character to the other family or to a device font.
- Regenerate both site-wide derivatives whenever new Chinese copy is added; serving either source TTF directly is intentionally avoided.
- Run `npm run check` after changing Chinese copy. The content-architecture check scans all Chinese source text, compares it with the coverage manifest, and rejects unapproved text-font declarations.

Both files retain the original layout tables and WOFF2 compression.
