import{e as c,A as C,d as K,f as _,R as b,r as d,g as P,h as u,o as S,i as j,w as s,j as V,u as z,k as I}from"./index-03af7a8b.js";import{_ as H}from"./_plugin-vue_export-helper-c27b6911.js";var M={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M553.1 509.1l-77.8 99.2-41.1-52.4a8 8 0 00-12.6 0l-99.8 127.2a7.98 7.98 0 006.3 12.9H696c6.7 0 10.4-7.7 6.3-12.9l-136.5-174a8.1 8.1 0 00-12.7 0zM360 442a40 40 0 1080 0 40 40 0 10-80 0zm494.6-153.4L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"}}]},name:"file-image",theme:"outlined"};const F=M;function w(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?Object(arguments[e]):{},a=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(a=a.concat(Object.getOwnPropertySymbols(t).filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable}))),a.forEach(function(o){R(n,o,t[o])})}return n}function R(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var g=function(e,t){var a=w({},e,t.attrs);return c(C,w({},a,{icon:F}),null)};g.displayName="FileImageOutlined";g.inheritAttrs=!1;const L=g;var $={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v576c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM712 792H136V232h576v560zm176-167l-104-59.8V458.9L888 399v226zM208 360h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H208c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"}}]},name:"video-camera",theme:"outlined"};const A=$;function x(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?Object(arguments[e]):{},a=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(a=a.concat(Object.getOwnPropertySymbols(t).filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable}))),a.forEach(function(o){B(n,o,t[o])})}return n}function B(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var y=function(e,t){var a=x({},e,t.attrs);return c(C,x({},a,{icon:A}),null)};y.displayName="VideoCameraOutlined";y.inheritAttrs=!1;const D=y,E=K({__name:"index",setup(n){function e(r,l,f,m,p){return{key:l,icon:f,children:m,label:r,type:p}}const t=_([e("图片",b.User,()=>V(L)),e("视频",b.Video,()=>V(D))]);_({selectedKeys:["/home"],openKey:["/home"]});const a=_({selectedKeys:[d.currentRoute.value.path],openKey:[d.currentRoute.value.path]}),o=r=>{d.push({path:r.selectedKeys[0]}),a.selectedKeys=r.selectedKeys,a.openKey=r.openKeys},k=r=>{d.push({path:r.key})};document.onkeydown=document.onkeyup=document.onkeypress=function(r){var l=r||window.event||arguments.callee.caller.arguments[0];if(l&&l.keyCode==123)return l.returnValue=!1,!1},document.oncontextmenu=function(r){r.preventDefault()};let i=P(!1);return(r,l)=>{const f=u("a-menu"),m=u("a-layout-sider"),p=u("router-view"),v=u("a-layout-content"),h=u("a-layout");return S(),j(h,null,{default:s(()=>[c(v,null,{default:s(()=>[c(h,{style:{background:"#ffffff"}},{default:s(()=>[c(m,{style:{background:"#ffffff"},collapsed:z(i),"onUpdate:collapsed":l[0]||(l[0]=O=>I(i)?i.value=O:i=O),breakpoint:"lg",collapsible:""},{default:s(()=>[c(f,{theme:"dark",style:{height:"100%",borderRight:0},items:t,selectedKeys:a.selectedKeys,openKeys:a.openKey,mode:"inline",onSelect:o,onClick:k},null,8,["items","selectedKeys","openKeys"])]),_:1},8,["collapsed"]),c(v,{style:{background:"#fff",margin:"10px",minHeight:"280px"}},{default:s(()=>[c(p)]),_:1})]),_:1})]),_:1})]),_:1})}}});const q=H(E,[["__scopeId","data-v-1a7a88e3"]]);export{q as default};