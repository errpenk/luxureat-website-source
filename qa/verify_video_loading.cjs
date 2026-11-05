const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const core = fs.readFileSync('assets/js/core.js', 'utf8');
const observers = [];
class Observer {
  constructor(callback, options) { this.callback=callback; this.options=options; observers.push(this); }
  observe(target) { (this.targets ||= []).push(target); } unobserve() {}
}
const source = {dataset:{src:'video.mp4'}};
const events = {};
const video = {
  dataset:{}, isConnected:true, loads:0, plays:0, pauses:0,
  querySelectorAll:()=>source.dataset.src ? [source] : [],
  load() { this.loads++; }, play() { this.plays++; return Promise.resolve(); },
  pause() { this.pauses++; }, matches:()=>false,
  removeAttribute() {}, setAttribute() {},
  addEventListener:(event, callback)=>{events[event]=callback},
};
const context = vm.createContext({IntersectionObserver:Observer, window:{IntersectionObserver:Observer}, luxSaveData:false, luxIsMobile:false,video,Promise});
vm.runInContext(core.slice(core.indexOf('const prepareLuxVideo'),core.indexOf('const luxAutoplaySelector')), context);
vm.runInContext('initLuxVideo(video)', context);
assert.equal(video.loads,0,'Offscreen videos must not request their source');
assert.equal(video.plays,0);
observers[1].callback([{target:video,isIntersecting:true}],observers[1]);
assert.equal(video.loads,1,'Nearby videos load their source once');
assert.equal(source.src,'video.mp4');
assert.equal(video.preload,'metadata');
events.loadeddata();
assert.equal(video.plays,0,'Preloaded videos must stay paused offscreen');
observers[0].callback([{target:video,isIntersecting:true}]);
assert.equal(video.loads,1);
assert.equal(video.plays,1,'Visible videos autoplay');
observers[0].callback([{target:video,isIntersecting:false}]);
events.canplay();
assert.equal(video.pauses,1);
assert.equal(video.plays,1,'Delayed media events must not restart offscreen playback');
const hero = {...video, dataset:{}, matches:()=>true, loads:0, plays:0};
let onLoad;
context.hero=hero;
context.document={readyState:'loading'};
context.addEventListener=(name, callback)=>{assert.equal(name,'load');onLoad=callback};
vm.runInContext('initLuxVideo(hero)',context);
assert(!observers[0].targets.includes(hero),'Hero must not compete with first-screen loading');
assert.equal(hero.loads,0);
onLoad();
assert(observers[0].targets.includes(hero),'After page load, hero playback follows viewport visibility');
assert.equal(hero.loads,0,'An offscreen hero still must not load');
for (const mode of [{luxIsMobile:true,luxSaveData:false}, {luxIsMobile:false,luxSaveData:true}]) {
  const offset = observers.length;
  const deferredSource = {dataset:{src:'mobile-video.mp4'}};
  const deferredVideo = {...video, dataset:{}, loads:0, plays:0, querySelectorAll:()=>deferredSource.dataset.src ? [deferredSource] : []};
  const limitedContext = vm.createContext({IntersectionObserver:Observer, window:{IntersectionObserver:Observer}, ...mode, video:deferredVideo, Promise});
  vm.runInContext(core.slice(core.indexOf('const prepareLuxVideo'),core.indexOf('const luxAutoplaySelector')), limitedContext);
  vm.runInContext('initLuxVideo(video)',limitedContext);
  assert.equal(observers[offset+1].targets?.length || 0,0,'Mobile and data-saver videos must not preload offscreen');
  assert.equal(deferredVideo.loads,0);
  observers[offset].callback([{target:deferredVideo,isIntersecting:true}]);
  assert.equal(deferredVideo.loads,1,'Visible mobile videos must still load');
  assert.equal(deferredVideo.plays,1,'Visible mobile videos must still play');
}
for(const lang of ['zh','en']) {
  for(const file of fs.readdirSync(lang).filter(f=>f.endsWith('.html'))) {
    const html=fs.readFileSync(`${lang}/${file}`,'utf8');
    for(const block of html.matchAll(/<video\b[\s\S]*?<\/video>/g)) {
      if(!block[0].includes('data-lux-autoplay'))continue;
      assert(!/\ssrc=|\sautoplay(?:\s|>)/.test(block[0]),`${lang}/${file}: eager autoplay video`);
    }
    assert.equal((html.match(/class="lux-with-icon" data-footer-modal="(?:privacy|cookie|terms|shipping)"><svg/g)||[]).length,4,`${lang}/${file}: footer icons must exist in HTML`);
    assert.match(html,/<a[^>]+aria-current="page"/);
  }
}
console.log('Video lazy transfer, visibility playback and immediate footer icons passed.');
