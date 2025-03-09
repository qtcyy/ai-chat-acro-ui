"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["5508"],{55085:function(e,l,i){i.r(l),i.d(l,{default:()=>h});var t=i(2596),a=i(41271),n=i(17753),s=i(21543),r=i(72752),c=i(62024);let o=[{label:"偏好",location:"appearance"},{label:"账户",location:"account"},{label:"产品信息",location:"info"}],d=(0,c.ZP)(n.E.li)`
  ${e=>e.selected&&(0,c.iv)`
      background: ${e=>{let{theme:l}=e;return l.colors.bubbleUserBg}};
      font-weight: bold;
    `}
  transition: background 100ms ease;
  cursor: pointer;

  &:hover {
    background: ${e=>{let{theme:l}=e;return"dark"===l.mode?"#3C3C3C":"#e5e3d8"}};
  }
`,x=c.ZP.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,p=c.ZP.div`
  margin-top: 50px;

  display: flex;
  flex-direction: row;
  gap: 36px;
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`,f=c.ZP.div`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  padding: 24px;
  flex-direction: row;
  align-items: center;
`,u=c.ZP.div`
  display: flex;
  flex-direction: column;
`,h=()=>{let e=(0,r.TH)(),l=(0,r.s0)();return(0,s.useEffect)(()=>{l("/ai/setting/appearance")},[]),(0,t.jsxs)(u,{children:[(0,t.jsx)(f,{children:(0,t.jsxs)("div",{className:"flex flex-row gap-2 items-center text-2xl font-serif",children:[(0,t.jsx)(a.Z,{}),"设置"]})}),(0,t.jsxs)(p,{children:[(0,t.jsx)("div",{className:"flex-[2]",children:(0,t.jsx)(x,{children:o.map((i,a)=>(0,t.jsx)(d,{selected:e.pathname.endsWith(i.location),className:"px-4 py-3 text-lg rounded-lg",onClick:()=>l("/ai/setting/"+i.location),whileTap:{scale:.9},children:i.label},a))})}),(0,t.jsx)("div",{className:"flex-[8]",children:(0,t.jsx)(r.j3,{})})]})]})}}}]);