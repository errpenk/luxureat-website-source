const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('assets/js/import-export.js','utf8');
const start=source.indexOf('  if (("IntersectionObserver" in window) && !reducedMotion) document.querySelectorAll("#sourcing-export');
const end=source.indexOf('  document.querySelectorAll(".lux-flip-orbit")',start);
assert(start>=0&&end>start);
const core=fs.readFileSync('assets/js/core.js','utf8');
const coreStart=core.indexOf('function initLuxSectionFlips()');
const coreEnd=core.indexOf('document.addEventListener("DOMContentLoaded"',coreStart);
const runtimes=[source.slice(start,end),core.slice(coreStart,coreEnd)+'\ninitLuxSectionFlips();'];
function visit(runtime) {
  const observers=[], handlers=[], pending=new Map();let scheduled=0;
  const cards=Array.from({length:3},()=>({classList:{add(){},remove(){}},setAttribute(){},addEventListener(){}}));
  const group={querySelectorAll:()=>cards};
  class Observer { constructor(callback){this.callback=callback;observers.push(this)} observe(){} unobserve(){} }
  const setTimer=(callback)=>{pending.set(++scheduled,callback);return scheduled};
  const clearTimer=id=>pending.delete(id);
  vm.runInNewContext(runtime,{
    window:{IntersectionObserver:Observer,matchMedia:()=>({matches:false}),setTimeout:setTimer,clearTimeout:clearTimer},IntersectionObserver:Observer,reducedMotion:false,
    document:{querySelectorAll:()=>[group]},addEventListener:(type,callback)=>{assert.equal(type,'pageshow');handlers.push(callback)},
    setTimeout:setTimer,clearTimeout:clearTimer,
  });
  const enter=()=>observers[0].callback([{isIntersecting:true}]);
  const leave=()=>observers[0].callback([{isIntersecting:false}]);
  enter();assert.equal(scheduled,6);
  [...pending.values()].forEach(callback=>callback());
  leave();enter();assert.equal(scheduled,6,'Scrolling back must not repeat the auto-flip');
  handlers.forEach(callback=>callback({persisted:false}));enter();assert.equal(scheduled,6);
  handlers.forEach(callback=>callback({persisted:true}));enter();assert.equal(scheduled,12,'Returning from BFCache must allow one new demonstration');
}
for(const runtime of runtimes) { visit(runtime);visit(runtime); }
for(const lang of ['zh','en']) {
  const html=fs.readFileSync(`${lang}/import-export-services.html`,'utf8');
  assert(!html.includes('class="lux-catalogue-title"'),'Brochure heading is removed');
  assert(!html.includes('aria-labelledby="catalogues-title"'),'No dangling brochure heading reference');
  assert(html.includes('class="lux-catalogue-reader"')||html.includes('data-catalogue'),'Brochure content is retained');
}
console.log('Service auto-flips run once per visit, reset on Back navigation and retain brochure content.');
