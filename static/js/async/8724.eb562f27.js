"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["8724"],{54980:function(e,t,r){r.r(t),r.d(t,{default:()=>P});var l=r(2596),o=r(62024),i=r(80233),a=r(81648),s=r(63475),d=r(21543),c=r(1731),n=r(17753),p=r(72752),x=r(59537),u=r.n(x);let h=o.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
`,m=o.ZP.ul`
  display: flex;
  margin-top: 30px;
  list-style: none;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`,f=(0,o.ZP)(n.E.li)`
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
`,j=o.ZP.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  align-items: center;
`,g=o.ZP.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`,b=o.ZP.input`
  width: 400px;
  padding: 8px 18px 8px 40px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.background}};
  background-color: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
`,v=o.ZP.div`
  position: absolute;
  left: 2%;
  top: 13px;
  scale: 1.2;
`,w=o.ZP.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`,y=(0,o.ZP)(i.Z)`
  background-color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  font-size: 16px;
`,P=()=>{let{isDarkMode:e}=(0,a.F)(),[t,r]=(0,d.useState)(""),o=(0,p.s0)(),{projects:i}=(0,c.E)(),[n,x]=(0,d.useState)(i);return(0,l.jsxs)(j,{children:[(0,l.jsxs)(g,{children:[(0,l.jsx)("div",{className:"text-3xl font-bold",children:"项目"}),(0,l.jsx)("div",{children:(0,l.jsx)(y,{type:"primary",size:"large",onClick:()=>o("/ai/chat/projects/create"),children:"新建项目"})})]}),(0,l.jsx)(w,{children:(0,l.jsxs)("div",{className:"flex flex-row mt-4 relative",children:[(0,l.jsx)(v,{children:(0,l.jsx)(s.Z,{})}),(0,l.jsx)(b,{type:"text",placeholder:"搜索项目",className:"w-[300px] p-2 rounded-md border border-gray-300 px-2 py-3",value:t,onChange:e=>r(e.target.value)})]})}),(0,l.jsx)(m,{children:n.map(e=>{var t;return(0,l.jsxs)(f,{whileTap:{scale:.95},onClick:()=>{o(`/ai/chat/projects/${e.id}`)},children:[(0,l.jsx)("div",{className:"text-lg font-serif",children:e.name}),(0,l.jsx)("div",{className:"mt-1",children:null===(t=e.description)||void 0===t?void 0:t.slice(0,50)}),(0,l.jsxs)(h,{className:"ml-auto mt-auto",children:["更新时间：",u()(e.updateTime).format("MM-DD HH:mm")]})]},e.id)})})]})}},1731:function(e,t,r){r.d(t,{E:()=>a,F:()=>d});var l=r(2596),o=r(21543);let i=(0,o.createContext)({projects:[],addProject:()=>{},updateProject:()=>{},deleteProject:()=>{}}),a=()=>(0,o.useContext)(i),s="ai-chat-projects",d=e=>{let{children:t}=e,[r,a]=(0,o.useState)((()=>{let e=localStorage.getItem(s);return e?JSON.parse(e):(localStorage.setItem(s,JSON.stringify([])),[])})()),d=e=>{localStorage.setItem(s,JSON.stringify(e))};return(0,l.jsx)(i.Provider,{value:{projects:r,addProject:e=>{let t=[...r,e];d(t),a(t)},updateProject:e=>{let t=e(r);d(t),a(t)},deleteProject:e=>{let t=r.filter(t=>t.id!==e);d(t),a(t)}},children:t})}}}]);