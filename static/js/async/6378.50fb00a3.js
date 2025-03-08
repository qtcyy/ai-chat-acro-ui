"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["6378"],{58975:function(e,t,r){r.r(t),r.d(t,{default:()=>g});var o=r(2596),a=r(80233),l=r(21543),n=r(72752),s=r(62024),d=r(81648),c=r(78056),i=r(1731),u=r(59537),p=r.n(u);let f=s.ZP.textarea`
  padding: 8px 12px;
  background-color: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  border-radius: 8px;
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.secondary}};
  height: 90px;
  font-size: 100%;
`,x=s.ZP.input`
  padding: 8px 12px;
  width: 450px;
  background-color: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  font-size: 100%;
  border-radius: 8px;
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.secondary}};
`,m=s.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,h=s.ZP.div`
  padding-top: 10vh;
  display: flex;
  width: 100%;
  height: 100%;
`,g=()=>{let{isDarkMode:e,theme:t}=(0,d.F)(),r=(0,n.s0)(),[s,u]=(0,l.useState)(""),[g,j]=(0,l.useState)(""),{addProject:y}=(0,i.E)(),[v,b]=(0,l.useState)(!1),U=async()=>{b(!0);let e=(0,c.Z)();y({id:e,name:s,description:g,chatIds:[],updateTime:p()().format("YYYY-MM-DD HH:mm:ss"),createTime:p()().format("YYYY-MM-DD HH:mm:ss")}),b(!1),r(`/ai/chat/projects/${e}`)};return(0,o.jsx)(h,{children:(0,o.jsxs)(m,{className:"mx-auto",children:[(0,o.jsx)("div",{className:"text-3xl font-serif",children:"创建一个项目"}),(0,o.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,o.jsx)("div",{className:"text-sm",children:"你想要做什么？"}),(0,o.jsx)(x,{className:"h-11 ",placeholder:"项目名称",value:s,onChange:e=>u(e.target.value)})]}),(0,o.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,o.jsx)("div",{className:"text-sm",children:"你想要达到什么目的？"}),(0,o.jsx)(f,{className:"p-3 resize-none",placeholder:"描述你的使用场景",value:g,onChange:e=>j(e.target.value)})]}),(0,o.jsxs)("div",{className:"flex flex-row gap-4 ml-auto",children:[(0,o.jsx)(a.Z,{style:{backgroundColor:e?"#454545":"",color:t.colors.text},onClick:()=>{r("/ai/chat/projects")},children:"取消"}),(0,o.jsx)(a.Z,{loading:v,type:"primary",onClick:U,children:"创建项目"})]})]})})}},1731:function(e,t,r){r.d(t,{E:()=>n,F:()=>d});var o=r(2596),a=r(21543);let l=(0,a.createContext)({projects:[],addProject:()=>{},updateProject:()=>{},deleteProject:()=>{}}),n=()=>(0,a.useContext)(l),s="ai-chat-projects",d=e=>{let{children:t}=e,[r,n]=(0,a.useState)((()=>{let e=localStorage.getItem(s);return e?JSON.parse(e):(localStorage.setItem(s,JSON.stringify([])),[])})()),d=e=>{localStorage.setItem(s,JSON.stringify(e))};return(0,o.jsx)(l.Provider,{value:{projects:r,addProject:e=>{let t=[...r,e];d(t),n(t)},updateProject:e=>{let t=e(r);d(t),n(t)},deleteProject:e=>{let t=r.filter(t=>t.id!==e);d(t),n(t)}},children:t})}},78056:function(e,t,r){let o;r.d(t,{Z:()=>s});let a={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)},l=new Uint8Array(16),n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));let s=function(e,t,r){var s;if(a.randomUUID&&!t&&!e)return a.randomUUID();let d=(e=e||{}).random??(null===(s=e.rng)||void 0===s?void 0:s.call(e))??function(){if(!o){if("undefined"==typeof crypto||!crypto.getRandomValues)throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");o=crypto.getRandomValues.bind(crypto)}return o(l)}();if(d.length<16)throw Error("Random bytes length must be >= 16");if(d[6]=15&d[6]|64,d[8]=63&d[8]|128,t){if((r=r||0)<0||r+16>t.length)throw RangeError(`UUID byte range ${r}:${r+15} is out of buffer bounds`);for(let e=0;e<16;++e)t[r+e]=d[e];return t}return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase()}(d)}}}]);