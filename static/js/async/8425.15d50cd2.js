"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["8425"],{47652:function(e,t,r){r.r(t),r.d(t,{default:()=>I});var o=r(2596),a=r(62024),i=r(8190),n=r(80233),c=r(81648),l=r(63475),s=r(26765),d=r(89888),p=r(21543),u=r(43857);function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach(function(t){(0,d.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var f=p.forwardRef(function(e,t){var r=(0,p.useContext)(u.P).prefixCls,o=void 0===r?"arco":r,a=e.spin,i=e.className,n=m(m({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(i?i+" ":"").concat(o,"-icon ").concat(o,"-icon-swap")});return a&&(n.className="".concat(n.className," ").concat(o,"-icon-loading")),delete n.spin,delete n.isIcon,p.createElement("svg",(0,s.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},n),p.createElement("path",{d:"M5 17h35.586c.89 0 1.337-1.077.707-1.707L33 7M43 31H7.414c-.89 0-1.337 1.077-.707 1.707L15 41"}))});f.defaultProps={isIcon:!0},f.displayName="IconSwap";var h=r(1731),g=r(17753),b=r(72752),j=r(59537),v=r.n(j),w=r(72517),y=r(61802);let P=a.ZP.button`
  padding: 12px;
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  border-radius: 12px;
  transition: background 200ms ease;
  cursor: pointer;

  &:hover {
    background: ${e=>{let{theme:t}=e;return"dark"===t.mode?"#4f4f5d":"#dfdbdb"}};
  }
`,O=a.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
`,k=a.ZP.ul`
  display: flex;
  margin-top: 30px;
  list-style: none;
  flex-wrap: wrap;
  width: 100%;

  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
`,N=(0,a.ZP)(g.E.li)`
  display: flex;
  flex-direction: column;
  width: calc((100% - 16px) / 2);
  padding: 24px;
  border: 1px solid
    ${e=>{let{theme:t}=e;return"dark"===t.mode?"#a6a39a":"rgba(0, 0.1, 0.1, 0.3)"}};
  margin-bottom: 16px;
  border-radius: 24px;
  &:hover {
    background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
    box-shadow: ${e=>{let{theme:t}=e;return t.colors.boxShadow}};
  }
  cursor: pointer;
`,Z=a.ZP.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  align-items: center;
`,S=a.ZP.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`,C=a.ZP.input`
  width: 400px;
  padding: 8px 18px 8px 40px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.background}};
  background-color: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
`,$=a.ZP.div`
  position: absolute;
  left: 2%;
  top: 13px;
  scale: 1.2;
`,E=a.ZP.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
`,D=(0,a.ZP)(n.Z)`
  background-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  font-size: 16px;
`,I=()=>{let{isDarkMode:e}=(0,c.F)(),[t,r]=(0,p.useState)(""),a=(0,b.s0)(),{projects:n}=(0,h.E)(),[s,d]=(0,p.useState)("create"),u=()=>"active"===s?n.sort((e,t)=>v()(e.updateTime).isAfter(v()(t.updateTime))?-1:1):"create"===s?n.sort((e,t)=>v()(e.createTime).isAfter(v()(t.createTime))?-1:1):[],[x,m]=(0,p.useState)(u()),g=async()=>{if(!t.trim()){m(u());return}m(e=>e.filter(e=>e.name.toLowerCase().includes(t.toLowerCase())))},{run:j,loading:I}=(0,w.Z)(g,{debounceWait:200,manual:!0});return(0,y.Z)(()=>{m(u())},[s]),(0,y.Z)(()=>{j()},[t]),(0,o.jsxs)(Z,{children:[(0,o.jsxs)(S,{children:[(0,o.jsx)("div",{className:"text-3xl font-bold",children:"项目"}),(0,o.jsx)("div",{children:(0,o.jsx)(D,{type:"primary",size:"large",onClick:()=>a("/ai/chat/projects/create"),children:"新建项目"})})]}),(0,o.jsxs)(E,{children:[(0,o.jsxs)("div",{className:"flex flex-row mt-4 relative",children:[(0,o.jsx)($,{children:(0,o.jsx)(l.Z,{})}),(0,o.jsx)(C,{type:"text",placeholder:"搜索项目",className:"w-[300px] p-2 rounded-md border border-gray-300 px-2 py-3",value:t,onChange:e=>r(e.target.value)})]}),(0,o.jsxs)("div",{className:"ml-auto flex flex-row gap-4",children:[(0,o.jsx)("div",{className:"rotate-90 text-lg",children:(0,o.jsx)(f,{})}),(0,o.jsx)(P,{className:"font-bold",onClick:()=>d(e=>"active"===e?"create":"active"),children:"active"===s?"最近活动":"最近创建"})]})]}),(0,o.jsx)(i.Z,{loading:I,dot:!0,className:"w-full",children:(0,o.jsx)(k,{children:x.map(e=>{var t;return(0,o.jsxs)(N,{whileTap:{scale:.95},onClick:()=>{a(`/ai/chat/projects/${e.id}`)},children:[(0,o.jsx)("div",{className:"text-lg font-serif",children:e.name}),(0,o.jsx)("div",{className:"mt-1",children:null===(t=e.description)||void 0===t?void 0:t.slice(0,50)}),(0,o.jsxs)(O,{className:"ml-auto mt-auto",children:["更新时间：",v()(e.updateTime).format("MM-DD HH:mm")]})]},e.id)})})})]})}},1731:function(e,t,r){r.d(t,{E:()=>n,F:()=>l});var o=r(2596),a=r(21543);let i=(0,a.createContext)({projects:[],addProject:()=>{},updateProject:()=>{},deleteProject:()=>{}}),n=()=>(0,a.useContext)(i),c="ai-chat-projects",l=e=>{let{children:t}=e,[r,n]=(0,a.useState)((()=>{let e=localStorage.getItem(c);return e?JSON.parse(e):(localStorage.setItem(c,JSON.stringify([])),[])})()),l=e=>{localStorage.setItem(c,JSON.stringify(e))};return(0,o.jsx)(i.Provider,{value:{projects:r,addProject:e=>{let t=[...r,e];l(t),n(t)},updateProject:e=>{let t=e(r);l(t),n(t)},deleteProject:e=>{let t=r.filter(t=>t.id!==e);l(t),n(t)}},children:t})}}}]);