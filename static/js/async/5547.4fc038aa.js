"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["5547"],{64432:function(e,t,r){r.d(t,{p:()=>c});var o=r(2596),a=r(8007),n=r(3390);let c=n.ZP.create(()=>{let e=n.ZP.useModal(),t=()=>{e.hide(),setTimeout(()=>{e.remove()},300)};return(0,o.jsx)(a.Z,{visible:e.visible,onCancel:t,onConfirm:()=>{e.resolve(!0),t()},title:(0,o.jsx)("div",{className:"w-full flex text-xl",children:"永久删除会话"}),children:"本条会话数据将被永久删除，不可恢复及撤销。确定要删除吗？"})})},78171:function(e,t,r){r.r(t),r.d(t,{default:()=>Z});var o=r(2596),a=r(72752),n=r(45527),c=r(62024),i=r(21543),s=r(59537),l=r.n(s),d=r(63475),u=r(96212),h=r(26879),f=r(3390),p=r(82297),m=r(64432),y=r(17753),g=r(77276),x=r(81648),v=r(71576),b=r(8190);let w=c.ZP.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,j=(0,c.ZP)(y.E.div)`
  padding: 16px 24px;
  background: ${e=>e.theme.colors.componentBg};
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-size: 18px;
  cursor: pointer;

  border-radius: 10px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
  cursor: pointer;
`,O=e=>{let t=l()(e);return t.day()===l()().day()?"今天"+t.format("HH:mm"):t.format("MM-DD")},P=c.ZP.div`
  position: relative;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`,N=c.ZP.div`
  position: absolute;
  left: 21%;
  top: 20px;
  scale: 1.2;
