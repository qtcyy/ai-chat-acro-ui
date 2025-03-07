"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["3603"],{15737:function(e,t,r){r.r(t),r.d(t,{default:()=>G});var o=r(2596),n=r(58946),l=r(46499),c=r(26765),s=r(89888),a=r(21543),i=r(43857);function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach(function(t){(0,s.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var u=a.forwardRef(function(e,t){var r=(0,a.useContext)(i.P).prefixCls,o=void 0===r?"arco":r,n=e.spin,l=e.className,s=p(p({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(l?l+" ":"").concat(o,"-icon ").concat(o,"-icon-arrow-left")});return n&&(s.className="".concat(s.className," ").concat(o,"-icon-loading")),delete s.spin,delete s.isIcon,a.createElement("svg",(0,c.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},s),a.createElement("path",{d:"M20.272 11.27 7.544 23.998l12.728 12.728M43 24H8.705"}))});function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach(function(t){(0,s.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}u.defaultProps={isIcon:!0},u.displayName="IconArrowLeft";var m=a.forwardRef(function(e,t){var r=(0,a.useContext)(i.P).prefixCls,o=void 0===r?"arco":r,n=e.spin,l=e.className,s=f(f({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(l?l+" ":"").concat(o,"-icon ").concat(o,"-icon-more-vertical")});return n&&(s.className="".concat(s.className," ").concat(o,"-icon-loading")),delete s.spin,delete s.isIcon,a.createElement("svg",(0,c.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},s),a.createElement("path",{fill:"currentColor",stroke:"none",d:"M25 10h-2V8h2v2ZM25 25h-2v-2h2v2ZM25 40h-2v-2h2v2Z"}),a.createElement("path",{d:"M25 10h-2V8h2v2ZM25 25h-2v-2h2v2ZM25 40h-2v-2h2v2Z"}))});m.defaultProps={isIcon:!0},m.displayName="IconMoreVertical";var h=r(9018),v=r(29595),b=r(3390),g=r(72752),j=r(62024),y=r(81648),w=r(8007);let O=b.ZP.create(e=>{let{project:t}=e,r=b.ZP.useModal(),[n,l]=(0,a.useState)(t.name),[c,s]=(0,a.useState)(t.description),[i,d]=(0,a.useState)(!1),p=()=>{r.hide(),setTimeout(()=>{r.remove()},300)};return(0,o.jsx)(k,{visible:r.visible,title:(0,o.jsx)(Z,{children:"编辑项目信息"}),onCancel:p,onOk:()=>{if(!n.trim()){d(!0);return}r.resolve({name:n,description:c}),p()},children:(0,o.jsxs)(C,{children:[(0,o.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,o.jsx)("div",{className:"text-lg font-bold",children:"Name"}),(0,o.jsx)(N,{value:n,onChange:e=>l(e.target.value)}),i&&(0,o.jsx)("div",{className:"text-red-500 ml-auto font-bold",children:"请输入项目名称"})]}),(0,o.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,o.jsx)("div",{className:"text-lg font-bold",children:"Description"}),(0,o.jsx)(P,{rows:3,value:c,onChange:e=>s(e.target.value)})]})]})})}),P=j.ZP.textarea`
  padding: 6px 12px;
  border-radius: 8px;
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  resize: none;
`,N=j.ZP.input`
  padding: 6px 12px;
  border-radius: 8px;
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
`,Z=j.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  text-align: left;
`,k=(0,j.ZP)(w.Z)`
  background: ${e=>{let{theme:t}=e;return t.colors.background}};
`,C=j.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;var D=r(1731);let E=b.ZP.create(()=>{let e=(0,b.dd)(),t=()=>{e.hide(),setTimeout(()=>{e.remove()},300)};return(0,o.jsx)($,{title:(0,o.jsx)(I,{children:"删除项目"}),visible:e.visible,onCancel:t,onOk:()=>{e.resolve(!0),t()},children:(0,o.jsx)(S,{children:"确定删除项目吗？"})})}),S=j.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
`,I=j.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  text-align: left;
`,$=(0,j.ZP)(w.Z)`
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
`;var M=r(3824);let B=b.ZP.create(e=>{let{project:t}=e,r=b.ZP.useModal(),[n,l]=(0,a.useState)(t.aiProps??""),c=()=>{r.hide(),setTimeout(()=>r.remove(),300)};return(0,o.jsx)(W,{visible:r.visible,onCancel:c,onConfirm:()=>{n.trim()?r.resolve(n):r.reject(),c()},title:null,children:(0,o.jsxs)(T,{children:[(0,o.jsx)("div",{className:"text-xl font-bold",children:"设置项目的AI提示词"}),(0,o.jsx)(R,{rows:10,placeholder:"请填写AI提示词",value:n,onChange:e=>l(e.target.value)})]})})}),R=j.ZP.textarea`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 20px;
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  resize: none;
`,T=j.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  display: flex;
  flex-direction: column;
  gap: 16px;
