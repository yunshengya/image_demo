import{d as b,s as M,a,o as $,B as C,b as l,c,n as I,C as x,F as k,z as S,e as h,g as z}from"./index-af1dcbf1.js";import{_ as B}from"./_plugin-vue_export-helper-c27b6911.js";const E={class:"box"},L=["src","alt"],N=b({__name:"image",setup(O){const d=M(),m=a([]),v=a(""),i=a(""),f=()=>{for(let e=0;e<10;e++){const t=100+Math.floor(Math.random()*100),r=100+Math.floor(Math.random()*100),n=Math.random().toString(36).substring(7),y=i.value?`${i.value}&rand=${n}`:`width=${t}&height=${r}&rand=${n}`,w={src:`${v.value}?${y}`,width:t,height:r};m.value.push(w)}},s=a(null);let _=a(!0),o=null;const g=a(3),u=()=>{var t;const e=((t=document.querySelector(".box"))==null?void 0:t.clientWidth)||window.innerWidth;g.value=Math.floor(e/300)},p=()=>{s.value&&(o=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&f()})},{threshold:1}),o.observe(s.value))};return $(async()=>{await d.isReady();let e=JSON.parse(d.currentRoute.value.query.app);v.value=e.getImage,e!=null&&e.params&&(i.value=e.params),_.value=!1,f(),p(),u(),window.addEventListener("resize",u)}),C(()=>{o&&s.value&&o.unobserve(s.value),window.removeEventListener("resize",u)}),(e,t)=>(l(),c("div",E,[I(_)?z("",!0):(l(),c("div",{key:0,class:"masonry",style:x({columnCount:g.value})},[(l(!0),c(k,null,S(m.value,(r,n)=>(l(),c("div",{key:n,class:"masonry-item"},[h("img",{src:r.src,alt:`Image ${n}`},null,8,L)]))),128))],4)),h("div",{ref_key:"loading",ref:s,class:"loading"},"加载中...",512)]))}});const W=B(N,[["__scopeId","data-v-04cdf80f"]]);export{W as default};