`,S=c.ZP.input`
  display: flex;
  width: 60%;
  padding: 16px 32px 16px 40px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0.2, 0.2, 0.4);
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
`,Z=()=>{let e=(0,a.s0)(),t=(0,n.z)(),{setChatLoadSignal:r,chatLoadSignal:c}=(0,g.o)(),{isDarkMode:s}=(0,x.F)(),[l,y]=(0,i.useState)(""),[Z,C]=(0,i.useState)([]);(0,i.useEffect)(()=>{r(c+1),null==t||t.sortByTime()},[]),(0,i.useEffect)(()=>{C((null==t?void 0:t.chats)??[])},[null==t?void 0:t.chats]),(0,i.useEffect)(()=>{k()},[l]);let I=async()=>{if(!l.trim()){C((null==t?void 0:t.chats)??[]);return}C(e=>e.filter(e=>e.name.startsWith(l)||e.name.endsWith(l)))},{runAsync:k,loading:E}=(0,v.Z)(I,{debounceWait:300,manual:!0}),J=t=>{e(`/ai/chat/page/${t}`)},D=async(e,r)=>{e.stopPropagation();let o=await f.ZP.show(p.t,{chat:r});if("string"!=typeof o){console.error("type error");return}console.log(o),null==t||t.updateChat(e=>{let t=e.findIndex(e=>e.chatId===r.chatId);return e[t].name=o,[...e]})},W=async(e,r)=>{e.stopPropagation(),await f.ZP.show(m.p)&&(null==t||t.removeChat(r))};return(0,o.jsxs)(w,{children:[(0,o.jsx)("div",{className:" flex flex-col",children:(0,o.jsx)("div",{className:"text-4xl font-bold mt-10 text-center",children:"历史会话"})}),(0,o.jsxs)(P,{children:[(0,o.jsx)(N,{children:(0,o.jsx)(d.Z,{})}),(0,o.jsx)(S,{placeholder:"搜索历史会话",value:l,onChange:e=>y(e.target.value)})]}),(0,o.jsx)(b.Z,{loading:E,children:(0,o.jsx)("div",{className:"flex flex-col items-center gap-3 mt-[70px]",children:Z.map(e=>(0,o.jsxs)(j,{className:"group",onClick:()=>J(e.chatId),whileHover:{scale:1.1},whileTap:{scale:.9},drag:!0,dragConstraints:{left:0,right:300},dragElastic:.2,dragMomentum:!0,children:[(0,o.jsx)("div",{className:"max-w-[80%]",children:e.name}),(0,o.jsx)("div",{className:"ml-auto text-sm group-hover:hidden",children:O(e.updateTime)}),(0,o.jsxs)("div",{className:"hidden group-hover:flex ml-auto flex-row gap-2",children:[(0,o.jsx)("div",{className:`px-1  ${s?"bg-gray-700 hover:bg-gray-500":"bg-gray-200 hover:bg-gray-200"} rounded-md`,onClick:t=>D(t,e),children:(0,o.jsx)(u.Z,{})}),(0,o.jsx)("div",{className:"px-1 bg-red-200 text-red-600 rounded-md",onClick:t=>W(t,e.chatId),children:(0,o.jsx)(h.Z,{})})]})]},e.chatId))})})]})}},82297:function(e,t,r){r.d(t,{t:()=>p});var o=r(2596),a=r(8007),n=r(80233),c=r(79843),i=r(3390),s=r(62024),l=r(21543),d=r(53753),u=r(18223),h=r(81648);let f=s.ZP.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  color: ${e=>e.theme.colors.text};
`,p=i.ZP.create(e=>{let{chat:t}=e,r=i.ZP.useModal(),[c,s]=(0,l.useState)(t.name),[p,y]=(0,l.useState)(!1),[g,x]=(0,l.useState)(!1),{isDarkMode:v,theme:b}=(0,h.F)(),{getName:w}=(0,d.U)({messages:t.content,body:{model:"doubao-1-5-lite-32k-250115"}}),j=()=>{r.hide(),setTimeout(()=>{r.remove()},300)},O=async()=>{if(""!==c){x(!0);try{let e=await u.WY.post("/api/chat/history/update/name",{id:t.chatId,name:c});if(200!==e.data.code)throw Error(e.data.msg);r.resolve(c),j()}catch(e){console.error(e)}finally{x(!1)}}},P=e=>{e.preventDefault(),e.target.select()},N=async()=>{y(!0);try{let e=await w();s(e),console.log(e)}catch(e){console.error("命名错误： ",e)}finally{y(!1)}};return(0,o.jsx)(a.Z,{visible:r.visible,onCancel:j,onConfirm:O,title:(0,o.jsx)("div",{style:{color:b.colors.text},children:"重命名对话"}),style:{background:b.colors.background},children:(0,o.jsxs)(f,{children:[(0,o.jsx)(m,{value:c,onChange:e=>s(e),placeholder:"请输入名称...",onFocus:e=>P(e),allowClear:!0}),(0,o.jsx)(n.Z,{loading:p,onClick:N,children:"智能命名"})]})})}),m=(0,s.ZP)(c.Z)`
  ${e=>{let{theme:t}=e;return"dark"===t.mode&&(0,s.iv)`
      background: #575755;
    `}}
  .arco-input {
    color: ${e=>{let{theme:t}=e;return t.colors.text}};
  }
  .arco-input-inner-wrapper {
    &:focus {
      background: #666;
      color: #000;
    }
  }
  &:hover {
    background: #666666;
  }
`},14972:function(e,t,r){r.d(t,{_Q:()=>c,id:()=>i,mL:()=>n,s1:()=>a,xt:()=>s});var o=r(18223);async function a(){try{let e=await o.WY.get("/api/chat/history");if(200===e.data.code){let t=e.data.data,r=[];return t.map(e=>{let t=e.content;r.push({...e,content:JSON.parse(t),chatId:e.id})}),r}throw Error(e.data.msg)}catch(e){throw console.error(e),e}}async function n(e){try{let t={...e,content:JSON.stringify(e.content),id:e.chatId},r=await o.WY.post("/api/chat/history/write",t);if(200!==r.data.code)throw Error(r.data.msg)}catch(e){throw console.error(e),e}}async function c(e){try{let t={...e,content:JSON.stringify(e.content),id:e.chatId},r=await o.WY.post("/api/chat/history/update",t);if(200!==r.data.code)throw Error(r.data.msg)}catch(e){throw console.error(e),e}}async function i(e){console.log(e.content),console.log(JSON.stringify({...e.content}));try{let t=await o.WY.post("/api/chat/history/update/content",{id:e.id,content:JSON.stringify(e.content)});if(200!==t.data.code)throw Error(t.data.msg)}catch(e){throw console.error(e),e}}async function s(e){try{let t=await o.WY.delete(`/api/chat/history/delete/${e}`);if(200!==t.data.code)throw Error(t.data.msg)}catch(e){throw console.error(e),e}}},53753:function(e,t,r){r.d(t,{U:()=>a});var o=r(32398);let a=e=>{let t=e.messages.map(e=>{let t=e.content;return{role:e.role,content:(null==t?void 0:t.answer)??" "}});return t.push({role:"user",content:"现在我要为这则对话命名，以上的所有对话均为这则对话的信息。请帮我编写一个对话的标题。注意，在返回中只包含你编写的标题字符串，谢谢。"}),t=t.filter(e=>"start"!==e.role),{getName:async()=>{var r,a;console.log(t);let n=(null===(a=(await (0,o.Z)({method:"POST",url:"http://120.26.42.17:8080/proxy/chat/completions",headers:{...e.headers,"Content-Type":"application/json",Authorization:"Bearer sk-2f7f96daa57447c29397e024650634a9"},data:JSON.stringify({...e.body,messages:t,stream:!1})})).data.choices[0])||void 0===a?void 0:null===(r=a.message)||void 0===r?void 0:r.content)||"";return n||Promise.reject("type error")}}}},45527:function(e,t,r){r.d(t,{a:()=>h,z:()=>u});var o=r(2596),a=r(59537),n=r.n(a),c=r(21543),i=r(77276),s=r(47757),l=r(14972);let d=(0,c.createContext)(void 0),u=()=>(0,c.useContext)(d),h=e=>{let{chatLoadSignal:t,loginUsername:r}=(0,i.o)(),[a,u]=(0,c.useState)([]),h=async()=>{let e=[];try{console.log(r);let e=await (0,l.s1)();localStorage.setItem("chat-history",JSON.stringify(e??[])),u(e??[])}catch(r){let t=localStorage.getItem("chat-history");console.log(t),t?e=JSON.parse(t):localStorage.setItem("chat-history",JSON.stringify(e)),u(e)}},f=async e=>{r&&await (0,l.mL)(e)},p=async e=>{r&&await (0,l.xt)(e)};(0,s.Z)(async()=>{await h()},[t]);let m=(0,c.useCallback)(e=>{let t=e(a);localStorage.setItem("chat-history",JSON.stringify(t)),u(t)},[a]),y=async e=>{let t=a.filter(t=>t.chatId!==e);localStorage.setItem("chat-history",JSON.stringify(t)),await p(e),u(t)};return(0,o.jsx)(d.Provider,{value:{chats:a,addChat:e=>{a.push(e),localStorage.setItem("chat-history",JSON.stringify(a)),f(e),u(a)},sortByTime:()=>{let e=a.sort((e,t)=>n()(e.updateTime).isAfter(n()(t.updateTime))?-1:1);localStorage.setItem("chat-history",JSON.stringify([...e])),u([...e])},updateChat:m,removeAllChat:()=>{u([]),localStorage.removeItem("chat-history")},removeChat:y,getChatHistory:h},children:e.children})}},26879:function(e,t,r){r.d(t,{Z:()=>d});var o=r(26765),a=r(89888),n=r(21543),c=r(43857);function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach(function(t){(0,a.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var l=n.forwardRef(function(e,t){var r=(0,n.useContext)(c.P).prefixCls,a=void 0===r?"arco":r,i=e.spin,l=e.className,d=s(s({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(l?l+" ":"").concat(a,"-icon ").concat(a,"-icon-delete")});return i&&(d.className="".concat(d.className," ").concat(a,"-icon-loading")),delete d.spin,delete d.isIcon,n.createElement("svg",(0,o.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},d),n.createElement("path",{d:"M5 11h5.5m0 0v29a1 1 0 0 0 1 1h25a1 1 0 0 0 1-1V11m-27 0H16m21.5 0H43m-5.5 0H32m-16 0V7h16v4m-16 0h16M20 18v15m8-15v15"}))});l.defaultProps={isIcon:!0},l.displayName="IconDelete";let d=l},96212:function(e,t,r){r.d(t,{Z:()=>d});var o=r(26765),a=r(89888),n=r(21543),c=r(43857);function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach(function(t){(0,a.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var l=n.forwardRef(function(e,t){var r=(0,n.useContext)(c.P).prefixCls,a=void 0===r?"arco":r,i=e.spin,l=e.className,d=s(s({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(l?l+" ":"").concat(a,"-icon ").concat(a,"-icon-edit")});return i&&(d.className="".concat(d.className," ").concat(a,"-icon-loading")),delete d.spin,delete d.isIcon,n.createElement("svg",(0,o.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},d),n.createElement("path",{d:"m30.48 19.038 5.733-5.734a1 1 0 0 0 0-1.414l-5.586-5.586a1 1 0 0 0-1.414 0l-5.734 5.734m7 7L15.763 33.754a1 1 0 0 1-.59.286l-6.048.708a1 1 0 0 1-1.113-1.069l.477-6.31a1 1 0 0 1 .29-.631l14.7-14.7m7 7-7-7M6 42h36"}))});l.defaultProps={isIcon:!0},l.displayName="IconEdit";let d=l},47757:function(e,t,r){r.d(t,{Z:()=>c});var o=r(51560),a=r(21543),n=r(26351);let c=function(e,t){(0,a.useEffect)(function(){var t=e(),r=!1;return!function(){(0,o.mG)(this,void 0,void 0,function(){return(0,o.Jh)(this,function(e){switch(e.label){case 0:if(!(0,n.mf)(t[Symbol.asyncIterator]))return[3,4];e.label=1;case 1:return[4,t.next()];case 2:if(e.sent().done||r)return[3,3];return[3,1];case 3:return[3,6];case 4:return[4,t];case 5:e.sent(),e.label=6;case 6:return[2]}})})}(),function(){r=!0}},t)}}}]);