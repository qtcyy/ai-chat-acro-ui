"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["3861"],{45620:function(e,t,r){r.r(t),r.d(t,{default:()=>X});var o=r(2596),l=r(58946),s=r(46499),a=r(56750),i=r(73618),n=r(9018),c=r(26879),d=r(29595),x=r(3390),u=r(21543),m=r(72752),h=r(62024),p=r(81648),f=r(8007);let g=x.ZP.create(e=>{let{project:t}=e,r=x.ZP.useModal(),[l,s]=(0,u.useState)(t.name),[a,i]=(0,u.useState)(t.description),[n,c]=(0,u.useState)(!1),d=()=>{r.hide(),setTimeout(()=>{r.remove()},300)};return(0,o.jsx)(b,{visible:r.visible,title:(0,o.jsx)(y,{children:"编辑项目信息"}),onCancel:d,onOk:()=>{if(!l.trim()){c(!0);return}r.resolve({name:l,description:a}),d()},children:(0,o.jsxs)(w,{children:[(0,o.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,o.jsx)("div",{className:"text-lg font-bold",children:"Name"}),(0,o.jsx)(j,{value:l,onChange:e=>s(e.target.value)}),n&&(0,o.jsx)("div",{className:"text-red-500 ml-auto font-bold",children:"请输入项目名称"})]}),(0,o.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,o.jsx)("div",{className:"text-lg font-bold",children:"Description"}),(0,o.jsx)(v,{rows:3,value:a,onChange:e=>i(e.target.value)})]})]})})}),v=h.ZP.textarea`
  padding: 6px 12px;
  border-radius: 8px;
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  resize: none;
`,j=h.ZP.input`
  padding: 6px 12px;
  border-radius: 8px;
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
`,y=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  text-align: left;
`,b=(0,h.ZP)(f.Z)`
  background: ${e=>{let{theme:t}=e;return t.colors.background}};
`,w=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;var N=r(1731);let Z=x.ZP.create(()=>{let e=(0,x.dd)(),t=()=>{e.hide(),setTimeout(()=>{e.remove()},300)};return(0,o.jsx)(S,{title:(0,o.jsx)(P,{children:"删除项目"}),visible:e.visible,onCancel:t,onOk:()=>{e.resolve(!0),t()},children:(0,o.jsx)(k,{children:"确定删除项目吗？"})})}),k=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
`,P=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  text-align: left;
`,S=(0,h.ZP)(f.Z)`
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
`;var I=r(3824);let C=x.ZP.create(e=>{let{project:t}=e,r=x.ZP.useModal(),[l,s]=(0,u.useState)(t.aiProps??""),a=()=>{r.hide(),setTimeout(()=>r.remove(),300)};return(0,o.jsx)(Y,{visible:r.visible,onCancel:a,onConfirm:()=>{l.trim()?r.resolve(l):r.reject(),a()},title:null,children:(0,o.jsxs)(T,{children:[(0,o.jsx)("div",{className:"text-xl font-bold",children:"设置项目的AI提示词"}),(0,o.jsx)($,{rows:10,placeholder:"请填写AI提示词",value:l,onChange:e=>s(e.target.value)})]})})}),$=h.ZP.textarea`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 20px;
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  resize: none;
`,T=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Y=(0,h.ZP)(f.Z)`
  background: ${e=>{let{theme:t}=e;return t.colors.background}};
`;var D=r(45527),O=r(78056),E=r(59537),B=r.n(E),J=r(77276),H=r(17753);let M=e=>{let t=B()(e),r=B()().diff(t,"second"),o=B()().diff(t,"minute"),l=B()().diff(t,"hour"),s=B()().diff(t,"day"),a=B()().diff(t,"month"),i=B()().diff(t,"year");return i?String(i)+"年":a?String(a)+"月":s?String(s)+"天":l?String(l)+"小时":o?String(o)+"分钟":String(r)+"秒"},z=h.ZP.div`
  transition: background 200ms ease;
  color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
  &:hover {
    background: ${e=>{let{theme:t}=e;return"dark"===t.mode?"#374151":"#e5e7eb"}};
  }
`,F=(0,h.ZP)(H.E.li)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  cursor: pointer;

  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.secondary}};
  transition: background 200ms ease;
  &:hover {
    background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  }