`,W=(0,j.ZP)(w.Z)`
  background: ${e=>{let{theme:t}=e;return t.colors.background}};
`,F=j.ZP.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
  max-width: 150px;
`,V=j.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
`,z=j.ZP.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  padding: 36px;
  background: ${e=>{let{theme:t}=e;return t.colors.bubbleUserBg}};
`,A=j.ZP.div`
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.secondary}};
  transition: background 200ms ease;
  &:hover {
    background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`,H=j.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.secondary}};
  padding: 16px;
  border-radius: 16px;
  background-color: ${e=>{let{theme:t}=e;return t.colors.background}};
`,J=j.ZP.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
`,U=j.ZP.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
`,L=j.ZP.div`
  display: flex;
  padding-right: 24px;
  width: 100%;
  margin-top: 48px;
  flex-direction: row;
  gap: 32px;
`,K=j.ZP.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  height: 64px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to bottom,
    ${e=>{let{theme:t}=e;return`${t.colors.background}00`}},
    ${e=>{let{theme:t}=e;return t.colors.background}}
  );
`,q=j.ZP.div`
  padding-left: 24px;
  display: flex;
  width: calc(100vw - 108px);
  flex-direction: column;
`,G=()=>{let e=(0,g.UO)().id;if(!e)return(0,o.jsx)("div",{children:"项目不存在"});let{isDarkMode:t}=(0,y.F)(),{projects:r,updateProject:c,deleteProject:s}=(0,D.E)(),i=r.find(t=>t.id===e);if(!i)return(0,o.jsx)("div",{children:"项目不存在"});let[d,p]=(0,a.useState)(i),x=async()=>{let t=await b.ZP.show(B,{project:d});console.log(t),t&&(c(r=>{let o=r.findIndex(t=>t.id===e);return -1!==o&&(r[o]={...r[o],aiProps:t}),r}),console.log(r),p(e=>({...e,aiProps:t})))};return(0,o.jsxs)(q,{children:[(0,o.jsxs)(K,{className:"w-full pr-8",children:[(0,o.jsxs)("a",{href:"/#/ai/chat/projects",className:"text-base flex flex-row gap-1 items-center",children:[(0,o.jsx)(u,{className:"scale-125"}),"所有项目"]}),(0,o.jsx)(l.Z,{droplist:(()=>{let r=async t=>{switch(t){case"edit":let r=await b.ZP.show(O,{project:d});r&&(c(t=>{let o=t.findIndex(t=>t.id===e);return -1!==o&&(t[o]={...t[o],...r}),t}),p(e=>({...e,...r})));break;case"remove":await b.ZP.show(E)&&s(e)}};return(0,o.jsxs)(n.Z,{className:`w-[6rem] ${t&&"bg-gray-700 border-none"}`,onClickMenuItem:r,children:[(0,o.jsx)(n.Z.Item,{className:`${t&&"hover:bg-gray-500"}`,children:(0,o.jsx)("div",{className:`w-5 ${t&&"text-white"}`,children:"编辑"})},"edit"),(0,o.jsx)(n.Z.Item,{className:`${t&&"hover:bg-gray-500"}`,children:(0,o.jsx)("div",{className:"w-5 text-red-500",children:"删除"})},"remove")]})})(),trigger:["click"],children:(0,o.jsx)("div",{className:`ml-auto rounded-lg px-2 py-1 scale-125 cursor-pointer ${t?"hover:bg-gray-700":"hover:bg-gray-200"}`,children:(0,o.jsx)(m,{})})})]}),(0,o.jsxs)(L,{children:[(0,o.jsxs)(U,{children:[(0,o.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,o.jsxs)("div",{className:"text-3xl font-bold font-serif flex flex-row gap-2 items-center",children:[(0,o.jsx)(h.Z,{}),null==d?void 0:d.name]}),(0,o.jsx)("div",{className:"text-sm text-gray-500",children:null==d?void 0:d.description})]}),(0,o.jsx)(M.C,{className:"mt-4",ask:e=>{console.log(e)},loading:!1,cancel:()=>{},isHome:!0})]}),(0,o.jsx)(J,{children:(0,o.jsxs)(H,{children:[(0,o.jsxs)("div",{className:"flex flex-row items-center",children:[(0,o.jsx)("div",{className:"text-lg font-bold font-serif",children:"项目知识"}),(0,o.jsx)(A,{className:"ml-auto py-1 px-3 text-xl rounded-lg mr-2 text-center items-center cursor-pointer",children:"+"})]}),(0,o.jsx)("div",{className:"mt-2 p-2",children:(0,o.jsx)(A,{className:"p-2 rounded-lg flex cursor-pointer",onClick:x,children:d.aiProps?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(F,{children:d.aiProps}),(0,o.jsx)("div",{className:"text-blue-500 ml-auto text-base font-bold",children:"Edit"})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{children:"设置提示词"}),(0,o.jsx)(V,{className:"ml-auto",children:"Optional"})]})})}),(0,o.jsxs)(z,{className:" rounded-lg justify-center items-center",children:[(0,o.jsx)("div",{className:"text-4xl",children:(0,o.jsx)(v.Z,{})}),(0,o.jsx)(V,{children:"尚未添加任何知识。将 PDF、文档或其他文本添加到项目知识库中，DeepSeek 将在每次项目对话中引用这些文本。"})]})]})})]})]})}},3824:function(e,t,r){r.d(t,{C:()=>O});var o=r(2596),n=r(58946),l=r(46499),c=r(77496),s=r(70041),a=r(72192),i=r(22108),d=r(50510),p=r(92384),u=r(21543),x=r(62024),f=r(17413),m=r(71576),h=r(72752),v=r(77276),b=r(81648);let g=x.ZP.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`,j=x.ZP.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: ${e=>"dark"===e.theme.mode?"#45454e":"#fff"};

  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`,y=x.ZP.div`
  background: #fff;
  color: #535126;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  opacity: ${e=>e.show?"100%":"0%"};

  &:hover {
    background: rgb(238, 235, 226);
    color: black;
  }

  transition: all 0.2s ease;
`,w={"deepseek-r1-250120":"DeepSeek-R1","doubao-1-5-pro-32k-250115":"DouBao-1.5-Pro","doubao-1-5-lite-32k-250115":"DouBao-1.5-lite"},O=e=>{let{ask:t,loading:r,cancel:x,showTop:O,isHome:P}=e;(0,h.s0)();let{selectedModel:N,setSelectedModel:Z,insertText:k,setInsertText:C}=(0,v.o)(),{isDarkMode:D}=(0,b.F)(),E=async e=>{t(e)},{run:S}=(0,m.Z)(E,{debounceWait:200,manual:!0}),[I,$]=(0,u.useState)(""),[M,B]=(0,u.useState)(!1);(0,u.useEffect)(()=>{k.trim()&&(console.log("insert text",k),$(k),C(""))},[k]);let R=(0,u.useCallback)(e=>{null==e||e.stopPropagation(),null==e||e.preventDefault(),""===I||r||(S(I),$(""))},[r,I,S]),T=(0,f.vO)();return(0,o.jsxs)(g,{className:e.className,style:e.style,children:[(0,o.jsx)("div",{className:"flex flex-row w-[60%] mb-3 ",children:(0,o.jsxs)("div",{className:"ml-auto mr-8 flex flex-row gap-1",children:[O&&(0,o.jsx)(y,{show:!r,className:"py-1 px-4 cursor-pointer rounded-md ",onClick:()=>{r||null==T||T.toTop()},children:"Top"}),O&&(0,o.jsx)(y,{show:!r,className:"py-1 px-4 cursor-pointer rounded-md ",onClick:()=>{r||null==T||T.toBottom()},children:"Bottom"})]})}),(0,o.jsxs)(j,{className:"p-3 min-h-[150px] max-h-[250px] rounded-xl w-[60%] min-w-[700px] flex flex-col items-center",children:[(0,o.jsx)("textarea",{className:`flex-[0.7] w-full text-lg ${D&&"bg-[#45454e]"}`,placeholder:"向我提问吧",value:I,onChange:e=>$(e.target.value),onCompositionStart:()=>B(!0),onCompositionEnd:()=>B(!1),draggable:!1,style:{resize:"none"},onKeyDown:e=>{"Enter"!==e.key||M||(e.preventDefault(),e.stopPropagation(),R())}}),(0,o.jsxs)("div",{className:"flex-[0.3] w-full inline-flex flex-row items-center",children:[!P&&(0,o.jsx)(l.Z,{droplist:(0,o.jsxs)(n.Z,{style:{width:"150px"},onClickMenuItem:e=>Z(e),children:[(0,o.jsx)(n.Z.Item,{children:(0,o.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,o.jsx)("div",{children:"DeepSeek-R1"}),"deepseek-r1-250120"===N&&(0,o.jsx)(s.Z,{className:"ml-auto"})]})},"deepseek-r1-250120"),(0,o.jsx)(n.Z.Item,{children:(0,o.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,o.jsx)("div",{children:"DouBao-1.5-Pro"}),"doubao-1-5-pro-32k-250115"===N&&(0,o.jsx)(s.Z,{className:"ml-auto"})]})},"doubao-1-5-pro-32k-250115"),(0,o.jsx)(n.Z.Item,{children:(0,o.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,o.jsx)("div",{children:"DouBao-1.5-lite"}),"doubao-1-5-lite-32k-250115"===N&&(0,o.jsx)(s.Z,{className:"ml-auto"})]})},"doubao-1-5-lite-32k-250115")]}),children:(0,o.jsxs)("div",{className:"ml-2 px-2 py-1 hover:bg-[#eeebe2] rounded-lg transition-colors cursor-pointer",children:[w[N],(0,o.jsx)(a.Z,{})]})}),(0,o.jsxs)("div",{className:"ml-auto flex flex-row gap-2 justify-center items-center",children:[r&&(0,o.jsx)("div",{className:"text-xl text-white px-2 py-2 rounded-[50%] bg-red-500 cursor-pointer flex justify-center items-center",onClick:x,children:(0,o.jsx)(i.Z,{})}),(0,o.jsx)("div",{className:""===I?"flex flex-row px-3 py-2 bg-blue-300 text-gray-100 rounded-md transition-colors duration-200":"flex flex-row px-3 py-2 bg-blue-500 text-white rounded-md transition-colors duration-200 cursor-pointer",onClick:R,children:(0,o.jsx)(c.Z,{mini:!0,position:"top",content:""===I?"请输入问题":"点击发送",children:(0,o.jsx)("div",{className:"scale-150",children:r?(0,o.jsx)(d.Z,{}):(0,o.jsx)(p.Z,{})})})})]})]})]})]})}},1731:function(e,t,r){r.d(t,{E:()=>c,F:()=>a});var o=r(2596),n=r(21543);let l=(0,n.createContext)({projects:[],addProject:()=>{},updateProject:()=>{},deleteProject:()=>{}}),c=()=>(0,n.useContext)(l),s="ai-chat-projects",a=e=>{let{children:t}=e,[r,c]=(0,n.useState)((()=>{let e=localStorage.getItem(s);return e?JSON.parse(e):(localStorage.setItem(s,JSON.stringify([])),[])})()),a=e=>{localStorage.setItem(s,JSON.stringify(e))};return(0,o.jsx)(l.Provider,{value:{projects:r,addProject:e=>{let t=[...r,e];a(t),c(t)},updateProject:e=>{let t=e(r);a(t),c(t)},deleteProject:e=>{let t=r.filter(t=>t.id!==e);a(t),c(t)}},children:t})}},17413:function(e,t,r){r.d(t,{ID:()=>s,vO:()=>c});var o=r(2596),n=r(21543);let l=(0,n.createContext)(void 0),c=()=>(0,n.useContext)(l),s=e=>{let{children:t,ref:r,shouldScroll:n}=e;return(0,o.jsx)(l.Provider,{value:{target:r,toTop:e=>{if(!r.current.getScrollElement())return;let t=r.current.getScrollElement();t&&(e?t.scrollTo({top:0,behavior:"smooth"}):t.scrollTo({top:0}))},toBottom:e=>{if(!r.current.getScrollElement())return;let t=r.current.getScrollElement();t&&(e?t.scrollTo({top:t.scrollHeight,behavior:"smooth"}):t.scrollTo({top:t.scrollHeight}))},shouldScroll:n},children:t})}},92384:function(e,t,r){r.d(t,{Z:()=>d});var o=r(26765),n=r(89888),l=r(21543),c=r(43857);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){(0,n.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var i=l.forwardRef(function(e,t){var r=(0,l.useContext)(c.P).prefixCls,n=void 0===r?"arco":r,s=e.spin,i=e.className,d=a(a({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(i?i+" ":"").concat(n,"-icon ").concat(n,"-icon-arrow-up")});return s&&(d.className="".concat(d.className," ").concat(n,"-icon-loading")),delete d.spin,delete d.isIcon,l.createElement("svg",(0,o.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},d),l.createElement("path",{d:"M11.27 20.272 23.997 7.544l12.728 12.728M24 43V8.705"}))});i.defaultProps={isIcon:!0},i.displayName="IconArrowUp";let d=i},70041:function(e,t,r){r.d(t,{Z:()=>d});var o=r(26765),n=r(89888),l=r(21543),c=r(43857);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){(0,n.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var i=l.forwardRef(function(e,t){var r=(0,l.useContext)(c.P).prefixCls,n=void 0===r?"arco":r,s=e.spin,i=e.className,d=a(a({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(i?i+" ":"").concat(n,"-icon ").concat(n,"-icon-check")});return s&&(d.className="".concat(d.className," ").concat(n,"-icon-loading")),delete d.spin,delete d.isIcon,l.createElement("svg",(0,o.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},d),l.createElement("path",{d:"M41.678 11.05 19.05 33.678 6.322 20.95"}))});i.defaultProps={isIcon:!0},i.displayName="IconCheck";let d=i},9018:function(e,t,r){r.d(t,{Z:()=>d});var o=r(26765),n=r(89888),l=r(21543),c=r(43857);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){(0,n.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var i=l.forwardRef(function(e,t){var r=(0,l.useContext)(c.P).prefixCls,n=void 0===r?"arco":r,s=e.spin,i=e.className,d=a(a({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(i?i+" ":"").concat(n,"-icon ").concat(n,"-icon-common")});return s&&(d.className="".concat(d.className," ").concat(n,"-icon-loading")),delete d.spin,delete d.isIcon,l.createElement("svg",(0,o.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},d),l.createElement("path",{d:"M24 23 7.652 14.345M24 23l16.366-8.664M24 23v19.438M7 14v20l17 9 17-9V14L24 5 7 14Z"}))});i.defaultProps={isIcon:!0},i.displayName="IconCommon";let d=i},22108:function(e,t,r){r.d(t,{Z:()=>d});var o=r(26765),n=r(89888),l=r(21543),c=r(43857);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){(0,n.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var i=l.forwardRef(function(e,t){var r=(0,l.useContext)(c.P).prefixCls,n=void 0===r?"arco":r,s=e.spin,i=e.className,d=a(a({"aria-hidden":!0,focusable:!1,ref:t},e),{},{className:"".concat(i?i+" ":"").concat(n,"-icon ").concat(n,"-icon-record-stop")});return s&&(d.className="".concat(d.className," ").concat(n,"-icon-loading")),delete d.spin,delete d.isIcon,l.createElement("svg",(0,o.Z)({fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48"},d),l.createElement("path",{d:"M24 6c9.941 0 18 8.059 18 18s-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6Z",clipRule:"evenodd"}),l.createElement("path",{fill:"currentColor",stroke:"none",d:"M19 20a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-8Z"}),l.createElement("path",{d:"M19 20a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-8Z"}))});i.defaultProps={isIcon:!0},i.displayName="IconRecordStop";let d=i}}]);