`,W=h.ZP.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,A=h.ZP.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
  max-width: 150px;
`,L=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
`,R=h.ZP.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  padding: 36px;
  background: ${e=>{let{theme:t}=e;return t.colors.bubbleUserBg}};
`,U=h.ZP.div`
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.secondary}};
  transition: background 200ms ease;
  &:hover {
    background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`,K=h.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.secondary}};
  padding: 16px;
  border-radius: 16px;
  background-color: ${e=>{let{theme:t}=e;return t.colors.background}};
`,Q=h.ZP.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
`,_=h.ZP.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
`,q=h.ZP.div`
  display: flex;
  padding-right: 24px;
  width: 100%;
  margin-top: 48px;
  flex-direction: row;
  gap: 32px;
`,G=h.ZP.div`
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
`,V=h.ZP.div`
  padding-left: 24px;
  display: flex;
  width: calc(100vw - 108px);
  flex-direction: column;
`,X=()=>{let e=(0,m.UO)().id,t=(0,m.TH)(),r=(0,m.s0)(),{isDarkMode:h}=(0,p.F)(),{projects:f,updateProject:v,deleteProject:j}=(0,N.E)(),y=f.find(t=>t.id===e),[b,w]=(0,u.useState)(y??{id:"-1",name:"unknown",chatIds:[],createTime:"-1",updateTime:"-1"}),k=(0,D.z)(),{setWaitSendQuestion:P,setWaitSendProps:S}=(0,J.o)(),[$,T]=(0,u.useState)((()=>{let e=new Set(b.chatIds),t=null==k?void 0:k.chats.filter(t=>e.has(t.chatId));return t?(console.log(t),t.sort((e,t)=>B()(e.updateTime).isAfter(t.updateTime)?-1:1)):[]})());if(!y||!e)return(0,o.jsx)("div",{children:"项目不存在"});let Y=async()=>{let t=await x.ZP.show(C,{project:b});console.log(t),t&&(v(r=>{let o=r.findIndex(t=>t.id===e),l=[...r];return -1!==o&&(l[o]={...l[o],aiProps:t,updateTime:B()().format("YYYY-MM-DD HH:mm:ss")}),l}),console.log(f),w(e=>({...e,aiProps:t})))};return(0,o.jsxs)(V,{children:[(0,o.jsxs)(G,{className:"w-full pr-8",children:[(0,o.jsxs)("a",{href:"/#/ai/chat/projects",className:"text-base flex flex-row gap-1 items-center",children:[(0,o.jsx)(a.Z,{className:"scale-125"}),"所有项目"]}),(0,o.jsx)(s.Z,{droplist:(()=>{let t=async t=>{switch(t){case"edit":let o=await x.ZP.show(g,{project:b});o&&(v(t=>{let r=t.findIndex(t=>t.id===e),l=[...t];return -1!==r&&(l[r]={...l[r],...o,updateTime:B()().format("YYYY-MM-DD HH:mm:ss")}),l}),w(e=>({...e,...o})));break;case"remove":await x.ZP.show(Z)&&(j(e),r("/ai/chat/projects"))}};return(0,o.jsxs)(l.Z,{className:`w-[6rem] ${h&&"bg-gray-700 border-none"}`,onClickMenuItem:t,children:[(0,o.jsx)(l.Z.Item,{className:`${h&&"hover:bg-gray-500"}`,children:(0,o.jsx)("div",{className:`w-5 ${h&&"text-white"}`,children:"编辑"})},"edit"),(0,o.jsx)(l.Z.Item,{className:`${h&&"hover:bg-gray-500"}`,children:(0,o.jsx)("div",{className:"w-5 text-red-500",children:"删除"})},"remove")]})})(),trigger:["click"],children:(0,o.jsx)("div",{className:`ml-auto rounded-lg px-2 py-1 scale-125 cursor-pointer ${h?"hover:bg-gray-700":"hover:bg-gray-200"}`,children:(0,o.jsx)(i.Z,{})})})]}),(0,o.jsxs)(q,{children:[(0,o.jsxs)(_,{children:[(0,o.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,o.jsxs)("div",{className:"text-3xl font-bold font-serif flex flex-row gap-2 items-center",children:[(0,o.jsx)(n.Z,{}),null==b?void 0:b.name]}),(0,o.jsx)("div",{className:"text-sm text-gray-500",children:null==b?void 0:b.description})]}),(0,o.jsx)(I.C,{className:"mt-4",ask:o=>{if(console.log(o),!o.trim())return;let l=(0,O.Z)();null==k||k.addChat({chatId:l,name:"新建对话",content:[{role:"start"}],createTime:B()().format("YYYY-MM-DD HH:mm:ss"),updateTime:B()().format("YYYY-MM-DD HH:mm:ss")}),v(t=>{let r=t.findIndex(t=>t.id===e),o=[...t];return -1!==r&&(o[r]={...o[r],chatIds:[...o[r].chatIds,l],updateTime:B()().format("YYYY-MM-DD HH:mm:ss")}),o}),w(e=>({...e,chatIds:[...e.chatIds,l]})),S(b.aiProps),P(o),r(`/ai/chat/page/${l}`,{state:{from:t.pathname}})},loading:!1,cancel:()=>{},isHome:!0}),(0,o.jsx)(W,{className:"mt-5",children:$.map(e=>{let l=async t=>{t.stopPropagation(),null==k||k.removeChat(e.chatId),T(t=>t.filter(t=>t.chatId!==e.chatId))};return(0,o.jsxs)(F,{className:"group",whileTap:{scale:.95},onClick:()=>{r(`/ai/chat/page/${e.chatId}`,{state:{from:t.pathname}})},children:[(0,o.jsxs)("div",{className:"flex flex-row",children:[(0,o.jsx)("div",{className:"text-lg font-serif",children:e.name}),(0,o.jsx)(z,{className:"ml-auto px-2 py-1 border-gray-500 hidden group-hover:flex justify-center items-center text-base rounded-md cursor-pointer",onClick:l,children:(0,o.jsx)(c.Z,{})})]}),(0,o.jsxs)(L,{children:["上一次更新：",M(e.updateTime),"前"]})]},e.chatId)})})]}),(0,o.jsx)(Q,{children:(0,o.jsxs)(K,{children:[(0,o.jsxs)("div",{className:"flex flex-row items-center",children:[(0,o.jsx)("div",{className:"text-lg font-bold font-serif",children:"项目知识"}),(0,o.jsx)(U,{className:"ml-auto py-1 px-3 text-xl rounded-lg mr-2 text-center items-center cursor-pointer",children:"+"})]}),(0,o.jsx)("div",{className:"mt-2 p-2",children:(0,o.jsx)(U,{className:"p-2 rounded-lg flex cursor-pointer",onClick:Y,children:b.aiProps?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(A,{children:b.aiProps}),(0,o.jsx)("div",{className:"text-blue-500 ml-auto text-base font-bold",children:"Edit"})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{children:"设置提示词"}),(0,o.jsx)(L,{className:"ml-auto",children:"Optional"})]})})}),(0,o.jsxs)(R,{className:" rounded-lg justify-center items-center",children:[(0,o.jsx)("div",{className:"text-4xl",children:(0,o.jsx)(d.Z,{})}),(0,o.jsx)(L,{children:"尚未添加任何知识。将 PDF、文档或其他文本添加到项目知识库中，DeepSeek 将在每次项目对话中引用这些文本。"})]})]})})]})]})}},3824:function(e,t,r){r.d(t,{C:()=>N});var o=r(2596),l=r(58946),s=r(46499),a=r(77496),i=r(70041),n=r(72192),c=r(22108),d=r(50510),x=r(92384),u=r(21543),m=r(62024),h=r(17413),p=r(72517),f=r(72752),g=r(77276),v=r(81648);let j=m.ZP.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`,y=m.ZP.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: ${e=>"dark"===e.theme.mode?"#45454e":"#fff"};

  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`,b=m.ZP.div`
  background: #fff;
  color: #535126;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  opacity: ${e=>e.show?"100%":"0%"};

  &:hover {
    background: rgb(238, 235, 226);
    color: black;
  }

  transition: all 0.2s ease;
`,w={"deepseek-r1-250120":"DeepSeek-R1","doubao-1-5-pro-32k-250115":"DouBao-1.5-Pro","doubao-1-5-lite-32k-250115":"DouBao-1.5-lite"},N=e=>{let{ask:t,loading:r,cancel:m,showTop:N,isHome:Z}=e;(0,f.s0)();let{selectedModel:k,setSelectedModel:P,insertText:S,setInsertText:I}=(0,g.o)(),{isDarkMode:C}=(0,v.F)(),$=async e=>{t(e)},{run:T}=(0,p.Z)($,{debounceWait:200,manual:!0}),[Y,D]=(0,u.useState)(""),[O,E]=(0,u.useState)(!1);(0,u.useEffect)(()=>{S.trim()&&(console.log("insert text",S),D(S),I(""))},[S]);let B=(0,u.useCallback)(e=>{null==e||e.stopPropagation(),null==e||e.preventDefault(),""===Y||r||(T(Y),D(""))},[r,Y,T]),J=(0,h.vO)();return(0,o.jsxs)(j,{className:e.className,style:e.style,children:[(0,o.jsx)("div",{className:"flex flex-row w-[60%] mb-3 ",children:(0,o.jsxs)("div",{className:"ml-auto mr-8 flex flex-row gap-1",children:[N&&(0,o.jsx)(b,{show:!r,className:"py-1 px-4 cursor-pointer rounded-md ",onClick:()=>{r||null==J||J.toTop()},children:"Top"}),N&&(0,o.jsx)(b,{show:!r,className:"py-1 px-4 cursor-pointer rounded-md ",onClick:()=>{r||null==J||J.toBottom()},children:"Bottom"})]})}),(0,o.jsxs)(y,{className:"p-3 min-h-[150px] max-h-[250px] rounded-xl w-[60%] min-w-[700px] flex flex-col items-center",children:[(0,o.jsx)("textarea",{className:`flex-[0.7] w-full text-lg ${C&&"bg-[#45454e]"}`,placeholder:"向我提问吧",value:Y,onChange:e=>D(e.target.value),onCompositionStart:()=>E(!0),onCompositionEnd:()=>E(!1),draggable:!1,style:{resize:"none"},onKeyDown:e=>{"Enter"!==e.key||O||(e.preventDefault(),e.stopPropagation(),B())}}),(0,o.jsxs)("div",{className:"flex-[0.3] w-full inline-flex flex-row items-center",children:[!Z&&(0,o.jsx)(s.Z,{droplist:(0,o.jsxs)(l.Z,{style:{width:"150px"},onClickMenuItem:e=>P(e),children:[(0,o.jsx)(l.Z.Item,{children:(0,o.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,o.jsx)("div",{children:"DeepSeek-R1"}),"deepseek-r1-250120"===k&&(0,o.jsx)(i.Z,{className:"ml-auto"})]})},"deepseek-r1-250120"),(0,o.jsx)(l.Z.Item,{children:(0,o.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,o.jsx)("div",{children:"DouBao-1.5-Pro"}),"doubao-1-5-pro-32k-250115"===k&&(0,o.jsx)(i.Z,{className:"ml-auto"})]})},"doubao-1-5-pro-32k-250115"),(0,o.jsx)(l.Z.Item,{children:(0,o.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,o.jsx)("div",{children:"DouBao-1.5-lite"}),"doubao-1-5-lite-32k-250115"===k&&(0,o.jsx)(i.Z,{className:"ml-auto"})]})},"doubao-1-5-lite-32k-250115")]}),children:(0,o.jsxs)("div",{className:"ml-2 px-2 py-1 hover:bg-[#eeebe2] rounded-lg transition-colors cursor-pointer",children:[w[k],(0,o.jsx)(n.Z,{})]})}),(0,o.jsxs)("div",{className:"ml-auto flex flex-row gap-2 justify-center items-center",children:[r&&(0,o.jsx)("div",{className:"text-xl text-white px-2 py-2 rounded-[50%] bg-red-500 cursor-pointer flex justify-center items-center",onClick:m,children:(0,o.jsx)(c.Z,{})}),(0,o.jsx)("div",{className:""===Y?"flex flex-row px-3 py-2 bg-blue-300 text-gray-100 rounded-md transition-colors duration-200":"flex flex-row px-3 py-2 bg-blue-500 text-white rounded-md transition-colors duration-200 cursor-pointer",onClick:B,children:(0,o.jsx)(a.Z,{mini:!0,position:"top",content:""===Y?"请输入问题":"点击发送",children:(0,o.jsx)("div",{className:"scale-150",children:r?(0,o.jsx)(d.Z,{}):(0,o.jsx)(x.Z,{})})})})]})]})]})]})}},14972:function(e,t,r){r.d(t,{_Q:()=>a,id:()=>i,mL:()=>s,s1:()=>l,xt:()=>n});var o=r(18223);async function l(){try{let e=await o.WY.get("/api/chat/history");if(200===e.data.code){let t=e.data.data,r=[];return t.map(e=>{let t=e.content;r.push({...e,content:JSON.parse(t),chatId:e.id})}),r}throw Error(e.data.msg)}catch(e){throw console.error(e),e}}async function s(e){try{let t={...e,content:JSON.stringify(e.content),id:e.chatId},r=await o.WY.post("/api/chat/history/write",t);if(200!==r.data.code)throw Error(r.data.msg)}catch(e){throw console.error(e),e}}async function a(e){try{let t={...e,content:JSON.stringify(e.content),id:e.chatId},r=await o.WY.post("/api/chat/history/update",t);if(200!==r.data.code)throw Error(r.data.msg)}catch(e){throw console.error(e),e}}async function i(e){console.log(e.content),console.log(JSON.stringify({...e.content}));try{let t=await o.WY.post("/api/chat/history/update/content",{id:e.id,content:JSON.stringify(e.content)});if(200!==t.data.code)throw Error(t.data.msg)}catch(e){throw console.error(e),e}}async function n(e){try{let t=await o.WY.delete(`/api/chat/history/delete/${e}`);if(200!==t.data.code)throw Error(t.data.msg)}catch(e){throw console.error(e),e}}},45527:function(e,t,r){r.d(t,{a:()=>u,z:()=>x});var o=r(2596),l=r(59537),s=r.n(l),a=r(21543),i=r(77276),n=r(47757),c=r(14972);let d=(0,a.createContext)(void 0),x=()=>(0,a.useContext)(d),u=e=>{let{chatLoadSignal:t,loginUsername:r}=(0,i.o)(),[l,x]=(0,a.useState)([]),u=async()=>{let e=[];try{console.log(r);let e=await (0,c.s1)();localStorage.setItem("chat-history",JSON.stringify(e??[])),x(e??[])}catch(r){let t=localStorage.getItem("chat-history");console.log(t),t?e=JSON.parse(t):localStorage.setItem("chat-history",JSON.stringify(e)),x(e)}},m=async e=>{r&&await (0,c.mL)(e)},h=async e=>{r&&await (0,c.xt)(e)};(0,n.Z)(async()=>{await u()},[t]);let p=(0,a.useCallback)(e=>{let t=e(l);localStorage.setItem("chat-history",JSON.stringify(t)),x(t)},[l]),f=async e=>{let t=l.filter(t=>t.chatId!==e);localStorage.setItem("chat-history",JSON.stringify(t)),await h(e),x(t)};return(0,o.jsx)(d.Provider,{value:{chats:l,addChat:e=>{l.push(e),localStorage.setItem("chat-history",JSON.stringify(l)),m(e),x(l)},sortByTime:()=>{let e=l.sort((e,t)=>s()(e.updateTime).isAfter(s()(t.updateTime))?-1:1);localStorage.setItem("chat-history",JSON.stringify([...e])),x([...e])},updateChat:p,removeAllChat:()=>{x([]),localStorage.removeItem("chat-history")},removeChat:f,getChatHistory:u},children:e.children})}},1731:function(e,t,r){r.d(t,{E:()=>a,F:()=>n});var o=r(2596),l=r(21543);let s=(0,l.createContext)({projects:[],addProject:()=>{},updateProject:()=>{},deleteProject:()=>{}}),a=()=>(0,l.useContext)(s),i="ai-chat-projects",n=e=>{let{children:t}=e,[r,a]=(0,l.useState)((()=>{let e=localStorage.getItem(i);return e?JSON.parse(e):(localStorage.setItem(i,JSON.stringify([])),[])})()),n=e=>{localStorage.setItem(i,JSON.stringify(e))};return(0,o.jsx)(s.Provider,{value:{projects:r,addProject:e=>{let t=[...r,e];n(t),a(t)},updateProject:e=>{let t=e(r);n(t),a(t)},deleteProject:e=>{let t=r.filter(t=>t.id!==e);n(t),a(t)}},children:t})}},17413:function(e,t,r){r.d(t,{ID:()=>i,vO:()=>a});var o=r(2596),l=r(21543);let s=(0,l.createContext)(void 0),a=()=>(0,l.useContext)(s),i=e=>{let{children:t,ref:r,shouldScroll:l}=e;return(0,o.jsx)(s.Provider,{value:{target:r,toTop:e=>{if(!r.current.getScrollElement())return;let t=r.current.getScrollElement();t&&(e?t.scrollTo({top:0,behavior:"smooth"}):t.scrollTo({top:0}))},toBottom:e=>{if(!r.current.getScrollElement())return;let t=r.current.getScrollElement();t&&(e?t.scrollTo({top:t.scrollHeight,behavior:"smooth"}):t.scrollTo({top:t.scrollHeight}))},shouldScroll:l},children:t})}}}]);